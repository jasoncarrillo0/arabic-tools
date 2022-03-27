import { AppBar, Button, Toolbar } from '@mui/material';
import { Box } from '@mui/system';
import React from 'react';
import { useHistory } from 'react-router-dom';
import s from './Header.module.scss';
const Header = () => {
    const history = useHistory();

    return (
        <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static" className={s.toolbarWrap}>
            <h2 onClick={() => history.push("/")}>Arabic Tools</h2>
          <Toolbar className={s.toolbar}>
            <Button sx={{color: "white"}} onClick={() => history.push("/create")}>Create</Button>
            <Button sx={{color: "white"}} onClick={() => history.push("/verbpractice")}>Verb Practice</Button>
            <Button sx={{color: "white"}} onClick={() => history.push("/createsentence")}>Create Sentences</Button>
            <Button sx={{color: "white"}} onClick={() => history.push("/longsentence")}>Longer Sentences</Button>
          </Toolbar>
        </AppBar>
      </Box>
    );
};

export default Header;