
import { CircularProgress, CssBaseline } from "@mui/material";
import { Route, Switch, Redirect } from "react-router-dom";
import { useAuth } from './contexts/AuthContext'
import s from './App.module.scss'
import Header from "./components/Header";
import SignupPage from "./components/SignupPage";
import PrivateRoute from './components/reusable/PrivateRoute'
import LoginPage from './components/LoginPage';
import AuthedApp from './AuthedApp';
import { useEffect, useState } from "react";
function App() {
    const { currUser, userCheckLoading } = useAuth();
    const [authed, setAuthed] = useState(false);
    useEffect(() => {
        if (currUser) {
            setAuthed(true);
        } else {
            setAuthed(false);
        }
    }, [currUser])
    return (
        <div>
            <CssBaseline/>
            <Header/>
            <div className={s.wrap}>
            {
                userCheckLoading ? (
                    <CircularProgress/>
                ) : (
                    <Switch>
                        <Route exact path="/" render={() => authed ? <Redirect to="/home"/> : <Redirect to="/login"/>}/>
                        <Route exact path="/signup" component={SignupPage}/>
                        <Route exact path="/login" component={LoginPage}/>
                        <PrivateRoute path="/home" authed={authed} component={AuthedApp}/>
                    </Switch>
                )
            }
            </div>
        </div>
    );
}

export default App;
