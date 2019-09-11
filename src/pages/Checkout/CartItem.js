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
import Util from '../../utils/Util';

class CartItem extends Component {

    constructor(props) {
        super(props);        
        this.state = {
            orderStatus: true,
            orderData: {},
            originalCartData: {},
            cartData: [],
            comesFrom: this.props.comesFrom,
            cartDataFromPayment: this.props.cartDataFromPayment,
            cartDataFromConfirmation: this.props.cartDataFromConfirmation,
            cartDataFromOrderConfiramtion: this.props.cartDataFromOrderConfiramtion,
            voucherCode: ('voucherCheckObj' in this.props ) ? (Object.keys(this.props.voucherCheckObj).length > 0 ? this.props.voucherCheckObj.voucherCode : '') : '',
            vocherCodeError: ('voucherCheckObj' in this.props ) ? (Object.keys(this.props.voucherCheckObj).length > 0 ? this.props.voucherCheckObj.voucherErrorCode : '') : '',
            applyRemove: ('voucherCheckObj' in this.props ) ? (Object.keys(this.props.voucherCheckObj).length > 0 ? this.props.voucherCheckObj.applyRemove === 'apply' ? true : false : true) : true,
            //voucherObj: this.props.voucherData,
        }
    }

    // componentDidMount() {
    //     this.props.onRef(this);
    // }

    componentWillMount() {
        this.setState({ originalCartData: this.props.cartData.data });
        let cartDataTempory = this.props.cartData.data;
        let cartDataTemp = [];
        Object.keys(cartDataTempory.products).map((item, index) => {
            if (cartDataTempory.products[item].is_in_stock.status === 1) {
                cartDataTemp.push(cartDataTempory.products[item]);
            }
        });
        this.setState({ cartData: cartDataTemp });
    }

    // componentWillReceiveProps(nextProps) {
    //     console.log('this is nextprops of payment', nextProps);
    //     if(nextProps.statusApplyVoucher === 'APPLY_VOUCHER_FAILED'){
    //         if(Object.keys(nextProps.dataApplyVoucher).length > 0) {
    //             this.setState({ vocherCodeError: dataApplyVoucher.message }) ;
    //         }
    //     }
    // }

    calculateSaving(splprice, price) {
        return Math.round(((price - splprice) * 100) / price);
    }

    handleVocherCodeInputChange = (voucherCode) => {
        this.setState({ voucherCode: voucherCode });
        if (Validators.isEmpty(voucherCode)) {
            this.setState({ vocherCodeError: MESSAGE.VOUCHER_CODE });
        } else {
            this.setState({ vocherCodeError: null });
        }
    }

    // checkButtonDisableEnable() {
    //     setTimeout(() => {
    //         const { voucherCode, vocherCodeError } = this.state;
    //         if(Validators.isEmpty(voucherCode) || vocherCodeError !== null){
    //             this.setState({ buttonDisableEnable: false })
    //         } else {
    //             this.setState({ buttonDisableEnable: true })
    //         }
    //     }, 100)
    // }

    voucherCheck = () => {
        const { voucherCode, applyRemove } = this.state;
        console.log('this is voucherObj', voucherCode);
        if(voucherCode === ''){
            this.setState({ vocherCodeError: MESSAGE.VOUCHER_CODE });
        } else {
            this.setState({ applyRemove: false });
            this.props.voucherChecking(voucherCode, applyRemove ? 'apply' : 'remove');
        }
    }

    getListViewItem = (item) => {
        Util.getAsyncStorage('SELECTED_COUNTRY_LANGUAGE').then((select) => {
            Util.getAsyncStorage('SIGN_IN_DATA').then((data) => {
                var obj = {
                    customerid: data !== null ? data.customer_id : '',
                    store: select.store_id,
                    url_key: item.url_key
                }
                this.props.navigation.navigate('PriductDetail', { objectData: obj });
            });
        });

    }

    addProductToList = ({ item }) => {
        return (
            <View>
                <View style={[styles.orderProduct, styles.orderBlock]}>
                    <TouchableOpacity style={styles.imageContainer}
                        onPress={this.getListViewItem.bind(this, item)}>
                        <Image source={{ uri: item.image[0], height: scale(150), width: scale(120) }} style={{ resizeMode: 'contain' }} />
                    </TouchableOpacity>
                    <View style={{ width: '2%' }}></View>
                    <View style={{ width: '32%' }}>
                        <Text style={{ fontWeight: 'bold', fontSize: scale(18) }}>{item.name}</Text>
                        {item.color ? <Text>{I18n.t('color')} {item.color}</Text> : <View />}
                        {item.size !== null && item.size !== '' ? <Text>{I18n.t('size')} {item.size}</Text> : <View />}
                        {item.sku ? <Text>{item.sku}</Text> : <Text />}
                    </View>
                    <View style={{ width: '36%', zIndex: 1 }}>
                        {item.url_key !== 'freeproduct' ?
                            <View>{item.special_price === null || item.special_price === '0.0000' || item.special_price === '' ?
                                <View>
                                    {item.price !== 0 ? <Text style={styles.price}>{item.currency} {item.qty * item.price}</Text> : <Text style={styles.price}> {I18n.t('free')}</Text>}
                                </View> :
                                <View>{item.special_price === null ?
                                    <View>{item.price !== 0 ? <Text style={styles.price}>{item.currency} {item.qty * item.price}</Text> : <Text style={styles.price}> {I18n.t('free')}</Text>}</View> :
                                    <View><Text style={styles.Nprice}>{I18n.t('now')} {item.currency} {Math.round(item.qty * item.special_price)}</Text>
                                        <Text style={styles.Wprice}>{I18n.t('was')} {item.currency} {Math.round(item.qty * item.price)}</Text>
                                        <Text style={{ textAlign: 'center', }}>{I18n.t('saving')} {this.calculateSaving(item.qty * item.special_price, item.qty * item.price)} {I18n.t('percentageSymbol')}</Text>
                                    </View>
                                }</View>
                            }</View> : <Text style={styles.price}> {I18n.t('free')}</Text>
                        }
                        <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
                            <View style={styles.box}>
                                <Text>{item.qty}</Text>
                            </View>
                        </View>
                    </View>
                </View>
            </View>
        )
    }

