import { LOAD_PHOTO, LOAD_PHOTO_SUCCESS, LOAD_PHOTO_FAILURE, LOAD_SLIDING_IMAGES, LOAD_SLIDING_IMAGES_SUCCESS, LOAD_SLIDING_IMAGES_FAILURE, LOAD_RESERVATIONS_SUCCESS, LOAD_RESERVATIONS_FAILURE, LOAD_RESERVATIONS, LOAD_CATEGORIES, LOAD_CATEGORIES_SUCCESS, LOAD_CATEGORIES_FAILURE, LOAD_SCHEDULED_LESSONS, LOAD_SCHEDULED_LESSONS_SUCCESS, LOAD_SCHEDULED_LESSONS_FAILURE, LOAD_PENDING_LESSONS_SUCCESS, LOAD_PENDING_LESSONS_FAILURE, LOAD_PENDING_LESSONS, LOAD_FEATURED_INSTRUCTORS, LOAD_FEATURED_INSTRUCTORS_SUCCESS, LOAD_FEATURED_INSTRUCTORS_FAILURE, LOAD_SEARCH_RESULTS, LOAD_SEARCH_RESULTS_SUCCESS, LOAD_SEARCH_RESULTS_FAILURE, LOAD_AVAILABLE_TIME_SLOTS, LOAD_AVAILABLE_TIME_SLOTS_SUCCESS, LOAD_AVAILABLE_TIME_SLOTS_FAILURE} from "../../../Commons/Constants";
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

function* loadFeatured(action) {

    let featured = yield* loadFeaturedInner();

    if(featured)
    {
        yield put({type: LOAD_FEATURED_INSTRUCTORS_SUCCESS, featured: featured});
    }
    else
        yield put({type: LOAD_FEATURED_INSTRUCTORS_FAILURE});
}

function* loadFeaturedInner() {

    let data = undefined;
    let reservations = undefined;

    yield firestore().collection('Featured').doc('Featured').get().
    then((doc) => {
        if(doc.data())
            data = JSON.parse(doc.data().Featured)}).catch((err) => {console.log(err)});

    if(data)
    {
        reservations = data.map( (s) => {return s});

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

function* loadSearchResults(action) {

    let searchResults = yield* loadSearchResultsInner(action.querry);

    if(searchResults)
    {
        yield put({type: LOAD_SEARCH_RESULTS_SUCCESS, searchResults: searchResults});
    }
    else
        yield put({type: LOAD_SEARCH_RESULTS_FAILURE});
}

function* loadSearchResultsInner(searchString) {

    let dataUsers = [];
    let dataFeatured = [];

    let results = [];

    yield firestore().collection('Users').orderBy('name')
                .startAt(searchString)
                .endAt(searchString + '\uf8ff')
                .get().
    then((doc) => {
        if(doc.docs && doc.docs.length > 0)
        {
            for(let i = 0; i < doc.docs.length; i++)
            {
                if(doc.docs[i].data().isInstructor)
                {
                    dataUsers.push(doc.docs[i].data());
                }
            }
        }}).catch((err) => {console.log(err)});

    yield firestore().collection('Featured').doc('Featured').get().
    then((doc) => {
        if(doc.data())
        {
            let data = JSON.parse(doc.data().Featured);

            if(data && data.length > 0)
            {
                for(let i = 0; i < data.length; i++)
                {
                    if((data[i].name.includes(searchString) || data[i].name.includes(searchString.toLowerCase())) && ( data[i - 1] !== undefined ? data[i].name !== data[i - 1].name : true))
                        dataFeatured.push(data[i]);
                }
            }
        }}).catch((err) => {console.log(err)});

        console.log('datausers', dataUsers);
        console.log('datafeatured', dataFeatured);

        if(dataUsers.length > 0)
        {
            if(dataFeatured.length > 0)
            {
                for(let i = 0; i < dataUsers.length; i++)
                {
                    results.push(dataUsers[i]);

                    for(let j = 0; j < dataFeatured.length; j++)
                    {
                        if(dataFeatured[j].name !== dataUsers[i].name && dataUsers[i].cost !== dataFeatured[i].cost)
                            results.push(dataFeatured[j]);
                    }
                }
            }
            else
                results = dataUsers;
        }
        else if(dataFeatured.length > 0)
            results = dataFeatured;
        else
            results = undefined;

        if(results)
        {
            let photos = [];

            for(let i = 0; i < results.length; i++)
            {
                if(results[i])
                    yield storage().ref(results[i].uuid+'.png').getDownloadURL().then((url) => {photos[i] = url}).catch((err) => {photos[i] = undefined, console.log(err)});
                else
                {
                    results.splice(i, 1);
                    i--;
                }
            }

            results.photos = photos;
        }

    return results;
}

function* loadAvailableTimeSlots(action) {

    let available = yield* loadAvailableTimeSlotsInner(action.date, action.uuid);

    if(available)
    {
        yield put({type: LOAD_AVAILABLE_TIME_SLOTS_SUCCESS, availableTimeSlots: available});
    }
    else
        yield put({type: LOAD_AVAILABLE_TIME_SLOTS_FAILURE});
}

function* loadAvailableTimeSlotsInner(date, uuid) {

    let available = undefined;

    yield firestore().collection('Users').doc(uuid).get().
    then((doc) => {
        if(doc.data())
        {
            let data = JSON.parse(doc.data().availableSlots);

            if(data && data.length > 0)
            {
                for(let i = 0; i < data.length; i++)
                {
                    let innerDate = data[i].date;

                    if(innerDate.toString() === date.toString())
                    {
                        if(data[i].time && data[i].time.length > 0)
                        {
                            available = [];

                            for(let j = 0; j < data[i].time.length; j++)
                            {
                                let newDate = new Date(Number.parseInt(data[i].time[j], 10));
                                let nextHourDate = new Date(Number.parseInt(data[i].time[j], 10) + 3600000);

                                let currentHour = newDate.getUTCHours();
                                let nextHour = nextHourDate.getUTCHours();

                                available.push({"time": currentHour+".00 to "+nextHour+".00 UTC", "date": data[i].time[j]});
                            }
                        }

                        break;
                    }
                }
            }
        }
    }).catch((err) => {console.log(err)});

    if(!available)
    {
        available = [];

        let initial = Number.parseInt(date, 10);

        for(let i = 0; i < 24; i++)
        {
            let newDate = new Date(initial + (3600000 * i));
            let nextHourDate = new Date(initial + (3600000 * i) + 3600000);

            let currentHour = newDate.getUTCHours();
            let nextHour = nextHourDate.getUTCHours();

            available.push({"time": currentHour+".00 to "+nextHour+".00 UTC", "date": date});
        }
    }

    return available;
}

export default function* loadDataActionWatcher() {
    yield takeLatest(`${LOAD_SLIDING_IMAGES}`, loadSlidingImages);
    yield takeLatest(`${LOAD_PHOTO}`, loadPhoto);
    yield takeLatest(`${LOAD_RESERVATIONS}`, loadReservations);
    yield takeLatest(`${LOAD_CATEGORIES}`, loadCategories);
    yield takeLatest(`${LOAD_SCHEDULED_LESSONS}`, loadScheduledLessons);
    yield takeLatest(`${LOAD_PENDING_LESSONS}`, loadPendingLessons);
    yield takeLatest(`${LOAD_FEATURED_INSTRUCTORS}`, loadFeatured);
    yield takeLatest(`${LOAD_SEARCH_RESULTS}`, loadSearchResults);
    yield takeLatest(`${LOAD_AVAILABLE_TIME_SLOTS}`, loadAvailableTimeSlots);
}
