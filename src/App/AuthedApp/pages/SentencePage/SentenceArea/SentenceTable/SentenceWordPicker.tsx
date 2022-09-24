import { Button, Chip, Modal, Paper } from '@mui/material';
import React, { Dispatch, SetStateAction, useState } from 'react';
import WordsDataTable from 'src/App/AuthedApp/pages/DictionaryPage/DictionaryGrid/WordsDataTable';
import { Word, WordTypes } from 'src/redux/dictionary/interfaces';
import { SentenceWord } from 'src/redux/sentence/interfaces';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    boxShadow: 24,
    height: '80vh',
    width: '40vw',
    p: 4,
};


type Props = {
    rows: Word[]
    wordType: WordTypes
    initState: SentenceWord
    setState: Dispatch<SetStateAction<SentenceWord>>
    state: SentenceWord
}





const SentenceWordPicker = ({ 
    rows, 
    wordType, 
    initState, 
    setState, 
    state 
} : Props) => {
    
    const [open, setOpen] = useState(false);
    function handleDelete() {
        if (initState.wordType === state.wordType) return;
        setState(initState);
        setOpen(true);
    }

    
    return (
        <div dir="rtl">
            <Button onClick={() => setOpen(true)}>{`Choose ${wordType}`}</Button>
            {
                state.arabic && state.english && (
                    <Chip 
                        sx={{fontWeight: 'bold', fontSize: '15px'}} 
                        label={`${state.arabic} (${state.english})`}
                        onDelete={handleDelete}
                    />
                )
            }
            <Modal open={open} onClose={() => setOpen(false)}>
                <Paper sx={style}>
                    <WordsDataTable 
                        rows={rows.sort((a,b) => a.english.localeCompare(b.english))} 
                        title={`Select ${wordType}`}
                        setState={setState}
                        handleClose={() => setOpen(false)}
                        disabledArabic={state.arabic}
                        height="90%"
                    />
                </Paper>
            </Modal>
        </div>
    );
};

export default SentenceWordPicker;