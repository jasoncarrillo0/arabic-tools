import React from 'react';
import { Accordion, AccordionDetails} from '@mui/material'
import { CSVReader } from 'react-papaparse';
import CustomAccordionSummary from '../../reusable/CustomAccordionSummary';
import CsvFieldsExample from '../../reusable/CsvFieldsExample';
import { connect } from 'react-redux';
import { useSnackbar } from 'notistack';
import { ERR_SNACKBAR, PREPOSITIONS_COLS } from '../../../helpers/constants';
import { setAllPrepositions } from '../../../redux/dictionary/prepositions/prepositionActions';
import { hasExpectedCols } from '../../../helpers/utils';


const PrepositionsAccordion = ({ setAllPrepositions }) => {
    const { enqueueSnackbar } = useSnackbar();

    function handleOnDrop(data) {
        if (!hasExpectedCols(PREPOSITIONS_COLS, data[0])) return enqueueSnackbar("incorrect cols", ERR_SNACKBAR)

        const entries = [];
        for (let i = 1; i < data.length; i++) {
            const dataArr = data[i].data;
            entries.push({
                english: dataArr[0],
                arabic: dataArr[1],
                phonetic: dataArr[2]
            });
        }
        setAllPrepositions(entries);
    };
    function handleOnError(err, file, inputElem, reason) {
    };

    function handleOnRemoveFile(data) {
    };
    return (
        <Accordion>
            <CustomAccordionSummary name="Prepositions"/>
            <AccordionDetails>
                <CsvFieldsExample expectedColumns={PREPOSITIONS_COLS}/>
                <CSVReader
                    onDrop={handleOnDrop}
                    onError={handleOnError}
                    noDrag
                    addRemoveButton
                    onRemoveFile={handleOnRemoveFile}
                >
                    <span>Upload prepositions Sheet Here</span>
                </CSVReader>
            </AccordionDetails>
        </Accordion>
    );
};

const mapDispatch = {
    setAllPrepositions: (verbsObj) => setAllPrepositions(verbsObj)
}
export default connect(null, mapDispatch)(PrepositionsAccordion);