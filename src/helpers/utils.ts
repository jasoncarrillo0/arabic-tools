import { Adjective, DictionaryState, EditableWordField, EDITABLE_WORD_FIELDS, Noun, Particle, Preposition, Verb, Word } from 'src/redux/dictionary/interfaces';
import { LevelOneSentence, LevelTwoSentence, SentenceState } from 'src/redux/sentence/interfaces';
import { collection, getDocs } from 'firebase/firestore';
import { db } from 'src/firebase/firebase';


export function getVerbsObj(verbs: string) {
    let split = verbs.split(",");
    let cleanedSplit = split.map(verb => verb.replace(/\t/g, " "));
    let obj: {[key: string]: string} = {};
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


export function hasExpectedCols(expectedCols: string[], firstRow: string[]) {
    for (let i = 0; i < firstRow.length; i++) {
        if (expectedCols[i].toLowerCase() !== firstRow[i].toLowerCase()) {
            return false;
        }
    }
    return true;
}








export function getColsFromRows(rows: Word[], defaultWidth: number = 130) {
    const colArr = Object.keys(rows[0]).filter(key => key !== "id");
    return colArr
    .map(col => ({
        field: col,
        headerName: camelCase2Title(col),
        width: col === "arabic" && defaultWidth === 130 ? 90 : defaultWidth
    }))
    .sort((a,b) => a.field.localeCompare(b.field))
}



export function getEditableColsFromRows(rows: Word[], defaultWidth: number = 130) {
    const colArr = Object.keys(rows[0]).filter(key => (EDITABLE_WORD_FIELDS as ReadonlyArray<string>).includes(key));
    return colArr
    .map(col => ({
        field: col as EditableWordField,
        headerName: col,
        width: col === "arabic" && defaultWidth === 130 ? 90 : defaultWidth
    }))
    .sort((a,b) => a.field.localeCompare(b.field))
}





export async function getDictionary(): Promise<DictionaryState> {
    const adjectives   = (await getDocs(collection(db, "adjectives"))).docs.map(doc => ({ id: doc.id, ...(doc.data() as Omit<Adjective, "id">)}));
    const nouns        = (await getDocs(collection(db, "nouns"))).docs.map(doc => ({ id: doc.id, ...(doc.data() as Omit<Noun, "id">)}));
    const verbs        = (await getDocs(collection(db, "verbs"))).docs.map(doc => ({ id: doc.id, ...(doc.data() as Omit<Verb, "id">)}));
    const particles    = (await getDocs(collection(db, "particles"))).docs.map(doc => ({ id: doc.id, ...(doc.data() as Omit<Particle, "id">)}));
    const connectors   = (await getDocs(collection(db, "connectors"))).docs.map(doc => ({ id: doc.id, ...(doc.data() as Omit<Particle, "id">)}));
    const prepositions = (await getDocs(collection(db, "prepositions"))).docs.map(doc => ({ id: doc.id, ...(doc.data() as Omit<Preposition, "id">)}));


    const dictionary: DictionaryState = {
        adjectives,
        nouns,
        verbs,
        particles,
        connectors,
        prepositions
    };
    return dictionary;
}




export async function getAllSentences(): Promise<SentenceState> {
    const levelOneSentences = (await getDocs(collection(db, "levelOneSentences"))).docs.map(doc => ({ id: doc.id, ...(doc.data() as Omit<LevelOneSentence, "id">)}));
    const levelTwoSentences = (await getDocs(collection(db, "levelTwoSentences"))).docs.map(doc => ({ id: doc.id, ...(doc.data() as Omit<LevelTwoSentence, "id">)}));


    const sentences: SentenceState = {
        levelOneSentences,
        levelTwoSentences
    };
    return sentences;
}


export function camelCase2Title(camelCase: string){
    return camelCase.replace(/([A-Z])/g, (match) => ` ${match}`)
            .replace(/^./, (match) => match.toUpperCase())
            .trim()
}