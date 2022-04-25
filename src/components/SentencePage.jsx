import { Paper } from '@mui/material';
import React from 'react';
import SentenceGrid from './SentencePage/SentenceGrid';

const SentencePage = () => {
    return (
        <div>
            <Paper>
                <h2>View All Sentences</h2>
                <SentenceGrid/>
            </Paper>

            <Paper>
                <h2>Practice Sentences</h2>
            </Paper>
        </div>
    );
};

export default SentencePage;