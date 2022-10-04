import { ExpandMore } from "@mui/icons-material";
import { Accordion, AccordionSummary, Typography, AccordionDetails, Tooltip } from "@mui/material";
import RtlProvider from "src/App/reusable/RtlProvider";
import { Sentence } from "src/redux/sentence/interfaces";

type Props = {
    sentence: Sentence
    language: "arabic" | "english"
}

const SentenceAccordion = ({ sentence, language }: Props) => {

    const sentenceToTranslate     = language === "arabic" ? sentence.arabic : sentence.english;
    const sentenceAnswer          = language === "arabic" ? sentence.english : sentence.arabic;
    return (
        <RtlProvider>
            <Accordion sx={{width: '100%'}} TransitionProps={{ unmountOnExit: true }}>
                <AccordionSummary expandIcon={<ExpandMore />}>
                    <Typography fontSize={language === "arabic" ? "30px" : "inherit"}>{sentenceToTranslate}</Typography>
                </AccordionSummary>
                <AccordionDetails sx={{fontSize: language === "arabic" ? "inherit" : "30px"}}>
                    {sentenceAnswer}
                </AccordionDetails>
                
            </Accordion>
        </RtlProvider>

    )
}

export default SentenceAccordion;