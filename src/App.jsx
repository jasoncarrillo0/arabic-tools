import { CssBaseline } from "@mui/material";
import { Route, Switch } from "react-router-dom";
import { useAuth } from './contexts/AuthContext'
import s from './App.module.scss'
import Header from "./components/Header";
import SignupPage from "./components/SignupPage";
import PrivateRoute from './components/reusable/PrivateRoute'
import AuthedApp from './AuthedApp';
function App() {
    const { currUser } = useAuth();
    return (
        <div className={s.wrap}>
            <CssBaseline/>
            <Header/>
            <div style={{margin: '2rem'}}>
                <Switch>
                    <Route exact path="/signup" component={SignupPage}/>
                    <PrivateRoute path="/home" authed={currUser ? true : false} component={AuthedApp}/> 
                </Switch>
            </div>
        </div>
    );
}

export default App;
