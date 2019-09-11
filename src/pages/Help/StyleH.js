import {StyleSheet, Platform } from 'react-native';
import {Dimensions} from 'react-native';
const {height, width} = Dimensions.get('window');
import * as COLORS from '../../utils/Color'
import { scale, verticalScale } from '../../utils/Scale';

export default StyleSheet.create({
 
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  helpView: {
    // height: verticalScale(110),
    backgroundColor: COLORS.BRAND_LIGHTEST,
    padding: scale(20),
    justifyContent: 'space-between',

  },
  helpText: {
    fontSize: scale(18),
    fontFamily: 'Roboto',
    color: 'black',
    paddingBottom: scale(10)
  },
  helpTextSearchIcon: {
    flexDirection: 'row',
    backgroundColor: 'white',
    height: scale(35),
    alignItems: 'center',
    paddingHorizontal: scale(10)
  },
  helpCenterMain: {
    paddingTop: scale(25),
    paddingHorizontal: scale(10)

  },
  helpCenterText: {
    fontSize: scale(18),
    paddingBottom: scale(5)
  },
  helpCenterBorder: {
    borderWidth: scale(1),
    borderColor: '#f4f4f4',
  },
  helpCenterBoxMain: {
    paddingVertical: verticalScale(20)
  },
  helpCenterTwoBox: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: scale(15),
  },
  helpCenterBox: {
    backgroundColor: '#f4f4f4',
    width: '48%',
    padding: scale(20),
    justifyContent: 'center',
    alignItems: 'center'
  },
  helpCenterBoxImage: {
    resizeMode: 'contain',
    width: scale(35),
    height: scale(35)
  },
  inBoxText: {
    fontSize: scale(20),
    fontWeight: Platform.OS == 'ios' ?  '600' : '400',
    paddingTop: scale(10),
    color: '#3b3b3b'
  },
  content: {
    backgroundColor: 'rgba(31, 40, 55, 0.8)',
    //height: scale(30), 
    //width: scale(300),
    flex: 1,
    //justifyContent: 'center'
  },
  descriptionBtnContainer: {
    marginHorizontal: scale(32)
  },
  
	headline: {
		fontSize: scale(14),
		fontWeight: Platform.OS === 'ios' ? '500' : '400',
		lineHeight: scale(18),
		fontFamily: 'Roboto'
  },
	headingText: {
		color: COLORS.BASE_BLACK
  },
	headingTextB: {
    color: COLORS.BRAND_DARKEST,
    borderBottomWidth: scale(2),
    borderBottomColor: COLORS.BRAND_DARKEST,
  },
  
  containerSize: {
    flex: 1,
    backgroundColor: 'white',
    margin: scale(10),
    padding: scale(20),
  },
  selectCountryText: {
    fontSize : scale(20),
    fontWeight: '500'
},
sizeFitImageView : {
  flex:1,
  width: width-scale(48), 
},
sizeFitImage: { 
  flex: 1,
  width: null,
  height: null
}, 

sizeGuideHeader:{
  flexDirection: 'row', 
  backgroundColor: 
  COLORS.BASE_RGB, 
  paddingVertical: scale(10)
}

});
