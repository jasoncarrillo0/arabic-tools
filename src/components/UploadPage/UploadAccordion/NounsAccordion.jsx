import React from 'react';
import { Accordion, AccordionDetails} from '@mui/material'
import { CSVReader } from 'react-papaparse';
import CustomAccordionSummary from '../../reusable/CustomAccordionSummary';
import CsvFieldsExample from '../../reusable/CsvFieldsExample';
const NounsAccordion = () => {
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
            <CustomAccordionSummary name="Nouns"/>
            <AccordionDetails>
                <CsvFieldsExample expectedColumns={["english", "arabic", "phonetic"]}/>
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

export default NounsAccordion;