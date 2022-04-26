import { useSnackbar } from 'notistack';
import React, { useEffect, useState } from 'react';

import { Modal, Paper } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { useSelector } from 'react-redux';
import WordPicker from '../../../../reusable/WordPicker';




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
    const WORD_INIT_STATE = { field: wordDoc[field] }
    const {enqueueSnackbar}             = useSnackbar()
    const [newWordObj, setNewWordObj]   = useState(WORD_INIT_STATE);
    const [loading, setLoading]         = useState(false);
    const wordRows                      = useSelector((rootState) => {
        const rows = rootState.dictionary[collectionName];
        return rows;
    });


    useEffect(() => {
        return () => {
            setNewWordObj(WORD_INIT_STATE);
            setLoading(false)
        }
    }, [open]);

    function updateWord() {

    }


    return (
        <Modal open={open} onClose={handleClose}>
            <Paper sx={style}>
                
                <WordPicker
                    rows={wordRows}
                    wordType={field}
                    state={newWordObj}
                    initState={WORD_INIT_STATE}
                    setState={setNewWordObj}
                />
                   
                <LoadingButton 
                    variant="contained" 
                    loading={loading} 
                    onClick={updateWord}
                    disabled={wordDoc.id === newWordObj.id}
                >Update</LoadingButton>
            </Paper>
        </Modal>
    );
};

export default EditWordForm;