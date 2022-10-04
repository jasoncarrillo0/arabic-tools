import { Button, Paper } from '@mui/material';
import React, { useState } from 'react'
import { connect } from 'react-redux';
import { getVerbsObj } from 'src/helpers/utils';
import { Verb } from 'src/redux/dictionary/interfaces';
import { RootState } from 'src/redux/rootReducer';
import s from './VerbDefDisplay.module.scss'




type Props = {
    verbs: Verb[]
}
const VerbDefDisplay = ({ verbs } : Props) => {

    const [currVerb, setCurrVerb]     = useState({ english: "", arabic: ""});
    const [displayEng, setDisplayEng] = useState(false);
    const [verbDict, setVerbDict]     = useState(getVerbsObj(verbs));

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
        <Paper className={s.wrap}>
             <div className={s.choicesWrap}>
                <div className={s.top}>
                    <h3>Verbs ({Object.keys(verbDict).length}/{Object.keys(verbDict).length})</h3>
                    <Button disableElevation size="small" variant="contained" onClick={handleClick}>Get Verb</Button>
                </div>
                <hr/>
                <div className={s.verb}>
                    <div>
                        <div className={s.arabic} style={!currVerb.arabic ? { fontSize: "16px"} : {}} >
                            {currVerb.arabic ? currVerb.arabic : "none chosen"}
                        </div>
                        <div className={s.english}>
                            {currVerb.english && displayEng === true ? currVerb.english : null}
                        </div>
                    </div>
                    <Button size="small" variant="outlined" disableElevation onClick={() => setDisplayEng(!displayEng)} disabled={currVerb.english ? false : true}>
                        { displayEng ? "Hide English" : "Show English"}
                    </Button>
                </div>
                
                <div className={s.verbs}>
                {
                    Object.keys(verbDict).map((english, idx) => <div key={idx}>{verbDict[english]}</div>)
                }
                </div>
                
            </div>
        </Paper>
    );
};

const mapStateToProps = (rootState: RootState) => {
    const { verbs } = rootState.dictionary;
    return { verbs }
}

export default connect(mapStateToProps)(VerbDefDisplay);