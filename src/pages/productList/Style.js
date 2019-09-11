import {StyleSheet, Platform } from 'react-native';
import {Dimensions} from 'react-native';
const {height, width} = Dimensions.get('window');
import * as COLORS from '../../utils/Color'
import { scale, verticalScale } from '../../utils/Scale';

export default StyleSheet.create({

    container: {
      flex: 1,
      backgroundColor: '#F8F8F8',
    },
    filterSortBorder:{
      borderWidth: 0.5,
      borderColor: 'lightgrey',
    },
    filterSortMain:{
      flexDirection : 'row',
      height: scale(50),
      alignItems: 'center',
      justifyContent: 'space-evenly',
      backgroundColor: 'white'
    },
    filterSort: {
      alignItems: 'center'
    },
    filterSortText: {
      fontSize: scale(18),
    },
    itemText: {
      fontSize: scale(16),
      fontWeight: '600',
      textAlign: 'center',
      paddingBottom: scale(5),
      fontFamily: 'VAGRoundedELC-Light'
    },
    itemText1: {
      fontSize: scale(16),
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

    mainImageSize: {
      width : width - 90,
      height: scale(450),
      left: 15,
    },

  scrollImageSize: {
    width :'90%',
    height: width/2,
    resizeMode: 'contain',
    
  },

  youMayText: {
    fontSize: scale(20)
  },
  
  bottomTermsText: {
    fontSize: scale(12),
  },

  tempImage: {
    width: verticalScale(30),
    height: scale(30),
    // borderWidth: 1,
    // borderColor: 'lightgrey',
  },

  bottomTerms: {
    flexDirection: 'row',
    width: '50%',
    alignItems: 'center'
  },

  bottomTermsMain: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: verticalScale(10)
  },

  border : {
    borderWidth: 1,
    borderColor: 'lightgrey'
  },

  minusPlus: {
    width:verticalScale(35),
    height:scale(35),
    backgroundColor: '#e8e8e8',
    justifyContent:'center',
    alignItems:'center'
  },

  quantitySet: {
    width:verticalScale(190),
    height:scale(40),
    flexDirection: 'row',
    paddingHorizontal: scale(10),
    justifyContent: 'space-between',
    alignItems:'center',
    borderColor: 'lightgrey',
    borderWidth: 1
  },

  sizeSize: {
    width:verticalScale(40),
    height:scale(40),
    justifyContent: 'center',
    alignItems:'center',
    borderColor: 'lightgrey',
    borderWidth: 1,
    marginRight: scale(10),
    flexDirection:'row',
  },

  sizeBandSize:{
    width:verticalScale(60),
    height:scale(40),
    justifyContent: 'center',
    alignItems:'center',
    borderColor: 'lightgrey',
    borderWidth: 1,
    marginRight: scale(10),
  },

  amountText: {
    fontSize: scale(16),
    color: 'red'
  },

  itemText4 : {
    fontSize: scale(16),
  },

  itemTextThired : {
    fontSize: scale(14),
    lineHeight: scale(20),
    width: '100%',
    color: '#3b3b3b'
  },
  
  itemTextSecond : {
    fontSize:scale(18),
    paddingVertical: verticalScale(5)

  },

  itemTextFirst : {
    fontSize: scale(24),
    color: '#f5a0c0',
    paddingVertical: verticalScale(3)
  },

  itemTextDetail : {
    fontSize: scale(26),
  },

  productDetailSize:{
    flexDirection: "row", 
    justifyContent: 'space-between', 
    paddingTop: scale(5)
  },

  productColor:{
    paddingVertical: verticalScale(10),
    // flexDirection:'row',
  },

  sizeImage:{
    flexDirection: 'row',
    alignItems:'center',
  },

  onImageView:{
    position: 'absolute',
    right: scale(30), 
    // bottom: scale(0), 
    top:scale(10)
   },

  favouriteImage:{
    tintColor:'#888',
    width: scale(30),
    height: scale(30),
  },

  scrollImage:{
    tintColor:'#888',
    width: scale(15),
    height: scale(15),
    left: scale(13)
  },

  downlaodImage:{
    tintColor:'#fff',
    width: scale(20),
    height: scale(20),
  },

  productColorList:{
    width:scale(40),
    height:scale(40),
    borderWidth: 1,
    borderColor:'#f5a0c0', 
    marginRight: scale(10), 
    borderRadius: scale(20)
  },

  productImagesList:{
    width:scale(40),
    height:scale(60),
    borderWidth: 1,
    marginBottom:scale(20),
  },


  heroLargeButton: {
    borderRadius: scale(4),
    width: "20%",
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.BRAND_DARKEST,
    elevation: 0,
    borderRadius: scale(20)
  },
  
  pageViewStyle: { 
    flex: 1, 
    backgroundColor: 'black'
  },

  addToCart:{
    backgroundColor: '#f693b9',
    width: '75%', 
    height: scale(45) 
  },

  playImage:{
    tintColor:'#888',
    width: scale(20),
    height: scale(20),
    position:'absolute',
    top:scale(17),
    left: scale(10)
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

  contentSortBy: {
    height: '100%',
    top: '23%',
  },
  
	containerSortBy: {
		width: width - scale(10),
		shadowColor: COLORS.BASE_BLACK,
    // shadowOffset: { width: 0, height: .5 },
    borderWidth:.3,
    borderColor:'#c1c1c1',
		elevation: 2,
		justifyContent: 'center',
		backgroundColor: COLORS.BRAND_LIGHTEST,
		alignSelf: 'center'
  },
  containerFilterBy: {
		width: width - scale(50),
		shadowColor: COLORS.BASE_BLACK,
    // shadowOffset: { width: 0, height: .5 },
    borderWidth:.3,
    borderColor:'#c1c1c1',
		elevation: 2,
    backgroundColor: COLORS.BRAND_LIGHTEST,
    position: 'absolute', right: 0
  },
  
});
