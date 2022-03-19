import React from 'react';
import { Accordion, AccordionDetails} from '@mui/material'
import { CSVReader } from 'react-papaparse';
import CustomAccordionSummary from '../../reusable/CustomAccordionSummary';
import CsvFieldsExample from '../../reusable/CsvFieldsExample';
import { setAllNouns } from '../../../redux/dictionary/nouns/nounActions';
import { connect } from 'react-redux';
import { ERR_SNACKBAR } from '../../../helpers/constants';
import { useSnackbar } from 'notistack';
const NounsAccordion = ({ setAllNouns }) => {

    const { enqueueSnackbar } = useSnackbar();
    const EXPECTED_COLS       = ["English", "Arabic", "Phonetic"];
    function handleOnDrop(data) {
        // check if first row matches expected cols
        for (let i = 0; i < data[0].data.length; i++) {
            console.log(data[0])
            if (EXPECTED_COLS[i] !== data[0].data[i]) {
                return enqueueSnackbar("incorrect cols", ERR_SNACKBAR)
            }
        }

        const nounEntries = [];
        for (let i = 1; i < data.length; i++) {
            const dataArr = data[i].data;
            nounEntries.push({
                english: dataArr[0],
                arabic: dataArr[1],
                phonetic: dataArr[3]
            });
        }
        setAllNouns(nounEntries);
    };

    function handleOnError(err, file, inputElem, reason) {
    };

    function handleOnRemoveFile(data) {
    };
    return (
        <Accordion>
            <CustomAccordionSummary name="Nouns"/>
            <AccordionDetails>
                <CsvFieldsExample expectedColumns={EXPECTED_COLS}/>
                <CSVReader
                    onDrop={handleOnDrop}
                    onError={handleOnError}
                    noDrag
                    addRemoveButton
                    onRemoveFile={handleOnRemoveFile}
                >
                    <span>Upload Nouns Sheet Here</span>
                </CSVReader>
            </AccordionDetails>
        </Accordion>
    );
};

const mapDispatch = {
    setAllNouns: (arr) => setAllNouns(arr)
}
export default connect(null, mapDispatch)(NounsAccordion);
