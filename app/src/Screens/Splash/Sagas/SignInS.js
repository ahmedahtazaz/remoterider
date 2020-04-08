import { SIGN_IN_USER, SIGN_IN_FAILURE, SIGN_IN_SUCCESS, CHECK_USER_TYPE, CHECK_USER_SUCCESS, CHECK_USER_FAILURE } from "../../../Commons/Constants";
import {put, takeLatest} from 'redux-saga/effects';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

function* signInUser(action) {

    let success = false;

    auth().signInWithEmailAndPassword(
        action.email, 
        action.password).then(() => {success = true}).catch((err) => {success = false, console.log(err)});

    if(success)
        yield put({type: SIGN_IN_SUCCESS});
    else
        yield put({type: SIGN_IN_FAILURE});
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

export default function* signInActionWatcher() {
    yield takeLatest(`${SIGN_IN_USER}`, signInUser);
    yield takeLatest(`${CHECK_USER_TYPE}`, checkUserType);
}
