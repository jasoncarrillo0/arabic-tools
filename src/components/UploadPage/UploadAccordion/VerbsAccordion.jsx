import React from 'react';
import { Accordion, AccordionDetails} from '@mui/material'
import { CSVReader } from 'react-papaparse';
import CustomAccordionSummary from '../../reusable/CustomAccordionSummary';
import CsvFieldsExample from '../../reusable/CsvFieldsExample';
import { connect } from 'react-redux';
import { setAllVerbs } from '../../../redux/dictionary/verbs/verbActions';
import { useSnackbar } from 'notistack';
import { ERR_SNACKBAR } from '../../../helpers/constants';

const VerbsAccordion = ({ setAllVerbs }) => {
    const EXPECTED_COLS = ["english", "arabic", "type", "phonetic", "unique I Verb"];
    const { enqueueSnackbar, closeSnackbar } = useSnackbar();

    function handleOnDrop(data) {
        // check if first row matches expected cols
        for (let i = 0; i < data[0].data.length; i++) {
            if (EXPECTED_COLS[i] !== data[0].data[i]) {
                return enqueueSnackbar("incorrect cols", ERR_SNACKBAR)
            }
        }

        const verbEntries = [];
        for (let i = 1; i < data.length; i++) {
            const dataArr = data[i].data;
            verbEntries.push({
                english: dataArr[0],
                arabic: dataArr[1],
                phonetic: dataArr[3],
                type: dataArr[2].split(" ")[0],
                uniqueIverb: dataArr[4] ? dataArr[4] : ""
            });
        }
        setAllVerbs(verbEntries);
    };

    function handleOnError(err, file, inputElem, reason) {
        console.log(err);
    };

    function handleOnRemoveFile(data) {
        console.log("---------------------------");
        console.log(data);
        console.log("---------------------------");
    };
    return (
        <Accordion>
            <CustomAccordionSummary name="Verbs"/>
            <AccordionDetails>
                <CsvFieldsExample expectedColumns={EXPECTED_COLS}/>
                <CSVReader
                    onDrop={handleOnDrop}
                    onError={handleOnError}
                    noDrag
                    addRemoveButton
                    onRemoveFile={handleOnRemoveFile}
                >
                    <span>Upload Verbs Sheet Here</span>
                </CSVReader>
            </AccordionDetails>
        </Accordion>
    );
};

const mapDispatch = {
    setAllVerbs: (verbsObj) => setAllVerbs(verbsObj)
}

export default connect(null, mapDispatch)(VerbsAccordion);