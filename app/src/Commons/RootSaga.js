import {all} from 'redux-saga/effects';
import signInActionWatcher from '../Screens/Splash/Sagas/SignInS';
import signUpActionWatcher from './SignUpSaga';

export default function* rootSaga() {
  yield all([ 
    signInActionWatcher(),
    signUpActionWatcher(),
  ]);
}
