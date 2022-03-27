import React from "react";
import s from "./UploadPage.module.scss";
import UploadAccordion from "./UploadPage/UploadAccordion";

const SentenceMaker = () => {

    return (
        <div className={s.wrap}>
            <UploadAccordion/>
        </div>
    )

};


export default SentenceMaker;
