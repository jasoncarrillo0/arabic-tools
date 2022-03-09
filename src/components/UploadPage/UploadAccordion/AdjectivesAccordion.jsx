import React from 'react';
import { Accordion, AccordionDetails} from '@mui/material'
import { CSVReader } from 'react-papaparse';
import CustomAccordionSummary from '../../reusable/CustomAccordionSummary';
import CsvFieldsExample from '../../reusable/CsvFieldsExample';

const AdjectivesAccordion = () => {
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
            <CustomAccordionSummary name="Adjectives"/>
            <AccordionDetails>
                <CsvFieldsExample expectedColumns={["English Word", "Arabic Word", "Unique Female", "Unique Plural"]}/>
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

export default AdjectivesAccordion;