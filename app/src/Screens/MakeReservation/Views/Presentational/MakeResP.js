import React, { Component } from 'react';
import {ActivityIndicator, FlatList, TouchableOpacity, Text, Image, View, StyleSheet} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { getBoldFont, getRegularFont } from '../../../../Commons/Fonts';
import Calendar from '../../../Calendar/Calendar';
import Dialog from '../../../../Commons/Dialogue/Dialogue';
import { ScrollView } from 'react-native-gesture-handler';

export default class MakeResP extends Component {

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
    const menu = require('../../../../assets/menu.png');
    
    return (
      <LinearGradient colors={['#006b31', '#00652e', '#005e2b' , '#005326', '#004b22', '#00411e', '#003a1b', '#003619']} style={{flex: 1}}>      
        <ScrollView style={{flex: 1}}>
        <View style={styles.background}>
          <View style={styles.topBarContainer}>
            <TouchableOpacity style={{marginLeft: wp(2), height: hp(2.8), width: wp(7.8) , backgroundColor: 'transparent', alignSelf: 'center'}} onPress={this.props.backButton}>
              <Image source={backArrow} style={{height: hp(2.8), width: wp(7.8), resizeMode: 'contain'}}></Image>
            </TouchableOpacity>
          </View>  
          <Text 
            numberOfLines={2} style={{marginTop: hp(1), fontSize: hp(2.2),fontWeight: '700',textAlign: 'center',color: '#ffffff',fontFamily: getBoldFont()}}>
                {'Request your Lesson with '+this.props.instructor.name}
          </Text>   
          <TouchableOpacity style={{alignSelf: 'center', marginTop: hp(1), backgroundColor: 'transparent', height: hp(14), width: wp(61.3)}}>
            <Image source={{uri: this.props.instructorPhoto}} style={{height: hp(14), width: wp(61.3), resizeMode: 'stretch'}}/>    
            <View style={{alignItems: 'center', justifyContent: 'center', flexDirection: 'column', opacity: .6, position: 'absolute', backgroundColor: '#006b31', width: wp(61.3), height: hp(16)}}>
                    <View style={{alignItems: 'center', justifyContent: 'center', backgroundColor: 'transparent', flexDirection: 'row', width: wp(61.3), height: hp(3)}}>
                      <Text 
                          numberOfLines={1} style={{marginLeft: wp(1), fontSize: hp(2),fontWeight: '400',textAlign: 'center',color: '#ffffff',fontFamily: getRegularFont()}}>
                              {'Cost : '}
                      </Text> 
                      <Text 
                          numberOfLines={1} style={{marginLeft: wp(1), fontSize: hp(2),fontWeight: '400',textAlign: 'center',color: '#ffffff',fontFamily: getRegularFont()}}>
                              {this.props.instructor.cost}
                      </Text> 
                    </View>
                  </View>
          </TouchableOpacity>
          <Text 
            numberOfLines={1} style={{height: hp(3), marginLeft: wp(3), marginTop: hp(2), fontSize: hp(2.2),fontWeight: '700',color: '#ffffff',fontFamily: getBoldFont()}}>
                {'Choose The Date For Your Lesson'}
          </Text> 
          <Calendar onDateChange={this.props.onDateChange}/>
          {(this.props.availableTimeSlots) ? 
          <View style={{height:hp(21), marginTop: hp(.1), flexDirection: 'column'}}>
          <Text 
            numberOfLines={1} style={{height: hp(3), marginLeft: wp(3), fontSize: hp(2.2),fontWeight: '700',color: '#ffffff',fontFamily: getBoldFont()}}>
                { this.props.availableTimeSlots.length > 0 ? 'Available Lesson Times' : 'No Availability'}
          </Text>
          <FlatList contentContainerStyle={{ marginLeft: wp(3),marginTop: hp(1),flexGrow: 1 }}
            data={this.props.availableTimeSlots} 
            renderItem={
              ({ item, index }) => { return(
                <TouchableOpacity style={{borderRadius: hp(2), marginRight: wp(3), backgroundColor: 'transparent', height: hp(5), width: wp(40)}} onPress={() => {this.props.onTimeSlotClick(item, index)}}>
                 {(this.props.selectedSlot !== undefined && this.props.selectedSlot === index) ?
                 <View style={{borderRadius: hp(2),  alignItems: 'center', justifyContent: 'center', backgroundColor: '#5a9c79', flexDirection: 'row', width: wp(40), height: hp(5)}}>
                 <Text 
                     numberOfLines={1} style={{width: wp(40), marginLeft: wp(1), fontSize: hp(1.8),fontWeight: '400',textAlign: 'center',color: '#ffffff',fontFamily: getRegularFont()}}>
                         {this.getTimeToShow(item.time)+' '+this.getAMPM(item.time)}
                 </Text> 
             </View> :
             <View style={{borderRadius: hp(2),  alignItems: 'center', justifyContent: 'center', backgroundColor: '#006b31', flexDirection: 'row', width: wp(40), height: hp(5)}}>
                <Text 
                    numberOfLines={1} style={{width: wp(40), marginLeft: wp(1), fontSize: hp(1.8),fontWeight: '400',textAlign: 'center',color: '#ffffff',fontFamily: getRegularFont()}}>
                        {this.getTimeToShow(item.time)+' '+this.getAMPM(item.time)}
                </Text> 
            </View>}
                </TouchableOpacity>
              )}
            }
            horizontal={true}
            keyExtractor={(item, index) => index.toString()}/>
            {(this.props.selectedSlot !== undefined) ? 
            <View style={{alignSelf: 'center', height:hp(10), flexDirection: 'row'}}>
                <TouchableOpacity style={{alignItems: 'center', justifyContent: 'center', borderRadius: hp(1), marginRight: wp(3), backgroundColor: '#006b31', height: hp(4), width: wp(35)}} onPress={() => {this.props.onConfirm(this.props.selectedSlot)}}>
                 <Text 
                    numberOfLines={1} style={{marginTop: hp(.8), alignSelf: 'center', width: wp(35), fontSize: hp(2.5),fontWeight: '400',textAlign: 'center',color: '#ffffff',fontFamily: getRegularFont()}}>
                        {'Request'}
                </Text> 
                </TouchableOpacity>
                <TouchableOpacity style={{alignItems: 'center', justifyContent: 'center', borderRadius: hp(1), marginRight: wp(3), backgroundColor: 'red', height: hp(4), width: wp(35)}} onPress={() => {this.props.Cancel()}}>
                <Text 
                    numberOfLines={1} style={{marginTop: hp(.8), alignSelf: 'center', width: wp(35), fontSize: hp(2.5),fontWeight: '400',textAlign: 'center',color: '#ffffff',fontFamily: getRegularFont()}}>
                        {'Cancel'}
                </Text> 
                </TouchableOpacity>
            </View> : 
            null}
            </View> :
          null}
          <Dialog/>
          {(this.props.loader) ? <View style={{alignSelf: 'center', height: hp(100), width: wp(100), justifyContent: 'center', position: 'absolute', zIndex: 1000}}><ActivityIndicator size="large" color="white" animating={this.props.loader}/></View> : null}
        </View>
        </ScrollView>
      </LinearGradient>);
  }
}

// Style for "Background"
const styles = StyleSheet.create({
  background: {
    width: wp('100%'),
    flexDirection:'column'
  },
  topBarContainer: {
    width: wp(100),
    height: hp(11.5),
    flexDirection:'row',
    backgroundColor: '#5a9c79'
  },
})