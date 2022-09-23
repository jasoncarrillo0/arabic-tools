import { addDoc, collection, getDocs, query } from "firebase/firestore";
import { db } from "src/firebase/firebase";
import { setAllAdjectives, setAllConnectors, setAllNouns, setAllParticles, setAllPrepositions, setAllVerbs } from "src/redux/dictionary/dictActionCreators";
import { Adjective, Connector, Noun, Particle, Preposition, Verb, Word, WordTypes } from "src/redux/dictionary/interfaces";
import { store } from "src/redux/store";



/*  -------------------------------------------------- TOOLS FOR ADDING SHEET DATA TO THE FIRESTORE --------------------------------------------------------*/






/* 
    uploads all to collection, 
    retrieves added docs from firebase to ensure we are using firebase docs
    adds to redux state
*/
export async function addSheetDataToCollection(collectionName: WordTypes, words: ProcessedWordInSheet[]) {
    if (hasDuplicates(words)) throw new Error("duplicate english words found.");

    // add all to collection
    const coll = collection(db, collectionName);
    for (const word of words) {
        await addDoc(coll, word);
    }
    const newlyAddedDocsSnapshot = await getDocs(query(coll));
    if (newlyAddedDocsSnapshot.docs.length === 0) throw new Error('no docs returned from newly created docs query.')

    // add to redux store
    const newlyAddedDocs: Word[] = [];
    for (const doc of newlyAddedDocsSnapshot.docs) {
        newlyAddedDocs.push({id: doc.id, ...doc.data()} as Word);
    }
    handleNewDocs(newlyAddedDocs, collectionName);
}
function hasDuplicates(words: ProcessedWordInSheet[]) {
    const all: {[key: string]: string} = {};
    for (const word of words) {
        if (word.english in all) {
            console.log(`duplicate: ${word.english}`) 
            return true
        } 
        all[word.english] = '';
    }
    return false;
}
function handleNewDocs(newlyAddedDocs: Word[], collectionName: WordTypes) {
    const {dispatch} = store;
    switch (collectionName) {
        case "adjectives":
            dispatch(setAllAdjectives(newlyAddedDocs as Adjective[]))
            break;
        case "verbs":
            dispatch(setAllVerbs(newlyAddedDocs as Verb[]))
            break;
        case "particles":
            dispatch(setAllParticles(newlyAddedDocs as Particle[]))
            break;
        case "connectors":
            dispatch(setAllConnectors(newlyAddedDocs as Connector[]))
            break;
        case "nouns":
            dispatch(setAllNouns(newlyAddedDocs as Noun[]))
            break;
        case "prepositions":
            dispatch(setAllPrepositions(newlyAddedDocs as Preposition[]))
            break;
        default:
            break;
    }
}



/*
    Directly dependent on the format of the .csv file's cols and rows
    Function must be used after validating columns to their word type
*/

export type ProcessedWordInSheet = {
    english: string
    arabic: string
    timesUsed: number
    uniqueFemale?: string
    uniquePlural?: string
    type?: string
    phonetic?: string
    uniqueIverb?: string
}
export function getWord(wordType: WordTypes, data: string[]): ProcessedWordInSheet {
    switch (wordType) {
        case "adjectives":
            let adjective: Omit<Adjective, "id"> = {
                english: data[0],
                arabic: data[1],
                uniqueFemale: data[2],
                uniquePlural: data[3],
                timesUsed: 0
            }
            return adjective;
        case "verbs":
            let verb: Omit<Verb, "id"> = {
                english: data[0],
                arabic: data[1],
                type: data[2],
                phonetic: data[3],
                uniqueIverb: data[4],
                timesUsed: 0
            }
            return verb;
        case "connectors":
            let connector: Omit<Connector, "id"> = {
                english: data[0],
                arabic: data[1],
                phonetic: data[2],
                timesUsed: 0
            }
            return connector;
        case "particles":
            let particle: Omit<Particle, "id"> = {
                english: data[0],
                arabic: data[1],
                phonetic: data[2],
                timesUsed: 0
            }
            return particle;
        case "prepositions":
            let preposition: Omit<Preposition, "id"> = {
                english: data[0],
                arabic: data[1],
                phonetic: data[2],
                timesUsed: 0
            }
            return preposition;
        default:
            return {
                english: data[0],
                arabic: data[1], 
                phonetic: data[2],
                timesUsed: 0
            }
    }
}