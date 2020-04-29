import React, { Component } from 'react';
import {ActivityIndicator, FlatList, TouchableOpacity, Text, Image, View, StyleSheet} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import Slideshow from 'react-native-image-slider-show';
import { getBoldFont, getRegularFont } from '../../../../Commons/Fonts';
import MenuDialogue from '../../../../Commons/MenuDialogue/MenuDialogue';
import ProfileDialogue from '../../../../Commons/ProfileDialogue/ProfileDialogue';
import PictureDialogue from '../../../../Commons/Dialogue/PictureDialogue';
import Dialogue from '../../../../Commons/Dialogue/Dialogue';

export default class MSIP extends Component {

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
        <View style={styles.background}>
          <View style={styles.topBarContainer}>
            <TouchableOpacity style={{marginLeft: wp(2), height: hp(2.8), width: wp(7.4) , backgroundColor: 'transparent', alignSelf: 'center'}} onPress={this.props.menuPress}>
              <Image source={menu} style={{height: hp(2.7), width: wp(7.4), resizeMode: 'contain'}}/>
            </TouchableOpacity>
            <TouchableOpacity style={{borderRadius: wp(12)/2, marginRight: wp(2), height: hp(5.9), width: wp(12) , backgroundColor: 'black', position: 'absolute', right: 0, alignSelf: 'center'}} onPress={this.props.picturePress}>
              <Image source={{uri: this.props.photo}} style={{borderRadius: wp(12)/2, height: hp(5.9), width: wp(12), resizeMode: 'stretch'}}/>
            </TouchableOpacity>
            <TouchableOpacity style={{justifyContent: "center",borderRadius: hp(1), marginRight: wp(17), height: hp(4.5), width: wp(32) , backgroundColor: '#006b31', position: 'absolute', right: 0, alignSelf: 'center'}} onPress={this.props.availabilityPress}>
              <Text 
                  numberOfLines={1} style={{fontSize: hp(1.4),fontWeight: '700',textAlign: 'center',color: '#ffffff',fontFamily: getBoldFont()}}>
                      {'Manage Availability'}
              </Text> 
            </TouchableOpacity>
            <TouchableOpacity style={{justifyContent: "center",borderRadius: hp(1), marginRight: wp(52), height: hp(4.5), width: wp(32) , backgroundColor: '#006b31', position: 'absolute', right: 0, alignSelf: 'center'}} onPress={this.props.updateCredit}>
              <Text 
                  numberOfLines={1} style={{fontSize: hp(1.4),fontWeight: '700',textAlign: 'center',color: '#ffffff',fontFamily: getBoldFont()}}>
                      {this.props.currentUser ?  'Credit : '+this.props.currentUser.lessonCredit : 'Update Credit'}
              </Text> 
            </TouchableOpacity>
          </View>
          <Slideshow dataSource = {this.props.images ? this.props.images : []} height = {hp(26.5)} width = {wp(100)}/>
          <Text 
                  numberOfLines={1} style={{marginTop: hp(1), fontSize: hp(3),fontWeight: '700',textAlign: 'center',color: '#ffffff',fontFamily: getBoldFont()}}>
                      {this.props.currentUser ?  this.props.currentUser.name : ''}
          </Text> 
          <View style={styles.reservationsContainer}>

            <Text 
                numberOfLines={2} style={{marginLeft: wp(3), position: 'absolute', left: 0, fontSize: hp(2.5),fontWeight: '700',textAlign: 'center',color: '#ffffff',fontFamily: getBoldFont()}}>
                    {'Scheduled Lessons – please select the lesson to video call your pupil'}
            </Text> 

