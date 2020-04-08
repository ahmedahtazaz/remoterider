import { SIGN_IN_USER, SIGN_IN_FAILURE, SIGN_IN_SUCCESS } from "../../../Commons/Constants";
import {put, takeLatest} from 'redux-saga/effects';
import auth from '@react-native-firebase/auth';

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

export default function* signInActionWatcher() {
    yield takeLatest(`${SIGN_IN_USER}`, signInUser);
}
