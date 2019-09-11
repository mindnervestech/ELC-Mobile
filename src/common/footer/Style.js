import {StyleSheet, Platform } from 'react-native';
import {Dimensions} from 'react-native';
const {height, width} = Dimensions.get('window');
import * as COLORS from '../../utils/Color'
import { scale, verticalScale } from '../../utils/Scale';

export default StyleSheet.create({
    container: {
    flex: 1,
    backgroundColor: COLORS.BASE_RGB,
  },
  nayomiHolidayText: {
    height: verticalScale(40),
    backgroundColor: COLORS.BASE_RGB,
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderColor: 'lightgrey',
    marginBottom: verticalScale(5)
  },
  happningNowMain: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  textView: {
      paddingHorizontal: scale(12),
      justifyContent: 'center',
      alignItems: 'center',
      paddingBottom : verticalScale(10),
      paddingTop : verticalScale(25),
  },
  textViewFooter: {
      paddingHorizontal: scale(12),
      justifyContent: 'center',
      alignItems: 'center',
  },
  textFooterRights: {
    paddingBottom : verticalScale(25),
  },
  textSize: {
    fontSize : scale(20),
    color: 'grey',
    fontStyle: 'italic'
  },
  contactText : {
    fontSize : scale(20),
    color: 'grey',
  },
  paymentImageSize:{
    width :width/1.5,
    resizeMode: 'contain',
  },
  collapseMainContainer: {
     backgroundColor: COLORS.BRAND_LIGHTEST,
     justifyContent: 'center'
    // height: verticalScale(50),
    // backgroundColor: COLORS.BRAND_LIGHTEST,
    // justifyContent: 'center',
    // marginVertical: 1,
  },
  collapseMain: {
    paddingHorizontal: scale(12),
  },
  collapseTextPlus: {
    flexDirection:'row',
    paddingVertical: scale(15),
    justifyContent: 'space-between'
  },
  collapseText: {
    fontSize : scale(16),
    textTransform: 'uppercase',
    color: COLORS.BRAND_DARKEST,
  },
  afterCollapseMain: {
    paddingVertical: verticalScale(10),
  },
  collapseInText: {
    paddingVertical: verticalScale(5),
  },
  descriptionText:{
    fontSize : scale(14),
    color: 'grey',
    textAlign: 'center',
  },
  buttonText:{
    fontSize : scale(14),
    color: 'blue',
    display: 'none',
    textAlign: 'center'
  },
  collabsibleBorder: {
    borderWidth : 0.5,
    borderColor: 'rgb(231, 231, 231)',
    marginHorizontal: scale(10)
  },
  amirahSignupText:{
    fontSize: scale(16),
    paddingTop: scale(5)
  }

});