            {(this.props.scheduled) ? 
            <FlatList contentContainerStyle={{ marginLeft: wp(3),marginTop: hp(7),flexGrow: 1 }}
            data={this.props.scheduled} 
            renderItem={
              ({ item, index }) => { return( 
                <TouchableOpacity style={{marginRight: wp(3), backgroundColor: 'transparent', height: hp(16), width: wp(61.3)}} onPress={ () => {this.props.onScheduledLessonsClick(item, index)}}>
                  <Image source={{uri: this.props.scheduled.photos[index]}} style={{height: hp(16), width: wp(61.3), resizeMode: 'stretch'}}/>
                  <View style={{top: 0, alignItems: 'center', justifyContent: 'center', flexDirection: 'column', opacity: .6, position: 'absolute', backgroundColor: 'green', width: wp(61.3), height: hp(12)}}>
                    <View style={{alignItems: 'center', justifyContent: 'center', backgroundColor: 'transparent', flexDirection: 'row', width: wp(61.3), height: hp(3)}}>
                      <Text 
                          numberOfLines={1} style={{marginLeft: wp(1), fontSize: hp(1.8),fontWeight: '400',textAlign: 'center',color: '#ffffff',fontFamily: getRegularFont()}}>
                              {'Name : '}
                      </Text> 
                      <Text 
                          numberOfLines={1} style={{marginLeft: wp(1), fontSize: hp(1.8),fontWeight: '400',textAlign: 'center',color: '#ffffff',fontFamily: getRegularFont()}}>
                              {item.name}
                      </Text> 
                    </View>
                    <View style={{alignItems: 'center', justifyContent: 'center', backgroundColor: 'transparent', flexDirection: 'row', width: wp(61.3), height: hp(3)}}>
                      <Text 
                          numberOfLines={1} style={{marginLeft: wp(1), fontSize: hp(1.8),fontWeight: '400',textAlign: 'center',color: '#ffffff',fontFamily: getRegularFont()}}>
                              {'Date : '}
                      </Text> 
                      <Text 
                          numberOfLines={1} style={{marginLeft: wp(1), fontSize: hp(1.8),fontWeight: '400',textAlign: 'center',color: '#ffffff',fontFamily: getRegularFont()}}>
                              {item.showableDate}
                      </Text> 
                    </View>
                    <View style={{alignItems: 'center', justifyContent: 'center', backgroundColor: 'transparent', flexDirection: 'row', width: wp(61.3), height: hp(3)}}>
                      <Text 
                          numberOfLines={1} style={{marginLeft: wp(1), fontSize: hp(1.8),fontWeight: '400',textAlign: 'center',color: '#ffffff',fontFamily: getRegularFont()}}>
                              {'Time : '}
                      </Text> 
                      <Text 
                          numberOfLines={1} style={{marginLeft: wp(1), fontSize: hp(1.8),fontWeight: '400',textAlign: 'center',color: '#ffffff',fontFamily: getRegularFont()}}>
                              {this.getTimeToShow(item.date)+' '+this.getAMPM(item.date)}
                      </Text> 
                    </View>
                  </View>
                  {(item.declined && item.declined.toString() === 'true') ? <View style={{bottom:0, alignItems: 'center', justifyContent: 'center', flexDirection: 'row', opacity: 1, position: 'absolute', backgroundColor: 'red', width: wp(61.3), height: hp(4)}}>
                  <Text 
                          numberOfLines={1} style={{width: wp(61.3), fontSize: hp(2),fontWeight: '400',textAlign: 'center',color: '#ffffff',fontFamily: getRegularFont()}}>
                              {'Cancelled' }
                      </Text> 
                  </View> : <View style={{bottom:0, alignItems: 'center', justifyContent: 'center', flexDirection: 'row', opacity: 1, position: 'absolute', backgroundColor: 'green', width: wp(61.3), height: hp(4)}}>
                  <Text 
                          numberOfLines={1} style={{width: wp(61.3), fontSize: hp(2),fontWeight: '400',textAlign: 'center',color: '#ffffff',fontFamily: getRegularFont()}}>
                              {'Scheduled'}
                      </Text> 
                  </View> }
                </TouchableOpacity>
              )}
            }
            horizontal={true}
            keyExtractor={(item, index) => index.toString()}/> : 
            <TouchableOpacity style={{marginTop: hp(7), justifyContent: "center",borderRadius: hp(6), height: hp(15), width: wp(90.3) , backgroundColor: '#006b31', alignSelf: 'center'}} onPress={this.props.reservationPress}>
            <Text 
                numberOfLines={1} style={{fontSize: hp(2),fontWeight: '700',textAlign: 'center',color: '#ffffff',fontFamily: getBoldFont()}}>
                    {'You Have Not Scheduled Any Lessons'}
            </Text></TouchableOpacity> }

          </View>
          <View style={styles.categoriesContainer}>
            <Text 
                numberOfLines={1} style={{marginLeft: wp(3), position: 'absolute', left: 0, fontSize: hp(2.5),fontWeight: '700',textAlign: 'center',color: '#ffffff',fontFamily: getBoldFont()}}>
                    {'Pending Requests'}
            </Text> 

