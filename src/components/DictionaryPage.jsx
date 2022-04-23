import { TabContext, TabPanel, TabList } from '@mui/lab';
import { Box, Tab } from '@mui/material';
import React, { useState } from 'react';
import { WORD_COLLECTION_NAMES } from '../helpers/constants';

const DictionaryPage = () => {
    const wordTypes  = Object.values(WORD_COLLECTION_NAMES);
    const [wordTypeActive, setWordTypeActive] = useState("nouns");

    function handleChange(e, newValue) {
        setWordTypeActive(newValue);
    }

    return (
        <div>
            <h1>Dictionary</h1>
            <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
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
                            >{wordType}</TabPanel>
                        ))
                    }
                </TabContext>
                
            </Box>
            
        </div>
    );
};

export default DictionaryPage;