import React from 'react';
import { Accordion, AccordionDetails} from '@mui/material'
import { CSVReader } from 'react-papaparse';
import CustomAccordionSummary from '../../reusable/CustomAccordionSummary';
import CsvFieldsExample from '../../reusable/CsvFieldsExample';

const ConnectorsAccordion = () => {
    function handleOnDrop(data) {
        console.log("---------------------------");
        console.log(data);
        console.log("---------------------------");
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
            <CustomAccordionSummary name="Connectors"/>
            <AccordionDetails>
                <CsvFieldsExample expectedColumns={["english", "arabic", "phonetic"]}/>
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

export default ConnectorsAccordion;