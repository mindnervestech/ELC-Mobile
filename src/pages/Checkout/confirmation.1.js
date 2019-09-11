import React, { Component } from 'react';
import {
    Platform,
    Text,
    View,
    StyleSheet,
    Button,
    ScrollView,
    Linking,
    TextInput,
    TouchableOpacity,
    Image,
    Picker,
    ActivityIndicator,
    Modal,
    FlatList,
} from 'react-native';

import I18n from '../../localization/index';
import * as CONSTV from '../../utils/Const';
import SubHeader from '../../common/header/subHeader'
import styles from './Style'
import Validators from '../../utils/Validators';
import * as MESSAGE from '../../utils/Message';
import { scale, verticalScale } from '../../utils/Scale';
import Footer from '../../common/footer';
import HeaderComm from '../../common/header/header';
import COMMONSTYLE from '../../utils/Style';
import MaterialIcons from "react-native-vector-icons/MaterialCommunityIcons";
import * as COLORS from '../../utils/Color';
import showToast from "../../helper/Toast";
import { connect } from 'react-redux';
import { orderConfirm } from '../../actions/CheckoutAction';
// import RNPayfortSdk from 'react-native-payfort-sdk';
// import RNReactNativePayfortSdk from 'react-native-payfort-sdk';

import Util from '../../utils/Util';
let { RNReactNativePayfortSdk } = require('react-native').NativeModules;

let { RNPayfortSdk } = require('react-native').NativeModules;



class confirmation extends Component {

    constructor(props) {
        super(props);

        this.state = {
            activityIndicator: true,
            orderStatus: true,
            orderData: {},
        }
    }

    componentWillMount() {
        // var obj ={quote_id: "42030",
        // store_id: 4}
        // this.props.orderConfirmation(obj)
    }

    componentWillReceiveProps(nextProps) {
    }

    doProcced = () => {

        // let options = {
        //     isLive: false, // true for production, false for sandbox
        //     access_code: '6iUcsMiC6NK2wEVrcHjT', // Access Code
        //     command: 'AUTHORIZATION', //Command (AUTHORIZATION, PURCHASE)
        //     merchant_identifier: 'khjDvejA', //The Merchant Identifier
        //     merchant_reference: '2060146643', //The Merchant’s unique order number (XYZ9239-yu8100)
        //     merchant_extra: 6, //Extra data sent by merchant. Will be received and sent back as received. Will not be displayed in any report
        //     merchant_extra1: '', //Extra data sent by merchant. Will be received and sent back as received. Will not be displayed in any report
        //     merchant_extra2: '', //Extra data sent by merchant. Will be received and sent back as received. Will not be displayed in any report
        //     merchant_extra3: '', //Extra data sent by merchant. Will be received and sent back as received. Will not be displayed in any report
        //     merchant_extra4: '', //Extra data sent by merchant. Will be received and sent back as received. Will not be displayed in any report
        //     customer_name: '', //The customer’s name
        //     customer_email: 'assed@gmail.com', //The customer’s email (email@domain.com)
        //     phone_number: '', //The customer’s phone number (00962797219966)
        //     payment_option: '', //Payment option (MASTERCARD,VISA,AMEX)
        //     language: 'en', // The checkout page and messages language (en, ar)
        //     currency: 'USD', //The currency of the transaction’s amount in ISO code 3 (EGP)
        //     amount: 1000, //The transaction’s amount
        //     order_description: 'iPhone 6-S' //A description of the order
        // };
        // Payfort.initPayfort(options, (err, results) => {
        //     if (err) {
        //         console.log("error initializing Payfort: ", err);
        //         return;
        //     }
        //     // Payfort initialized...
        //     console.log(results)
        // });


        let data = {};
        data['is_live'] = "0";          // require field
        data['access_code'] = '6iUcsMiC6NK2wEVrcHjT';          // require field
        data[Platform.OS== 'ios'? 'merchant_identifier' : 'merchant_identify'] = 'khjDvejA';        // require field
        data['request_phrase'] = 'TESTSHAIN';              // require field
        data['customer_email'] = 'test@payfort.com';       // require field
        data['language'] = 'en';     
        data['currency'] = 'USD';           // require field
        data['amount'] = '10';                          // require field
        data['merchant_reference'] = '1357845884';          // require field
        data['customer_name'] = 'Glenn';
        data['customer_ip'] = '110.5.74.2';
        //data['payment_option'] = 'VISA';
        data['order_description'] = 'Order for testing';
        if(Platform.OS == 'ios') {    
         RNReactNativePayfortSdk.openPayfort(data, (response) => {
            console.log('response response',response);
        }, (message) => {
            console.log('message message ', message);
            // Message in case payment is failure or cancel
        }) 
    }else{
        RNPayfortSdk.openPayfort(data, (response) => {
            console.log('response response',response);
        }, (message) => {
            console.log('message message ', message);
            // Message in case payment is failure or cancel
        })
    }



    }

