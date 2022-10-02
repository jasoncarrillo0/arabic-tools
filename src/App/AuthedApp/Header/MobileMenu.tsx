import {
    Box,
    CircularProgress,
    Collapse,
    Drawer,
    IconButton,
    List,
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText,
} from "@mui/material";
import s from "./MobileMenu.module.scss";
import MenuIcon from "@mui/icons-material/Menu";
import { useState } from "react";
import BuildCircleIcon from "@mui/icons-material/BuildCircle";
import InfoIcon from '@mui/icons-material/Info';
import { BROWSER_HISTORY, ERR_SNACKBAR } from "src/helpers/constants";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import {
    ExpandLess,
    ExpandMore,
    Logout,
    LooksOne,
    LooksTwo,
} from "@mui/icons-material";
import ListIcon from '@mui/icons-material/List';
import LocalLibraryIcon from '@mui/icons-material/LocalLibrary';
import MenuBookIcon from "@mui/icons-material/MenuBook";
import PsychologyIcon from "@mui/icons-material/Psychology";
import UploadIcon from '@mui/icons-material/Upload';
import CreateIcon from '@mui/icons-material/Create';
import ChangeCircleIcon from '@mui/icons-material/ChangeCircle'
import { useAuth } from "src/contexts/AuthContext";
import { useSnackbar } from "notistack";

type Props = {
    stateLoading: boolean;
};

