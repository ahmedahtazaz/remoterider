import React from 'react';
import { connect } from 'react-redux';
import Dialog, { DialogContent, DialogFooter, DialogButton} from 'react-native-popup-dialog';
import {Text} from 'react-native';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

class Dialogue extends React.PureComponent {

    render(){

        console.log(this.props);

        return(
            <Dialog visible={this.props.visible} footer={
                <DialogFooter>
                  {(this.props.negative && !this.props.positive) ? 
                  (<DialogButton
                    text={this.props.negative}
                    onPress={this.props.negativePressed}/>) : 
                    (!this.props.negative && this.props.positive) ? 
                    (<DialogButton
                    text={this.props.positive}
                    onPress={() => {}}/>) : 
                    <DialogButton
                    text={this.props.negative}
                    onPress={this.props.negativePressed}/>}                 
                </DialogFooter>}>
            <DialogContent>
                <Text 
                    style={{fontSize: hp(2.5),
                        color: 'black',
                        fontFamily: 'corbel_r.ttf',
                        fontWeight: '200',}}>
                        {this.props.message}
                </Text> 
            </DialogContent>
            </Dialog>);

    };
}

const mapStateToProps = (state) => {
  
    return {
        visible: state.dialogueReducer.visible,
        message: state.dialogueReducer.message,
        positive: state.dialogueReducer.positive,
        negative: state.dialogueReducer.negative,
        negativePressed: state.dialogueReducer.negativeButtonPressed,
    };
  };

export default connect(mapStateToProps, null)(Dialogue);