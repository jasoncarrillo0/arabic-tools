import { DICT_FIREBASE_ID, SENTENCE_TRANSLATIONS, ERR_SNACKBAR, PARENT_COLLECTIONS, SENTENCES_FIREBASE_ID, SENTENCE_COLLECTION_NAMES, SUCCESS_SNACKBAR, WORD_TYPE_COLS } from "./constants";
import { store } from '../redux/store'
import { addLevelTwoSentence, addLevelOneSentence, delLevelOneSentence, replaceLevelOneSentence, replaceLevelTwoSentence } from "../redux/sentence/sentenceActionCreators";
import { addDoc, collection, deleteDoc, doc, getDoc, setDoc } from "firebase/firestore";
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
        const [e2, updatedNounDoc] = await to(applyWordDocUpdate(state.noun.id, 'nouns', "increment")) 
        if (e2) throw new Error(e2)
        if (!updatedNounDoc) throw new Error("No noun returned from applyWordDocUpdate");

        const [e3, updatedVerbDoc] = await to(applyWordDocUpdate(state.verb.id, 'verbs', "increment")); 
        if (e3) throw new Error(e3)
        if (!updatedVerbDoc) throw new Error("No verb returned from applyWordDocUpdate");


        // update redux store, notify user, reset init state
        dispatch(replaceNoun(updatedNounDoc.id, updatedNounDoc));
        dispatch(replaceVerb(updatedVerbDoc.id, updatedVerbDoc));
        dispatch(addLevelOneSentence(sentenceDoc))
        enqueueSnackbar("Successfully added new sentence.", SUCCESS_SNACKBAR);
        setState(INIT_STATE);
    } catch (e) {
        enqueueSnackbar(e.message, ERR_SNACKBAR)
    }
}
async function postSentenceToFirestore(sentenceObj, collectionName) {
    return new Promise(async (resolve, reject) => {
        try {
            if (!Object.values(SENTENCE_COLLECTION_NAMES).includes(collectionName)) throw new Error("wrong collection name.");
    
            const coll = collection(db, PARENT_COLLECTIONS.SENTENCES, SENTENCES_FIREBASE_ID, collectionName);
            const docRef = await addDoc(coll, sentenceObj);
            const newDoc = await getDoc(docRef);
            return resolve({id: newDoc.id, ...newDoc.data()})
        } catch (e) {
            console.log(e);
            return reject(e.message)
        }
    })
};












/* 
    PARAMS: 
    --> id: firebase document id (sentence id, or word id)
    --> collection: must be in WORD_COLLECTIONS or SENTENCE_COLLECTIONS
    --> update: string as an english or arabic sentence OR {
        [field]: { id: "", word: fieldVal}

        field: "arabic" "english" "noun" "verb" "particle" "connector" "adjective" "preposition"
            id: firebase document id
            word: arabic value
    }
    --> sentencePart: "arabic" "english" "noun" "verb" "particle" "connector" "adjective" "preposition"
    --> notUpdatingWord: boolean. true if we are updating the arabic or english field

    SENTENCE_OBJ in DB/RDX:
    {
        id: string,
        sentence: {
            arabic: string
            english: string
        },
        words: {
            [wordType]: {
                word: arabic string
                id: word doc id (firestore)
            }
        }
    }

*/
const WORD_COLLECTIONS     = Object.keys(WORD_TYPE_COLS);
const SENTENCE_COLLECTIONS = Object.values(SENTENCE_COLLECTION_NAMES);
export async function applySentenceUpdate(id, collection, update, sentencePart, notUpdatingWord) {
    return new Promise(async (resolve, reject) => {
        try {
            
            // validate argument fields
            if (!SENTENCE_TRANSLATIONS.includes(sentencePart)) {
                if (!WORD_COLLECTIONS.includes(sentencePart)) {
                    throw new Error(`Incorrect sentence update type ${sentencePart} supplied to applySentenceUpdate`);;
                }
            } else if (!SENTENCE_COLLECTIONS.includes(collection)){
                throw new Error(`Incorrect collection ${collection} supplied to applySentenceUpdate`)
            }


            // get redux state, make copy, merge change
            const currSentence = getState().sentence[collection].find(sentence => sentence.id === id);
            if (!currSentence) throw new Error("Could not find sentence in redux store.");



            // format sentence update
            let updatedSentence = { ...currSentence };
            let e1, e2, updatedOldWord, updatedNewWord, wordCollection;


            if (notUpdatingWord) {
                // decrement timesUsed for the existing word
                wordCollection = `${sentencePart}s`;
                [e1, updatedOldWord] = await to(applyWordDocUpdate(currSentence.words[sentencePart].id, wordCollection, "decrement"));
                if (e1) throw new Error(e1);
                if (!updatedOldWord) throw new Error("Word to decrement was undefined on update.");

                // replace sentence word with update
                updatedSentence.words[sentencePart] = update[sentencePart];
            } else if (sentencePart === "arabic") {
                updatedSentence.sentence.arabic = update;
            } else if (sentencePart === "english") {
                updatedSentence.sentence.english = update;
            } 


            // update sentence in db
            const sentenceRef = doc(db, PARENT_COLLECTIONS.SENTENCES, SENTENCES_FIREBASE_ID, collection, id);
            await setDoc(sentenceRef, updatedSentence, { merge: true});
            const updatedDoc = await getDoc(sentenceRef);      
            const finalDoc   = {id: updatedDoc.id, ...updatedDoc.data()};


            //increment timesUsed field in new word 
            if (notUpdatingWord) {
                [e2, updatedNewWord] = await to(applyWordDocUpdate(finalDoc.words[sentencePart].id, wordCollection, "increment"));
                if (e2) throw new Error(e2);
                if (!updatedNewWord) throw new Error("Word to increment was undefined on update.");

                // update rdx state for old and new word
                replaceWord(updatedOldWord, `${sentencePart}s`);
                replaceWord(updatedNewWord, `${sentencePart}s`);
            }
            resolve(finalDoc);
        } catch (e) {
            reject(e.message);
        }
    })
}
async function applyWordDocUpdate(id, collection, update) {
    return new Promise(async (resolve, reject) => {
        try {
            if (!WORD_COLLECTIONS.includes(collection)) throw new Error(`Incorrect collection ${collection} supplied to applySentenceUpdate`);
            const rdxWord = getState().dictionary[collection].find(word => word.id === id);
            if (!rdxWord) throw new Error("Could not find word in redux store.");
            let updatedWord = { ...rdxWord };

            // "increment", "decrement", or object merge 
            if (update === "increment") {
                updatedWord.timesUsed = updatedWord.timesUsed + 1;
            } else if (update === "decrement") {
                updatedWord.timesUsed = updatedWord.timesUsed > 0 ? updatedWord.timesUsed - 1 : updatedWord.timesUsed;
            } else if (typeof(update) === "object") {
                updatedWord = {
                    ...rdxWord,
                    ...update
                }
            } else {
                throw new Error("Incorrect update argument supplied to applySentenceUpdate");
            }

            // apply db update, resolve updated document
            const wordRef = doc(db, PARENT_COLLECTIONS.DICTIONARY, DICT_FIREBASE_ID, collection, id);
            await setDoc(wordRef, updatedWord, { merge: true });
            const updatedDoc = await getDoc(wordRef);
            return resolve({id: updatedDoc.id, ...updatedDoc.data()});
        } catch (e) {
            reject(e.message);
        }
    });
}