const MobileMenu = ({ stateLoading }: Props) => {
    const [open, setOpen]                   = useState(false);
    const [sentencesOpen, setSentencesOpen] = useState(false);
    const [adminOpen, setAdminOpen]         = useState(false);
    const [deepInnerOpen, setDeepInnerOpen] = useState(false);
    const [profileOpen, setProfileOpen]     = useState(false);
    const [logoutLoading, setLogoutLoading] = useState(false);
    const { enqueueSnackbar }               = useSnackbar();
    const { logout }                        = useAuth();


    function handleClose() {
        setOpen(false);
        setSentencesOpen(false);
        setAdminOpen(false);
        setDeepInnerOpen(false);
        setProfileOpen(false);
    }

    function handleToUpload() {
        handleClose();
        BROWSER_HISTORY.push('/home/upload')
    }

    function handleToEditDict() {
        handleClose();
        BROWSER_HISTORY.push('/home/dictionary/edit')
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
            handleClose();
            BROWSER_HISTORY.push(`/home/sentences/edit/${level}`);
        };
    }

    function toDictionary() {
        handleClose();
        BROWSER_HISTORY.push("/home/dictionary")
    }

    function toVerbPractice() {
        BROWSER_HISTORY.push("/home/verbpractice");
        handleClose();
    }


    function toProfile() {
        BROWSER_HISTORY.push('/home/profile');
        handleClose();
    }

    async function handleLogout() {
        handleClose();
        setLogoutLoading(true);
        try {
            await logout();
            setLogoutLoading(false);
            BROWSER_HISTORY.push('/login');
        } catch (e: any) {
            console.log(e);
            setLogoutLoading(false);
            enqueueSnackbar(e.message, ERR_SNACKBAR);
        }
    }

    return (
        <div className={s.wrap}>
            <div className={s.iconWrap}>
                <IconButton onClick={() => setOpen(true)}>
                    <MenuIcon className={s.icon} />
                </IconButton>
            </div>
            <Drawer
                ModalProps={{ keepMounted: true }}
                sx={{ zIndex: "9999" }}
                anchor="right"
                open={open}
                onClose={handleClose}
            >
                <Box
                    sx={{ width: "225px" }}
                    role="presentation"
                >
                    <List>
                        <ListItemButton onClick={toDictionary}>
                            <ListItemIcon>
                                <MenuBookIcon />
                            </ListItemIcon>
                            <ListItemText>Dictionary</ListItemText>
                        </ListItemButton>
                        <ListItemButton onClick={toVerbPractice}>
                            <ListItemIcon>
                                <PsychologyIcon />
                            </ListItemIcon>
                            <ListItemText>Verb Practice</ListItemText>
                        </ListItemButton>

                        {/* ------------------    sentence practice button ----------------------*/}
                        <ListItemButton
                            onClick={() => setSentencesOpen(!sentencesOpen)}
                        >
                            <ListItemIcon>
                                <LocalLibraryIcon />
                            </ListItemIcon>
                            <ListItemText>Sentence Practice</ListItemText>
                            {sentencesOpen ? <ExpandLess /> : <ExpandMore />}
                        </ListItemButton>
                        <Collapse in={sentencesOpen} timeout="auto" unmountOnExit>
                            <List component="div">


                                {/* --------    view all sentences ----------*/}
                                <ListItemButton
                                    sx={{ pl: 3 }}
                                    onClick={handleViewAll}
                                >
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
                                </ListItemButton>
                                
                                
                                {/* --------    sentence practice  ----------*/}
                                <ListItemButton
                                    sx={{ pl: 3 }}
                                    onClick={handlePractice}
                                >
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
                                </ListItemButton>
                            </List>
                        </Collapse>



                        {/* ------------------    admin actions button ----------------------*/}
                        <ListItemButton onClick={() => setAdminOpen(!adminOpen)}>
                            <ListItemIcon>
                                <BuildCircleIcon />
                            </ListItemIcon>
                            <ListItemText>Admin Actions</ListItemText>
                            {adminOpen ? <ExpandLess /> : <ExpandMore />}
                        </ListItemButton>

                        <Collapse in={adminOpen} timeout="auto" unmountOnExit>
                            <List component="div">

                                {/* --------    upload CSV files  ----------*/}
                                <ListItemButton onClick={handleToUpload} sx={{ pl: 3 }}>
                                    <ListItemIcon>
                                        <UploadIcon />
                                    </ListItemIcon>
                                    <ListItemText>
                                        Upload CSV files
                                    </ListItemText>
                                </ListItemButton>


                                {/* --------    edit dictionary ----------*/}
                                <ListItemButton
                                    disabled={stateLoading}
                                    onClick={handleToEditDict}
                                    sx={{ pl: 3 }}
                                >
                                    {stateLoading ? (
                                        <CircularProgress
                                            size="20px"
                                            sx={{ marginRight: "16px" }}
                                            color="primary"
                                        />
                                    ) : (
                                        <ListItemIcon>
                                            <ChangeCircleIcon />
                                        </ListItemIcon>
                                    )}
                                    <ListItemText>Edit Dictionary</ListItemText>
                                </ListItemButton>


                                {/* --------    add/edit sentences ----------*/}
                                <ListItemButton
                                    disabled={stateLoading}
                                    onClick={() => setDeepInnerOpen(!deepInnerOpen)}
                                    sx={{ pl: 3 }}
                                >
                                    {stateLoading ? (
                                        <CircularProgress
                                            size="20px"
                                            sx={{ marginRight: "16px" }}
                                            color="primary"
                                        />
                                    ) : (
                                        <ListItemIcon>
                                            <CreateIcon />
                                        </ListItemIcon>
                                    )}
                                    <ListItemText>
                                        Add/Edit Sentences
                                    </ListItemText>
                                    {deepInnerOpen ? (
                                        <ExpandLess />
                                    ) : (
                                        <ExpandMore />
                                    )}
                                </ListItemButton>
                                <Collapse in={deepInnerOpen} timeout="auto" unmountOnExit>
                                    <List component="div">
                                        <ListItemButton
                                            sx={{ pl: 6 }}
                                            onClick={toSentence("levelone")}
                                        >
                                            <ListItemIcon>
                                                <LooksOne />
                                            </ListItemIcon>
                                            <ListItemText primary="Level One" />
                                        </ListItemButton>
                                        <ListItemButton
                                            sx={{ pl: 6 }}
                                            onClick={toSentence("leveltwo")}
                                        >
                                            <ListItemIcon>
                                                <LooksTwo />
                                            </ListItemIcon>
                                            <ListItemText primary="Level Two" />
                                        </ListItemButton>
                                    </List>
                                </Collapse>
                            </List>
                        </Collapse>
                        



                        {/* ------------------    profile button ----------------------*/}
                        <ListItemButton onClick={() => setProfileOpen(!profileOpen)}>
                            <ListItemIcon>
                                <AccountCircleIcon />
                            </ListItemIcon>
                            <ListItemText>Profile</ListItemText>
                        </ListItemButton>
                        <Collapse in={profileOpen} timeout="auto" unmountOnExit>
                            <List component="div">
                                <ListItemButton
                                    sx={{ pl: 3 }}
                                    onClick={toProfile}
                                >
                                    <ListItemIcon>
                                        <InfoIcon/>
                                    </ListItemIcon>
                                    <ListItemText>Profile</ListItemText>
                                </ListItemButton>
                                <ListItemButton
                                    sx={{ pl: 3 }}
                                    onClick={handleLogout}
                                >
                                    <ListItemIcon>
                                        <Logout/>
                                    </ListItemIcon>
                                    <ListItemText>Logout</ListItemText>
                                </ListItemButton>
                            </List>
                        </Collapse>

                    </List>
                </Box>
            </Drawer>
        </div>
    );
};

export default MobileMenu;
