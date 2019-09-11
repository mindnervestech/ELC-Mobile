import {StyleSheet, Platform } from 'react-native';
import {Dimensions} from 'react-native';
const {height, width} = Dimensions.get('window');
import * as COLORS from '../../utils/Color'
import { scale, verticalScale } from '../../utils/Scale';

export default StyleSheet.create({
  mainContainer: {
    flex: 1,
  },
  imageContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'stretch',
    paddingBottom: scale(5),
  },
  profileText: {
    paddingHorizontal: scale(20),  
  },
  title: {
    fontSize: scale(30),
    textTransform:'uppercase',
    fontWeight: '700',
    color: '#f5a0c0',
  },
  inputLabel: {
    fontSize: scale(14),
  },
  addressheader: {
    fontWeight: '700',
    left: scale(0), 
  },
  leftContainer: {
    fontSize: scale(12),
    justifyContent: 'flex-start'
  },
  border : {
    borderWidth: 1,
    borderColor: 'lightgrey'
  },
  amountText: {
    fontSize: scale(16),
    fontWeight: '700',
    color: 'red'
  },
  onImageView:{
    position: 'absolute',
    right: scale(0), 
    // bottom: scale(0), 
    top:scale(10)
   },
  favouriteImage:{
    tintColor:'#f5a0c0',
    width: scale(30),
    height: scale(30),
  },
  inputText: {
      fontSize: scale(18),
      borderBottomWidth: 1,
      borderColor: '#f5a0c0',
      paddingVertical: 0,
      color: '#f5a0c0',
  },
  inputFields: {
    paddingBottom: scale(15),
  },

  mainContainer: {
    flex: 1,
    paddingHorizontal: scale(16),
  },  
tabs: {
  flex: 1,
  flexDirection: 'row',
  paddingVertical: scale(10),
},
tabText: {
  color: COLORS.BASE_BLACK
},
tabTextB: {
  color: COLORS.BRAND_DARKEST,
  borderBottomWidth: scale(2),
  borderBottomColor: COLORS.BRAND_DARKEST,
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
profileData:{
  flex:1,
  padding: scale(10),
  backgroundColor: '#ededed',
},
fontTxt: {
  fontSize: scale(12),
},
inputView: {
  paddingBottom: scale(15),
},
inputField: {
  fontSize: scale(14),
},
inputFieldText: {
  height: verticalScale(40),
  fontSize: scale(16),
  borderBottomWidth: scale(1),
  borderColor: '#f5a0c0',
  paddingVertical: 0,
  color: '#0f0d0d',
},
inputFieldTextError: {
  height: verticalScale(40),
  fontSize: scale(16),
  borderBottomWidth: scale(1),
  borderColor: '#EB2D1E',
  paddingVertical: 0,
  color: '#EB2D1E',
},
error: {
  color: '#EB2D1E',
  //marginLeft:5,
  marginVertical: verticalScale(10)
},
iconHideShow: {
  //zIndex: 9999,
  flexDirection: 'row',
  position: 'absolute',
  top: verticalScale(25),
  right: 0
},
newButton: {
  marginTop: scale(10),
  paddingTop: scale(10),
  paddingBottom: scale(10),
  marginLeft: scale(10),
  marginRight: scale(10),
  backgroundColor: '#f5a0c0',
  borderRadius: scale(30),
  borderWidth: scale(1),
  borderColor: '#fff'
},
saveButton: {
  width: scale(80),
  paddingTop: scale(10),
  paddingBottom: scale(10),
  marginLeft: scale(10),
  marginRight: scale(10),
  backgroundColor: '#f5a0c0',
  borderRadius: scale(30),
  borderWidth: scale(1),
  borderColor: '#fff'
},
addContactButton: {
  width: scale(100),
  backgroundColor: '#f5a0c0',
  borderRadius: scale(30),
  marginRight: scale(10),
  borderWidth: scale(1),
  borderColor: '#fff'
},
cancelButton: {
  width: scale(100),
  paddingTop: scale(10),
  paddingBottom: scale(10),
  marginLeft: scale(10),
  marginRight: scale(10),
  color: '#000',
  backgroundColor: '#f5f5f5',
  borderRadius: scale(30),
  borderWidth: scale(1),
  borderColor: '#f5f5f5'
},
TextStyle: {
  color: '#fff',
  textAlign: 'center',
  fontSize: scale(8),
},
saveStyle: {
  color: '#fff',
  textAlign: 'center',
  fontSize: scale(12),
},
cancelStyle: {
  color: '#363636',
  textAlign: 'center',
  fontSize: scale(12),
},
headingView: {
  alignItems: 'center',
  justifyContent: 'center',
  //flex: 1,
  flexDirection: 'row', 
  marginTop: scale(5), 
  marginBottom: scale(25),
},
orderTable: {
  flexDirection: 'row',
  borderWidth: scale(1),
  borderColor: COLORS.BASE_BORDER,
},
orderColumn: {
  width: '19%', 
  flexDirection: 'row',
  justifyContent: 'center',
  alignContent: 'center',
  paddingVertical: verticalScale(8),
},
orderHeading: {
  flex: 1, 
  paddingHorizontal: scale(10), 
  paddingVertical: verticalScale(5), 
},
itemText: {
  fontSize: scale(14),
  fontWeight: '400',
  textAlign: 'center',
  paddingBottom: scale(5),
  fontFamily: 'VAGRoundedELC-Light'
},
itemText1: {
  fontSize: scale(12),
  textAlign: 'center',
  paddingBottom: scale(5)
},
itemText2: {
  fontSize: scale(18),
  fontWeight: '600',
  textAlign: 'center',
  paddingBottom: scale(5),
  color: 'red'
},
itemText3: {
  fontSize: scale(12),
  fontWeight:'100',
  color:'#fff'
},
discoverMode:{
  width: '100%', 
  height: '100%',
  alignItems: 'center', 
  backgroundColor: '#f298b8eb', 
  zIndex:2, 
  position:'absolute' 
},

closeOnImgScreen:{
  top:scale(10), 
  right:scale(10) ,
  position:'absolute',
},

discoverMore:{
  height: scale(30), 
  borderRadius: scale(20), 
  backgroundColor: '#fff', 
  justifyContent: 'center', 
  alignItems: 'center' 
},

// Edit Address 
topBoxMain: {
  borderWidth : 0.5,
  borderColor: COLORS.BASE_BORDER,
  padding: scale(5)
},
topBoxSelection: {
  borderWidth : 0.5,
  borderColor: COLORS.BASE_BORDER,
  width: '49%',
  padding: scale(15),
  alignItems: 'center'
},
topBoxSelectionChange: {
  borderWidth : 0.5,
  borderColor: COLORS.BRAND_LIGHTER
},

inputView: {
  paddingBottom: scale(15),
},
inputField: {
  fontSize: scale(14),
},
inputFieldText: {
  height: verticalScale(40),
  fontSize: scale(16),
  borderBottomWidth: scale(1),
  borderColor: '#f5a0c0',
  paddingVertical: 0,
  color: '#0f0d0d',
},
inputFieldTextError: {
  height: verticalScale(40),
  fontSize: scale(16),
  borderBottomWidth: scale(1),
  borderColor: '#EB2D1E',
  paddingVertical: 0,
  color: '#EB2D1E',
},
error: {
  color: '#EB2D1E',
  //marginLeft:5,
  marginVertical: verticalScale(10)
},
phoneInputImageFlag: {
  width: scale(30),
  height: scale(20)
},
phoneInput: {
  color: '#1F2837',
},
codeBorder: {
  //width:"90%",
  justifyContent: 'center',
  borderBottomWidth: 1,
  borderBottomColor: '#f5a0c0',
},
country: {
  width: "30%"
},
mobile: {
  width: "66%"
},
yesNoBox: {
  borderWidth : 0.5,
  borderColor: COLORS.BASE_BORDER,
  width: '49%',
  padding: scale(10),
  alignItems: 'center',
  backgroundColor: '#f5f5f5'
},
yesNoBoxSelection:{
  backgroundColor: '#f693b9',
},

});
