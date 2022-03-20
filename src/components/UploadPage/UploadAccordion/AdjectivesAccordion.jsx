import React from 'react';
import { Accordion, AccordionDetails} from '@mui/material'
import { CSVReader } from 'react-papaparse';
import CustomAccordionSummary from '../../reusable/CustomAccordionSummary';
import CsvFieldsExample from '../../reusable/CsvFieldsExample';
import { useSnackbar } from 'notistack'
import { ADJECTIVE_COLS, ERR_SNACKBAR } from '../../../helpers/constants';
import { setAllAdjectives } from '../../../redux/dictionary/adjectives/adjectiveActions';
import { connect } from 'react-redux';
import { hasExpectedCols } from '../../../helpers/utils';
const AdjectivesAccordion = ({ setAllAdjectives }) => {
    const { enqueueSnackbar } = useSnackbar()
    function handleOnDrop(data) {
        if (!hasExpectedCols(ADJECTIVE_COLS, data[0])) return enqueueSnackbar("incorrect cols", ERR_SNACKBAR)


        const adjEntries = [];
        for (let i = 1; i < data.length; i++) {
            const dataArr = data[i].data;
            adjEntries.push({
                english: dataArr[0],
                arabic: dataArr[1],
                uniqueFemale: dataArr[2],
                uniquePlural: dataArr[3]
            });
        }
        setAllAdjectives(adjEntries);
    };

    function handleOnError(err, file, inputElem, reason) {
    };

    function handleOnRemoveFile(data) {
    };
    return (
        <Accordion>
            <CustomAccordionSummary name="Adjectives"/>
            <AccordionDetails>
                <CsvFieldsExample expectedColumns={ADJECTIVE_COLS}/>
                <CSVReader
                    onDrop={handleOnDrop}
                    onError={handleOnError}
                    noDrag
                    addRemoveButton
                    onRemoveFile={handleOnRemoveFile}
                >
                    <span>Upload Adjectives Sheet Here</span>
                </CSVReader>
            </AccordionDetails>
        </Accordion>
    );
};

const mapDispatch = {
    setAllAdjectives: (verbsObj) => setAllAdjectives(verbsObj)
}

export default connect(null, mapDispatch)(AdjectivesAccordion);