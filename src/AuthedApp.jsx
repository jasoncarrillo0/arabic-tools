import { Route, Switch } from "react-router-dom";
import VerbsArea from "./components/verbs/VerbsArea";
import UploadPage from "./components/UploadPage";
import CreateSentencePage from "./components/CreateSentencesPage";
import HomePage from "./components/HomePage";

function AuthedApp() {
    return (
        <Switch>
            <Route exact path="/home" component={HomePage}/>
            <Route exact path="/home/verbpractice" component={VerbsArea}/>
            <Route exact path="/home/create" component={UploadPage}/>
            <Route exact path="/home/createsentence" component={CreateSentencePage}/>
        </Switch>
    );
}

export default AuthedApp;
