import { Button, Chip, Modal, Paper } from '@mui/material';
import React, { useState } from 'react';
import WordsDataTable from '../../reusable/WordsDataTable'
const SentenceWordPicker = ({ rows, wordType, initState, setState, state }) => {
    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        bgcolor: '#e2e2e2',
        boxShadow: 24,
        height: '80vh',
        width: '40vw',
        p: 4,
    };
    const [open, setOpen] = useState(false);
    function handleDelete() {
        if (initState[wordType].id === state[wordType].id) return;
        setState(initState);
        setOpen(true);
    }

    
    return (
        <div dir="rtl">
            <Button onClick={() => setOpen(true)}>{`Choose ${wordType}`}</Button>
            {
                state[wordType].word && (
                    <Chip 
                        sx={{fontWeight: 'bold', fontSize: '15px'}} 
                        label={state[wordType].word}
                        onDelete={handleDelete}
                    />
                )
            }
            <Modal open={open} onClose={() => setOpen(false)}>
                <Paper sx={style}>
                    <WordsDataTable 
                        rows={rows} 
                        title={`Select ${wordType}`}
                        wordType={wordType}
                        setState={setState}
                        handleClose={() => setOpen(false)}
                        disabledId={state[wordType].id}
                    />
                </Paper>
            </Modal>
        </div>
    );
};

export default SentenceWordPicker;