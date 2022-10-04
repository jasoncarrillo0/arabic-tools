import {
    Dialog,
    AppBar,
    Toolbar,
    IconButton,
    Typography,
    ToggleButtonGroup,
    ToggleButton,

    Paper,
    Slide,
    Box,
    Divider,
} from "@mui/material";
import { forwardRef, MouseEvent, useState } from "react";
import { Sentence } from "src/redux/sentence/interfaces";
import s from "./SentenceSet.module.scss";
import CloseIcon from "@mui/icons-material/Close";
import { TransitionProps } from "@mui/material/transitions";
import SentenceAccordion from "./SentenceSet/SentenceAccordion";

type Props = {
    startIdx: number;
    sentences: Sentence[];
};

const Transition = forwardRef(function Transition(
    props: TransitionProps & {
        children: React.ReactElement;
    },
    ref: React.Ref<unknown>
) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const SentenceSet = ({ startIdx, sentences }: Props) => {
    const [open, setOpen] = useState(false);
    const [language, setLanguage] = useState<"arabic" | "english">("arabic");
    const endingNum = sentences.length === 8 ? 8 : sentences.length;
    const title = `Sentence set ${startIdx + 1} - ${startIdx + endingNum}`;




    function handleLanguageChange(e: MouseEvent<HTMLElement>, newVal: "english" | "arabic") {
        setLanguage(newVal);
    }
    return (
        <>
            <Paper classes={{ root: s.wrap }} onClick={() => setOpen(true)}>
                <h3>{title}</h3>
            </Paper>
            <Dialog
                fullScreen
                open={open}
                onClose={() => setOpen(false)}
                TransitionComponent={Transition}
            >
                <AppBar sx={{ position: "relative", backgroundColor: "#1ebca5" }}>
                    <Toolbar>
                        <IconButton
                            edge="start"
                            color="inherit"
                            onClick={() => setOpen(false)}
                            aria-label="close"
                        >
                            <CloseIcon />
                        </IconButton>
                        <Typography
                            sx={{ ml: 2, flex: 1 }}
                            variant="h6"
                            component="div"
                        >
                            {title}
                        </Typography>
                    </Toolbar>
                </AppBar>
                <Box className={s.practiceWrap}>
                    <Paper classes={{ root: s.directions }}>
                        <h3>Directions</h3>
                        <Divider/>
                        <div>- Write the translation of each language.</div>
                        <div>- Click the sentence to see the translation.</div>
                        <div>- Make sure to attempt to write the translation before viewing the answer!</div>
                    </Paper>
                    <Paper classes={{ root: s.practiceArea }}>
                        <div className={s.setting}>
                            <ToggleButtonGroup
                                value={language}
                                exclusive
                                onChange={handleLanguageChange}
                            >
                                <ToggleButton value="arabic">
                                    Translate Arabic
                                </ToggleButton>
                                <ToggleButton value="english">
                                    Translate English
                                </ToggleButton>
                            </ToggleButtonGroup>
                        </div>
                        <div className={s.accordionWrap}>
                        {sentences.map((sentence, idx) => (
                            <SentenceAccordion
                                key={idx}
                                sentence={sentence}
                                language={language}
                            />
                        ))}
                        </div>
                    </Paper>
                    
                    
                </Box>
            </Dialog>
        </>
    );
};

export default SentenceSet;
