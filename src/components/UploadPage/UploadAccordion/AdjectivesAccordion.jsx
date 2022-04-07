import React from 'react';
import { Accordion, AccordionDetails, Button} from '@mui/material'
import { useCSVReader } from 'react-papaparse';
import CustomAccordionSummary from '../../reusable/CustomAccordionSummary';
import CsvFieldsExample from '../../reusable/CsvFieldsExample';
import { useSnackbar } from 'notistack'
import { ADJECTIVE_COLS, ERR_SNACKBAR } from '../../../helpers/constants';
import { setAllAdjectives } from '../../../redux/dictionary/adjectives/adjectiveActions';
import { connect } from 'react-redux';
import { getDocsFromCollection, hasExpectedCols, getDictionaryId } from '../../../helpers/utils';
import to from 'await-to-js';

const AdjectivesAccordion = ({ setAllAdjectives }) => {
    const { enqueueSnackbar } = useSnackbar()
    const { CSVReader }       = useCSVReader();
    async function handleOnDrop({data, errors, meta }) {
        if (!hasExpectedCols(ADJECTIVE_COLS, data[0])) return enqueueSnackbar("incorrect cols", ERR_SNACKBAR)


        const adjEntries = [];
        for (let i = 1; i < data.length; i++) {
            adjEntries.push({
                english: data[i][0],
                arabic: data[i][1],
                uniqueFemale: data[i][2],
                uniquePlural: data[i][3]
            });
        }
        try {
            for (let i = 0; i < 1; i++) {
                console.log(adjEntries[i])
                const [e1, dictionaryId] = await to(getDictionaryId());
                if (e1) throw new Error(e1);

                const [e2, adjectives] = await to(getDocsFromCollection(dictionaryId, 'adjectives'))
                if (e2) throw new Error(e2);
                console.log(adjectives);
            }
        } catch (error) {
            console.log(error);
        }
        //setAllAdjectives(adjEntries);
    };

    return (
        <Accordion>
            <CustomAccordionSummary name="Adjectives"/>
            <AccordionDetails>
                <CsvFieldsExample expectedColumns={ADJECTIVE_COLS}/>
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
    setAllAdjectives: (verbsObj) => setAllAdjectives(verbsObj)
}

export default connect(null, mapDispatch)(AdjectivesAccordion);