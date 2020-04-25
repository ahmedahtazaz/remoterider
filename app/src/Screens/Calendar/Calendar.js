import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View
} from 'react-native';
import CalendarPicker from 'react-native-calendar-picker';
import { heightPercentageToDP, widthPercentageToDP } from 'react-native-responsive-screen';
import { getRegularFont } from '../../Commons/Fonts';

export default class Calendar extends Component {

    render() {
        return (
          <View style={styles.container}>
            <CalendarPicker textStyle={{fontFamily: getRegularFont(), fontSize: heightPercentageToDP(2), fontWeight: '200', color: 'white'}}
              onDateChange={this.props.onDateChange}
            />
          </View>
        );
      }
    }
    
    const styles = StyleSheet.create({
      container: {
        backgroundColor: 'transparent',
        marginTop: heightPercentageToDP(1),
      },
    });