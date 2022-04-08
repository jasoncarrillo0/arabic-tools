import React from 'react';
import s from './UploadAccordion.module.scss';
import { UPLOAD_WORDS } from '../../helpers/constants';
import UploadWordsCard from '../reusable/UploadWordsCard';

const UploadAccordion = () => {
    return (
        <div className={s.wrap}>
        {
            Object.keys(UPLOAD_WORDS).map((word, idx) => (
                <UploadWordsCard 
                    key={idx} 
                    wordType={word} 
                    expectedCols={UPLOAD_WORDS[word]}
                />
            ))
        }
        </div>
    );
};

export default UploadAccordion;