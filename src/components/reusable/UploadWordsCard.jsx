import { Card, CardContent, Dialog, DialogContent, DialogContentText, DialogTitle, IconButton } from '@mui/material';
import React, { useState } from 'react';
import CsvFieldsExample from './CsvFieldsExample';
import { useCSVReader } from 'react-papaparse';
import { useSnackbar } from 'notistack';
import { addAllToCollection, hasExpectedCols } from '../../helpers/utils';
import { ERR_SNACKBAR } from '../../helpers/constants';
import to from 'await-to-js'
import { LoadingButton } from '@mui/lab';
import s from './UploadWordsCard.module.scss';
import FileUploadIcon from '@mui/icons-material/FileUpload';

const UploadWordsCard = ({ expectedCols, wordType}) => {
    const { enqueueSnackbar }   = useSnackbar()
    const { CSVReader }         = useCSVReader();
    const [open, setOpen]       = useState(false);
    const [loading, setLoading] = useState(false);
    const capitalizedType       = wordType[0].toUpperCase() + wordType.substring(1, wordType.length);
    async function handleOnDrop({data}) {
        if (!hasExpectedCols(expectedCols, data[0])) return enqueueSnackbar("incorrect cols", ERR_SNACKBAR)
        const words = [];
        for (let i = 1; i < data.length; i++) {
            words.push({
                english: data[i][0],
                arabic: data[i][1],
                uniqueFemale: data[i][2],
                uniquePlural: data[i][3],
                timesUsed: 0
            });
        }
        // set loading and add to collection
        setLoading(true);
        const [e1, _] = await to(addAllToCollection(wordType.toLowerCase(), words));
        if (e1) throw new Error(e1)
        setLoading(false);
    };
    return (
        <Card className={s.wrap}>
            <h2>{capitalizedType}</h2>
            <Dialog open={open} onClose={() => setOpen(false)}>
                <DialogTitle>{capitalizedType}</DialogTitle>
                <DialogContent>
                    <CsvFieldsExample expectedColumns={expectedCols}/>
                    <CSVReader onUploadAccepted={handleOnDrop}>
                        {({
                            getRootProps,
                            acceptedFile
                        }) => (
                            <div className={s.btnWrap}>
                                <LoadingButton variant="contained" {...getRootProps()} loading={loading}>
                                    Browse file
                                </LoadingButton>
                                <div>{acceptedFile && acceptedFile.name}</div>
                            </div>
                        )}
                    </CSVReader>
                </DialogContent>
            </Dialog>
            <CardContent className={s.content}>
                <IconButton size="large" onClick={() => setOpen(true)}>
                    <FileUploadIcon fontSize="large"/>
                </IconButton>
            </CardContent>
        </Card>
    );
};

export default UploadWordsCard;