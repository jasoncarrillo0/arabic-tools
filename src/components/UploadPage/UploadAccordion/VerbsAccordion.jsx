import React from 'react';
import { Accordion, AccordionDetails, Button} from '@mui/material'
import { useCSVReader } from 'react-papaparse';
import CustomAccordionSummary from '../../reusable/CustomAccordionSummary';
import CsvFieldsExample from '../../reusable/CsvFieldsExample';
import { connect } from 'react-redux';
import { setAllVerbs } from '../../../redux/dictionary/verbs/verbActions';
import { useSnackbar } from 'notistack';
import { ERR_SNACKBAR, VERBS_COLS } from '../../../helpers/constants';
import { hasExpectedCols } from '../../../helpers/utils';

const VerbsAccordion = ({ setAllVerbs }) => {
    const { enqueueSnackbar } = useSnackbar();
    const { CSVReader }       = useCSVReader()
    function handleOnDrop(data) {
        if (!hasExpectedCols(VERBS_COLS, data[0])) return enqueueSnackbar("incorrect cols", ERR_SNACKBAR)

        const entries = [];
        for (let i = 1; i < data.length; i++) {
            const dataArr = data[i].data;
            entries.push({
                english: dataArr[0],
                arabic: dataArr[1],
                type: dataArr[2],
                phonetic: dataArr[3],
                uniqueIverb: dataArr[4]
            });
        }
        setAllVerbs(entries);
    };
    return (
        <Accordion>
            <CustomAccordionSummary name="Verbs"/>
            <AccordionDetails>
                <CsvFieldsExample expectedColumns={VERBS_COLS}/>
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
    setAllVerbs: (verbsObj) => setAllVerbs(verbsObj)
}

export default connect(null, mapDispatch)(VerbsAccordion);