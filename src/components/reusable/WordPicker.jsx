import { Button, Chip, Modal, Paper } from '@mui/material';
import React, { useState } from 'react';
import WordsDataTable from './WordsDataTable';

const WordPicker = ({ rows, wordType, setState, state }) => {
    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        bgcolor: '#e2e2e2',
        boxShadow: 24,
        height: '80vh',
        p: 4,
    };
    const [open, setOpen] = useState(false);
    return (

        <div dir="rtl">
            <Button onClick={() => setOpen(true)}>{`Choose ${wordType}`}</Button>
            {
                state[wordType].word && (
                    <Chip 
                        sx={{fontWeight: 'bold', fontSize: '15px'}} 
                        label={state[wordType].word}
                        onDelete={() => setState(prev => ({ ...prev, [wordType]: {word: "", id: ""}}))}   
                    />
                )
            }
            <Modal open={open} onClose={() => setOpen(false)}>
                <Paper sx={style}>
                    <WordsDataTable 
                        rows={rows} 
                        title={wordType} 
                        setState={setState}
                        handleClose={() => setOpen(false)}
                    />
                </Paper>
            </Modal>
        </div>
    );
};

export default WordPicker;