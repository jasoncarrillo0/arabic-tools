import React from 'react';
import { Accordion, AccordionDetails} from '@mui/material'
import { CSVReader } from 'react-papaparse';
import CustomAccordionSummary from '../../reusable/CustomAccordionSummary';
import CsvFieldsExample from '../../reusable/CsvFieldsExample';
import { connect } from 'react-redux';
import { CONNECTORS_COLS, ERR_SNACKBAR } from '../../../helpers/constants';
import { useSnackbar } from 'notistack';
import { setAllConnectors } from '../../../redux/dictionary/connectors/connectorsActions';
import { hasExpectedCols } from '../../../helpers/utils';

const ConnectorsAccordion = ({ setAllConnectors }) => {
    const { enqueueSnackbar } = useSnackbar();

    function handleOnDrop(data) {
        if (!hasExpectedCols(CONNECTORS_COLS, data[0])) return enqueueSnackbar("incorrect cols", ERR_SNACKBAR)

        const entries = [];
        for (let i = 1; i < data.length; i++) {
            const dataArr = data[i].data;
            entries.push({
                english: dataArr[0],
                arabic: dataArr[1],
                phonetic: dataArr[2]
            });
        }
        setAllConnectors(entries);
    };

    function handleOnError(err, file, inputElem, reason) {
    };

    function handleOnRemoveFile(data) {
    };
    return (
        <Accordion>
            <CustomAccordionSummary name="Connectors"/>
            <AccordionDetails>
                <CsvFieldsExample expectedColumns={CONNECTORS_COLS}/>
                <CSVReader
                    onDrop={handleOnDrop}
                    onError={handleOnError}
                    noDrag
                    addRemoveButton
                    onRemoveFile={handleOnRemoveFile}
                >
                    <span>Upload Connectors Sheet Here</span>
                </CSVReader>
            </AccordionDetails>
        </Accordion>
    );
};

const mapDispatch = {
    setAllConnectors: (arr) => setAllConnectors(arr)
}
export default connect(null, mapDispatch)(ConnectorsAccordion);