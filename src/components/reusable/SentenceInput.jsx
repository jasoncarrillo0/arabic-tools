import { Button, TextField } from '@mui/material';
import React from 'react';

import s from './SentenceInput.module.scss';
const SentenceInput = ({ handleChange, sentence, handleAddSentence }) => {


    return (
        <div className={s.wrap}>
            <TextField
                fullWidth
                onChange={handleChange}
                name="sentence"
                value={sentence}
                label="enter full sentence here"
                dir="rtl"
            />
            <Button variant="contained" onClick={handleAddSentence}>Add Sentence</Button>
        </div>
    );
};

export default SentenceInput;