import {all} from 'redux-saga/effects';
import signInActionWatcher from '../Screens/Splash/Sagas/SignInS';
import signUpActionWatcher from './SignUpSaga';
import loadDataActionWatcher from '../Screens/MainStudent/Sagas/MSS';
import fingerPrintActionWatcher from './FingerPrint/FingerPrintSaga';

export default function* rootSaga() {
  yield all([ 
    signInActionWatcher(),
    signUpActionWatcher(),
    loadDataActionWatcher(),
    fingerPrintActionWatcher(),
  ]);
}
