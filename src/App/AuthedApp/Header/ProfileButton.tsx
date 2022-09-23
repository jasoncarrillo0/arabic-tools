import { IconButton, ListItemIcon, ListItemText, Menu, MenuItem } from "@mui/material";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import React from "react";
import { useSnackbar } from "notistack";
import LogoutIcon from '@mui/icons-material/Logout';
import { useAuth } from "src/contexts/AuthContext";
import { BROWSER_HISTORY, ERR_SNACKBAR } from "src/helpers/constants";
const ProfileButton = () => {

    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const { logout } = useAuth();
    const {enqueueSnackbar} = useSnackbar()
    const [loading, setLoading] = React.useState(false);

    const handleClick = (event: any) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    function viewProfile() {
        setAnchorEl(null);
        BROWSER_HISTORY.push('/home/profile');
    }

    async function handleLogout() {
        setLoading(true);
        try {
            await logout();
            setLoading(false);
            BROWSER_HISTORY.push('/login');
        } catch (e: any) {
            console.log(e);
            setLoading(false);
            enqueueSnackbar(e.message, ERR_SNACKBAR);
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
                <AccountCircleIcon/>
            </IconButton>
            <Menu
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
            >
                <MenuItem onClick={viewProfile}>
                    <ListItemIcon>
                        <AccountCircleIcon/>
                    </ListItemIcon>
                    <ListItemText>Profile</ListItemText>
                </MenuItem>
                <MenuItem onClick={handleLogout}>
                    <ListItemIcon>
                        <LogoutIcon/>
                    </ListItemIcon>
                    <ListItemText>Logout</ListItemText>
                </MenuItem>
            </Menu>
        </div>
    );
};

export default ProfileButton;
