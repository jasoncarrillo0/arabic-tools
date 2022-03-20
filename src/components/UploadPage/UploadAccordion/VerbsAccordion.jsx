import React from 'react';
import { Accordion, AccordionDetails} from '@mui/material'
import { CSVReader } from 'react-papaparse';
import CustomAccordionSummary from '../../reusable/CustomAccordionSummary';
import CsvFieldsExample from '../../reusable/CsvFieldsExample';
import { connect } from 'react-redux';
import { setAllVerbs } from '../../../redux/dictionary/verbs/verbActions';
import { useSnackbar } from 'notistack';
import { ERR_SNACKBAR, VERBS_COLS } from '../../../helpers/constants';
import { hasExpectedCols } from '../../../helpers/utils';

const VerbsAccordion = ({ setAllVerbs }) => {
    const { enqueueSnackbar } = useSnackbar();

    function handleOnDrop(data) {
        if (!hasExpectedCols(VERBS_COLS, data[0])) return enqueueSnackbar("incorrect cols", ERR_SNACKBAR)

        const entries = [];
        for (let i = 1; i < data.length; i++) {
            const dataArr = data[i].data;
            entries.push({
                english: dataArr[0],
                arabic: dataArr[1],
                type: dataArr[2],
                phonetic: dataArr[3],
                uniqueIverb: dataArr[4]
            });
        }
        setAllVerbs(entries);
    };

    function handleOnError(err, file, inputElem, reason) {
    };

    function handleOnRemoveFile(data) {
    };
    return (
        <Accordion>
            <CustomAccordionSummary name="Verbs"/>
            <AccordionDetails>
                <CsvFieldsExample expectedColumns={VERBS_COLS}/>
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