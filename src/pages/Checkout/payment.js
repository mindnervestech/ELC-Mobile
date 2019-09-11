import React, { Component } from 'react';
import {
    View, Text, TouchableOpacity, ActivityIndicator
} from 'react-native';
import { connect } from 'react-redux'
import { scale } from '../../utils/Scale';
import * as COLORS from '../../utils/Color'
import styles from './Style'
import MaterialIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { getPaymentData, setPaymentData, clearGetPayment, clearSetPayment, applyVoucherData, removeVoucherData, clearApplyVoucher, clearRemoveVoucher } from '../../actions/CheckoutAction';
import CartItem from './CartItem'
import I18n from '../../localization/index';
import Util from '../../utils/Util';
import CustomAlert from '../../helper/CustomAlert';
import showToast from '../../helper/Toast';
import * as MESSAGE from '../../utils/Message';

var self; 

class payment extends Component {

    constructor(props) {
        super(props)
        self = this;
        this.state = {
            paymentData: {},
            cashAndCardFlag: true,
            storeId: null,
            quoteId: null,
            collectAndDeliveryFlag: this.props.classObj.state.collectAndDeliveryFlag,
            showAlert: false,
            cartDataFromPayment: {},
            G_quote_id: null,
            activityIndicator: true,
            voucherCheckObj: {},
            voucherCode: null,
            applyRemove: null,
            showTotalExceeded: false,
        }
    }

    componentDidMount() {
        this.props.onRef(this);
    }

    componentWillMount() {
        // Util.getAsyncStorage('SIGN_IN_DATA').then((data) => {
        //     if (data !== null) {
        //         Util.getAsyncStorage('SELECTED_COUNTRY_LANGUAGE').then((language) => {
        //             this.setState({ storeId: language.store_id, quoteId: data.quote_id });
        //             var obj = { quote_id: data.quote_id, store_id: language.store_id };
        //             this.props.getPaymentData(obj)
        //         });
        //     }
        // });
        Util.getAsyncStorage('SELECTED_COUNTRY_LANGUAGE').then((language) => {
            this.setState({ storeId: language.store_id });
        });
        Util.getAsyncStorage('SIGN_IN_DATA').then((data) => {
            if (data !== null) {
                Util.getAsyncStorage('S_quote_id_digit').then((Sdata) => {
                    //var obj = { quote_id: Sdata, store_id: this.state.storeId };
                    //this.setState({ quoteId: Sdata, activityIndicator: false });
                    //this.props.getCartData(obj);
                    //this.setState({ quote_id: Sdata })
                    //Util.setAsyncStorage('quote_id', data.quote_id);
                    // this.setState({ sign_in_data: data, quoteId: Sdata });
                    // var obj = { customer_id: data.customer_id, store_id: this.state.storeId };
                    // console.log('this is delivery get', obj);
                    // this.props.getDeliveryData(obj);

                    var obj = { quote_id: Sdata, store_id: this.state.storeId };
                    this.setState({ quoteId: Sdata, activityIndicator: false });
                    this.props.getPaymentData(obj);
                });
            } else {
                Util.getAsyncStorage('G_quote_id_digit').then((Gdata) => {
                    if (Gdata !== null) {
                        var obj = { quote_id: Gdata, store_id: this.state.storeId };
                        this.setState({ G_quote_id: Gdata, quoteId: Gdata });
                        //this.setState({ activityIndicator: false });
                        this.props.getPaymentData(obj);
                    }
                });
            }
        });
    }

    componentWillUnmount() {
        //console.log('this si payment unmount');
    }


    componentWillReceiveProps(nextProps) {
        //console.log('this is nextprops in payment', nextProps);
        if (nextProps.paymentDataStatus) {
            this.setState({ activityIndicator: true });
            this.setState({ paymentData: nextProps.paymentData, cartDataFromPayment: nextProps.paymentData.cart_data })
            this.props.clearGetPaymentData();
        }
        if (nextProps.paymentSetStatus) {
            this.setState({ activityIndicator: true });
            this.props.clearSetPaymentData();
            this.props.classObj.setState({ paymentFlag: true });
        }
        if(nextProps.statusApplyVoucher === 'APPLY_VOUCHER_SUCCESS') {
            const { quoteId, storeId, voucherCode } = this.state;
            //console.log('this is voucher code of success code', voucherCode);
            var obj = { quote_id: quoteId, store_id: storeId };
            this.props.clearApplyVoucerData();
            var voucherCheckObj = { voucherErrorCode: null, voucherCode: voucherCode, applyRemove: 'remove' }
            this.setState({ voucherCheckObj: voucherCheckObj });
            this.props.getPaymentData(obj);
        } else if(nextProps.statusApplyVoucher === 'APPLY_VOUCHER_FAILED') {
            var voucherCheckObj = { voucherErrorCode: nextProps.dataApplyVoucher.message, voucherCode: '', applyRemove: 'apply' }
            this.setState({ activityIndicator: true, voucherCheckObj: voucherCheckObj });
        }
        if(nextProps.statusRemoveVoucher === 'REMOVE_VOUCHER_SUCCESS') {
            this.setState({ activityIndicator: true });
            const { quoteId, storeId } = this.state;
            var obj = { quote_id: quoteId, store_id: storeId };
            this.props.clearRemoveVoucherData();
            this.props.getPaymentData(obj);
            var voucherCheckObj = { voucherErrorCode: null, voucherCode: '', applyRemove: 'apply' }
            this.setState({ voucherCheckObj: voucherCheckObj });
        } else if(nextProps.statusRemoveVoucher === 'REMOVE_VOUCHER_FAILED') {
            const { voucherCode } = this.state;
            var voucherCheckObj = { voucherErrorCode: nextProps.dataRemoveVoucher.message, voucherCode: voucherCode, applyRemove: 'remove' }
            this.setState({ activityIndicator: true, voucherCheckObj: voucherCheckObj });
        }
    }

