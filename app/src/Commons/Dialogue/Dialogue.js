import React from 'react';
import { connect } from 'react-redux';
import {View, Modal, Text, TouchableOpacity, StyleSheet} from 'react-native';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import {getRegularFont, getBoldFont} from '../Fonts';

class Dialogue extends React.PureComponent {

    render(){
        return(
            <View style={styles.centeredView}>
                <Modal animationType="slide" transparent={true} visible={this.props.visible}>
                    <View style={styles.centeredView}>
                        <View style={styles.modalView}>
                            <Text style={styles.textStyle}>{this.props.message}</Text>
                            {(this.props.negative && !this.props.positive) ?
                            <TouchableOpacity style={styles.ngativeBittonStyle} onPress={this.props.negativePressed}>
                                <Text style={styles.buttonText}>{this.props.negative}</Text>
                            </TouchableOpacity> : 
                            (this.props.positive && this.props.negative) ? 
                            <View style={styles.buttonsContainer}>
                                <TouchableOpacity style={styles.positiveBittonStyle} onPress={this.props.positivePressed}>
                                    <Text style={styles.buttonText}>{this.props.positive}</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.ngativeBittonStyle}  onPress={this.props.negativePressed}>
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
        marginRight: wp(2)
    },
    ngativeBittonStyle: {
        justifyContent: "center",
        width: wp(30),
        borderRadius: hp(1),
        backgroundColor: '#5a9c79',
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
    }
  });

const mapStateToProps = (state) => {
  
    return {
        visible: state.dialogueReducer.visible,
        message: state.dialogueReducer.message,
        positive: state.dialogueReducer.positve,
        negative: state.dialogueReducer.negative,
        negativePressed: state.dialogueReducer.negativeButtonPressed,
        positivePressed: state.dialogueReducer.positivePressed,
    };
  };

export default connect(mapStateToProps, null)(Dialogue);