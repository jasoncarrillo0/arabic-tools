import { addDoc, collection, deleteDoc, doc, getDoc, updateDoc } from "firebase/firestore";
import { InitialSentenceOne } from "src/App/AuthedApp/admin-only-pages/CreateLevelOneSentencePage";
import { db } from "src/firebase/firebase";
import { replaceWordInState } from "src/redux/dictionary/dictActionCreators";
import { LevelOneSentence, Sentence, SentenceDocument, SentenceTypes } from "src/redux/sentence/interfaces";
import { addLevelOneSentence, deleteSentenceInState } from "src/redux/sentence/sentenceActionCreators";
import { store } from "src/redux/store";
import { applyWordDocUpdate } from "../dictionary";

const { dispatch } = store;

// change if else to object.values, check if empty 
export async function handleAddLevelOneSentence(state: InitialSentenceOne) {
    const formattedSentence: Omit<LevelOneSentence, "id"> = {
        ...state,
        nounsLimit: 1,
        verbsLimit: 1,
    }
    const newSentence = await addSentenceToDb(formattedSentence, "levelOneSentences");

    // update "timesUsed" field in each of the noun and verb documents
    const noun = state.words.find(word => word.wordType === "nouns");
    const verb = state.words.find(word => word.wordType === "verbs");

    if (!noun || !verb) throw new Error("noun or verb not present in sentence.")

    const updatedNounDoc = await applyWordDocUpdate(noun.id, 'nouns', "increment");
    if (!updatedNounDoc) throw new Error("No noun returned from applyWordDocUpdate");

    const updatedVerbDoc = await applyWordDocUpdate(verb.id, 'verbs', "increment");
    if (!updatedVerbDoc) throw new Error("No verb returned from applyWordDocUpdate");


    // update redux store, notify user, reset init state
    dispatch(replaceWordInState(updatedNounDoc.id, updatedNounDoc, "nouns"));
    dispatch(replaceWordInState(updatedVerbDoc.id, updatedVerbDoc, "verbs"));
    dispatch(addLevelOneSentence(newSentence as LevelOneSentence))
}
async function addSentenceToDb(sentenceObj: Omit<Sentence, "id">, collectionName: SentenceTypes) {
    const coll = collection(db, collectionName);
    const docRef = await addDoc(coll, sentenceObj);
    await updateDoc(docRef, { id: docRef.id });
    const newDoc = (await getDoc(docRef)).data() as SentenceDocument;
    const newSentence: Sentence = { id: docRef.id, ...newDoc };
    return newSentence;
};




export async function handleDeleteLevelOneSentence(row: LevelOneSentence) {
    const collection: SentenceTypes = "levelOneSentences"
    const sentenceRef = doc(db, collection, row.id);
    await deleteDoc(sentenceRef);
    for (const word of row.words) {
        const updatedWord = await applyWordDocUpdate(word.id, word.wordType, 'decrement');
        if (!updatedWord) throw new Error("No updated word returned in delete level one sentence");

        if (word.wordType === "nouns") {
            dispatch(replaceWordInState(updatedWord.id, updatedWord, "nouns"));
        } else {
            dispatch(replaceWordInState(updatedWord.id, updatedWord, "verbs"));
        }
    }

    // update rdx store
    dispatch(deleteSentenceInState(row.id, "levelOneSentences"))
}
