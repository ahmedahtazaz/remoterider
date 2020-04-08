import React, { Component } from 'react';
import {TextInput, TouchableOpacity, Text, Image, View, StyleSheet, KeyboardAvoidingView, ScrollView} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import Hyperlink from 'react-native-hyperlink';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import CheckBox from '../../../../Commons/CheckBox/CheckBox';
import Dialogue from '../../../../Commons/Dialogue/Dialogue';
import FitImage from 'react-native-fit-image';
import { getBoldFont, getRegularFont } from '../../../../Commons/Fonts';

export default class App extends Component {

  render() {
    const topStyle = require('../../../../assets/TopStyle.png');
    const nameImage = require('../../../../assets/nameImage.png');
    const emailImage = require('../../../../assets/emailImage.png');
    const passImage = require('../../../../assets/passImage.png');
    const plusImage = require('../../../../assets/plusImage.png');

    return (
        <KeyboardAwareScrollView
      contentContainerStyle={{flexGrow: 1}}
    >
      <LinearGradient colors={['#006b31', '#00652e', '#005e2b' , '#005326', '#004b22', '#00411e', '#003a1b', '#003619']} style={{flex: 1}}>      
        
        <Image source={topStyle} style={styles.topStyle}/>

        <Text 
            numberOfLines={1} style={styles.text1}>
                {'Sign Up As an Instructor'}
        </Text>  
        <View style={styles.fieldMaincontainerStyle}> 
            <FitImage source={nameImage} style={styles.nameImage}/>
            <View style={styles.fieldInnercontainerStyle}> 
                <TextInput onChangeText={this.props.userNameHandler} style={styles.inputStyle} autoCorrect={false} placeholder={'Name'} placeholderTextColor = "#598a6f" />
            </View>
        </View>
        <View style={styles.fieldMaincontainerStyle}> 
            <Image source={emailImage} style={styles.emailImage}/>
            <View style={styles.fieldInnercontainerStyle}> 
                <TextInput onChangeText={this.props.emailHandler} style={styles.inputStyle} autoCorrect={false} placeholder={'Email'} placeholderTextColor = "#598a6f" />
            </View>
        </View>
        <View style={styles.fieldMaincontainerStyle}> 
            <Image source={passImage} style={styles.passImage}/>
            <View style={styles.fieldInnercontainerStyle}> 
                <TextInput onChangeText={this.props.passwordHandler} style={styles.inputStyle} autoCorrect={false} placeholder={'Password'} placeholderTextColor = "#598a6f" />
            </View>
        </View>
        <View style={styles.fieldMaincontainerStyle}> 
            <FitImage source={plusImage} style={styles.plusImage}/>
            <TouchableOpacity style={styles.photoButton} onPress={this.props.photoHandler}>
                <Text 
                    numberOfLines={1} style={styles.photoButtonText}>
                        {this.props.photoHint}
                </Text> 
            </TouchableOpacity>
        </View>
        <View style={styles.fieldMaincontainerStyle}> 
            <FitImage source={nameImage} style={styles.nameImage}/>
            <View style={styles.fieldInnercontainerStyle}> 
                <TextInput onChangeText={this.props.profileandler} style={styles.inputStyle} autoCorrect={false} placeholder={'Profile'} placeholderTextColor = "#598a6f" />
            </View>
        </View>
        <View style={styles.tcStyle}>
            <CheckBox onPress={this.props.onTCPress}/>
            <Hyperlink linkStyle={{ color: '#00b4ac', fontSize: 12 }} linkText={url => url === 'https://tc.com' ? 'Terms & Conditions' : url}>
                <Text 
                    numberOfLines={1} style={styles.tcText}>
                        {'I have accepted the https://tc.com'}
                </Text>
            </Hyperlink>
        </View>

        <TouchableOpacity style={styles.signInButton} onPress={this.props.signUpButtonHandler}>
            <Text 
                numberOfLines={1} style={styles.buttonText}>
                    {'Sign Up'}
            </Text> 
        </TouchableOpacity>
        <Dialogue/>
      </LinearGradient></KeyboardAwareScrollView>);
  }
}

// Style for "Background"
const styles = StyleSheet.create({
    topStyle: {
        height: hp(34),
        width: wp('100%'),
        resizeMode: 'stretch'
    },
    text1: {
        width: wp(95.8),
        color: '#ffffff',
        fontFamily: getBoldFont(),
        fontSize: hp(4),
        fontWeight: '700',
        textAlign: 'center',
        marginBottom: hp(3)
    },
    buttonText: {
        fontSize: hp(2.5),
        fontWeight: '700',
        textAlign: 'center',
        color: '#ffffff',
        fontFamily: getBoldFont()
    },
    signInButton: {
        justifyContent: "center",
        width: wp(55),
        borderRadius: hp(1),
        backgroundColor: '#5a9c79',
        height: hp(5.5),
        marginTop: hp(1),
        alignSelf: 'center',
        marginBottom: hp(5)
    },
    photoButton: {
        justifyContent: "center",
        height: hp(4),
        justifyContent: "center",
        backgroundColor: 'transparent',
        alignSelf: 'center',
      },
      photoButtonText: {
        fontSize: hp(2.5),
        color: '#598a6f',
        fontFamily: getRegularFont(),
        fontWeight: '200',
        marginLeft: wp(3),
        marginBottom: hp(0.1)
      },
    fieldMaincontainerStyle:{
        flexDirection: 'row',
        height: hp(4),
        width: wp(67.6),
        alignSelf: 'center',
        marginTop: hp(2)
    },
    nameImage: {
        height: hp(3.2),
        width: wp(6)
    },
    emailImage: {
        height: hp(4),
        width: wp(6),
        resizeMode: 'contain'
    },
    passImage: {
        height: hp(4),
        width: wp(6),
        resizeMode: 'contain'
    },
    plusImage: {
        height: hp(3.2),
        width: wp(6)
    },
    fieldInnercontainerStyle:{
        flex: 9,
        width: wp(67.6)
    },
    inputStyle: {
        fontSize: hp(2.5),
        color: 'white',
        fontFamily: getRegularFont(),
        fontWeight: '200',
        marginLeft: wp(3),
        borderBottomWidth: hp(.1),
        borderBottomColor: '#598a6f',
    },
    tcStyle:{
        height: hp(4),
        flexDirection: 'row',
        width: wp(67.6),
        alignSelf: 'center',
        marginBottom: hp(3),
        paddingLeft: wp(4),
        marginTop: hp(3)
    },
    tcText: {
        fontSize: hp(1.6),
        fontWeight: '400',
        opacity: 0.4,
        textAlign: 'center',
        color: '#ffffff',
        fontFamily: getRegularFont(),
        marginTop: hp(1)
      },
})