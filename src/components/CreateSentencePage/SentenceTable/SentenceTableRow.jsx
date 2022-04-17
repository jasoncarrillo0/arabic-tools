import { TableCell, TableRow } from '@mui/material';
import React, { useState } from 'react';
import { useSnackbar } from "notistack";
import { ERR_SNACKBAR } from '../../../helpers/constants';
import { LoadingButton } from '@mui/lab';

const SentenceTableRow = ({ row, wordTypes }) => {

    const [deleteLoading, setDeleteLoading] = useState(false);
    const [editLoading, setEditLoading]     = useState(false);
    const { enqueueSnackbar }               = useSnackbar();
    const fontStyle = {fontSize: '20px'};

    async function deleteSentence() {
        setDeleteLoading(true);
        try {
            
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
                <LoadingButton variant="outlined" color="error" loading={deleteLoading}>Delete Sentence</LoadingButton>
            </TableCell>
            <TableCell>
                <LoadingButton variant="outlined" color="warning" loading={editLoading}>Edit Sentence</LoadingButton>
            </TableCell>

        </TableRow>
    );
};

export default SentenceTableRow;