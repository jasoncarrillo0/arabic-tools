import { TabContext, TabPanel, TabList } from '@mui/lab';
import { Box, Tab } from '@mui/material';
import React, { useState } from 'react';
import { connect } from 'react-redux';
import { WORD_COLLECTION_NAMES } from '../helpers/constants';
import { selectDictionary } from '../redux/dictionary/dictSelectors';
import WordsDataTable from './reusable/WordsDataTable';

const DictionaryPage = ({ dictionary }) => {
    const wordTypes  = Object.values(WORD_COLLECTION_NAMES);
    const [wordTypeActive, setWordTypeActive] = useState("nouns");

    function handleChange(e, newValue) {
        setWordTypeActive(newValue);
    }

    return (
        <div>
            <h1 style={{marginBottom: "2rem"}}>Dictionary</h1>
            <Box sx={{ border: 1, borderColor: "divider" }}>
                <TabContext value={wordTypeActive}>
                    <TabList onChange={handleChange}>
                        {wordTypes.map((wordType, idx) => (
                            <Tab key={idx} label={wordType} value={wordType}/>
                        ))}
                    </TabList>
                    
                    {
                        wordTypes.map((wordType, idx) => (
                            <TabPanel 
                                value={wordType} 
                                key={Number((Math.random() * 1000).toFixed(0))}
                            >
                                <WordsDataTable
                                    rows={dictionary[wordType]}
                                    colWidth={150}
                                    height="600px"
                                />
                            </TabPanel>
                        ))
                    }
                </TabContext>
                
            </Box>
            
        </div>
    );
};



export default connect(selectDictionary)(DictionaryPage);