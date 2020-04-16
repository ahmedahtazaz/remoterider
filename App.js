import React, { Component } from 'react';
import { compose, createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import createSagaMiddleware from 'redux-saga';
import rootSaga from './app/src/Commons/RootSaga';
import createRootReducer from './app/src/Commons/RootReducer';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Splash from './app/src/Screens/Splash/Views/Container/SplashC';
import Welcome1 from './app/src/Screens/Welcome1/Views/Container/Welcome1C';
import Welcome2 from './app/src/Screens/Welcome2/Views/Container/Welcome2C';
import SAStudent from './app/src/Screens/SignUpStudent/Views/Container/SASC';
import SAInstructor from './app/src/Screens/SignUpTeacher/Views/Container/SAIC';
import MSC from './app/src/Screens/MainStudent/Views/Container/MSC';
import SignInC from './app/src/Screens/SignIn/Views/Container/SignInC';
import MSIC from './app/src/Screens/MainTeacher/Views/Container/MSIC';
import ResSearchC from './app/src/Screens/MakeReservation/Views/Container/ResSearchC';
import MakeResC from './app/src/Screens/MakeReservation/Views/Container/MakeResC';
import ManagaAC from './app/src/Screens/ManageAvailability/Views/Container/ManagaAC';
import LDC from './app/src/Screens/LessonDelivery/Views/Container/LDC';

const sagaMiddleware = createSagaMiddleware();
const store = createStore(createRootReducer(), compose(applyMiddleware(sagaMiddleware),),);
sagaMiddleware.run(rootSaga);

const Stack = createStackNavigator();

export default class App extends Component {

  render() {
    return (
      <Provider store={store}>
          <NavigationContainer >
            <Stack.Navigator >
              <Stack.Screen name="Splash" component={Splash} options={{ headerShown: false}}/>
              <Stack.Screen name="Welcome" component={Welcome1} options={{ headerShown: false}}/>
              <Stack.Screen name="Sign Up" component={Welcome2} options={{ headerShown: false}}/>
              <Stack.Screen name="Student Sign Up" component={SAStudent} options={{ headerShown: false}}/>
              <Stack.Screen name="Instructor Sign Up" component={SAInstructor} options={{ headerShown: false}}/>
              <Stack.Screen name="Main Student Screen" component={MSC} options={{ headerShown: false}}/>
              <Stack.Screen name="Sign In" component={SignInC} options={{ headerShown: false}}/>
              <Stack.Screen name="Main Instructor Screen" component={MSIC} options={{ headerShown: false}}/>
              <Stack.Screen name="Search for Instructor" component={ResSearchC} options={{ headerShown: false}}/>
              <Stack.Screen name="Make Reservation with Instructor" component={MakeResC} options={{ headerShown: false}}/>
              <Stack.Screen name="Manage Availability" component={ManagaAC} options={{ headerShown: false}}/>
              <Stack.Screen name="Lesson Delivery Instructor" component={LDC} options={{ headerShown: false}}/>
            </Stack.Navigator>
          </NavigationContainer>    
      </Provider>
    );
  }
}
