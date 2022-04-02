import { Route, Switch } from "react-router-dom";
import VerbsArea from "./components/verbs/VerbsArea";
import UploadPage from "./components/UploadPage";
import CreateSentencePage from "./components/CreateSentencesPage";
import HomePage from "./components/HomePage";
import ProfileInfo from "./components/ProfileInfo";

function AuthedApp() {
    return (
        <Switch>
            <Route exact path="/home" component={HomePage}/>
            <Route exact path="/home/verbpractice" component={VerbsArea}/>
            <Route exact path="/home/create" component={UploadPage}/>
            <Route exact path="/home/createsentence" component={CreateSentencePage}/>
            <Route exact path="/home/profile" component={ProfileInfo}/>
        </Switch>
    );
}

export default AuthedApp;
