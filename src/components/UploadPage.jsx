import React from 'react';
import s from './UploadPage.module.scss';
import { UPLOAD_WORDS } from '../helpers/constants';
import UploadWordsCard from './reusable/UploadWordsCard';
import { connect } from 'react-redux';
import { selectAllWords } from '../redux/dictionary/dictSelectors';

const UploadPage = ({ extractedDictionary }) => {

    return (
        <div className={s.wrap}>
        {
            Object.keys(UPLOAD_WORDS).map((word, idx) => (
                <UploadWordsCard 
                    key={idx} 
                    wordType={word} 
                    expectedCols={UPLOAD_WORDS[word]}
                    wordsInState={extractedDictionary[word].length > 0}
                />
            ))
        }
        </div>
    );
};


export default connect(selectAllWords)(UploadPage);