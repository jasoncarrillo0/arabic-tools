import { TableRow, Button } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useSnackbar } from "notistack";
import { handleDeleteLevelOneSentence } from '../../../helpers/sentence-utils';
import EditSentenceFieldForm from './SentenceTableRow/EditSentenceFieldForm';
import BasicAlertConfirm from '../../reusable/BasicAlertConfirm';
import s from './SentenceTableRow.module.scss';
import { useAuth } from '../../../contexts/AuthContext';
import { useLocation } from 'react-router-dom'
import SentenceCell from './SentenceTableRow/SentenceCell';
const SentenceTableRow = ({ row, collectionName, wordTypes }) => {
    const { isAdminUser } = useAuth();
    const [deleteLoading, setDeleteLoading] = useState(false);
    const { enqueueSnackbar }               = useSnackbar();
    const fontStyle                         = {fontSize: '20px'};
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
    const location = useLocation();
    const isEditing = isAdminUser && location.pathname.includes("/home/create/");
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
            <SentenceCell
                isEditing={isEditing}
                onClick={() => setDynamicFieldOpen("arabic", true)}
                style={fontStyle}
            >{row.sentence.arabic}</SentenceCell>
            

            <SentenceCell
                onClick={() => setDynamicFieldOpen("english", true)}
                isEditing={isEditing}
            >
                {row.sentence.english}
            </SentenceCell>
            
            {
                wordTypes.map((type, idx) => (
                    <SentenceCell
                        key={idx}
                        style={fontStyle}
                        onClick={() => setDynamicFieldOpen(type, true)}
                        isEditing={isEditing}
                    >{row.words[type].word}</SentenceCell>
                ))
            }
            {
                isEditing && (
                    <>
                        <SentenceCell isEditing={true} style={{width: "195px"}}>
                            <Button 
                                onClick={() => setDeleteDialogOpen(true)} 
                                variant="outlined" 
                                color="error" 
                            >Delete Sentence</Button>
                        </SentenceCell>
                        
                        <BasicAlertConfirm
                            open={deleteDialogOpen}
                            title="Are you sure you want to delete this sentence?"
                            content="This action is permanent and cannot be undone."
                            handleClose={() => setDeleteDialogOpen(false)}
                            handleConfirm={deleteSentence}
                            loading={deleteLoading}
                        />
                        <EditSentenceFieldForm
                            docId={row.id}
                            field="arabic"
                            fieldVal={row.sentence.arabic}
                            open={editFormOpenState.arabic}
                            handleClose={() => setDynamicFieldOpen("arabic", false)}
                            title="Edit sentence"
                            collectionName={collectionName}
                            key={235}
                        />
                        <EditSentenceFieldForm
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
                                <EditSentenceFieldForm
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
                    </>
                )
            }
            

        </TableRow>
    );
};

export default SentenceTableRow;