            {(this.props.pending) ? 
            <FlatList contentContainerStyle={{ marginLeft: wp(3),marginTop: hp(5),flexGrow: 1 }}
            data={this.props.pending} 
            renderItem={
              ({ item, index }) => { return(
                <TouchableOpacity style={{marginRight: wp(3), backgroundColor: 'transparent', height: hp(16), width: wp(61.3)}} onPress={ () => {this.props.onPendingClick(item, index)}}>
                  <Image source={{uri: this.props.pending.photos[index]}} style={{height: hp(16), width: wp(61.3), resizeMode: 'stretch'}}/>
                  <View style={{alignItems: 'center', justifyContent: 'center', flexDirection: 'column', opacity: .6, position: 'absolute', backgroundColor: 'green', width: wp(61.3), height: hp(16)}}>
                    <View style={{alignItems: 'center', justifyContent: 'center', backgroundColor: 'transparent', flexDirection: 'row', width: wp(61.3), height: hp(3)}}>
                      <Text 
                          numberOfLines={1} style={{marginLeft: wp(1), fontSize: hp(1.8),fontWeight: '400',textAlign: 'center',color: '#ffffff',fontFamily: getRegularFont()}}>
                              {'Name : '}
                      </Text> 
                      <Text 
                          numberOfLines={1} style={{marginLeft: wp(1), fontSize: hp(1.8),fontWeight: '400',textAlign: 'center',color: '#ffffff',fontFamily: getRegularFont()}}>
                              {item.name}
                      </Text> 
                    </View>
                    <View style={{alignItems: 'center', justifyContent: 'center', backgroundColor: 'transparent', flexDirection: 'row', width: wp(61.3), height: hp(3)}}>
                      <Text 
                          numberOfLines={1} style={{marginLeft: wp(1), fontSize: hp(1.8),fontWeight: '400',textAlign: 'center',color: '#ffffff',fontFamily: getRegularFont()}}>
                              {'Date : '}
                      </Text> 
                      <Text 
                          numberOfLines={1} style={{marginLeft: wp(1), fontSize: hp(1.8),fontWeight: '400',textAlign: 'center',color: '#ffffff',fontFamily: getRegularFont()}}>
                              {item.showableDate}
                      </Text> 
                    </View>
                    <View style={{alignItems: 'center', justifyContent: 'center', backgroundColor: 'transparent', flexDirection: 'row', width: wp(61.3), height: hp(3)}}>
                      <Text 
                          numberOfLines={1} style={{marginLeft: wp(1), fontSize: hp(1.8),fontWeight: '400',textAlign: 'center',color: '#ffffff',fontFamily: getRegularFont()}}>
                              {'Time : '}
                      </Text> 
                      <Text 
                          numberOfLines={1} style={{marginLeft: wp(1), fontSize: hp(1.8),fontWeight: '400',textAlign: 'center',color: '#ffffff',fontFamily: getRegularFont()}}>
                              {this.getTimeToShow(item.date)+' '+this.getAMPM(item.date)}
                      </Text> 
                    </View>
                  </View>
                </TouchableOpacity>
              )}
            }
            horizontal={true}
            keyExtractor={(item, index) => index.toString()}/> : 
            <TouchableOpacity style={{marginTop: hp(5), justifyContent: "center",borderRadius: hp(6), height: hp(15), width: wp(90.3) , backgroundColor: '#006b31', alignSelf: 'center'}} onPress={this.props.reservationPress}>
            <Text 
                numberOfLines={1} style={{fontSize: hp(2),fontWeight: '700',textAlign: 'center',color: '#ffffff',fontFamily: getBoldFont()}}>
                    {'You have No Pending Requests'}
            </Text></TouchableOpacity> }

          </View>
          <MenuDialogue/>
          <ProfileDialogue/>
          <PictureDialogue/>
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
    height: hp(26),
    flexDirection:'column',
    backgroundColor: 'transparent',
    marginTop: hp(2.5)
  },
  categoriesContainer: {
    width: wp(100),
    height: hp(22),
    flexDirection:'column',
    backgroundColor: 'transparent',
    marginTop: hp(2.5)
  },
})