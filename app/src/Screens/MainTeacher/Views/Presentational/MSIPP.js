import React, { Component } from 'react';
import {FlatList, TouchableOpacity, Text, Image, View, StyleSheet} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import Slideshow from 'react-native-image-slider-show';
import { getBoldFont, getRegularFont } from '../../../../Commons/Fonts';
import MenuDialogue from '../../../../Commons/MenuDialogue/MenuDialogue';
import ProfileDialogue from '../../../../Commons/ProfileDialogue/ProfileDialogue';
import PictureDialogue from '../../../../Commons/Dialogue/PictureDialogue';

export default class MSIP extends Component {

  render() {
    const backArrow = require('../../../../assets/backArrow.png');
    const menu = require('../../../../assets/menu.png');

    return (
      <LinearGradient colors={['#006b31', '#00652e', '#005e2b' , '#005326', '#004b22', '#00411e', '#003a1b', '#003619']} style={{flex: 1}}>      
        <View style={styles.background}>
          <View style={styles.topBarContainer}>
            <TouchableOpacity style={{marginLeft: wp(2), height: hp(2.8), width: wp(7.4) , backgroundColor: 'transparent', alignSelf: 'center'}} onPress={this.props.menuPress}>
              <Image source={menu} style={{height: hp(2.7), width: wp(7.4), resizeMode: 'contain'}}/>
            </TouchableOpacity>
            <TouchableOpacity style={{borderRadius: wp(12)/2, marginRight: wp(2), height: hp(5.9), width: wp(12) , backgroundColor: 'black', position: 'absolute', right: 0, alignSelf: 'center'}}>
              <Image source={{uri: this.props.photo}} style={{borderRadius: wp(12)/2, height: hp(5.9), width: wp(12), resizeMode: 'stretch'}}/>
            </TouchableOpacity>
          </View>
          <Slideshow dataSource = {this.props.images ? this.props.images : []} height = {hp(26.5)} width = {wp(100)}/>
          <Text 
                  style={{marginTop: hp(5), fontSize: hp(2.5),fontWeight: '700',textAlign: 'center',color: '#ffffff',fontFamily: getBoldFont()}}>
                      {this.props.currentUser ?  this.props.currentUser.name +'! thankyou for signing upto remote rider.  To protect our community of horse riders we will be in touch shortly to verify your coaching credentials.' : 'Thankyou for signing upto remote rider.  To protect our community of horse riders we will be in touch shortly to verify your coaching credentials.'}
          </Text> 
          <MenuDialogue/>
          <ProfileDialogue/>
          <PictureDialogue/>
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
  reservationsContainer: {
    width: wp(100),
    height: hp(22),
    flexDirection:'column',
    backgroundColor: 'transparent',
    marginTop: hp(2.5)
  },
  categoriesContainer: {
    width: wp(100),
    height: hp(22),
    flexDirection:'column',
    backgroundColor: 'transparent',
    marginTop: hp(6.8)
  },
})