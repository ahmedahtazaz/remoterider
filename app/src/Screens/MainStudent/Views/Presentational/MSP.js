import React, { Component } from 'react';
import {FlatList, TouchableOpacity, Text, Image, View, StyleSheet} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import Slideshow from 'react-native-image-slider-show';
import { getBoldFont, getRegularFont } from '../../../../Commons/Fonts';
import MenuDialogue from '../../../../Commons/MenuDialogue/MenuDialogue';
import ProfileDialogue from '../../../../Commons/ProfileDialogue/ProfileDialogue';
import Dialogue from '../../../../Commons/Dialogue/Dialogue';

export default class MSP extends Component {

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
          <View style={{paddingLeft: wp(1), flexDirection: 'row', width: wp(100), height: hp(6)}}>
            <TouchableOpacity style={{marginTop: hp(1), justifyContent: "center",borderRadius: hp(1), height: hp(4.5), width: wp(30.9) , backgroundColor: '#5a9c79'}} onPress={this.props.reservationPress}>
                <Text 
                    numberOfLines={1} style={{fontSize: hp(1.4),fontWeight: '700',textAlign: 'center',color: '#ffffff',fontFamily: getBoldFont()}}>
                        {'Make Reservation'}
                </Text> 
              </TouchableOpacity>
            <Text 
                  numberOfLines={1} style={{width: wp(70), marginTop: hp(1), fontSize: hp(3),fontWeight: '700',textAlign: 'center',color: '#ffffff',fontFamily: getBoldFont()}}>
                      {this.props.currentUser ? this.props.currentUser.name : ''}
            </Text> 
          </View>
          <View style={styles.reservationsContainer}>

            <Text 
                numberOfLines={1} style={{marginLeft: wp(3), position: 'absolute', left: 0, fontSize: hp(3),fontWeight: '700',textAlign: 'center',color: '#ffffff',fontFamily: getBoldFont()}}>
                    {'Your Reservations'}
            </Text> 

