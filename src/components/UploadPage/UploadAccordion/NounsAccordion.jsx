import React from 'react';
import { Accordion, AccordionDetails} from '@mui/material'
import { CSVReader } from 'react-papaparse';
import CustomAccordionSummary from '../../reusable/CustomAccordionSummary';
import CsvFieldsExample from '../../reusable/CsvFieldsExample';
import { setAllNouns } from '../../../redux/dictionary/nouns/nounActions';
import { connect } from 'react-redux';
import { ERR_SNACKBAR, NOUNS_COLS } from '../../../helpers/constants';
import { useSnackbar } from 'notistack';
import { hasExpectedCols } from '../../../helpers/utils';
const NounsAccordion = ({ setAllNouns }) => {

    const { enqueueSnackbar } = useSnackbar();
    function handleOnDrop(data) {
        if (!hasExpectedCols(NOUNS_COLS, data[0])) return enqueueSnackbar("incorrect cols", ERR_SNACKBAR)

        const entries = [];
        for (let i = 1; i < data.length; i++) {
            const dataArr = data[i].data;
            entries.push({
                english: dataArr[0],
                arabic: dataArr[1],
                phonetic: dataArr[2]
            });
        }
        setAllNouns(entries);
    };

    function handleOnError(err, file, inputElem, reason) {
    };

    function handleOnRemoveFile(data) {
    };
    return (
        <Accordion>
            <CustomAccordionSummary name="Nouns"/>
            <AccordionDetails>
                <CsvFieldsExample expectedColumns={NOUNS_COLS}/>
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
