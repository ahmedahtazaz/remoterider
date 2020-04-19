import React, { Component } from 'react';
import {TextInput, TouchableOpacity, Text, Image, View, StyleSheet, ActivityIndicator} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import Hyperlink from 'react-native-hyperlink';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import CheckBox from '../../../../Commons/CheckBox/CheckBox';
import Dialogue from '../../../../Commons/Dialogue/Dialogue';
import { getBoldFont, getRegularFont } from '../../../../Commons/Fonts';

export default class App extends Component {

  render() {
    const topStyle = require('../../../../assets/TopStyle.png');
    const nameImage = require('../../../../assets/nameImage.png');
    const emailImage = require('../../../../assets/emailImage.png');
    const passImage = require('../../../../assets/passImage.png');
    const plusImage = require('../../../../assets/plusImage.png');
    const backArrow = require('../../../../assets/backArrow.png');

    return (
        
      <LinearGradient colors={['#006b31', '#00652e', '#005e2b' , '#005326', '#004b22', '#00411e', '#003a1b', '#003619']} style={{flex: 1}}>      
        <KeyboardAwareScrollView
      contentContainerStyle={{flexGrow: 1}}
      keyboardShouldPersistTaps="always"
    >
        <View style={styles.topBarContainer}>
            <TouchableOpacity style={{marginLeft: wp(2), height: hp(2.8), width: wp(7.8) , backgroundColor: 'transparent', alignSelf: 'center'}} onPress={this.props.backButton}>
            <Image source={backArrow} style={{height: hp(2.8), width: wp(7.8), resizeMode: 'contain'}}></Image>
            </TouchableOpacity>
        </View>
        <Image source={topStyle} style={styles.topStyle}/>

        <Text 
            numberOfLines={1} style={styles.text1}>
                {'Sign Up As a Student'}
        </Text>  
        <View style={styles.fieldMaincontainerStyle}> 
            <Image source={nameImage} style={styles.nameImage}/>
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
                <TextInput secureTextEntry={true} onChangeText={this.props.passwordHandler} style={styles.inputStyle} autoCorrect={false} placeholder={'Password'} placeholderTextColor = "#598a6f" />
            </View>
        </View>
        <View style={styles.fieldMaincontainerStyle}> 
            <Image source={passImage} style={styles.passImage}/>
            <View style={styles.fieldInnercontainerStyle}> 
                <TextInput secureTextEntry={true} onChangeText={this.props.confirmPasswordHandler} style={styles.inputStyle} autoCorrect={false} placeholder={'Confirm Password'} placeholderTextColor = "#598a6f" />
            </View>
        </View>
        <View style={styles.fieldMaincontainerStyle}> 
            <Image source={plusImage} style={styles.plusImage}/>
            <TouchableOpacity style={styles.photoButton} onPress={this.props.photoHandler}>
                <Text 
                    numberOfLines={1} style={styles.photoButtonText}>
                        {this.props.photoHint}
                </Text> 
            </TouchableOpacity>
        </View>
        <View style={styles.tcStyle}>
            <CheckBox onPress={this.props.onTCPress}/>
            <Hyperlink linkStyle={{ color: 'white', fontSize: hp(2) }} linkText={url => url === 'https://tc.com' ? 'Terms & Conditions' : url}>
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
        {(this.props.loader) ? <View style={{alignSelf: 'center', height: hp(100), width: wp(100), justifyContent: 'center', position: 'absolute', zIndex: 1000}}><ActivityIndicator size="large" color="white" animating={this.props.loader}/></View> : null}
        </KeyboardAwareScrollView>
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
        height: hp(46),
        width: wp('100%'),
        resizeMode: 'stretch'
    },
    text1: {
        width: wp(95.8),
        color: '#ffffff',
        fontFamily: getBoldFont(),
        fontSize: hp(3),
        fontWeight: '700',
        textAlign: 'center',
        marginBottom: hp(1.5),
        alignSelf: 'center'
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
        height: hp(6),
        width: wp(67.6),
        alignSelf: 'center',
        marginTop: hp(2)
    },
    nameImage: {
        height: hp(6),
        width: wp(6),
        resizeMode: 'contain'
    },
    emailImage: {
        height: hp(6),
        width: wp(6),
        resizeMode: 'contain'
    },
    passImage: {
        height: hp(6),
        width: wp(6),
        resizeMode: 'contain'
    },
    plusImage: {
        height: hp(6),
        width: wp(6),
        resizeMode: 'contain'
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
        alignSelf: 'center',
        marginBottom: hp(3),
        paddingLeft: wp(8),
        marginTop: hp(2)
    },
    tcText: {
        fontSize: hp(1.7),
        fontWeight: '400',
        textAlign: 'center',
        color: '#59836c',
        fontFamily: getRegularFont(),
        marginTop: hp(1),
        paddingLeft: wp(.5)
      },
})