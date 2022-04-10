import React, { useEffect } from "react";
import s from "./CreateSentencePage.module.scss";
import { initWordChoiceTbls } from '../redux/create-sentence/createSentenceActions'
import { connect } from "react-redux";
import { SENTENCE_LEVELS } from "../helpers/constants";
import CreateSentenceCard from "./reusable/CreateSentenceCard";

const CreateSentencePage = ({ initWordChoiceTbls, dictionary }) => {

    useEffect(() => {
        // create word tables for selection
        initWordChoiceTbls(dictionary)
    }, []);

    return (
        <div className={s.wrap}>
        {
            Object.keys(SENTENCE_LEVELS).map((level, idx) => (
                <CreateSentenceCard key={idx} level={level} elements={SENTENCE_LEVELS[level]}/>
            ))
        }
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
