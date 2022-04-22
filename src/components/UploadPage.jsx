import React from 'react';
import s from './UploadPage.module.scss';
import { WORD_TYPE_COLS } from '../helpers/constants';
import UploadWordsCard from './reusable/UploadWordsCard';
import { connect } from 'react-redux';

const UploadPage = ({ dictionary }) => {
    const wordTypes = Object.keys(WORD_TYPE_COLS);
    return (
        <div className={s.wrap}>
        {
            wordTypes.map((word, idx) => (
                <UploadWordsCard 
                    key={idx} 
                    wordType={word} 
                    expectedCols={WORD_TYPE_COLS[word]}
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