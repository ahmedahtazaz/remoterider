import React, { Component } from 'react';
import {Linking, TouchableOpacity, Text, Image, View, StyleSheet, ActivityIndicator} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import Hyperlink from 'react-native-hyperlink';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import CheckBox from '../../../../Commons/CheckBox/CheckBox';
import Dialogue from '../../../../Commons/Dialogue/Dialogue';
import { getBoldFont, getRegularFont } from '../../../../Commons/Fonts';

export default class UTVP extends Component {

  render() {
    const backArrow = require('../../../../assets/backArrow.png');
    return (
        <KeyboardAwareScrollView
      contentContainerStyle={{flexGrow: 1}}
      keyboardShouldPersistTaps="always"
    >
      <LinearGradient colors={['#006b31', '#00652e', '#005e2b' , '#005326', '#004b22', '#00411e', '#003a1b', '#003619']} style={{flex: 1}}>      
        <View style={styles.topBarContainer}>
            <TouchableOpacity style={{marginLeft: wp(2), height: hp(2.8), width: wp(7.8) , backgroundColor: 'transparent', alignSelf: 'center'}} onPress={this.props.backButton}>
            <Image source={backArrow} style={{height: hp(2.8), width: wp(7.8), resizeMode: 'contain'}}></Image>
            </TouchableOpacity>
        </View>

        <View style={styles.fieldMaincontainerStyle}> 
            <Text 
                style={styles.text1}>
                    {'Name : '}
            </Text> 
            <Text 
                style={styles.text2}>
                    {this.props.currentUser ? this.props.currentUser.name : ''}
            </Text> 
        </View>
        <View style={styles.fieldMaincontainerStyle}> 
            <Text 
                style={styles.text1}>
                    {'Email : '}
            </Text> 
            <Text 
                style={styles.text2}>
                    {this.props.currentUser ? this.props.currentUser.email : ''}
            </Text> 
        </View>
        <View style={styles.fieldMaincontainerStyle}> 
            <Text 
                style={styles.text1}>
                    {'Lesson Credits : '}
            </Text> 
            <Text 
                style={styles.text2}>
                    {this.props.currentUser ? this.props.currentUser.lessonCredit : ''}
            </Text> 
        </View>
        <View style={styles.fieldMaincontainerStyle}> 
            <Text 
                style={styles.text1}>
                    {'Lesson Cost : '}
            </Text> 
            <Text 
                style={styles.text2}>
                    {this.props.currentUser ? this.props.currentUser.cost : ''}
            </Text> 
        </View>
        <TouchableOpacity style={styles.signInButton} onPress={this.props.updateHandler}>
            <Text 
                numberOfLines={1} style={styles.buttonText}>
                    {'Update Profile'}
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
    },
    text1: {
        color: '#ffffff',
        fontFamily: getBoldFont(),
        fontSize: hp(2),
        fontWeight: '700',
        textAlign: 'center',
    },
    text2: {
        color: '#ffffff',
        fontFamily: getBoldFont(),
        fontSize: hp(2),
        fontWeight: '700',
        textAlign: 'center',
        width: wp(60),
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
    fieldMaincontainerStyle:{
        flexDirection: 'row',
        height: hp(5),
        width: wp(67.6),
        alignSelf: 'center',
        marginTop: hp(2)
    },
})