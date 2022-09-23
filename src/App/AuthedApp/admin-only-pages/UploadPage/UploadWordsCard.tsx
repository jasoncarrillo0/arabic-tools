import { Card, CardContent, Dialog, DialogContent, DialogTitle, IconButton } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useCSVReader } from 'react-papaparse';
import { useSnackbar } from 'notistack';
import to from 'await-to-js'
import { LoadingButton } from '@mui/lab';
import s from './UploadWordsCard.module.scss';
import FileUploadIcon from '@mui/icons-material/FileUpload';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { WordTypes } from 'src/redux/dictionary/interfaces';
import { addSheetDataToCollection, getWord, ProcessedWordInSheet } from 'src/db-ops/initialize-data-tools';
import { hasExpectedCols } from 'src/helpers/utils';
import { ERR_SNACKBAR, SUCCESS_SNACKBAR } from 'src/helpers/constants';
import CsvFieldsExample from 'src/App/reusable/CsvFieldsExample';

type Props = {
    expectedCols: string[] // unique columns for each word type (e.g., adjectives, verbs)
    wordType: WordTypes // nouns, adjectives, etc.
    wordsInState: boolean // already uploaded
}

type SheetData = { data: string[][] };

const UploadWordsCard = ({ expectedCols, wordType, wordsInState }: Props) => {
    const { enqueueSnackbar }   = useSnackbar()
    const { CSVReader }         = useCSVReader();
    const [open, setOpen]       = useState(false);
    const [loading, setLoading] = useState(false);
    const capitalizedType       = wordType[0].toUpperCase() + wordType.substring(1, wordType.length);


    async function handleOnDrop({ data }: SheetData) {
        if (!hasExpectedCols(expectedCols, data[0])) return enqueueSnackbar("incorrect cols", ERR_SNACKBAR)
        const words: ProcessedWordInSheet[] = [];
        for (let i = 1; i < data.length; i++) {
            words.push(getWord(wordType, data[i]));
        }

        // set loading and add to collection
        setLoading(true);
        const [e1] = await to<void, string>(addSheetDataToCollection(wordType, words));
        if (e1) {
            enqueueSnackbar(`There was an error uploading: ${e1}`, ERR_SNACKBAR);
        } else {
            enqueueSnackbar("Successfully uploaded csv!", SUCCESS_SNACKBAR);
            setOpen(false);
        }
        setLoading(false);
    };

    useEffect(() => {
        return () => {
            setLoading(false);
        }
    }, [])

    
    return (
        <Card className={s.wrap}>
            <h2>{capitalizedType}</h2>
            <Dialog open={open} onClose={() => setOpen(false)}>
                <DialogTitle>{capitalizedType}</DialogTitle>
                <DialogContent>
                    <CsvFieldsExample expectedColumns={expectedCols}/>
                    <CSVReader onUploadAccepted={handleOnDrop}>
                        {({ getRootProps }: any) => (
                            <div className={s.btnWrap}>
                                <LoadingButton variant="contained" {...getRootProps()} loading={loading}>
                                    Browse file
                                </LoadingButton>
                            </div>
                        )}
                    </CSVReader>
                </DialogContent>
            </Dialog>
            <CardContent className={s.content}>
                {
                    wordsInState ? (
                        <CheckCircleIcon sx={{fontSize: '40px', color: "#28dd31"}}/>
                    ) : (
                        <IconButton size="large" onClick={() => setOpen(true)}>
                            <FileUploadIcon fontSize="large"/>
                        </IconButton>
                    )
                }
            </CardContent>
        </Card>
    );
};

export default UploadWordsCard;