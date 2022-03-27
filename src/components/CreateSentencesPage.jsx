import React, { useEffect } from "react";
import s from "./CreateSentencePage.module.scss";
import LevelOneSentence from "./CreateSentencePage/LevelOneSentence";
import { initWordChoiceTbls } from '../redux/create-sentence/createSentenceActions'
import { connect } from "react-redux";
const CreateSentencePage = ({ initWordChoiceTbls, dictionary }) => {

    useEffect(() => {
        // create word tables for selection
        initWordChoiceTbls(dictionary)
    }, []);

    return (
        <div className={s.wrap} dir="rtl">
            <LevelOneSentence/>
        </div>
    )

};

const mapDispatch = {
    initWordChoiceTbls: (dictionary) => initWordChoiceTbls(dictionary)
}

const mapStateToProps = (rootState) => {
    return {dictionary: rootState.dictionary }
}
export default connect(mapStateToProps, mapDispatch)(CreateSentencePage);
