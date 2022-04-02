import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import React, { useState, useEffect, useContext } from 'react'
import { auth } from '../firebase/firebase';


const AuthContext = React.createContext();


export function useAuth() {
    return useContext(AuthContext);
}


export default function AuthProvider({ children }) {
    
    const [currUser, setCurrUser] = useState(null);
    const [userCheckLoading, setUserCheckLoading] = useState(true);

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
        const unsubscribe = auth.onAuthStateChanged((user) => {
            setCurrUser(user);
            setUserCheckLoading(false);
        });
        return unsubscribe
    }, [])

    const providerValue = { currUser, signup, login, logout, userCheckLoading }
    return (
        <AuthContext.Provider value={providerValue}>
            {children}
        </AuthContext.Provider>
    )
    
}