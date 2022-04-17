import { TableCell, TableRow } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useSnackbar } from "notistack";
import { LoadingButton } from '@mui/lab';
import { handleDeleteLevelOneSentence } from '../../../helpers/sentence-utils';

const SentenceTableRow = ({ row, collectionName, wordTypes }) => {

    const [deleteLoading, setDeleteLoading] = useState(false);
    const [editLoading, setEditLoading]     = useState(false);
    const { enqueueSnackbar }               = useSnackbar();
    const fontStyle                         = {fontSize: '20px'};

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
                <LoadingButton onClick={deleteSentence} variant="outlined" color="error" loading={deleteLoading}>Delete Sentence</LoadingButton>
            </TableCell>
            <TableCell>
                <LoadingButton variant="outlined" color="warning" loading={editLoading}>Edit Sentence</LoadingButton>
            </TableCell>

        </TableRow>
    );
};

export default SentenceTableRow;