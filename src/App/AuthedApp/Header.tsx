import { AppBar, Button, Toolbar } from "@mui/material";
import { Box } from "@mui/system";
import { BROWSER_HISTORY } from "src/helpers/constants";
import { useAuth } from "../../contexts/AuthContext";
import AuthedUsersButton from "./Header/AuthedUsersButton";
import ProfileButton from "./Header/ProfileButton";
import SentencesButton from "./Header/SentencesButton";
import s from "./Header.module.scss";

const Header = () => {
    const { currUser, isAdminUser } = useAuth();

    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static" classes={{ root: s.toolbarWrap }}>
                <h2 onClick={() => BROWSER_HISTORY.push("/home")}>
                    Arabic Tools
                </h2>
                <Toolbar className={s.toolbar}>
                    {currUser && isAdminUser && <AuthedUsersButton />}
                    <Button
                        onClick={() => BROWSER_HISTORY.push("/home/dictionary")}
                    >
                        Dictionary
                    </Button>
                    <Button
                        onClick={() =>
                            BROWSER_HISTORY.push("/home/verbpractice")
                        }
                    >
                        Verb Practice
                    </Button>
                    <SentencesButton />
                    {currUser && <ProfileButton />}
                </Toolbar>
            </AppBar>
        </Box>
    );
};

export default Header;
