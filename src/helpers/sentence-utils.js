import { ERR_SNACKBAR, SUCCESS_SNACKBAR } from "./constants";
import { store } from '../redux/store'
import { addLevelTwoSentence, addLevelOneSentence } from "../redux/create-sentence/createSentenceActions";

const { dispatch } = store;

export function handleAddLevelTwoSentence(state, setState, enqueueSnackbar, INIT_STATE) {
    if (!state.sentence) {
        enqueueSnackbar("Sentence must not be empty", ERR_SNACKBAR);
    } else if (!state.noun || !state.verb) {
        enqueueSnackbar("noun and verb must be filled out", ERR_SNACKBAR);
    } else {
        const noun = state.noun.split(" ")[0];
        const verb = state.verb.split(" ")[0];
        if (state.sentence.includes(noun) && state.sentence.includes(verb)) {
            dispatch(addLevelTwoSentence(state.sentence));
            enqueueSnackbar("Successfully added new sentence.", SUCCESS_SNACKBAR);
            setState(INIT_STATE);
        } else {
            enqueueSnackbar("noun and verb must be in sentence", ERR_SNACKBAR);
        }
    }
}

export function handleAddLevelOneSentence(state, setState, enqueueSnackbar, INIT_STATE) {
    if (!state.sentence) {
        enqueueSnackbar("Sentence must not be empty", ERR_SNACKBAR);
    } else if (!state.noun || !state.verb) {
        enqueueSnackbar("noun and verb must be filled out", ERR_SNACKBAR);
    } else {
        const noun = state.noun.split(" ")[0];
        const verb = state.verb.split(" ")[0];
        if (state.sentence.includes(noun) && state.sentence.includes(verb)) {
            dispatch(addLevelOneSentence(state.sentence));
            enqueueSnackbar("Successfully added new sentence.", SUCCESS_SNACKBAR);
            setState(INIT_STATE);
        } else {
            enqueueSnackbar("noun and verb must be in sentence", ERR_SNACKBAR);
        }
    }
}

