import { Paper, TextField } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import s from './Sentence.module.scss';
import { useSnackbar } from 'notistack'
import RtlProvider from '../reusable/RtlProvider';
import { handleAddLevelOneSentence } from '../../helpers/sentence-utils';
import WordPicker from '../reusable/WordPicker';
import { LoadingButton } from '@mui/lab';
import { SENTENCE_COLLECTION_NAMES } from '../../helpers/constants';
import SentenceTable from './SentenceTable';

const SENTENCE_INIT_STATE = {
    arabic: "",
    english: ""
}
const VERB_INIT_STATE = {
    verb: {word: "", id: ""}
}
const NOUN_INIT_STATE = {
    noun: {word: "", id: ""}
}


const LevelOneSentence = ({ verbs, nouns, levelOneSentences }) => {
    const [sentence, setSentences]       = useState(SENTENCE_INIT_STATE);
    const [verbObj, setVerbObj]               = useState(VERB_INIT_STATE);
    const [nounObj, setNounObj]               = useState(NOUN_INIT_STATE);
    const [loading, setLoading]         = useState(false);
    const [readyToPost, setReadyToPost] = useState(false);
    const { enqueueSnackbar }           = useSnackbar();


    function handleSentenceChange({ target }) {
        const { value, name } = target;
        setSentences(prev => ({
            ...prev,
            [name]: value
        }));
    }

    function resetState() {
        setVerbObj(VERB_INIT_STATE);
        setNounObj(NOUN_INIT_STATE);
        setSentences(SENTENCE_INIT_STATE);
    }



    async function handleAddSentence() {
        setLoading(true)
        const finalState = {
            sentence,
            ...verbObj,
            ...nounObj
        }
        await handleAddLevelOneSentence(finalState, enqueueSnackbar);
        resetState();
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
        const { english, arabic } = sentence;
        const { verb } = verbObj;
        const { noun } = nounObj;
        if (english && arabic && verb.word && noun.word) {
            setReadyToPost(true);
        } else {
            setReadyToPost(false);
        }

    }, [nounObj, verbObj, sentence])



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
                        initState={VERB_INIT_STATE}
                        setState={setVerbObj} 
                        state={verbObj}
                    />

                    <WordPicker
                        rows={nouns}
                        wordType="noun"
                        initState={NOUN_INIT_STATE}
                        setState={setNounObj}
                        state={nounObj}
                    />
                </div>
                <TextField
                    fullWidth
                    onChange={handleSentenceChange}
                    name="arabic"
                    value={sentence.arabic}
                    label="enter arabic here"
                    dir="rtl"
                />

                <TextField
                    fullWidth
                    onChange={handleSentenceChange}
                    name="english"
                    value={sentence.english}
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

            <SentenceTable 
                wordTypes={["noun", "verb"]} 
                collectionName={SENTENCE_COLLECTION_NAMES.LEVEL_ONE} 
                sentences={levelOneSentences}
            />
        </RtlProvider>
    );
};


const mapStateToProps = (rootState) => {
    const { verbs, nouns } = rootState.dictionary;
    const { levelOneSentences } = rootState.sentence;
    return { verbs, nouns, levelOneSentences }
}

export default connect(mapStateToProps)(LevelOneSentence);