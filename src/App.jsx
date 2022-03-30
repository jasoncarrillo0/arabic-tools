import { CssBaseline } from "@mui/material";
import { Route, Switch } from "react-router-dom";
import s from './App.module.scss'
import HomePage from "./components/HomePage";
import Header from "./components/Header";
import VerbsArea from "./components/verbs/VerbsArea";
import UploadPage from "./components/UploadPage";
import CreateSentencePage from "./components/CreateSentencesPage";
function App() {

    

    return (
        <div className={s.wrap}>
            <CssBaseline/>
            <Header/>
            <div style={{margin: '2rem'}}>
                <Switch>
                    <Route exact path="/" component={HomePage}/>
                    <Route exact path="/verbpractice" component={VerbsArea}/>
                    <Route exact path="/create" component={UploadPage}/>
                    <Route exact path="/createsentence" component={CreateSentencePage}/>
                </Switch>
            </div>
        </div>
    );
}

export default App;
