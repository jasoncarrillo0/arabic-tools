import React from 'react';
import { Accordion, AccordionDetails} from '@mui/material'
import { CSVReader } from 'react-papaparse';
import CustomAccordionSummary from '../../reusable/CustomAccordionSummary';
import CsvFieldsExample from '../../reusable/CsvFieldsExample';
import { connect } from 'react-redux';
import { ERR_SNACKBAR } from '../../../helpers/constants';
import { useSnackbar } from 'notistack';
import { setAllParticles } from '../../../redux/dictionary/particles/particlesActions';

const ParticlesAccordion = ({ setAllParticles }) => {
    const { enqueueSnackbar } = useSnackbar();
    const EXPECTED_COLS       = ["english", "arabic", "phonetic"];

    function handleOnDrop(data) {
        for (let i = 0; i < data[0].data.length; i++) {
            if (EXPECTED_COLS[i] !== data[0].data[i]) {
                return enqueueSnackbar("incorrect cols", ERR_SNACKBAR)
            }
        }

        const entries = [];
        for (let i = 1; i < data.length; i++) {
            const dataArr = data[i].data;
            entries.push({
                english: dataArr[0],
                arabic: dataArr[1],
                phonetic: dataArr[3]
            });
        }
        setAllParticles(entries);
    };

    function handleOnError(err, file, inputElem, reason) {
    };

    function handleOnRemoveFile(data) {
    };
    return (
        <Accordion>
            <CustomAccordionSummary name="Particles"/>
            <AccordionDetails>
                <CsvFieldsExample expectedColumns={EXPECTED_COLS}/>
                <CSVReader
                    onDrop={handleOnDrop}
                    onError={handleOnError}
                    noDrag
                    addRemoveButton
                    onRemoveFile={handleOnRemoveFile}
                >
                    <span>Upload Particles Sheet Here</span>
                </CSVReader>
            </AccordionDetails>
        </Accordion>
    );
};
const mapDispatch = {
    setAllParticles: (arr) => setAllParticles(arr)
}
export default connect(null, mapDispatch)(ParticlesAccordion);