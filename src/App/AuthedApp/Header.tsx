import { AppBar, Toolbar } from "@mui/material";
import { Box } from "@mui/system";
import { useAuth } from "../../contexts/AuthContext";
import AuthedUsersButton from "./Header/AuthedUsersButton";
import ProfileButton from "./Header/ProfileButton";
import SentencesButton from "./Header/SentencesButton";
import s from "./Header.module.scss";
import VerbPracticeButton from "./Header/VerbPracticeButton";
import DictionaryButton from "./Header/DictionaryButton";
import SiteTitle from "./Header/SiteTitle";
import MobileMenu from "./Header/MobileMenu";

type Props = {
    loading: boolean
}

const Header = ({ loading } : Props) => {
    const { currUser, isAdminUser } = useAuth();
    const authed = !!currUser && isAdminUser === true;
    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static" classes={{ root: s.toolbarWrap }}>
                <SiteTitle/>
                {
                    window.innerWidth > 430 ? (
                        <Toolbar className={ authed ? s.adminToolbar : s.toolbar}>
                            {authed && <AuthedUsersButton stateLoading={loading} />}
                            <DictionaryButton loading={loading} />
                            <VerbPracticeButton loading={loading} />
                            <SentencesButton stateLoading={loading}/>
                            {currUser && <ProfileButton />}
                        </Toolbar>
                    ) : (
                        <MobileMenu stateLoading={loading}/>
                    )
                }
                
            </AppBar>
        </Box>
    );
};

export default Header;
