import { Paper, TextField } from '@mui/material';
import { LoadingButton } from '@mui/lab'
import React, { useEffect, useState } from 'react';
import s from './LoginPage.module.scss';
import { useSnackbar } from 'notistack'
import { BROWSER_HISTORY, ERR_SNACKBAR } from '../helpers/constants'
import { Link } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'


const LoginPage = () => {
    const [email, setEmail]     = useState("");
    const [pass, setPass]       = useState("");
    const [loading, setLoading] = useState(false);
    const { enqueueSnackbar }   = useSnackbar();
    const { login }             = useAuth();

    useEffect(() => {
        return () => {
            setLoading(false);
        }
    }, [])

    async function handleClick() {
        setLoading(true);
        try {
            await login(email, pass);
            setLoading(false);
            BROWSER_HISTORY.push("/home");
        } catch (e: any) {
            let msg = e.message;
            if (msg.includes("Firebase: ")) {
                msg = msg.split("Firebase: ")[1];
                if (msg.includes("auth/")) {
                    msg = "Incorrect email or password."
                }
            }
            setLoading(false);
            enqueueSnackbar(msg, ERR_SNACKBAR);
        }
    }

    return (
        <Paper className={s.wrap}>
            <div className={s.innerWrap}>
                <section>
                    <h1>Login</h1>
                </section>

                <section>
                    <TextField
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        name="email"
                        label="email"
                        type="email"
                        required
                    />
                </section>


                <section>
                    <TextField
                        value={pass}
                        onChange={(e) => setPass(e.target.value)}
                        name="pass"
                        label="password"
                        type="password"
                        required
                    />
                </section>


                <section>
                    <LoadingButton loading={loading} onClick={handleClick} variant="contained" disabled={!email || !pass}>Log In</LoadingButton>
                </section>

                <div className={s.btmMsg}>
                    <div>Need an account?</div>
                    <Link to="/signup">Sign up here.</Link>
                </div>
            </div>
        </Paper>
    );
};

export default LoginPage;