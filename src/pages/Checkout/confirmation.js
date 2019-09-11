import React, { Component } from 'react';
import {
    Text,
    View,
    ScrollView,
    TouchableOpacity,
    ActivityIndicator,
    Platform,
} from 'react-native';

import I18n from '../../localization/index';
import styles from './Style'
import { scale, verticalScale } from '../../utils/Scale';
import { connect } from 'react-redux';
import { orderConfirm, placeOrderData, clearPlaceOrder, clearOrderConfirm } from '../../actions/CheckoutAction';
//import { clearCartData } from '../../actions/CartAction';
import CartItem from './CartItem'

import Util from '../../utils/Util';
import showToast from '../../helper/Toast';
let { RNReactNativePayfortSdk } = require('react-native').NativeModules;
let { RNPayfortSdk } = require('react-native').NativeModules;
import { getCart } from '../../actions/CartAction';


class confirmation extends Component {

    constructor(props) {
        super(props);

        this.state = {
            activityIndicator: true,
            orderStatus: true,
            orderData: {},
            cartDataFromConfirmation: {},
            storeId: null,
            quoteId: null,
            G_quote_id: null,
        }
    }

    componentDidMount() {
        this.props.onRef(this);
    }

    componentWillMount() {
        Util.getAsyncStorage('SELECTED_COUNTRY_LANGUAGE').then((language) => {
            this.setState({ storeId: language.store_id });
        });
        Util.getAsyncStorage('SIGN_IN_DATA').then((data) => {
            if (data !== null) {
                Util.getAsyncStorage('S_quote_id_digit').then((Sdata) => {
                    var obj = { quote_id: Sdata, store_id: this.state.storeId };
                    this.setState({ quoteId: Sdata, });
                    this.props.orderConfirmation(obj);
                });
            } else {
                Util.getAsyncStorage('G_quote_id_digit').then((Gdata) => {
                    if (Gdata !== null) {
                        this.setState({ G_quote_id: Gdata, quoteId: Gdata });
                        var obj = { quote_id: Gdata, store_id: this.state.storeId };
                        //this.setState({ activityIndicator: false });
                        this.props.orderConfirmation(obj);
                    }
                });
            }
        });
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.orderConfirmDataStatus) {
            this.setState({ orderData: nextProps.orderConfirmData, cartDataFromConfirmation: nextProps.orderConfirmData.cart_price, activityIndicator: true });
            this.props.clearOrderConfirmData();
        }
        if (nextProps.placeOrderStatus === 'PLACE_ORDER_SUCCESS') {
            const { quoteId, storeId  } = this.state;
            this.setState({ activityIndicator: true });
            Util.setAsyncStorage('S_quote_id_digit', nextProps.dataForPlaceOrder.new_quote_id);
            Util.removeAsyncstorage('G_quote_id').then((data) => { });
            this.props.clearPlaceOrderData();
            var payment = Object.keys(nextProps.dataForPlaceOrder.order_data).length > 0 ? nextProps.dataForPlaceOrder.order_data.payment_type : '';
            console.log('this is payment', payment);
            if (payment === 'payfort_fort_cc') {
                this.payByCardSelected(nextProps.dataForPlaceOrder.payfort_data);
            }
            // var obj = { quote_id: quoteId, store_id: storeId };
            // this.props.getCartData(obj);
            this.props.navigation.navigate("OrderConfirmation", { orderId: nextProps.dataForPlaceOrder.order_data.order_number });
        } else if(nextProps.placeOrderStatus === 'PLACE_ORDER_FAILED') {
            this.setState({ activityIndicator: true });
            showToast(nextProps.dataForPlaceOrder.msg, true);
        }
    }

    payByCardSelected(parFortData) {
        console.log('this is payfortDAta', parFortData);
        let data = {};
        data['is_live'] = "0";          // require field
        data['access_code'] = parFortData.access_code;          // require field
        data[Platform.OS == 'ios' ? 'merchant_identifier' : 'merchant_identify'] = parFortData.merchant_identifier;        // require field
        data['request_phrase'] = 'TESTSHAIN';              // require field
        data['customer_email'] = parFortData.customer_email;       // require field
        data['language'] = parFortData.language;
        data['currency'] = parFortData.currency;           // require field
        data['amount'] = parFortData.amount+'';                          // require field
        data['merchant_reference'] = parFortData.merchant_reference;          // require field
        data['customer_name'] = 'Glenn';
        data['customer_ip'] = '110.5.74.2';
        //data['payment_option'] = 'VISA';
        data['order_description'] = parFortData.order_description;
        if (Platform.OS == 'ios') {
            RNReactNativePayfortSdk.openPayfort(data, (response) => {
                console.log('response response', response);
            }, (message) => {
                console.log('message message ', message);
                // Message in case payment is failure or cancel
            })
        } else {
            RNPayfortSdk.openPayfort(data, (response) => {
                console.log('response response', response);
            }, (message) => {
                console.log('message message ', message);
                // Message in case payment is failure or cancel
            })
        }
    }

    doProceed() {
        this.setState({ activityIndicator: false });
        const { quoteId, storeId, G_quote_id } = this.state
        var obj = {
            quote_id: G_quote_id === null ? quoteId : G_quote_id,
            store_id: storeId,
        }
        this.props.placeOrderForData(obj);
    }

    backToDelivery() {
        this.props.classObj.setState({ paymentFlag: false });
    }

    render() {
        const { orderData, cartDataFromConfirmation, activityIndicator } = this.state;
        const { cartData } = this.props
        return (
            <View style={{ flex: 1 }}>
                {/* <HeaderComm changeLang={this.changeLang} navigation={this.props.navigation} /> */}
                {activityIndicator ?
                <View>
                {Object.keys(orderData).length > 0 && Object.keys(cartData).length > 0 ?
                    <ScrollView showsVerticalScrollIndicator={false}>
                        <View style={styles.mainContainer}>
                            <View style={{ padding: scale(16) }}>
                                <View style={styles.orderBlock1}>
                                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                                        <Text style={{ paddingVertical: verticalScale(10), fontSize: scale(20) }}>{I18n.t('address')}</Text>
                                        <TouchableOpacity onPress={() => this.props.classObj.setState({ deliveryFlag: false, paymentFlag: false })}>
                                            <Text style={{ fontSize: scale(14), fontWeight: '600' }}>{I18n.t('edit')}</Text>
                                        </TouchableOpacity>
                                    </View>
                                    <View style={{ paddingBottom: scale(30), paddingVertical: verticalScale(5) }}>
                                        <Text style={{ paddingHorizontal: scale(2), fontWeight: 'bold' }}>{I18n.t('deliver_to')}{'  '}{orderData.shipping_address.name}</Text>
                                        <Text>{orderData.shipping_address.street}</Text>
                                        <Text>{orderData.shipping_address.region}{'  '}{orderData.shipping_address.city}</Text>
                                        <Text>{orderData.shipping_address.country}</Text>
                                        <Text>{orderData.shipping_address.telephone}</Text>
                                    </View>
                                </View>
                                <View style={styles.orderBlock1}>
                                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                                        <Text style={{ paddingVertical: verticalScale(10), fontSize: scale(20) }}>{I18n.t('delivery1')}</Text>
                                        <TouchableOpacity onPress={() => this.props.classObj.setState({ deliveryFlag: false, paymentFlag: false })}>
                                            <Text style={{ fontSize: scale(14), fontWeight: '600' }}>{I18n.t('edit')}</Text>
                                        </TouchableOpacity>
                                    </View>
                                    <View style={{ paddingBottom: scale(30), paddingVertical: verticalScale(5) }}>
                                        <Text style={{ paddingHorizontal: scale(2), fontSize: scale(25) }}>{orderData.delivery_type}</Text>
                                    </View>
                                </View>
                                <View style={styles.orderBlock1}>
                                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>

                                        <Text style={{ paddingVertical: verticalScale(10), fontSize: scale(20) }}>{I18n.t('payment')}</Text>
                                        <TouchableOpacity onPress={() => this.props.classObj.setState({ paymentFlag: false })}>
                                            <Text style={{ fontSize: scale(14), fontWeight: '600' }}>{I18n.t('edit')}</Text>
                                        </TouchableOpacity>
                                    </View>
                                    <View style={{ paddingBottom: scale(30), paddingVertical: verticalScale(5) }}>
                                        <Text style={{ paddingHorizontal: scale(2), fontSize: scale(25) }}>{orderData.payment_method === 'Credit Card' ? <Text>{I18n.t('mada_bank_card_credit_card')}</Text> : <Text>{I18n.t('cod')}</Text> }</Text>
                                    </View>
                                </View>
                                <CartItem cartData={cartData} cartDataFromConfirmation={cartDataFromConfirmation} comesFrom={'confirm'} {...this.props} />
                            </View>
                        </View>
                    </ScrollView> : <View style={{ flex: 1, justifyContent: 'center' }}>
                        <ActivityIndicator size="large" color="#0000ff" />
                    </View>}
                    </View> : <View style={{ flex: 1, justifyContent: 'center' }}>
                        <ActivityIndicator size="large" color="#0000ff" />
                    </View>}
            </View>
        );
    }
}

function mapStateToProps(state) {
    const { CheckoutReducer, CartReducer } = state;
    return {
        orderConfirmDataStatus: CheckoutReducer.orderConfirmStatus,
        orderConfirmData: CheckoutReducer.orderConfirmData,
        cartData: CartReducer.cartData,
        dataForPlaceOrder: CheckoutReducer.dataForPlaceOrder,
        placeOrderStatus: CheckoutReducer.dataForPlaceOrderStatus
    };
}
const mapDispatchToProps = (dispatch) => {
    return {
        orderConfirmation: (obj) => {
            dispatch(orderConfirm(obj))
        },
        placeOrderForData: (obj) => {
            dispatch(placeOrderData(obj))
        },
        // clearCart: () => {
        //     dispatch(clearCartData())
        // },
        clearPlaceOrderData: () => {
            dispatch(clearPlaceOrder())
        },
        clearOrderConfirmData: () => {
            dispatch(clearOrderConfirm())
        },
        getCartData: (obj) => {
            dispatch(getCart(obj))
        },
    };

};

export default connect(mapStateToProps, mapDispatchToProps)(confirmation);
