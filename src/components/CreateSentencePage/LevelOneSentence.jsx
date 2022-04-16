import { Button, Paper, TextField } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import s from './Sentence.module.scss';
import { useSnackbar } from 'notistack'
import RtlProvider from '../reusable/RtlProvider';
import { handleAddLevelOneSentence } from '../../helpers/sentence-utils';
import WordPicker from '../reusable/WordPicker';
import { LoadingButton } from '@mui/lab';
import { SENTENCE_INIT_STATE } from '../../helpers/constants';

const INIT_STATE = {
    sentence: SENTENCE_INIT_STATE,
    verb: {word: "", id: ""},
    noun: {word: "", id: ""}
}

/*
    {
        sentence: string
        words: [{ word: "eiei", id: "eiweie"}]
    }
*/

const LevelOneSentence = ({ verbs, nouns }) => {
    const [state, setState]             = useState(INIT_STATE);
    const [loading, setLoading]         = useState(false);
    const [readyToPost, setReadyToPost] = useState(false);

    const { enqueueSnackbar } = useSnackbar();
    function handleSentenceChange({ target }) {
        const { value, name } = target;
        setState(prev => ({
            ...prev, 
            sentence: {
                ...prev.sentence,
                [name]: value
            }
        }));
    }

    async function handleAddSentence() {
        setLoading(true)
        await handleAddLevelOneSentence(state, setState, enqueueSnackbar, INIT_STATE);
        setLoading(false);
    }

    // cleanup
    useEffect(() => {
        return () => {
            setLoading(false);
            setReadyToPost(false);
        }
    }, []);


    // make btn disabled
    useEffect(() => {
        const { english, arabic } = state.sentence;
        const { verb, noun } = state;
        if (english && arabic && verb.word && noun.word) {
            setReadyToPost(true);
        } else {
            setReadyToPost(false);
        }

    }, [state])


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
                    onChange={handleSentenceChange}
                    name="arabic"
                    value={state.sentence.arabic}
                    label="enter arabic here"
                    dir="rtl"
                />

                <TextField
                    fullWidth
                    onChange={handleSentenceChange}
                    name="english"
                    value={state.sentence.english}
                    label="enter english translation"
                    dir="rtl"
                    sx={{marginTop: '1rem'}}
                />
                <LoadingButton 
                    loading={loading} 
                    variant="contained" 
                    sx={{marginTop: "1rem"}} 
                    onClick={handleAddSentence}
                    disabled={!readyToPost}
                >
                    Create Sentence
                </LoadingButton>
            </Paper>
        </RtlProvider>
    );
};


const mapStateToProps = (rootState) => {
    const { verbs, nouns } = rootState.dictionary;
    return { verbs, nouns }
}

export default connect(mapStateToProps)(LevelOneSentence);