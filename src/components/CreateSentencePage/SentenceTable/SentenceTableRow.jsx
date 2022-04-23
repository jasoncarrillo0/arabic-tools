import { TableCell, TableRow, Button, Tooltip } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useSnackbar } from "notistack";
import { handleDeleteLevelOneSentence } from '../../../helpers/sentence-utils';
import EditFieldForm from './SentenceTableRow/EditFieldForm';
import BasicAlertConfirm from '../../reusable/BasicAlertConfirm';
import s from './SentenceTableRow.module.scss';

const SentenceTableRow = ({ row, collectionName, wordTypes }) => {

    const [deleteLoading, setDeleteLoading] = useState(false);
    const { enqueueSnackbar }               = useSnackbar();
    const fontStyle                         = {fontSize: '20px'};
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
    const INIT_EDIT_FORM_OPEN_STATE = Object.assign(
        {}, 
        {
            arabic: false,
            english: false
        },
        ...wordTypes.map(word => ({[word]: false}))
    );
    const [editFormOpenState, setEditFormOpenState] = useState(INIT_EDIT_FORM_OPEN_STATE);

    // clean up
    useEffect(() => {
        return () => {
            setDeleteLoading(false);
            setEditFormOpenState(INIT_EDIT_FORM_OPEN_STATE);
            setDeleteDialogOpen(false);
        }
    },[])

    function setDynamicFieldOpen(wordType, boolean) {
        setEditFormOpenState(prev => ({
            ...prev,
            [wordType]: boolean
        }))
    }

    async function deleteSentence() {
        setDeleteLoading(true);
        await handleDeleteLevelOneSentence(row, collectionName, enqueueSnackbar);
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
            <Tooltip title="edit" arrow>
                <TableCell onClick={() => setDynamicFieldOpen("arabic", true)} sx={fontStyle} component="th" scope="row">
                    {row.sentence.arabic}
                </TableCell>
            </Tooltip>
            
            <Tooltip title="edit" arrow>
                <TableCell onClick={() => setDynamicFieldOpen("english", true)}>
                    {row.sentence.english}
                </TableCell>
            </Tooltip>
            
            {
                wordTypes.map((type, idx) => (
                    <Tooltip key={idx} title="edit" arrow>
                        <TableCell
                            sx={fontStyle}
                            onClick={() => setDynamicFieldOpen(type, true)}
                        >{row.words[type].word}</TableCell>
                    </Tooltip>
                ))
            }
            <TableCell sx={{width: "195px"}}>
                <Button 
                    onClick={() => setDeleteDialogOpen(true)} 
                    variant="outlined" 
                    color="error" 
                >Delete Sentence</Button>
            </TableCell>
            <BasicAlertConfirm
                open={deleteDialogOpen}
                title="Are you sure you want to delete this sentence?"
                content="This action is permanent and cannot be undone."
                handleClose={() => setDeleteDialogOpen(false)}
                handleConfirm={deleteSentence}
                loading={deleteLoading}
            />
            <EditFieldForm
                docId={row.id}
                field="arabic"
                fieldVal={row.sentence.arabic}
                open={editFormOpenState.arabic}
                handleClose={() => setDynamicFieldOpen("arabic", false)}
                title="Edit sentence"
                collectionName={collectionName}
                key={235}
            />
            <EditFieldForm
                docId={row.id}
                field="english"
                fieldVal={row.sentence.english}
                open={editFormOpenState.english}
                handleClose={() => setDynamicFieldOpen("english", false)}
                title="Edit sentence"
                collectionName={collectionName}
                key={234}
            />
            {
                wordTypes.map((type, idx) => (
                    <EditFieldForm
                        key={idx*20}
                        docId={row.id}
                        field={type}
                        fieldVal={row.words[type].word}
                        open={editFormOpenState[type]}
                        handleClose={() => setDynamicFieldOpen(type, false)}
                        collectionName={collectionName}
                        wordId={row.words[type].id}
                    />
                ))
            }

        </TableRow>
    );
};

export default SentenceTableRow;