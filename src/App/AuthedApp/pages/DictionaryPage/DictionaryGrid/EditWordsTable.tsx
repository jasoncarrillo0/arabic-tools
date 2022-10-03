import React from 'react';
import { Paper, Table, TableContainer, TableHead, TableBody, TableRow, TableCell, TableFooter, Button } from "@mui/material";
import EditWordsTableRow from './EditWordsTable/EditWordsTableRow'
import AddWordButton from './EditWordsTable/AddWordButton';
import { Word, DictionaryState, WordTypes } from 'src/redux/dictionary/interfaces';
import { getEditableColsFromRows } from 'src/helpers/utils';

type Props = {
    wordDocs: Word[]
    wordType: WordTypes
}
const EditWordsTable = ({ wordDocs, wordType }: Props) => {
    const cols = getEditableColsFromRows(wordDocs);
    return (
        <>
            <TableContainer component={Paper} sx={{marginTop: '2rem', overflow: "scroll", maxHeight: 500}}>
                <Table size="small" stickyHeader sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow sx={{background: "#f2f2f2"}}>
                        {
                            cols.sort((a,b) => a.field.localeCompare(b.field)).map((col, idx) => <TableCell key={idx}>{col.field}</TableCell>)
                        }
                        <TableCell></TableCell>
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
            <AddWordButton cols={cols.map(col => col.field)} wordType={wordType}/>
        </>
        
    );
};

export default EditWordsTable;