import { LOAD_LESSON_CREDIT_URL_FAILURE, LOAD_LESSON_CREDIT_URL_SUCCESS, CONFIRM_AVAILABILITY, LOAD_PHOTO, LOAD_PHOTO_SUCCESS, LOAD_PHOTO_FAILURE, LOAD_SLIDING_IMAGES, LOAD_SLIDING_IMAGES_SUCCESS, LOAD_SLIDING_IMAGES_FAILURE, LOAD_RESERVATIONS_SUCCESS, LOAD_RESERVATIONS_FAILURE, LOAD_RESERVATIONS, LOAD_CATEGORIES, LOAD_CATEGORIES_SUCCESS, LOAD_CATEGORIES_FAILURE, LOAD_SCHEDULED_LESSONS, LOAD_SCHEDULED_LESSONS_SUCCESS, LOAD_SCHEDULED_LESSONS_FAILURE, LOAD_PENDING_LESSONS_SUCCESS, LOAD_PENDING_LESSONS_FAILURE, LOAD_PENDING_LESSONS, LOAD_FEATURED_INSTRUCTORS, LOAD_FEATURED_INSTRUCTORS_SUCCESS, LOAD_FEATURED_INSTRUCTORS_FAILURE, LOAD_SEARCH_RESULTS, LOAD_SEARCH_RESULTS_SUCCESS, LOAD_SEARCH_RESULTS_FAILURE, LOAD_AVAILABLE_TIME_SLOTS, LOAD_AVAILABLE_TIME_SLOTS_SUCCESS, LOAD_AVAILABLE_TIME_SLOTS_FAILURE, MAKE_RESERVATION, MAKE_RESERVATION_SUCCESS, MAKE_RESERVATION_FAILURE, DECLINE_STUDENT, DECLINE_STUDENT_SUCCESS, DECLINE_STUDENT_FAILURE, CONFIRM_STUDENT, CONFIRM_STUDENT_SUCCESS, CONFIRM_STUDENT_FAILURE, LOAD_CURRENT_USER, LOAD_CURRENT_USER_SUCCESS, LOAD_CURRENT_USER_FAILURE, SET_COST, SET_COST_SUCCESS, SET_COST_FAILURE, LOAD_TIME_SLOTS, LOAD_TIME_SLOTS_SUCCESS, LOAD_TIME_SLOTS_FAILURE, CONFIRM_AVAILABILITY_SUCCESS, CONFIRM_AVAILABILITY_FAILURE, LOAD_PENDING_SLOT_DATA_SUCCESS, LOAD_PENDING_SLOT_DATA_FAILURE, LOAD_PENDING_SLOT_DATA, LOAD_LESSON_CREDIT_URL, DECLINE_INSTRUCTOR, DECLINE_INSTRUCTOR_SUCCESS, DECLINE_INSTRUCTOR_FAILURE} from "../../../Commons/Constants";
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
    let currentUid= currentUser.uid;

    yield firestore().collection('Reservations').doc(currentUid).get().
    then((doc) => {
        if(doc.data())
            data = doc.data().Reservations}).catch((err) => {console.log(err)});

    if(data)
    {
        reservations = data.map( (s) => {return s});

        if(reservations)
        {
            let photos = [];

            for(let i = 0; i < reservations.length; i++)
            {
                if(reservations[i])
                {
                    yield storage().ref(reservations[i].uuid+'.png').getDownloadURL().then((url) => {photos[i] = url}).catch((err) => {photos[i] = undefined, console.log(err)});

                    yield firestore().collection('Users').doc(reservations[i].uuid).get().then( (doc) => {
                        if(doc && doc.data())
                        {
                            let data = doc.data();

                            reservations[i].name = data.name;
                            reservations[i].cost = data.cost;

                            let onlyDate = new Date(Number.parseInt(reservations[i].date, 10));

                            let newDate = new Date(Number.parseInt(reservations[i].date, 10));
                            let nextHourDate = new Date(Number.parseInt(reservations[i].date, 10) + 3600000);
                
                            let currentHour = newDate.getHours();
                            let nextHour = nextHourDate.getHours();

                            reservations[i].showAbleTime = currentHour+".00 to "+nextHour+".00";
                            reservations[i].showAbleDate = onlyDate.getDate()+"/"+(onlyDate.getMonth() + 1)+"/"+onlyDate.getFullYear();
                        }
                    }).catch();
                }
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
            data = doc.data().Reservations}).catch((err) => {console.log(err)});

    if(data)
    {
        reservations = data.map( (s) => {if(s.confirmed === "true") return s});

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

            for(let i = 0; i < reservations.length; i++)
            {
                if(reservations[i])
                {
                    if(reservations[i].date)
                    {
                        let newDate = new Date(Number.parseInt(reservations[i].date, 10));
                        let nextHour = new Date(Number.parseInt(reservations[i].date, 10) + 3600000);

                        let showableDate = newDate.getDate()+'/'+(newDate.getMonth() + 1)+'/'+newDate.getFullYear();
                        let time = newDate.getHours()+'.00 to '+nextHour.getHours()+'.00';

                        reservations[i].showableDate = showableDate;
                        reservations[i].time = time;
                    }

                    yield firestore().collection('Users').doc(reservations[i].uuid).get().
                    then((doc) => {
                        if(doc.data())
                            reservations[i].name = doc.data().name}).catch((err) => {console.log(err)});
                }
                else
                {
                    reservations.splice(i, 1);
                    i--;
                }
            }
        }
    }

    return reservations && reservations.length === 0 ? undefined : reservations;
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
            data = doc.data().Reservations}).catch((err) => {console.log(err)});

    if(data)
    {
        reservations = data.map( (s) => {if(!s.confirmed || s.confirmed === "false") return s});
        
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

            for(let i = 0; i < reservations.length; i++)
            {
                if(reservations[i])
                {
                    if(reservations[i].date)
                    {
                        let newDate = new Date(Number.parseInt(reservations[i].date, 10));
                        let nextHour = new Date(Number.parseInt(reservations[i].date, 10) + 3600000);

                        let showableDate = newDate.getDate()+'/'+(newDate.getMonth() + 1)+'/'+newDate.getFullYear();
                        let time = newDate.getHours()+'.00 to '+nextHour.getHours()+'.00';

                        reservations[i].showableDate = showableDate;
                        reservations[i].time = time;
                    }

                    yield firestore().collection('Users').doc(reservations[i].uuid).get().
                    then((doc) => {
                        if(doc.data())
                            reservations[i].name = doc.data().name}).catch((err) => {console.log(err)});
                }
                else
                {
                    reservations.splice(i, 1);
                    i--;
                }
            }
        }
    }

    return reservations && reservations.length === 0 ? undefined : reservations;
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
        yield put({type: LOAD_SEARCH_RESULTS_SUCCESS, searchResults: searchResults, searchQuerry: action.querry});
    }
    else
        yield put({type: LOAD_SEARCH_RESULTS_FAILURE,  searchQuerry: action.querry});
}

