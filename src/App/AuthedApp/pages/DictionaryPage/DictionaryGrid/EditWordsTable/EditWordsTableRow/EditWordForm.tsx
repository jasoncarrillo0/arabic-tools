import { useSnackbar } from 'notistack';
import React, { useEffect, useState } from 'react';
import { Modal, Paper, TextField } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { Word, DictionaryState, EditableWordField, WordTypes } from 'src/redux/dictionary/interfaces';
import RtlProvider from 'src/App/reusable/RtlProvider';
import { ERR_SNACKBAR, WARN_SNACKBAR } from 'src/helpers/constants';
import { applyWordDocUpdate, WordDocUpdate } from 'src/db-ops/dictionary';
import { updateAllSentencesIncluding } from 'src/db-ops/sentences/general-sentence-ops';
import { replaceWordInState } from 'src/redux/dictionary/dictActionCreators';
import { connect } from 'react-redux';
import { ReduxAction } from 'src/redux/rootReducer';




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
    wordDoc: Word
    field: EditableWordField
    open: boolean
    collectionName: WordTypes
    handleClose: () => void
    replaceWordInState: (id: string, newWord: Word, wordType: WordTypes) => ReduxAction
}



const EditWordForm = ({
    wordDoc,
    field, 
    open, 
    handleClose,
    replaceWordInState,
    collectionName,
} : Props) => {
    const {enqueueSnackbar}             = useSnackbar()
    const [newVal, setNewVal]           = useState(wordDoc[field as keyof Word]);
    const [loading, setLoading]         = useState(false);



    useEffect(() => {
        return () => {
            setLoading(false)
        }
    }, [open, wordDoc, field]);

    useEffect(() => {
        setNewVal(wordDoc[field as keyof Word]);
    }, [field])

    async function updateWord() {
        setLoading(true);
        const update: WordDocUpdate = { [field]: newVal };
        try {
            const newDoc = await applyWordDocUpdate(wordDoc.id, collectionName, "fields", update);
            if (!newDoc) throw new Error("Failed to update word.");
            replaceWordInState(wordDoc.id, newDoc, collectionName);

            // update all sentences that contain a ref to word document
            const shouldUpdateSentence = wordDoc.timesUsed > 0 && (field === "arabic" || field === "english");
            if (shouldUpdateSentence) {
                const sentencesNum = await updateAllSentencesIncluding(newDoc, collectionName)
                if (sentencesNum > 0) {
                    const msg = `Note: ${sentencesNum} use the word just updated; they are flagged until marked resolved by an another admin user.`;
                    enqueueSnackbar(msg, WARN_SNACKBAR);
                }
            }
        } catch (e: any) {
            enqueueSnackbar(e.message, ERR_SNACKBAR)
        }
        setLoading(false);
    }


    return (
        <Modal open={open} onClose={handleClose}>
            <Paper sx={style}>
                {
                    field === "arabic" ? (
                        <RtlProvider>
                            <TextField
                                label={field}
                                value={newVal ? newVal : ""}
                                onChange={(e) => setNewVal(e.target.value)}
                            />
                        </RtlProvider>
                    ) : (
                        <TextField
                            label={field}
                            value={newVal ? newVal : ""}
                            onChange={(e) => setNewVal(e.target.value)}
                        />
                    )
                }
                
                {
                    ((field === "arabic") || (field === "english")) && (
                        <span style={{width: '200px'}}>
                            Note: any sentences using this word will be flagged until resolved by an admin user.
                        </span>
                    )
                }
                <LoadingButton 
                    variant="contained" 
                    loading={loading} 
                    onClick={updateWord}
                    disabled={!newVal || newVal === wordDoc[field as keyof Word]}
                >Update</LoadingButton>
            </Paper>
        </Modal>
    );
};

const mapDispatch = {
    replaceWordInState: (id: string, newWord: Word, wordType: WordTypes) => replaceWordInState(id, newWord, wordType)
}
export default connect(null, mapDispatch)(EditWordForm);