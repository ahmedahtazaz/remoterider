import React, { Component } from 'react';
import {TouchableOpacity, Text, Image, View, StyleSheet} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { getBoldFont, getRegularFont } from '../../../../Commons/Fonts';

export default class App extends Component {

  render() {
    const welcomeImage1 = require('../../../../assets/welcomeImage1.png');
    const welcomeImage2 = require('../../../../assets/welcomeImage2.png');
    const midSectionImage = require('../../../../assets/midSectionImage.png');
    const backArrow = require('../../../../assets/backArrow.png');

    return (
      <LinearGradient colors={['#006b31', '#00652e', '#005e2b' , '#005326', '#004b22', '#00411e', '#003a1b', '#003619']} style={{flex: 1}}>      
        
            <View style={styles.topBarContainer}>
              <TouchableOpacity style={{zIndex: 1000, position: "absolute", left: 0, marginLeft: wp(2), height: hp(2.8), width: wp(7.8) , backgroundColor: 'transparent', alignSelf: 'center'}} onPress={this.props.backButton}>
                <Image source={backArrow} style={{height: hp(2.8), width: wp(7.8), resizeMode: 'contain'}}></Image>
              </TouchableOpacity>
              <View style={styles.riderTextContainer}> 
                <Text 
                  numberOfLines={1} style={styles.riderText}>
                      {'Remote Rider'}
                </Text> 
              </View> 
            </View>
            <View style={styles.container}>
            <Text 
                numberOfLines={2} style={styles.text1}>
                    {'Your app for live online riding lessons by video with instructors anywhere in the world'}
            </Text>     
            <View style={styles.containerImages1}>
                <Image source={welcomeImage1} style={styles.welcomeImage1}/>
                <Image source={welcomeImage2} style={styles.welcomeImage2}/>
            </View>   
            <View style={styles.midSectionContainer}>
                <Text 
                    style={styles.midSectionText1}>
                        {'Taking online riding lessons is as easy as 1, 2, 3'}
                </Text>  
                <Text 
                    numberOfLines={1} style={styles.midSectionText2}>
                        {'1. Sign up to the service – its free!'}
                </Text> 
                <Text 
                    numberOfLines={2} style={styles.midSectionText3}>
                        {'2. Select your instructor and schedule a lesson.'}
                </Text> 
                <Text 
                    numberOfLines={2} style={styles.midSectionText4}>
                        {'3. Tack up and be ready to ride for your lesson.'}
                </Text> 
                <Image source={midSectionImage} style={styles.midSectionImage}/>
                <Text 
                    style={styles.lMSectionText1}>
                        {'To use Remote rider you need a Apple or Android phone or tablet, a bluetooth earpiece with microphone that is connected to your phone and a buddy who will act as your camera operator.'}
                </Text>  
                <Text 
                    style={styles.lMSectionText2}>
                        {'For full instructions and tips for how to use remote rider visit us at www.remoterider.app'}
                </Text> 
                <TouchableOpacity style={styles.signInButton} onPress={this.props.signInHandler}>
                  <Text 
                      numberOfLines={1} style={styles.buttonText}>
                          {'Sign In'}
                  </Text> 
              </TouchableOpacity>
              <TouchableOpacity style={styles.signUpButton} onPress={this.props.signUpHandler}>
                <Text 
                    numberOfLines={1} style={styles.buttonText}>
                        {'Sign Up'}
                </Text> 
          </TouchableOpacity>
            </View>
        </View>
      </LinearGradient>);
  }
}

// Style for "Background"
const styles = StyleSheet.create({
  topBarContainer: {
    width: wp(100),
    height: hp(11.5),
    flexDirection:'row',
    backgroundColor: '#5a9c79'
  },
  container: {
    width: wp('100%'),
    height: hp('100%'),
    flexDirection:'column',
    alignItems: 'center'
  },
  containerImages1: {
    width: wp('100%'),
    height: hp(13),
    flexDirection:'row',
    alignItems: 'center',
    paddingLeft: wp(4.5),
    paddingRight: wp(4.5),
  },
  midSectionContainer: {
    width: wp('100%'),
    height: hp(70),
    flexDirection:'column',
    alignItems: 'center',
    paddingLeft: wp(1.9),
    paddingRight: wp(1.9),
  },
  midSectionText1: {
    color: '#ffffff',
    fontFamily: getBoldFont(),
    fontSize: hp(2),
    fontWeight: '700',
    textAlign: 'center',
  },
  midSectionText2: {
    color: '#ffffff',
    width: wp(75.6),
    fontFamily: getRegularFont(),
    fontSize: hp(2),
    fontWeight: '400',
    textAlign: 'center',
    marginTop: hp(1)
  },
  midSectionText3: {
    color: '#ffffff',
    width: wp(75),
    fontFamily: getRegularFont(),
    fontSize: hp(2),
    fontWeight: '400',
    textAlign: 'center'
  },
  midSectionText4: {
    color: '#ffffff',
    width: wp(75),
    fontFamily: getRegularFont(),
    fontSize: hp(2),
    fontWeight: '400',
    textAlign: 'center'
  },
  midSectionImage: {
    width: wp('42.9%'),
    height: hp(18),
    resizeMode: 'contain',
    marginTop: hp(1)
  },
  lMSectionText1: {
    color: '#ffffff',
    width: wp(77.5),
    fontFamily: getRegularFont(),
    fontSize: hp(2),
    height: hp(14),
    fontWeight: '400',
    textAlign: 'center',
    marginLeft: wp(11),
    marginRight: wp(11),
    marginTop: hp(1)
  },
  lMSectionText2: {
    color: '#ffffff',
    width: wp(77.5),
    height: hp(6),
    fontFamily: getRegularFont(),
    fontSize: hp(1.8),
    fontWeight: '400',
    textAlign: 'center',
    marginLeft: wp(11),
    marginRight: wp(11),
  },
  welcomeImage1: {
    width: wp('42.5%'),
    resizeMode: 'contain',
    height: hp(13),
  },
  welcomeImage2: {
    width: wp('42.5%'),
    resizeMode: 'contain',
    height: hp(13),
    marginLeft: wp(5.8),
  },
  riderTextContainer: {
      backgroundColor: 'transparent',
      position: "absolute", 
      left: 0, 
      right: 0, 
      alignItems: "center",
      justifyContent: 'center',
      height: hp(11.5),
  },
  riderText: {
    color: '#ffffff',
    fontFamily: getBoldFont(),
    fontSize: hp(4),
    fontWeight: '700',
    alignSelf: 'center'
  },
  text1: {
    color: '#ffffff',
    fontFamily: getRegularFont(),
    fontSize: hp(2),
    fontWeight: '400',
    textAlign: 'center'
  },
  signInButton: {
    justifyContent: "center",
    width: wp(53),
    borderRadius: hp(1),
    backgroundColor: '#5a9c79',
    height: hp(5),
  },
  buttonText: {
    fontSize: hp(2.5),
    fontWeight: '700',
    textAlign: 'center',
    color: '#ffffff',
    fontFamily: getBoldFont()
  },
  signUpButton: {
    justifyContent: "center",
    width: wp(53),
    borderRadius: hp(1),
    backgroundColor: '#006b31',
    height: hp(5),
    marginTop: hp(1)
  },
})