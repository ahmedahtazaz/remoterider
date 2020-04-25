import React from 'react';
import { connect } from 'react-redux';
import {TouchableOpacity, Image} from 'react-native';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

class CheckBox extends React.PureComponent {

    render(){
        const checked = require('../../assets/checkbox_c.png');
        const unchecked = require('../../assets/checkbox_u.png');

        if(this.props.checked)
        {   
            return(
                <TouchableOpacity style={{height: hp(6), width: wp(12)}} onPress={() => {this.props.onPress(this.props.checked)}}>
                    <Image style={{height: hp(6), width: wp(12), resizeMode: 'contain'}} source={checked}/>
                </TouchableOpacity>);
        }
        else{
            return(
                <TouchableOpacity style={{height: hp(6), width: wp(12)}} onPress={() => {this.props.onPress(this.props.checked)}}>
                    <Image style={{height: hp(6), width: wp(12), resizeMode: 'contain'}} source={unchecked}/>
                </TouchableOpacity>);
        }
    };
}

const mapStateToProps = (state) => {
  
    return {checked: state.checkboxReducer.checked};
  };

export default connect(mapStateToProps, null)(CheckBox);