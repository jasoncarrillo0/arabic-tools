import { TableCell, TableRow } from '@mui/material';
import React, { useState } from 'react';
import EditWordForm from './EditWordsTableRow/EditWordForm';

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
    const allKeys = Object.keys(row).filter(key => key !== "id").sort((a, b) => a.localeCompare(b));
    const INIT_EDIT_FORM_OPEN_STATE = Object.assign(
        {}, 
        ...allKeys.map(column => ({[column]: false}))
    );
    const [editFormsState, setEditFormsState] = useState(INIT_EDIT_FORM_OPEN_STATE);

    function setEditFormOpen(column, boolean) {
        setEditFormsState(prev => ({
            ...prev,
            [column]: boolean
        }))
    }
    const fontStyle= {fontSize: "20px", fontWeight: 'bold'}
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