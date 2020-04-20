import React, { Component } from 'react';
import {TouchableOpacity, Text, Image, View, StyleSheet} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { getBoldFont, getRegularFont } from '../../../../Commons/Fonts';
import { ScrollView } from 'react-native-gesture-handler';

export default class TCP extends Component {

  render() {
    const backArrow = require('../../../../assets/backArrow.png');

    return (
      <LinearGradient colors={['#006b31', '#00652e', '#005e2b' , '#005326', '#004b22', '#00411e', '#003a1b', '#003619']} style={{flex: 1}}>      
        <ScrollView keyboardShouldPersistTaps="always">
        <View style={styles.topBarContainer}>
            <TouchableOpacity style={{marginLeft: wp(2), height: hp(2.8), width: wp(7.8) , backgroundColor: 'transparent', alignSelf: 'center'}} onPress={this.props.backButton}>
            <Image source={backArrow} style={{height: hp(2.8), width: wp(7.8), resizeMode: 'contain'}}></Image>
            </TouchableOpacity>
        </View>
        <Text 
            numberOfLines={1} style={styles.text1}>
                {'Terms And Conditions'}
        </Text>  
        <Text 
            style={styles.text2}>
                {this.props.tcText ? this.props.tcText : ''}
        </Text>    
        </ScrollView>
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
    },
    text1: {
        width: wp(95.8),
        color: '#ffffff',
        fontFamily: getBoldFont(),
        fontSize: hp(3),
        fontWeight: '700',
        textAlign: 'center',
        marginTop: hp(2)
    },
    text2: {
        width: wp(95.8),
        color: '#ffffff',
        fontFamily: getRegularFont(),
        fontSize: hp(2.5),
        fontWeight: '400',
        textAlign: 'center',
        marginTop: hp(3)
    },
})