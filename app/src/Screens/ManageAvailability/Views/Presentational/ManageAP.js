import React, { Component } from 'react';
import {ActivityIndicator, TextInput, FlatList, TouchableOpacity, Text, Image, View, StyleSheet} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { getBoldFont, getRegularFont } from '../../../../Commons/Fonts';
import Calendar from '../../../Calendar/Calendar';
import Dialog from '../../../../Commons/Dialogue/Dialogue';
import { ScrollView } from 'react-native-gesture-handler';
import PictureDialogue from '../../../../Commons/Dialogue/PictureDialogue';

export default class ManageAP extends Component {

  getSlotsView(status, item, index)
  {
        switch(status)
        {
            case "available":
                return (<TouchableOpacity style={{alignItems: 'center', justifyContent: 'center', borderRadius: hp(1), backgroundColor: '#5a9c79', height: hp(4), width: wp(30)}} onPress={() => {this.props.onTimeSlotClick(item, index)}}>
                    <Text 
                    numberOfLines={1} style={{marginTop: hp(.8), alignSelf: 'center', width: wp(35), fontSize: hp(1.8),fontWeight: '400',textAlign: 'center',color: '#ffffff',fontFamily: getRegularFont()}}>
                        {'Available'}
                    </Text> 
                </TouchableOpacity>);
            case "unavailable":
                return (<TouchableOpacity style={{alignItems: 'center', justifyContent: 'center', borderRadius: hp(1), backgroundColor: 'red', height: hp(4), width: wp(30)}} onPress={() => {this.props.onTimeSlotClick(item, index)}}>
                    <Text 
                    numberOfLines={1} style={{marginTop: hp(.8), alignSelf: 'center', width: wp(35), fontSize: hp(1.8),fontWeight: '400',textAlign: 'center',color: '#ffffff',fontFamily: getRegularFont()}}>
                        {'Un Available'}
                    </Text> 
                </TouchableOpacity>);
            case "pending":
            return (<TouchableOpacity style={{alignItems: 'center', justifyContent: 'center', borderRadius: hp(1), backgroundColor: 'yellow', height: hp(4), width: wp(30)}} onPress={() => {this.props.onPendingTimeSlotClick(item, index)}}>
                <Text 
                numberOfLines={1} style={{marginTop: hp(.8), alignSelf: 'center', width: wp(35), fontSize: hp(1.8),fontWeight: '400',textAlign: 'center',color: '#ffffff',fontFamily: getRegularFont()}}>
                    {'Pending'}
                </Text> 
            </TouchableOpacity>);
            case "confirmed":
            return (<TouchableOpacity style={{alignItems: 'center', justifyContent: 'center', borderRadius: hp(1), backgroundColor: 'green', height: hp(4), width: wp(30)}} onPress={() => {}}>
                <Text 
                numberOfLines={1} style={{marginTop: hp(.8), alignSelf: 'center', width: wp(35), fontSize: hp(1.8),fontWeight: '400',textAlign: 'center',color: '#ffffff',fontFamily: getRegularFont()}}>
                    {'Confirmed'}
                </Text> 
            </TouchableOpacity>);
        }
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
          {(!this.props.instructor.cost) ?
            <Text 
            numberOfLines={2} style={{marginTop: hp(1), fontSize: hp(2.2),fontWeight: '700',textAlign: 'center',color: '#ffffff',fontFamily: getBoldFont()}}>
                {this.props.instructor.name+'! Welcome to Remote Rider'}
            </Text>  : null}  
          <TouchableOpacity style={{alignSelf: 'center', marginTop: hp(1), backgroundColor: 'transparent', height: hp(16), width: wp(61.3)}}>
            <Image source={{uri: this.props.photo}} style={{height: hp(16), width: wp(61.3), resizeMode: 'stretch'}}/>    
            {(this.props.instructor.cost) ?
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
          </View> : null} 
          </TouchableOpacity>
          {(!this.props.instructor.cost) ?
          <View style={{alignSelf: 'center', width: wp(67.6), height: hp(30)}}> 
            <View style={styles.fieldMaincontainerStyle}> 
                <View style={styles.fieldInnercontainerStyle}> 
                    <TextInput onChangeText={this.props.costHandler} style={styles.inputStyle} autoCorrect={false} placeholder={'Please Add Your Lesson Cost'} placeholderTextColor = "#598a6f" />
                </View>
            </View>
            <View style={styles.fieldMaincontainerStyle}> 
                <View style={styles.fieldInnercontainerStyle}> 
                    <TextInput onChangeText={this.props.currencyHandler} style={styles.inputStyle} autoCorrect={false} placeholder={'Please Add Curreny eg. USD'} placeholderTextColor = "#598a6f" />
                </View>
            </View>
            <View style={{marginTop: hp(3), alignSelf: 'center', height:hp(10), flexDirection: 'row'}}>
                <TouchableOpacity style={{alignItems: 'center', justifyContent: 'center', borderRadius: hp(1), marginRight: wp(3), backgroundColor: '#006b31', height: hp(4), width: wp(35)}} onPress={() => {this.props.onCostConfirm()}}>
                 <Text 
                    numberOfLines={1} style={{marginTop: hp(.8), alignSelf: 'center', width: wp(35), fontSize: hp(2.5),fontWeight: '400',textAlign: 'center',color: '#ffffff',fontFamily: getRegularFont()}}>
                        {'Confirm'}
                </Text> 
                </TouchableOpacity>
            </View> 
        </View>  : null}
        {(this.props.instructor.cost) ? 
            <View style={{height: hp(45), alignSelf: 'center'}}>
            <Text 
                numberOfLines={1} style={{height: hp(3), marginTop: hp(2), fontSize: hp(2.2),fontWeight: '700',color: '#ffffff',fontFamily: getBoldFont()}}>
                    {'Choose The Date of Your Availability'}
            </Text> 
            <Calendar onDateChange={this.props.onDateChange}/>
        </View> : null} 
          {(this.props.availableTimeSlots) ? 
          <View style={{height:hp(21), marginTop: hp(2), flexDirection: 'column'}}>
          <Text 
            numberOfLines={1} style={{height: hp(3), marginLeft: wp(3), fontSize: hp(2.2),fontWeight: '700',color: '#ffffff',fontFamily: getBoldFont()}}>
                {'Choose Your Available Hours'}
          </Text>
          <FlatList contentContainerStyle={{ marginLeft: wp(3),marginTop: hp(1),flexGrow: 1 }}
            data={this.props.availableTimeSlots} 
            renderItem={
              ({ item, index }) => { return(
                <TouchableOpacity style={{alignItems: 'center', justifyContent: 'center', borderRadius: hp(2), marginRight: wp(3), backgroundColor: 'transparent', height: hp(10), width: wp(40)}} onPress={() => {this.props.onTimeSlotClick(item, index)}}>
                 <View style={{alignItems: 'center', justifyContent: 'center', borderRadius: hp(2), backgroundColor: '#006b31', flexDirection: 'column', width: wp(40), height: hp(10)}}>
                    <Text 
                        numberOfLines={1} style={{width: wp(40), marginLeft: wp(1), fontSize: hp(1.8),fontWeight: '400',textAlign: 'center',color: '#ffffff',fontFamily: getRegularFont()}}>
                            {item.showAbleTime}
                    </Text> 
                    {this.getSlotsView(item.status, item, index)}  
                 </View>
                </TouchableOpacity>
              )}
            }
            horizontal={true}
            keyExtractor={(item, index) => index.toString()}/>
            {(this.props.selectedSlot !== undefined) ? 
            <View style={{alignSelf: 'center', flexDirection: 'row'}}>
                <TouchableOpacity style={{alignItems: 'center', justifyContent: 'center', borderRadius: hp(1), marginRight: wp(3), backgroundColor: '#006b31', height: hp(4), width: wp(35)}} onPress={() => {this.props.onAvailabilityConfirm()}}>
                 <Text 
                    numberOfLines={1} style={{marginTop: hp(.8), alignSelf: 'center', width: wp(35), fontSize: hp(2.5),fontWeight: '400',textAlign: 'center',color: '#ffffff',fontFamily: getRegularFont()}}>
                        {'Confirm'}
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
          <PictureDialogue/>
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
    height: hp('100%'),
    flexDirection:'column'
  },
  topBarContainer: {
    width: wp(100),
    height: hp(11.5),
    flexDirection:'row',
    backgroundColor: '#5a9c79'
  },
  fieldMaincontainerStyle:{
    height: hp(4),
    width: wp(67.6),
    alignSelf: 'center',
    marginTop: hp(1)
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