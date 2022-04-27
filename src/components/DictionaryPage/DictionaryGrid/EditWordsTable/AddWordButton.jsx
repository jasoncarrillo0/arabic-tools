import { Button, Modal, Paper, TableCell, TableRow, TextField } from '@mui/material';
import { LoadingButton } from '@mui/lab'
import React, { useEffect, useState } from 'react';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import s from './AddWordButton.module.scss';
import { addDoc, collection, getDoc } from "firebase/firestore";
import { db } from '../../../../firebase/firebase'
import { DICT_FIREBASE_ID, ERR_SNACKBAR } from '../../../../helpers/constants';
import { addNewDocToRdx } from '../../../../helpers/utils'
import { useSnackbar } from 'notistack'


const AddWordButton = ({ cols, collectionName }) => {
    const INIT_STATE = {};
    for (const col of cols) {
        if (col !== "timesUsed") {
            INIT_STATE[col] = "";
        }
    }

    const [open, setOpen]           = useState(false);
    const [wordState, setWordState] = useState(INIT_STATE);
    const [loading, setLoading]     = useState(false);
    const { enqueueSnackbar }       = useSnackbar
    const wordType                  = collectionName.slice(0, -1)

    useEffect(() => {
        return () => {
            setOpen(false);
            setLoading(false);
            setWordState(INIT_STATE);
        }
    }, [])


    async function handleCreate() {
        setLoading(true);
        try {
            if (!wordState.arabic || !wordState.english) throw new Error("Arabic and English must be filled out.");
            const newWord   = {...wordState, timesUsed: 0};
            const coll      = collection(db, 'dictionary', DICT_FIREBASE_ID, collectionName);
            const newDocRef = await addDoc(coll, newWord);
            const newDoc    = await getDoc(newDocRef);
            addNewDocToRdx(newDoc, collectionName);
            enqueueSnackbar("Successfully added new word to dictionary.")
        } catch (e) {
            enqueueSnackbar(e.message, ERR_SNACKBAR)
        }
        setLoading(false);
    }

    return (
        <TableRow classes={{root: s.wrap}}>
            <TableCell>
                <Button variant="contained" color="success" onClick={() => setOpen(true)} endIcon={<AddCircleIcon/>}>Add {wordType}</Button>
                <Modal open={open} onClose={() => setOpen(false)}>
                    <Paper className={s.paperWrap}>
                        <h2>Add {wordType}</h2>
                        {
                            Object.keys(INIT_STATE).map((col, idx) => (
                                <section key={idx}>
                                    <TextField
                                        label={col}
                                        value={wordState[col]}
                                        onChange={({ target }) => setWordState(prev => ({ ...prev, [col]: target.value}))}
                                        fullWidth
                                    />
                                </section>
                            ))
                        }
                        <LoadingButton 
                            variant="contained" 
                            onClick={handleCreate} 
                            loading={loading}
                            disabled={!wordState.arabic || !wordState.english}
                        >Create {wordType}</LoadingButton>
                    </Paper>
                </Modal>
            </TableCell>
        </TableRow>
    );
};

export default AddWordButton;