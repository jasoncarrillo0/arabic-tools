import { DICT_FIREBASE_ID, ERR_SNACKBAR, SENTENCES_FIREBASE_ID, SENTENCE_COLLECTION_NAMES, SUCCESS_SNACKBAR, UPLOAD_WORDS } from "./constants";
import { store } from '../redux/store'
import { addLevelTwoSentence, addLevelOneSentence, delLevelOneSentence, replaceLevelOneSentence, replaceLevelTwoSentence } from "../redux/sentence/sentenceActions";
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
        const [e2, updatedNounDoc] = await to(applyDocumentUpdate(state.noun.id, 'nouns', "increment")) 
        if (e2) throw new Error(e2)
        if (!updatedNounDoc) throw new Error("No noun returned from updatedWordInFirestore");

        const [e3, updatedVerbDoc] = await to(applyDocumentUpdate(state.verb.id, 'verbs', "increment")); 
        if (e3) throw new Error(e3)
        if (!updatedVerbDoc) throw new Error("No verb returned from updatedWordInFirestore");


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

const locations = ["dictionary", "sentences"]
const sentences = ["arabic", "english"];
const wordsTypes = ["verb", "noun", "particle", "adjective"];

export async function applyDocumentUpdate(id, collection, location, update="increment", sentenceUpdateType="arabic") {
    return new Promise(async (resolve, reject) => {
        try {
            if (!locations.includes(location)) throw new Error("Incorrect location argument supplied to applyDocumentUpdate");
            if (location === "dictionary") {
                if (!Object.keys(UPLOAD_WORDS).includes(collection)) throw new Error("collection not found in redux store.");
                const rdxWord = getState().dictionary[collection].find(word => word.id === id);
                if (!rdxWord) throw new Error("Could not find word in redux store.");
                let updatedWord = { ...rdxWord };
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
                    throw new Error("Incorrect update argument supplied to applyDocumentUpdate");
                }
    
                const wordRef = doc(db, "dictionary", DICT_FIREBASE_ID, collection, id);
                await setDoc(wordRef, updatedWord, { merge: true });
                const updatedDoc = await getDoc(wordRef);
                return resolve({id: updatedDoc.id, ...updatedDoc.data()});
            } else {
                let updatingWordInSentence = false;
                // validate argument fields
                if (!sentences.includes(sentenceUpdateType)) {
                    updatingWordInSentence = true;
                    if (!wordsTypes.includes(sentenceUpdateType)) {
                        throw new Error("incorrect sentence update type supplied to applyDocumentUpdate");
                    }
                } else if (!Object.values(SENTENCE_COLLECTION_NAMES).includes(collection)){
                    throw new Error("Incorrect collection supplied to applyDocumentUpdate")
                }


                // get redux state, make copy, merge change
                const rdxSentence = getState().sentence[collection].find(sentence => sentence.id === id);
                if (!rdxSentence) throw new Error("Could not find sentence in redux store.");



                // format sentence update
                let updatedSentence = { ...rdxSentence };
                let e1, e2, updatedOldWord, updatedNewWord;
                console.log("rdxSentence", rdxSentence);
                if (updatingWordInSentence) {
                    // decrement times used for the existing word
                    [e1, updatedOldWord] = await to(applyDocumentUpdate(rdxSentence.words[sentenceUpdateType].id, `${sentenceUpdateType}s`, "dictionary", "decrement"));
                    if (e1) throw new Error(e1);
                    if (!updatedOldWord) throw new Error("Word to decrement was undefined on update.");

                    // replace sentence word with update
                    updatedSentence.words[sentenceUpdateType] = update[sentenceUpdateType];
                } else if (sentenceUpdateType === "arabic") {
                    updatedSentence.sentence.arabic = update;
                } else if (sentenceUpdateType === "english") {
                    updatedSentence.sentence.english = update;
                } 


                // update sentence in db
                const sentenceRef = doc(db, "sentences", SENTENCES_FIREBASE_ID, collection, id);
                await setDoc(sentenceRef, updatedSentence, { merge: true});
                const updatedDoc = await getDoc(sentenceRef);      
                const finalDoc   = {id: updatedDoc.id, ...updatedDoc.data()};
                if (updatingWordInSentence) {
                    // increment times used for new word
                    [e2, updatedNewWord] = await to(applyDocumentUpdate(finalDoc.words[sentenceUpdateType].id, `${sentenceUpdateType}s`, "dictionary", "increment"));
                    if (e2) throw new Error(e2);
                    if (!updatedNewWord) throw new Error("Word to increment was undefined on update.");

                    // update rdx state for both
                    console.log("updatedOldWord", updatedOldWord)
                    console.log("updatedNewWord", updatedNewWord)
                    replaceWord(updatedOldWord, `${sentenceUpdateType}s`);
                    replaceWord(updatedNewWord, `${sentenceUpdateType}s`);
                }
                console.log("finalDoc", finalDoc);
                resolve(finalDoc);
            }
            
        } catch (e) {
            reject(e.message);
        }
    })
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
        const sentenceRef = doc(db, 'sentences', SENTENCES_FIREBASE_ID, collectionName, row.id);
        await deleteDoc(sentenceRef);
        const [e1, updatedVerb] = await to(applyDocumentUpdate(row.words.verb.id, 'verbs', 'decrement'));
        if (e1) throw new Error(e1)
        if (!updatedVerb) throw new Error("No updated Verb returned from applyDocumentUpdate");

        const [e2, updatedNoun] = await to(applyDocumentUpdate(row.words.noun.id, 'nouns', 'decrement'));
        if (e2) throw new Error(e2)
        if (!updatedNoun) throw new Error("No updated Verb returned from applyDocumentUpdate");

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