    render() {
        const { cartData, comesFrom, cartDataFromPayment, cartDataFromConfirmation, cartDataFromOrderConfiramtion, applyRemove, voucherCode, vocherCodeError } = this.state;
        console.log('this is voucher code', voucherCode);
        return (
            <View style={{ flex: 1 }}>
                {cartData.length > 0 ?
                    <View style={styles.mainContainer}>
                        <View style={styles.borderBox}>
                            <View style={{ padding: scale(16) }}>
                                {/* {comesFrom != 'confirm' ? */}
                                <View style={{ flexDirection: 'row', justifyContent: 'space-between', padding: scale(16) }}>
                                    <Text>{I18n.t('shoppingBag')}</Text>
                                    <TouchableOpacity style={[styles.breadcrumbCircle, { borderRadius: scale(5) }]} onPress={() => this.props.navigation.navigate('Cart')}>
                                        <MaterialIcons
                                            name='square-edit-outline'
                                            size={scale(15)}
                                            color={'white'}
                                        />
                                    </TouchableOpacity>
                                </View>
                                {/* : <View/>} */}
                                {comesFrom == 'payment' ? <View><View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: scale(16) }}>
                                    <View style={{ width: '80%' }}>
                                        <TextInput
                                            style={[(styles.inputFieldText)]}
                                            placeholder="Voucher"
                                            textAlign = {I18n.locale === 'ar' ? 'right' : 'left'}
                                            autoCorrect={false}
                                            underlineColorAndroid="transparent"
                                            autoCapitalize='words'
                                            keyboardType="default"
                                            value={voucherCode}
                                            onChangeText={this.handleVocherCodeInputChange}
                                        >
                                        </TextInput>
                                    </View>
                                    {/* <View style={{ width: '20%' }}> */}
                                    <TouchableOpacity style={styles.voucherCheck}
                                        onPress={() => {this.voucherCheck()}}
                                        >
                                        <MaterialIcons
                                            name={applyRemove ? 'check' : 'close'}
                                            size={scale(20)}
                                            color={applyRemove ? COLORS.BASE_GREY : COLORS.ERROR}
                                        />
                                    </TouchableOpacity>
                                    {/* </View> */}
                                </View>
                                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                                <View style={{ width: '80%' }}>
                                    { vocherCodeError !== null ? 
                                    <Text style={[styles.paragraphNormal, styles.error]}>{vocherCodeError}</Text> : <View /> }
                                </View>
                                </View>
                                </View> : <View />}
                                {/* <View style={styles.borderBox}>
                            <View style={styles.brdBottom}>
                                <Text>SHOPPING BAG</Text>
                                <View style={[styles.breadcrumbCircle, { borderRadius: scale(5) }]}>
                                    <MaterialIcons
                                        name='square-edit-outline'
                                        size={scale(15)}
                                        color={'white'}
                                    />
                                </View>
                            </View>
                        </View> */}
                                <View style={{ maxHeight: verticalScale(400) }}>
                                    <FlatList
                                        data={cartData}
                                        renderItem={this.addProductToList}
                                        ItemSeparatorComponent={this.renderSeparator}
                                        showsVerticalScrollIndicator={false}
                                        keyExtractor={(item, index) => index.toString()}
                                        nestedScrollEnabled={true}
                                    />
                                </View>
                            </View>
                            <View style={[styles.orderBlock]}>
                                <View style={styles.orderBlockMargin}>
                                    <View style={styles.orderSummary}>
                                        <View style={styles.brdBottom} />
                                        <View style={styles.alignRow}>
                                            <Text>{I18n.t('subtotal')}</Text>
                                            {comesFrom === 'payment' && <Text>{cartDataFromPayment.currency} {cartDataFromPayment.subtotal}</Text>}
                                            {comesFrom === 'confirm' && <Text>{cartDataFromConfirmation.currency} {cartDataFromConfirmation.Subtotal}</Text>}
                                            {comesFrom === 'orderconfirmation' && <Text>{cartDataFromOrderConfiramtion.currency} {cartDataFromOrderConfiramtion.subtotal}</Text>}
                                        </View>
                                        <View style={styles.brdBottom} />
                                        { (comesFrom === 'payment' && cartDataFromPayment.discount_amount !== 0) || 
                                          (comesFrom === 'confirm' && cartDataFromConfirmation.Savings !== 0) || 
                                          (comesFrom === 'orderconfirmation' &&cartDataFromOrderConfiramtion.savings !== 0) ?
                                        <View>
                                        <View style={styles.alignRow}>
                                            <Text>{I18n.t('saving')}</Text>

                                            {comesFrom === 'payment' && <Text>{cartDataFromPayment.currency} {cartDataFromPayment.discount_amount}</Text>}
                                            {comesFrom === 'confirm' && <Text>{cartDataFromConfirmation.currency} {cartDataFromConfirmation.Savings}</Text>}
                                            {comesFrom === 'orderconfirmation' && <Text>{cartDataFromOrderConfiramtion.currency} {cartDataFromOrderConfiramtion.savings}</Text>}
                                        </View>
                                        <View style={styles.brdBottom} />
                                        </View> : <View/>}
                                        { (comesFrom === 'payment' && cartDataFromPayment.shipping_amount !== 0) || 
                                          (comesFrom === 'confirm' && cartDataFromConfirmation.Shipping !== 0) || 
                                          (comesFrom === 'orderconfirmation' && cartDataFromOrderConfiramtion.shipping !== 0) ?
                                        <View style={styles.alignRow}>
                                            <Text>{I18n.t('shipping')}</Text>

                                            {comesFrom === 'payment' && <Text>{cartDataFromPayment.currency} {cartDataFromPayment.shipping_amount}</Text>}
                                            {comesFrom === 'confirm' && <Text>{cartDataFromConfirmation.currency} {cartDataFromConfirmation.Shipping}</Text>}
                                            {comesFrom === 'orderconfirmation' && <Text>{cartDataFromOrderConfiramtion.currency} {cartDataFromOrderConfiramtion.shipping}</Text>}

                                        </View> : <View/>}
                                        {comesFrom == 'confirm' ?
                                            <View>
                                                <View style={styles.brdBottom} />
                                                <View style={styles.alignRow}>
                                                    <Text>{I18n.t('cod')}</Text>
                                                    {/* <Text>{cartDataFromPayment.currency} {cartDataFromPayment.subtotal}</Text>
                                                {comesFrom === 'payment' && <Text>{cartDataFromPayment.currency} {cartDataFromPayment.shipping_amount}</Text> } */}
                                                    {comesFrom === 'confirm' && <Text>{cartDataFromConfirmation.currency} {cartDataFromConfirmation.COD}</Text>}
                                                    {comesFrom === 'orderconfirmation' && <Text>{cartDataFromOrderConfiramtion.currency} {cartDataFromOrderConfiramtion.COD}</Text>}

                                                </View>
                                            </View> : <View />}
                                        <View style={styles.brdBottom} />
                                        <View style={styles.alignRow}>
                                            <Text style={{ fontWeight: 'bold' }}>{I18n.t('total')}</Text>

                                            {comesFrom === 'payment' && <Text style={{ fontWeight: 'bold' }}>{cartDataFromPayment.currency} {cartDataFromPayment.grand_total}</Text>}
                                            {comesFrom === 'confirm' && <Text style={{ fontWeight: 'bold' }}>{cartDataFromConfirmation.currency} {cartDataFromConfirmation.Total}</Text>}
                                            {comesFrom === 'orderconfirmation' && <Text>{cartDataFromOrderConfiramtion.currency} {cartDataFromOrderConfiramtion.total}</Text>}


                                        </View>
                                        <View style={styles.brdBottom} />
                                        <View style={styles.alignRow}>
                                            <Text>{I18n.t('vat')}</Text>

                                            {comesFrom === 'payment' && <Text>{cartDataFromPayment.currency} {cartDataFromPayment.tax_amount}</Text>}
                                            {comesFrom === 'confirm' && <Text>{cartDataFromConfirmation.currency} {cartDataFromConfirmation.VAT}</Text>}
                                            {comesFrom === 'orderconfirmation' && <Text>{cartDataFromOrderConfiramtion.currency} {cartDataFromOrderConfiramtion.vat}</Text>}

                                        </View>
                                        <View style={styles.brdBottom} />
                                    </View>
                                </View>
                            </View>
                        </View>
                    </View> : <View style={{ flex: 1, justifyContent: 'center' }}>
                        <ActivityIndicator size="large" color="#0000ff" />
                    </View>}
            </View>
        );
    }
}

function mapStateToProps(state) {
    const { CommonReducer, CartReducer } = state;
    return {
        cartData: CartReducer.cartData,
    };
}
const mapDispatchToProps = (dispatch) => {
    return {
        //   doPasswordChange: (obj) => {
        //     dispatch(passwordChange(obj))
        //   },
    };

};

export default connect(mapStateToProps, mapDispatchToProps)(CartItem);