import {StyleSheet, Platform } from 'react-native';
import {Dimensions} from 'react-native';
const {height, width} = Dimensions.get('window');
import * as COLORS from '../../utils/Color'
import { scale, verticalScale } from '../../utils/Scale';

export default StyleSheet.create({
  paragraphNormal: {
    fontSize: scale(14),
    fontWeight: '400',
    lineHeight: scale(20),
    fontFamily: 'Roboto',
    color: '#EB2D1E',
},
signupContainer: {
    paddingHorizontal: scale(16),
    paddingTop: scale(12),
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
    paddingBottom: 0,
},
help: {
    color: '#58606C',
    marginVertical: verticalScale(10),
},
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
    textTransform: 'uppercase',
    fontWeight: '700',
    color: '#f5a0c0',
},
inputLabel: {
    fontSize: scale(14),
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
buttonContainer: {
    flex: 1,
    justifyContent: 'center',
    //backgroundColor: '#F5FCFF',
    paddingVertical: scale(20),
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
imageSucccess: {
    paddingHorizontal: scale(5),
},
inputViewNull: {
    paddingBottom: scale(0),
},
inputViewIN: {
    flexDirection: 'row', 
    justifyContent: 'space-between'
},
inputViewINnull: {
    flexDirection: 'column', 
},
});
