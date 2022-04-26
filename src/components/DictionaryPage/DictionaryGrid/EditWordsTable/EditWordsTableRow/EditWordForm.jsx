import { useSnackbar } from 'notistack';
import React, { useEffect, useState } from 'react';
import { Modal, Paper, TextField } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { applyWordDocUpdate, getSentencesWith, replaceWord, applySentenceUpdate, updateSentencesWith } from '../../../../../helpers/sentence-utils'
import RtlProvider from '../../../../reusable/RtlProvider';
import to from 'await-to-js';
import { ERR_SNACKBAR } from '../../../../../helpers/constants';




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



const EditWordForm = ({
    wordDoc, 
    field, 
    open, 
    handleClose,
    collectionName,
}) => {
    const {enqueueSnackbar}             = useSnackbar()
    const [newVal, setNewVal]           = useState(wordDoc[field]);
    const [loading, setLoading]         = useState(false);



    useEffect(() => {
        return () => {
            setNewVal(wordDoc[field]);
            setLoading(false)
        }
    }, [open]);

    async function updateWord() {
        setLoading(true);
        const update = { [field]: newVal };
        try {
            const [e1, newDoc] = await to(applyWordDocUpdate(wordDoc.id, collectionName, update))
            if (e1) throw new Error(e1);
            if (!newDoc) throw new Error("Failed to update word.");
            replaceWord(newDoc, collectionName);

            // update all sentences that contain a ref to word document (sentences only contain refs to id and arabic field)
            const shouldUpdateSentence = newDoc.timesUsed > 0 && field === "arabic";
            if (shouldUpdateSentence) {
                await updateSentencesWith(newDoc, collectionName)
            }
        } catch (e) {
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
                                value={newVal}
                                onChange={(e) => setNewVal(e.target.value)}
                            />
                        </RtlProvider>
                    ) : (
                        <TextField
                            label={field}
                            value={newVal}
                            onChange={(e) => setNewVal(e.target.value)}
                        />
                    )
                }
                
                   
                <LoadingButton 
                    variant="contained" 
                    loading={loading} 
                    onClick={updateWord}
                    disabled={!newVal || newVal === wordDoc[field]}
                >Update</LoadingButton>
            </Paper>
        </Modal>
    );
};

export default EditWordForm;