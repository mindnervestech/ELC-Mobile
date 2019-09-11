import {StyleSheet, Platform } from 'react-native';
import {Dimensions} from 'react-native';
const {height, width} = Dimensions.get('window');
import * as COLORS from '../../utils/Color'
import { scale, verticalScale } from '../../utils/Scale';

export default StyleSheet.create({
  mainContainer: {
    flex: 1,
    paddingHorizontal: scale(16),
  },
  title: {
    fontSize: scale(20),
    paddingVertical: verticalScale(15),
    textAlign: 'left',
  },
  title1: {
    fontSize: scale(19),
    paddingVertical: verticalScale(15),
    textAlign: 'left',
  },
  belowTitle: {
    fontSize: scale(15),
    paddingVertical: verticalScale(18),
  },
  textBox: {
    fontSize: scale(18),
    borderBottomWidth: scale(1),
    borderColor: '#f5a0c0',
    paddingVertical: 0,
    color: '#f5a0c0',
    height: verticalScale(40),
  },
  inputBox: {
    paddingVertical: scale(8),
  },
  buttonContainer: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#F5FCFF',
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
  paddingVertical30: {
    paddingVertical: scale(25),
  },
  paddingBottom30: {
    paddingBottom: scale(25),
  },
  allText: {
    paddingVertical: verticalScale(1),
    fontSize: scale(16),
  },
  bulletStyle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 3,
  },
  width95: {
    fontSize: scale(16),
    width: '95%',
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
  iconHideShow: {
		//zIndex: 9999,
		flexDirection: 'row',
    position: 'absolute',
    top: verticalScale(33),
    right: 0
  },
  hideShow: {
		paddingLeft: scale(5),
		color: '#58606C'
		//width: scale(50)
  },
  paragraphSmall: {
		fontSize: scale(12),
		fontWeight: '400',
		lineHeight: scale(18),
		fontFamily: 'Roboto'
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
});
