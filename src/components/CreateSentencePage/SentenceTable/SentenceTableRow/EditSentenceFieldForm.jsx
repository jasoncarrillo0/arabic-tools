import React, { useEffect, useState } from 'react';
import { useSnackbar } from 'notistack'
import { Modal, Paper, TextField } from '@mui/material';
import { useSelector } from 'react-redux';
import { LoadingButton } from '@mui/lab';
import to from 'await-to-js';
import { applySentenceUpdate, replaceSentence } from '../../../../helpers/sentence-utils'
import { SENTENCE_TRANSLATIONS, ERR_SNACKBAR, SENTENCE_OBJ_FIELDS } from '../../../../helpers/constants';
import SentenceWordPicker from '../SentenceWordPicker';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    bgcolor: '#e2e2e2',
    boxShadow: 24,
    p: 4,
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem'
};


/*
    docId: firebase sentence doc id
    field: must be within SENTENCE_OBJ_FIELDS ([arabic, english, ...all other singular word types (noun, verb, etc)])
    fieldVal: string (arabic word, or sentence (english or arabic))
    open: boolean
    handleClose: closes modal
    collectionName: must be in SENTENCE_COLLECTIONS
    title: title of modal


    In this component we edit either the arabic sentence, the english sentence, or the words used in the sentence
    The db stores a "sentence" object as 
    { 
        id: string
        sentence {
            arabic: string
            english: string
        },
        words: {
            [wordType]: {
                word: arabic string
                id: document id
            }
        }
    }
*/

const EditSentenceFieldForm = ({ 
    docId, 
    field, 
    fieldVal, 
    open, 
    handleClose,
    collectionName,
    title="",
    wordId=""
}) => {
    const NEW_WORD_INIT_STATE           = {[field]: { id: wordId, word: fieldVal}};
    const {enqueueSnackbar}             = useSnackbar()
    const [sentenceVal, setSentenceVal] = useState(fieldVal);
    const [newWordObj, setNewWordObj]   = useState(NEW_WORD_INIT_STATE);
    const [loading, setLoading]         = useState(false);
    const notUpdatingWord               = SENTENCE_TRANSLATIONS.includes(field);
    const wordRows                      = useSelector((rootState) => {
        const rows = rootState.dictionary[`${field}s`];
        return rows;
    })
    const fieldArgErr                   = !SENTENCE_OBJ_FIELDS.includes(field) || (!notUpdatingWord && !wordRows);


    useEffect(() => {
        return () => {
            setNewWordObj(NEW_WORD_INIT_STATE);
            setSentenceVal(fieldVal);
            setLoading(false)
        }
    }, [open]);

    if (fieldArgErr) {
        return enqueueSnackbar("Incorrect field applied to edit field component");
    }

    async function updateSentence() {
        setLoading(true);

        let e1, newDoc, update;
        if (notUpdatingWord) {
            update = sentenceVal;
        } else {
            update = newWordObj;
        }
        [e1, newDoc] = await to(applySentenceUpdate(docId, collectionName, update, field, notUpdatingWord))
        if (e1) {
            enqueueSnackbar(e1, ERR_SNACKBAR);
        } else if (!newDoc) {
            enqueueSnackbar("No updated document returned from applySentenceUpdate")
        } else {
            replaceSentence(newDoc, collectionName)
        }
        setLoading(false);
        handleClose();
    }


    

    return (
        <Modal open={open} onClose={handleClose}>
            <Paper sx={style}>
                {title && <h2>{title}</h2>}
                {
                    notUpdatingWord ? (
                        <TextField
                            value={sentenceVal}
                            onChange={({ target }) => setSentenceVal(target.value)}
                            label={field}
                            dir="rtl"
                            fullWidth
                            sx={{margin: '0.5rem 0'}}
                        />
                    ) : (
                        <SentenceWordPicker
                            rows={wordRows}
                            wordType={field}
                            state={newWordObj}
                            initState={NEW_WORD_INIT_STATE}
                            setState={setNewWordObj}
                        />
                    )
                }
                <LoadingButton 
                    variant="contained" 
                    loading={loading} 
                    onClick={updateSentence}
                    disabled={newWordObj[field].id === NEW_WORD_INIT_STATE[field].id}
                >Update</LoadingButton>
            </Paper>
        </Modal>
    );
};

export default EditSentenceFieldForm;