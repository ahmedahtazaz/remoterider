import React, { Component } from 'react';
import {TouchableOpacity, Text, Image, View, StyleSheet} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

export default class App extends Component {

  render() {
    const topStyle = require('../../../../assets/TopStyle.png');

    return (
      <LinearGradient colors={['#006b31', '#00652e', '#005e2b' , '#005326', '#004b22', '#00411e', '#003a1b', '#003619']} style={{flex: 1}}>      
        <Image source={topStyle} style={styles.topStyle}/>
        <Text 
            numberOfLines={1} style={styles.text1}>
                {'Welcome To Remote Rider'}
        </Text>  
        <Text 
            numberOfLines={1} style={styles.text2}>
                {'The App for horse riding e-lessons'}
        </Text> 
        <Text 
            numberOfLines={1} style={styles.text3}>
                {'How would you like to Sign up?'}
        </Text> 

        <TouchableOpacity style={styles.studentButton} onPress={this.props.studentHandler}>
            <Text 
                numberOfLines={1} style={styles.buttonText}>
                    {'As A Student'}
            </Text> 
        </TouchableOpacity>

        <TouchableOpacity style={styles.teacherButton} onPress={this.props.teacherHandler}>
            <Text 
                numberOfLines={1} style={styles.buttonText}>
                    {'As An Instructor'}
            </Text> 
        </TouchableOpacity>
        
      </LinearGradient>);
  }
}

// Style for "Background"
const styles = StyleSheet.create({
    topStyle: {
        width: wp('100%'),
        height: hp(59),
        resizeMode: 'stretch'
    },
    text1: {
        width: wp(95.8),
        color: '#ffffff',
        fontFamily: 'corbel_b.ttf',
        fontSize: hp(4),
        fontWeight: '700',
        textAlign: 'center'
    },
    text2: {
        width: wp(95.8),
        color: '#ffffff',
        fontFamily: 'corbel_r.ttf',
        fontSize: hp(2),
        fontWeight: '400',
        textAlign: 'center'
    },
    text3: {
        width: wp(95.8),
        color: '#ffffff',
        fontFamily: 'corbel_b.ttf',
        fontSize: hp(3),
        fontWeight: '700',
        textAlign: 'center',
        marginTop: hp(2)
    },
    studentButton: {
        justifyContent: "center",
        width: wp(55),
        borderRadius: hp(1),
        backgroundColor: '#5a9c79',
        height: hp(5.5),
        marginTop: hp(3),
        alignSelf: 'center'
    },
    buttonText: {
      fontSize: hp(2.5),
      fontWeight: '700',
      textAlign: 'center',
      color: '#ffffff',
      fontFamily: 'corbel_b.ttf'
    },
    teacherButton: {
        justifyContent: "center",
        width: wp(55),
        borderRadius: hp(1),
        backgroundColor: '#006b31',
        height: hp(5.5),
        marginTop: hp(2),
        alignSelf: 'center'
    },
})