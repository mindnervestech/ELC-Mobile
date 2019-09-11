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
import Ionicons from "react-native-vector-icons/FontAwesome";
import { getCart, getUpdatedCart, getDeleteItemCart, removeItemsOutOfStock } from '../../actions/CartAction';
import CustomAlert from '../../helper/CustomAlert';


class Cart extends Component {

    constructor(props) {
        super(props);

        this.state = {
            activityIndicator: true,
            //orderStatus: true,
            userData: {},
            originalCartData: {},
            cartData: [],
            cartDataStatus: true,
            deleteItemCartData: true,
            outOfStock: true,
            outOfStockItem: [],
            status: true,
            similar_products: {},

            quoteId: null,
            storeId: null,
            updateCartStatus: false,
            removedCartStatus: false,
            showItemExceeded: false,
            showOutOfStockError: false,
            qty: '',
        }
    }

    changeLang = (lang) => {
        Util.getAsyncStorage('ALL_COUNTRY_AND_LANGUAGE').then((data) => {
            Util.getAsyncStorage('SELECTED_COUNTRY_LANGUAGE').then((select) => {
                for (var i in data.data) {
                    if (data.data[i].country == select.country && data.data[i].language == lang) {
                        Util.setAsyncStorage('SELECTED_COUNTRY_LANGUAGE', data.data[i]);
                        //this.checkNetCnnection();
                    }
                }
            });
        });
    }

    componentWillMount() {
        this.setState({ activityIndicator: false });
        Util.getAsyncStorage('SELECTED_COUNTRY_LANGUAGE').then((language) => {
            this.setState({ storeId: language.store_id });
        });
        Util.getAsyncStorage('SIGN_IN_DATA').then((data) => {
            if (data !== null) {
                Util.getAsyncStorage('S_quote_id_digit').then((Sdata) => {
                    var obj = { quote_id: Sdata, store_id: this.state.storeId };
                    this.setState({ quoteId: Sdata, activityIndicator: false });
                    this.props.getCartData(obj);
                });
            } else {
                Util.getAsyncStorage('G_quote_id_digit').then((Gdata) => {
                    if (Gdata !== null) {
                        var obj = { quote_id: Gdata, store_id: this.state.storeId };
                        this.setState({ quoteId: Gdata, activityIndicator: false });
                        this.props.getCartData(obj);
                    }
                });
            }
        });
    }


    componentWillReceiveProps(nextProps) {
        //this.setState({ activityIndicator: true });
        if (nextProps.status === 'CART_DATA_SUCCESS') {
            this.setState({ activityIndicator: true });
            if (nextProps.cartData.message === 'No Products in cart') {
                this.setState({ cartDataStatus: false, activityIndicator: true });
                this.setState({ similar_products: {} });
                this.setState({ cartData: [] });
                this.setState({ outOfStockItem: [] });
            } else {
                this.setState({ originalCartData: nextProps.cartData.data });
                let cartDataTempory = nextProps.cartData.data;
                let outOfStockItemTemp = [];
                let cartDataTemp = [];
                let cartDataSimilarProducts = [];
                Object.keys(cartDataTempory.products).map((item, index) => {
                    if (cartDataTempory.products[item].is_in_stock.status === 1) {
                        cartDataTemp.push(cartDataTempory.products[item]);
                    } else if (cartDataTempory.products[item].is_in_stock.status === 0) {
                        outOfStockItemTemp.push(cartDataTempory.products[item]);
                    }
                });
                this.setState({ similar_products: cartDataTempory.similar_products });
                this.setState({ cartData: cartDataTemp });
                this.setState({ outOfStockItem: outOfStockItemTemp });
                this.setState({ showOutOfStockError: outOfStockItemTemp.length !== 0 ? true : false })
                if (this.state.updateCartStatus) {
                    showToast('Cart Updated Successfully', true);
                    this.setState({ updateCartStatus: false })
                }
                if (this.state.removedCartStatus) {
                    showToast('Product Removed From Bag Successfully', true);
                    this.setState({ removedCartStatus: false });
                    this.componentWillMount();
                }
            }
        } else if (nextProps.status === 'CART_DATA_FAILED') {
            this.setState({ cartDataStatus: false, activityIndicator: true });
            if (nextProps.cartData.code === 400) {
                Util.setAsyncStorage('G_quote_id_digit', nextProps.cartData.new_quote_id);
                Util.setAsyncStorage('S_quote_id_digit', nextProps.cartData.new_quote_id);
            }
        } else if (nextProps.status === 'UPDATE_CART_DATA_SUCCESS') {
            this.setState({ activityIndicator: false, updateCartStatus: true });
            this.callCart();
        } else if (nextProps.status === 'UPDATE_CART_DATA_FAILED') {
            this.callCart();
        } else if (nextProps.status === 'DELETE_CART_DATA_SUCCESS') {
            this.setState({ activityIndicator: false, removedCartStatus: true });
            this.callCart();
        } else if (nextProps.status === 'DELETE_CART_DATA_FAILED') {
            this.callCart();
        } else if (nextProps.status === 'REMOVE_OUT_STOCK_CART_DATA_SUCCESS') {
            this.callCart();
        }
    }

