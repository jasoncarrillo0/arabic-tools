import React from 'react';
import { Accordion, AccordionDetails, Button} from '@mui/material'
import { useCSVReader } from 'react-papaparse';
import CustomAccordionSummary from '../../reusable/CustomAccordionSummary';
import CsvFieldsExample from '../../reusable/CsvFieldsExample';
import { connect } from 'react-redux';
import { useSnackbar } from 'notistack';
import { ERR_SNACKBAR, PREPOSITIONS_COLS } from '../../../helpers/constants';
import { setAllPrepositions } from '../../../redux/dictionary/prepositions/prepositionActions';
import { hasExpectedCols } from '../../../helpers/utils';


const PrepositionsAccordion = ({ setAllPrepositions }) => {
    const { enqueueSnackbar } = useSnackbar();
    const { CSVReader }       = useCSVReader()

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

    return (
        <Accordion>
            <CustomAccordionSummary name="Prepositions"/>
            <AccordionDetails>
                <CsvFieldsExample expectedColumns={PREPOSITIONS_COLS}/>
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
    setAllPrepositions: (verbsObj) => setAllPrepositions(verbsObj)
}
export default connect(null, mapDispatch)(PrepositionsAccordion);