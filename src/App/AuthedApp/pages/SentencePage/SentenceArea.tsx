import React, { useState } from 'react';
import { TabContext, TabPanel, TabList } from '@mui/lab';
import { Box, Tab } from '@mui/material';
import { connect } from 'react-redux';
import SentenceTable from './SentenceArea/SentenceTable';
import { SentenceCollectionNames, SentenceState } from 'src/redux/sentence/interfaces';
import { RootState } from 'src/redux/rootReducer';
import { SENTENCE_COLLECTION_INFO } from 'src/helpers/constants';

type Props = {
    sentences: SentenceState
}
const SentenceArea = ({ sentences }: Props) => {
    const sentenceTypes                               = Object.keys(sentences) as SentenceCollectionNames[];
    const [sentenceTypeActive, setSentenceTypeActive] = useState<SentenceCollectionNames>("levelOneSentences");

    function handleChange(e: any, newValue: SentenceCollectionNames) {
        setSentenceTypeActive(newValue);
    }

    function formatTabTitle(sentenceType: SentenceCollectionNames) {
        // "levelOneSentence"
        const level = sentenceType.split("level")[1].split("Sentence")[0];
        return `Level ${level}`
    }


    return (
        <Box sx={{ border: 1, borderColor: "divider" }}>
            <TabContext value={sentenceTypeActive}>
                <TabList onChange={handleChange}>
                    {sentenceTypes.map((sentenceType, idx) => (
                        <Tab key={idx} label={formatTabTitle(sentenceType)} value={sentenceType}/>
                    ))}
                </TabList>
                {
                    sentenceTypes.map((sentenceType, idx) => (
                        <TabPanel 
                            value={sentenceType} 
                            key={Number((Math.random() * 1000).toFixed(0))}
                        >
                            <SentenceTable
                                sentences={sentences[sentenceType]}
                                collectionName={sentenceType}
                                level={SENTENCE_COLLECTION_INFO[sentenceType]}
                            />
                        </TabPanel>
                    ))
                }
            </TabContext>
        </Box>
    );
};


const mapStateToProps = (rootState: RootState) => {
    const { sentences } = rootState;
    return { sentences }
}
export default connect(mapStateToProps)(SentenceArea);