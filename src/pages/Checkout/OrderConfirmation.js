// import React, { Component } from 'react';
// import {
//     Platform,
//     Text,
//     View,
//     StyleSheet,
//     Button,
//     ScrollView,
//     Linking,
//     TextInput,
//     TouchableOpacity,
//     Image,
//     Picker,
//     ActivityIndicator,
//     Modal,
//     FlatList,
// } from 'react-native';

// import I18n from '../../localization/index';
// import * as CONSTV from '../../utils/Const';
// import SubHeader from '../../common/header/subHeader'
// import styles from './Style'
// import Validators from '../../utils/Validators';
// import * as MESSAGE from '../../utils/Message';
// import { scale, verticalScale } from '../../utils/Scale';
// import Footer from '../../common/footer';
// import HeaderComm from '../../common/header/header';
// import COMMONSTYLE from '../../utils/Style';
// import MaterialIcons from "react-native-vector-icons/MaterialCommunityIcons";
// import * as COLORS from '../../utils/Color';
// import showToast from "../../helper/Toast";
// import { connect } from 'react-redux';
// import { orderConfirm} from '../../actions/CheckoutAction';

// import Util from '../../utils/Util';

// class confirmation extends Component {

//     constructor(props) {
//         super(props);

//         this.state = {
//             activityIndicator: true,
//             orderStatus: true,
//             orderData: {},
//         }
//     }

//     componentWillMount() {
//         var obj ={quote_id: "42030",
//         store_id: 4}
//         this.props.orderConfirmation(obj)
//     }

//     componentWillReceiveProps(nextProps) {
//     }

