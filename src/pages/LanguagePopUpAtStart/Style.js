import {StyleSheet, Platform } from 'react-native';
import {Dimensions} from 'react-native';
const {height, width} = Dimensions.get('window');
import * as COLORS from '../../utils/Color'
import { scale, verticalScale } from '../../utils/Scale';

export default StyleSheet.create({
    heading: {
		//alignItems: 'center',
		//justifyContent: 'center',
        //paddingVertical: verticalScale(32)
        paddingVertical: verticalScale(10),
        
    },
    
});
