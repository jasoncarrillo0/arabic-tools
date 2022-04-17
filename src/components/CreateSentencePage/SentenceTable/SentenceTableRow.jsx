import { TableCell, TableRow, Button } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useSnackbar } from "notistack";
import { handleDeleteLevelOneSentence } from '../../../helpers/sentence-utils';
import BasicAlertConfirm from '../../reusable/BasicAlertConfirm';
const SentenceTableRow = ({ row, collectionName, wordTypes }) => {

    const [deleteLoading, setDeleteLoading] = useState(false);
    const [editLoading, setEditLoading]     = useState(false);
    const { enqueueSnackbar }               = useSnackbar();
    const fontStyle                         = {fontSize: '20px'};
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);

    // clean up
    useEffect(() => {
        return () => {
            setDeleteLoading(false);
            setEditLoading(false);
        }
    },[])



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
                },
            }}
        >
            <TableCell sx={fontStyle} component="th" scope="row">
                {row.sentence.arabic}
            </TableCell>
            <TableCell>{row.sentence.english}</TableCell>
            {
                wordTypes.map((type, idx) => <TableCell sx={fontStyle} key={idx}>{row.words[type].word}</TableCell>)
            }
            <TableCell>
                <Button 
                    onClick={() => setDeleteDialogOpen(true)} 
                    variant="outlined" 
                    color="error" 
                >Delete Sentence</Button>
            </TableCell>
            <TableCell>
                <Button variant="outlined" color="warning">Edit Sentence</Button>
            </TableCell>
            <BasicAlertConfirm
                open={deleteDialogOpen}
                title="Are you sure you want to delete this sentence?"
                content="This action is permanent and cannot be undone."
                handleClose={() => setDeleteDialogOpen(false)}
                handleConfirm={deleteSentence}
                loading={deleteLoading}
            />
        </TableRow>
    );
};

export default SentenceTableRow;