    render() {
        return (
            <View style={{ flex: 1 }}>
                <TouchableOpacity style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }} onPress={() => this.doProcced()}>
                    <Text>Procced</Text>
                </TouchableOpacity>
            </View>
        )
    }

    // render() {
    //     return (
    //         <View style={{ flex: 1 }}>
    //             {/* <HeaderComm changeLang={this.changeLang} navigation={this.props.navigation} /> */}
    //             {this.state.activityIndicator ?
    //                 <ScrollView showsVerticalScrollIndicator={false}>
    //                     <View style={styles.mainContainer}>
    //                         <View style={{ paddingVertical: verticalScale(16) }}>
    //                             <View>
    //                                 <Text style={styles.headerTxt}>{this.state.orderStatus ? 'Sorry' : 'Thank You'}</Text>
    //                                 <Text style={styles.headerSubTxt}>{this.state.orderStatus ?
    //                                     'Unable to process your order.You can try again or contact to our customer service agent for more information..' :
    //                                     'We have received your order, you\'ll receive a confirmation mail soon..'}</Text>
    //                             </View>
    //                             <View style={styles.orderBlock}>
    //                                 <Text style={{ paddingVertical: verticalScale(10), fontSize: scale(20) }}>{I18n.t('order_number')}</Text>
    //                                 <View style={{ paddingBottom: scale(30), paddingVertical: verticalScale(5) }}>
    //                                     <Text style={{ paddingHorizontal: scale(2), fontSize: scale(25) }}>000000751</Text>
    //                                 </View>
    //                             </View>
    //                             <View style={styles.orderBlock}>
    //                                 <Text style={{ paddingVertical: verticalScale(10), fontSize: scale(20) }}>{I18n.t('address')}</Text>
    //                                 <View style={{ paddingBottom: scale(30), paddingVertical: verticalScale(5) }}>
    //                                     <Text style={{ paddingHorizontal: scale(2), fontWeight: 'bold' }}>{I18n.t('deliver_to')}</Text>
    //                                     <Text>No. 04, 2nd Floor Nitron Classic, ,St. Patrick Town (Before Gate, Next to Kalpana Housing Society,, Hadapsar, Pune, Maharashtra 411013</Text>
    //                                     <Text>Maharashtra,Maharashtra</Text>
    //                                 </View>
    //                             </View>
    //                             <View style={styles.orderBlock}>
    //                                 <Text style={{ paddingVertical: verticalScale(10), fontSize: scale(20) }}>{I18n.t('delivery')}</Text>
    //                                 <View style={{ paddingBottom: scale(30), paddingVertical: verticalScale(5) }}>
    //                                     <Text style={{ paddingHorizontal: scale(2), fontSize: scale(25) }}>Deliver To Address</Text>
    //                                 </View>
    //                             </View>
    //                             <View style={styles.orderBlock}>
    //                                 <Text style={{ paddingVertical: verticalScale(10), fontSize: scale(20) }}>{I18n.t('payment')}</Text>
    //                                 <View style={{ paddingBottom: scale(30), paddingVertical: verticalScale(5) }}>
    //                                     <Text style={{ paddingHorizontal: scale(2), fontSize: scale(25) }}>Pay By Card</Text>
    //                                 </View>
    //                             </View>
    //                             <View style={[styles.orderProduct, styles.orderBlock]}>
    //                                 <View style={styles.imageContainer}>
    //                                     <Image source={{ uri: "https://storage.googleapis.com/nay/images/product/sm/sp19/nay-sp19-slippers-opentoe-harmonia-212465328-1199.jpg", height: scale(128), width: scale(128) }}  style={{ resizeMode: 'contain'}}/>
    //                                 </View>
    //                                 <View style={{ width: '35%' }}>
    //                                     <Text style={{ fontWeight: 'bold' }}>Slippers</Text>
    //                                     <Text>Color: Ivory</Text>
    //                                     <Text>Size : S</Text>
    //                                     <Text>212465344</Text>
    //                                 </View>
    //                                 <View style={{ width: '25%' }}>
    //                                     <Text style={styles.price}>USD 59</Text>
    //                                     <Text style={styles.price}>Qty 1</Text>
    //                                 </View>
    //                             </View>
    //                             <View style={[styles.orderBlock, { paddingVertical: verticalScale(5) }]}>
    //                                 <Text style={{fontSize: scale(20)}}>{I18n.t('order_summary')}</Text>
    //                                 <View style={styles.orderBlockMargin}>
    //                                     <View style={styles.orderSummary}>
    //                                         <View style={styles.alignRow}>
    //                                             <Text>{I18n.t('subtotal')}</Text>
    //                                             <Text>USD 59</Text>
    //                                         </View>
    //                                         <View style={styles.alignRow}>
    //                                             <Text>{I18n.t('shipping')}</Text>
    //                                             <Text>USD 10</Text>
    //                                         </View>
    //                                         <View style={styles.alignRow}>
    //                                             <Text>{I18n.t('cod')}</Text>
    //                                             <Text>USD 0</Text>
    //                                         </View>
    //                                         <View style={styles.alignRow}>
    //                                             <Text style={{fontWeight: 'bold'}}>{I18n.t('total')}</Text>
    //                                             <Text style={{fontWeight: 'bold'}}>USD 18</Text>
    //                                         </View>
    //                                         <View style={styles.alignRow}>
    //                                             <Text>{I18n.t('vat')}</Text>
    //                                             <Text>USD 0.86</Text>
    //                                         </View>
    //                                     </View>
    //                                 </View>
    //                             </View>
    //                             <View style={[styles.orderBlock, { paddingVertical: verticalScale(5) }]}>
    //                                 <Text style={{fontSize: scale(20)}}>{I18n.t('order_status1')}</Text>
    //                                 <View style={styles.orderBlockMargin}>
    //                                     <View style={styles.orderSummary}>
    //                                         <View style={styles.alignRow}>
    //                                             <Text>{I18n.t('order_status')}</Text>
    //                                             <Text>Ordered</Text>
    //                                         </View>
    //                                     </View>
    //                                 </View>
    //                             </View>
    //                             <View style={[styles.orderBlock, { paddingVertical: verticalScale(5) }]}>
    //                                 <Text style={{fontSize: scale(20)}}>{I18n.t('payment_summary')}</Text>
    //                                 <View style={styles.orderBlockMargin}>
    //                                     <View style={styles.orderSummary}>
    //                                         <View style={styles.alignRow}>
    //                                             <Text>{I18n.t('pay_by_card')}</Text>
    //                                             <Text>USD 18</Text>
    //                                         </View>
    //                                     </View>
    //                                 </View>
    //                             </View>
    //                             <View style={[styles.orderBlock, { paddingVertical: verticalScale(5) }]}>
    //                                 <View style={styles.orderBlockMargin}>
    //                                     <View style={styles.alignRow}>
    //                                         <Text style={{textAlign: 'center'}}>Should you have any queries, contact our customer service by calling us at +971 4 3576754 or e-mail us to customerservice@nayomi.com</Text>
    //                                     </View>
    //                                 </View>
    //                             </View>
    //                             <Image source={{ uri: "https://storage.googleapis.com/nay/images/product/sm/sp19/nay-sp19-slippers-opentoe-harmonia-212465328-1199.jpg" }}/>
    //                         </View>
    //                     </View>
    //                     {/* <Footer {...this.props} /> */}
    //                 </ScrollView> : <View style={{ flex: 1, justifyContent: 'center' }}>
    //                     <ActivityIndicator size="large" color="#0000ff" />
    //                 </View>}
    //         </View>
    //     );
    // }
}

function mapStateToProps(state) {
    const { CheckoutReducer } = state;
    return {
        orderConfirmStatus: CheckoutReducer.orderConfirmStatus,
        orderConfirmData: CheckoutReducer.orderConfirmData
    };
}
const mapDispatchToProps = (dispatch) => {
    return {
        orderConfirmation: (obj) => {
            dispatch(orderConfirm(obj))
        },
    };

};

export default connect(mapStateToProps, mapDispatchToProps)(confirmation);