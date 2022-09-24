import { CircularProgress } from "@mui/material";
import { useSnackbar } from "notistack";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Navigate, Route, Routes } from "react-router";
import { useAuth } from "src/contexts/AuthContext";
import { ERR_SNACKBAR } from "src/helpers/constants";
import { getAllSentences, getDictionary } from "src/helpers/utils";
import { setDictionary } from "src/redux/dictionary/dictActionCreators";
import { setAllSentences } from "src/redux/sentence/sentenceActionCreators";
import CreateLevelOneSentencePage from "./AuthedApp/admin-only-pages/CreateLevelOneSentencePage";
import UploadPage from "./AuthedApp/admin-only-pages/UploadPage";
import DictionaryPage from "./AuthedApp/pages/DictionaryPage";
import HomePage from "./AuthedApp/pages/HomePage";
import ProfilePage from "./AuthedApp/admin-only-pages/ProfilePage";
import VerbsArea from "./AuthedApp/verbs/VerbsArea";
import SentenceArea from "./AuthedApp/pages/SentencePage/SentenceArea";
import Header from "./AuthedApp/Header";


const AuthedApp = () => {

    const { isAdminUser, authed, currUser }       = useAuth();
    const { enqueueSnackbar }   = useSnackbar();
    const [loading, setLoading] = useState(false);
    const dispatch              = useDispatch();
    useEffect(() => {
        async function loadData() {
            setLoading(true);
            try {
                // -------------- load dictionary -----------------
                const dictionary = await getDictionary();
                dispatch(setDictionary(dictionary))


                // -------------- load sentences -----------------
                const sentences = await getAllSentences();
                dispatch(setAllSentences(sentences));
            } catch (e: any) {
                console.log(e);
                enqueueSnackbar(e.message, ERR_SNACKBAR)
            }
            setLoading(false);
        }
        if (authed && currUser) {
            loadData();
        }
        return () => {
            setLoading(false);
        }
    }, []);
    return (
        <div>
            <Header/>
            <div style={{margin: "2rem"}}>
                <Routes>
                    <Route path="/home" element={<HomePage/>}/>
                    <Route path="/home/dictionary" element={<DictionaryPage/>}/>
                    <Route path="/home/verbpractice" element={<VerbsArea/>}/>
                    <Route path="/home/sentences" element={<SentenceArea/>}/>
                    <Route path="/home/sentences/practice" element={<div>Nothing here yet...</div>}/>
                    <Route 
                        path="/home/dictionary/edit" 
                        element={ 
                            isAdminUser ? (
                                <DictionaryPage/>
                            ) : (
                                <Navigate to="/login" replace/>
                            )
                        }
                    />
                        

                    <Route 
                        path="/home/upload" 
                        element={ 
                            isAdminUser ? (
                                <UploadPage/>
                            ) : (
                                <Navigate to="/login" replace/>
                            )
                        }
                    />


                    <Route 
                        path="/home/sentences/edit/levelone" 
                        element={ 
                            isAdminUser ? (
                                <CreateLevelOneSentencePage/>
                            ) : (
                                <Navigate to="/login" replace/>
                            )
                        }
                    />

                    <Route 
                        path="/home/sentences/edit/leveltwo" 
                        element={ 
                            isAdminUser ? (
                                <div>Level Two coming soon...</div>
                            ) : (
                                <Navigate to="/login" replace/>
                            )
                        }
                    />
                    <Route path="/home/profile" element={<ProfilePage/>}/>
                </Routes>
            </div>
        </div>
    );
}



export default AuthedApp;
