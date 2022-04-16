import { ERR_SNACKBAR, SENTENCES_FIREBASE_ID, SENTENCE_COLLECTION_NAMES, SUCCESS_SNACKBAR } from "./constants";
import { store } from '../redux/store'
import { addLevelTwoSentence, addLevelOneSentence } from "../redux/sentence/sentenceActions";
import { addDoc, collection, getDoc } from "firebase/firestore";
import { db } from "../firebase/firebase";
import to from 'await-to-js';


const { dispatch } = store;

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
    if (!state.sentence) {
        enqueueSnackbar("Sentence must not be empty", ERR_SNACKBAR);
    } else if (!state.noun || !state.verb) {
        enqueueSnackbar("noun and verb must be filled out", ERR_SNACKBAR);
    } else {

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
            enqueueSnackbar(msg, ERR_SNACKBAR);
        } else if (!sentenceDoc) {
            const msg = "Sentence document was undefined.";
            enqueueSnackbar(msg, ERR_SNACKBAR);
        } else {
            // add to redux store, notify user, reset init state
            dispatch(addLevelOneSentence(sentenceDoc))
            enqueueSnackbar("Successfully added new sentence.", SUCCESS_SNACKBAR);
            setState(INIT_STATE);
        }
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
