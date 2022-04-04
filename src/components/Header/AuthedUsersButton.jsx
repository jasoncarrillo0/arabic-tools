import { IconButton, ListItemIcon, ListItemText, Menu, MenuItem } from '@mui/material';
import React, { useState } from 'react';
import BuildIcon from '@mui/icons-material/Build';
import UploadIcon from '@mui/icons-material/Upload';
import CreateIcon from '@mui/icons-material/Create';
import { useHistory } from 'react-router-dom';
const AuthedUsersButton = () => {
    const [anchorEl, setAnchorEl] = useState(null);
    const open                    = Boolean(anchorEl);
    const history                 = useHistory();

    function handleClick(event) {
        setAnchorEl(event.currentTarget);
    };

    function handleClose() {
        setAnchorEl(null);
    };

    function handleToUpload() {
        handleClose();
        history.push('/home/upload')
    }

    function handleToCreate() {
        handleClose();
        history.push('/home/create')
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
            >
                <MenuItem onClick={handleToUpload}>
                    <ListItemIcon>
                        <UploadIcon/>
                    </ListItemIcon>
                    <ListItemText>Upload CSV files</ListItemText>
                </MenuItem>
                <MenuItem onClick={handleToCreate}>
                    <ListItemIcon>
                        <CreateIcon/>
                    </ListItemIcon>
                    <ListItemText>Create Sentences</ListItemText>
                </MenuItem>
            </Menu>
        </div>
    );
};

export default AuthedUsersButton;