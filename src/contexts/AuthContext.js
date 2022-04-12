import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import React, { useState, useEffect, useContext } from 'react'
import { auth } from '../firebase/firebase';
import { useSnackbar } from 'notistack'
import { ERR_SNACKBAR } from '../helpers/constants'

const AuthContext = React.createContext();


export function useAuth() {
    return useContext(AuthContext);
}


export default function AuthProvider({ children }) {
    
    const [currUser, setCurrUser] = useState(null);
    const [userCheckLoading, setUserCheckLoading] = useState(true);
    const [isAdminUser, setIsAdminUser] = useState(false);
    const { enqueueSnackbar } = useSnackbar();
    function signup(email, pass) {
        return createUserWithEmailAndPassword(auth, email, pass);
    }

    function login(email, pass) {
        return signInWithEmailAndPassword(auth, email, pass);
    }

    function logout() {
        auth.signOut();
    }

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(async(user) => {
            setCurrUser(user);
            setUserCheckLoading(false);
        });
        return unsubscribe
    }, [])

    useEffect(() => {
        async function checkUserAdmin() {
            try {
                const { claims } = await currUser.getIdTokenResult();
                if (claims.admin) {
                    setIsAdminUser(true); 
                } else {
                    setIsAdminUser(false);
                }
            } catch (e) {
                enqueueSnackbar("Error getting user auth permissions.", ERR_SNACKBAR)
            }
        }
        if (currUser) {
            checkUserAdmin();
        }
    }, [currUser])

    const providerValue = { 
        currUser,
        isAdminUser,
        signup, 
        login, 
        logout, 
        userCheckLoading 
    }
    return (
        <AuthContext.Provider value={providerValue}>
            {children}
        </AuthContext.Provider>
    )
    
}