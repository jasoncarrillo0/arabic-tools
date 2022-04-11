import { Autocomplete, TextField } from '@mui/material';
import React, { useState } from 'react';
import { connect } from 'react-redux';
import SentenceInput from '../reusable/SentenceInput';
import s from './Sentence.module.scss';
import { useSnackbar } from 'notistack'
import { SUCCESS_SNACKBAR, ERR_SNACKBAR } from '../../helpers/constants'
import { addLevelOneSentence } from '../../redux/create-sentence/createSentenceActions';
import { getOptionsFrom } from '../../helpers/utils';
import RtlProvider from '../reusable/RtlProvider';
const INIT_STATE = {
    sentence: "",
    verb: "",
    noun: ""
}
export const LEVEL_ONE_INIT_STATE = {
    sentence: "",
    verb: "",
    noun: ""
}

const LevelOneSentence = ({ verbChoices, nounChoices, addLevelOneSentence }) => {
    const [state, setState]   = useState(INIT_STATE);
    const { enqueueSnackbar } = useSnackbar();

    function handleChange({ target }) {
        const { value, name } = target;
        setState(prev => ({...prev, [name]: value}));
    }

    function handleAddSentence() {
        if (!state.sentence) {
            enqueueSnackbar("Sentence must not be empty", ERR_SNACKBAR);
        } else if (!state.noun || !state.verb) {
            enqueueSnackbar("noun and verb must be filled out", ERR_SNACKBAR);
        } else {
            const noun = state.noun.split(" ")[0];
            const verb = state.verb.split(" ")[0];
            if (state.sentence.includes(noun) && state.sentence.includes(verb)) {
                addLevelOneSentence(state.sentence);
                enqueueSnackbar("Successfully added new sentence.", SUCCESS_SNACKBAR);
                setState(INIT_STATE);
            } else {
                enqueueSnackbar("noun and verb must be in sentence", ERR_SNACKBAR);
            }
        }
    }
    return (
        <RtlProvider>
            <div className={s.wrap} dir="rtl">
                <h3>Verb + Noun</h3>
                <hr/>
                <SentenceInput
                    handleChange={handleChange}
                    handleAddSentence={handleAddSentence}
                    sentence={state.sentence}
                />
                <div className={s.dropdownWrap}>
                    <Autocomplete
                        options={getOptionsFrom(verbChoices)}
                        renderInput={(params => (
                            <TextField
                                {...params}
                                label="verb"
                                value={state.verb}
                                name="verb"
                                required
                            />
                        ))}
                        onChange={(e, val) => setState(prev => ({...prev, verb: val ? val.split(' ')[0] : ""}))}
                        sx={{width: '140px'}}
                    />
                    <Autocomplete
                        options={getOptionsFrom(nounChoices)}
                        renderInput={(params => (
                            <TextField
                                {...params}
                                label="noun"
                                value={state.noun}
                                name="noun"
                                required
                            />
                        ))}
                        sx={{width: '170px'}}
                        onChange={(e, val) => setState(prev => ({...prev, noun: val ? val.split(' ')[0] : ""}))}

                    />
                </div>
            </div>
        </RtlProvider>
        
    );
};


const mapDispatch = {
    addLevelOneSentence: (sentence) => addLevelOneSentence(sentence)
}
const mapStateToProps = (rootState) => {
    const { verbChoices, nounChoices } = rootState.createSentence;
    return { verbChoices, nounChoices }
}

export default connect(mapStateToProps, mapDispatch)(LevelOneSentence);