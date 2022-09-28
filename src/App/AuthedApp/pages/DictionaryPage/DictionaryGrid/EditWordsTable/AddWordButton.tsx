import { Button, Modal, Paper, TableCell, TableRow, TextField } from '@mui/material';
import { LoadingButton } from '@mui/lab'
import React, { useEffect, useState } from 'react';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import s from './AddWordButton.module.scss';
import { addDoc, collection, getDoc } from "firebase/firestore";
import { useSnackbar } from 'notistack'
import { Word, EditableWordField, WordTypes } from 'src/redux/dictionary/interfaces';
import { db } from 'src/firebase/firebase';
import { ERR_SNACKBAR } from 'src/helpers/constants';
import { addWordInState } from 'src/redux/dictionary/dictActionCreators';
import { ReduxAction, RootState } from 'src/redux/rootReducer';
import { connect, useSelector } from 'react-redux';


type Props = {
    wordType: WordTypes
    cols: EditableWordField[]
    addWordInState: (newWord: Word, wordType: WordTypes) => ReduxAction
}


const AddWordButton = ({ cols, wordType, addWordInState }: Props) => {

    const INIT_STATE: {[key in EditableWordField]?: string} = {};

    for (const editableField of cols) {
        INIT_STATE[editableField] = "";
    }


    const [open, setOpen]           = useState(false);
    const [wordState, setWordState] = useState(INIT_STATE);
    const [loading, setLoading]     = useState(false);
    const [isDuplicate, setIsDuplicate] = useState(false);
    const { enqueueSnackbar }       = useSnackbar();
    const allWords                  = useSelector((rootState: RootState) => {
        const words = rootState.dictionary[wordType];
        return words;
    });

    const wordTypeSingular          = wordType.slice(0, wordType.length - 1);
    useEffect(() => {
        return () => {
            setOpen(false);
            setLoading(false);
            setWordState(INIT_STATE);
        }
    }, [])


    useEffect(() => {
        let isDuplicate = false;
        if (wordState.arabic && wordState.english) {
            for (const word of allWords) {
                if (word.arabic === wordState.arabic && word.english === wordState.english) {
                    isDuplicate = true;
                }
            }
        }
        setIsDuplicate(isDuplicate);
    }, [wordState.arabic, wordState.english])

    async function handleCreate() {
        setLoading(true);
        
        try {
            if (!wordState.arabic || !wordState.english) throw new Error("Arabic and English must be filled out.");
            // check if word exists
            

            const newWord   = {...wordState, timesUsed: 0};
            const coll      = collection(db, wordType);
            const newDocRef = await addDoc(coll, newWord);
            const newDoc    = (await getDoc(newDocRef)).data() as Word;
            addWordInState(newDoc, wordType);
            enqueueSnackbar("Successfully added new word to dictionary.")
        } catch (e: any) {
            enqueueSnackbar(e.message, ERR_SNACKBAR)
        }
        setLoading(false);
    }

    return (
            <>
                <Button className={s.btn} variant="contained" color="info" onClick={() => setOpen(true)} endIcon={<AddCircleIcon/>}>
                    Add {wordTypeSingular}
                </Button>
                <Modal open={open} onClose={() => setOpen(false)}>
                    <Paper className={s.paperWrap}>
                        <h2>Add {wordTypeSingular}</h2>
                        {
                            Object.keys(INIT_STATE).map((col, idx) => (
                                <section key={idx}>
                                    <TextField
                                        label={col}
                                        value={wordState[col as EditableWordField]}
                                        onChange={({ target }) => setWordState(prev => ({ ...prev, [col]: target.value}))}
                                        error={["arabic", "english"].includes(col) ? isDuplicate : false}
                                        helperText={isDuplicate && "word taken"}
                                        fullWidth
                                    />
                                </section>
                            ))
                        }
                        <LoadingButton 
                            variant="contained" 
                            onClick={handleCreate} 
                            loading={loading}
                            disabled={(!wordState.arabic || !wordState.english) || isDuplicate === true}
                        >Create {wordTypeSingular}</LoadingButton>
                    </Paper>
                </Modal>
            </>
                

    );
};

const mapDispatch = {
    addWordInState: (newWord: Word, wordType: WordTypes) => addWordInState(newWord, wordType)
}
const mapStateToProps = (rootState: RootState) => {
    const {dictionary} = rootState;

}
export default connect(null, mapDispatch)(AddWordButton);