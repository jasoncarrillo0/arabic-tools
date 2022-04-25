import { Button, ListItemIcon, ListItemText, Menu, MenuItem } from '@mui/material';
import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import ListIcon from '@mui/icons-material/List';
import PsychologyIcon from '@mui/icons-material/Psychology';
const SentencesButton = () => {
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const history = useHistory();


    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    function handleViewAll() {
        history.push('/home/sentences/all')
        handleClose();
    }


    function handlePractice() {
        history.push('/home/sentences/practice');
        handleClose();
    }


    return (
        <>
            <Button 
                sx={{color: "white"}} 
                onClick={() => history.push("/home/sentences")}
                onMouseEnter={handleClick}
            >
                Sentence Practice
            </Button>
            <Menu
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{ onMouseLeave: handleClose }}
            >
                <MenuItem onClick={handleViewAll}>
                    <ListItemIcon>
                        <ListIcon/>
                    </ListItemIcon>
                    <ListItemText>View All Sentences</ListItemText>
                </MenuItem>
                <MenuItem onClick={handlePractice}>
                    <ListItemIcon>
                        <PsychologyIcon/>
                    </ListItemIcon>
                    <ListItemText>Practice</ListItemText>
                </MenuItem>
            </Menu>
        </>
    );
};

export default SentencesButton;