function* loadSearchResultsInner(searchString) {

    let dataUsers = [];
    let dataFeatured = [];

    let results = [];

    yield firestore().collection('Users')
            .get().
then((doc) => {
    if(doc.docs && doc.docs.length > 0)
    {
        for(let i = 0; i < doc.docs.length; i++)
        {
            if(doc.docs[i].data().isInstructor)
            {
                if(doc.docs[i].data().name)
                {
                    if(doc.docs[i].data().name.toLowerCase().includes(searchString.toLowerCase()))
                        dataUsers.push(doc.docs[i].data());
                }
            }
        }
    }}).catch((err) => {console.log(err)});

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
            let data = doc.data().availableSlots;

            if(data && data.length > 0)
            {
                for(let i = 0; i < data.length; i++)
                {
                    let innerDate = data[i].date;

                    if(innerDate.toString() === date.toString())
                    {
                        if(!available)
                            available = [];

                        if(data[i].status.toString() === 'available')
                            available.push(data[i]);
                    }
                }
            }
        }
    }).catch((err) => {console.log(err)});

    return available;
}

function* makeReservation(action) {

    let message = yield* makeReservationInner(action.date, action.instructor);

    if(message)
    {
        yield put({type: MAKE_RESERVATION_SUCCESS, makeReservMessage: message});
    }
    else
        yield put({type: MAKE_RESERVATION_FAILURE, makeReservMessage: 'Failed to Make Reservation. Please Retry'});
}

