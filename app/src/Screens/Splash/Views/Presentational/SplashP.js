import React, { Component } from 'react';
import {Text, Image, View, StyleSheet} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

export default class App extends Component {

  render() {
    const topStyle = require('../../../../assets/TopStyle.png');
    const horseShoe = require('../../../../assets/horseShoe.png');

    return (
      <LinearGradient colors={['#006b31', '#00652e', '#005e2b' , '#005326', '#004b22', '#00411e', '#003a1b', '#003619']} style={{flex: 1}}>      
        <View style={styles.background}>
          <Image source={topStyle} style={styles.fitImageWithSize}/>
          <Image source={horseShoe} style={styles.horseShoe}/>
          <Text 
              numberOfLines={1} style={styles.riderText}>
                  {'Remote Rider'}
          </Text>
        </View>
      </LinearGradient>);
  }
}

// Style for "Background"
const styles = StyleSheet.create({
  background: {
    width: wp('100%'),
    height: hp('100%'),
    flex:1, 
    flexDirection:'column',
    alignItems: 'center'
  },
  fitImageWithSize: {
      width: wp('100%'),
      height: hp('59%'),
      resizeMode: 'stretch'
  },
  horseShoe: {
    width: wp('53%'),
    height: hp('24%'),
    resizeMode: 'contain'
  },
  riderText: {
    color: '#ffffff',
    fontFamily: 'corbel_b.ttf',
    fontSize: 50,
    fontWeight: '700'
  },
})