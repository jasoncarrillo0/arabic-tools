import React from 'react';
import s from './UploadAccordion.module.scss';
import { Accordion, AccordionSummary, AccordionDetails} from '@mui/material';
import VerbsAccordion from './UploadAccordion/VerbsAccordion';
import NounsAccordion from './UploadAccordion/NounsAccordion';
import AdjectivesAccordion from './UploadAccordion/AdjectivesAccordion';
import PrepositionsAccordion from './UploadAccordion/PrepositionsAccordion';
import ParticlesAccordion from './UploadAccordion/ParticlesAccordion';

const UploadAccordion = () => {
    return (
        <div className={s.wrap}>
            <VerbsAccordion/>
            <NounsAccordion/>
            <AdjectivesAccordion/>
            <PrepositionsAccordion/>
            <ParticlesAccordion/>
        </div>
    );
};

export default UploadAccordion;