    callCart() {
        const { quoteId, storeId } = this.state;
        var obj = { quote_id: quoteId, store_id: storeId };
        this.props.getCartData(obj);
        this.setState({ activityIndicator: false })
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

    is_in_stock(item) {
        if (item.stock > 0) {
            this.setState({ addSymbol: true });
        } else {
            this.setState({ addSymbol: false });
        }
    }

    addItemInCart(item, addSubstract) {
        if (parseInt(item.is_in_stock.stock) === item.qty && addSubstract === 'add') {
            this.setState({ showItemExceeded: true, qty: item.qty })
        } else {
            const { quoteId, storeId } = this.state;
            var obj = {
                product_id: item.id,
                qty: addSubstract === 'add' ? item.qty + 1 : item.qty - 1,
                quote_id: quoteId,
                sku: item.sku,
                store_id: storeId
            };
            this.props.getUpdatedCartData(obj);
            this.setState({ activityIndicator: false });
        }
    }

    removeItem(item) {
        const { quoteId } = this.state;
        var obj = { product_id: item.id, quote_id: quoteId, sku: item.sku };
        this.props.getDeleteItemCartData(obj);
        this.setState({ activityIndicator: false });
    }

    removeOutOfStockItems() {
        this.setState({ activityIndicator: false });
        const { quoteId } = this.state;
        var obj = { quote_id: quoteId };
        this.props.removeOutOfStock(obj);
    }

    calculateSaving(splprice, price) {
        return Math.round(((price - splprice) * 100) / price);
    }

    renderCustomAlert() {
        const { qty } = this.state;
        let msg = MESSAGE.EXCEEDED_CART1 + qty + MESSAGE.EXCEEDED_CART2 + qty + MESSAGE.EXCEEDED_CART3
        return (
            <CustomAlert okPressed={() => { this.setState({ showItemExceeded: false }); }} text1={MESSAGE.EXCEEDED_QTY} text2={msg} alertType='OK' />
        )
    }

    renderOutOfStockAlert() {
        return (
            <CustomAlert okPressed={() => { this.setState({ showOutOfStockError: false }); }} text1={MESSAGE.WARNING} text2={MESSAGE.OUT_OF_STOCK} alertType='OK' />
        )
    }

    addProductToList = ({ item }) => {
        return (
            <View>
                <View style={[styles.orderProduct, styles.orderBlock]}>
                    <TouchableOpacity style={styles.imageContainer}
                        onPress={this.getListViewItem.bind(this, item)}>
                        <Image source={{ uri: item.image[0], height: scale(150), wisdth: scale(120) }} style={{ resizeMode: 'contain' }} />
                    </TouchableOpacity>
                    <View style={{ width: '2%' }}></View>
                    <View style={{ width: '32%' }}>
                        <Text style={{ fontWeight: 'bold', fontSize: scale(18) }}>{item.name}</Text>
                        {item.color ? <Text>{I18n.t('color')} {item.color}</Text> : <View />}
                        {item.size !== null && item.size !== '' ? <Text>{I18n.t('size')} {item.size}</Text> : <View />}
                        {item.sku ? <Text>{item.sku}</Text> : <Text />}
                        {item.url_key !== 'freeproduct' ?
                            <View style={item.color ? { marginTop: scale(25) } : { marginTop: scale(50) }}>
                                <TouchableOpacity style={[COMMONSTYLE.heroLargeButton, { height: scale(28), width: '70%' }]} onPress={() => this.removeItem(item)}>
                                    <Text style={COMMONSTYLE.yesBtnTxt}>{I18n.t('remove')}</Text>
                                </TouchableOpacity>
                            </View> : <View />}
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
                        <View style={{ flexDirection: 'row', paddingVertical: verticalScale(20) }}>
                            {item.price !== 0 ? <TouchableOpacity
                                style={styles.modalIcon}
                                onPress={() => { this.addItemInCart(item, 'substract') }}
                                disabled={item.qty === 1 ? true : false}>
                                <MaterialIcons
                                    name="minus"
                                    color={item.qty === 1 ? COLORS.BRAND_LIGHTEST : COLORS.BRAND_DARKEST}
                                    size={scale(30)}
                                    style={{ zIndex: 1 }}
                                />
                            </TouchableOpacity> : <TouchableOpacity style={styles.modalIcon} />}
                            <View style={styles.box}>
                                <Text>{item.qty}</Text>
                            </View>
                            {item.price !== 0 ? <TouchableOpacity
                                style={styles.modalIcon}
                                onPress={() => { this.addItemInCart(item, 'add') }}
                                disabled={this.state.plusDisableEnable}>
                                <MaterialIcons
                                    name="plus"
                                    color={COLORS.BRAND_DARKEST}
                                    size={scale(30)}
                                    style={{ zIndex: 1 }}
                                />
                            </TouchableOpacity> : <TouchableOpacity style={styles.modalIcon} />}
                        </View>
                        {/* <Text style={styles.price}>Qty {orderData.items_ordered[0].qty_ordered}</Text> */}
                    </View>
                </View></View>

        )
    }

    addOutOfStockItem = ({ item }) => {
        return (
            <TouchableOpacity style={[styles.bottomBdr, { flexDirection: 'row' }]}
                onPress={this.getListViewItem.bind(this, item)}>
                <View style={{ width: '28%', justifyContent: 'center' }}>
                    <View style={styles.outOfStockImageContainer}>
                        <Image source={{ uri: item.image[0], height: scale(150), width: scale(120) }} style={{ resizeMode: 'contain' }} />
                    </View>
                    <View style={{ top: scale(-15) }}>
                        <View style={styles.outOfStockOther}>
                            <Text style={{ textAlign: 'center' }}>{item.name}</Text>
                        </View>
                        <View style={styles.outOfStockOther}>
                            <Text style={{ textAlign: 'center' }}>{item.qty * item.price}</Text>
                        </View>
                        <TouchableOpacity style={styles.outOfStockRemoveButton} onPress={() => this.removeItem(item)}>
                            <Text style={[COMMONSTYLE.yesBtnTxt, { color: 'black' }]}>{I18n.t('remove')}</Text>
                        </TouchableOpacity>

                    </View>
                </View>
                <View style={{ width: '22%' }}>
                    <Text style={{ textAlign: 'center' }}>{item.qty}</Text>
                </View>
                <View style={{ width: '22%' }}>
                    <Text style={{ textAlign: 'center' }}>{item.qty * item.price}</Text>
                </View>
                <View style={{ width: '28%' }}>
                    <Text style={{ textAlign: 'center' }}>{item.is_in_stock.message}</Text>
                </View>
            </TouchableOpacity>
        )
    }

    renderOptionItem = ({ item }) => {
        var showSaleIn = false;
        var discountedPrice = 0;
        if (item.buymore_savemore.status) {
            var arr = [];
            for (var i in item.buymore_savemore.data) {
                if (i != 1 && arr.length < 2) {
                    var data = {}
                    data[i] = item.buymore_savemore.data[i];
                    arr.push(data);
                } else if(i==1) {
                    //this.setState({ showSale : true });
                    showSaleIn = true;
                    discountedPrice = item.buymore_savemore.data[i];
                }
            }
            item.offerList = arr;
        }

        return (
            <TouchableOpacity style={{ width: scale(166), justifyContent: 'center', alignItems: 'center', paddingBottom: scale(10) }}
                onPress={this.getListViewItem.bind(this, item)}>
                <Image style={{ width: '95%', height: scale('230') }} source={{ uri: item.productImageUrl[0] }} />
                <View style={{ paddingVertical: 10, alignItems: 'center' }}>
                    <Text style={styles.itemText}>{item.name}</Text>
                    <Text style={[styles.itemText1, { color: 'lightpink' }]}>{item.description}</Text>
                    <View style={styles.itemText2}>
                        {item.buymore_savemore.status == 1 ?
                            <View style={{ flexDirection: 'row' }}>
                                <Text style={[styles.amountText, { textDecorationLine: discountedPrice !== 0 ? 'line-through' : 'none', color: 'black' }]}>
                                    {item.currency}&nbsp;{item.price}
                                </Text>
                                {discountedPrice !== 0 &&
                                    <Text style={styles.amountText}>
                                        &nbsp;{item.currency}&nbsp;{discountedPrice}
                                </Text>}
                            </View>
                            : <View />}
                        {item.buymore_savemore.status == 0 ?
                            <View style={{ flexDirection: 'row' }}>
                                <Text style={[styles.amountText, { color: 'black' }]}>
                                    {item.currency}&nbsp;{item.price}
                                </Text>
                            </View>
                            : <View />}
                    </View>
                    {item.buymore_savemore.status == 1 && !showSaleIn ?
                        <TouchableOpacity style={{ width: '100%', height: scale(30), borderRadius: scale(20), backgroundColor: '#f599ba', justifyContent: 'center', alignItems: 'center' }}>
                            <Text style={[styles.itemText3, { padding: scale(10) }]}>{I18n.t('buymore_savemore')}</Text>
                        </TouchableOpacity>
                        : <View />}
                    {showSaleIn ?
                        <TouchableOpacity style={{ width: '100%', height: scale(30), borderRadius: scale(20), backgroundColor: '#f599ba', justifyContent: 'center', alignItems: 'center' }}>
                            <Text style={[styles.itemText3, { padding: scale(10) }]}>{I18n.t('sale')}</Text>
                        </TouchableOpacity>
                        : <View />}
                </View>
            </TouchableOpacity>
        )
    }

    render() {
        const { cartData, cartDataStatus, outOfStockItem, originalCartData, similar_products, showItemExceeded, showOutOfStockError } = this.state;
        return (
            <View style={{ flex: 1 }}>
                <HeaderComm changeLang={this.changeLang} navigation={this.props.navigation} onRef={instance => { this.instance = instance; }} classObj={this} {...this.props}/>
                {this.state.activityIndicator ?
                    <ScrollView showsVerticalScrollIndicator={false}>
                        {cartData.length !== 0 ?
                            <View>
                                <View style={styles.mainContainer}>
                                    <ScrollView showsHorizontalScrollIndicator={false}>
                                        <FlatList
                                            data={cartData}
                                            renderItem={this.addProductToList}
                                            ItemSeparatorComponent={this.renderSeparator}
                                            keyExtractor={(item, index) => index.toString()}
                                        />
                                    </ScrollView>
                                </View>
                                <View style={styles.orderBlockMargin}>
                                    <View style={styles.subTotal}>
                                        <Text style={styles.orderBlockHeading}>{I18n.t('subtotal')}</Text>
                                        {originalCartData.subtotal_with_discount < originalCartData.subtotal && <Text style={styles.orderBlockHeading}>{originalCartData.currency} {originalCartData.subtotal_with_discount} <Text style={{ textDecorationLine: 'line-through', fontSize: scale(10) }}>{originalCartData.subtotal}</Text></Text>}
                                        {originalCartData.subtotal_with_discount === originalCartData.subtotal && <Text style={styles.orderBlockHeading}>{originalCartData.currency} {originalCartData.subtotal_with_discount}</Text>}
                                    </View>
                                    <View style={styles.alignRow}>
                                        <Text style={{ textAlign: 'left' }}>{I18n.t('TEXT6')}</Text>
                                    </View>
                                </View>
                                <View style={styles.similar_products}>
                                    {Object.keys(similar_products).length > 0 ?
                                        <View style={{ paddingVertical: scale(15), height: scale(400) }}>
                                            <View style={{ flexDirection: I18n.locale == 'ar' ? 'row-reverse' : 'row' }}>
                                                <Text style={styles.youMayText}>{I18n.t('youMayAlsoLove')}</Text>
                                            </View>
                                            <FlatList
                                                data={similar_products}
                                                renderItem={this.renderOptionItem}
                                                ItemSeparatorComponent={this.renderSeparator}
                                                horizontal={true}
                                                showsHorizontalScrollIndicator={false}
                                                style={{ marginTop: scale(10) }}
                                                keyExtractor={(item, index) => index.toString()}
                                            />
                                        </View> : <View />}
                                </View>
                                {outOfStockItem.length !== 0 && <View style={{ backgroundColor: 'white', paddingVertical: verticalScale(20), }}>
                                    <View style={styles.outOfStockBox}>
                                        <View style={{ paddingHorizontal: scale(16) }}>
                                            <View style={styles.bottomBdr}>
                                                <View style={{ width: '50%' }}>
                                                    <Text>{I18n.t('out_of_stock_items')}</Text>
                                                </View>
                                                <TouchableOpacity style={[COMMONSTYLE.heroLargeButton, { height: scale(23), width: '50%' }]} onPress={() => this.removeOutOfStockItems()}>
                                                    <Text style={COMMONSTYLE.yesBtnTxt}>{I18n.t('remove_these_items')}</Text>
                                                </TouchableOpacity>
                                            </View>
                                            <View>
                                                <View style={[styles.bottomBdr, { flexDirection: 'row' }]}>
                                                    <View style={{ width: '28%' }}>
                                                        <Text style={{ textAlign: 'center' }}>{I18n.t('product')}</Text>
                                                    </View>
                                                    <View style={{ width: '22%' }}>
                                                        <Text style={{ textAlign: 'center' }}>{I18n.t('quantity')}</Text>
                                                    </View>
                                                    <View style={{ width: '22%' }}>
                                                        <Text style={{ textAlign: 'center' }}>{I18n.t('subtotal')}</Text>
                                                    </View>
                                                    <View style={{ width: '28%' }}>
                                                        <Text style={{ textAlign: 'center' }}>{I18n.t('status')}</Text>
                                                    </View>
                                                </View>
                                                <ScrollView showsHorizontalScrollIndicator={false}>
                                                    <FlatList
                                                        data={outOfStockItem}
                                                        renderItem={this.addOutOfStockItem}
                                                        ItemSeparatorComponent={this.renderSeparator}
                                                        keyExtractor={(item, index) => index.toString()}
                                                    />
                                                </ScrollView>
                                            </View>
                                        </View>
                                    </View>
                                </View>}
                            </View> :
                            <View style={styles.emptyContainer}>
                                <Text style={{ fontSize: scale(32) }}>{I18n.t('bag_empty')}</Text>
                            </View>}
                        <Footer {...this.props} />
                    </ScrollView>
                    : <View style={{ flex: 1, justifyContent: 'center' }}>
                        <ActivityIndicator size="large" color="#0000ff" />
                    </View>}
                {this.state.activityIndicator &&
                    <View style={I18n.locale == 'ar' ? { flexDirection: 'row-reverse', } : { flexDirection: 'row', }}>
                        <TouchableOpacity style={[styles.backButton, { top: scale(0) }]} onPress={() => { this.props.navigation.goBack() }}>
                            <Text style={[styles.checkOutButtonTxt, { color: 'black', fontSize: scale(25), top: scale(5) }]}>{I18n.t('symbol')}</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.checkOutButton} disabled={cartData.length !== 0 || outOfStockItem.length !== 0 ? false : true} onPress={() => { this.props.navigation.navigate('Checkout', { comesFrom: '' }) }}>
                            <Text style={styles.checkOutButtonTxt}>{I18n.t('checkout')}</Text>
                        </TouchableOpacity>
                    </View>}
                {showItemExceeded ?
                    <View>{this.renderCustomAlert()}</View> : <View />}
                {showOutOfStockError && 
                    <View>{this.renderOutOfStockAlert()}</View> }
            </View>
        );
    }
}

function mapStateToProps(state) {
    const { CartReducer } = state;
    return {
        cartData: CartReducer.cartData,
        status: CartReducer.status,
        updatedCartData: CartReducer.updatedCartData,
        deleteItemCartData: CartReducer.deleteItemCartData,
    };
}
const mapDispatchToProps = (dispatch) => {
    return {
        getCartData: (obj) => {
            dispatch(getCart(obj))
        },
        getUpdatedCartData: (obj) => {
            dispatch(getUpdatedCart(obj))
        },
        getDeleteItemCartData: (obj) => {
            dispatch(getDeleteItemCart(obj))
        },
        removeOutOfStock: (obj) => {
            dispatch(removeItemsOutOfStock(obj))
        },
        // updateNetworkLost: () => {
        //     dispatch(networkLost());
        // },
        // updateNetworkAvailable: () => {
        //     dispatch(networkAvailable());
        // },
    };

};

export default connect(mapStateToProps, mapDispatchToProps)(Cart);