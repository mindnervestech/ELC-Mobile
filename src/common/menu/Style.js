import {StyleSheet, Platform } from 'react-native';
import {Dimensions} from 'react-native';
const {height, width} = Dimensions.get('window');
import * as COLORS from '../../utils/Color'
import { scale, verticalScale } from '../../utils/Scale';

export default StyleSheet.create({
    container: {
        alignItems: 'center',
    },
        loginContainer : {
        alignItems: 'center',
        justifyContent: 'flex-start',
        flexDirection: 'row',
        marginHorizontal: scale(20)
    },
    searchConatiner: {
        justifyContent: 'flex-start',
        flexDirection: 'row',
        alignItems: 'center',
        marginHorizontal: scale(20),
        borderBottomColor: '#e3e3e3',
        borderBottomWidth: 1,
        marginBottom: 15
    },
    searchTextInput: {
        height: verticalScale(50),
        borderColor: '#fff',
        borderWidth: 1,
        width: "100%"
    },
    headerContainer: {
        height: verticalScale(150),
    },
    headerText: {
        color: '#fff8f8',
    },
    screenContainer: { 
        paddingTop: verticalScale(20),
        width: '100%',
    },
    screenStyle: {
        height: scale(30),
        marginTop: scale(2),
        flexDirection: 'row',
        alignItems: 'center',
        width: '100%'
    },
    screenTextStyle:{
        fontSize: scale(20),
        fontFamily: 'Roboto',
        marginLeft: scale(20), 
        textAlign: 'center'
    },
    selectedTextStyle: {
        fontWeight: 'bold',
        color: '#00adff'
    },
    activeBackgroundColor: {
        backgroundColor: 'grey'
    },
    selectCountryText: {
        fontSize : scale(20),
        fontWeight: '600'
    },
    countryImageTextMain: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    countryImage: {
        width: scale(70),
        height: scale(70),
        borderRadius: scale(35)
    },
    countryText:{
        paddingTop: scale(10)
    },
    orMain: {
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: verticalScale(20)
    },
    orAndRestText: {
        fontSize : scale(20),
        fontWeight: '600'
    },
    restOfWorldMain: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    countryModalMain : {
        flexDirection: 'row',
        paddingVertical: verticalScale(20),
        justifyContent: 'center',
        alignItems: 'center'
    },
    modalStyle: {
        height: scale(40),
        width: scale(260),
        borderWidth: 1,
        borderColor: 'lightgrey',
        borderRadius: scale(20),
        backgroundColor: COLORS.BASE_WHITE
    },
    modalDropdownStyle: {
        height: scale(150),
        width: scale(260),
        fontSize: scale(16),
        padding: scale(20),
        borderRadius: scale(20),
        marginTop: verticalScale(-40)
    },
    modalTextDropdownTextStyle: {
        fontSize: scale(16),
        padding: scale(10)
    },
    modalIcon:{
        position: 'absolute',
        right: scale(25)
    },
    selectLanguageMain: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        paddingVertical: verticalScale(10)
    },
    collapseTextPlus: {
        borderBottomColor: '#D3D3D3',
        //borderTopColor: '#D3D3D3',
        borderBottomWidth: scale(1),
        paddingVertical: scale(10),
        flexDirection:'row'
    },
    collapseTextPlusStart: {
        borderBottomColor: '#D3D3D3',
        borderBottomWidth: scale(1),
        borderTopColor: '#D3D3D3',
        borderTopWidth: scale(1),
        paddingVertical: scale(10),
        flexDirection:'row'
    },
    belowIcons: {
        flex: 1, 
        flexDirection: 'row', 
        paddingHorizontal: scale(20), 
        paddingVertical: verticalScale(10), 
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    paddingLR: {
        paddingLeft: scale(20),
    },
    circleIcons: {
        borderWidth:1,
       borderColor:'rgba(0,0,0,0.2)',
       alignItems:'center',
       justifyContent:'center',
       width:scale(50),
       height:scale(50),
       borderColor: '#f5a0c0',
       //backgroundColor:'#fff',
       borderRadius:scale(40),
       borderWidth: scale(2)
    },
    
    helpCenterBoxImage: {
        resizeMode: 'contain',
        width: scale(30),
        height: scale(30)
      },

    menuList:{
        marginHorizontal: scale(40), 
        justifyContent:'space-between', 
        flexDirection: 'row', 
        alignItems: 'center', 
        marginBottom: scale(12)
    },

    offersList:{
        marginHorizontal: scale(40), 
        justifyContent:'space-between', 
        flexDirection: 'row', 
        alignItems: 'center', 
        marginBottom: scale(12),
    },

    styleCollection:{
        paddingVertical: verticalScale(14), 
        marginTop: scale(5),
        flexDirection:'row'
    }
});
