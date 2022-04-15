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
        dispatch(addLevelTwoSentence(state.sentence));
        enqueueSnackbar("Successfully added new sentence.", SUCCESS_SNACKBAR);
        setState(INIT_STATE);
    }
}

export function handleAddLevelOneSentence(state, setState, enqueueSnackbar, INIT_STATE) {
    if (!state.sentence) {
        enqueueSnackbar("Sentence must not be empty", ERR_SNACKBAR);
    } else if (!state.noun || !state.verb) {
        enqueueSnackbar("noun and verb must be filled out", ERR_SNACKBAR);
    } else {
        dispatch(addLevelOneSentence(state.sentence, state.verb.id, state.noun.id));
        enqueueSnackbar("Successfully added new sentence.", SUCCESS_SNACKBAR);
        setState(INIT_STATE);
    }
}

