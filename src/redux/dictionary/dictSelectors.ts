import { RootState } from "../rootReducer";

export const selectDictionary = (rootState: RootState) => {
    const { dictionary } = rootState;
    return { dictionary }
}