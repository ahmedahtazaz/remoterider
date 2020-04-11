import React, { Component } from 'react';
import {TouchableOpacity, Text, Image, View, StyleSheet} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { getBoldFont, getRegularFont } from '../../../../Commons/Fonts';

export default class App extends Component {

  render() {
    const topStyle = require('../../../../assets/TopStyle.png');
    const backArrow = require('../../../../assets/backArrow.png');

    return (
      <LinearGradient colors={['#006b31', '#00652e', '#005e2b' , '#005326', '#004b22', '#00411e', '#003a1b', '#003619']} style={{flex: 1}}>      
        <View style={styles.topBarContainer}>
            <TouchableOpacity style={{marginLeft: wp(2), height: hp(2.8), width: wp(7.8) , backgroundColor: 'transparent', alignSelf: 'center'}} onPress={this.props.backButton}>
            <Image source={backArrow} style={{height: hp(2.8), width: wp(7.8), resizeMode: 'contain'}}></Image>
            </TouchableOpacity>
        </View>
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
    topBarContainer: {
        width: wp(100),
        height: hp(11.5),
        flexDirection:'row',
        backgroundColor: '#5a9c79',
        position: 'absolute',
        zIndex: 1000
    },
    topStyle: {
        width: wp('100%'),
        height: hp(59),
        resizeMode: 'stretch'
    },
    text1: {
        width: wp(95.8),
        color: '#ffffff',
        fontFamily: getBoldFont(),
        fontSize: hp(3),
        fontWeight: '700',
        textAlign: 'center'
    },
    text2: {
        width: wp(95.8),
        color: '#ffffff',
        fontFamily: getRegularFont(),
        fontSize: hp(2),
        fontWeight: '400',
        textAlign: 'center'
    },
    text3: {
        width: wp(95.8),
        color: '#ffffff',
        fontFamily: getBoldFont(),
        fontSize: hp(2.5),
        fontWeight: '500',
        textAlign: 'center',
        marginTop: hp(2),
        alignSelf: 'center'
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
      fontFamily: getBoldFont()
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