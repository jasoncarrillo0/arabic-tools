import { ExpandMore } from "@mui/icons-material";
import { Accordion, AccordionSummary, Typography, AccordionDetails } from "@mui/material";
import { Sentence } from "src/redux/sentence/interfaces";

type Props = {
    sentence: Sentence
    language: "arabic" | "english"
}

const SentenceAccordion = ({ sentence, language }: Props) => {

    const sentenceToTranslate     = language === "arabic" ? sentence.arabic : sentence.english;
    const sentenceAnswer          = language === "english" ? sentence.english : sentence.arabic;
    return (
        <Accordion sx={{width: '100%'}} TransitionProps={{ unmountOnExit: true }}>
            <AccordionSummary expandIcon={<ExpandMore />}>
                <Typography>{sentenceToTranslate}</Typography>
            </AccordionSummary>
            <AccordionDetails>
                {sentenceAnswer}
            </AccordionDetails>
        </Accordion>
    )
}

export default SentenceAccordion;