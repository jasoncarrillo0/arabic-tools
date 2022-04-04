import { Route, Switch } from "react-router-dom";
import VerbsArea from "./components/verbs/VerbsArea";
import UploadPage from "./components/UploadPage";
import CreateSentencePage from "./components/CreateSentencesPage";
import HomePage from "./components/HomePage";
import ProfileInfo from "./components/ProfileInfo";
import PrivateRoute from './components/reusable/PrivateRoute'
import { useAuth } from "./contexts/AuthContext";
import { AUTHORIZED_EMAILS } from "./helpers/constants";
function AuthedApp() {
    const { currUser } = useAuth();
    const authed       = AUTHORIZED_EMAILS.includes(currUser.email);
    return (
        <Switch>
            <Route exact path="/home" component={HomePage}/>
            <Route exact path="/home/verbpractice" component={VerbsArea}/>
            <PrivateRoute exact path="/home/upload" component={UploadPage} authed={authed}/>
            <PrivateRoute exact path="/home/create" component={CreateSentencePage} authed={authed}/>
            <Route exact path="/home/profile" component={ProfileInfo}/>
        </Switch>
    );
}

export default AuthedApp;