            {(this.props.reservations) ? 
            <FlatList contentContainerStyle={{ marginLeft: wp(3),marginTop: hp(5),flexGrow: 1 }}
            data={this.props.reservations} 
            renderItem={
              ({ item, index }) => { return(
                <TouchableOpacity style={{marginRight: wp(3), backgroundColor: 'transparent', height: hp(16), width: wp(61.3)}} onPress={ () => {this.props.onReservationClick(item, index)}}>
                  <Image source={{uri: this.props.reservations.photos[index]}} style={{height: hp(16), width: wp(61.3), resizeMode: 'stretch'}}/>
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
                              {'Cost : '}
                      </Text> 
                      <Text 
                          numberOfLines={1} style={{marginLeft: wp(1), fontSize: hp(1.8),fontWeight: '400',textAlign: 'center',color: '#ffffff',fontFamily: getRegularFont()}}>
                              {item.cost}
                      </Text> 
                    </View>
                    <View style={{alignItems: 'center', justifyContent: 'center', backgroundColor: 'transparent', flexDirection: 'row', width: wp(61.3), height: hp(3)}}>
                      <Text 
                          numberOfLines={1} style={{marginLeft: wp(1), fontSize: hp(1.8),fontWeight: '400',textAlign: 'center',color: '#ffffff',fontFamily: getRegularFont()}}>
                              {'Date : '}
                      </Text> 
                      <Text 
                          numberOfLines={1} style={{marginLeft: wp(1), fontSize: hp(1.8),fontWeight: '400',textAlign: 'center',color: '#ffffff',fontFamily: getRegularFont()}}>
                              {item.showAbleDate}
                      </Text> 
                    </View>
                    <View style={{alignItems: 'center', justifyContent: 'center', backgroundColor: 'transparent', flexDirection: 'row', width: wp(61.3), height: hp(3)}}>
                      <Text 
                          numberOfLines={1} style={{marginLeft: wp(1), fontSize: hp(1.8),fontWeight: '400',textAlign: 'center',color: '#ffffff',fontFamily: getRegularFont()}}>
                              {'Time : '}
                      </Text> 
                      <Text 
                          numberOfLines={1} style={{marginLeft: wp(1), fontSize: hp(1.8),fontWeight: '400',textAlign: 'center',color: '#ffffff',fontFamily: getRegularFont()}}>
                              {item.showAbleTime}
                      </Text> 
                    </View>
                  </View>
                  {(item.confirmed.toString() === 'true') ? <View style={{bottom:0, alignItems: 'center', justifyContent: 'center', flexDirection: 'row', opacity: 1, position: 'absolute', backgroundColor: 'green', width: wp(61.3), height: hp(4)}}>
                  <Text 
                          numberOfLines={1} style={{width: wp(61.3), fontSize: hp(2),fontWeight: '400',textAlign: 'center',color: '#ffffff',fontFamily: getRegularFont()}}>
                              {'Accepted' }
                      </Text> 
                  </View> : (item.confirmed.toString() === 'false' && !item.declined) ? <View style={{bottom:0, alignItems: 'center', justifyContent: 'center', flexDirection: 'row', opacity: 1, position: 'absolute', backgroundColor: 'grey', width: wp(61.3), height: hp(4)}}>
                  <Text 
                          numberOfLines={1} style={{width: wp(61.3), fontSize: hp(2),fontWeight: '400',textAlign: 'center',color: '#ffffff',fontFamily: getRegularFont()}}>
                              {'Requested' }
                      </Text> 
                  </View> : <View style={{bottom:0, alignItems: 'center', justifyContent: 'center', flexDirection: 'row', opacity: 1, position: 'absolute', backgroundColor: 'red', width: wp(61.3), height: hp(4)}}>
                  <Text 
                          numberOfLines={1} style={{width: wp(61.3), fontSize: hp(2),fontWeight: '400',textAlign: 'center',color: '#ffffff',fontFamily: getRegularFont()}}>
                              {'Declined'+(item.declineMessage !== null ? ' : '+item.declineMessage : '')}
                      </Text> 
                  </View> }
                </TouchableOpacity>
              )}
            }
            horizontal={true}
            keyExtractor={(item, index) => index.toString()}/> : 
            <TouchableOpacity style={{marginTop: hp(5), justifyContent: "center",borderRadius: hp(6), height: hp(15), width: wp(90.3) , backgroundColor: '#006b31', alignSelf: 'center'}} onPress={this.props.reservationPress}>
            <Text 
                numberOfLines={1} style={{fontSize: hp(2),fontWeight: '700',textAlign: 'center',color: '#ffffff',fontFamily: getBoldFont()}}>
                    {'You Have Not Reserved Any Lessons'}
            </Text></TouchableOpacity> }

          </View>
          <View style={styles.categoriesContainer}>
            <Text 
                numberOfLines={1} style={{marginLeft: wp(3), position: 'absolute', left: 0, fontSize: hp(3),fontWeight: '700',textAlign: 'center',color: '#ffffff',fontFamily: getBoldFont()}}>
                    {'Available Categories'}
            </Text> 

            {(this.props.categories) ? 
            <FlatList contentContainerStyle={{ marginLeft: wp(3),marginTop: hp(5),flexGrow: 1 }}
            data={this.props.categories} 
            renderItem={
              ({ item, index }) => { return(
                <TouchableOpacity style={{marginRight: wp(3), backgroundColor: 'transparent', height: hp(16), width: wp(61.3)}} onPress={ this.props.reservationPress }>
                  <Image source={{uri: item.Photo}} style={{height: hp(16), width: wp(61.3), resizeMode: 'stretch'}}/>
                  <View style={{alignItems: 'center', justifyContent: 'center', flexDirection: 'column', opacity: .7, position: 'absolute', backgroundColor: 'green', width: wp(61.3), height: hp(16)}}>
                    <View style={{alignItems: 'center', justifyContent: 'center', backgroundColor: 'transparent', flexDirection: 'row', width: wp(61.3), height: hp(3)}}>
                      <Text 
                          numberOfLines={1} style={{marginLeft: wp(1), fontSize: hp(3),fontWeight: '700',textAlign: 'center',color: '#ffffff',fontFamily: getRegularFont()}}>
                              {item.Name}
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
                    {'No Available Categories For Reservation'}
            </Text></TouchableOpacity> }

          </View>
          <MenuDialogue/>
          <ProfileDialogue/>
          <Dialogue/>
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
  menuPopUp: {
    width: wp(100),
    height: hp(100),
    backgroundColor: 'red',
    zIndex: 2000
  },
})