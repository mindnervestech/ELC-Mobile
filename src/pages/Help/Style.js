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
        fontSize: scale(30),
        paddingVertical: verticalScale(3),
        fontWeight: '500',
        textAlign: 'center',
        
        //textAlign: 'center',
    },


    //-----------------------------------------Payment Methods Style-------------------------------------
    // title: {
    //     fontSize: scale(30),
    //     paddingVertical: verticalScale(3),
    //     textAlign: 'center',
    // },
    // line: {
    //     fontSize: scale(16),
    //     paddingTop: scale(5),
    // },
    // insideLine: {
    //     paddingVertical: verticalScale(3),
    //     fontSize: scale(16),
    // },
    // bulletStyle: {
    //     flexDirection: 'row',
    //     justifyContent: 'space-between',
    //     paddingHorizontal: scale(20),
    // },
    // width95: {
    //     fontSize: scale(16),
    //     width: '95%',
    // },

    //-----------------------------------------Terms and Conditions Style-------------------------------------
    // mainContainer: {
    //     flex: 1,
    //     paddingHorizontal: scale(10),
    //   },
    //   title: {
    //     fontSize: scale(20),
    //     paddingVertical: scale(5),
    //     textAlign: 'center',
    //   },
    //   heading: {
    //     fontWeight: '600',
    //     fontSize: scale(16),
    //     paddingTop: scale(3),
    //   },
    //   headingText: {
    //     paddingVertical: verticalScale(5),
    //     fontSize: scale(16),
    //   },
    //   darkFont: {
    //     fontWeight: '600',
    //   },
    //   bulletStyle: {
    //     flexDirection: 'row',
    //     justifyContent: 'space-between',
    //     paddingHorizontal: scale(20),
    //   },
    //   width95: {
    //     fontSize: scale(16),
    //     width: '95%',
    //   },
    //   underline: {
    //     textDecorationLine: "underline",
    //  },

    //-----------------------------------------Privacy Policy Style-------------------------------------
    // container: {
    //     flex: 1,
    //     justifyContent: 'center',
    //     alignItems: 'center'
    // },
    // mainContainer: {
    //     flex: 1,
    //     paddingHorizontal: scale(10),
    // },
    // top: {
    //     justifyContent: 'center',
    // },
    // title: {
    //     fontSize: scale(30),
    //     paddingVertical: verticalScale(3),
    //     textAlign: 'center',
    // },
    // allText: {
    //     paddingVertical: verticalScale(3),
    //     fontSize: scale(16),
    // },
    // darkFont: {
    //     fontWeight: '600',
    // },
    // bulletStyle: {
    //     flexDirection: 'row',
    //     justifyContent: 'space-between',
    // },
    // width95: {
    //     fontSize: scale(16),
    //     width: '95%',
    // },

    //-----------------------------------------Return Policy Style-------------------------------------
    // container: {
    //     flex: 1,
    //     justifyContent: 'center',
    //     alignItems: 'center'
    // },
    // mainContainer: {
    //     flex: 1,
    //     paddingHorizontal: scale(10),
    // },
    // title: {
    //     fontSize: scale(30),
    //     paddingVertical: verticalScale(3),
    //     textAlign: 'center',
    // },
    // allText: {
    //     paddingVertical: verticalScale(3),
    //     fontSize: scale(16),
    // },
    // underline: {
    //     textDecorationLine: "underline",
    // },
    // bulletStyle: {
    //     flexDirection: 'row',
    //     justifyContent: 'space-between',
    // },
    // width95: {
    //     fontSize: scale(16),
    //     width: '95%',
    // },


    //-----------------------------------------Delivery Policy Style-------------------------------------   
    // container: {
    //     flex: 1,
    //     justifyContent: 'center',
    //     alignItems: 'center'
    // },
    // mainContainer: {
    //     flex: 1,
    //     paddingHorizontal: scale(16),
    // },
    // title: {
    //     fontSize: scale(30),
    //     paddingVertical: verticalScale(3),
    //     textAlign: 'center',
    // },
    // allText: {
    //     paddingVertical: verticalScale(3),
    //     fontSize: scale(16),
    // },
    // newButton: {
    //     marginTop: scale(10),
    //     paddingTop: scale(10),
    //     paddingBottom: scale(10),
    //     marginLeft: scale(10),
    //     marginRight: scale(10),
    //     backgroundColor: '#f5a0c0',
    //     borderRadius: scale(30),
    //     borderWidth: scale(1),
    //     borderColor: '#fff'
    //   },


    //-----------------------------------------FAQ Style-------------------------------------     
    // container: {
    //     flex: 1,
    //     justifyContent: 'center',
    //     alignItems: 'center'
    // },
    // mainContainer: {
    //     flex: 1,
    //     paddingHorizontal: scale(10),
    // },
    // title: {
    //     fontSize: scale(30),
    //     paddingVertical: verticalScale(3),
    //     textAlign: 'center',
    // },
    // question: {
    //     fontWeight: '600',
    //     fontSize: scale(16),
    //     paddingTop: scale(3),
    // },
    // answer: {
    //     paddingVertical: verticalScale(5),
    //     fontSize: scale(16),
    // },
    // underline: {
    //     textDecorationLine: "underline",
    // },
    // bulletStyle: {
    //     flexDirection: 'row',
    //     justifyContent: 'space-between',
    // },
    // width95: {
    //     fontSize: scale(16),
    //     width: '95%',
    // },
    // answerBold: {
    //     fontWeight: '600',
    //     fontSize: scale(16),
    //     paddingTop: scale(3),
    // },
    // paddingVertical2: {
    //     paddingVertical: verticalScale(2),
    // },

    //-----------------------------------------About Us Style------------------------------------- 
    // container: {
    //     flex: 1,
    //     justifyContent: 'center',
    //     alignItems: 'center'
    // },
    // mainContainer: {
    //     flex: 1,
    //     paddingHorizontal: scale(16),
    // },
    // title: {
    //     fontSize: scale(30),
    //     paddingVertical: verticalScale(3),
    //     textAlign: 'center',
    // },
    // allText: {
    //     paddingVertical: verticalScale(3),
    //     fontSize: scale(16),
    // },
});
