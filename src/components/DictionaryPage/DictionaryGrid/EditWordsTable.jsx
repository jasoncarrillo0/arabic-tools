import React from 'react';
import { Paper, Table, TableContainer, TableHead, TableBody, TableRow, TableCell } from "@mui/material";
import { getColsFromRows } from '../../../helpers/utils';
import EditWordsTableRow from './EditWordsTable/EditWordsTableRow'


const EditWordsTable = ({ wordDocs, wordType }) => {
    const cols = getColsFromRows(wordDocs);

    return (
        <TableContainer component={Paper} sx={{marginTop: '2rem'}}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                    <TableRow sx={{background: "#f2f2f2"}}>
                    {
                        cols.map((col, idx) => <TableCell key={idx}>{col.field}</TableCell>)
                    }
                    </TableRow>
                </TableHead>
                <TableBody>
                {
                    wordDocs.length > 0 && (
                        wordDocs.map((row, idx) => (
                            <EditWordsTableRow 
                                key={idx} 
                                row={row}
                                collectionName={wordType}
                            />
                        ))
                    )
                }
                </TableBody>
            </Table>
        </TableContainer>
    );
};

export default EditWordsTable;