    renderCustomAlert() {
        const { collectAndDeliveryFlag } = this.state;
        return (
            <CustomAlert okPressed={() => { this.setState({ showAlert: false }); }} text1={MESSAGE.ERROR} text2={collectAndDeliveryFlag ? MESSAGE.CC_AND_CD : MESSAGE.HD_AND_CD} alertType='OK' />
        )
    }

    renderTotalExceeded() {
        const { cartData } = this.props;
        var msg = MESSAGE.ABOVE_2500 + ' ' + cartData.data.currency + ' ' + '2500'
        return (
            <CustomAlert okPressed={() => { this.setState({ showTotalExceeded: false }); }} text1={MESSAGE.ERROR} text2={msg} alertType='OK' />
        )
    }

    isGCC() {
        //collectAndDeliveryFlag ? this.setState({ showAlert: true }) : 
        const { collectAndDeliveryFlag } = this.state;
        const { cartData } = this.props;
        if (collectAndDeliveryFlag) {
            this.setState({ showAlert: true });
        } else if(cartData.data.grand_total > 2500) {
            this.setState({ showTotalExceeded: true });
        } else {
            Util.getAsyncStorage('SELECTED_COUNTRY_LANGUAGE').then((language) => {
                if (language.country === 'international') {
                    this.setState({ showAlert: true });
                } else {
                    this.setState({ cashAndCardFlag: false })
                    //this.setState({ collectAndDeliveryFlag: true })
                }
            });
        }
    }

    doVocherCheck(vocherCode, applyRemove) {
        self.setState({ activityIndicator: false, voucherCode: vocherCode, applyRemove: applyRemove });
        //console.log('this is cartItem Call', vocherCode, applyRemove);
        const { quoteId, storeId } = self.state;
        var objApplyVoucher = { quoteid: quoteId, store: storeId, voucode: vocherCode }; 
        var objRemoveVoucher = { quoteid: quoteId, voucode: vocherCode }; 
        if(applyRemove === 'apply') {
            //console.log('this is apply', objApplyVoucher);
            self.props.applyVoucer(objApplyVoucher);
        } else {
            //console.log('this is remove', objRemoveVoucher);
            self.props.removeVoucher(objRemoveVoucher);
        }   
    }

    doProceed() {
        const { cashAndCardFlag, quoteId, storeId, G_quote_id } = this.state

        var obj = {
            payment_code: cashAndCardFlag ? "payfort_fort_cc" : "cashondelivery",
            //quote_id: quoteId,
            store_id: storeId,
        }

        if (G_quote_id === null) {
            obj.quote_id = quoteId;
        } else {
            obj.quote_id = G_quote_id;
        }
        this.setState({ activityIndicator: false });
        this.props.setPaymentData(obj);
    }

    backToDelivery() {
        this.props.classObj.setState({ deliveryFlag: false })
    }

    renderSelection() {
        const { cashAndCardFlag, collectAndDeliveryFlag } = this.state
        return (
            <>
                <View style={{ paddingHorizontal: scale(10), paddingVertical: scale(16) }}>
                    <View style={styles.topBoxMain}>
                        <View style={{ flexDirection: 'row' }}>
                            <TouchableOpacity style={[styles.topBoxSelection, cashAndCardFlag && styles.topBoxSelectionChange]} onPress={() => { this.setState({ cashAndCardFlag: true }) }}>
                                <Text>{I18n.t('pay_by_card')}</Text>
                            </TouchableOpacity>
                            <View style={{ width: '2%' }} />
                            <TouchableOpacity style={[styles.topBoxSelection, !cashAndCardFlag && styles.topBoxSelectionChange, collectAndDeliveryFlag && { opacity: 0.5 }]} onPress={() => { this.isGCC() }}>
                                <Text>{I18n.t('cashOnDelivery')}</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
                <View style={styles.breadcrumbBorder} />
            </>
        )
    }



