import React, { Component } from 'react';
import {TouchableOpacity, Text, Image, View, StyleSheet} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import Slideshow from 'react-native-image-slider-show';
import FitImage from 'react-native-fit-image';

export default class MSP extends Component {

  render() {
    const backArrow = require('../../../../assets/backArrow.png');
    const menu = require('../../../../assets/menu.png');

    return (
      <LinearGradient colors={['#006b31', '#00652e', '#005e2b' , '#005326', '#004b22', '#00411e', '#003a1b', '#003619']} style={{flex: 1}}>      
        <View style={styles.background}>
          <View style={styles.topBarContainer}>
            <TouchableOpacity style={{marginLeft: wp(2), height: hp(2.8), width: wp(7.8) , backgroundColor: 'transparent', alignSelf: 'center'}} onPress={this.props.backButton}>
              <Image source={backArrow} style={{height: hp(2.8), width: wp(7.8), resizeMode: 'contain'}}></Image>
            </TouchableOpacity>
            <TouchableOpacity style={{marginLeft: wp(2), height: hp(2.8), width: wp(7.4) , backgroundColor: 'transparent', alignSelf: 'center'}} onPress={this.props.menuPress}>
              <Image source={menu} style={{height: hp(2.7), width: wp(7.4), resizeMode: 'contain'}}/>
            </TouchableOpacity>
            <TouchableOpacity style={{borderRadius: wp(12)/2, marginRight: wp(2), height: hp(5.9), width: wp(12) , backgroundColor: 'transparent', position: 'absolute', right: 0, alignSelf: 'center'}} onPress={this.props.profilePress}>
              <Image source={{uri: this.props.photo}} style={{borderRadius: wp(12)/2, height: hp(5.9), width: wp(12), resizeMode: 'stretch'}}/>
            </TouchableOpacity>
          </View>
          <Slideshow dataSource = {this.props.images ? this.props.images : []} height = {hp(26.5)} width = {wp(100)}/>
        </View>
      </LinearGradient>);
  }
}

// Style for "Background"
const styles = StyleSheet.create({
  background: {
    width: wp('100%'),
    height: hp('100%'),
    flexDirection:'column',
    alignItems: 'center'
  },
  topBarContainer: {
    width: wp(100),
    height: hp(11.5),
    flexDirection:'row',
    backgroundColor: '#5a9c79'
  },
})