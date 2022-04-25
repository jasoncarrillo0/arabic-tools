import { IconButton, Paper } from '@mui/material';
import React from 'react';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import s from './SentencePage.module.scss';
import { useHistory } from 'react-router-dom';


const SentencePage = () => {
    const history = useHistory();
    return (
        <div>
            <Paper className={s.card} onClick={() => history.push("/home/sentences/all")}>
                <h2>View All Sentences</h2>
                <IconButton>
                    <ArrowForwardIcon fontSize="large"/>
                </IconButton>
            </Paper>

            <Paper className={s.card} onClick={() => history.push("/home/sentences/practice")}>
                <h2>Practice Sentences</h2>
                <IconButton>
                    <ArrowForwardIcon fontSize="large"/>
                </IconButton>
            </Paper>
        </div>
    );
};

export default SentencePage;