    render() {
        const { cashAndCardFlag, paymentData, showAlert, cartDataFromPayment, activityIndicator, voucherCheckObj, showTotalExceeded } = this.state;
        const { cartData } = this.props;
        return (
            <View style={{ flex: 1 }}>
                {activityIndicator ?
                    <View>
                        {this.renderSelection()}
                        {Object.keys(paymentData).length > 0 && Object.keys(cartData).length > 0 ?
                            <View style={{ paddingHorizontal: scale(10), paddingVertical: scale(16) }}>
                                <View style={styles.topBoxMain}>
                                    <View style={{ padding: scale(16) }}>
                                        <Text style={{ fontSize: scale(18), fontWeight: '600' }}>{I18n.t('total')}{'   '}{paymentData.cart_data.currency}{' '}{paymentData.cart_data.grand_total}</Text>
                                        {!cashAndCardFlag && <Text style={{ fontSize: scale(14), fontWeight: '600' }}>{I18n.t('cashOnDelivery')} {paymentData.data.cashondelivery.currency} {paymentData.data.cashondelivery.charges} {I18n.t('include')}</Text>}
                                        <View style={[styles.breadcrumbBorder, { marginVertical: scale(16) }]} />
                                        <View style={{ flexDirection: 'row', flexWrap: 'wrap', }}>
                                            <Text style={{ color: '#3b3b3b' }}>{I18n.t('TEXT10')}</Text>
                                            <Text style={{ color: 'black' }} onPress={() => this.props.navigation.navigate('PrivacyPolicy')}>{I18n.t('privacyCookiePolicy')}</Text>
                                            <Text style={{ color: '#3b3b3b' }}>{' '}{I18n.t('and')}{' '}</Text>
                                            <Text style={{ color: 'black' }} onPress={() => this.props.navigation.navigate('TermsandConditions')}>{I18n.t('termsAndConditions')}</Text>
                                        </View>
                                    </View>
                                </View>
                                {/* <View style={{flexDirection: 'row', justifyContent: 'space-between', padding: scale(16)}}>
                        <Text>SHOPPING BAG</Text>
                        <View style={[styles.breadcrumbCircle, {borderRadius: scale(5)}]}>
                        <MaterialIcons
                            name='square-edit-outline'
                            size={scale(15)}
                            color={'white'}
                        />
                    </View>
                    </View> */}
                                <CartItem cartData={cartData} cartDataFromPayment={cartDataFromPayment} comesFrom={'payment'} voucherChecking={this.doVocherCheck} voucherCheckObj={voucherCheckObj} {...this.props} />
                                {showAlert ?
                                    <View>{this.renderCustomAlert()}</View> : <View />}
                                {showTotalExceeded &&
                                    <View>{this.renderTotalExceeded()}</View>
                                }
                            </View> : <View style={{ flex: 1, justifyContent: 'center' }}>
                                <ActivityIndicator size="large" color="#0000ff" />
                            </View>}</View>
                    : <View style={{ flex: 1, justifyContent: 'center' }}>
                        <ActivityIndicator size="large" color="#0000ff" />
                    </View>}
            </View>
        );
    }
}


function mapStateToProps(state) {
    const { CheckoutReducer, CartReducer } = state;
    return {
        paymentData: CheckoutReducer.paymentData,
        paymentDataStatus: CheckoutReducer.paymentDataStatus,
        cartData: CartReducer.cartData,
        paymentSetData: CheckoutReducer.paymentSetData,
        paymentSetStatus: CheckoutReducer.paymentSetStatus,
        statusApplyVoucher: CheckoutReducer.applyVoucherStatus,
        dataApplyVoucher: CheckoutReducer.applyVoucherData,
        statusRemoveVoucher: CheckoutReducer.removeVoucherStatus,
        dataRemoveVoucher: CheckoutReducer.removeVoucherData,       
    };
}
const mapDispatchToProps = (dispatch) => {
    return {
        getPaymentData: (obj) => {
            dispatch(getPaymentData(obj))
        },
        setPaymentData: (obj) => {
            dispatch(setPaymentData(obj))
        },
        clearGetPaymentData: () => {
            dispatch(clearGetPayment())
        },
        clearSetPaymentData: () => {
            dispatch(clearSetPayment())
        },
        applyVoucer: (obj) => {
            dispatch(applyVoucherData(obj))
        },
        removeVoucher: (obj) => {
            dispatch(removeVoucherData(obj))
        },
        clearApplyVoucerData: () => {
            dispatch(clearApplyVoucher())
        },
        clearRemoveVoucherData: () => {
            dispatch(clearRemoveVoucher())
        },
        
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(payment);