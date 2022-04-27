import { Button, Dialog, DialogContent, DialogTitle, IconButton, TableCell, TableRow } from '@mui/material';
import React, { useEffect, useState } from 'react';
import EditWordForm from './EditWordsTableRow/EditWordForm';
import DeleteIcon from '@mui/icons-material/Delete';
import { DICT_FIREBASE_ID, ERR_SNACKBAR } from '../../../../helpers/constants';
import { useSnackbar } from 'notistack';
import { deleteDoc, doc } from 'firebase/firestore';
import { db } from '../../../../firebase/firebase';
import { deleteDocFromRdx } from '../../../../helpers/utils';
import { LoadingButton } from '@mui/lab';

/*
    row: 
    {
        id: string
        arabic: string
        english: string
        phonetic: string
        ...otherFields
    }

*/
const EditWordsTableRow = ({ row, collectionName }) => {
    const allKeys = Object.keys(row).filter(key => !["id", "timesUsed"].includes(key)).sort((a, b) => a.localeCompare(b));
    const INIT_EDIT_FORM_OPEN_STATE = Object.assign(
        {}, 
        ...allKeys.map(column => ({[column]: false}))
    );
    const [editFormsState, setEditFormsState] = useState(INIT_EDIT_FORM_OPEN_STATE);
    const [deleteFormOpen, setDeleteFormOpen] = useState(false);
    const [deleteLoading, setDeleteLoading]   = useState(false);
    const { enqueueSnackbar }                 = useSnackbar();
    

    useEffect(() => {
        return () => {
            setDeleteLoading(false);
            setDeleteFormOpen(false);
            setEditFormsState(INIT_EDIT_FORM_OPEN_STATE);
        }
    }, []);

    function setEditFormOpen(column, boolean) {
        setEditFormsState(prev => ({
            ...prev,
            [column]: boolean
        }))
    }
    const fontStyle = {fontSize: "20px", fontWeight: 'bold'}

    async function handleDelete() {
        setDeleteLoading(true);
        try {
            if (row.timesUsed !== 0) throw new Error("This word is currently being used in a sentence. Please update the sentence before deleting the word.");
            const wordDocRef = doc(db, "dictionary", DICT_FIREBASE_ID, collectionName, row.id)
            await deleteDoc(wordDocRef);
            deleteDocFromRdx(row.id, collectionName);
        } catch (e) {
            enqueueSnackbar(e.message, ERR_SNACKBAR)
        }
        setDeleteLoading(false);
    }
    return (
        <TableRow
            sx={{
                "&:last-child td, &:last-child th": {
                    border: 0,
                }
            }}
        >
            {
                allKeys.map((field, idx) => (
                    <TableCell 
                        key={idx} 
                        style={field === "arabic" ? fontStyle : {}}
                        onClick={() => setEditFormOpen(field, true)}
                    >{row[field]}</TableCell>
                ))
            }
            <TableCell>
                <IconButton onClick={() => setDeleteFormOpen(true)}>
                    <DeleteIcon/>
                </IconButton>
                <Dialog open={deleteFormOpen} onClose={() => setDeleteFormOpen(false)}>
                    <DialogTitle>Are you sure you want to delete this word?</DialogTitle>
                    <DialogContent sx={{display: "flex", marginLeft: "auto"}}>
                        <Button onClick={() => setDeleteFormOpen(false)}>No</Button>
                        <LoadingButton loading={deleteLoading} onClick={handleDelete}>Yes</LoadingButton>
                    </DialogContent>
                </Dialog>
            </TableCell>
            {
                allKeys.map((field, idx) => (
                    <EditWordForm
                        key={idx*20}
                        wordDoc={row}
                        field={field}
                        open={editFormsState[field]}
                        handleClose={() => setEditFormOpen(field, false)}
                        collectionName={collectionName}
                    />
                ))
            }
                    
            

        </TableRow>
    );
};

export default EditWordsTableRow;