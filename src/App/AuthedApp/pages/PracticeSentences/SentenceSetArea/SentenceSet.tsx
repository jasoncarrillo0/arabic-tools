import {
    Dialog,
    AppBar,
    Toolbar,
    IconButton,
    Typography,
    Button,
    List,
    ListItem,
    ListItemText,
    Divider,
    Paper,
    Slide,
    Box,
} from "@mui/material";
import { forwardRef, useState } from "react";
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
    const title = `Sentence set ${startIdx + 1} - ${startIdx + 8}`;
    return (
        <>
            <Paper classes={{ root: s.wrap }} onClick={() => setOpen(true)}>
                <h3>{title}</h3>
            </Paper>
            <Dialog fullScreen open={open} onClose={() => setOpen(false)} TransitionComponent={Transition}>
                <AppBar sx={{ position: "relative" }}>
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
                <Box>
                {
                    sentences.map((sentence, idx) => (
                        <SentenceAccordion 
                            key={idx} 
                            sentence={sentence} 
                            translateArabic
                        />
                    ))
                }
                </Box>
            </Dialog>
        </>
    );
};

export default SentenceSet;
