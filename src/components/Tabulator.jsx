import { Tab, Tabs } from '@mui/material';
import React, { useState } from 'react'
import { Route, Switch, useHistory, useLocation } from 'react-router-dom';
import s from './Tabulator.module.scss'
import VerbsArea from './verbs/VerbsArea';



const Tabulator = ({}) => {
    const history = useHistory();
    const location = useLocation();
    const [value, setValue] = useState(0);


    function handleVerbNavAway(e) {
        let { textContent } = e.target;

        if (value === 0 && location.pathname === "/verbs") {
            if (textContent === "verbs") {
                return
            }
            let confirmed = window.confirm('are you sure you want to leave? Verbs will be reset if you do.');
            if (!confirmed) return
        }
        switch (textContent) {
            case 'nouns':
                history.push('/nouns');
                setValue(1);
                break;
            case 'prepositions':
                history.push('/prepositions');
                setValue(2);
                break;
            default:
                history.push('/verbs');
                setValue(0);
                break;
        }
        
    }
    return (
        <>
            <div className={s.wrap}>
                <h1>Arabic Tools</h1>
                <Tabs value={value}>
                    <Tab label="verbs" onClick={handleVerbNavAway}/>
                    <Tab label="nouns" onClick={handleVerbNavAway}/>
                    <Tab label="prepositions" onClick={handleVerbNavAway}/>
                </Tabs>
            </div>

            <Switch>
                <Route exact path="/verbs" component={VerbsArea}/>
            </Switch>
        </>
        
    );
};

export default Tabulator;