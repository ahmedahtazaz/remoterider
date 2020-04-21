import React from 'react';
import { connect } from 'react-redux';
import {TouchableOpacity} from 'react-native';
import FitImage from 'react-native-fit-image';

class CheckBox extends React.PureComponent {

    render(){
        const checked = require('../../assets/checkbox_c.png');
        const unchecked = require('../../assets/checkbox_u.png');

        if(this.props.checked)
        {   
            return(
                <TouchableOpacity style={{ flex: .4}} onPress={() => {this.props.onPress(this.props.checked)}}>
                    <FitImage style={{flex:1}} source={checked}/>
                </TouchableOpacity>);
        }
        else{
            return(
                <TouchableOpacity style={{ flex: .4}} onPress={() => {this.props.onPress(this.props.checked)}}>
                    <FitImage style={{ flex: 1}} source={unchecked}/>
                </TouchableOpacity>);
        }
    };
}

const mapStateToProps = (state) => {
  
    return {checked: state.checkboxReducer.checked};
  };

export default connect(mapStateToProps, null)(CheckBox);