function* makeReservationInner(date, instructor) {

    let data = undefined;
    var currentUser = auth().currentUser;
    let newReservations = [];

    let message = undefined;

    yield firestore().collection('Reservations').doc(instructor.uuid).get().
    then((doc) => {
        if(doc && doc.data() && doc.data().Reservations)
            data = doc.data().Reservations;
            
            if(data && data.length > 0)
            {
                newReservations = data;
            }

            newReservations.push({"uuid" : currentUser.uid, "confirmed" : "false", date: date});

        }).catch((err) => {console.log(err)});

    if(newReservations && newReservations.length > 0)
    {
        yield firestore().collection('Reservations').doc(instructor.uuid).set({"Reservations" :newReservations}).then(
            () => {message = "We have successfully sent your request to "+instructor.name}
        ).catch((err) => console.log(err));
    }

    yield* makeReservationInnerStudent(date, instructor);

    if(message)
    {
        let available = [];
        let dateFound = false;
        let timefound = false;

        yield firestore().collection('Users').doc(instructor.uuid).get().
        then((doc) => {
            if(doc.data())
            {
                let data = doc.data().availableSlots;

                if(data && data.length > 0)
                {
                    available = data;

                    for(let i = 0; i < available.length; i++)
                    {
                        let innerTime = available[i].time;
                        let innerDate = available[i].date;

                        let onlyDate = new Date(Number.parseInt(date, 10));
                        let initialDate = new Date(Date.UTC(onlyDate.getFullYear(), onlyDate.getMonth(), onlyDate.getDate(), 0, 0, 0));
                        let dateMillis = initialDate.getTime();

                        if(innerDate.toString() === dateMillis.toString())
                        {
                            dateFound = true;

                            if(innerTime.toString() === date.toString())
                            {
                                timefound = true;

                                available[i].status = 'pending';
                                break;
                            }
                        }
                    }                 
                }

                if(dateFound)
                {
                    if(!timefound)
                    {
                        let onlyDate = new Date(Number.parseInt(date, 10));
                        let initialDate = new Date(Date.UTC(onlyDate.getFullYear(), onlyDate.getMonth(), onlyDate.getDate(), 0, 0, 0));
                        let initial = initialDate.getTime();
                        let newDate = new Date(Number.parseInt(date, 10));
                        let nextHourDate = new Date(Number.parseInt(date, 10) + 3600000);
            
                        let currentHour = newDate.getHours();
                        let nextHour = nextHourDate.getHours();

                        available.push({"time": newDate.getTime(), "date": initial, "status": "pending", "showAbleTime": currentHour+".00 to "+nextHour+".00"});
                    }
                }
                else
                {
                    let onlyDate = new Date(Number.parseInt(date, 10));
                    let initialDate = new Date(Date.UTC(onlyDate.getFullYear(), onlyDate.getMonth(), onlyDate.getDate(), 0, 0, 0));
                    let initial = initialDate.getTime();

                    for(let i = 0; i < 24; i++)
                    {
                        let newDate = new Date(initial + (3600000 * i));
                        let nextHourDate = new Date(initial + (3600000 * i) + 3600000);
            
                        let currentHour = newDate.getHours();
                        let nextHour = nextHourDate.getHours();
            
                        if(Number.parseInt(newDate.getTime(), 10) === Number.parseInt(date, 10))
                        {
                            available.push({"time": newDate.getTime(), "date": initial, "status": "pending", "showAbleTime": currentHour+".00 to "+nextHour+".00"});
                        }
                        else    
                            available.push({"time": newDate.getTime(), "date": initial, "status": "unavailable", "showAbleTime": currentHour+".00 to "+nextHour+".00"});
                    }
                }
            }
        }).catch((err) => {console.log(err)});

        if(available.length > 0)
        {
            yield firestore().collection('Users').doc(instructor.uuid).update({
                availableSlots: available,
            }).then((doc) => {
                success = true;
            }).catch((err) => {console.log(err)});
        }
    }

    return message;
}

