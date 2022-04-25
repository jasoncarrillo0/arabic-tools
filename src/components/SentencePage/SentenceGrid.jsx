import React, { useState } from 'react';
import { TabContext, TabPanel, TabList } from '@mui/lab';
import { Box, Tab } from '@mui/material';
import { SENTENCE_COLLECTION_NAMES, SENTENCE_COLL_WORD_TYPES } from '../../helpers/constants';
import { connect } from 'react-redux';
import SentenceTable from '../CreateSentencePage/SentenceTable';


const SentencesGrid = ({ sentences }) => {
    const sentenceTypes                               = Object.values(SENTENCE_COLLECTION_NAMES);
    const [sentenceTypeActive, setSentenceTypeActive] = useState("levelOneSentences");
    const finalSentenceTypes = sentenceTypes.filter(type => sentences[type].length > 0);

    function handleChange(e, newValue) {
        setSentenceTypeActive(newValue);
    }

    function formatTabTitle(sentenceType) {
        // "levelOneSentence"
        const level = sentenceType.split("level")[1].split("Sentence")[0];
        return `Level ${level}`
    }


    return (
        <Box sx={{ border: 1, borderColor: "divider" }}>
            <TabContext value={sentenceTypeActive}>
                <TabList onChange={handleChange}>
                    {finalSentenceTypes.map((sentenceType, idx) => (
                        <Tab key={idx} label={formatTabTitle(sentenceType)} value={sentenceType}/>
                    ))}
                </TabList>
                {
                    finalSentenceTypes.map((sentenceType, idx) => (
                        <TabPanel 
                            value={sentenceType} 
                            key={Number((Math.random() * 1000).toFixed(0))}
                        >
                            <SentenceTable
                                wordTypes={SENTENCE_COLL_WORD_TYPES[sentenceType]}
                                sentences={sentences[sentenceType]}
                                collectionName={sentenceType}
                            />
                        </TabPanel>
                    ))
                }
            </TabContext>
        </Box>
    );
};


const mapStateToProps = (rootState) => {
    const { sentences } = rootState;
    return { sentences }
}
export default connect(mapStateToProps)(SentencesGrid);