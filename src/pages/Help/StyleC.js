import {StyleSheet, Platform } from 'react-native';
import {Dimensions} from 'react-native';
const {height, width} = Dimensions.get('window');
import * as COLORS from '../../utils/Color'
import { scale, verticalScale } from '../../utils/Scale';

export default StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
},
mainContainer: {
    flex: 1,
    paddingHorizontal: scale(16),
},
title: {
    fontSize: scale(20),
    paddingVertical: verticalScale(5),
    textAlign: 'center',
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
modalIcon:{
    position: 'absolute',
    right: scale(25),
    top: scale(14)
    },
    
error: {
    paddingBottom: scale(0),
},
commentText: {
    height: scale(100),
    fontSize: scale(18),
    borderBottomWidth: scale(1),
    borderColor: '#f5a0c0',
    justifyContent: "flex-start",
    paddingBottom: scale(10),
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
TextStyle: {
    color: '#fff',
    textAlign: 'center',
    fontSize: scale(20),
},
image: {
    width: scale(35),
    height: scale(35),
},
imageText: {
    fontSize: scale(16),
    paddingTop: scale(5),
    paddingHorizontal: scale(25),
},
imageTextContainer: {
    paddingHorizontal: scale(25),
    paddingVertical: verticalScale(20),
},
map: {
  height: 200,
  width: "100%",
  marginTop: scale(10)
},
imageContainer: {
    paddingVertical: scale(30),
},
pickerflexWrap: {
    flexWrap: 'wrap',
},
paddingBottom10: {
    paddingBottom: scale(10),
},
buttonContainer: {
    flex: 1,
    justifyContent: 'center',
    //backgroundColor: '#F5FCFF',
    paddingVertical: scale(3),
},
inputFieldTextError: {
    height: verticalScale(40),
    fontSize: scale(16),
    borderBottomWidth: scale(1),
    borderColor: '#EB2D1E',
    paddingVertical: 0,
    color: '#EB2D1E',
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
    width: "23%"
},
mobile: {
    width: "73%"
},
mobileView:{
    flexDirection: 'row', 
    justifyContent: 'space-between'
},

textContainerView:{
    flex: 1, 
    flexDirection: 'row', 
    paddingVertical: verticalScale(5)
},

imageContainerView:{
    flexDirection: 'row', 
    paddingHorizontal: 10, 
    justifyContent: 'space-evenly'
}

});
