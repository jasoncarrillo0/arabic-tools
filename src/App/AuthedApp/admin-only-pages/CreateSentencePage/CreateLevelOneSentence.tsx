import { Paper, TextField } from '@mui/material';
import React, { ChangeEvent, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import s from './CreateSentence.module.scss';
import { useSnackbar } from 'notistack'
import { LoadingButton } from '@mui/lab';
import SentenceTable from '../../pages/SentencePage/SentenceArea/SentenceTable';
import { RootState } from 'src/redux/rootReducer';
import { handleAddLevelOneSentence } from 'src/db-ops/sentences/level-one';
import RtlProvider from 'src/App/reusable/RtlProvider';
import { ERR_SNACKBAR, SENTENCE_COLLECTION_INFO, WARN_SNACKBAR } from 'src/helpers/constants';
import { LevelOneSentence, SentenceWord } from 'src/redux/sentence/interfaces';
import SentenceWordPicker from '../../pages/SentencePage/SentenceArea/SentenceTable/SentenceWordPicker';







export interface InitialSentenceOne extends Omit<LevelOneSentence, "id">{}


const INITIAL_VERB: SentenceWord = {
    arabic: "",
    english: "",
    wordType: "verbs",
    id: ""
}
const INITIAL_NOUN: SentenceWord = {
    arabic: "",
    english: "",
    wordType: "nouns",
    id:""
}
const SENTENCE_INIT_STATE: InitialSentenceOne = {
    arabic: "",
    english: "",
    nounsLimit: 1,
    verbsLimit: 1,
    words: [INITIAL_VERB, INITIAL_NOUN]
}

const selectLevelOneSentenceState = (rootState: RootState) => {
    const { verbs, nouns } = rootState.dictionary;
    const { levelOneSentences } = rootState.sentences;
    return { verbs, nouns, levelOneSentences }
}


const CreateLevelOneSentence = () => {
    const { verbs, nouns, levelOneSentences } = useSelector(selectLevelOneSentenceState)
    const [sentence, setSentences]            = useState(SENTENCE_INIT_STATE);
    const [verbObj, setVerbObj]               = useState(INITIAL_VERB);
    const [nounObj, setNounObj]               = useState(INITIAL_NOUN);
    const [loading, setLoading]               = useState(false);
    const [readyToPost, setReadyToPost]       = useState(false);
    const { enqueueSnackbar }                 = useSnackbar();



    


    function handleSentenceChange({ target }: ChangeEvent<HTMLInputElement>) {
        const { value, name } = target;
        setSentences(prev => ({
            ...prev,
            [name]: value
        }));
    }

    function resetState() {
        setVerbObj(INITIAL_VERB);
        setNounObj(INITIAL_NOUN);
        setSentences(SENTENCE_INIT_STATE);
    }



    async function handleAddSentence() {
        setLoading(true)
        try {
            await handleAddLevelOneSentence(sentence);

        } catch (e: any) {
            enqueueSnackbar(e.message, ERR_SNACKBAR)
        }
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

    function wordReady(obj: SentenceWord) {
        if (obj.arabic && obj.english && obj.wordType && obj.id) return true;
        return false;
    }

    
    // make btn disabled
    useEffect(() => {
        const { english, arabic } = sentence;
        if (english && arabic && wordReady(verbObj) && wordReady(nounObj)) {
            setReadyToPost(true);
        } else {
            setReadyToPost(false);
        }

    }, [nounObj, verbObj, sentence])


    // update sentence "words" field
    useEffect(() => {
        setSentences(prev => ({
            ...prev,
            words: [nounObj, verbObj]
        }))
    }, [nounObj, verbObj])


    return (
        <RtlProvider>
            <Paper className={s.wrap}>
                <div>
                    <span className={s.title}>Verb + Noun <span className={s.example}>(Example: "he eats meat")</span> </span>
                </div>
                <div className={s.dropdownWrap}>
                    <SentenceWordPicker 
                        rows={verbs} 
                        wordType="verbs" 
                        initState={INITIAL_VERB}
                        setState={setVerbObj} 
                        state={verbObj}
                    />

                    <SentenceWordPicker
                        rows={nouns}
                        wordType="nouns"
                        initState={INITIAL_NOUN}
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
                level={SENTENCE_COLLECTION_INFO.levelOneSentences} 
                collectionName={"levelOneSentences"} 
                sentences={levelOneSentences}
            />
        </RtlProvider>
    );
};




export default CreateLevelOneSentence;