function* makeReservationInnerStudent(date, instructor) {

    let data = undefined;
    var currentUser = auth().currentUser;
    let currentUid = currentUser.uid;
    let newReservations = [];

    yield firestore().collection('Reservations').doc(currentUid).get().
    then((doc) => {
        if(doc && doc.data() && doc.data().Reservations)
            data = doc.data().Reservations;
            
            if(data && data.length > 0)
            {
                newReservations = data;
            }

            newReservations.push({"uuid" : instructor.uuid, "confirmed" : "false", date: date});

        }).catch((err) => {console.log(err)});

    if(newReservations && newReservations.length > 0)
    {
        yield firestore().collection('Reservations').doc(currentUid).set({"Reservations" :newReservations}).then(
            () => {}
        ).catch((err) => console.log(err));
    }
}

function* declineStudent(action) {

    let success = yield* declineStudentInner(action.declineMessage, action.date, action.student);

    if(success)
    {
        yield put({type: DECLINE_STUDENT_SUCCESS});
    }
    else
        yield put({type: DECLINE_STUDENT_FAILURE});
}

function* declineStudentInner(declineMessage, date, student) {

    let data = undefined;
    var currentUser = auth().currentUser;
    let newReservations = [];

    let success = false;

    let currentuid = currentUser.uid;

    yield firestore().collection('Reservations').doc(currentuid).get().
    then((doc) => {
        if(doc && doc.data() && doc.data().Reservations)
            data = doc.data().Reservations;
            
            if(data && data.length > 0)
            {
                newReservations = data;

                for(let i = 0; i < newReservations.length; i++)
                {
                    if(newReservations[i].uuid.toString() === student.uuid.toString() && newReservations[i].date.toString() === student.date.toString())
                    {
                        newReservations.splice(i, 1);
                        i--;
                    }
                }
            }

        }).catch((err) => {console.log(err)});

    yield firestore().collection('Reservations').doc(currentuid).set({"Reservations" :newReservations}).then(
        () => {success = true}
    ).catch((err) => console.log(err));

    if(success)
    {
        let available = [];
        let dateFound = false;
        let timefound = false;

        yield firestore().collection('Users').doc(currentuid).get().
        then((doc) => {
            if(doc.data())
            {
                let data = doc.data().availableSlots;

                if(data && data.length > 0)
                {
                    available = data;

                    for(let i = 0; i < available.length; i++)
                    {
                        let innerTime = available[i].time;
                        let innerDate = available[i].date;

                        let onlyDate = new Date(Number.parseInt(student.date, 10));
                        let initialDate = new Date(Date.UTC(onlyDate.getFullYear(), onlyDate.getMonth(), onlyDate.getDate(), 0, 0, 0));
                        let dateMillis = initialDate.getTime();

                        if(innerDate.toString() === dateMillis.toString())
                        {
                            dateFound = true;

                            if(innerTime.toString() === student.date.toString())
                            {
                                timefound = true;

                                available[i].status = 'available';
                                break;
                            }
                        }
                    }                 
                }
            }
        }).catch((err) => {console.log(err)});

        if(available.length > 0)
        {
            yield firestore().collection('Users').doc(currentuid).update({
                availableSlots: available,
            }).then((doc) => {
                success = true;
            }).catch((err) => {console.log(err)});
        }

        let studentReservations = [];

        yield firestore().collection('Reservations').doc(student.uuid).get().
        then((doc) => {
            if(doc && doc.data() && doc.data().Reservations)
                data = doc.data().Reservations;
                
                if(data && data.length > 0)
                {
                    studentReservations = data;
    
                    for(let i = 0; i < studentReservations.length; i++)
                    {
                        if(studentReservations[i].uuid.toString() === currentuid.toString() && studentReservations[i].date.toString() === student.date.toString())
                        {
                            studentReservations[i].declined = true;
                            studentReservations[i].confirmed = false;
                            studentReservations[i].declineMessage = declineMessage;
                        }
                    }
                }
    
            }).catch((err) => {console.log(err)});
    
        yield firestore().collection('Reservations').doc(student.uuid).set({"Reservations" :studentReservations}).then(
            () => {success = true}
        ).catch((err) => console.log(err));
    }

    return success;
}

