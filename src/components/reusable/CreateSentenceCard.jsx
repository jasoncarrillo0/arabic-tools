import { Button, Card, CardContent } from '@mui/material';
import React from 'react';
import { useLocation } from 'react-router-dom';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import s from './CreateSentenceCard.module.scss';

/*
    level ex: "Level Two"
    elements: string[] of which word types to include in sentence
*/
const CreateSentenceCard = ({ level, elements }) => {
    const history   = useHistory();
    const pathname  = useLocation().pathname
    const levelPath = `${pathname}/${level.replace(/ /g, '').toLowerCase()}`
    return (
        <Card className={s.wrap}>
            <h2>{level} Sentence</h2>
            <div className={s.listWrap}>
                <h5>Contains:</h5>
                <ol>
                {
                    elements.map((el, idx) => (<li key={idx}>{el}</li>))
                }
                </ol>
            </div>
            <CardContent className={s.content}>
            <div className={s.btnWrap}>
                <Button onClick={() => history.push(levelPath)} sx={{backgroundColor: "#b7b7b7"}} variant="contained">
                    Create
                </Button>
            </div>
            </CardContent>
        </Card>
    );
};

export default CreateSentenceCard;