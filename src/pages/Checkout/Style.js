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
  breadcrumbMain: {
    flexDirection: 'row',
    justifyContent: 'center',
     alignItems: 'center',
     paddingVertical : verticalScale(16),
    // paddingHorizontal: scale(40)
  },
  breadcrumbBorder: {
    // marginTop: scale(20),
    borderWidth: 0.5,
    borderColor: COLORS.BASE_BORDER
  },
  breadcrumbTextMain: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
  },
  breadcrumbText: {
      fontSize: Platform.OS == 'ios' ? scale(12) : scale(11),
      color: COLORS.BASE_TEXT_GREY,
    //   fontFamily: 'NotoSans-Black'
  },
  breadcrumbLine: {
    color : COLORS.BASE_GREY,
  },
  breadcrumbCircleSmall: {
    height: scale(10),
    width: scale(10),
    borderRadius: scale(5),
    backgroundColor: COLORS.BASE_GREY,
    justifyContent: 'center',
    alignItems: 'center'
  },
  breadcrumbCircleLight: {
    height: scale(20),
    width: scale(20),
    borderRadius: scale(10),
    backgroundColor: COLORS.BRAND_LIGHTER,
    justifyContent: 'center',
    alignItems: 'center'
  },
  breadcrumbCircle: {
      height: scale(20),
      width: scale(20),
      borderRadius: scale(10),
      backgroundColor: COLORS.BRAND_DARKER,
      justifyContent: 'center',
      alignItems: 'center'
    },
    breadcrumbLine: {
        borderWidth: 0.5,
        borderColor: 'grey',
        width: '16%'   
    },

    voucherCheck: {
      height: scale(30),
      width: scale(30),
      borderRadius: scale(10),
      borderColor: COLORS.BRAND_DARKER,
      borderWidth: 1,
      //backgroundColor: 'black',
      justifyContent: 'center',
      alignItems: 'center'
    },

// delivery 

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
  borderWidth : 1.5,
  borderColor: COLORS.BRAND_DARKER
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








 // order COnfirmation
 mainContainer: {
    flex: 1,
    // paddingHorizontal: scale(16),
},
headerTxt: {
    fontSize: scale(20),
    fontWeight: 'bold'
},
headerSubTxt: {
    fontSize: scale(16),
},
orderProduct: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    // borderTopWidth: 1,
    borderColor: '#c4c4c4',
},
imageContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'stretch',
    paddingBottom: scale(5),
    width: '40%'
},
orderSummary: {
    // paddingHorizontal: scale(16),
    paddingVertical: verticalScale(8),
    // marginBottom: scale(20)
},  
orderBlock: {
    paddingVertical: verticalScale(10), 
    //backgroundColor: '#f4f4f4', 
    minHeight: scale(100),
},
orderBlock1: {
  paddingVertical: verticalScale(10),
  paddingHorizontal: scale(16),
  minHeight: scale(120),
},
orderBlockHeading: {
    paddingHorizontal: scale(5), 
    fontSize: scale(15)
},
orderBlockHeadingBelow: {
    paddingBottom: scale(30), 
    paddingVertical: verticalScale(3)
},
orderBlockHeadingTxt: {
    paddingHorizontal: scale(2), 
    fontSize: scale(20)
},
alignRow: {
    width: '100%', 
    flexDirection: 'row', 
    justifyContent: 'space-between',
    paddingVertical: scale(10)
},
orderBlockMargin: {
    // marginTop: scale(5),
    backgroundColor: '#f4f4f4', 
    paddingHorizontal: scale(16), 
},
price: {
    color: COLORS.BRAND_DARKEST, 
    textAlign: 'center',
    fontSize: scale(20)
},   


//CartItem Stylesheet
orderProduct: {
  flexDirection: 'row',
  borderBottomWidth: 1,
  borderTopWidth: 1,
  borderColor: '#c4c4c4',
},
imageContainer: {
  flex: 1,
  padding: scale(5),
  width: '30%',
  left: scale(-22),
  zIndex: 1,
},
// orderBlock: {
//   paddingVertical: verticalScale(10), 
//   paddingHorizontal: scale(7), 
//   minHeight: scale(120),
// },
Nprice: {
  color: COLORS.BRAND_DARKEST, 
  textAlign: 'center',
  fontSize: scale(20),
  fontWeight: 'bold',
},
Wprice: {
  color: COLORS.BRAND_DARKEST, 
  textAlign: 'center',
  fontSize: scale(20),
  textDecorationLine: 'line-through'
},
price: {
  color: COLORS.BRAND_DARKEST, 
  textAlign: 'center',
  fontSize: scale(20)
},
modalIcon:{
  width: '33%', 
  flexDirection: 'column',
  justifyContent: 'center', 
  alignItems: 'center',
  padding: scale(5),
  },
  box: {
    width: '34%', 
    height: scale(40),
    width: scale(40),
    flexDirection: 'column',
    justifyContent: 'center', 
    alignItems: 'center',
    borderWidth: scale(2),
    borderColor: '#f693b9',
    padding: scale(5),
    margin: scale(5),
    zIndex: 1,
},

//delivery Page
borderBox: {
  borderColor: COLORS.BASE_BORDER,
  borderWidth: scale(1),
  borderTopWidth: scale(2),
  // flexDirection: 'row', 
  // justifyContent: 'space-between', 
  // margin: scale(16)
},
brdBottom: {
  borderBottomColor: COLORS.BASE_BORDER,
  borderWidth: 0.5,
},


backButton: {
  width: '16%', 
  top: scale(10), 
  //justifyContent: 'space-between', 
  alignItems: 'center',
  borderColor: '#d686a4',
  borderWidth: scale(1),
  height: scale(45),
},
checkOutButtonTxt: {
  textAlign: 'center', 
  top: scale(10), 
  fontSize: scale(20), 
  color: '#fff'
},
checkOutButton: {
  backgroundColor: '#f693b9', 
  width: '84%', 
  height: scale(45),
  borderColor: '#d686a4',
  borderWidth: scale(1),
},

paragraphNormal: {
  fontSize: scale(14),
  fontWeight: '400',
  lineHeight: scale(20),
  fontFamily: 'Roboto',
  color: '#EB2D1E',
},
error: {
  color: '#EB2D1E',
  //marginLeft:5,
  marginVertical: verticalScale(10)
},


buttonContainer: {
  flex: 1,
  justifyContent: 'center',
  //backgroundColor: '#F5FCFF',
  paddingVertical: scale(20),
  paddingBottom: scale(40),
},
newButton: {
  marginTop: scale(10),
  paddingTop: scale(10),
  paddingBottom: scale(10),
  marginLeft: scale(10),
  marginRight: scale(10),
  backgroundColor: '#f5f5f5',
  borderRadius: scale(30),
  borderWidth: scale(1),
  borderColor: '#fff'
},
TextStyle: {
  color: '#737373',
  textAlign: 'center',
  fontSize: scale(20),
},
orderCartData: {
  flex: 1,
  paddingHorizontal: scale(16),
}
});
