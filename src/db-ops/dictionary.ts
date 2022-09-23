import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "src/firebase/firebase";
import { EditableWordField, Word, WordTypes } from "src/redux/dictionary/interfaces";
import { store } from "src/redux/store";

const { getState } = store;



export type WordDocUpdate = {
    [key in EditableWordField]?: string
}
export async function applyWordDocUpdate(id: Word["id"], collection: WordTypes, type: "increment" | "decrement" | "fields", update?: WordDocUpdate) {

    // find existing word and create copy
    const wordColl = getState().dictionary[collection] as Word[];
    let existingWord = wordColl.find(word => word.id === id);
    if (!existingWord) throw new Error(`${collection} with id ${id} not found in state.`);
    let updatedWord = { ...existingWord };

    // "increment", "decrement", or object merge 
    if (type === "increment") {
        updatedWord.timesUsed = existingWord.timesUsed + 1;
    } else if (type === "decrement") {
        updatedWord.timesUsed = existingWord.timesUsed > 0 ? existingWord.timesUsed - 1 : existingWord.timesUsed;
    } else if (type === "fields") {
        updatedWord = {
            ...existingWord,
            ...update
        }
    } else {
        throw new Error("Incorrect update argument supplied to applyWordDocUpdate");
    }

    // apply db update, resolve updated document
    const wordRef = doc(db, collection, existingWord.id);
    await setDoc(wordRef, updatedWord, { merge: true });
    const updatedDoc = (await getDoc(wordRef)).data() as Word;
    return updatedDoc;
}

