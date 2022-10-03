import { Button, Paper } from '@mui/material';
import React, { useState } from 'react'
import s from './ConjugationsDisplay.module.scss'
const conjugations = ['I', 'you(m)', 'you(f)', 'you(p)', 'we', 'he', 'she', 'they'];

const ConjugationsDisplay = ({}) => {
    const [currConjugations, setcurrConjugations] = useState(conjugations);
    const [conjugation, setConjugation]           = useState("");

    function handleClick() {
        const choice = currConjugations[Math.floor(Math.random() * currConjugations.length)];
        setConjugation(choice)
        if (currConjugations.length > 0) {
            setcurrConjugations(currConjugations.filter(t => t !== choice));
        } else {
            setcurrConjugations(conjugations);
        }
        
    }
    return (
        <Paper className={s.wrap}>

            <div className={s.choicesWrap}>
                <div className={s.top}>
                    <h3>Conjugations ({currConjugations.length}/8)</h3>
                    <Button disableElevation size="small" variant="contained" onClick={handleClick}>Get Choice</Button>
                </div>
                <hr/>
                <div className={s.conjugation}>{conjugation ? conjugation : "none chosen"}</div>
                {
                    currConjugations.map((t, idx) => <div key={idx}>{t}</div>)
                }
            </div>
        </Paper>
    );
};

export default ConjugationsDisplay;