import { Button, CircularProgress, Collapse, ListItemIcon, ListItemText, ListItem, List, ListItemButton } from '@mui/material';
import React, { useState } from 'react';
import ListIcon from '@mui/icons-material/List';
import PsychologyIcon from '@mui/icons-material/Psychology';
import { KeyboardArrowDown, LooksOne, LooksTwo } from '@mui/icons-material';
import { BROWSER_HISTORY } from 'src/helpers/constants';

type Props = {
    stateLoading: boolean
}
const MobileSentencesButton = ({ stateLoading } : Props) => {
    const [open, setOpen]           = useState(false);


    function handleClose() {
        setOpen(false);
    }

    function handleViewAll() {
        BROWSER_HISTORY.push('/home/sentences')
        handleClose();
    }


    function handlePractice() {
        BROWSER_HISTORY.push('/home/sentences/practice');
        handleClose();
    }

    function toSentence(level: "levelone" | "leveltwo") {
        return () => {
            setOpen(false);
            BROWSER_HISTORY.push(`/home/sentences/edit/${level}`)
        }
    }


    return (
        <>
            <Button 
                onClick={() => setOpen(!open)}
                endIcon={<KeyboardArrowDown/>}
            >
                Sentence Practice
            </Button>
            <List>
                <ListItem onClick={handleViewAll}>
                    {
                        stateLoading ? (
                            <CircularProgress size="20px" sx={{marginRight: '16px'}} color="primary"/>
                        ) : (
                            <ListItemIcon>
                                <ListIcon/>
                            </ListItemIcon>
                        )
                    }
                    <ListItemText>View All Sentences</ListItemText>
                </ListItem>
                <ListItem onClick={handlePractice}>
                    {
                        stateLoading ? (
                            <CircularProgress size="20px" sx={{marginRight: '16px'}} color="primary"/>
                        ) : (
                            <ListItemIcon>
                                <PsychologyIcon/>
                            </ListItemIcon>
                        )
                    }
                    <ListItemText>Practice</ListItemText>
                </ListItem>
                
            </List>w
        </>
    );
};

export default MobileSentencesButton;