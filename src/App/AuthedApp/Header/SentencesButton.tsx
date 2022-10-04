import { Button, CircularProgress, ListItemIcon, ListItemText, Menu, MenuItem } from '@mui/material';
import React, { useState } from 'react';
import ListIcon from '@mui/icons-material/List';
import PsychologyIcon from '@mui/icons-material/Psychology';
import { KeyboardArrowDown } from '@mui/icons-material';
import { BROWSER_HISTORY } from 'src/helpers/constants';

type Props = {
    stateLoading: boolean
}
const SentencesButton = ({ stateLoading } : Props) => {
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);


    const handleClick = (event: any) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    function handleViewAll() {
        BROWSER_HISTORY.push('/home/sentences')
        handleClose();
    }


    function handlePractice() {
        BROWSER_HISTORY.push('/home/sentences/practice');
        handleClose();
    }


    return (
        <>
            <Button 
                onClick={handleClick}
                endIcon={<KeyboardArrowDown/>}
            >
                Sentences
            </Button>
            <Menu
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
            >
                <MenuItem onClick={handlePractice}>
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
                </MenuItem>
                <MenuItem onClick={handleViewAll}>
                    {
                        stateLoading ? (
                            <CircularProgress size="20px" sx={{marginRight: '16px'}} color="primary"/>
                        ) : (
                            <ListItemIcon>
                                <ListIcon/>
                            </ListItemIcon>
                        )
                    }
                    <ListItemText>View All</ListItemText>
                </MenuItem>
            </Menu>
        </>
    );
};

export default SentencesButton;