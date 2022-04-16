import { Route } from "react-router-dom";
import VerbsArea from "./components/verbs/VerbsArea";
import UploadPage from "./components/UploadPage";
import CreateSentencePage from "./components/CreateSentencesPage";
import HomePage from "./components/HomePage";
import ProfileInfo from "./components/ProfileInfo";
import PrivateRoute from './components/reusable/PrivateRoute'
import { useAuth } from "./contexts/AuthContext";
import { DICT_FIREBASE_ID, ERR_SNACKBAR, UPLOAD_WORDS, SENTENCE_COLLECTION_NAMES, SENTENCES_FIREBASE_ID } from "./helpers/constants";
import { useEffect, useState } from "react";
import { query, collection, getDocsFromServer } from "firebase/firestore";
import { db } from "./firebase/firebase";
import { useSnackbar } from "notistack";
import { setDictionary } from "./redux/dictionary/dictActionCreators";
import { connect } from "react-redux";
import { CircularProgress } from "@mui/material";
import LevelOneSentence from './components/CreateSentencePage/LevelOneSentence'
import LevelTwoSentence from './components/CreateSentencePage/LevelTwoSentence'
import { setAllSentences } from './redux/sentence/sentenceActions';


function AuthedApp({ setDictionary, setAllSentences }) {

    const { isAdminUser }       = useAuth();
    const { enqueueSnackbar }   = useSnackbar();
    const [loading, setLoading] = useState(false);


    useEffect(() => {
        async function loadData() {
            try {
                // -------------- load dictionary -----------------
                const dict = {};
                for (const collectionName of Object.keys(UPLOAD_WORDS)) {
                    const dbQuery  = query(collection(db, 'dictionary', DICT_FIREBASE_ID, collectionName));
                    const snapshot = await getDocsFromServer(dbQuery);
                    const wordDocs = [];

                    for (const document of snapshot.docs) {
                        wordDocs.push({id: document.id, ...document.data()})
                    }
                    dict[collectionName] = wordDocs;
                }
                setDictionary(dict);

                // -------------- load sentences -----------------
                const sentences = {};
                for (const sentenceColl of Object.values(SENTENCE_COLLECTION_NAMES)) {
                    const dbQuery  = query(collection(db, 'sentences', SENTENCES_FIREBASE_ID, sentenceColl));
                    const snapshot = await getDocsFromServer(dbQuery);
                    const sentenceDocs = [];
                    for (const document of snapshot.docs) {
                        sentenceDocs.push({id: document.id, ...document.data()});
                    }
                    sentences[sentenceColl] = sentenceDocs;
                }
                setAllSentences(sentences);
            } catch (e) {
                console.log(e);
                enqueueSnackbar(e.message, ERR_SNACKBAR)
            }
            setLoading(false);
        }
        
        loadData();
        return () => {
            setLoading(false);
        }
    }, []);
    return (
        <>
        {
            loading ? (
                <CircularProgress/>
            ) : (
                <>
                    <Route exact path="/home" component={HomePage}/>
                    <Route exact path="/home/verbpractice" component={VerbsArea}/>
                    <PrivateRoute exact path="/home/upload" component={UploadPage} authed={isAdminUser}/>
                    <PrivateRoute exact path="/home/create" component={CreateSentencePage} authed={isAdminUser}/>
                    <PrivateRoute exact path="/home/create/levelone" component={LevelOneSentence} authed={isAdminUser}/>
                    <PrivateRoute exact path="/home/create/leveltwo" component={LevelTwoSentence} authed={isAdminUser}/>
                    <Route exact path="/home/profile" component={ProfileInfo}/>
                </>
            )
        }
        </>
    );
}

const mapDispatchToProps = {
    setDictionary: (dictObj) => setDictionary(dictObj),
    setAllSentences: (all) => setAllSentences(all)
}

export default connect(null, mapDispatchToProps)(AuthedApp);
