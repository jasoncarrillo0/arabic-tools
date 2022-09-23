import React from 'react';
import s from './UploadPage.module.scss';
import { useSelector } from 'react-redux';
import { WordTypes } from 'src/redux/dictionary/interfaces';
import { selectDictionary } from 'src/redux/dictionary/dictSelectors';
import { CSV_DICTIONARY_COLS } from 'src/helpers/constants';
import UploadWordsCard from './UploadPage/UploadWordsCard';



const UploadPage = () => {
    const { dictionary } = useSelector(selectDictionary)
    return (
        <div className={s.wrap}>
        {
            Object.keys(dictionary).map((word, idx) => (
                <UploadWordsCard 
                    key={idx} 
                    wordType={word as WordTypes} 
                    expectedCols={CSV_DICTIONARY_COLS[word as WordTypes]}
                    wordsInState={dictionary[word as WordTypes].length > 0}
                />
            ))
        }
        </div>
    );
};


export default UploadPage;