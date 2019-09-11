import { StyleSheet, Platform } from 'react-native';
import { Dimensions } from 'react-native';
const { height, width } = Dimensions.get('window');
import * as COLORS from '../../utils/Color'
import { scale, verticalScale } from '../../utils/Scale';

export default StyleSheet.create({
    mainContainer: {
        flex: 1,
        paddingHorizontal: scale(16),
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
        borderTopWidth: 1,
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
        paddingHorizontal: scale(16),
        paddingVertical: verticalScale(8),
        marginBottom: scale(20)
    },
    orderBlock: {
        paddingVertical: verticalScale(10),
        //paddingHorizontal: scale(5),
        minHeight: scale(100),
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
        paddingVertical: scale(5)
    },
    orderBlockMargin: {
        backgroundColor: '#f4f4f4',
        marginTop: scale(5)
    },
    price: {
        color: COLORS.BRAND_DARKEST,
        textAlign: 'center',
        fontSize: scale(20)
    },
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
});