//     render() {
//         return (
//             <View style={{ flex: 1 }}>
//                 {/* <HeaderComm changeLang={this.changeLang} navigation={this.props.navigation} /> */}
//                 {this.state.activityIndicator ?
//                     <ScrollView showsVerticalScrollIndicator={false}>
//                         <View style={styles.mainContainer}>
//                             <View style={{ paddingVertical: verticalScale(16) }}>
//                                 <View>
//                                     <Text style={styles.headerTxt}>{this.state.orderStatus ? 'Sorry' : 'Thank You'}</Text>
//                                     <Text style={styles.headerSubTxt}>{this.state.orderStatus ?
//                                         'Unable to process your order.You can try again or contact to our customer service agent for more information..' :
//                                         'We have received your order, you\'ll receive a confirmation mail soon..'}</Text>
//                                 </View>
//                                 <View style={styles.orderBlock}>
//                                     <Text style={{ paddingVertical: verticalScale(10), fontSize: scale(20) }}>{I18n.t('order_number')}</Text>
//                                     <View style={{ paddingBottom: scale(30), paddingVertical: verticalScale(5) }}>
//                                         <Text style={{ paddingHorizontal: scale(2), fontSize: scale(25) }}>000000751</Text>
//                                     </View>
//                                 </View>
//                                 <View style={styles.orderBlock}>
//                                     <Text style={{ paddingVertical: verticalScale(10), fontSize: scale(20) }}>{I18n.t('address')}</Text>
//                                     <View style={{ paddingBottom: scale(30), paddingVertical: verticalScale(5) }}>
//                                         <Text style={{ paddingHorizontal: scale(2), fontWeight: 'bold' }}>{I18n.t('deliver_to')}</Text>
//                                         <Text>No. 04, 2nd Floor Nitron Classic, ,St. Patrick Town (Before Gate, Next to Kalpana Housing Society,, Hadapsar, Pune, Maharashtra 411013</Text>
//                                         <Text>Maharashtra,Maharashtra</Text>
//                                     </View>
//                                 </View>
//                                 <View style={styles.orderBlock}>
//                                     <Text style={{ paddingVertical: verticalScale(10), fontSize: scale(20) }}>{I18n.t('delivery')}</Text>
//                                     <View style={{ paddingBottom: scale(30), paddingVertical: verticalScale(5) }}>
//                                         <Text style={{ paddingHorizontal: scale(2), fontSize: scale(25) }}>Deliver To Address</Text>
//                                     </View>
//                                 </View>
//                                 <View style={styles.orderBlock}>
//                                     <Text style={{ paddingVertical: verticalScale(10), fontSize: scale(20) }}>{I18n.t('payment')}</Text>
//                                     <View style={{ paddingBottom: scale(30), paddingVertical: verticalScale(5) }}>
//                                         <Text style={{ paddingHorizontal: scale(2), fontSize: scale(25) }}>Pay By Card</Text>
//                                     </View>
//                                 </View>
//                                 <View style={[styles.orderProduct, styles.orderBlock]}>
//                                     <View style={styles.imageContainer}>
//                                         <Image source={{ uri: "https://storage.googleapis.com/nay/images/product/sm/sp19/nay-sp19-slippers-opentoe-harmonia-212465328-1199.jpg", height: scale(128), width: scale(128) }}  style={{ resizeMode: 'contain'}}/>
//                                     </View>
//                                     <View style={{ width: '35%' }}>
//                                         <Text style={{ fontWeight: 'bold' }}>Slippers</Text>
//                                         <Text>Color: Ivory</Text>
//                                         <Text>Size : S</Text>
//                                         <Text>212465344</Text>
//                                     </View>
//                                     <View style={{ width: '25%' }}>
//                                         <Text style={styles.price}>USD 59</Text>
//                                         <Text style={styles.price}>Qty 1</Text>
//                                     </View>
//                                 </View>
//                                 <View style={[styles.orderBlock, { paddingVertical: verticalScale(5) }]}>
//                                     <Text style={{fontSize: scale(20)}}>{I18n.t('order_summary')}</Text>
//                                     <View style={styles.orderBlockMargin}>
//                                         <View style={styles.orderSummary}>
//                                             <View style={styles.alignRow}>
//                                                 <Text>{I18n.t('subtotal')}</Text>
//                                                 <Text>USD 59</Text>
//                                             </View>
//                                             <View style={styles.alignRow}>
//                                                 <Text>{I18n.t('shipping')}</Text>
//                                                 <Text>USD 10</Text>
//                                             </View>
//                                             <View style={styles.alignRow}>
//                                                 <Text>{I18n.t('cod')}</Text>
//                                                 <Text>USD 0</Text>
//                                             </View>
//                                             <View style={styles.alignRow}>
//                                                 <Text style={{fontWeight: 'bold'}}>{I18n.t('total')}</Text>
//                                                 <Text style={{fontWeight: 'bold'}}>USD 18</Text>
//                                             </View>
//                                             <View style={styles.alignRow}>
//                                                 <Text>{I18n.t('vat')}</Text>
//                                                 <Text>USD 0.86</Text>
//                                             </View>
//                                         </View>
//                                     </View>
//                                 </View>
//                                 <View style={[styles.orderBlock, { paddingVertical: verticalScale(5) }]}>
//                                     <Text style={{fontSize: scale(20)}}>{I18n.t('order_status1')}</Text>
//                                     <View style={styles.orderBlockMargin}>
//                                         <View style={styles.orderSummary}>
//                                             <View style={styles.alignRow}>
//                                                 <Text>{I18n.t('order_status')}</Text>
//                                                 <Text>Ordered</Text>
//                                             </View>
//                                         </View>
//                                     </View>
//                                 </View>
//                                 <View style={[styles.orderBlock, { paddingVertical: verticalScale(5) }]}>
//                                     <Text style={{fontSize: scale(20)}}>{I18n.t('payment_summary')}</Text>
//                                     <View style={styles.orderBlockMargin}>
//                                         <View style={styles.orderSummary}>
//                                             <View style={styles.alignRow}>
//                                                 <Text>{I18n.t('pay_by_card')}</Text>
//                                                 <Text>USD 18</Text>
//                                             </View>
//                                         </View>
//                                     </View>
//                                 </View>
//                                 <View style={[styles.orderBlock, { paddingVertical: verticalScale(5) }]}>
//                                     <View style={styles.orderBlockMargin}>
//                                         <View style={styles.alignRow}>
//                                             <Text style={{textAlign: 'center'}}>Should you have any queries, contact our customer service by calling us at +971 4 3576754 or e-mail us to customerservice@nayomi.com</Text>
//                                         </View>
//                                     </View>
//                                 </View>
//                                 <Image source={{ uri: "https://storage.googleapis.com/nay/images/product/sm/sp19/nay-sp19-slippers-opentoe-harmonia-212465328-1199.jpg" }}/>
//                             </View>
//                         </View>
//                         {/* <Footer {...this.props} /> */}
//                     </ScrollView> : <View style={{ flex: 1, justifyContent: 'center' }}>
//                         <ActivityIndicator size="large" color="#0000ff" />
//                     </View>}
//             </View>
//         );
//     }
// }

