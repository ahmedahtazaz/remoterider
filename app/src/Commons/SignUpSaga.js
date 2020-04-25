import { SIGN_UP_USER, SIGN_UP_FAILURE, SIGN_UP_SUCCESS, LOAD_TC_TEXT, LOAD_TC_TEXT_SUCCESS, LOAD_TC_TEXT_FAILURE } from "./Constants";
import {put, takeLatest} from 'redux-saga/effects';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';

function* signUpUser(action) {

    let response = yield* signUpInner(action); 

    if(response.success)
        yield put({type: SIGN_UP_SUCCESS});
    else
    {
        yield put({type: SIGN_UP_FAILURE, errorMessage: response.errMessage});
    }
}

function* signUpInner(action)
{
    let success = false;
    let error = undefined;

    yield auth().createUserWithEmailAndPassword(
        action.user.email, 
        action.user.password).then(() => {
            success = true;
        }).catch((err) => {success = false, error = err.message});

    if(success) 
    {
        var currentUser = auth().currentUser;

        if(action.user.isInstructor)
        {
            let defaultcredits = 0;

            yield firestore().collection('DefaultLessonCredits').doc('DefaultLessonCredits').get().then(
                (doc) => {
                    if(doc && doc.data())
                    {
                        defaultcredits = doc.data().DefaultLessonCredits;
                    }
                }
            ).catch();

            yield firestore().collection('Users').doc(currentUser.uid).set({
                name: action.user.name,
                profile: action.user.profile,
                isInstructor: true,
                uuid: currentUser.uid,
                lessonCredit: defaultcredits,
                email: action.user.email,
                }).then(success = true).catch((err) => {success = false, error = err.message});
        }
        else{
            yield firestore().collection('Users').doc(currentUser.uid).set({
                name: action.user.name,
                isInstructor: false,
                uuid: currentUser.uid,
                email: action.user.email,
                }).then(success = true).catch((err) => {success = false, error = err.message});
        }

        if(success && action.user && action.user.image && action.user.image.path)
        {
            yield storage().ref(currentUser.uid+'.png').putFile(action.user.image.path).then(success = true).catch((err) => {success = false, error = err.message});
        }
    }   

    return {success: success, errMessage: error};
}

function* loadTCText(action)
{
    let tcText = undefined;

            yield firestore().collection('TermsAndConditions').doc('TermsAndConditions').get().then(
                (doc) => {
                    if(doc && doc.data())
                    {
                        tcText = doc.data().TermsAndConditions;
                    }
                }
            ).catch();

    if(tcText)
        yield put({type: LOAD_TC_TEXT_SUCCESS, tcText: tcText});
    else
    {
        yield put({type: LOAD_TC_TEXT_FAILURE});
    }
}

export default function* signUpActionWatcher() {
    yield takeLatest(`${SIGN_UP_USER}`, signUpUser);
    yield takeLatest(`${LOAD_TC_TEXT}`, loadTCText);
}
