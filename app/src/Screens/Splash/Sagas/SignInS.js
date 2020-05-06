import { LOGIN_VIA_FINGERPRINT, SIGN_IN_USER, SIGN_IN_FAILURE, SIGN_IN_SUCCESS, CHECK_USER_TYPE, CHECK_USER_SUCCESS, CHECK_USER_FAILURE, SIGN_OUT_USER, FORGOT_PASSWORD, FORGOT_PASSWORD_SUCCESS, FORGOT_PASSWORD_FAILURE, SET_CURRENT_STATE, RESEND_EMAIL_VERIFICATION_MAIL, RESEND_EMAIL_VERIFICATION_MAIL_SUCCESS, RESEND_EMAIL_VERIFICATION_MAIL_FAILURE } from "../../../Commons/Constants";
import {put, takeLatest} from 'redux-saga/effects';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import {getCredentials} from '../../../Commons/FingerPrint/keychainService';
import{Platform} from 'react-native';
import TouchID from 'react-native-touch-id';

function* signInUser(action) {

    let success = false;
    let error = undefined;

    yield auth().signInWithEmailAndPassword(
        action.email, 
        action.password).then(() => {success = true}).catch((err) => {
            success = false;
            error = err.message;

            if(error && error.toString().includes('user-not-found')) 
                error = "That email address is not registered with Remote Rider. Please use our SignUp page to register your email"
            else if(error && error.toString().includes('invalid-email')) 
                error = "Please enter a valid email address"
            else if(error && error.toString().includes('wrong-password')) 
            error = "The email address or password that you entered are incorrect"

        });

    if(success)
        yield put({type: SIGN_IN_SUCCESS});
    else
        yield put({type: SIGN_IN_FAILURE, errMessage: error});
}

function* checkUserType(action) {

    let success = false;
    let isInstructor = false;

    var currentUser = auth().currentUser;

    yield firestore().collection('Users').doc(currentUser.uid).get().
    then((doc) => {success = true, isInstructor = doc.data().isInstructor}).catch((err) => {console.log(err)});

    if(success)
        yield put({type: CHECK_USER_SUCCESS, isInstructor: isInstructor, isStudent: !isInstructor});
    else
        yield put({type: CHECK_USER_FAILURE});
}

function* signOutUser(action) {

    let success = false;

    yield auth()
    .signOut()
    .then(() => success = true).catch((err) => console.log(err));

    if(success)
        yield put({type: SIGN_IN_FAILURE});
    else
        yield put({type: SIGN_IN_FAILURE});
}

function* forgotPassword(action) {

    let success = false;
    let message = undefined;

    yield auth().sendPasswordResetEmail(action.email).then(() => {success = true, message = 'Please check your Email. Follow the link sent in the email to Reset your Password'}).catch((err) => {success = false, message = err.message});
    
    if(success)
        yield put({type: FORGOT_PASSWORD_SUCCESS, forGotPasswordResponse: message});
    else
        yield put({type: FORGOT_PASSWORD_FAILURE, forGotPasswordResponse: message});
}

function* resendVerificationMail(action) {

    let success = false;
    let message = undefined;

    var currentUser = auth().currentUser;

    yield currentUser.sendEmailVerification().then(success = true).catch((err) => {console.log(err)});
    
    if(success)
        yield put({type: RESEND_EMAIL_VERIFICATION_MAIL_SUCCESS, message: message});
    else
        yield put({type: RESEND_EMAIL_VERIFICATION_MAIL_FAILURE, message: message});
}

function* signInUserFingerPrint() {

    let error = 'FingerPrint authentication Failed';

    let success = yield* signInUserFingerPrintInner();

    if(success)
        yield put({type: SIGN_IN_SUCCESS});
    else
        yield put({type: SIGN_IN_FAILURE, errMessage: error});
}

function* signInUserFingerPrintInner() {

    let success = false;
    let error = undefined;
    let isauth = false;

    let fingerprintLableForOS = Platform.OS == "ios" ? "Touch ID" : "Fingerprint";

    yield TouchID.authenticate('Sign In to Remote Rider using ' + fingerprintLableForOS)
    .then(reponse => {
        isauth = true;
    })
    .catch(error => {
        console.log('Authentication Failed', error.code);
    });

    if(isauth === true)
    {
        let credentials = yield getCredentials();

        if(credentials && credentials.username)
        {
            let savedPassword = JSON.parse(credentials.password);

            yield auth().signInWithEmailAndPassword(
                credentials.username, 
                savedPassword.password).then(() => {success = true}).catch((err) => {
                    success = false;
                    error = err.message;
        
                    if(error && error.toString().includes('user-not-found')) 
                        error = "That email address is not registered with Remote Rider. Please use our SignUp page to register your email"
                    else if(error && error.toString().includes('invalid-email')) 
                        error = "Please enter a valid email address"
                    else if(error && error.toString().includes('wrong-password')) 
                    error = "The email address or password that you entered are incorrect"
                });
        }
    }

    return success;
}

export default function* signInActionWatcher() {
    yield takeLatest(`${SIGN_IN_USER}`, signInUser);
    yield takeLatest(`${CHECK_USER_TYPE}`, checkUserType);
    yield takeLatest(`${SIGN_OUT_USER}`, signOutUser);
    yield takeLatest(`${FORGOT_PASSWORD}`, forgotPassword);
    yield takeLatest(`${RESEND_EMAIL_VERIFICATION_MAIL}`, resendVerificationMail);
    yield takeLatest(`${LOGIN_VIA_FINGERPRINT}`, signInUserFingerPrint);
}