/*
    row: {
        id: string,
        sentence: {
            arabic: string
            english: string
        },
        words: {
            verb: {
                id: string
                word: string
            },
            noun: {
                id: string
                word: string
            }
        }
    }
*/

export async function handleDeleteLevelOneSentence(row, collectionName, enqueueSnackbar) {
    try {
        if (!Object.values(SENTENCE_COLLECTION_NAMES).includes(collectionName)) throw new Error("invalid collection name supplied.");
        const sentenceRef = doc(db, PARENT_COLLECTIONS.SENTENCES, SENTENCES_FIREBASE_ID, collectionName, row.id);
        await deleteDoc(sentenceRef);
        const [e1, updatedVerb] = await to(applySentenceUpdate(row.words.verb.id, 'verbs', 'decrement'));
        if (e1) throw new Error(e1)
        if (!updatedVerb) throw new Error("No updated Verb returned from applySentenceUpdate");

        const [e2, updatedNoun] = await to(applySentenceUpdate(row.words.noun.id, 'nouns', 'decrement'));
        if (e2) throw new Error(e2)
        if (!updatedNoun) throw new Error("No updated Verb returned from applySentenceUpdate");

        // update rdx store
        dispatch(delLevelOneSentence(row.id))
        dispatch(replaceVerb(updatedVerb.id, updatedVerb));
        dispatch(replaceNoun(updatedNoun.id, updatedNoun));
    } catch (e) {
        enqueueSnackbar(e.message, ERR_SNACKBAR)
    }
}



export async function handleUpdateDocument(docId, field, sentenceVal, enqueueSnackbar) {
    try {
        
    } catch (e) {
        enqueueSnackbar(e.message, ERR_SNACKBAR)
    }
}



/*
    sentenceDoc: redux state sentence
    sentenceType: redux state keys (e.g., levelOneSentences) 
*/
export function replaceSentence(sentenceDoc, sentenceType) {
    switch (sentenceType) {
        case 'levelOneSentences':
            dispatch(replaceLevelOneSentence(sentenceDoc))
            break;
        case 'levelTwoSentences':
            dispatch(replaceLevelTwoSentence(sentenceDoc))
            break;
        default:
            console.log("replace sentence err")
            break;
    }
}


export function replaceWord(wordDoc, collection) {
    switch (collection) {
        case 'nouns':
            dispatch(replaceNoun(wordDoc.id, wordDoc))
            break;
        case 'verbs':
            dispatch(replaceVerb(wordDoc.id, wordDoc))
            break;
        default:
            console.log("replace word error")
            break;
    }
}