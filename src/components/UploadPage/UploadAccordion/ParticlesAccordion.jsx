import React from 'react';
import { Accordion, AccordionDetails, Button} from '@mui/material'
import { useCSVReader } from 'react-papaparse';
import CustomAccordionSummary from '../../reusable/CustomAccordionSummary';
import CsvFieldsExample from '../../reusable/CsvFieldsExample';
import { connect } from 'react-redux';
import { ERR_SNACKBAR, PARTICLES_COLS } from '../../../helpers/constants';
import { useSnackbar } from 'notistack';
import { setAllParticles } from '../../../redux/dictionary/particles/particlesActions';

const ParticlesAccordion = ({ setAllParticles }) => {
    const { enqueueSnackbar } = useSnackbar();
    const { CSVReader }       = useCSVReader()

    function handleOnDrop(data) {
        for (let i = 0; i < data[0].data.length; i++) {
            if (PARTICLES_COLS[i] !== data[0].data[i]) {
                return enqueueSnackbar("incorrect cols", ERR_SNACKBAR)
            }
        }

        const entries = [];
        for (let i = 1; i < data.length; i++) {
            const dataArr = data[i].data;
            entries.push({
                english: dataArr[0],
                arabic: dataArr[1],
                phonetic: dataArr[2]
            });
        }
        setAllParticles(entries);
    };

    return (
        <Accordion>
            <CustomAccordionSummary name="Particles"/>
            <AccordionDetails>
                <CsvFieldsExample expectedColumns={PARTICLES_COLS}/>
                <CSVReader onUploadAccepted={handleOnDrop}>
                    {({
                        getRootProps,
                        acceptedFile
                    }) => (
                        <div>
                            <Button {...getRootProps()}>
                                Browse file
                            </Button>
                            <div>{acceptedFile && acceptedFile.name}</div>
                        </div>
                    )}
                </CSVReader>
            </AccordionDetails>
        </Accordion>
    );
};
const mapDispatch = {
    setAllParticles: (arr) => setAllParticles(arr)
}
export default connect(null, mapDispatch)(ParticlesAccordion);