// function mapStateToProps(state) {
//     const { CheckoutReducer } = state;
//     return {
//         orderConfirmStatus: CheckoutReducer.orderConfirmStatus,
//         orderConfirmData: CheckoutReducer.orderConfirmData
//     };
// }
// const mapDispatchToProps = (dispatch) => {
//     return {
//         orderConfirmation: (obj) => {
//             dispatch(orderConfirm(obj))
//           },
//     };

// };

// export default connect(mapStateToProps, mapDispatchToProps)(confirmation);


import React, { Component } from 'react';
import {
    Text,
    View,
    ScrollView,
    TouchableOpacity,
    Image,
    ActivityIndicator,
    FlatList,
} from 'react-native';

import I18n from '../../localization/index';
import styles from './Style'
import { scale, verticalScale } from '../../utils/Scale';
import Footer from '../../common/footer';
import HeaderComm from '../../common/header/header';
import COMMONSTYLE from '../../utils/Style';
import MaterialIcons from "react-native-vector-icons/MaterialCommunityIcons";
import * as COLORS from '../../utils/Color';
import showToast from "../../helper/Toast";
import { connect } from 'react-redux';
import Util from '../../utils/Util';
import { getOrderJson, getOrderSummary, clearOrderData, clearOrderJsonData } from '../../actions/OrderAction'
import { clearCartData } from '../../actions/CartAction';
import { getCart } from '../../actions/CartAction';

class OrderConfirmation extends Component {

    constructor(props) {
        super(props);

        this.state = {
            activityIndicator: true,
            orderStatus: true,
            orderData: {},
            orderid: this.props.navigation.state.params.orderId,
            storeId: null,
            quoteId: null,
            cartData: {},
            errorOccured: false,
        }
    }

    componentWillMount() {
        const { cartData } = this.props;
        this.setState({ cartData: cartData.data.products });
        const { orderid } = this.state
        var obj = {
            order_id: orderid,
            //order_id: 854,
        }
        this.props.orderJson(obj);
        this.props.clearCart();
        Util.getAsyncStorage('SELECTED_COUNTRY_LANGUAGE').then((language) => {
            this.setState({ storeId: language.store_id });
            Util.getAsyncStorage('SIGN_IN_DATA').then((data) => {
                if (data !== null) {
                    Util.getAsyncStorage('S_quote_id_digit').then((Sdata) => {
                        this.setState({ quoteId: Sdata, activityIndicator: false });
                        var obj = { quote_id: Sdata, store_id: language.store_id };
                        this.props.getCartData(obj);
                    });
                } else {
                    Util.getAsyncStorage('G_quote_id_digit').then((Gdata) => {
                        if (Gdata !== null) {
                            this.setState({ quoteId: Gdata, activityIndicator: false });
                            var obj = { quote_id: Sdata, store_id: language.store_id };
                            this.props.getCartData(obj);
                        }
                    });
                }
            });
        });
        // var obj = {
        //     order_id: '4000017',
        //     store_id: storeId,
        // }
        // //this.props.clearCart(); 
        // this.props.clearOrderJson();
        // this.props.orderSummary(obj);
    }

