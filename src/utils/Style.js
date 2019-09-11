import { StyleSheet, Platform } from 'react-native';
import { scale, verticalScale } from '../utils/Scale';
import ActualDimensions from './Device';
const { width, height } = ActualDimensions;
import * as COLORS from './Color';

export default StyleSheet.create({


	headerStyle: {
		height: Platform.OS === 'ios' ? 44 : 56,
		backgroundColor: COLORS.BRAND,
		elevation: 0,
		shadowOpacity: 0,
		justifyContent: 'center'
	},
	headerTitleStyle: {
		width: scale(300),
		fontSize: scale(20),
		fontFamily: 'Roboto',
		lineHeight: scale(28),
		fontWeight: "400",
		color: COLORS.BASE_DARKEST,
		textAlign: 'center',
		flexGrow: 1,
		alignSelf: 'center',
		marginLeft: Platform.OS === 'ios' ? scale(25) : scale(-30)
	},
	iconPaddingTop: {
	//	paddingTop: scale(2)
	},

    // Model css
	content: {
		backgroundColor: 'rgba(31, 40, 55, 0.8)',
		flex: 1,
		justifyContent: 'center'
	},
	container: {
		width: width - scale(32),
		shadowColor: COLORS.BASE_BLACK,
		shadowOffset: { width: 0, height: .5 },
		shadowOpacity: 0.1,
		shadowRadius: 2,
		elevation: 2,
		borderRadius: 5,
		justifyContent: 'center',
		backgroundColor: COLORS.BRAND_LIGHTEST,
		alignSelf: 'center'
		},
	modalIcon:{
		position: 'absolute',
		right: scale(20),
		top: scale(16)
		},
    
  // Buttons css	
	heroLargeButton: {
		borderRadius: scale(4),
		width: "100%",
		height: scale(46),
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: COLORS.BRAND_DARKEST,
        elevation: 0,
        borderRadius: scale(20)
	},
	heroLargeButtonSmallHeight: {
		borderRadius: scale(4),
		width: "100%",
		height: scale(30),
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: COLORS.INTERACTIVE_BASE,
		elevation: 0
	},
	neutralLargeButton: {
		borderRadius: scale(4),
		width: "100%",
		height: scale(46),
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: COLORS.BASE_LIGHTEST,
		elevation: 0
	},
	buttonBaseDarkestText: {
		fontSize: scale(16),
		color: COLORS.BASE_DARKEST,
		fontWeight: Platform.OS === 'ios' ? '500' : '400',
		fontStyle: 'normal',
		lineHeight: scale(20)
	},
	buttonBaseDarkestSmallText: {
		fontSize: scale(12),
		color: COLORS.BASE_DARKEST,
		fontWeight: Platform.OS === 'ios' ? '500' : '400',
		fontStyle: 'normal',
		lineHeight: scale(16)
	},
	buttonBrandDarkerText: {
		fontSize: scale(16),
		color: COLORS.BRAND_DARKER,
		fontWeight: Platform.OS === 'ios' ? '500' : '400',
		fontStyle: 'normal',
		lineHeight: scale(20)
    },
    descriptionBtnContainer: {
		marginHorizontal: scale(16)
    },
    heading: {
		alignItems: 'center',
		justifyContent: 'center',
		paddingVertical: verticalScale(32),
		flexDirection: 'row'
	},
	description: {
		paddingVertical: verticalScale(15)
	},
	descriptionText: {
		color: COLORS.BASE_BLACK,
		textAlign: 'center'
	},
    btnMain: {
		flexDirection: 'column',
		justifyContent: 'center',
		paddingVertical: verticalScale(20)
	},
	yesBtn: {
		marginVertical: verticalScale(10)
	},
	noBtn: {
		backgroundColor: COLORS.BASE_WHITE,
		marginVertical: verticalScale(10)
	},
	yesBtnTxt: {
		fontSize: scale(16),
		lineHeight: scale(19),
		fontWeight: Platform.OS === 'ios' ? '500' : '400',
		color: COLORS.BASE_WHITE
	},
	noBtnTxt: {
		fontSize: scale(16),
		lineHeight: scale(19),
		fontWeight: Platform.OS === 'ios' ? '500' : '400',
		color: COLORS.BRAND_DARKER
	},

// modal dropdown
	countryModalMain : {
        flexDirection: 'row',
        paddingVertical: verticalScale(10),
        //justifyContent: 'center',
        alignItems: 'stretch'
    },
    modalStyle: {
        height: scale(40),
        width: '100%',
        borderWidth: 1,
        borderColor: '#f5a0c0',
        borderRadius: scale(20),
        backgroundColor: COLORS.BASE_WHITE
    },
    modalDropdownStyle: {
        height: scale(160),
        width: scale(341),
        fontSize: scale(16),
        padding: scale(20),
        borderRadius: scale(20),
        marginTop: verticalScale(-40)
    },
    modalTextDropdownTextStyle: {
        fontSize: scale(16),
		padding: scale(10),
		marginRight: scale(175),
    },
    modalIcon:{
        position: 'absolute',
		right: scale(28),
		top: scale(12)
		},
		

			//heading css

	headline3: {
		fontSize: scale(28),
		fontFamily: 'Roboto'
	},
	headline4: {
		fontSize: scale(20),
		fontFamily: 'Roboto'
	},
	headline5: {
		fontSize: scale(16),
		fontFamily: 'Roboto'
	},
	headline6: {
		fontSize: scale(14),
		fontFamily: 'Roboto'
	},
	headline7: {
		fontSize: scale(12),
		fontFamily: 'Roboto'
	},
	headline8: {
		fontSize: scale(10),
		fontFamily: 'Roboto'
	},

	//heading Mobile css
	headlineM4: {
		fontSize: scale(24),
		fontFamily: 'Roboto'
	},
	headlineM5: {
		fontSize: scale(16),
		fontFamily: 'Roboto'
	},
	// Paragraph css	

	paragraphLarge: {
		fontSize: scale(16),
		fontFamily: 'Roboto'
	},
	paragraphNormal: {
		fontSize: scale(14),
		fontFamily: 'Roboto'
	},
	paragraphSmall: {
		fontSize: scale(12),
		fontFamily: 'Roboto'
	},

	headingTextColor: {
		color : COLORS.BASE_BLACK
	}
	
});