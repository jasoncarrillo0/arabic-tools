import { Paper, Table, TableContainer, TableHead, TableBody, TableRow, TableCell } from "@mui/material";
import { useAuth } from "src/contexts/AuthContext";
import { WordTypes } from "src/redux/dictionary/interfaces";
import { Sentence, SentenceCollectionNames, SentenceLevel } from "src/redux/sentence/interfaces";
import SentenceTableLegend from "./SentenceTable/SentenceTableLegend";
import SentenceTableRow from "./SentenceTable/SentenceTableRow";


export type SentenceFormState = {arabic: boolean
    english: boolean} & {
    [key in WordTypes]?: boolean
}


type Props = {
    sentences: Sentence[]
    level: SentenceLevel
    collectionName: SentenceCollectionNames
}


const SentencesArea = ({ sentences, level, collectionName }: Props) => {
    const { isAdminUser } = useAuth();
    const containsUnresolved = sentences.some(sentence => sentence.isUnresolved === true);

    return (
        <TableContainer component={Paper}>
            <SentenceTableLegend/>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                    <TableRow sx={{background: "#f2f2f2"}}>
                        <TableCell width={"400px"}>Sentence</TableCell>
                        <TableCell width={"400px"}>Translation</TableCell>
                        {
                            level.wordTypesUsed.sort((a,b) => a.localeCompare(b)).map((type, idx) => <TableCell key={idx}>{type}</TableCell>)
                        }
                        { isAdminUser && (<TableCell></TableCell>)}
                        { containsUnresolved && (<TableCell size="small"></TableCell>)}
                    </TableRow>
                </TableHead>
                <TableBody>
                {
                    sentences.length > 0 && (
                        sentences.map((row, idx) => (
                            <SentenceTableRow
                                
                                key={idx} 
                                row={row} 
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

export default SentencesArea;
