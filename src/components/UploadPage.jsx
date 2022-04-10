import React from 'react';
import s from './UploadPage.module.scss';
import { UPLOAD_WORDS } from '../helpers/constants';
import UploadWordsCard from './reusable/UploadWordsCard';
import { connect } from 'react-redux';

const UploadPage = ({ dictionary }) => {

    return (
        <div className={s.wrap}>
        {
            Object.keys(UPLOAD_WORDS).map((word, idx) => (
                <UploadWordsCard 
                    key={idx} 
                    wordType={word} 
                    expectedCols={UPLOAD_WORDS[word]}
                    wordsInState={dictionary[word].length > 0}
                />
            ))
        }
        </div>
    );
};

const mapStateToProps = (rootState) => {
    const { dictionary } = rootState;
    return { dictionary }
}
export default connect(mapStateToProps)(UploadPage);