import React from "react";
import s from "./CreateSentencePage.module.scss";
import { SENTENCE_LEVELS } from "../helpers/constants";
import CreateSentenceCard from "./reusable/CreateSentenceCard";

const CreateSentencePage = () => {


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


export default CreateSentencePage;
