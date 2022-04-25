import { Paper, Table, TableContainer, TableHead, TableBody, TableRow, TableCell } from "@mui/material";
import React from "react";
import { useAuth } from "../../contexts/AuthContext";
import SentenceTableRow from "./SentenceTable/SentenceTableRow";


const SentenceTable = ({ sentences, wordTypes, collectionName }) => {
    const { isAdminUser } = useAuth();
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
                        { isAdminUser && (<TableCell></TableCell>)}
                    </TableRow>
                </TableHead>
                <TableBody>
                {
                    sentences.length > 0 && (
                        sentences.map((row, idx) => (
                            <SentenceTableRow 
                                key={Number((Math.random() * 1000).toFixed(0))} 
                                row={row} 
                                wordTypes={wordTypes} 
                                collectionName={collectionName}
                            />
                        ))
                    )
                }
                </TableBody>
            </Table>
        </TableContainer>
    );
};

export default SentenceTable;
