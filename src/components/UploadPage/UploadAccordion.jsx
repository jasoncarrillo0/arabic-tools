import React from 'react';
import s from './UploadAccordion.module.scss';
import VerbsAccordion from './UploadAccordion/VerbsAccordion';
import NounsAccordion from './UploadAccordion/NounsAccordion';
import AdjectivesAccordion from './UploadAccordion/AdjectivesAccordion';
import PrepositionsAccordion from './UploadAccordion/PrepositionsAccordion';
import ParticlesAccordion from './UploadAccordion/ParticlesAccordion';
import ConnectorsAccordion from './UploadAccordion/ConnectorsAccordion';

const UploadAccordion = () => {
    return (
        <div className={s.wrap}>
            <VerbsAccordion/>
            <NounsAccordion/>
            <AdjectivesAccordion/>
            <PrepositionsAccordion/>
            <ParticlesAccordion/>
            <ConnectorsAccordion/>
        </div>
    );
};

export default UploadAccordion;