function* confirmStudent(action) {

    let success = yield* confirmStudentInner(action.date, action.student);

    if(success)
    {
        yield put({type: CONFIRM_STUDENT_SUCCESS});
    }
    else
        yield put({type: CONFIRM_STUDENT_FAILURE});
}

function* confirmStudentInner(date, student) {

    let data = undefined;
    var currentUser = auth().currentUser;
    let newReservations = [];

    let success = false;

    let currentuid = currentUser.uid;

    yield firestore().collection('Reservations').doc(currentuid).get().
    then((doc) => {
        if(doc && doc.data() && doc.data().Reservations)
            data = doc.data().Reservations;
            
            if(data && data.length > 0)
            {
                newReservations = data;

                for(let i = 0; i < newReservations.length; i++)
                {
                    if(newReservations[i].uuid.toString() === student.uuid.toString() && newReservations[i].date.toString() === student.date.toString())
                    {
                        newReservations[i].confirmed = "true";
                        break;
                    }
                }
            }

        }).catch((err) => {console.log(err)});

    yield firestore().collection('Reservations').doc(currentuid).set({"Reservations" :newReservations}).then(
        () => {success = true}
    ).catch((err) => console.log(err));

    if(success)
    {
        let studentReservations = [];
        let studentError = undefined;

        yield firestore().collection('Reservations').doc(student.uuid).get().
        then((doc) => {
        if(doc && doc.data() && doc.data().Reservations)
            data = doc.data().Reservations;
            
            if(data && data.length > 0)
            {
                studentReservations = data;

                for(let i = 0; i < studentReservations.length; i++)
                {
                    if(studentReservations[i].uuid.toString() === currentuid.toString() && studentReservations[i].date.toString() === student.date.toString())
                    {
                        studentReservations[i].confirmed = "true";
                        break;
                    }
                }
            }

        }).catch((err) => {console.log(err)});

        if(studentReservations.length > 0)
        { 
            yield firestore().collection('Reservations').doc(student.uuid).update({"Reservations" :studentReservations}).then(
                () => {success = true}
            ).catch((err) => {studentError = true, console.log(err)});  
    
            if(studentError)
            {
                yield firestore().collection('Reservations').doc(student.uuid).set({"Reservations" :studentReservations}).then(
                    () => {success = true}
                ).catch((err) => {studentError = true, console.log(err)});  
            }
        }
        
        let available = [];
        let dateFound = false;
        let timefound = false;

        yield firestore().collection('Users').doc(currentuid).get().
        then((doc) => {
            if(doc.data())
            {
                let data = doc.data().availableSlots;

                if(data && data.length > 0)
                {
                    available = data;

                    for(let i = 0; i < available.length; i++)
                    {
                        let innerTime = available[i].time;
                        let innerDate = available[i].date;

                        let onlyDate = new Date(Number.parseInt(student.date, 10));
                        let initialDate = new Date(Date.UTC(onlyDate.getFullYear(), onlyDate.getMonth(), onlyDate.getDate(), 0, 0, 0));
                        let dateMillis = initialDate.getTime();

                        if(innerDate.toString() === dateMillis.toString())
                        {
                            dateFound = true;

                            if(innerTime.toString() === student.date.toString())
                            {
                                timefound = true;

                                available[i].status = 'confirmed';
                                break;
                            }
                        }
                    }                 
                }
            }
        }).catch((err) => {console.log(err)});

        if(available.length > 0)
        {
            yield firestore().collection('Users').doc(currentuid).update({
                availableSlots: available,
            }).then((doc) => {
                success = true;
            }).catch((err) => {console.log(err)});
        }
    }

    return success;
}

