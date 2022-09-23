import { Button } from '@mui/material';
import React, { useState } from 'react'
import { ALL_VERBS } from 'src/helpers/constants';
import { getVerbsObj } from 'src/helpers/utils';
import s from './VerbDefDisplay.module.scss'

const INIT_STATE = getVerbsObj(ALL_VERBS);


const VerbDefDisplay = () => {
    const [currVerb, setCurrVerb]     = useState({ english: "", arabic: ""});
    const [displayEng, setDisplayEng] = useState(false);
    const [verbDict, setVerbDict] = useState(INIT_STATE);

    function handleClick() {
        let englishWords = Object.keys(verbDict);
        let english = englishWords[Math.floor(Math.random() * englishWords.length)];
        setCurrVerb({english, arabic: verbDict[english]});
        setVerbDict(prev => {
            delete prev[english];
            return { ...prev }
        });
    }

    return (
        <div className={s.wrap}>
             <div className={s.choicesWrap}>
                <div className={s.top}>
                    <h3>Verbs ({Object.keys(verbDict).length}/64)</h3>
                    <Button variant="contained" onClick={handleClick}>Get Verb</Button>
                </div>
                <hr/>
                <div className={s.verb}>
                    <div>
                        <div className={s.arabic} style={currVerb.english ? {fontSize: '19px'} : {fontSize: '16px'}}>
                            {currVerb.arabic ? currVerb.arabic : "none chosen"}
                        </div>
                        <div className={s.english}>
                            {currVerb.english && displayEng === true ? currVerb.english : null}
                        </div>
                    </div>
                    <Button onClick={() => setDisplayEng(!displayEng)} disabled={currVerb.english ? false : true}>
                        { displayEng ? "Hide English" : "Show English"}
                    </Button>
                </div>
                
                <div className={s.verbs}>
                {
                    Object.keys(verbDict).map((english, idx) => <div key={idx}>{verbDict[english]}</div>)
                }
                </div>
                
            </div>
        </div>
    );
};

export default VerbDefDisplay;