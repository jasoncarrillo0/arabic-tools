import React from 'react'
import ConjugationsDisplay from './subcomponents/ConjugationsDisplay';
import TenseDisplay from './subcomponents/TenseDisplay';
import VerbDefDisplay from './subcomponents/VerbDefDisplay';
import s from './VerbsArea.module.scss'

const VerbsArea = ({}) => {
    return (
        <div className={s.wrap}>
            <TenseDisplay/>
            <ConjugationsDisplay/>
            <VerbDefDisplay/>
        </div>
    );
};

export default VerbsArea;