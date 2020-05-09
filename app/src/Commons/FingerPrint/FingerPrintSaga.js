import {put, takeLatest} from 'redux-saga/effects';
import { CHECK_FINGERPRINT_ENROLLED, CHECK_FINGERPRINT_ENROLLED_SUCCESS, CHECK_FINGERPRINT_ENROLLED_FAILURE, SETUP_FINGERPRINT_ENROLLMENT, SETUP_FINGERPRINT_ENROLLMENT_SUCCESS, SETUP_FINGERPRINT_ENROLLMENT_FAILURE, DONT_SHOW_FINGERPRINT } from '../Constants';
import {checkBiometricSupportednEnrolled} from './biometricService';
import{Alert, Platform, Linking} from 'react-native';
import AndroidOpenSettings  from 'react-native-android-open-settings';
import {setCredentials, getCredentials} from './keychainService';

function* setFingerPrint(action) {

    let isFingerPrintSupported = yield* setFingerPrintInner(action.username, action.password);
    
    if(isFingerPrintSupported === true)
        yield put({type: SETUP_FINGERPRINT_ENROLLMENT_SUCCESS});
    else
    {
        yield put({type: SETUP_FINGERPRINT_ENROLLMENT_FAILURE});
    }
}

function* setFingerPrintInner(username, password) {

    let isFingerPrintSupported = yield checkBiometricSupportednEnrolled();

    if (isFingerPrintSupported === true) {

        let status = yield setCredentials(username, JSON.stringify({password}));

        return status;
    } 
    else if(isFingerPrintSupported !== false)
    {
        Alert.alert(
        "Alert",
        isFingerPrintSupported,
        [{
            text: 'Ok', onPress: () => {

            Platform.OS === "ios"
                ? Linking.openURL('app-settings:')
                : AndroidOpenSettings.securitySettings()
            }
        },
        {
            text: 'Cancel', onPress: () => {}
        }]);

        return false;
    }
}

function* checkFingerPrint() {

    let available = false;

    let isFingerPrintSupported = yield checkBiometricSupportednEnrolled();

    if(isFingerPrintSupported === true)
    {
        let credentials = yield getCredentials();

        if(credentials && credentials.username)
            available = true;
    }
    
    
    if(available)
        yield put({type: CHECK_FINGERPRINT_ENROLLED_SUCCESS});
    else
    {
        if(isFingerPrintSupported === false)
        {
            yield put({type: DONT_SHOW_FINGERPRINT});
        }
        else
            yield put({type: CHECK_FINGERPRINT_ENROLLED_FAILURE});
    }
}

export default function* fingerPrintActionWatcher() {
    yield takeLatest(`${SETUP_FINGERPRINT_ENROLLMENT}`, setFingerPrint);
    yield takeLatest(`${CHECK_FINGERPRINT_ENROLLED}`, checkFingerPrint);
}