import {StyleSheet, Platform, Dimensions } from 'react-native';
const {height, width} = Dimensions.get('window');
import { scale, verticalScale } from '../../utils/Scale';
import * as COLORS from '../../utils/Color'


export default StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    map: {
      height: width,
      width: width-60,
      marginTop: scale(10)
    },
    breadcrumbCircle: {
      height: scale(20),
      width: scale(20),
      borderRadius: scale(10),
      backgroundColor: 'green',
      justifyContent: 'center',
      alignItems: 'center'
    },
   });
   
   