function* loadCurrentUser(action) {

    let user = yield* loadCurrentUserInner();

    if(user)
    {
        yield put({type: LOAD_CURRENT_USER_SUCCESS, currentUser: user});
    }
    else
        yield put({type: LOAD_CURRENT_USER_FAILURE});
}

function* loadCurrentUserInner() {

    let user = undefined;
    var currentUser = auth().currentUser;

    let currentuid = currentUser.uid;

    yield firestore().collection('Users').doc(currentuid).get().
    then((doc) => {
        if(doc && doc.data())
            user = doc.data();

        }).catch((err) => {console.log(err)});

    return user;
}

function* setCost(action) {

    let success = yield* setCostInner(action.cost, action.currency);

    if(success)
    {
        yield put({type: SET_COST_SUCCESS});
    }
    else
        yield put({type: SET_COST_FAILURE});
}

function* setCostInner(cost, currency) {

    let user = undefined;
    var currentUser = auth().currentUser;

    let currentuid = currentUser.uid;

    let success = false;

    yield firestore().collection('Users').doc(currentuid).get().
    then((doc) => {
        if(doc && doc.data())
            {
                user = doc.data();

                user.cost = cost+" "+currency;
            }

        }).catch((err) => {console.log(err)});

    if(user)
    {
        yield firestore().collection('Users').doc(currentuid).update({
            cost: user.cost,
            }).then(success = true).catch((err) => {success = false, error = err.message});
    }
    

    return success;
}

function* loadTimeSlots(action) {

    let slots = yield* loadTimeSlotsInner(action.date);

    if(slots)
    {
        yield put({type: LOAD_TIME_SLOTS_SUCCESS, timeSlots: slots});
    }
    else
        yield put({type: LOAD_TIME_SLOTS_FAILURE});
}

