import React, { Component } from 'react';
import { View, Image, Text, TouchableOpacity } from 'react-native';
import Ionicons from "react-native-vector-icons/FontAwesome";
import I18n from '../../localization/index';
import * as COLORS from '../../utils/Color'
export const changeLanguage = (lang) => {
    if(lang === 'en'){
        I18n.locale = 'en';
      }else{
        I18n.locale = 'ar';
      }
}

const Header = ({navigation, props}) => ({
    headerStyle: {
        backgroundColor: COLORS.BRAND,
        shadowOpacity: 0.25,
          shadowOffset: {
            height: 1,
          },
          shadowRadius: 5,
      },
      headerRight:(
            <View style={{flex:1, flexDirection: 'row', justifyContent: 'space-between'}}>
                <View style={{flexDirection: 'row'}}>
                    <TouchableOpacity onPress={() => changeLanguage('en')}>
                        <Text>{I18n.t('english')}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => changeLanguage('ar')}>
                        <Text style={{color:'#fff'}}>{I18n.t('arabic')}</Text>
                    </TouchableOpacity>
                    
                </View>
                <View style={{marginHorizontal: 10}}>
                    <Ionicons name={I18n.t('shopplingBag')} size={20} color="black"/>
                </View>
            </View>
      ),
      headerTitle: (<View style={{marginVertical: scale(10),flex: 1, alignItems : 'center'}}>
        <Image source={{uri: I18n.t('naomiImg')}} style={{width: scale(60), height: scale(30)}} />
    </View>)
})

export { Header };