import React from 'react';
import { connect } from 'react-redux';
import {Text, View, Modal, Image, TouchableOpacity, StyleSheet} from 'react-native';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import {getRegularFont, getBoldFont} from '../Fonts';
import { SIGN_OUT_USER, RESET_REDUCERS, SET_MENU_VISIBILITY } from '../Constants';
import Share from 'react-native-share';

class MenuDialogue extends React.PureComponent {

    constructor(props)
    {
        super(props);

        this.backButton = this.backButton.bind(this);
        this.shareUs = this.shareUs.bind(this);
        this.signOut = this.signOut.bind(this);
    }

    backButton()
    {
        this.props.hideMenu(true);
    }

    signOut()
    {
        this.props.signOut();
        this.props.hideMenu(true);
        this.props.resetReducers();       
    }

    shareUs()
    {
        Share.open({message: "Im using Remote Rider for live horse riding lessons via video conference. Find out more at www.remoterider.app"
    })
        .then((res) => {})
        .catch((err) => { err && console.log(err); });
    }

    render(){
        const backArrow = require('../../assets/backArrow.png');

        return(
        <View style={styles.centeredView}>
            <Modal animationType="slide" transparent={true} visible={this.props.visible}>
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <View style={styles.topBar}>
                            <TouchableOpacity style={{marginTop: hp(8.5), marginLeft: wp(1), marginRight: wp(6), height: hp(2.8), width: wp(7.8) , backgroundColor: 'transparent'}} onPress={this.backButton}>
                                <Image source={backArrow} style={{height: hp(2.8), width: wp(7.8), resizeMode: 'contain'}}></Image>
                            </TouchableOpacity>
                            <TouchableOpacity style={{marginTop: hp(6), borderRadius: wp(20)/2, height: hp(8), width: wp(20) , backgroundColor: 'black'}}>
                                <Image source={{uri: this.props.photo}} style={{borderRadius: wp(20)/2, height: hp(8), width: wp(20), resizeMode: 'stretch'}}/>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.buttonsContainer}>
                            <TouchableOpacity style={styles.button}>
                                <Text style={styles.buttonText}>{"Rate Us"}</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.button} onPress={this.shareUs}>
                                <Text style={styles.buttonText}>{"Share Us"}</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.button} onPress={this.signOut}>
                                <Text style={styles.buttonText}>{"Sign Out"}</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>
        </View>);
    };
}

const styles = StyleSheet.create({
    centeredView: {
      width: wp(50),
      height: hp(50),
      justifyContent: "flex-start",
      alignItems: "flex-start",
      alignSelf: 'flex-start',
      backgroundColor: 'transparent'
    },
    modalView: {
        alignSelf: 'flex-start',
        backgroundColor: "transparent",
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: hp(1)
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5
    },
    topBar: {
        width: wp(50),
        backgroundColor: 'black',
        height: hp(20),
        flexDirection: 'row',
    },
    buttonsContainer: {
        flexDirection: 'column',
        height: hp(30),
        width: wp(50),
        backgroundColor: 'transparent'
    },
    button: {
        height: hp(7),
        width: wp(50),
        justifyContent: "center",
        backgroundColor: '#5a9c79',
        borderBottomWidth: hp(.3),
        borderBottomColor: 'white'
    },
    buttonText: {
        fontSize: hp(2.5),
        fontWeight: '700',
        textAlign: 'center',
        color: '#ffffff',
        fontFamily: getBoldFont()
    }
  });

  const mapDispatchToProps = (dispatch) => {
    return {
      hideMenu: (status) => dispatch({type: SET_MENU_VISIBILITY, showmenu: status}),
      signOut: () => dispatch({type:`${SIGN_OUT_USER}`}),
      resetReducers: () => dispatch({"type": RESET_REDUCERS}),
    };
  };

const mapStateToProps = (state) => {
  
    return {
        visible: state.menudialogueReducer.showmenu,
        photo: state.mscreducer.photo,
    };
  };

export default connect(mapStateToProps, mapDispatchToProps)(MenuDialogue);