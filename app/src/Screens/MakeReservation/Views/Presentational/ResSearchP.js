import React, { Component } from 'react';
import {TextInput, FlatList, TouchableOpacity, Text, Image, View, StyleSheet} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { getBoldFont, getRegularFont } from '../../../../Commons/Fonts';

export default class ResSearchP extends Component {

  render() {
    const backArrow = require('../../../../assets/backArrow.png');
    const searchIcon = require('../../../../assets/searchIcon.png');

    return (
      <LinearGradient colors={['#006b31', '#00652e', '#005e2b' , '#005326', '#004b22', '#00411e', '#003a1b', '#003619']} style={{flex: 1}}>      
        <View style={styles.background}>
          <View style={styles.topBarContainer}>
            <TouchableOpacity style={{marginLeft: wp(2), height: hp(2.8), width: wp(7.8) , backgroundColor: 'transparent', alignSelf: 'center'}} onPress={this.props.backButton}>
              <Image source={backArrow} style={{height: hp(2.8), width: wp(7.8), resizeMode: 'contain'}}></Image>
            </TouchableOpacity>
            <View style={styles.fieldMaincontainerStyle}> 
                <Image source={searchIcon} style={styles.searchImage}/>
                <View style={styles.fieldInnercontainerStyle}> 
                    <TextInput onChangeText={this.props.searchHandler} style={styles.inputStyle} autoCorrect={false} placeholder={'Search For Instructor'} placeholderTextColor = "#598a6f" />
                </View>
            </View>
          </View>

          <View style={styles.featuredInstructorsContainer}>

            <Text 
                numberOfLines={1} style={{marginLeft: wp(3), position: 'absolute', left: 0, fontSize: hp(3),fontWeight: '700',textAlign: 'center',color: '#ffffff',fontFamily: getBoldFont()}}>
                    {'Featured Instructors'}
            </Text> 

            {(this.props.featured) ? 
            <FlatList contentContainerStyle={{ marginLeft: wp(3),marginTop: hp(5),flexGrow: 1 }}
            data={this.props.featured} 
            renderItem={
              ({ item, index }) => { return(
                <TouchableOpacity style={{marginRight: wp(3), backgroundColor: 'transparent', height: hp(16), width: wp(61.3)}} onPress={ () => {this.props.onInstructorClick(item, index)}}>
                  <Image source={{uri: this.props.featured.photos[index]}} style={{height: hp(16), width: wp(61.3), resizeMode: 'stretch'}}/>
                  <View style={{alignItems: 'center', justifyContent: 'center', flexDirection: 'column', opacity: .6, position: 'absolute', backgroundColor: 'green', width: wp(61.3), height: hp(16)}}>
                    <View style={{alignItems: 'center', justifyContent: 'center', backgroundColor: 'transparent', flexDirection: 'row', width: wp(61.3), height: hp(3)}}>
                      <Text 
                          numberOfLines={1} style={{marginLeft: wp(1), fontSize: hp(2.5),fontWeight: '400',textAlign: 'center',color: '#ffffff',fontFamily: getRegularFont()}}>
                              {'Name : '}
                      </Text> 
                      <Text 
                          numberOfLines={1} style={{marginLeft: wp(1), fontSize: hp(2.5),fontWeight: '400',textAlign: 'center',color: '#ffffff',fontFamily: getRegularFont()}}>
                              {item.Name}
                      </Text> 
                    </View>
                    <View style={{alignItems: 'center', justifyContent: 'center', backgroundColor: 'transparent', flexDirection: 'row', width: wp(61.3), height: hp(3)}}>
                      <Text 
                          numberOfLines={1} style={{marginLeft: wp(1), fontSize: hp(2.5),fontWeight: '400',textAlign: 'center',color: '#ffffff',fontFamily: getRegularFont()}}>
                              {'Cost : '}
                      </Text> 
                      <Text 
                          numberOfLines={1} style={{marginLeft: wp(1), fontSize: hp(2.5),fontWeight: '400',textAlign: 'center',color: '#ffffff',fontFamily: getRegularFont()}}>
                              {item.Cost}
                      </Text> 
                    </View>
                  </View>
                </TouchableOpacity>
              )}
            }
            horizontal={true}
            keyExtractor={(item, index) => index.toString()}/> : 
            <TouchableOpacity style={{marginTop: hp(5), justifyContent: "center",borderRadius: hp(6), height: hp(15), width: wp(90.3) , backgroundColor: '#006b31', alignSelf: 'center'}}>
            <Text 
                numberOfLines={1} style={{fontSize: hp(2),fontWeight: '700',textAlign: 'center',color: '#ffffff',fontFamily: getBoldFont()}}>
                    {'No Featured Instructors are available'}
            </Text></TouchableOpacity> }

          </View>
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
  featuredInstructorsContainer: {
    width: wp(100),
    height: hp(22),
    flexDirection:'column',
    backgroundColor: 'transparent',
    marginTop: hp(6.8)
  },
  fieldMaincontainerStyle:{
    flexDirection: 'row',
    height: hp(6),
    width: wp(80),
    alignSelf: 'center',
    backgroundColor: 'white',
    borderRadius: hp(3),
    marginLeft: wp(3)
  },
fieldInnercontainerStyle:{
    flex: 9,
    width: wp(80),
    alignSelf: 'center',
  },
  searchImage: {
    height: hp(6),
    width: wp(6),
    resizeMode: 'contain',
    marginLeft: wp(2)
  },
  inputStyle: {
    fontSize: hp(2),
    color: '#598a6f',
    fontFamily: getRegularFont(),
    fontWeight: '200',
    marginLeft: wp(3),
    borderBottomWidth: hp(.1),
    borderBottomColor: '#598a6f',
  },
})