import React, { useState } from 'react';
import { TabContext, TabPanel, TabList } from '@mui/lab';
import { Box, Tab } from '@mui/material';
import { connect } from 'react-redux';
import { useLocation } from 'react-router-dom'
import EditWordsTable from './DictionaryGrid/EditWordsTable';
import { DictionaryState, WordTypes } from 'src/redux/dictionary/interfaces';
import { selectDictionary } from 'src/redux/dictionary/dictSelectors';
import WordsDataTable from './DictionaryGrid/WordsDataTable';


type Props = {
    dictionary: DictionaryState
}
const DictionaryGrid = ({ dictionary }: Props) => {
    const wordTypes                           = Object.keys(dictionary) as WordTypes[];
    const [wordTypeActive, setWordTypeActive] = useState<WordTypes>("nouns");
    const location                            = useLocation();
    const isEditing                           = location.pathname === "/home/editdictionary" ? true : false;


    function handleChange(e: any, newValue: WordTypes) {
        setWordTypeActive(newValue);
    }
    

    return (
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
                        {
                            isEditing ? (
                                <EditWordsTable
                                    wordDocs={[...dictionary[wordType]].sort((a, b) => a.english.localeCompare(b.english))}
                                    wordType={wordType as WordTypes}
                                />
                            ) : (
                                <WordsDataTable
                                    rows={[...dictionary[wordType]]}
                                    title="Select word"
                                    colWidth={150}
                                    height="600px"
                                />
                            )
                        }
                        </TabPanel>
                    ))
                }
            </TabContext>
        </Box>
    );
};

export default connect(selectDictionary)(DictionaryGrid);