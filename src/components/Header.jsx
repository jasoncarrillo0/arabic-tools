import { AppBar, Button, Toolbar } from '@mui/material';
import { Box } from '@mui/system';
import React from 'react';
import { useHistory } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import s from './Header.module.scss';
import ProfileButton from './Header/ProfileButton';
import { AUTHORIZED_EMAILS } from '../helpers/constants';
import AuthedUsersButton from './Header/AuthedUsersButton'
const Header = () => {
    const history = useHistory();
    const { currUser } = useAuth()

    return (
        <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static" className={s.toolbarWrap}>
            <h2 onClick={() => history.push("/")}>Arabic Tools</h2>
          <Toolbar className={s.toolbar}>
            <Button sx={{color: "white"}} onClick={() => history.push("/home/verbpractice")}>Verb Practice</Button>
            <Button sx={{color: "white"}} onClick={() => history.push("/home/sentencepractice")}>Sentence Practice</Button>
            {
                currUser && (
                    <ProfileButton/>
                )
            }
            {
                currUser && AUTHORIZED_EMAILS.includes(currUser.email) && (
                    <AuthedUsersButton/>
                )
            }
          </Toolbar>
        </AppBar>
      </Box>
    );
};

export default Header;