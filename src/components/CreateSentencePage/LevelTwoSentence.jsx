import { Button, Paper, TextField } from '@mui/material';
import React, { useState } from 'react';
import { connect } from 'react-redux';
import s from './Sentence.module.scss';
import { useSnackbar } from 'notistack'
import { addLevelTwoSentence } from '../../redux/create-sentence/createSentenceActions';
import RtlProvider from '../reusable/RtlProvider';
import WordPicker from '../reusable/WordPicker';

const INIT_STATE = {
    sentence: "",
    verb: "",
    noun: ""
}

const LevelTwoSentence = ({ verbs, nouns }) => {
    const [state, setState] = useState(INIT_STATE);
    const { enqueueSnackbar } = useSnackbar();

    function handleChange({ target }) {
        const { value, name } = target;
        setState(prev => ({...prev, [name]: value}));
    }

    function handleAddSentence() {
        addLevelTwoSentence(state, setState, enqueueSnackbar, INIT_STATE);
    }
    
    return (
        <RtlProvider>
            <Paper className={s.wrap}>
                <div>
                    <span className={s.title}>Verb + Noun <span className={s.example}>(Example: "he eats meat")</span> </span>
                </div>
                <div className={s.dropdownWrap}>
                    <WordPicker 
                        rows={verbs} 
                        wordType="verb" 
                        setState={setState} 
                        state={state}
                    />

                    <WordPicker
                        rows={nouns}
                        wordType="noun"
                        setState={setState}
                        state={state}
                    />
                </div>
                <TextField
                    fullWidth
                    onChange={handleChange}
                    name="sentence"
                    value={state.sentence}
                    label="enter full sentence here"
                    dir="rtl"
                />
                <Button variant="contained" sx={{marginTop: "1rem"}} onClick={handleAddSentence}>Create Sentence</Button>
            </Paper>
        </RtlProvider>
    );
};



const mapStateToProps = (rootState) => {
    const { verbs, nouns } = rootState.dictionary;
    return { verbs, nouns }
}

export default connect(mapStateToProps)(LevelTwoSentence);