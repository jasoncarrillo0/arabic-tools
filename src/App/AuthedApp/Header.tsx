import { AppBar, Button, Toolbar } from "@mui/material";
import { Box } from "@mui/system";
import { BROWSER_HISTORY } from "src/helpers/constants";
import { useAuth } from "../../contexts/AuthContext";
import AuthedUsersButton from "./Header/AuthedUsersButton";
import ProfileButton from "./Header/ProfileButton";
import SentencesButton from "./Header/SentencesButton";
import s from "./Header.module.scss";
import { LoadingButton } from "@mui/lab";

type Props = {
    loading: boolean
}

const Header = ({ loading } : Props) => {
    const { currUser, isAdminUser } = useAuth();
    const authed = !!currUser && isAdminUser === true;
    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static" classes={{ root: s.toolbarWrap }}>
                <h2 onClick={() => BROWSER_HISTORY.push("/home")}>
                    Arabic Tools
                </h2>
                <Toolbar className={ authed ? s.adminToolbar : s.toolbar}>
                    {authed && <AuthedUsersButton stateLoading={loading} />}
                    <LoadingButton
                        onClick={() => BROWSER_HISTORY.push("/home/dictionary")}
                        loading={loading}
                    >
                        Dictionary
                    </LoadingButton>
                    <LoadingButton
                        loading={loading}
                        onClick={() =>
                            BROWSER_HISTORY.push("/home/verbpractice")
                        }
                    >
                        Verb Practice
                    </LoadingButton>
                    <SentencesButton stateLoading={loading}/>
                    {currUser && <ProfileButton />}
                </Toolbar>
            </AppBar>
        </Box>
    );
};

export default Header;
