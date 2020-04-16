import React, { Component } from 'react';
import {TextInput, TouchableOpacity, Text, Image, View, StyleSheet, ActivityIndicator} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import Dialogue from '../../../../Commons/Dialogue/Dialogue';
import { getBoldFont, getRegularFont } from '../../../../Commons/Fonts';

export default class SignInP extends Component {

  render() {
    const topStyle = require('../../../../assets/TopStyle.png');
    const emailImage = require('../../../../assets/emailImage.png');
    const passImage = require('../../../../assets/passImage.png');
    const backArrow = require('../../../../assets/backArrow.png');

    return (
        <KeyboardAwareScrollView
      contentContainerStyle={{flexGrow: 1}}
    >
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

        <TouchableOpacity style={styles.forgotPasswordContainer} onPress={this.props.forgotPasswordHandler}>
            <Text 
                numberOfLines={1} style={styles.forgotText}>
                    {'Forgot Password?'}
            </Text> 
        </TouchableOpacity>

        <TouchableOpacity style={styles.signInButton} onPress={this.props.signInButtonHandler}>
            <Text 
                numberOfLines={1} style={styles.buttonText}>
                    {'Sign In'}
            </Text> 
        </TouchableOpacity>
        <Dialogue/>
        {(this.props.loader) ? <View style={{alignSelf: 'center', height: hp(100), width: wp(100), justifyContent: 'center', position: 'absolute', zIndex: 1000}}><ActivityIndicator size="large" color="white" animating={this.props.loader}/></View> : null}
      </LinearGradient></KeyboardAwareScrollView>);
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
        height: hp(59),
        width: wp('100%'),
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
        textAlign: 'center',
        marginBottom: hp(1.5)
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
        alignSelf: 'center',
        marginBottom: hp(5),
        marginTop: hp(1)
    },
    fieldMaincontainerStyle:{
        flexDirection: 'row',
        height: hp(6),
        width: wp(67.6),
        alignSelf: 'center',
        marginTop: hp(2)
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
    forgotText: {
        fontSize: hp(2),
        fontWeight: '700',
        textAlign: 'center',
        color: '#ffffff',
        fontFamily: getBoldFont()
    },
    forgotPasswordContainer: {
        justifyContent: "center",
        width: wp(55),
        borderRadius: hp(1),
        backgroundColor: 'transparent',
        height: hp(5.5),
        marginTop: hp(1),
        alignSelf: 'center',
        marginBottom: hp(1),
    },
})