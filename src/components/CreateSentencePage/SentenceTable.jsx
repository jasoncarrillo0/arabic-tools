import { Paper, Table, TableContainer, TableHead, TableBody, TableRow, TableCell } from "@mui/material";
import React from "react";
import SentenceTableRow from "./SentenceTable/SentenceTableRow";


// const sentenceObj = {
//     sentence: state.sentence,
//     words: {
//        noun: state.noun,
//        verb: state.verb
//    }
// }

const SentenceTable = ({ sentences, wordTypes }) => {
    return (
        <TableContainer component={Paper} sx={{marginTop: '2rem'}}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                    <TableRow sx={{background: "#f2f2f2"}}>
                        <TableCell>Sentence</TableCell>
                        <TableCell>Translation</TableCell>
                        {
                            wordTypes.map((type, idx) => <TableCell key={idx}>{type}</TableCell>)
                        }
                        <TableCell></TableCell>
                        <TableCell></TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                {
                    sentences.length > 0 && (
                        sentences.map((row, idx) => <SentenceTableRow key={idx} row={row} wordTypes={wordTypes}/>)
                    )
                }
                </TableBody>
            </Table>
        </TableContainer>
    );
};

export default SentenceTable;
