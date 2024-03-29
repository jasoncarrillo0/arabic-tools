import { deleteDoc, doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "src/firebase/firebase";
import { SENTENCE_COLLECTION_INFO } from "src/helpers/constants";
import { replaceWordInState } from "src/redux/dictionary/dictActionCreators";
import { Word, WordTypes } from "src/redux/dictionary/interfaces";
import { Sentence, SentenceDocument, SentenceTypes, SentenceWord } from "src/redux/sentence/interfaces";
import { deleteSentenceInState, replaceSentenceInState } from "src/redux/sentence/sentenceActionCreators";
import { store } from "src/redux/store";
import { applyWordDocUpdate } from "../dictionary";

const { dispatch, getState } = store;

/* ---------------------------------------------------------------- {{ OTHER SENTENCE OPS }} -------------------------------------------------------------------------- */


// updates a sentence; update a word used in a sentence, or update the sentence arabic or english translation
export async function applySentenceUpdate(
    id: Sentence["id"], 
    collection: SentenceTypes, 
    update: string | SentenceWord, 
    sentencePart: "arabic" | "english" | WordTypes,
    notUpdatingWord: boolean,
    existingWordId: Word["id"]
) {
    
    // get redux state, make copy, merge change
    const coll = getState().sentences[collection];
    // loop through since typescript doesn't support .find() for union types
    let sentenceToUpdate = undefined;
    for (const sentence of coll) {
        if (sentence.id === id) {
            sentenceToUpdate = { ...sentence }; // make a copy
        }
    }
    if (!sentenceToUpdate) throw new Error("Could not find sentence in redux store.");



    // format sentence update
    let updatedOldWord, updatedNewWord;

    // notUpdatingWord means we are editing the arabic and english parts of a sentence; else words within a sentence
    if (notUpdatingWord) {
        const updateVal = update as string;
        if (sentencePart === "arabic") {
            sentenceToUpdate.arabic = updateVal;
        }
        if (sentencePart === "english") {
            sentenceToUpdate.english = updateVal;
        }
    } else {
        // find word in existing sentence
        const updateVal = update as SentenceWord;
        const foundWord = sentenceToUpdate.words.find(word => word.id === existingWordId);
        if (!foundWord) throw new Error("couldn't match update value word with sentence in redux state.");
        if (foundWord.arabic === updateVal.arabic) throw new Error('Update value is the same as the existing sentence.');
 
        
        /*
             handle the edge case where an admin user updated a word in the dictionary, 
             left the corresponding sentence(s) unresolved, 
             and deleted the word in the dictionary; there may be an orphaned SentenceWord within
             the sentence
        */
        const foundWordExistsInDb = getState().dictionary[foundWord.wordType].some(word => word.id === foundWord.id);
        if (foundWordExistsInDb) {
            // decrement existing word's timesUsed count
            updatedOldWord = await applyWordDocUpdate(foundWord.id, foundWord.wordType, "decrement");
            if (!updatedOldWord) throw new Error("Word to decrement was undefined on update.");
            dispatch(
                replaceWordInState(updatedOldWord.id, updatedOldWord, updateVal.wordType)
            )
        }
       

        // increment new word's timesUsed count
        updatedNewWord = await applyWordDocUpdate(updateVal.id, updateVal.wordType, "increment");
        if (!updatedNewWord) throw new Error("Word to increment was undefined on update.");
        dispatch(
            replaceWordInState(updatedNewWord.id, updatedNewWord, updateVal.wordType)
        )

        // replace sentence word with update
        sentenceToUpdate.words = [...sentenceToUpdate.words.filter(word => word.id !== foundWord.id), updateVal];
    } 


    // update sentence in db
    const sentenceRef = doc(db, collection, id);
    await setDoc(sentenceRef, sentenceToUpdate, { merge: true});
    const updatedDoc = (await getDoc(sentenceRef)).data() as SentenceDocument;      
    const finalDoc: Sentence = {id: sentenceRef.id, ...updatedDoc};

    return finalDoc;
}




/*
    PURPOSE: If we update the arabic or english of a specific word in the dictionary, all sentences using this word must be updated.

*/
type SentenceUpdateInfo = {
    sentence: Sentence
    collection: SentenceTypes
}
export async function updateAllSentencesIncluding(updatedWordDoc: Word, wordType: WordTypes) {

    try {
        const allSentences: SentenceUpdateInfo[]    = [];
        const sentenceState = getState().sentences;
        const sentenceTypes = Object.keys(sentenceState) as SentenceTypes[]


        // extract all sentences that use wordDoc as one of its words
        for (const sentenceType of sentenceTypes) {
            // only loop through sentences that include the word type
            if (SENTENCE_COLLECTION_INFO[sentenceType].wordTypesUsed.includes(wordType)) {
                for (const sentence of sentenceState[sentenceType]) {
                    for (const word of sentence.words) {
                        if (word.id === updatedWordDoc.id) {
                            allSentences.push({ sentence, collection: sentenceType });
                        }
                    }
                }
            }
        }

        // update sentences
        for (const { sentence, collection } of allSentences) {
            const wordAsSentenceWord: SentenceWord = { 
                arabic: updatedWordDoc.arabic,
                english: updatedWordDoc.english,
                id: updatedWordDoc.id,
                wordType: wordType
            };
            const newWords = [...sentence.words.filter(word => word.id !== updatedWordDoc.id), wordAsSentenceWord];
            const updatedSentence: Sentence = { 
                ...sentence, 
                isUnresolved: true,
                words: newWords
            };

            // update sentence in db
            const sentenceRef = doc(db, collection, sentence.id);
            await setDoc(sentenceRef, updatedSentence, { merge: true});
            const updatedDoc = await getDoc(sentenceRef);      
            const finalDoc   = {id: updatedDoc.id, ...updatedDoc.data() as SentenceDocument };

            // update in state
            dispatch(
                replaceSentenceInState(finalDoc, collection)
            )
        }

        return allSentences.length;
    } catch (e: any) {
        throw new Error(e.message)
    }    
}



export async function markSentenceResolved(sentence: Sentence, collection: SentenceTypes) {
    const updatedSentence: Sentence = {...sentence, isUnresolved: false };
    const sentenceRef = doc(db, collection, sentence.id);
    await setDoc(sentenceRef, updatedSentence, { merge: true});
    const updatedDoc = await getDoc(sentenceRef);      
    const finalDoc   = {id: updatedDoc.id, ...updatedDoc.data() as SentenceDocument };
    dispatch(
        replaceSentenceInState(finalDoc, collection)
    )
}







export async function deleteSentenceInDb(row: Sentence, collection: SentenceTypes) {
    const sentenceRef = doc(db, collection, row.id);
    await deleteDoc(sentenceRef);
    for (const word of row.words) {
        const updatedWord = await applyWordDocUpdate(word.id, word.wordType, 'decrement');
        if (!updatedWord) throw new Error("No updated word returned in delete level one sentence");

        // update redux state to reflect new "times used" field
        dispatch(replaceWordInState(updatedWord.id, updatedWord, word.wordType))
    }

    // update rdx store
    dispatch(deleteSentenceInState(row.id, collection))
}
