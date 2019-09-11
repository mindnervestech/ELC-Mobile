import React, { Component } from 'react';
import { View, Image, Text, TouchableOpacity } from 'react-native';
import { getStatusBarHeight } from 'react-native-status-bar-height';
import I18n from '../../localization/index';
import MaterialIcons from "react-native-vector-icons/MaterialCommunityIcons";
import COMMONSTYLE from '../../utils/Style';
import { scale, verticalScale } from '../../utils/Scale';
import * as COLORS from '../../utils/Color'
var goBack;

class SubHeader extends Component {

    constructor(props) {
        super(props);
        goBack = this.props.navigation.goBack;
    }




    render () {     
        const { headerTitle } = this.props   
        return (
            <View style={{ marginTop: getStatusBarHeight(true)}}>
            <View style={[subHeader,I18n.locale == 'ar' ? {flexDirection:'row-reverse'} : '']}>
                <TouchableOpacity style={{width: '20%'}}>
                    <MaterialIcons
                        name="chevron-left"
                        color= {COLORS.BASE_BLACK}
                        size={scale(40)}
                        onPress={() => goBack()}
                    />                
                </TouchableOpacity>
                <View style={{width: '60%', alignItems:'center'}}>
                    <Text style={{fontSize: scale(18)}}>{headerTitle}</Text>
                </View>
                <View style={{width: '20%'}}>

                </View>

         
            </View>
            </View>
        );
    }
}

export default SubHeader;