import { createUserWithEmailAndPassword } from 'firebase/auth';
import React, { useState, useEffect, useContext } from 'react'
import { auth } from '../firebase/firebase';


const AuthContext = React.createContext();


export function useAuth() {
    return useContext(AuthContext);
}


export default function AuthProvider({ children }) {
    
    const [currUser, setCurrUser] = useState(null);

    function signup(email, pass) {
        return createUserWithEmailAndPassword(email, pass);
    }

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((user) => {
            setCurrUser(user);
        });
        return unsubscribe
    }, [])

    const providerValue = { currUser, signup }
    return (
        <AuthContext.Provider value={providerValue}>
            {children}
        </AuthContext.Provider>
    )
    
}