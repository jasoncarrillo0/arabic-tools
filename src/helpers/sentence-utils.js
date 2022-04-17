import { DICT_FIREBASE_ID, ERR_SNACKBAR, SENTENCES_FIREBASE_ID, SENTENCE_COLLECTION_NAMES, SUCCESS_SNACKBAR, UPLOAD_WORDS } from "./constants";
import { store } from '../redux/store'
import { addLevelTwoSentence, addLevelOneSentence } from "../redux/sentence/sentenceActions";
import { addDoc, collection, doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "../firebase/firebase";
import to from 'await-to-js';
import { replaceNoun, replaceVerb } from "../redux/dictionary/dictActionCreators";


const { dispatch, getState } = store;

export function handleAddLevelTwoSentence(state, setState, enqueueSnackbar, INIT_STATE) {
    if (!state.sentence) {
        enqueueSnackbar("Sentence must not be empty", ERR_SNACKBAR);
    } else if (!state.noun || !state.verb) {
        enqueueSnackbar("noun and verb must be filled out", ERR_SNACKBAR);
    } else {
        dispatch(addLevelTwoSentence(state.sentence));
        enqueueSnackbar("Successfully added new sentence.", SUCCESS_SNACKBAR);
        setState(INIT_STATE);
    }
}




// change if else to object.values, check if empty 
export async function handleAddLevelOneSentence(state, setState, enqueueSnackbar, INIT_STATE) {

    try {
        const sentenceObj = {
            sentence: state.sentence,
            words: {
                noun: state.noun,
                verb: state.verb
            }
        }
        const [e1, sentenceDoc] = await to(postSentenceToFirestore(sentenceObj, SENTENCE_COLLECTION_NAMES.LEVEL_ONE));
        if (e1) {
            const msg = `Couldn't create sentence: ${e1}`;
            return enqueueSnackbar(msg, ERR_SNACKBAR);
        } else if (!sentenceDoc) {
            const msg = "Sentence document was undefined.";
            return enqueueSnackbar(msg, ERR_SNACKBAR);
        } 
    
        // update "timesUsed" field in each of the noun and verb documents
        const updatedNoun = getUpdatedWord("nouns", state.noun.id, "increment");
        const updatedVerb = getUpdatedWord("verbs", state.verb.id, "increment");
        const [e2, updatedNounDoc] = await to(updateWordInFirestore(state.noun.id, 'nouns', updatedNoun)) 
        if (e2) throw new Error(e2)
        if (!updatedNounDoc) throw new Error("No noun returned from updatedWordInFirestore");

        const [e3, updatedVerbDoc] = await to(updateWordInFirestore(state.verb.id, 'verbs', updatedVerb)); 
        if (e3) throw new Error(e3)
        if (!updatedVerbDoc) throw new Error("No verb returned from updatedWordInFirestore");


        // updateß redux store, notify user, reset init state
        dispatch(replaceNoun(updatedNounDoc.id, updatedNounDoc));
        dispatch(replaceVerb(updatedVerbDoc.id, updatedVerbDoc));
        dispatch(addLevelOneSentence(sentenceDoc))
        enqueueSnackbar("Successfully added new sentence.", SUCCESS_SNACKBAR);
        setState(INIT_STATE);
    } catch (e) {
        enqueueSnackbar(e.message, ERR_SNACKBAR)
    }
}


/*
    Gets a word from redux store, with an update
    third arg is meant to be left out if we just want to increment timesUsed
*/
function getUpdatedWord(collection, id, update="increment") {
    if (!Object.keys(UPLOAD_WORDS).includes(collection)) throw new Error("collection not found in redux store.");
    const rdxWord = getState().dictionary[collection].find(word => word.id === id);
    if (!rdxWord) throw new Error("Could not find word in redux store.");
    console.log('\n\nRDX WORD: ', rdxWord);
    if (update === "increment") {
        return {
            ...rdxWord,
            timesUsed: rdxWord.timesUsed + 1
        }
    } else {
        return {
            ...rdxWord,
            ...update
        }
    }
}







export async function postSentenceToFirestore(sentenceObj, collectionName) {
    return new Promise(async (resolve, reject) => {
        try {
            if (!Object.values(SENTENCE_COLLECTION_NAMES).includes(collectionName)) throw new Error("wrong collection name.");
    
            const coll = collection(db, 'sentences', SENTENCES_FIREBASE_ID, collectionName);
            const docRef = await addDoc(coll, sentenceObj);
            const newDoc = await getDoc(docRef);
            return resolve({id: newDoc.id, ...newDoc.data()})
        } catch (e) {
            console.log(e);
            return reject(e.message)
        }
    })
};






export async function updateWordInFirestore(id, collection, updatedWord) {
    return new Promise(async (resolve, reject) => {
        try {
            const wordRef = doc(db, "dictionary", DICT_FIREBASE_ID, collection, id);
            const beforeDoc = await getDoc(wordRef);
            console.log("before firestore update: ", beforeDoc.data());
            await setDoc(wordRef, updatedWord, { merge: true });
            const updatedDoc = await getDoc(wordRef);
            resolve({id: updatedDoc.id, ...updatedDoc.data()});
        } catch (e) {
            reject(e.message);
        }
    })
}