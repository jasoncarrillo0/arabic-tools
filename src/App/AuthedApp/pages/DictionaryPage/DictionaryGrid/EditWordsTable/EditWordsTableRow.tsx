import { Button, Dialog, DialogContent, DialogContentText, DialogTitle, IconButton, TableCell, TableRow } from '@mui/material';
import React, { useEffect, useState } from 'react';
import EditWordForm from './EditWordsTableRow/EditWordForm';
import DeleteIcon from '@mui/icons-material/Delete';
import { useSnackbar } from 'notistack';
import { deleteDoc, doc } from 'firebase/firestore';
import { LoadingButton } from '@mui/lab';
import { Word, EditableWordField, EDITABLE_WORD_FIELDS, WordTypes } from 'src/redux/dictionary/interfaces';
import { db } from 'src/firebase/firebase';
import { ERR_SNACKBAR } from 'src/helpers/constants';
import { deleteWordInState } from 'src/redux/dictionary/dictActionCreators';
import { connect } from 'react-redux';
import { ReduxAction } from 'src/redux/rootReducer';
import s from './EditWordsTableRow.module.scss';

type Props = {
    row: Word
    collectionName: WordTypes
    deleteWordInState: (id: string, wordType: WordTypes) => ReduxAction
}


/*
    PURPOSE: single component to edit any word type in its respective table, and therefore firestore collection
*/
const EditWordsTableRow = ({ row, collectionName, deleteWordInState }: Props) => {
    
    const rowFields         = Object.keys(row)
    const rowEditableFields = rowFields.filter(key => (EDITABLE_WORD_FIELDS as ReadonlyArray<string>).includes(key)).sort((a, b) => a.localeCompare(b));
    const [deleteFormOpen, setDeleteFormOpen] = useState(false);
    const [deleteLoading, setDeleteLoading]   = useState(false);
    const { enqueueSnackbar }                 = useSnackbar();
    const [editingField, setEditingField]     = useState("")
    const [editingFieldOpen, setEditingFieldOpen] = useState(false);
    const fontStyle = {fontSize: "20px", fontWeight: 'bold'}


    useEffect(() => {
        return () => {
            setDeleteLoading(false);
            setDeleteFormOpen(false);
            setEditingField("");
            setEditingFieldOpen(false);
        }
    }, []);

    useEffect(() => {
        setEditingFieldOpen(false);
    }, [row])


    async function handleDelete() {
        setDeleteLoading(true);
        try {
            
            if (row.timesUsed !== 0) throw new Error("This word is currently being used in a sentence. Please update the sentence before deleting the word.");
            const wordDocRef = doc(db, collectionName, row.id)
            await deleteDoc(wordDocRef);
            deleteWordInState(row.id, collectionName);
        } catch (e: any) {
            enqueueSnackbar(e.message, ERR_SNACKBAR)
        }
        setDeleteLoading(false);
    }

    function handleEditFieldClick(field: EditableWordField) {
        setEditingFieldOpen(true);
        setEditingField(field);
    }

    function handleEditFieldClose() {
        setEditingField("");
        setEditingFieldOpen(false);
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
                rowEditableFields.sort((a,b) => a.localeCompare(b)).map((field, idx) => (
                    <TableCell
                        classes={{ root: s.cell }}
                        key={idx} 
                        style={field === "arabic" ? fontStyle : {}}
                        onClick={() => handleEditFieldClick(field as EditableWordField)}
                    >{row[field as keyof Word]}</TableCell>
                ))
            }
            <TableCell>
                <IconButton onClick={() => setDeleteFormOpen(true)}>
                    <DeleteIcon/>
                </IconButton>
                <Dialog open={deleteFormOpen} onClose={() => setDeleteFormOpen(false)}>
                    <DialogTitle>
                        { 
                            row.timesUsed > 0 ? (
                                "This word is being used in sentences."
                            ) : (
                                "Are you sure you want to delete this word?"
                            )
                        } 
                    </DialogTitle>
                    <DialogContent sx={{display: "flex", marginLeft: "auto"}}>
                        {
                            row.timesUsed ? (
                                <>
                                    <DialogContentText>
                                        Please update sentences before deleting this word.
                                    </DialogContentText>
                                    <Button onClick={() => setDeleteFormOpen(false)}>Cancel</Button>
                                </>
                            ) : (
                                <>
                                    <Button onClick={() => setDeleteFormOpen(false)}>No</Button>
                                    <LoadingButton loading={deleteLoading} onClick={handleDelete}>Yes</LoadingButton>
                                </>
                            )
                        }
                        
                    </DialogContent>
                </Dialog>
            </TableCell>

            <EditWordForm
                wordDoc={row}
                field={editingField as EditableWordField}
                open={editingFieldOpen}
                handleClose={() => handleEditFieldClose()}
                collectionName={collectionName}
            />
        </TableRow>
    );
};

const mapDispatch = {
    deleteWordInState: (id: string, wordType: WordTypes) => deleteWordInState(id, wordType)
}
export default connect(null, mapDispatch)(EditWordsTableRow);