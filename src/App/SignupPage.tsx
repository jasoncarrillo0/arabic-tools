import { Paper, TextField } from '@mui/material';
import { LoadingButton } from '@mui/lab'
import React, { useEffect, useState } from 'react';
import { useSnackbar } from 'notistack'
import s from './SignupPage.module.scss';
import { BROWSER_HISTORY, ERR_SNACKBAR } from '../helpers/constants'
import { Link } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'



const SignupPage = () => {
    const [email, setEmail]               = useState("");
    const [pass, setPass]                 = useState("");
    const [confirmPass, setConfirmPass]   = useState("");
    const [loading, setLoading]           = useState(false);
    const { enqueueSnackbar }             = useSnackbar();
    const { signup }                      = useAuth()

    useEffect(() => {
        return () => {
            setLoading(false);
        }
    }, [])

    async function handleClick() {
        if (pass !== confirmPass) {
            return enqueueSnackbar("passwords must match", ERR_SNACKBAR);
        } else {
            setLoading(true);
            try {
                await signup(email, pass);
                setLoading(false);
                BROWSER_HISTORY.push("/home");
            } catch (e: any) {
                console.log(e);
                let msg = e.message;
                if (msg.includes("Firebase: ")) {
                    msg = msg.split("Firebase: ")[1];
                }
                setLoading(false);
                enqueueSnackbar(msg, ERR_SNACKBAR);
            }
        }
    }

    return (
        <Paper className={s.wrap}>
            <div className={s.innerWrap}>
                <section>
                    <h1>Signup For an Account</h1>
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
                    <TextField
                        value={confirmPass}
                        onChange={(e) => setConfirmPass(e.target.value)}
                        name="confirmPass"
                        label="confirm password"
                        type="password"
                        required
                    />
                </section>

                <section>
                    <LoadingButton loading={loading} onClick={handleClick} variant="contained" disabled={!email || !pass || !confirmPass}>Sign Up</LoadingButton>
                </section>

                <div className={s.btmMsg}>
                    <div>Already have an account?</div>
                    <Link to="/login">Login here.</Link>
                </div>
            </div>
        </Paper>
    );
};

export default SignupPage;