import React, { useEffect, useState } from 'react';
import { useSnackbar } from 'notistack'
import { Modal, Paper, TextField } from '@mui/material';
import WordPicker from '../../../reusable/WordPicker';
import { useSelector } from 'react-redux';
import { LoadingButton } from '@mui/lab';
import to from 'await-to-js';
import { applyDocumentUpdate, replaceSentence } from '../../../../helpers/sentence-utils'
import { ERR_SNACKBAR, SENTENCE_COLLECTION_NAMES } from '../../../../helpers/constants';

const editFields = ["arabic", "english", "noun", "verb", "connector", "preposition", "particle", "adjective"];
const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    bgcolor: '#e2e2e2',
    boxShadow: 24,
    p: 4,
};


/*
    fieldVal:
    {id: string, word: arabic string }
*/

const sentenceLevels = Object.values(SENTENCE_COLLECTION_NAMES);
const EditFieldForm = ({ 
    docId, 
    field, 
    fieldVal, 
    open, 
    handleClose, 
    title="", 
    sentenceLevel="" 
}) => {
    const NEW_FIELD_INIT_STATE = {[field]: { id: docId, word: fieldVal}};
    const {enqueueSnackbar} = useSnackbar()
    const [sentenceVal, setSentenceVal] = useState(fieldVal);
    const [newFieldVal, setNewFieldVal] = useState(NEW_FIELD_INIT_STATE);
    const [loading, setLoading]         = useState(false);
    const wordRows = useSelector((rootState) => {
        const rows = rootState.dictionary[`${field}s`];
        return rows;
    })

    useEffect(() => {
        return () => {
            setNewFieldVal(NEW_FIELD_INIT_STATE);
            setSentenceVal(fieldVal);
            setLoading(false)
        }
    }, [open])

    if (!wordRows && !["arabic", "english"].includes(field)) return enqueueSnackbar("Could not get dictionary rows from state in edit sentence field component");
    if (!editFields.includes(field)) {
        return enqueueSnackbar("Incorrect field applied to edit field component");
    }

    async function updateSentence() {
        setLoading(true);
        const [e1, newDoc] = await to(applyDocumentUpdate(docId, sentenceLevel, "sentences", sentenceVal, field))
        if (e1) {
            enqueueSnackbar(e1.message, ERR_SNACKBAR);
        } else if (!newDoc) {
            enqueueSnackbar("No updated document returned from applyDocumentUpdate")
        } else {
            replaceSentence(newDoc, sentenceLevel);
        }
        setLoading(false);
        handleClose();
    }


    

    return (
        <Modal open={open} onClose={handleClose}>
            <Paper sx={style}>
                <h2>{title}</h2>
            {
                !wordRows ? (
                    <TextField
                        value={sentenceVal}
                        onChange={({ target }) => setSentenceVal(target.value)}
                        label={field}
                        dir="rtl"
                        fullWidth
                        sx={{margin: '0.5rem 0'}}
                    />
                ) : (
                    <WordPicker
                        rows={wordRows}
                        wordType={field}
                        state={newFieldVal}
                        setState={setNewFieldVal}
                    />
                )
            }
            <LoadingButton variant="contained" loading={loading} onClick={updateSentence}>Update</LoadingButton>
            </Paper>
        </Modal>
    );
};

export default EditFieldForm;