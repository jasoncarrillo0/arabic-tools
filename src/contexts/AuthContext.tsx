import { createUserWithEmailAndPassword, signInWithEmailAndPassword, User } from 'firebase/auth';
import React, { useState, useEffect, useContext, createContext, ReactNode, Dispatch, SetStateAction } from 'react'
import { auth } from '../firebase/firebase';
import { useSnackbar } from 'notistack'
import { ERR_SNACKBAR } from '../helpers/constants'

type AuthData = {
    currUser: User | null
    isAdminUser: boolean
    userCheckLoading: boolean
    setAuthed: Dispatch<SetStateAction<boolean>>
    signup: (email: string, pass: string) => Promise<void>
    login: (email: string, pass: string) => Promise<void>
    logout: () => Promise<void>
    authed: boolean
}
const AuthContext = createContext<AuthData>({
    currUser: null,
    isAdminUser: false,
    userCheckLoading: false,
    signup: async () => {},
    login: async () => {},
    logout: async () => {},
    setAuthed: () => false,
    authed: false
});


export function useAuth() {
    return useContext(AuthContext);
}


export default function AuthProvider({ children }: { children: ReactNode[] | ReactNode}) {
    
    const [currUser, setCurrUser]                 = useState<User | null>(null);
    const [userCheckLoading, setUserCheckLoading] = useState(true);
    const [isAdminUser, setIsAdminUser]           = useState(false);
    const [authed, setAuthed]                     = useState(false);

    const { enqueueSnackbar } = useSnackbar();
    async function signup(email: string, pass: string) {
        await createUserWithEmailAndPassword(auth, email, pass);
    }

    async function login(email: string, pass: string) {
        await signInWithEmailAndPassword(auth, email, pass);
    }

    async function logout() {
        await auth.signOut();
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
                const { claims } = await currUser!.getIdTokenResult();
                if (claims.admin) {
                    setIsAdminUser(true); 
                } else {
                    setIsAdminUser(false);
                }
                setAuthed(true);
            } catch (e) {
                enqueueSnackbar("Error getting user auth permissions.", ERR_SNACKBAR)
            }
        }
        if (currUser) {
            checkUserAdmin();
        } else {
            setAuthed(false);
        }
    }, [currUser])

    const providerValue: AuthData = { 
        currUser,
        isAdminUser,
        signup, 
        login, 
        logout,
        authed,
        setAuthed,
        userCheckLoading 
    }
    return (
        <AuthContext.Provider value={providerValue}>
            {children}
        </AuthContext.Provider>
    )
    
}

