import { Route, Switch } from "react-router-dom";
import VerbsArea from "./components/verbs/VerbsArea";
import UploadPage from "./components/UploadPage";
import CreateSentencePage from "./components/CreateSentencesPage";
import HomePage from "./components/HomePage";
import ProfileInfo from "./components/ProfileInfo";
import PrivateRoute from './components/reusable/PrivateRoute'
import { useAuth } from "./contexts/AuthContext";
import { AUTHORIZED_EMAILS, DICT_FIREBASE_ID, ERR_SNACKBAR, UPLOAD_WORDS } from "./helpers/constants";
import { useEffect } from "react";
import { doc, getDocFromServer, query, collection, getDocsFromServer } from "firebase/firestore";
import { db } from "./firebase/firebase";
import { useSnackbar } from "notistack";
function AuthedApp() {
    const { currUser } = useAuth();
    const authed       = AUTHORIZED_EMAILS.includes(currUser.email);
    const { enqueueSnackbar } = useSnackbar();
    useEffect(() => {
        async function loadDictionary() {
            try {
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
                console.log(dict);
            } catch (e) {
                console.log(e);
                enqueueSnackbar(e.message, ERR_SNACKBAR)
            }
        }
        loadDictionary();
    }, [])
    return (
        <Switch>
            <Route exact path="/home" component={HomePage}/>
            <Route exact path="/home/verbpractice" component={VerbsArea}/>
            <PrivateRoute exact path="/home/upload" component={UploadPage} authed={authed}/>
            <PrivateRoute exact path="/home/create" component={CreateSentencePage} authed={authed}/>
            <Route exact path="/home/profile" component={ProfileInfo}/>
        </Switch>
    );
}

export default AuthedApp;
