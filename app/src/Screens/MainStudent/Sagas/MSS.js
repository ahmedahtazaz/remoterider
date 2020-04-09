import { LOAD_PHOTO, LOAD_PHOTO_SUCCESS, LOAD_PHOTO_FAILURE, LOAD_SLIDING_IMAGES, LOAD_SLIDING_IMAGES_SUCCESS, LOAD_SLIDING_IMAGES_FAILURE, LOAD_RESERVATIONS_SUCCESS, LOAD_RESERVATIONS_FAILURE, LOAD_RESERVATIONS} from "../../../Commons/Constants";
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

function* loadPhoto(action) {

    let photo = undefined;

    var currentUser = auth().currentUser;

    yield storage().ref(currentUser.uid+'.png').getDownloadURL().then((url) => {photo = url}).catch((err) => {console.log(err)});

    if(photo)
    {
        yield put({type: LOAD_PHOTO_SUCCESS, photo: photo});
    }
    else
        yield put({type: LOAD_PHOTO_FAILURE});
}

function* loadReservations(action) {

    let reservations = yield* loadReservationsInner();

    if(reservations)
    {
        yield put({type: LOAD_RESERVATIONS_SUCCESS, reservations: reservations});
    }
    else
        yield put({type: LOAD_RESERVATIONS_FAILURE});
}

function* loadReservationsInner() {

    let data = undefined;
    let reservations = undefined;

    var currentUser = auth().currentUser;

    yield firestore().collection('Reservations').doc(currentUser.uid).get().
    then((doc) => {data = JSON.parse(doc.data().Reservations)}).catch((err) => {console.log(err)});

    if(data)
    {
        reservations = data.map( (s) => {return s});

        if(reservations)
        {
            let photos = [];

            for(let i = 0; i < reservations.length; i++)
            {
                yield storage().ref(reservations[i].uuid+'.png').getDownloadURL().then((url) => {photos[i] = url}).catch((err) => {photos[i] = undefined, console.log(err)});
            }

            reservations.photos = photos;
        }
    }

    return reservations;
}

export default function* loadDataActionWatcher() {
    yield takeLatest(`${LOAD_SLIDING_IMAGES}`, loadSlidingImages);
    yield takeLatest(`${LOAD_PHOTO}`, loadPhoto);
    yield takeLatest(`${LOAD_RESERVATIONS}`, loadReservations);
}
