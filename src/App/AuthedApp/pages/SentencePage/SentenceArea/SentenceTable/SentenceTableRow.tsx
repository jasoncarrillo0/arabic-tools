import { TableRow, Button } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useSnackbar } from "notistack";
import EditSentenceFieldForm from './SentenceTableRow/EditSentenceFieldForm';
import s from './SentenceTableRow.module.scss';
import { useLocation } from 'react-router-dom'
import SentenceCell from './SentenceTableRow/SentenceCell';
import { useAuth } from 'src/contexts/AuthContext';
import BasicAlertConfirm from 'src/App/reusable/BasicAlertConfirm';
import { SentenceCollectionNames, Sentence } from 'src/redux/sentence/interfaces';
import { deleteSentenceInDb } from 'src/db-ops/sentences/general-sentence-ops';
import { ERR_SNACKBAR } from 'src/helpers/constants';
import { SentenceFormState } from '../SentenceTable';
import ResolveSentenceBtn from './SentenceTableRow/ResolveSentenceBtn';


type Props = {
    row: Sentence
    collectionName: SentenceCollectionNames
}

export const UNRESOLVED_TABLE_ROW_COLOR = "#ffdbdb";

const SentenceTableRow = ({ row, collectionName }: Props) => {
    
    const { isAdminUser } = useAuth();
    const [deleteLoading, setDeleteLoading] = useState(false);
    const { enqueueSnackbar }               = useSnackbar();
    const fontStyle                         = {fontSize: '20px'};
    const wordStyle                         = {width: '90px'}
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
    const location = useLocation();
    const isEditing = isAdminUser && location.pathname.includes("/home/sentences/edit/");
    const INIT_EDIT_FORM_OPEN_STATE: SentenceFormState = Object.assign(
        {}, 
        {
            arabic: false,
            english: false
        },
        ...row.words.map(word => ({[word.wordType]: false}))
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

    function setDynamicFieldOpen(wordType: keyof SentenceFormState, b: boolean) {
        setEditFormOpenState(prev => ({
            ...prev,
            [wordType]: b
        }))
    }

    async function deleteSentence() {
        setDeleteLoading(true);
        try {
            await deleteSentenceInDb(row, collectionName);
        } catch (e: any) {
            enqueueSnackbar(e.message, ERR_SNACKBAR)
        }
        setDeleteLoading(false);
    }


    return (
        <TableRow
            sx={{
                "&:last-child td, &:last-child th": {
                    border: 0,
                },
                backgroundColor: row.isUnresolved ? UNRESOLVED_TABLE_ROW_COLOR : ""
            }}
        >
            <SentenceCell
                isEditing={isEditing}
                onClick={() => setDynamicFieldOpen("arabic", true)}
                style={fontStyle}
            >{row.arabic}</SentenceCell>
            

            <SentenceCell
                onClick={() => setDynamicFieldOpen("english", true)}
                isEditing={isEditing}
            >
                {row.english}
            </SentenceCell>
            
            {
                row.words.sort((a,b) => a.wordType.localeCompare(b.wordType)).map((wordObj, idx) => (
                    <SentenceCell
                        key={idx}
                        style={{ ...fontStyle, ...wordStyle}}
                        onClick={() => setDynamicFieldOpen(wordObj.wordType, true)}
                        isEditing={isEditing}
                    >{wordObj.arabic}</SentenceCell>
                ))
            }
            {
                isEditing && (
                    <>
                        
                        <SentenceCell 
                            onClick={() => null} 
                            isEditing={true} 
                            style={{width: "195px"}}
                        >
                            <Button 
                                size="small"
                                variant="outlined" 
                                color="error"
                                onClick={() => setDeleteDialogOpen(true)}
                                fullWidth
                            >Delete</Button>
                            {
                                row.isUnresolved && (
                                    <ResolveSentenceBtn 
                                        sentence={row}
                                        collection={collectionName}
                                    />
                                )
                            }
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
                            fieldVal={row.arabic}
                            open={editFormOpenState.arabic}
                            handleClose={() => setDynamicFieldOpen("arabic", false)}
                            title="Edit sentence"
                            collectionName={collectionName}
                            key={235}
                        />
                        <EditSentenceFieldForm
                            docId={row.id}
                            field="english"
                            fieldVal={row.english}
                            open={editFormOpenState.english}
                            handleClose={() => setDynamicFieldOpen("english", false)}
                            title="Edit sentence"
                            collectionName={collectionName}
                            key={234}
                        />
                        {
                            row.words.sort((a,b) => a.wordType.localeCompare(b.wordType)).map((word, idx) => (
                                <EditSentenceFieldForm
                                    key={idx*20}
                                    docId={row.id}
                                    field={word.wordType}
                                    fieldVal={word}
                                    open={editFormOpenState[word.wordType as keyof SentenceFormState] === true}
                                    handleClose={() => setDynamicFieldOpen(word.wordType, false)}
                                    collectionName={collectionName}
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