function* loadTimeSlotsInner(date) {

    let available = undefined;
    var currentUser = auth().currentUser;

    let currentuid = currentUser.uid;

    yield firestore().collection('Users').doc(currentuid).get().
    then((doc) => {
        if(doc.data())
        {
            let data = doc.data().availableSlots;

            if(data && data.length > 0)
            {
                for(let i = 0; i < data.length; i++)
                {
                    let innerDate = data[i].date;

                    if(innerDate.toString() === date.toString())
                    {
                        if(!available)
                            available = [];

                        available.push(data[i]);
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

            let currentHour = newDate.getHours();
            let nextHour = nextHourDate.getHours();

            available.push({"time": newDate.getTime(), "date": date, "status": "unavailable", "showAbleTime": currentHour+".00 to "+nextHour+".00"});
        }
    }

    return available;
}

function* confirmAvailability(action) {

    let success = yield* confirmAvailabilityInner(action.slots);

    if(success)
    {
        yield put({type: CONFIRM_AVAILABILITY_SUCCESS});
    }
    else
        yield put({type: CONFIRM_AVAILABILITY_FAILURE});
}

function* confirmAvailabilityInner(slots) {

    let success = false;
    var currentUser = auth().currentUser;

    let currentuid = currentUser.uid;

    let currentlyAvailable = undefined;

    yield firestore().collection('Users').doc(currentuid).get().then((doc) => {
        if(doc && doc.data())
        {
            currentlyAvailable = doc.data().availableSlots;
        }
    }).catch((err) => {console.log(err)});

    if(currentlyAvailable)
    {
        for(let i = 0; i < slots.length; i++)
        {
            let shouldPush = true;

            for(let j = 0; j < currentlyAvailable.length; j++)
            {
                if(currentlyAvailable[j].date == slots[i].date && currentlyAvailable[j].time == slots[i].time)
                {
                    currentlyAvailable[j].status = slots[i].status;
                    shouldPush = false;
                    break;
                }
            }

            if(shouldPush)
                currentlyAvailable.push(slots[i]);
        }
    }

    yield firestore().collection('Users').doc(currentuid).update({
        availableSlots: currentlyAvailable ? currentlyAvailable : slots,
    }).then((doc) => {
        success = true;
    }).catch((err) => {console.log(err)});

    return success;
}

function* loadPendingSlotData(action) {

    let student = yield* loadPendingSlotDataInner(action.slot);

    if(student)
    {
        yield put({type: LOAD_PENDING_SLOT_DATA_SUCCESS, student: student, studentPhoto: student.photo});
    }
    else
        yield put({type: LOAD_PENDING_SLOT_DATA_FAILURE});
}

function* loadPendingSlotDataInner(slot) {

    
    var currentUser = auth().currentUser;

    let currentuid = currentUser.uid;

    let studentUid = undefined;

    let student = undefined;

    yield firestore().collection('Reservations').doc(currentuid).get().then((doc) => {
        if(doc && doc.data())
        {
            let data = doc.data();

            let reservations = data.Reservations;

            if(reservations && reservations.length > 0)
            {
                for(let i = 0; i < reservations.length; i++)
                {
                    let reservation = reservations[i];

                    if(reservation.date.toString() === slot.time.toString())
                    {
                        studentUid = reservation.uuid;
                        break;
                    }
                }
            }
        }
    }).catch((err) => {console.log(err)});

    if(studentUid)
    {
        yield firestore().collection('Users').doc(studentUid).get().then((doc) => {
            if(doc && doc.data())
            {
                student = doc.data();

                let newDate = new Date(Number.parseInt(slot.time, 10));
                let nextHour = new Date(Number.parseInt(slot.time, 10) + 3600000);

                let showableDate = newDate.getDate()+'/'+(newDate.getMonth() + 1)+'/'+newDate.getFullYear();
                let time = newDate.getHours()+'.00 to '+nextHour.getHours()+'.00';

                student.date = slot.time;
                student.showableDate = showableDate;
                student.time = time;
            }
        }).catch((err) => {console.log(err)});
    }

    if(student)
    {
        yield storage().ref(studentUid+'.png').getDownloadURL().then((url) => {student.photo = url}).catch((err) => {console.log(err)});
    }

    return student;
}

function* loadLessonCreditUrl(action) {

    let lessonUrl = undefined;

    yield firestore().collection('DefaultLessonCredits').doc('DefaultLessonCredits').get().then(
        (doc) => {
            if(doc && doc.data())
            {
                lessonUrl = doc.data().DefaultLessonCreditsUrl;
            }
        }
    ).catch();

    if(lessonUrl)
    {
        yield put({type: LOAD_LESSON_CREDIT_URL_SUCCESS, lessonCreditUrl: lessonUrl});
    }
    else
        yield put({type: LOAD_LESSON_CREDIT_URL_FAILURE});
}

function* declineInstructor(action) {

    console.log(action)
    let success = yield* declineInstructorInner(action.instructor);

    if(success)
    {
        yield put({type: DECLINE_INSTRUCTOR_SUCCESS});
    }
    else
        yield put({type: DECLINE_INSTRUCTOR_FAILURE});
}

function* declineInstructorInner(instructor) {

    let data = undefined;
    var currentUser = auth().currentUser;
    let newReservations = [];

    let success = false;

    let currentuid = currentUser.uid;

    yield firestore().collection('Reservations').doc(currentuid).get().
    then((doc) => {
        if(doc && doc.data() && doc.data().Reservations)
            data = doc.data().Reservations;
            
            if(data && data.length > 0)
            {
                newReservations = data;

                for(let i = 0; i < newReservations.length; i++)
                {
                    if(newReservations[i].uuid.toString() === instructor.uuid.toString() && newReservations[i].date.toString() === instructor.date.toString())
                    {
                        newReservations.splice(i, 1);
                        i--;
                    }
                }
            }

        }).catch((err) => {console.log(err)});

    yield firestore().collection('Reservations').doc(currentuid).set({"Reservations" :newReservations}).then(
        () => {success = true}
    ).catch((err) => console.log(err));

    if(success)
    {
        let available = [];
        let dateFound = false;
        let timefound = false;

        yield firestore().collection('Users').doc(instructor.uuid).get().
        then((doc) => {
            if(doc.data())
            {
                let data = doc.data().availableSlots;

                if(data && data.length > 0)
                {
                    available = data;

                    for(let i = 0; i < available.length; i++)
                    {
                        let innerTime = available[i].time;
                        let innerDate = available[i].date;

                        let onlyDate = new Date(Number.parseInt(instructor.date, 10));
                        let initialDate = new Date(Date.UTC(onlyDate.getFullYear(), onlyDate.getMonth(), onlyDate.getDate(), 0, 0, 0));
                        let dateMillis = initialDate.getTime();

                        if(innerDate.toString() === dateMillis.toString())
                        {
                            dateFound = true;

                            if(innerTime.toString() === instructor.date.toString())
                            {
                                timefound = true;

                                available[i].status = 'available';
                                break;
                            }
                        }
                    }                 
                }
            }
        }).catch((err) => {console.log(err)});

        if(available.length > 0)
        {
            yield firestore().collection('Users').doc(instructor.uuid).update({
                availableSlots: available,
            }).then((doc) => {
                success = true;
            }).catch((err) => {console.log(err)});
        }

        let studentReservations = [];

        yield firestore().collection('Reservations').doc(instructor.uuid).get().
        then((doc) => {
            if(doc && doc.data() && doc.data().Reservations)
                data = doc.data().Reservations;
                
                if(data && data.length > 0)
                {
                    studentReservations = data;
    
                    for(let i = 0; i < studentReservations.length; i++)
                    {
                        if(studentReservations[i].uuid.toString() === currentuid.toString() && studentReservations[i].date.toString() === instructor.date.toString())
                        {
                            studentReservations.splice(i, 1);
                            i--;
                        }
                    }
                }
    
            }).catch((err) => {console.log(err)});
    
        yield firestore().collection('Reservations').doc(instructor.uuid).set({"Reservations" :studentReservations}).then(
            () => {success = true}
        ).catch((err) => console.log(err));
    }

    return success;
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
    yield takeLatest(`${MAKE_RESERVATION}`, makeReservation);
    yield takeLatest(`${DECLINE_STUDENT}`, declineStudent);
    yield takeLatest(`${CONFIRM_STUDENT}`, confirmStudent);
    yield takeLatest(`${LOAD_CURRENT_USER}`, loadCurrentUser);
    yield takeLatest(`${SET_COST}`, setCost);
    yield takeLatest(`${LOAD_TIME_SLOTS}`, loadTimeSlots);
    yield takeLatest(`${CONFIRM_AVAILABILITY}`, confirmAvailability);
    yield takeLatest(`${LOAD_PENDING_SLOT_DATA}`, loadPendingSlotData);
    yield takeLatest(`${LOAD_LESSON_CREDIT_URL}`, loadLessonCreditUrl);
    yield takeLatest(`${DECLINE_INSTRUCTOR}`, declineInstructor);
}