    // componentWillUnmount(){
    //     const { quoteId, storeId } = this.state;
    //     this.props.clearCart();
    //     var obj = { quote_id: quoteId, store_id: storeId };
    //     this.props.getCartData(obj);
    // }

    componentWillReceiveProps(nextProps) {
        const { orderid, storeId } = this.state
        if (nextProps.status === 'ORDER_JSON_DATA_SUCCESS') {
            this.setState({ orderStatus: nextProps.orderJsonData.status })
            var obj = {
                order_id: orderid,
                store_id: storeId,
            }
            //this.props.clearCart(); 
            this.props.clearOrderJson();
            this.props.orderSummary(obj);
        } else if (nextProps.status === 'ORDER_JSON_DATA_FAILED') {
            //this.props.clearCart(); 
            this.props.clearOrderJson();
            this.setState({ errorOccured: true });
        } else if (nextProps.status === 'ORDER_SUMMARY_DATA_SUCCESS') {
            this.setState({ orderData: nextProps.orderSummaryData.order_data });
            this.props.clearOrder();
        } else if (nextProps.status === 'ORDER_SUMMARY_DATA_FAILED') {
            //this.props.clearCart(); 
            this.props.clearOrder();
            this.setState({ errorOccured: true });
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
                <TouchableOpacity style={[styles.orderProduct, styles.orderBlock1]}
                    onPress={this.getListViewItem.bind(this, item)}>
                    <View style={styles.imageContainer}>
                        <Image source={{ uri: item.image[0], height: scale(150), wisdth: scale(120) }} style={{ resizeMode: 'contain' }} />
                    </View>
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
                            }</View> : <Text style={styles.price}> {I18n.t('free')}</Text>}
                        <View style={{ flexDirection: 'row',  justifyContent: 'center'}}>
                            <View style={styles.box}>
                                <Text>{item.qty}</Text>
                            </View>
                        </View>
                        {/* <Text style={styles.price}>Qty {orderData.items_ordered[0].qty_ordered}</Text> */}
                    </View>
                </TouchableOpacity></View>

        )
    }

    render() {
        const { orderData, orderStatus, cartData, errorOccured } = this.state;
        //const { cartData } = this.props
        return (
            <View style={{ flex: 1 }}>
                <HeaderComm changeLang={this.changeLang} navigation={this.props.navigation} onRef={instance => { this.instance = instance; }} classObj={this} {...this.props}/>
                {Object.keys(orderData).length > 0 && Object.keys(cartData).length > 0 ?
                    <ScrollView showsVerticalScrollIndicator={false}>
                        <View style={styles.mainContainer}>
                            <View style={{ paddingVertical: verticalScale(16), paddingHorizontal: scale(16) }}>
                                <View>
                                    <Text style={styles.headerTxt}>{!orderStatus ? <Text>{I18n.t('sorry')}</Text> : <Text>{I18n.t('thankyou')}</Text>}</Text>
                                    <Text style={styles.headerSubTxt}>{!orderStatus ?
                                        <Text>{I18n.t('TEXT11')}</Text> :
                                        <Text>{I18n.t('TEXT12')}</Text>}</Text>
                                </View>
                                <View style={{ paddingHorizontal: scale(10) }}>
                                    <View style={styles.orderBlock}>
                                        <Text style={{ paddingVertical: verticalScale(10), fontSize: scale(20) }}>{I18n.t('order_number')}</Text>
                                        <View style={{ paddingBottom: scale(30), paddingVertical: verticalScale(5) }}>
                                            <Text style={{ paddingHorizontal: scale(4), fontSize: scale(25) }}>{orderData.order_number}</Text>
                                        </View>
                                    </View>
                                    <View style={styles.orderBlock}>
                                        <Text style={{ paddingVertical: verticalScale(10), fontSize: scale(20) }}>{I18n.t('address')}</Text>
                                        <View style={{ paddingBottom: scale(30), paddingVertical: verticalScale(5) }}>
                                            <Text style={{ paddingHorizontal: scale(4), fontWeight: 'bold' }}>{I18n.t('deliver_to')}{'  '}{}</Text>
                                            {/* <Text>No. 04, 2nd Floor Nitron Classic, ,St. Patrick Town (Before Gate, Next to Kalpana Housing Society,, Hadapsar, Pune, Maharashtra 411013</Text>
                                        <Text>Maharashtra,Maharashtra</Text> */}
                                            <Text>{orderData.address.street}</Text>
                                            <Text>{orderData.address.region}{'  '}{orderData.address.city}</Text>
                                            <Text>{orderData.address.country}</Text>
                                            <Text>{orderData.address.telephone}</Text>
                                        </View>
                                    </View>
                                    <View style={styles.orderBlock}>
                                        <Text style={{ paddingVertical: verticalScale(10), fontSize: scale(20) }}>{I18n.t('delivery')}</Text>
                                        <View style={{ paddingBottom: scale(30), paddingVertical: verticalScale(5) }}>
                                            <Text style={{ paddingHorizontal: scale(4), fontSize: scale(25) }}>{orderData.delivery_type}</Text>
                                        </View>
                                    </View>
                                    <View style={styles.orderBlock}>
                                        <Text style={{ paddingVertical: verticalScale(10), fontSize: scale(20) }}>{I18n.t('payment')}</Text>
                                        <View style={{ paddingBottom: scale(30), paddingVertical: verticalScale(5) }}>
                                            <Text style={{ paddingHorizontal: scale(4), fontSize: scale(25) }}>{orderData.payment_method === 'Credit Card' ? <Text>{I18n.t('mada_bank_card_credit_card')}</Text> : <Text>{I18n.t('cod')}</Text>}</Text>
                                        </View>
                                    </View>
                                    {/* <View style={[styles.orderProduct, styles.orderBlock]}>
                                    <View style={styles.imageContainer}>
                                        <Image source={{ uri: "https://storage.googleapis.com/nay/images/product/sm/sp19/nay-sp19-slippers-opentoe-harmonia-212465328-1199.jpg", height: scale(128), width: scale(128) }} style={{ resizeMode: 'contain' }} />
                                    </View>
                                    <View style={{ width: '35%' }}>
                                        <Text style={{ fontWeight: 'bold' }}>Slippers</Text>
                                        <Text>Color: Ivory</Text>
                                        <Text>Size : S</Text>
                                        <Text>212465344</Text>
                                    </View>
                                    <View style={{ width: '25%' }}>
                                        <Text style={styles.price}>USD 59</Text>
                                        <Text style={styles.price}>Qty 1</Text>
                                    </View>
                                </View>*/}
                                </View>
                            </View>
                            <View style={styles.orderCartData}>
                                <ScrollView showsHorizontalScrollIndicator={false}>
                                    <FlatList
                                        data={cartData}
                                        renderItem={this.addProductToList}
                                        ItemSeparatorComponent={this.renderSeparator}
                                        keyExtractor={(item, index) => index.toString()}
                                    />
                                </ScrollView>
                            </View>
                            <View style={{ paddingVertical: verticalScale(16), paddingHorizontal: scale(16) }}>
                                <View style={{ paddingHorizontal: scale(10) }}>
                                    <View style={[styles.orderBlock, { paddingVertical: verticalScale(5) }]}>
                                        <Text style={{ fontSize: scale(20) }}>{I18n.t('order_summary')}</Text>
                                        <View style={styles.orderBlockMargin}>
                                            <View style={styles.orderSummary}>
                                                <View style={styles.alignRow}>
                                                    <Text>{I18n.t('subtotal')}</Text>
                                                    <Text>{orderData.order_summary.currency} {orderData.order_summary.subtotal}</Text>
                                                </View>
                                                {orderData.order_summary.shipping !== 0 && <View style={styles.alignRow}>
                                                    <Text>{I18n.t('shipping')}</Text>
                                                    <Text>{orderData.order_summary.currency} {orderData.order_summary.shipping}</Text>
                                                </View>}
                                                {orderData.order_summary.COD !== 0 && <View style={styles.alignRow}>
                                                    <Text>{I18n.t('cod')}</Text>
                                                    <Text>{orderData.order_summary.currency} {orderData.order_summary.COD}</Text>
                                                </View>}
                                                <View style={styles.alignRow}>
                                                    <Text style={{ fontWeight: 'bold' }}>{I18n.t('total')}</Text>
                                                    <Text style={{ fontWeight: 'bold' }}>{orderData.order_summary.currency} {orderData.order_summary.total}</Text>
                                                </View>
                                                <View style={styles.alignRow}>
                                                    <Text>{I18n.t('vat')}</Text>
                                                    <Text>{orderData.order_summary.currency} {orderData.order_summary.vat}</Text>
                                                </View>
                                            </View>
                                        </View>
                                    </View>
                                    {/* <CartItem cartData ={cartData} cartDataFromOrderConfirmation={orderData.order_summary} comesFrom={'orderconfirmation'} {...this.props} /> */}
                                    <View style={[styles.orderBlock, { paddingVertical: verticalScale(5) }]}>
                                        <Text style={{ fontSize: scale(20) }}>{I18n.t('order_status1')}</Text>
                                        <View style={styles.orderBlockMargin}>
                                            <View style={styles.orderSummary}>
                                                <View style={styles.alignRow}>
                                                    <Text>{I18n.t('order_status')}</Text>
                                                    <Text>{orderData.status}</Text>
                                                </View>
                                            </View>
                                        </View>
                                    </View>
                                    <View style={[styles.orderBlock, { paddingVertical: verticalScale(5) }]}>
                                        <Text style={{ fontSize: scale(20) }}>{I18n.t('payment_summary')}</Text>
                                        <View style={styles.orderBlockMargin}>
                                            <View style={styles.orderSummary}>
                                                <View style={styles.alignRow}>
                                                    <Text>{orderData.payment_type}</Text>
                                                    <Text>{orderData.order_summary.currency} {orderData.order_summary.subtotal}</Text>
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
                        </View>
                        <Footer {...this.props} />
                    </ScrollView> : <View style={{ flex: 1, justifyContent: 'center' }}>
                        <ActivityIndicator size="large" color="#0000ff" />
                    </View>}
                {errorOccured && <View>
                    <Text>Something Went Wrong</Text>
                </View>}
            </View>
        );
    }
}

function mapStateToProps(state) {
    const { OrderReducer, CartReducer } = state;
    return {
        orderJsonData: OrderReducer.orderJsonData,
        orderSummaryData: OrderReducer.orderSummaryData,
        status: OrderReducer.status,
        cartData: CartReducer.cartData,
    };
}
const mapDispatchToProps = (dispatch) => {
    return {
        orderJson: (obj) => {
            dispatch(getOrderJson(obj))
        },
        orderSummary: (obj) => {
            dispatch(getOrderSummary(obj))
        },
        // updateNetworkLost: () => {
        //     dispatch(networkLost());
        // },
        // updateNetworkAvailable: () => {
        //     dispatch(networkAvailable());
        // },
        clearCart: () => {
            dispatch(clearCartData())
        },
        clearOrder: () => {
            dispatch(clearOrderData())
        },
        clearOrderJson: () => {
            dispatch(clearOrderJsonData())
        },
        getCartData: (obj) => {
            dispatch(getCart(obj))
        },
    };

};

export default connect(mapStateToProps, mapDispatchToProps)(OrderConfirmation);