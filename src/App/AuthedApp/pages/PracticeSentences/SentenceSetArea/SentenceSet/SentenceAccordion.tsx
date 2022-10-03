import { ExpandMore } from "@mui/icons-material";
import { Accordion, AccordionSummary, Typography, AccordionDetails } from "@mui/material";
import { Sentence } from "src/redux/sentence/interfaces";

type Props = {
    sentence: Sentence
    translateArabic: boolean
}

const SentenceAccordion = ({ sentence, translateArabic }: Props) => {

    const sentenceToTranslate = translateArabic ? sentence.arabic : sentence.english;
    const sentenceAnswer      = translateArabic ? sentence.english : sentence.arabic;
    return (
        <Accordion TransitionProps={{ unmountOnExit: true }}>
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