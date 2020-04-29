import React, { Component } from 'react';
import {TextInput, ActivityIndicator, TouchableOpacity, Text, Image, View, StyleSheet} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { getRegularFont, getBoldFont } from '../../../../Commons/Fonts';
import Dialogue from '../../../../Commons/Dialogue/Dialogue';

export default class LDP extends Component {
  getAMPM(time)
  {
    if(time)
    {
      let date = new Date(Number.parseInt(time, 10));
      let hours = date.getHours();

      if(hours > 10 && hours < 23)
        return 'PM';
    }

    return 'AM';
  }

  getTimeToShow(time)
  {
    if(time)
    {
      let dateCurrent = new Date(Number.parseInt(time, 10));
      let hoursCurrent = dateCurrent.getHours();

      hoursCurrent = hoursCurrent % 12;
      hoursCurrent = hoursCurrent ? hoursCurrent : 12;

      let dateNext = new Date(Number.parseInt(time, 10) + 3600000);
      let hoursNext = dateNext.getHours();

      hoursNext = hoursNext % 12;
      hoursNext = hoursNext ? hoursNext : 12;

      return hoursCurrent+'.00 to '+hoursNext+'.00';
    }

    return '';

  }

  render() {
    const backArrow = require('../../../../assets/backArrow.png');
    return (
      <LinearGradient colors={['#006b31', '#00652e', '#005e2b' , '#005326', '#004b22', '#00411e', '#003a1b', '#003619']} style={{flex: 1}}>      
        <View style={styles.background}>
            <View style={styles.topBarContainer}>
                <TouchableOpacity style={{marginLeft: wp(2), height: hp(2.8), width: wp(7.8) , backgroundColor: 'transparent', alignSelf: 'center'}} onPress={this.props.backButton}>
                    <Image source={backArrow} style={{height: hp(2.8), width: wp(7.8), resizeMode: 'contain'}}></Image>
                </TouchableOpacity>
            </View>
            <View style={{marginTop: hp(17), borderRadius: wp(80)/2, height: hp(37), width: wp(80) , backgroundColor: '#004b22'}}>
                <Image source={{uri: this.props.studentPhoto}} style={{borderRadius: wp(80)/2, height: hp(37), width: wp(80), resizeMode: 'stretch'}}/>
                <View style={{alignSelf: 'center', borderRadius: wp(50)/2, bottom: 0, alignItems: 'center', justifyContent: 'center', flexDirection: 'column', opacity: .6, position: 'absolute', backgroundColor: 'green', width: wp(50), height: hp(22.5)}}>
                    <View style={{alignItems: 'center', justifyContent: 'center', backgroundColor: 'transparent', flexDirection: 'row', width: wp(50), height: hp(3)}}>
                      <Text 
                          numberOfLines={1} style={{marginLeft: wp(1), fontSize: hp(1.8),fontWeight: '400',textAlign: 'center',color: '#ffffff',fontFamily: getRegularFont()}}>
                              {'Name : '}
                      </Text> 
                      <Text 
                          numberOfLines={1} style={{marginLeft: wp(1), fontSize: hp(1.8),fontWeight: '400',textAlign: 'center',color: '#ffffff',fontFamily: getRegularFont()}}>
                              {this.props.student.name}
                      </Text> 
                    </View>
                    <View style={{alignItems: 'center', justifyContent: 'center', backgroundColor: 'transparent', flexDirection: 'row', width: wp(50), height: hp(3)}}>
                      <Text 
                          numberOfLines={1} style={{marginLeft: wp(1), fontSize: hp(1.8),fontWeight: '400',textAlign: 'center',color: '#ffffff',fontFamily: getRegularFont()}}>
                              {'Date : '}
                      </Text> 
                      <Text 
                          numberOfLines={1} style={{marginLeft: wp(1), fontSize: hp(1.8),fontWeight: '400',textAlign: 'center',color: '#ffffff',fontFamily: getRegularFont()}}>
                              {this.props.student.showableDate}
                      </Text> 
                    </View>
                    <View style={{alignItems: 'center', justifyContent: 'center', backgroundColor: 'transparent', flexDirection: 'row', width: wp(50), height: hp(3)}}>
                      <Text 
                          numberOfLines={1} style={{marginLeft: wp(1), fontSize: hp(1.8),fontWeight: '400',textAlign: 'center',color: '#ffffff',fontFamily: getRegularFont()}}>
                              {'Time : '}
                      </Text> 
                      <Text 
                          numberOfLines={1} style={{marginLeft: wp(1), fontSize: hp(1.8),fontWeight: '400',textAlign: 'center',color: '#ffffff',fontFamily: getRegularFont()}}>
                              {this.getTimeToShow(this.props.student.date)+' '+this.getAMPM(this.props.student.date)}
                      </Text> 
                    </View>
                  </View>
            </View>
            <View style={styles.fieldMaincontainerStyle}> 
                <View style={styles.fieldInnercontainerStyle}> 
                    <TextInput onChangeText={this.props.declineMessageHandler} style={styles.inputStyle} autoCorrect={false} placeholder={'If Decline, Please Add Reason'} placeholderTextColor = "#598a6f" />
                </View>
            </View>
            <View style={{marginTop: hp(5), alignSelf: 'center', flexDirection: 'row'}}>
                <TouchableOpacity style={{alignItems: 'center', justifyContent: 'center', borderRadius: hp(40/2), marginRight: wp(3), backgroundColor: '#006b31', height: hp(18), width: wp(40)}} onPress={() => {this.props.callnow()}}>
                 <Text 
                    numberOfLines={1} style={{alignSelf: 'center', width: wp(40), fontSize: hp(2),fontWeight: '400',textAlign: 'center',color: '#ffffff',fontFamily: getRegularFont()}}>
                        {'Call Now'}
                </Text> 
                </TouchableOpacity>
                <TouchableOpacity style={{alignItems: 'center', justifyContent: 'center', borderRadius: hp(40/2), backgroundColor: 'red', height: hp(18), width: wp(40)}} onPress={() => {this.props.cancelReservation()}}>
                <Text 
                    numberOfLines={1} style={{alignSelf: 'center', width: wp(40), fontSize: hp(2),fontWeight: '400',textAlign: 'center',color: '#ffffff',fontFamily: getRegularFont()}}>
                        {'Cancel Reservation'}
                </Text> 
                </TouchableOpacity>
            </View> 
            <Dialogue/>
            {(this.props.loader) ? <View style={{alignSelf: 'center', height: hp(100), width: wp(100), justifyContent: 'center', position: 'absolute', zIndex: 1000}}><ActivityIndicator size="large" color="white" animating={this.props.loader}/></View> : null}
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
  topBarContainer: {
    width: wp(100),
    height: hp(11.5),
    flexDirection:'row',
    backgroundColor: '#5a9c79',
    position: 'absolute',
    zIndex: 1000
},
fieldMaincontainerStyle:{
  height: hp(4),
  width: wp(67.6),
  alignSelf: 'center',
  marginTop: hp(4)
  },
  fieldInnercontainerStyle:{
      width: wp(67.6)
  },
  inputStyle: {
      fontSize: hp(2),
      color: 'white',
      fontFamily: getRegularFont(),
      fontWeight: '200',
      borderBottomWidth: hp(.1),
      borderBottomColor: '#598a6f',
  },
})