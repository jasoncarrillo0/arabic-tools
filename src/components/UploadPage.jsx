import React from "react";
import { connect } from "react-redux";
import { setAdjectives } from '../redux/dictionary/dictActions'
import s from "./UploadPage.module.scss";
import UploadAccordion from "./UploadPage/UploadAccordion";

const SentenceMaker = ({ setAdjectives }) => {

    return (
        <div className={s.wrap}>
            <UploadAccordion/>
        </div>
    )

};
const mapDispatch = {
    setAdjectives: (arr) => setAdjectives(arr)
};

export default connect(null, mapDispatch)(SentenceMaker);
