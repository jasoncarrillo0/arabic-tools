import { Collapse, IconButton, List, ListItemButton, ListItemIcon, ListItemText, Menu, MenuItem } from '@mui/material';
import React, { useState } from 'react';
import BuildIcon from '@mui/icons-material/Build';
import UploadIcon from '@mui/icons-material/Upload';
import CreateIcon from '@mui/icons-material/Create';
import ChangeCircleIcon from '@mui/icons-material/ChangeCircle'
import { BROWSER_HISTORY } from 'src/helpers/constants';
import { ExpandLess, ExpandMore, LooksOne, LooksTwo } from '@mui/icons-material';
import s from './AuthedUsersButton.module.scss';

const AuthedUsersButton = () => {
    const [anchorEl, setAnchorEl] = useState(null);
    const open                    = Boolean(anchorEl);
    const [innerOpen, setInnerOpen] = useState(false);


    function handleClick(event: any): void {
        setAnchorEl(event.currentTarget);
    };

    function handleClose() {
        setAnchorEl(null);
        setInnerOpen(false);
    };

    function handleToUpload() {
        handleClose();
        BROWSER_HISTORY.push('/home/upload')
    }

    function handleToCreate() {
        setInnerOpen(!innerOpen);
    }

    function handleToEditDict() {
        handleClose();
        BROWSER_HISTORY.push('/home/dictionary/edit')
    }

    function toSentence(level: "levelone" | "leveltwo") {
        return () => {
            handleClose();
            BROWSER_HISTORY.push(`/home/sentences/edit/${level}`)
        }
    }

    return (
        <div>
            <IconButton
                id="basic-button"
                aria-controls={open ? "basic-menu" : undefined}
                aria-haspopup="true"
                aria-expanded={open ? "true" : undefined}
                onClick={handleClick}
            >
                <BuildIcon sx={{color: "#62ce67"}}/>
            </IconButton>
            <Menu
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                sx={{width: "300px"}}
                classes={{root: s.menu}}
            >
                <MenuItem onClick={handleToUpload}>
                    <ListItemIcon>
                        <UploadIcon/>
                    </ListItemIcon>
                    <ListItemText>Upload CSV files</ListItemText>
                </MenuItem>
                
                <MenuItem onClick={handleToEditDict}>
                    <ListItemIcon>
                        <ChangeCircleIcon/>
                    </ListItemIcon>
                    <ListItemText>Edit Dictionary</ListItemText>
                </MenuItem>
                <MenuItem onClick={handleToCreate}>
                    <ListItemIcon>
                        <CreateIcon/>
                    </ListItemIcon>
                    <ListItemText>Create Sentences</ListItemText>
                    
                    {innerOpen ? <ExpandLess /> : <ExpandMore />}
                </MenuItem>
                <Collapse in={innerOpen} timeout="auto" unmountOnExit>
                    <List component="div">
                        <ListItemButton sx={{ pl: 3 }} onClick={toSentence("levelone")}>
                            <ListItemIcon>
                                <LooksOne/>
                            </ListItemIcon>
                            <ListItemText primary="Level One" />
                        </ListItemButton>
                        <ListItemButton sx={{ pl: 3 }} onClick={toSentence("leveltwo")}>
                            <ListItemIcon>
                                <LooksTwo/>
                            </ListItemIcon>
                            <ListItemText primary="Level Two" />
                        </ListItemButton>
                    </List>
                </Collapse>
            </Menu>
        </div>
    );
};

export default AuthedUsersButton;