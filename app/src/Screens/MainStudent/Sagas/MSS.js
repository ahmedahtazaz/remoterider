import { LOAD_DATA, LOAD_DATA_SUCCESS, LOAD_DATA_FAILURE, LOAD_SLIDING_IMAGES, LOAD_SLIDING_IMAGES_SUCCESS, LOAD_SLIDING_IMAGES_FAILURE } from "../../../Commons/Constants";
import {put, takeLatest} from 'redux-saga/effects';
import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';
import auth from '@react-native-firebase/auth';

function* loadSlidingImages(action) {

    let success = false;
    let data = undefined;
    let images = [];

    yield firestore().collection('SlidingImages').doc('Images').get().
    then((doc) => {success = true, data = JSON.parse(doc.data().Urls)}).catch((err) => {console.log(err)});

    if(success)
    {
        images = data.map( (s) => {return {url: s.url};});
        yield put({type: LOAD_SLIDING_IMAGES_SUCCESS, slidingImages: images});
    }
    else
        yield put({type: LOAD_SLIDING_IMAGES_FAILURE});
}

function* loadData(action) {

    let reservations = undefined;
    let categories = undefined;

    var currentUser = auth().currentUser;

    yield storage().ref(currentUser.uid+'.png').getDownloadURL().then((url) => {photo = url}).catch((err) => {console.log(err)});

    if(photo)
    {
        yield put({type: LOAD_DATA_SUCCESS, photo: photo});
    }
    else
        yield put({type: LOAD_DATA_FAILURE});
}

export default function* loadDataActionWatcher() {
    yield takeLatest(`${LOAD_SLIDING_IMAGES}`, loadSlidingImages);
    yield takeLatest(`${LOAD_DATA}`, loadData);
}
