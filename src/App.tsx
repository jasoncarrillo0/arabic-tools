
import { CircularProgress, CssBaseline } from "@mui/material";
import { Route, Navigate, Routes } from "react-router"
import AuthedApp from "./App/AuthedApp";
import s from 'src/App.module.scss';
import PrivateRoute from "./App/reusable/PrivateRoute";
import SignupPage from "./App/SignupPage";
import LoginPage from "./App/LoginPage";
import { useAuth } from "./contexts/AuthContext";



function App() {
    const { currUser, authed, userCheckLoading } = useAuth();
    
    return (
        <div>
            <CssBaseline/>
            <div >
            {
                userCheckLoading ? (
                    <div className={s.circleWrap}>
                        <CircularProgress />
                    </div>
                ) : (
                    <Routes>
                        <Route
                            path="/*"
                            element={
                                authed ? (
                                    <PrivateRoute authed={authed}>
                                        <AuthedApp />
                                    </PrivateRoute>
                                ) : (
                                    <Navigate replace to="/login" />
                                )
                            }
                        />
                       
                        <Route 
                            path="signup" 
                            element={
                                authed ? (
                                <Navigate to="/home" replace />
                            ) : (
                                <SignupPage />
                            )}
                        />
                         <Route
                            path="login"
                            element={
                                authed ? (
                                    <Navigate to="/home" replace />
                                ) : (
                                    <LoginPage />
                                )
                            }
                        />
                    </Routes>
                )
            }
            </div>
        </div>
    );
}

export default App;