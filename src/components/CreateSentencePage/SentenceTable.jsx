import { Paper, Table, TableContainer, TableHead, TableBody, TableRow, TableCell } from "@mui/material";
import React from "react";


// const sentenceObj = {
//     sentence: state.sentence,
//     words: [{noun: state.noun}, {verb: state.verb}],
// }

const SentenceTable = ({ sentences, wordTypes }) => {

    console.log(sentences)

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
                    </TableRow>
                </TableHead>
                <TableBody>
                {
                    sentences.length > 0 && (
                        sentences.map((row, idx) => (
                            <TableRow
                                key={idx}
                                sx={{
                                    "&:last-child td, &:last-child th": {
                                        border: 0,
                                    },
                                }}
                            >
                                <TableCell component="th" scope="row">
                                    {row.sentence.arabic}
                                </TableCell>
                                <TableCell >{row.sentence.english}</TableCell>
                                 {
                                    wordTypes.map((type, idx) => <TableCell key={idx}>{row.words[type].word}</TableCell>)
                                 }
                            </TableRow>
                        ))
                    )
                }
                </TableBody>
            </Table>
        </TableContainer>
    );
};

export default SentenceTable;
