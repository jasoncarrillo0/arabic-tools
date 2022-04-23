import { addDoc, collection, getDocs, query } from "firebase/firestore";
import { db } from "../firebase/firebase";
import { DICT_FIREBASE_ID } from "./constants";
import to from 'await-to-js';
import { store } from '../redux/store'
import { setAllAdjectives } from "../redux/dictionary/dictActionCreators";
import { setAllVerbs } from "../redux/dictionary/dictActionCreators";
import { setAllParticles } from "../redux/dictionary/dictActionCreators";
import { setAllConnectors } from "../redux/dictionary/dictActionCreators";
import { setAllPrepositions } from "../redux/dictionary/dictActionCreators";
import { setAllNouns } from "../redux/dictionary/dictActionCreators";


export function getVerbsObj(verbs) {
    let split = verbs.split(",");
    let cleanedSplit = split.map(verb => verb.replace(/\t/g, " "));
    let obj = {};
    for (let verb of cleanedSplit) {
        let splittedBySpace = verb.split(' ');
        let english, arabic;
        if (splittedBySpace.length === 3) {
            english         = splittedBySpace[0] + ' ' + splittedBySpace[1];
            arabic          = splittedBySpace[2];
        } else {
            arabic = splittedBySpace[splittedBySpace.length - 1];
            english = verb.split(arabic)[0];
        }

        obj[english.trim()] = arabic;
    }
    return obj;
}


export function hasExpectedCols(expectedCols, firstRow) {
    for (let i = 0; i < firstRow.length; i++) {
        if (expectedCols[i] !== firstRow[i]) {
            return false;
        }
    }
    return true;
}





export function getOptionsFrom(wordsArr) {
    return wordsArr
    .filter(choice => choice.arabic !== "")
    .map(choice => choice)
    .map(choice => `${choice.arabic} (${choice.timesUsed})`)
    .sort((a,b) => a.localeCompare(b))
}




export async function getDocsFromCollection(collectionName) {
    return new Promise(async (resolve, reject) => {
        try {
            const dbQuery = query(collection(db, 'dictionary', DICT_FIREBASE_ID, collectionName));
            const snapshot = await getDocs(dbQuery);
            const documentsArr = [];
            for (const document of snapshot.docs) {
                documentsArr.push({
                    ...document.data(),
                    id: document.id
                });
            } 
            resolve(documentsArr);
        } catch (e) {
            reject(e.message)
        }
    })
}


function hasDuplicates(words) {
    const all = {};
    for (const word of words) {
        if (word.english in all) return true
        all[word.english] = '';
    }
    return false;
}


/* 
    uploads all to collection, 
    retrieves added docs from firebase to ensure we are using firebase docs
    adds to redux state
*/
export async function addAllToCollection(collectionName, words) {
    return new Promise(async (resolve, reject) => {
        try {
            if (hasDuplicates(words)) return reject("duplicate english words found.");
            const coll = collection(db, 'dictionary', DICT_FIREBASE_ID, collectionName);
            for (const word of words) {
                await addDoc(coll, word);
            }
            const [e1, newlyAddedDocs] = await to(getDocsFromCollection(collectionName));
            if (e1) throw new Error(e1);
            if (!newlyAddedDocs) throw new Error("No documents returned from firebase query.");
            handleNewDocs(newlyAddedDocs, collectionName);
            resolve(true);
        } catch (e) {
            reject(e.message)
        }
    })
}


function handleNewDocs(newlyAddedDocs, collectionName) {
    const {dispatch} = store;
    switch (collectionName) {
        case "adjectives":
            dispatch(setAllAdjectives(newlyAddedDocs))
            break;
        case "verbs":
            dispatch(setAllVerbs(newlyAddedDocs))
            break;
        case "particles":
            dispatch(setAllParticles(newlyAddedDocs))
            break;
        case "connectors":
            dispatch(setAllConnectors(newlyAddedDocs))
            break;
        case "nouns":
            dispatch(setAllNouns(newlyAddedDocs))
            break;
        case "prepositions":
            dispatch(setAllPrepositions(newlyAddedDocs))
            break;
        default:
            break;
    }
}



export function getWord(wordType, data) {
    switch (wordType) {
        case "adjectives":
            return {
                english: data[0],
                arabic: data[1],
                uniqueFemale: data[2],
                uniquePlural: data[3],
                timesUsed: 0
            }
        case "verbs":
            return {
                english: data[0],
                arabic: data[1],
                type: data[2],
                phonetic: data[3],
                uniqueIverb: data[4],
                timesUsed: 0
            }
        default:
            return {
                english: data[0],
                arabic: data[1], 
                phonetic: data[2],
                timesUsed: 0
            }
    }
}

export function getColsFromRows(rows, defaultWidth=130) {
    const colArr = Object.keys(rows[0]).filter(key => key !== "id");
    return colArr
    .map(col => ({
        field: col,
        headerName: col,
        width: col === "arabic" && defaultWidth === 130 ? 90 : defaultWidth
    }))
    .sort((a,b) => a.field.localeCompare(b.field))
}