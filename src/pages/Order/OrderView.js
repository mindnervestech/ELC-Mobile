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
import { getOrderView } from '../../actions/OrderAction';

class OrderView extends Component {

    constructor(props) {
        super(props);

        this.state = {
            activityIndicator: true,
            //orderStatus: true,
            orderData: {},
            orderStatus: false,
        }
    }

    changeLang = (lang) => {
        Util.getAsyncStorage('ALL_COUNTRY_AND_LANGUAGE').then((data) => {
          Util.getAsyncStorage('SELECTED_COUNTRY_LANGUAGE').then((select) => {
            for (var i in data.data) {
              if (data.data[i].country == select.country && data.data[i].language == lang) {
                Util.setAsyncStorage('SELECTED_COUNTRY_LANGUAGE', data.data[i]);
                this.checkNetCnnection();
              }
            }
          });
        });
      }

    componentWillMount() {
        let lastProps = this.props.navigation.state.params.orderEntityid;
        // Util.getAsyncStorage('ALL_COUNTRY_AND_LANGUAGE').then((data) => {
        //     Util.getAsyncStorage('SELECTED_COUNTRY_LANGUAGE').then((select) => {
        //         for(var i in data.data){
        //             if(data.data[i].country == select.country && data.data[i].language == lang){
        //                 Util.setAsyncStorage('SELECTED_COUNTRY_LANGUAGE', data.data[i]);
        //                 var obj = { orderEntityid: lastProps, store_id: data.data[i].store_id };
        //                 this.props.getOrderView(obj);
        //             }
        //         }
        //     });
        // });
        this.setState({ activityIndicator: false });
        var obj = { orderEntityid: lastProps, store_id: 6 };
        this.props.getOrderView(obj);
        //this.setState({ profile: lastProps });
    }

    componentWillReceiveProps(nextProps) {
        //this.setState({ activityIndicator: true })
        if (nextProps.status === 'ORDER_VIEW_DATA_SUCCESS') {
            this.setState({
                orderData: nextProps.orderData.orders_details,
                orderStatus: nextProps.orderData.status,
                activityIndicator: true
            });
        }
    }

    calculateSaving(splprice, price) {
        return Math.round(((price - splprice) * 100) / price);
    }

    addProductToList = ({ item }) => {
        return (
            <View>
                <View style={[styles.orderProduct, styles.orderBlock]}>
                    <View style={styles.imageContainer}>
                        <Image source={{ uri: item.image[0], height: scale(150), width: scale(120) }} style={{ resizeMode: 'contain' }} />
                    </View>
                    <View style={{ width: '2%' }}></View>
                    <View style={{ width: '32%' }}>
                        <View style={{ paddingHorizontal: scale(10) }}>
                            <Text style={{ fontWeight: 'bold', fontSize: scale(18) }}>{item.name}</Text>
                            {Object.keys(item.details).length > 0 && item.details[0].value ? <Text>{I18n.t('color')} {item.details[0].value}</Text> : <View />}
                            {Object.keys(item.details).length > 0 && item.details[1].value !== null && item.details[1].value !== '' ? <Text>{I18n.t('size')} {item.details[1].value}</Text> : <View />}
                            {item.sku ? <Text>{item.sku}</Text> : <Text />}
                        </View>
                    </View>
                    <View style={{ width: '36%', zIndex: 1 }}>
                        {Object.keys(item.details).length > 0 ?
                            <View>{item.special_price === null || item.special_price === '0.0000' || item.special_price === '' || item.special_price === 0 ?
                                <View>
                                    {item.price !== 0 ? <Text style={styles.price}>{item.currency} {item.qty_ordered * item.price}</Text> : <Text style={styles.price}> {I18n.t('free')}</Text>}
                                </View> :
                                <View>{item.special_price === null ?
                                    <View>{item.price !== 0 ? <Text style={styles.price}>{item.currency} {item.qty_ordered * item.price}</Text> : <Text style={styles.price}> {I18n.t('free')}</Text>}</View> :
                                    <View><Text style={styles.Nprice}>{I18n.t('now')} {item.currency} {Math.round(item.qty_ordered * item.special_price)}</Text>
                                        <Text style={styles.Wprice}>{I18n.t('was')} {item.currency} {Math.round(item.qty_ordered * item.price)}</Text>
                                        <Text style={{ textAlign: 'center', }}>{I18n.t('saving')} {this.calculateSaving(item.qty_ordered * item.special_price, item.qty_ordered * item.price)} {I18n.t('percentageSymbol')}</Text>
                                    </View>
                                }</View>
                            }</View> : <Text style={styles.price}> {I18n.t('free')}</Text>
                        }
                        {Object.keys(item.details).length > 0 && <Text style={styles.price}>{I18n.t('qty')} {item.qty_ordered}</Text>}
                    </View>
                </View>
            </View>
        )
    }

