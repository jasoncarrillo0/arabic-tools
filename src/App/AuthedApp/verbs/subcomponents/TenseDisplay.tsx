import { Button } from '@mui/material';
import React, { useState } from 'react'
import s from './TenseDisplay.module.scss'

const tenses       = ['present', 'past', 'present continuous', 'past continuous', 'far past', 'future', 'active participle', 'passive participle', 'passive construction'];

const TenseDisplay = () => {
    const [currTenses, setCurrTenses] = useState(tenses);
    const [tense, setTense]           = useState("");


    function handleClick() {
        const choice = currTenses[Math.floor(Math.random() * currTenses.length)];
        setTense(choice)
        if (currTenses.length > 0) {
            setCurrTenses(currTenses.filter(t => t !== choice));
        } else {
            setCurrTenses(tenses);
        }
        
    }

    return (
        <div className={s.wrap}>

            <div className={s.choicesWrap}>
                <div className={s.top}>
                    <h3>Tenses ({currTenses.length}/9)</h3>
                    <Button size="small" variant="contained" onClick={handleClick}>Get Tense</Button>
                </div>
                <hr/>
                <div className={s.tense}>{tense ? tense : "none chosen"}</div>
                {
                    currTenses.map((t, idx) => <div key={idx}>{t}</div>)
                }
            </div>
        </div>
    );
};

export default TenseDisplay;