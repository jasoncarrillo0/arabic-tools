import React, { useState } from 'react';
import { Card, CardContent } from '@mui/material'
import { useCSVReader } from 'react-papaparse';
import CustomAccordionSummary from '../../reusable/CustomAccordionSummary';
import CsvFieldsExample from '../../reusable/CsvFieldsExample';
import { useSnackbar } from 'notistack'
import { ADJECTIVE_COLS, ERR_SNACKBAR } from '../../../helpers/constants';
import { addAllToCollection, hasExpectedCols } from '../../../helpers/utils';
import to from 'await-to-js';
import { LoadingButton } from '@mui/lab';

const AdjectivesAccordion = () => {
    const { enqueueSnackbar }   = useSnackbar()
    const { CSVReader }         = useCSVReader();
    const [loading, setLoading] = useState(false);
    async function handleOnDrop({data, errors, meta }) {
        if (!hasExpectedCols(ADJECTIVE_COLS, data[0])) return enqueueSnackbar("incorrect cols", ERR_SNACKBAR)
        const adjEntries = [];
        for (let i = 1; i < data.length; i++) {
            adjEntries.push({
                english: data[i][0],
                arabic: data[i][1],
                uniqueFemale: data[i][2],
                uniquePlural: data[i][3],
                timesUsed: 0
            });
        }
        setLoading(true);
        const [e1, _] = await to(addAllToCollection("adjectives", adjEntries));
        if (e1) throw new Error(e1)
        setLoading(false);
    };
 
    return (
        <Card>
            <CustomAccordionSummary name="Adjectives"/>
            <CardContent>
                <CsvFieldsExample expectedColumns={ADJECTIVE_COLS}/>
                <CSVReader onUploadAccepted={handleOnDrop}>
                    {({
                        getRootProps,
                        acceptedFile
                    }) => (
                        <div>
                            <LoadingButton {...getRootProps()} loading={loading}>
                                Browse file
                            </LoadingButton>
                            <div>{acceptedFile && acceptedFile.name}</div>
                        </div>
                    )}
                </CSVReader>
            </CardContent>
        </Card>
    );
};

export default AdjectivesAccordion;