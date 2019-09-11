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
  mainImageSize: {
     width : scale(width),
      height: scale(width * 1.2),
      flexWrap: 'wrap',
    // aspectRatio: 1.6,
    resizeMode: 'contain' 
  },
  scrollImageSize: {
    width :width/1.5,
    height: width/1.5,
    resizeMode: 'contain',
    
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
      padding: scale(10),
      justifyContent: 'center',
      alignItems: 'center',
      paddingVertical : verticalScale(25)
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
  collapseMain: {
    height: verticalScale(50),
    backgroundColor: COLORS.BRAND_LIGHTEST,
    justifyContent: 'center',
    marginVertical: 1,
  },
  collapseTextPlus: {
    // flexDirection: 'row',
    paddingHorizontal: scale(20),
    justifyContent: 'space-between'
  },
  collapseText: {
    fontSize : scale(20),
    color: COLORS.BRAND_DARKEST,
  },
  afterCollapseMain: {
    paddingVertical: verticalScale(10),
    backgroundColor: COLORS.BASE_WHITE
  },
  descriptionText:{
    fontSize : scale(14),
    color: 'grey',
    textAlign: 'center'
  },

  onImageView:{
    position: 'absolute', 
    //top: verticalScale(180), 
    //left: scale(0), 
    right: scale(20), 
    bottom: scale(30), 
    //justifyContent: 'center', 
    //alignItems: 'center'
   },

   onImageTextTitle: {
    position: 'absolute', 
    right: scale(20), 
    bottom: scale(40), 
   },

   Block1_Titl1:{
    position: 'absolute', 
    //top: verticalScale(60), 
    //left: scale(130), 
    right: scale(20), 
    bottom: scale(55),
    width: '50%'
    //justifyContent: 'center', 
    //alignItems: 'center'
   },

   Block4_Titl4:{
    position: 'absolute', 
    top: scale(20), 
    left: scale(20), 
    width: '60%'
    //right: scale(90), 
    //justifyContent: 'center', 
    //alignItems: 'center'
   },

  onImageText:{
    color: COLORS.BASE_WHITE,
    fontSize: scale(35.5),
    fontWeight:'400', 
    fontFamily: 'NotoSans-italic'
  },

  Block2_Titl2:{
    bottom: scale(200),
    right:scale(20), 
    //top:verticalScale(0), 
   // left: scale(220),
    width: '45%',
    position: 'absolute',
    //justifyContent: 'center', 
    //alignItems: 'center'
  },

  showCollection:{
    color:'#fff',
    fontSize: scale(16.5),
    fontWeight:'800',
    textTransform:'uppercase'
  },

  textOnImages1:{
    position: 'absolute', 
    left: scale(20),
    bottom: scale(80), 
    //alignItems: 'flex-start'
  },
  textOnImages2:{
    position: 'absolute', 
    right: scale(20),
    top: scale(-20),
    //alignItems: 'flex-end'
  },

  heading: {
    paddingVertical: verticalScale(40),
    height: scale(400),
  },

  content: {
    backgroundColor: 'rgba(31, 40, 55, 0.8)',
    flex: 1,
    justifyContent: 'center'
  },
  containerModal: {
    width: width - scale(32),
    shadowColor: COLORS.BASE_BLACK,
    shadowOffset: { width: 0, height: .5 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
    borderRadius: 5,
    justifyContent: 'center',
    //backgroundColor: COLORS.BRAND_LIGHTEST,
    backgroundColor: '#f693b9',
    alignSelf: 'center'
  },

  descriptionBtnContainer: {
    marginHorizontal: scale(32)
  },

  TextStyle: {
    color: '#fff',
    textAlign: 'center',
    fontSize: scale(17),
  },
  newButton: {
    marginTop: scale(10),
    paddingTop: scale(10),
    paddingBottom: scale(10),
    marginLeft: scale(15),
    marginRight: scale(15),
    backgroundColor: '#f5a0c0',
    borderRadius: scale(30),
    borderWidth: scale(1),
    borderColor: '#fff'
  },
  langSelected: {
    width: '33%', 
    flexDirection: 'column',
    justifyContent: 'center', 
    alignItems: 'center',
    padding: scale(5),
  },
  langSelectBorder: {
    width: '33%', 
    flexDirection: 'column',
    justifyContent: 'center', 
    alignItems: 'center',
    borderWidth: scale(2),
    borderColor: '#f693b9',
    padding: scale(5),
  },
  langBoxSelect: {
    width: '50%', 
    borderWidth: scale(1), 
    borderColor: 'grey',
  },
  langBoxSelectBorder: {
    width: '50%', 
    borderWidth: scale(1), 
    borderColor: 'grey',
    backgroundColor: '#f693b9',
  },
    helpCenterBoxImage: {
    resizeMode: 'contain',
    width: scale(30),
    height: scale(30)
  },

  mainContainer: {
    flex: 1,
    paddingHorizontal: scale(16),
},
container1: {
  flex: 1,
  // remove width and height to override fixed static size
  width: null,
  height: null,
},
orMain: {
  justifyContent: 'center',
  alignItems: 'center',
  //paddingVertical: verticalScale(20)
},
orAndRestText: {
  fontSize : scale(12),
  //fontWeight: '600'
},
yesBtnTxt: {
  fontSize: scale(16),
  lineHeight: scale(19),
  fontWeight: Platform.OS === 'ios' ? '500' : '400',
  color: COLORS.BASE_WHITE
},
});
