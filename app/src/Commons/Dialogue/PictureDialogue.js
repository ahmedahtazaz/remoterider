import React from 'react';
import { connect } from 'react-redux';
import {Platform, TextInput, Image, View, Modal, Text, TouchableOpacity, StyleSheet} from 'react-native';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import {getRegularFont, getBoldFont} from '../Fonts';

class PictureDialogue extends React.PureComponent {

    constructor(props)
    {
        super(props);

        this.declineMessageHandler = this.declineMessageHandler.bind(this);
    }

    declineMessageHandler(message)
    {
        this.declineMessage = message;
    }

    render(){

        let date = this.props.student ? this.props.student.showableDate : '';
        let name = this.props.student ? this.props.student.name : '';
        let time = this.props.student ? this.props.student.time : '';

        return(
            <View style={styles.centeredView}>
                <Modal animationType="slide" transparent={true} visible={this.props.visible}>
                    <View style={styles.centeredView}>
                        <View style={styles.modalView}>
                            <View style={{marginBottom: hp(3), width: wp(60), height: hp(15), alignItems: 'center', justifyContent: 'center'}}> 
                                <Image source={{uri: this.props.studentPhoto}} style={{resizemode: 'contain', width: wp(60), height: hp(15)}}/>
                                <View style={{alignItems: 'center', justifyContent: 'center', flexDirection: 'column', opacity: .6, position: 'absolute', backgroundColor: 'green', width: wp(60), height: hp(15)}}>
                                    <View style={{alignItems: 'center', justifyContent: 'center', backgroundColor: 'transparent', flexDirection: 'row', width: wp(60), height: hp(2)}}>
                                        <Text 
                                            numberOfLines={1} style={{marginLeft: wp(1), fontSize: hp(2),fontWeight: '400',textAlign: 'center',color: '#ffffff',fontFamily: getRegularFont()}}>
                                                {'Name : '}
                                        </Text> 
                                        <Text 
                                            numberOfLines={1} style={{maxWidth: wp(43), marginLeft: wp(1), fontSize: hp(2),fontWeight: '400',textAlign: 'center',color: '#ffffff',fontFamily: getRegularFont()}}>
                                                {name}
                                        </Text> 
                                    </View>
                                    <View style={{alignItems: 'center', justifyContent: 'center', backgroundColor: 'transparent', flexDirection: 'row', width: wp(60), height: hp(2)}}>
                                        <Text 
                                            numberOfLines={1} style={{marginLeft: wp(1), fontSize: hp(2),fontWeight: '400',textAlign: 'center',color: '#ffffff',fontFamily: getRegularFont()}}>
                                                {'Date : '}
                                        </Text> 
                                        <Text 
                                            numberOfLines={1} style={{marginLeft: wp(1), fontSize: hp(2),fontWeight: '400',textAlign: 'center',color: '#ffffff',fontFamily: getRegularFont()}}>
                                                {date}
                                        </Text> 
                                    </View>
                                    <View style={{alignItems: 'center', justifyContent: 'center', backgroundColor: 'transparent', flexDirection: 'row', width: wp(60), height: hp(2)}}>
                                        <Text 
                                            numberOfLines={1} style={{marginLeft: wp(1), fontSize: hp(2),fontWeight: '400',textAlign: 'center',color: '#ffffff',fontFamily: getRegularFont()}}>
                                                {'Time : '}
                                        </Text> 
                                        <Text 
                                            numberOfLines={1} style={{marginLeft: wp(1), fontSize: hp(2),fontWeight: '400',textAlign: 'center',color: '#ffffff',fontFamily: getRegularFont()}}>
                                                {time}
                                        </Text> 
                                    </View>
                                </View>
                            </View>
                            <View style={styles.fieldMaincontainerStyle}> 
                                <View style={styles.fieldInnercontainerStyle}> 
                                    <TextInput onChangeText={this.declineMessageHandler} style={styles.inputStyle} autoCorrect={false} placeholder={'If Decline, Please Add Reason'} placeholderTextColor = "#598a6f" />
                                </View>
                            </View>
                            {(this.props.negative && !this.props.positive) ?
                            <TouchableOpacity style={styles.ngativeBittonStyle} onPress={() => this.props.negativePressed(this.declineMessage, this.props.student)}>
                                <Text style={styles.buttonText}>{this.props.negative}</Text>
                            </TouchableOpacity> : 
                            (this.props.positive && this.props.negative) ? 
                            <View style={styles.buttonsContainer}>
                                <TouchableOpacity style={styles.positiveBittonStyle} onPress={() => this.props.positivePressed(this.props.student)}>
                                    <Text style={styles.buttonText}>{this.props.positive}</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.ngativeBittonStyle}  onPress={() => this.props.negativePressed(this.declineMessage, this.props.student)}>
                                    <Text style={styles.buttonText}>{this.props.negative}</Text>
                                </TouchableOpacity>
                            </View> : null}
                        </View>
                    </View>
                </Modal>
            </View>);

    };
}

const styles = StyleSheet.create({
    centeredView: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      alignSelf: 'center'
    },
    modalView: {
        alignSelf: 'center',
        margin: hp(2),
        backgroundColor: "#003619",
        opacity: .9,
        borderRadius: hp(3),
        padding: hp(6),
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
    textStyle: {
      color: "white",
      fontWeight: "400",
      textAlign: "center",
      fontFamily: getRegularFont(),
      marginBottom: hp(3),
      fontSize: hp(2.5)
    },
    positiveBittonStyle: {
        justifyContent: "center",
        width: wp(30),
        borderRadius: hp(1),
        backgroundColor: '#006b31',
        height: hp(6),
        marginTop: hp(1),
        marginRight: wp(3)
    },
    ngativeBittonStyle: {
        justifyContent: "center",
        width: wp(30),
        borderRadius: hp(1),
        backgroundColor: 'red',
        height: hp(6),
        marginTop: hp(1)
    },
    buttonText: {
        fontSize: hp(2),
        fontWeight: '700',
        textAlign: 'center',
        color: '#ffffff',
        fontFamily: getBoldFont()
    },
    buttonsContainer: {
        flexDirection: 'row', 
        justifyContent: "center",
        width: wp(70),
        backgroundColor: 'transparent',
        height: hp(8),
        marginTop: hp(1)
    },
    fieldMaincontainerStyle:{
        height: Platform.OS === 'android' ? hp(7) : hp(4),
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
  });

const mapStateToProps = (state) => {
  
    return {
        visible: state.dialogueReducer.pictureDialogueVisible,
        student: state.dialogueReducer.student,
        studentPhoto: state.dialogueReducer.studentPhoto,
        positive: state.dialogueReducer.positve,
        negative: state.dialogueReducer.negative,
        negativePressed: state.dialogueReducer.negativeButtonPressed,
        positivePressed: state.dialogueReducer.positivePressed,
    };
  };

export default connect(mapStateToProps, null)(PictureDialogue);