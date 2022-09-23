import { IconButton, Paper } from '@mui/material';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import s from './SentencePage.module.scss';
import { BROWSER_HISTORY } from 'src/helpers/constants';


const SentencePage = () => {
    return (
        <div>
            <Paper className={s.card} onClick={() => BROWSER_HISTORY.push("/home/sentences/all")}>
                <h2>View All Sentences</h2>
                <IconButton>
                    <ArrowForwardIcon fontSize="large"/>
                </IconButton>
            </Paper>

            <Paper className={s.card} onClick={() => BROWSER_HISTORY.push("/home/sentences/practice")}>
                <h2>Practice Sentences</h2>
                <IconButton>
                    <ArrowForwardIcon fontSize="large"/>
                </IconButton>
            </Paper>
        </div>
    );
};

export default SentencePage;