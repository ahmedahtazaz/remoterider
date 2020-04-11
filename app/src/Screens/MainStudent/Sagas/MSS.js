import { LOAD_PHOTO, LOAD_PHOTO_SUCCESS, LOAD_PHOTO_FAILURE, LOAD_SLIDING_IMAGES, LOAD_SLIDING_IMAGES_SUCCESS, LOAD_SLIDING_IMAGES_FAILURE, LOAD_RESERVATIONS_SUCCESS, LOAD_RESERVATIONS_FAILURE, LOAD_RESERVATIONS, LOAD_CATEGORIES, LOAD_CATEGORIES_SUCCESS, LOAD_CATEGORIES_FAILURE, LOAD_SCHEDULED_LESSONS, LOAD_SCHEDULED_LESSONS_SUCCESS, LOAD_SCHEDULED_LESSONS_FAILURE, LOAD_PENDING_LESSONS_SUCCESS, LOAD_PENDING_LESSONS_FAILURE, LOAD_PENDING_LESSONS} from "../../../Commons/Constants";
import {put, takeLatest} from 'redux-saga/effects';
import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';
import auth from '@react-native-firebase/auth';

function* loadSlidingImages(action) {

    let data = undefined;
    let images = [];

    yield firestore().collection('SlidingImages').doc('Images').get().
    then((doc) => {
        if(doc.data()) 
            data = JSON.parse(doc.data().Urls)}).catch((err) => {console.log(err)});

    if(data)
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
    then((doc) => {
        if(doc.data())
            data = JSON.parse(doc.data().Reservations)}).catch((err) => {console.log(err)});

    if(data)
    {
        reservations = data.map( (s) => {if(s.confirmed) return s});

        if(reservations)
        {
            let photos = [];

            for(let i = 0; i < reservations.length; i++)
            {
                if(reservations[i])
                    yield storage().ref(reservations[i].uuid+'.png').getDownloadURL().then((url) => {photos[i] = url}).catch((err) => {photos[i] = undefined, console.log(err)});
                else
                {
                    reservations.splice(i, 1);
                    i--;
                }
            }

            reservations.photos = photos;
        }
    }

    return reservations;
}

function* loadCategories(action) {

    let categories = undefined;
    let data = undefined;


    yield firestore().collection('Categories').doc('Available').get().
    then((doc) => {
        if(doc.data())
            data = JSON.parse(doc.data().Categories)}).catch((err) => {console.log(err)});

    if(data)
    {
        categories = data.map( (s) => {return s});

        yield put({type: LOAD_CATEGORIES_SUCCESS, categories: categories});
    }
    else
        yield put({type: LOAD_CATEGORIES_FAILURE});
}

function* loadScheduledLessons(action) {

    let scheduled = yield* loadScheduledLessonsInner();

    if(scheduled)
    {
        yield put({type: LOAD_SCHEDULED_LESSONS_SUCCESS, scheduled: scheduled});
    }
    else
        yield put({type: LOAD_SCHEDULED_LESSONS_FAILURE});
}

function* loadScheduledLessonsInner() {

    let data = undefined;
    let reservations = undefined;

    var currentUser = auth().currentUser;

    yield firestore().collection('Reservations').doc(currentUser.uid).get().
    then((doc) => {
        if(doc.data())
            data = JSON.parse(doc.data().Reservations)}).catch((err) => {console.log(err)});

    if(data)
    {
        reservations = data.map( (s) => {if(s.confirmed) return s});

        if(reservations)
        {
            let photos = [];

            for(let i = 0; i < reservations.length; i++)
            {
                if(reservations[i])
                    yield storage().ref(reservations[i].uuid+'.png').getDownloadURL().then((url) => {photos[i] = url}).catch((err) => {photos[i] = undefined, console.log(err)});
                else
                {
                    reservations.splice(i, 1);
                    i--;
                }
            }

            reservations.photos = photos;
        }
    }

    return reservations;
}

function* loadPendingLessons(action) {

    let pending = yield* loadPendingLessonsInner();

    if(pending)
    {
        yield put({type: LOAD_PENDING_LESSONS_SUCCESS, pending: pending});
    }
    else
        yield put({type: LOAD_PENDING_LESSONS_FAILURE});
}

function* loadPendingLessonsInner() {

    let data = undefined;
    let reservations = undefined;

    var currentUser = auth().currentUser;

    yield firestore().collection('Reservations').doc(currentUser.uid).get().
    then((doc) => {
        if(doc.data())
            data = JSON.parse(doc.data().Reservations)}).catch((err) => {console.log(err)});

    if(data)
    {
        reservations = data.map( (s) => {if(!s.confirmed) return s});
        
        if(reservations)
        {
            let photos = [];

            for(let i = 0; i < reservations.length; i++)
            {
                if(reservations[i])
                    yield storage().ref(reservations[i].uuid+'.png').getDownloadURL().then((url) => {photos[i] = url}).catch((err) => {photos[i] = undefined, console.log(err)});
                else
                {
                    reservations.splice(i, 1);
                    i--;
                }
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
    yield takeLatest(`${LOAD_CATEGORIES}`, loadCategories);
    yield takeLatest(`${LOAD_SCHEDULED_LESSONS}`, loadScheduledLessons);
    yield takeLatest(`${LOAD_PENDING_LESSONS}`, loadPendingLessons);
}
