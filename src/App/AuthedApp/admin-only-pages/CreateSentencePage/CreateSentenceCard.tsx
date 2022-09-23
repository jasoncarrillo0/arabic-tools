import { Button, Card, CardContent } from '@mui/material';
import { useLocation } from 'react-router-dom';
import { BROWSER_HISTORY } from 'src/helpers/constants';
import { PracticeSentenceElements, SentenceCollectionTitles } from 'src/redux/sentence/interfaces';
import s from './CreateSentenceCard.module.scss';

type Props = {
    title: SentenceCollectionTitles
    elements: PracticeSentenceElements[]
}
const CreateSentenceCard = ({ title, elements }: Props) => {
    const pathname  = useLocation().pathname
    const titlePath = `${pathname}/${title.replace(/ /g, '').toLowerCase()}`
    return (
        <Card className={s.wrap}>
            <h2>{title} Sentence</h2>
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
                <Button onClick={() => BROWSER_HISTORY.push(titlePath)} sx={{backgroundColor: "#b7b7b7"}} variant="contained">
                    Create
                </Button>
            </div>
            </CardContent>
        </Card>
    );
};

export default CreateSentenceCard;