    render() {
        const { orderData } = this.state;
        return (
            <View style={{ flex: 1 }}>
                <HeaderComm changeLang={this.changeLang} navigation={this.props.navigation} onRef={instance => { this.instance = instance; }} classObj={this} {...this.props}/>
                {Object.keys(orderData).length > 0 && <View>
                    {this.state.activityIndicator ?
                        <ScrollView showsVerticalScrollIndicator={false}>
                            <View style={styles.mainContainer}>
                                <View style={{ paddingVertical: verticalScale(16) }}>
                                    {/* <View>
                                    <Text style={styles.headerTxt}>{this.state.orderStatus ? 'Sorry' : 'Thank You'}</Text>
                                    <Text style={styles.headerSubTxt}>{this.state.orderStatus ?
                                        'Unable to process your order.You can try again or contact to our customer service agent for more information..' :
                                        'We have received your order, you\'ll receive a confirmation mail soon..'}</Text>
                                </View> */}
                                    <View style={styles.orderBlock}>
                                        <Text style={styles.orderBlockHeading}>{I18n.t('order_number')}</Text>
                                        <View style={styles.orderBlockHeadingBelow}>
                                            <Text style={styles.orderBlockHeadingTxt}>{orderData.items_ordered[0].order_increment_id}</Text>
                                        </View>
                                    </View>
                                    <View style={styles.orderBlock}>
                                        <Text style={styles.orderBlockHeading}>{I18n.t('address')}</Text>
                                        <View style={styles.orderBlockHeadingBelow}>
                                            <Text style={{ paddingHorizontal: scale(2), fontWeight: 'bold' }}>{I18n.t('deliver_to')} {orderData.shipping_address.firstname} {orderData.shipping_address.lastname}</Text>
                                            <Text>{orderData.shipping_address.street}</Text>
                                            <Text>{orderData.shipping_address.city}, {orderData.shipping_address.region} </Text>
                                            <Text>{orderData.shipping_address.telephone}</Text>
                                        </View>
                                    </View>
                                    <View style={styles.orderBlock}>
                                        <Text style={styles.orderBlockHeading}>{I18n.t('delivery1')}</Text>
                                        <View style={styles.orderBlockHeadingBelow}>
                                            <Text style={styles.orderBlockHeadingTxt}>{orderData.shipping_type}</Text>
                                        </View>
                                    </View>
                                    <View style={styles.orderBlock}>
                                        <Text style={styles.orderBlockHeading}>{I18n.t('payment')}</Text>
                                        <View style={styles.orderBlockHeadingBelow}>
                                            <Text style={styles.orderBlockHeadingTxt}>{orderData.payment_method}</Text>
                                        </View>
                                    </View>
                                    <View>
                                        <FlatList
                                            data={orderData.items_ordered}
                                            renderItem={this.addProductToList}
                                            ItemSeparatorComponent={this.renderSeparator}
                                            showsVerticalScrollIndicator={false}
                                            keyExtractor={(item, index) => index.toString()}
                                            nestedScrollEnabled={true}
                                        />
                                    </View>
                                    <View style={[styles.orderBlock, { paddingVertical: verticalScale(5), marginTop: scale(25) }]}>
                                        <Text style={styles.orderBlockHeading}>{I18n.t('order_summary')}</Text>
                                        <View style={styles.orderBlockMargin}>
                                            <View style={styles.orderSummary}>
                                                <View style={styles.alignRow}>
                                                    <Text>{I18n.t('subtotal')}</Text>
                                                    <Text>{orderData.order_summary.currency} {orderData.order_summary.subtotal_incl_tax}</Text>
                                                </View>
                                                <View style={styles.alignRow}>
                                                    <Text>{I18n.t('saving')}</Text>
                                                    <Text>{orderData.order_summary.currency} {orderData.order_summary.discount_amount}</Text>
                                                </View>
                                                <View style={styles.alignRow}>
                                                    <Text>{I18n.t('shipping')}</Text>
                                                    <Text>{orderData.order_summary.currency} {orderData.order_summary.shipping_amount}</Text>
                                                </View>
                                                <View style={styles.alignRow}>
                                                    <Text>{I18n.t('cod')}</Text>
                                                    <Text>{orderData.order_summary.currency} {orderData.order_summary.cod_charges}</Text>
                                                </View>
                                                <View style={styles.alignRow}>
                                                    <Text style={{ fontWeight: 'bold' }}>{I18n.t('total')}</Text>
                                                    <Text style={{ fontWeight: 'bold' }}>{orderData.order_summary.currency} {orderData.order_summary.grand_total}</Text>
                                                </View>
                                                <View style={styles.alignRow}>
                                                    <Text>{I18n.t('vat')}</Text>
                                                    <Text>{orderData.order_summary.currency} {orderData.order_summary.tax_amount}</Text>
                                                </View>
                                            </View>
                                        </View>
                                    </View>
                                    <View style={[styles.orderBlock, { paddingVertical: verticalScale(5) }]}>
                                        <Text style={styles.orderBlockHeading}>{I18n.t('order_status1')}</Text>
                                        <View style={styles.orderBlockMargin}>
                                            <View style={styles.orderSummary}>
                                                <View style={styles.alignRow}>
                                                    <Text>{I18n.t('order_status')}</Text>
                                                    <Text>{orderData.order_summary.order_status}</Text>
                                                </View>
                                            </View>
                                        </View>
                                    </View>
                                    <View style={[styles.orderBlock, { paddingVertical: verticalScale(5) }]}>
                                        <Text style={styles.orderBlockHeading}>{I18n.t('payment_summary')}</Text>
                                        <View style={styles.orderBlockMargin}>
                                            <View style={styles.orderSummary}>
                                                <View style={styles.alignRow}>
                                                    <Text>{orderData.payment_method === 'Cash On Delivery' ? (I18n.t('cod')) : (I18n.t('pay_by_card'))}</Text>
                                                    <Text>{orderData.order_summary.currency} {orderData.order_summary.grand_total}</Text>
                                                </View>
                                            </View>
                                        </View>
                                    </View>
                                    <View style={[styles.orderBlock, { paddingVertical: verticalScale(5) }]}>
                                        <View style={styles.orderBlockMargin}>
                                            <View style={styles.alignRow}>
                                                <Text style={{ textAlign: 'center' }}>{I18n.t('TEXT13')}</Text>
                                            </View>
                                        </View>
                                    </View>
                                </View>
                            </View>
                            <Footer {...this.props} />
                        </ScrollView> : <View style={{ flex: 1, justifyContent: 'center' }}>
                            <ActivityIndicator size="large" color="#0000ff" />
                        </View>}</View>}
            </View>
        );
    }
}

function mapStateToProps(state) {
    const { OrderReducer } = state;
    return {
        orderData: OrderReducer.orderViewData,
        status: OrderReducer.status,
    };
}
const mapDispatchToProps = (dispatch) => {
    return {
        getOrderView: (obj) => {
            dispatch(getOrderView(obj))
        },
        //   getOrderHistory: (obj) => {
        //     dispatch(orderHistory(obj))
        //   },
        // updateNetworkLost: () => {
        //     dispatch(networkLost());
        // },
        // updateNetworkAvailable: () => {
        //     dispatch(networkAvailable());
        // },
    };

};

export default connect(mapStateToProps, mapDispatchToProps)(OrderView);