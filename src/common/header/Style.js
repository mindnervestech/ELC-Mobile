import {StyleSheet, Platform } from 'react-native';
import {Dimensions} from 'react-native';
const {height, width} = Dimensions.get('window');
import * as COLORS from '../../utils/Color'
import { scale, verticalScale } from '../../utils/Scale';
import I18n from '../../localization/index'


export default StyleSheet.create({
    
    container: {
        alignItems: 'center',
    },

    header:{
        flexDirection: 'row',
        height: scale(50), 
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: COLORS.BRAND
    },

    imageNayomi:{
        width: '30%', 
        alignItems:'center'
    },
    imageSize:{
        width: scale(50), 
        height: scale(42),
        zIndex:99
    },

    headerIcon:{
        flexDirection: 'row', 
        width: '35%', 
        justifyContent: 'flex-end'
    },
    nayomiHolidayText: {
        minHeight: verticalScale(40),
        maxHeight: verticalScale(75),
        backgroundColor: COLORS.BASE_RGB,
        justifyContent: 'center',
        alignItems: 'center',
        borderBottomWidth: 1,
        borderColor: 'lightgrey',
        // marginBottom: verticalScale(5)
      },
          subHeader:{
        flexDirection: 'row',
        height: verticalScale(50), 
        justifyContent: 'center', 
        alignItems: 'center',
        backgroundColor: COLORS.BRAND
    },
    heroLargeButton: {
		borderRadius: scale(4),
		width: "100%",
		//height: scale(10),
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: COLORS.BRAND_DARKEST,
        elevation: 0,
        borderRadius: scale(20)
	},
});
