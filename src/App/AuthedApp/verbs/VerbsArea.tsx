import React from 'react'
import ConjugationsDisplay from './subcomponents/ConjugationsDisplay';
import TenseDisplay from './subcomponents/TenseDisplay';
import VerbDefDisplay from './subcomponents/VerbDefDisplay';
import s from './VerbsArea.module.scss'
import EastIcon from '@mui/icons-material/East';
import SouthIcon from '@mui/icons-material/South';

import { Box } from '@mui/system';
import { Paper } from '@mui/material';

const VerbsArea = ({}) => {
    const innerWidth = window.innerWidth;

    
    return (
        <div className={s.wrap}>
            <Paper classes={{root: s.paper}}>
                <h2>1. Pick random verb</h2>
                <VerbDefDisplay/>
            </Paper>
            <Box>
                {
                    innerWidth > 430 ? (
                        <EastIcon fontSize="large"/>
                    ) : (
                        <SouthIcon fontSize="large"/>
                    )
                }
            </Box>
            <Paper classes={{root: s.paper}}>
                <h2>2. Pick random tense</h2>
                <TenseDisplay/>
            </Paper>
            <Box>
                {
                    innerWidth > 430 ? (
                        <EastIcon fontSize="large"/>
                    ) : (
                        <SouthIcon fontSize="large"/>
                    )
                }            </Box>
            <Paper classes={{root: s.paper}}>
                <h2>3. Write conjugation</h2>
                <ConjugationsDisplay/>
            </Paper>
        </div>
    );
};

export default VerbsArea;