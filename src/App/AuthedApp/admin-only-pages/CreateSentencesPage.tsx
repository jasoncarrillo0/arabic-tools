import React from "react";
import s from "./CreateSentencePage.module.scss";
import { SENTENCE_COLLECTION_INFO } from "src/helpers/constants";
import { SentenceCollectionNames } from "src/redux/sentence/interfaces";
import CreateSentenceCard from "./CreateSentencePage/CreateSentenceCard";

const CreateSentencePage = () => {


    return (
        <div className={s.wrap}>
        {
            Object.keys(SENTENCE_COLLECTION_INFO).map((level, idx) => (
                <CreateSentenceCard 
                    key={idx} 
                    title={SENTENCE_COLLECTION_INFO[level as SentenceCollectionNames].formattedTitle} 
                    elements={SENTENCE_COLLECTION_INFO[level as SentenceCollectionNames].elements}
                />
            ))
        }
        </div>
    )

};


export default CreateSentencePage;
