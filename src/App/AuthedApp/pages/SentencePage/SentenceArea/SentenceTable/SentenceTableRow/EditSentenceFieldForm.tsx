import React, { useEffect, useState } from 'react';
import { useSnackbar } from 'notistack'
import { Modal, Paper, TextField } from '@mui/material';
import { connect, useSelector } from 'react-redux';
import { LoadingButton } from '@mui/lab';
import SentenceWordPicker from '../SentenceWordPicker';
import { Sentence, SentenceCollectionNames, SentenceTypes, SentenceWord } from 'src/redux/sentence/interfaces';
import { ReduxAction, RootState } from 'src/redux/rootReducer';
import { Word, WordTypes } from 'src/redux/dictionary/interfaces';
import { applySentenceUpdate } from 'src/db-ops/sentences/general-sentence-ops';
import { ERR_SNACKBAR } from 'src/helpers/constants';
import { replaceSentenceInState } from 'src/redux/sentence/sentenceActionCreators';

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


type Props = {
    docId: Sentence["id"]
    field: "arabic" | "english" | WordTypes
    fieldVal: string | SentenceWord
    open: boolean
    handleClose: () => void
    replaceSentenceInState: (sentence: Sentence, collection: SentenceTypes) => ReduxAction
    collectionName: SentenceCollectionNames
    title?: string
    wordId?: string
}


const EditSentenceFieldForm = ({ 
    docId, 
    field, 
    fieldVal, 
    open, 
    handleClose,
    replaceSentenceInState,
    collectionName,
    title="",
} : Props) => {

    


    const {enqueueSnackbar}                              = useSnackbar()
    const [sentenceVal, setSentenceVal]                  = useState(fieldVal as string);
    const [newWordObj, setNewWordObj]                    = useState(fieldVal as SentenceWord);
    const [loading, setLoading]                          = useState(false);
    const notUpdatingWord                                = ["arabic", "english"].includes(field);
    const wordRows                                       = useSelector((rootState: RootState): Word[] | null => {
        if (field !== "english" && field !== "arabic") {
            const rows = rootState.dictionary[field];
            return rows;
        }
        return null;
    });

    const fieldArgErr = (!notUpdatingWord && !wordRows);


    useEffect(() => {
        return () => {
            setNewWordObj(fieldVal as SentenceWord);
            setSentenceVal(fieldVal as string);
            setLoading(false)
        }
    }, [open]);

    if (fieldArgErr) {
        enqueueSnackbar("Incorrect field applied to edit field component");
        return null
    }

    async function updateSentence() {
        setLoading(true);
        try {

            let update;
            if (notUpdatingWord) {
                update = sentenceVal;
            } else {
                update = newWordObj;
            }
            let newDoc = await applySentenceUpdate(
                docId,
                collectionName,
                update,
                field,
                notUpdatingWord,
                typeof(update) === "object" ? (fieldVal as SentenceWord).id : ""
            );
            if (!newDoc) {
                enqueueSnackbar("No updated document returned from applySentenceUpdate")
            } else {
                replaceSentenceInState(newDoc, collectionName)
            }
            handleClose();
        } catch (e: any) {
            enqueueSnackbar(e.message, ERR_SNACKBAR);
        }
        setLoading(false);
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
                            rows={wordRows!}
                            wordType={field as WordTypes}
                            state={newWordObj}
                            initState={fieldVal as SentenceWord}
                            setState={setNewWordObj}
                        />
                    )
                }
                <LoadingButton 
                    variant="contained" 
                    loading={loading} 
                    onClick={updateSentence}
                    disabled={notUpdatingWord ? sentenceVal === (fieldVal as string) : newWordObj.arabic === (fieldVal as SentenceWord).arabic}
                >Update</LoadingButton>
            </Paper>
        </Modal>
    );
};

const mapDispatch = {
    replaceSentenceInState: (sentence: Sentence, collection: SentenceTypes) => replaceSentenceInState(sentence, collection)
}
export default connect(null, mapDispatch)(EditSentenceFieldForm);