
import React, { Component } from 'react';
import { Modal, ImageBackground, Alert, Text, View, Image, ScrollView, ActivityIndicator, FlatList, TouchableOpacity, Platform } from 'react-native';
import { scale, verticalScale } from '../../utils/Scale';
import { Dimensions } from 'react-native';
const { height, width } = Dimensions.get('window');
import MaterialIcons from "react-native-vector-icons/MaterialCommunityIcons";
import HeaderComm from '../../common/header/header';
import { getProductDetailData, changeSwiperIndex, clearProductDetail } from '../../actions/ProductListAction';
import { connect } from 'react-redux';
import I18n from '../../localization/index';
import styles from './Style';
import Util from '../../utils/Util';
import Footer from '../../common/footer';
import COMMONSTYLE from '../../utils/Style';
import * as COLORS from '../../utils/Color';
import { getSizeGuide } from '../../actions/HelpCenterAction';
import stylesH from '../Help/StyleH';
import Ionicons from "react-native-vector-icons/FontAwesome";
import showToast from '../../helper/Toast';
import { addToWishListProduct, removeToWishListProduct } from '../../actions/CommonAction';
import * as MESSAGE from '../../utils/Message';
import { addToCart, getCart, guestUserData, guestUserAddToCart } from '../../actions/CartAction';
import Share from 'react-native-share';
import CustomAlert from '../../helper/CustomAlert';
import Video from 'react-native-video-controls';
import RNFS from 'react-native-fs';
import Swiper from 'react-native-swiper';

var that;
let currency = '';
let url_key = '';

let selectedColor = '';
let selectedSize = '';
let zoomImagesLength = 0;
let selectedCupSize = '';
let selectedImages = '';
let inStock = '';
let qty = '';
let thumbnailImagesList = [];
let mediaVideoUrl = [];

const url = 'https://storage.googleapis.com/nay/images/product/lg/sp19/nay-sp19-bop-cotton-bikini-212449352-2857.jpg?scale.width=400';

class ProductDetail extends Component {

    constructor(props) {
        super(props);
        that = this;
        this.state = {
            quantity: 0,
            productDetailData: {},
            noDataMessage: null,
            currentCountryData: {},
            sizeGuideData: {},
            showSizeCard: false,
            bra: false,
            main: true,
            nightwear: false,
            panty: false,
            slippers: false,
            productSize: '',
            productCupSize: '',
            productColorType: '',
            showMoreLessFlag: false,
            favouriteFlag: false,
            addToWishListData: {},
            removeToWishListData: {},
            removeToWishFlag: false,
            addToWishFlag: false,
            productBandSize: '',
            color: '',
            cartCount: 0,
            activityIndicator: true,
            selectedImages: '',
            inStock: 0,
            qty: '',
            showAlert: false,
            mediaVideoUrl: '',
            quote_id: null,
            store_id: null,
            guestUserQuoteId: null,
            lang_code: null,
            activeSimpleProducts: {},
            activeSize: {},
            firstVisitorFlag: false,
            isColorSelected: false,
            currentIndex: 0,
            scrollUpFlag: true,
            scrollDownFlag: false,
            showMandatory: false,
            swiperChagne: true,
            showSelectSize: false,
            checkColorClick: false,
            addToBagActivityIndicator: true,
        }
    }

    componentDidUpdate(prevProps) {
        const prevParam = prevProps.navigation.state.params
        const currentParam = this.props.navigation.state.params
        if (JSON.stringify(prevParam) != JSON.stringify(currentParam)) {
            this.setState({ productDetailData: {}, noDataMessage: null })
            const lastProps = this.props.navigation.state.params;
            url_key = lastProps.objectData.url_key;
            var obj = 'store_id=' + lastProps.objectData.store + '&url_key=' + lastProps.objectData.url_key;
            setTimeout(() => {
                this.props.getProductDetail(obj);
            }, 100);

        }
    }

    showMoreLess() {
        this.setState({ showMoreLessFlag: !this.state.showMoreLessFlag })
    }

    changeLang = (lang) => {
        Util.getAsyncStorage('ALL_COUNTRY_AND_LANGUAGE').then((data) => {
            Util.getAsyncStorage('SELECTED_COUNTRY_LANGUAGE').then((select) => {
                for (var i in data.data) {
                    if (data.data[i].country == select.country && data.data[i].language == lang) {
                        Util.setAsyncStorage('SELECTED_COUNTRY_LANGUAGE', data.data[i]);
                        this.getProductDetailByLangaugeData();
                        var obj = 'store_id=' + data.data[i].store_id
                        this.props.getSizeGuideData(obj);
                    }
                }
            });
        });

    }

    getProductDetailByLangaugeData() {
        let lastProps = this.props.navigation.state.params;
        Util.getAsyncStorage('SELECTED_COUNTRY_LANGUAGE').then((language) => {
            lastProps.objectData.store = parseInt(language.store_id)
            this.setState({ productDetailData: {}, noDataMessage: null })
            url_key = lastProps.objectData.url_key;
            var obj = 'store_id=' + lastProps.objectData.store + '&url_key=' + lastProps.objectData.url_key;
            setTimeout(() => {
                this.props.getProductDetail(obj);
            }, 100);
        });
    }


    componentDidMount() {
    }

    componentWillMount() {
        this.setState({ activityIndicator: false });
        Util.getAsyncStorage('SIGN_IN_DATA').then((data) => {
            if (data !== null) {
                Util.getAsyncStorage('S_quote_id_digit').then((Sdata) => {
                    //var obj = { quote_id: Sdata, store_id: this.state.storeId };
                    //this.setState({ quoteId: Sdata, activityIndicator: false });
                    //this.props.getCartData(obj);
                    this.setState({ quote_id: Sdata })
                    //Util.setAsyncStorage('quote_id', data.quote_id);
                });
            } else {
                var obj = {};
                Util.getAsyncStorage('G_quote_id').then((Gdata) => {
                    if (Gdata !== null) {
                        this.setState({ guestUserQuoteId: Gdata });
                    } else {
                        this.props.guestUserCart(obj);
                    }
                });
            }
        });
        Util.getAsyncStorage('SELECTED_COUNTRY_LANGUAGE').then((language) => {
            if (language !== null) {
                this.setState({ store_id: language.store_id, lang_code: language.code })
            }
        });
        const lastProps = this.props.navigation.state.params;
        this.setState({ productDetailData: {}, noDataMessage: null })
        var objForDetail = 'store_id=' + lastProps.objectData.store + '&url_key=' + lastProps.objectData.url_key;
        setTimeout(() => {
            this.props.getProductDetail(objForDetail);
        }, 200);
        var obj = 'store_id=' + lastProps.objectData.store
        url_key = lastProps.objectData.url_key;
        setTimeout(() => {
            if (Object.keys(this.state.productDetailData).length > 0) {
                this.props.getSizeGuideData(obj);
            }
        }, 2000);
    }


    componentWillReceiveProps(nextprops) {
        const { quote_id, store_id, activityIndicator } = this.state;
        //this.setState({ activityIndicator: true });
        if (nextprops.guestUserStatus === 'GUEST_USER_SUCCESS') {
            this.setState({ guestUserQuoteId: nextprops.guestUserQuoteIdData, activityIndicator: true });
            Util.setAsyncStorage('G_quote_id', nextprops.guestUserQuoteIdData);
        }
        if (nextprops.guestUserAddToCartStatus === 'GUEST_USER_ADD_TO_CART_DATA_SUCCESS') {
            //Util.removeAsyncstorage('G_quote_id').then((data) => {});
            this.setState({ 
                activityIndicator: true,
                productCupSize: '',
                productBandSize: '',
                activeSize: {}, });
            Util.setAsyncStorage('G_quote_id_digit', nextprops.guestUserAddToCartData.quote_id);
            var obj = { quote_id: nextprops.guestUserAddToCartData.quote_id, store_id: this.state.store_id };
            this.props.getCartData(obj);
            showToast('Item Added To Cart', true);
        } else if (nextprops.guestUserAddToCartStatus === 'GUEST_USER_ADD_TO_CART_DATA_FAILED') {
            this.setState({ activityIndicator: true });
            Util.removeAsyncstorage('G_quote_id').then((data) => { });
            var obj = {};
            this.props.guestUserCart(obj);
            showToast('Please Try Again', true);
        }
        //this.setState({ productDetailData: {}, noDataMessage: null });
        if (nextprops.status === 'PRODUCTDETAIL_DATA_SUCCESS') {
            this.setState({ activityIndicator: true, quantity: nextprops.productDetailData.product[0].breadcrumb.url_key !== 'beauty' ? 0 : 1 });
            //this.setState({ productDetailData: {} });
            this.setState({ productDetailData: nextprops.productDetailData, noDataMessage: null }, () => { this.checkForImageClick(nextprops.productDetailData.product[0]) });
            //this.props.clearProductDetailData();
        } else if (nextprops.status === 'PRODUCTDETAIL_DATA_FAILED') {
            this.setState({ activityIndicator: true });
            this.setState({ noDataMessage: MESSAGE.NO_DATA_AVAILABLE })
        }

        if (this.state.addToWishFlag) {
            this.setState({ activityIndicator: true });
            this.getProductDetailByLangaugeData();
            setTimeout(() => {
                this.setState({ addToWishFlag: false });
            }, 100);
        }

        if (this.state.removeToWishFlag) {
            this.setState({ activityIndicator: true });
            this.getProductDetailByLangaugeData();
            setTimeout(() => {
                this.setState({ removeToWishFlag: false });
            }, 100);

        }

        if (Object.keys(nextprops.sizeGuideData).length > 0) {
            this.setState({ activityIndicator: true });
            this.setState({ sizeGuideData: nextprops.sizeGuideData })
        }
        if (Object.keys(nextprops.currentCountryData).length > 0) {
            this.setState({ activityIndicator: true });
            Util.getAsyncStorage('SELECTED_COUNTRY_LANGUAGE').then((language) => {
                if (JSON.stringify(nextprops.currentCountryData) != JSON.stringify(language)) {
                    if (nextprops.currentCountryData.language === language.language) {
                        Util.setAsyncStorage('SELECTED_COUNTRY_LANGUAGE', nextprops.currentCountryData);
                        this.setState({ productDetailData: {}, noDataMessage: null });
                        setTimeout(() => {
                            this.getProductDetailByLangaugeData();
                        }, 100);
                    }

                }
            });
        }
        //if (nextprops.cartData.status) {
        if (nextprops.addToCartDataStatus === 'ADD_TO_CART_DATA_SUCCESS') {
            //this.setState({ activityIndicator: true });
            // if(nextprops.cartData.code === 200) {

            // } else {
            //     this.setState({ cartCount: snextprops.cartData.data.cart_count });
            //     showToast('Item Added To Cart', true);
            // }
            this.setState({ 
                activityIndicator: true,
                productCupSize: '',
                productBandSize: '',
                activeSize: {}, });
            var obj = { quote_id: quote_id, store_id: store_id };
            this.props.getCartData(obj);
            showToast('Item Added To Cart', true);
        } else if (nextprops.addToCartDataStatus === 'ADD_TO_CART_DATA_FAILED') {
            this.setState({ activityIndicator: true });
            //showToast('Please Try Again', true);
            showToast(nextprops.addToCartDataLatest, true);
        }

        if (nextprops.cartDataStatus === 'CART_DATA_SUCCESS') {
            this.setState({ activityIndicator: true, addToBagActivityIndicator: true });
            if (nextprops.cartData.message !== 'No Products in cart') {
                this.setState({ cartCount: nextprops.cartData.data.cart_count });
            } else {
                this.setState({ cartCount: 0 });
            }
        } else if (nextprops.cartDataStatus === 'CART_DATA_FAILED') {
            this.setState({ activityIndicator: true, addToBagActivityIndicator: true });
            if (nextprops.cartData.code === 400) {
                Util.setAsyncStorage('G_quote_id_digit', nextprops.cartData.new_quote_id);
                Util.setAsyncStorage('S_quote_id_digit', nextprops.cartData.new_quote_id);
            }
        }
        //}
        if (nextprops.status === 'CHANGE_SWIPER_INDEX') {
            if (nextprops.swiperIndex) {
                this.setState({ currentIndex: nextprops.swiperIndex, swiperChagne: true });
            }
        }
    }

    checkForImageClickOnPDP(item) {
        const { productDetailData } = this.state;
        var temp = productDetailData;
        //console.log('this is temp.product', temp.product[0].imageUrl);
        //this.setState({ productDetailData.product[0].imageUrl: itemAssign.simple_image[0] })
        temp.product[0].imageUrl = item.simple_image[0];
        this.setState({ productDetailData: temp });
    }

    checkForImageClick(item) {
        //console.log('this is lastporps', this.props.navigation);
        const { objectData } = this.props.navigation.state.params;
        const { productDetailData } = this.state;
        //console.log('this is simeple products', item);
        //console.log('this is ansaf foa f', 'color' in objectData);
        if ('color' in this.props.navigation.state.params) {
            var similarProductsList = item.simpleproducts;

            var tempObj = {};
            for (var i in similarProductsList) {
                if (tempObj[similarProductsList[i].color["text"]]) {
                    tempObj[similarProductsList[i].color["text"]].push(similarProductsList[i]);
                } else {
                    tempObj[similarProductsList[i].color["text"]] = [];
                    tempObj[similarProductsList[i].color["text"]].push(similarProductsList[i]);
                }
            }
            function splitValue(n, s) { return n ? n.substring(0, s) + "," + n.substring(s) : "" }

            var filteredSimpleProducts = [];
            for (var i in tempObj) {
                var obj = {};
                obj.key = i;
                for (var j in tempObj[i]) {
                    for (var k in tempObj[i][j]) {
                        if (obj[k]) {
                            obj[k].push(tempObj[i][j][k])
                        } else {
                            obj[k] = [];
                            obj[k].push(tempObj[i][j][k])
                        }
                    }
                }
                filteredSimpleProducts.push(obj);
            }

            const { color } = this.props.navigation.state.params;
            //console.log('this is colorItem colorItem', color);
            //console.log('this is ', filteredSimpleProducts);
            var itemAssign = filteredSimpleProducts.filter(function (item) {
                return item.key === color;
            });

            //console.log('this is itemAssign', itemAssign);
            var temp = productDetailData;
            //console.log('this is temp.product', temp.product[0].imageUrl);
            //this.setState({ productDetailData.product[0].imageUrl: itemAssign.simple_image[0] })
            temp.product[0].imageUrl = itemAssign[0].simple_image[0];

            this.setState({ productDetailData: temp });

            //console.log('this is filteredSimpleProducts filteredSimpleProducts', temp);
        }
    }

    addQuantity(qty) {
        if (that.state.quantity + 1 <= qty) {
            that.setState({ quantity: (that.state.quantity + 1) })
        } else {
            showToast('You can add Maximum ' + qty, true);
            this.setState({ showAlert: true });
        }
    }

    renderCustomAlert() {
        return (
            <CustomAlert okPressed={() => { this.setState({ showAlert: false }); }} text2={I18n.t('alertQtySizeMsg1') + that.state.quantity + I18n.t('alertQtySizeMsg2') + that.state.quantity + I18n.t('alertQtySizeMsg3')} alertType='Qty_Size' />
        )
    }

    renderCustomAlertFroManadatory() {
        return (
            <CustomAlert okPressed={() => { this.setState({ showMandatory: false }); }} text1={MESSAGE.WARNING} text2={MESSAGE.SELECT_MANADATORY} alertType='OK' />
        )
    }

    renderCustomAlertFroSelectSize() {
        return (
            <CustomAlert okPressed={() => { this.setState({ showSelectSize: false }); }} text1={MESSAGE.WARNING} text2={MESSAGE.SELECT_SIZE} alertType='OK' />
        )
    }



    minusQuantity() {
        if (that.state.quantity > 1) {
            that.setState({ quantity: (that.state.quantity - 1) })
        }
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
                } else if (i == 1) {
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

    selectSize(item) {
        this.setState({ activeSize: item, isColorSelected: true, productCupSize: '', quantity: 1, checkColorClick: false });
    }

    selectCupSize(item) {
        if (selectedSize === '') {
            this.setState({ showSelectSize: true })
        } else {
            this.setState({ productSize: item, productCupSize: item, isColorSelected: true });
        }
    }

    selectBandSize(item) {
        this.setState({ productBandSize: item, isColorSelected: true });
    }

    selectColor(item) {
        this.setState({
            selectedImages: item.color[0].primaryimage,
            activeColor: item.key,
            activeSimpleProducts: item,
            firstVisitorFlag: true,
            isColorSelected: false,
            quantity: 0,
            checkColorClick: true,
            productCupSize: '',
            productBandSize: '',
            activeSize: {},
        }, () => { this.checkForImageClickOnPDP(item) });
        selectedSize = '';
    }

    selectImageItem(item, index) {
        if (item.includes('.mp4')) {
            this.setState({ mediaVideoUrl: item });
        } else {
            this.setState({ selectedImages: item, mediaVideoUrl: '', currentIndex: index, swiperChagne: false });
        }
        this.props.changeIndex(index);
    }

    renderColorItem = ({ item }) => {
        const colorurl = item.color[0].url;
        return (
            <View style={{ paddingBottom: 10 }}>
                <TouchableOpacity onPress={this.selectColor.bind(this, item)}>
                    <Image style={[styles.productColorList]} source={{ uri: colorurl }} />
                </TouchableOpacity>
            </View>
        )
    }

    renderSizeItem = ({ item }) => {
        return (
            <View style={{ paddingBottom: 10 }}>
                {item.text !== false ?
                    item.qty !== '0' ?
                        <TouchableOpacity style={[styles.sizeSize, Object.keys(item.text).length >= 5 ? { width: scale(60) } : '',
                        selectedSize == item.text || selectedCupSize == item.text ? { backgroundColor: '#f599bb' } : '']}
                            onPress={this.selectSize.bind(this, item)}>
                            <Text style={styles.itemText4}>{item.text}</Text>
                        </TouchableOpacity>
                        :
                        <View style={[styles.sizeSize, Object.keys(item.text).length >= 5 ? { width: scale(60) } : '',
                        { backgroundColor: '#f4f4f4' }]}>
                            <ImageBackground style={{ width: '100%', height: '100%' }} source={{ uri: 'https://storage.googleapis.com/nay/icons/disabled.png' }} >
                                <Text style={[styles.itemText4, { color: '#666', textAlign: 'center', top: scale(8) }]}>{item.text}</Text>
                            </ImageBackground>
                        </View> : <View />}

            </View>
        )
    }

    renderCupSizeItem = ({ item }) => {
        return (
            <View style={{ paddingBottom: 10 }}>
                {item.qty !== '0' ?
                    <TouchableOpacity style={[styles.sizeSize, Object.keys(item.text).length >= 5 ? { width: scale(60) } : '',
                    selectedSize == item.text || selectedCupSize == item.text ? { backgroundColor: '#f599bb' } : '']} onPress={this.selectCupSize.bind(this, item)}>
                        <Text style={styles.itemText4}>{item.text}</Text>
                    </TouchableOpacity>
                    :
                    <View style={[styles.sizeSize, Object.keys(item.text).length >= 5 ? { width: scale(60) } : '',
                    { backgroundColor: '#f4f4f4', justifyContent: 'center' }]} >
                        <ImageBackground style={{ width: '100%', height: '100%' }} source={{ uri: 'https://storage.googleapis.com/nay/icons/disabled.png' }} >
                            <Text style={[styles.itemText4, { color: '#666', textAlign: 'center', top: scale(8) }]}>{item.text}</Text>
                        </ImageBackground>
                    </View>}

            </View>
        )
    }

    renderProductImageItem = ({ item, index }) => {
        const { currentIndex } = this.state;
        return (
            <View style={{ paddingBottom: 10, }}>
                <TouchableOpacity onPress={() => { this.selectImageItem(item, index); }}>
                    <Image style={[styles.productImagesList, index === currentIndex ? { borderColor: '#f599bb' } : '']} source={{ uri: item }} />
                </TouchableOpacity>
            </View>
        )
    }

    //handling onPress action  
    getListViewItem = (item) => {
        Util.getAsyncStorage('SELECTED_COUNTRY_LANGUAGE').then((language) => {
            Util.getAsyncStorage('SIGN_IN_DATA').then((data) => {
                url_key = item.url_key;
                var obj = 'store_id=' + language.store_id + '&url_key=' + item.url_key;
                this.props.navigation.state.params.objectData.url_key = item.url_key;
                this.setState({ productDetailData: {}, noDataMessage: null, selectedImages: '', mediaVideoUrl: '', activeSize: {} });
                setTimeout(() => {
                    this.props.getProductDetail(obj);
                }, 100);
            });
        });
    }

    _getUnique = (arr, comp) => {
        const unique = arr
            .map(e => e[comp])
            // store the keys of the unique objects
            .map((e, i, final) => final.indexOf(e) === i && i)
            // eliminate the dead keys & store unique objects
            .filter(e => arr[e])
            .map(e => arr[e]);
        return unique;
    };

    openSizeGuide() {
        this.setState({ showSizeCard: true });
    }

    onSelectionTypeChanged(selected) {
        if (selected === 'bra') {
            this.setState({ bra: true, main: false, nightwear: false, panty: false, slippers: false });
        } else if (selected === 'main') {
            this.setState({ bra: false, main: true, nightwear: false, panty: false, slippers: false });
        } else if (selected === 'nightwear') {
            this.setState({ bra: false, main: false, nightwear: true, panty: false, slippers: false });
        } else if (selected === 'panty') {
            this.setState({ bra: false, main: false, nightwear: false, panty: true, slippers: false });
        } else if (selected === 'slippers') {
            this.setState({ bra: false, main: false, nightwear: false, panty: false, slippers: true });
        }

    }

    getUserDetail(product, size, cupSize, quantity, color) {
        //guest user
        const { guestUserQuoteId } = this.state;
        console.log('this is prodcut adsfasdfasdfadsfa', size, cupSize, color);
        if (product.category_desc === 'Bras' && (size !== '' && cupSize !== '')) {
            if (guestUserQuoteId === null) {
                this.addTOCart(product, size, cupSize, quantity, color, guestUserQuoteId);
            } else {
                this.addTOCart(product, size, cupSize, quantity, color, guestUserQuoteId);
            }
        } else if ((product.category_desc !== 'Bras' && size !== '') || product.type === 'simple') {
            if (guestUserQuoteId === null) {
                this.addTOCart(product, size, cupSize, quantity, color, guestUserQuoteId);
            } else {
                this.addTOCart(product, size, cupSize, quantity, color, guestUserQuoteId);
            }
        } else {
            this.setState({ showMandatory: true })
        }
        //user Logged In
        //user signUp at checkout
    }

    addTOCart(product, size, cupSize, quantity, color, guestUserQuoteId) {
        console.log(product, size, cupSize, quantity, color);
        const { quote_id, store_id, lang_code } = this.state;
        var main_quote_id = null;
        let dataConfiguredSimple = [];
        let dataConfigured = [];
        var extension_attributes = {};
        if (quantity === 0) {
            showToast('Please Select Quantity', true);
        } else if (product.type === 'simple') {
            extension_attributes = {};
        } else if (product.type === 'configurable') {
            if (product.category_desc === 'Bras') {
                if (product.simpleproducts.length === 0) {
                    extension_attributes = {};
                } else {
                    if (size && cupSize === '') {
                        Object.keys(product.simpleproducts).map((item, index) => {
                            if (product.simpleproducts[item].color.text === color && product.simpleproducts[item].size.text === size) {
                                dataConfiguredSimple.push(product.simpleproducts[item]);
                            }
                        });
                    } else {
                        if (cupSize === '' || size === '') {
                            showToast('Please Select Band/Cup Size', true);
                        } else if (color === '') {
                            showToast('Please Select Color', true);
                        } else {
                            Object.keys(product.simpleproducts).map((item, index) => {
                                if (product.simpleproducts[item].color.text === color && product.simpleproducts[item].band_size.text === size && product.simpleproducts[item].cup_size.text === cupSize) {
                                    dataConfigured.push(product.simpleproducts[item]);
                                }
                            });
                        }
                    }
                }
            } else {
                if (size === '') {
                    showToast('Please Select Size', true);
                } else if (color === '') {
                    showToast('Please Select Color', true);
                } else {
                    Object.keys(product.simpleproducts).map((item, index) => {
                        if (product.simpleproducts[item].color.text === color && product.simpleproducts[item].size.text === size) {
                            dataConfiguredSimple.push(product.simpleproducts[item]);
                        }
                    });
                }
            }
        }
        if (dataConfiguredSimple.length !== 0) {
            var pcolor = { option_id: dataConfiguredSimple[0].color.option_id, option_value: dataConfiguredSimple[0].color.option_value };
            var psize = { option_id: dataConfiguredSimple[0].size.option_id, option_value: dataConfiguredSimple[0].size.option_value };
            let configurable_item_options = [];
            configurable_item_options.push(pcolor);
            configurable_item_options.push(psize);
            var extension_attributes = { configurable_item_options: configurable_item_options };
        } else if (dataConfigured.length !== 0) {
            var pcolor = { option_id: dataConfigured[0].color.option_id, option_value: dataConfigured[0].color.option_value };
            var cup_size = { option_id: dataConfigured[0].cup_size.option_id, option_value: dataConfigured[0].cup_size.option_value };
            var band_size = { option_id: dataConfigured[0].band_size.option_id, option_value: dataConfigured[0].band_size.option_value };
            let configurable_item_options = [];
            configurable_item_options.push(pcolor);
            configurable_item_options.push(cup_size);
            configurable_item_options.push(band_size);
            var extension_attributes = { configurable_item_options: configurable_item_options };
        }
        //var extension_attributes = { configurable_item_options: configurable_item_options };
        if (dataConfiguredSimple.length !== 0 || dataConfigured.length !== 0 || product.type === 'simple' || product.simpleproducts.length == 0) {
            var product_option = { extension_attributes: extension_attributes };
            // Util.getAsyncStorage('SIGN_IN_DATA').then((data) => {
            //     console.log('this is data', data);
            //     if (data !== null) {
            //         Util.getAsyncStorage('SELECTED_COUNTRY_LANGUAGE').then((language) => {
            if (guestUserQuoteId !== null) {
                main_quote_id = guestUserQuoteId;
            } else {
                main_quote_id = quote_id;
            }
            var cartItem = { product_option: product_option, product_type: product.type, qty: quantity, quote_id: main_quote_id, sku: product.sku };
            var obj = { cart_item: cartItem };
            this.setState({ addToBagActivityIndicator: false });
            if (guestUserQuoteId !== null) {
                this.props.guestUserAddCartData(obj, main_quote_id, lang_code);
            } else {
                this.props.doAddToCart(obj);
            }
            //var obj = { quote_id: main_quote_id, store_id: store_id };
            //this.setState({ activityIndicator: false });
            //this.props.getCartData(obj);
            //         });
            //     }
            // });
        } else {
            showToast('Please Try Again', true);
        }

    }

    addToWishList() {
        Util.getAsyncStorage('SIGN_IN_DATA').then((data) => {
            if (data === null) {
                this.props.navigation.navigate('SignIn', { product_id: this.state.productDetailData.product[0].id });
            } else {
                obj = {
                    customer_id: data.customer_id,
                    product_id: this.state.productDetailData.product[0].id
                }
                this.setState({ addToWishFlag: true })
                this.props.addToWishList(obj);

            }
        });
    }

    removeFromWishList() {
        this.setState({ removeToWishFlag: true })
        obj = {
            wishilistitemid: this.state.productDetailData.product[0].wishlist_itemid
        }
        this.setState({ removeToWishFlag: true })
        this.props.removeToWishList(obj);
    }

    shareOnFacebook() {
        Util.getAsyncStorage('SELECTED_COUNTRY_LANGUAGE').then((select) => {
            const shareOptions = {
                title: 'Share via app',
                message: 'ELC Product',
                url: 'http://nayomijsuat.iksulalive.com/' + select.language + '/products-details/' + url_key,
                social: Share.Social.FACEBOOK
            };
            Share.shareSingle(shareOptions);
        });
    }

    shareOnWhatsapp() {
        Util.getAsyncStorage('SELECTED_COUNTRY_LANGUAGE').then((select) => {
            const shareOptions = {
                title: 'Share via app',
                message: 'ELC Product',
                url: 'http://nayomijsuat.iksulalive.com/' + select.language + '/products-details/' + url_key,
                social: Share.Social.WHATSAPP
            };
            Share.shareSingle(shareOptions);
        });
    }

    openImages(image, thumbnailImages) {
        this.props.navigation.navigate('ImagesScreen', { image: image, thumbnailImages: thumbnailImages });
    }

    renderSizeCard() {
        const { sizeGuideData } = this.state
        return (
            <View>
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={this.state.showCountry}
                    onRequestClose={() => {
                    }}
                >
                    <View style={COMMONSTYLE.content}>
                        <View style={[COMMONSTYLE.container, { backgroundColor: COLORS.BASE_WHITE }]}>
                            <View style={COMMONSTYLE.descriptionBtnContainer}>
                                <View style={[COMMONSTYLE.heading]}>
                                    <View style={{ width: '30%' }}>
                                        <Text style={stylesH.selectCountryText}>{I18n.t('sizeFit')}</Text>
                                    </View>
                                    <View style={{ width: '60%', alignItems: 'center' }}>
                                    </View>
                                    <TouchableOpacity style={{ width: '10%', alignItems: 'center' }}>
                                        <MaterialIcons
                                            name='close-circle-outline'
                                            onPress={() => { this.setState({ showSizeCard: false }) }}
                                            size={scale(25)}
                                        />
                                    </TouchableOpacity>

                                </View>
                                <View style={[stylesH.sizeGuideHeader]}>
                                    <TouchableOpacity style={{ width: '21%', alignItems: 'center' }} onPress={() => { this.onSelectionTypeChanged('main'); }}>
                                        <Text style={[stylesH.headline, (this.state.main ? stylesH.headingTextB : stylesH.headingText)]}>{I18n.t('sizeFit')}</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity style={{ width: '18%', alignItems: 'center' }} onPress={() => { this.onSelectionTypeChanged('bra'); }}>
                                        <Text style={[stylesH.headline, (this.state.bra ? stylesH.headingTextB : stylesH.headingText)]}>{I18n.t('bra')}</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity style={{ width: '18%', alignItems: 'center' }} onPress={() => { this.onSelectionTypeChanged('panty'); }}>
                                        <Text style={[stylesH.headline, (this.state.panty ? stylesH.headingTextB : stylesH.headingText)]}>{I18n.t('panty')}</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity style={{ width: '23%', alignItems: 'center' }} onPress={() => { this.onSelectionTypeChanged('nightwear'); }}>
                                        <Text style={[stylesH.headline, (this.state.nightwear ? stylesH.headingTextB : stylesH.headingText)]}>{I18n.t('nightwear')}</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity style={{ width: '20%', alignItems: 'center' }} onPress={() => { this.onSelectionTypeChanged('slippers'); }}>
                                        <Text style={[stylesH.headline, (this.state.slippers ? stylesH.headingTextB : stylesH.headingText)]}>{I18n.t('slippers')}</Text>
                                    </TouchableOpacity>
                                </View>
                                <View style={{ height: scale(480) }}>
                                    {this.state.main ?
                                        <View>
                                            <ScrollView showsVerticalScrollIndicator={false}>
                                                <View style={[stylesH.sizeFitImageView, { height: scale(465) }]}>
                                                    <Image style={stylesH.sizeFitImage} resizeMode='cover' source={{ uri: sizeGuideData.main }} />
                                                </View>
                                            </ScrollView>
                                        </View> : <View />}
                                    {this.state.bra ?
                                        <View>
                                            <ScrollView showsVerticalScrollIndicator={false}>
                                                <View style={[stylesH.sizeFitImageView, { height: 1100 }]}>
                                                    <Image style={stylesH.sizeFitImage} resizeMode='cover' source={{ uri: sizeGuideData.bra }} />
                                                </View>
                                            </ScrollView>
                                        </View> : <View />}
                                    {this.state.panty ?
                                        <View>
                                            <ScrollView showsVerticalScrollIndicator={false}>
                                                <View style={[stylesH.sizeFitImageView, { height: scale(370) }]}>
                                                    <Image style={stylesH.sizeFitImage} resizeMode='cover' source={{ uri: sizeGuideData.panty }} />
                                                </View>
                                            </ScrollView>
                                        </View> : <View />}

                                    {this.state.nightwear ?
                                        <View>
                                            <ScrollView showsVerticalScrollIndicator={false}>
                                                <View style={[stylesH.sizeFitImageView, { height: scale(190) }]}>
                                                    <Image style={stylesH.sizeFitImage} resizeMode='cover' source={{ uri: sizeGuideData.nightwear }} />
                                                </View>
                                            </ScrollView>
                                        </View> : <View />}

                                    {this.state.slippers ?
                                        <View>
                                            <ScrollView showsVerticalScrollIndicator={false}>
                                                <View style={[stylesH.sizeFitImageView, { height: scale(340) }]}>
                                                    <Image style={stylesH.sizeFitImage} resizeMode='cover' source={{ uri: sizeGuideData.slippers }} />
                                                </View>
                                            </ScrollView>
                                        </View> : <View />}
                                </View>
                            </View>
                        </View>
                    </View>
                </Modal>
            </View>
        )
    }

    downloadVideo(video) {
        let urlPath = [];
        var url = '';
        let sourcePath = '';
        urlPath = video.split('/');
        if (Platform.OS == 'ios') {
            sourcePath = RNFS.CachesDirectoryPath;
        } else {
            sourcePath = RNFS.PicturesDirectoryPath;
        }
        url = sourcePath + '/' + urlPath[urlPath.length - 1];
        RNFS.downloadFile({
            fromUrl: video,
            toFile: url,
            begin: (res) => {
                this.DownloadBeginCallbackResult(res)
            },
            progress: (data) => {
                this.DownloadProgressCallbackResult(data);
            },
            background: true,
            progressDivider: 1,
            background: true,
        }).promise.then((r) => {
            if (r.statusCode == 200) {
                showToast(I18n.t('videoDownloaded'), true);
            }
        });
    }

    DownloadBeginCallbackResult(res) {
        jobId: res.jobId;
        statusCode: res.statusCode;
        contentLength: res.contentLength;
        headers: res.headers;
    };

    DownloadProgressCallbackResult(res) {
        jobId: res.jobId;
        contentLength: res.contentLength;
        bytesWritten: res.bytesWritten;
    };

    scrollMoveTODown(length) {
        this.setState({ scrollDownFlag: true, scrollUpFlag: false })
        this.flatListRef.scrollToIndex({ animated: true, index: length - 1 });
    }

    scrollMoveTOUp() {
        this.setState({ scrollDownFlag: false, scrollUpFlag: true })
        this.flatListRef.scrollToIndex({ animated: true, index: 0 });
    }

    _renderZoomImageItem = (item, index) => {
        return (
            <TouchableOpacity onPress={() => this.openImages(item, this.state.productDetailData.product[0].imageUrl.zoomimage)} style={{ height: scale(450) }}>
                {!item.includes('.mp4') ?
                    <Image style={[{ width: width - scale(90), height: scale(450) }]} source={{ uri: item }} />
                    : <View />}
            </TouchableOpacity>
        )
    }

    checkIfIndex(ind) {
        console.log('this is if swiper change index', ind);
        this.setState({ currentIndex: ind });
    }

    render() {
        const { productDetailData, noDataMessage, productSize, productBandSize, quantity, currentIndex, showMandatory, showSelectSize, swiperChagne, checkColorClick, addToBagActivityIndicator } = this.state;
        const { product } = productDetailData;
        let { activeSize } = this.state;
        let arrColor = [];
        let arrSize = [];
        let newArrColor = [];
        let newArrSize = [];
        let bandSize = [];
        let newBandSize = [];
        let cupSize = [];
        let newCupSize = [];
        let simpleimage = [];
        let newArrimg = [];
        selectedColor = '';
        selectedSize = '';
        selectedBandSize = '';
        selectedCupSize = '';
        selectedImages = '';
        inStock = '';
        exclude_international = null;
        qty = '';
        currentIndexSwiper = 0;
        currentIndexSwiper = currentIndex === 0 ? 0 : currentIndex;
        mediaVideoUrl = '';
        if (Object.keys(productDetailData).length > 0) {
            //console.log(product[0]);
            currency = product[0].currency;
            if (this.state.selectedImages !== '') {
                selectedImages = this.state.selectedImages;
                product[0].imageUrl.zoomimage[currentIndexSwiper] = selectedImages;
                // console.log('this is selectedimage', selectedImages);
                // console.log('this is at the time of change', product[0].imageUrl.zoomimage);
                // console.log('this is currentIndexSwiper = currentIndex === 0 ? 0 : currentIndex;', currentIndexSwiper)
            } else {
                //console.log('this is fsdfa', product[0].imageUrl.zoomimage[0]);
                if (product[0].imageUrl.zoomimage !== undefined) {
                    selectedImages = product[0].imageUrl.zoomimage[0];
                }
            }
            //

            Object.keys(product[0].simpleproducts).map((item, index) => {
                if (product[0].category_desc == 'Bras' || product[0].category_desc == 'صدريات') {
                    if (product[0].simpleproducts[item].band_size) {
                        product[0].simpleproducts[item].band_size.qty = product[0].simpleproducts[item].qty;
                        product[0].simpleproducts[item].band_size.stockstatus = product[0].simpleproducts[item].stockstatus
                        if (product[0].simpleproducts[item].size) {
                            product[0].simpleproducts[item].size.qty = product[0].simpleproducts[item].qty;
                            product[0].simpleproducts[item].size.stockstatus = product[0].simpleproducts[item].stockstatus;
                        }

                    } else {
                        product[0].simpleproducts[item].size.qty = product[0].simpleproducts[item].qty;
                        product[0].simpleproducts[item].size.stockstatus = product[0].simpleproducts[item].stockstatus;
                    }
                } else {
                    product[0].simpleproducts[item].size.qty = product[0].simpleproducts[item].qty;
                    product[0].simpleproducts[item].size.stockstatus = product[0].simpleproducts[item].stockstatus
                }
            });

            var similarProductsList = product[0].simpleproducts;

            var tempObj = {};
            for (var i in similarProductsList) {
                if (tempObj[similarProductsList[i].color["text"]]) {
                    tempObj[similarProductsList[i].color["text"]].push(similarProductsList[i]);
                } else {
                    tempObj[similarProductsList[i].color["text"]] = [];
                    tempObj[similarProductsList[i].color["text"]].push(similarProductsList[i]);
                }
            }
            function splitValue(n, s) { return n ? n.substring(0, s) + "," + n.substring(s) : "" }

            var filteredSimpleProducts = [];
            for (var i in tempObj) {
                var obj = {};
                obj.key = i;
                for (var j in tempObj[i]) {
                    for (var k in tempObj[i][j]) {
                        if (obj[k]) {
                            obj[k].push(tempObj[i][j][k])
                        } else {
                            obj[k] = [];
                            obj[k].push(tempObj[i][j][k])
                        }
                    }
                }
                filteredSimpleProducts.push(obj);
            }
            var t = [];
            var isbandSizeAvil = false;
            for (var i in filteredSimpleProducts) {
                for (var j in filteredSimpleProducts[i]) {
                    if (j == "size") {
                        filteredSimpleProducts[i][j] = this._getUnique(filteredSimpleProducts[i][j], "text");
                    }
                    if (j == "band_size") {
                        filteredSimpleProducts[i][j] = this._getUnique(filteredSimpleProducts[i][j], "text");
                        // var bandSize1 = filteredSimpleProducts[i][j];
                        isbandSizeAvil = true;
                    }
                    if (j == "cup_size") {
                        t = filteredSimpleProducts[i][j];
                    }
                }
            }
            var menuObject = {};
            menuObject.size = [];
            menuObject.cup_size = [];
            var activeSmpProducts = product[0].category_desc !== "Beauty" || product[0].category_desc !== "تشكيلة بيوتي"  ? JSON.parse(JSON.stringify(this.state.activeSimpleProducts)) : {};
            selectedColor = product[0].category_desc !== "Beauty" && product[0].category_desc !== "تشكيلة بيوتي" ? this.state.activeSimpleProducts.key : '';
            exclude_international = product[0].exclude_international;
            console.log('this is exclude_international', exclude_international);
            if (!this.state.firstVisitorFlag && product[0].category_desc !== "Beauty" && product[0].category_desc !== "تشكيلة بيوتي" ) {
                activeSmpProducts = JSON.parse(JSON.stringify(filteredSimpleProducts[0]));
                selectedColor = activeSmpProducts.key;
            }
            if (activeSmpProducts && activeSmpProducts.size) {
                menuObject.size = JSON.parse(JSON.stringify(activeSmpProducts.size));
                menuObject.size = menuObject.size.filter(function (d) {
                    if (isbandSizeAvil) {
                        d.text = splitValue(d.text, 5).split(",")[0];
                    }
                    return d.text !== "";
                });
                menuObject.size = this._getUnique(menuObject.size, "text");
                if (this.state.activeSize.text) {
                    selectedSize = checkColorClick ? '' : this.state.activeSize.text;
                    inStock = this.state.activeSize.qty;
                } else {
                    //selectedSize = menuObject.size[0].text;
                    inStock = menuObject.size[0].qty;
                }
                if (product[0].category_desc == 'Bras' || product[0].category_desc == 'صدريات') {
                    var bd = [];
                    if (activeSmpProducts.band_size)
                        bd = JSON.parse(JSON.stringify(activeSmpProducts.band_size));
                    var flag = false;
                    for (var i in bd) {
                        if (bd[i].text != false) {
                            flag = true;
                        }
                    }
                    if (flag && activeSmpProducts.band_size) {
                        menuObject.size = JSON.parse(JSON.stringify(activeSmpProducts.band_size));
                    }

                    if (!this.state.firstVisitorFlag && !activeSize.text) {
                        activeSize = JSON.parse(JSON.stringify(menuObject.size[0]));
                    }
                }
            }
            if (activeSize && activeSmpProducts.size) {
                var f = activeSmpProducts.size.filter(function (d) {
                    if (activeSize.text && d.text) {
                        return d.text.includes(activeSize.text);
                    } else
                        return false;
                });
                var arr = [];
                f.forEach(function (d) {
                    var s = splitValue(d.text, 5).split(",")[1];
                    if (t) {
                        var m = t.filter(function (c) {
                            return c.text == s;
                        });

                        if (m && m[0]) {
                            if (d.qty) {
                                m[0].qty = d.qty;
                            }
                            arr.push(m[0]);
                        }
                    }
                });
                menuObject.cup_size = arr;
            }
            //
            if (product[0].offers.status == 1) {
                var arr = [];
                for (var i in product[0].offers.data) {
                    if (i != 1 && arr.length < 2) {
                        var data = {}
                        data[i] = product[0].offers.data[i];
                        arr.push(data);
                    } else if (i == 1) {
                        firstOffer = product[0].offers.data[i];
                        product[0].firstOffer = firstOffer;
                    }
                }
                product[0].offerList = arr;
            }
            //

            if (product[0].mediaVideoUrl[0] && mediaVideoUrl == '') {
                mediaVideoUrl = product[0].mediaVideoUrl[0];
            }

            if (product[0].simpleproducts.length == 0) {
                qty = product[0].simpleqty;
            }
            if (product[0].imageUrl.zoomimage !== undefined && (product[0].imageUrl.zoomimage.length > 0)) {
                var imageZoomArray = [];
                for (var i in product[0].imageUrl.zoomimage) {
                    if (!product[0].imageUrl.zoomimage[i].includes('.mp4')) {
                        imageZoomArray.push(product[0].imageUrl.zoomimage[i]);
                    }
                }
                zoomImagesLength = imageZoomArray.length;
            }
            product[0].imageUrl.zoomimage = imageZoomArray;
            thumbnailImagesList = product[0].imageUrl.zoomimage;
            Object.keys(product[0].simpleproducts).map((item, index) => {

                arrColor.push(product[0].simpleproducts[item].color);
                arrSize.push(product[0].simpleproducts[item].size);
                if (product[0].simpleproducts[item].band_size) {
                    bandSize.push(product[0].simpleproducts[item].band_size);
                } else {
                    arrSize.push(product[0].simpleproducts[item].size);
                }
                if (product[0].simpleproducts[item].cup_size) {
                    cupSize.push(product[0].simpleproducts[item].cup_size);
                }

                newArrColor = this._getUnique(arrColor, 'text');
                var obj = {};
                if ('primaryimage' in product[0].simpleproducts[item].simple_image) {
                    if (product[0].simpleproducts[item].simple_image.primaryimage[0] !== '') {
                        obj.primaryimage = product[0].simpleproducts[item].simple_image.primaryimage[0];
                        simpleimage.push(obj);
                        newArrimg = this._getUnique(simpleimage, 'primaryimage')

                        newArrColor.forEach(function (d, i) {
                            d.primaryimage = newArrimg.length <= i ? newArrimg[newArrimg.length - 1].primaryimage : newArrimg[i].primaryimage;
                        })
                    }
                }
            });

            if ((product[0].category_desc == 'Bras' || product[0].category_desc == 'صدريات') && (bandSize.length > 0 || cupSize.length > 0)) {
                newBandSize = this._getUnique(bandSize, 'text');
                newCupSize = this._getUnique(cupSize, 'text');
                if (I18n.locale == 'ar') {
                    newBandSize = newBandSize.reverse();
                    newCupSize = newCupSize.reverse();
                }
                if (Object.keys(this.state.productCupSize).length > 0) {
                    selectedCupSize = this.state.productCupSize.text;
                } else {
                    // if(newCupSize.length > 0){
                    //     selectedCupSize = newCupSize[0].text;
                    // }
                }
                if (Object.keys(this.state.productBandSize).length > 0) {
                    selectedBandSize = this.state.productBandSize.text;
                    qty = this.state.productBandSize.qty;
                } else {
                    if (newBandSize.length > 0) {
                        selectedBandSize = newBandSize[0].text;
                        qty = newBandSize[0].qty;
                    }
                }
            } else {
                newArrSize = this._getUnique(arrSize, 'text');
                if (I18n.locale == 'ar') {
                    newArrSize = newArrSize.reverse();
                }

                if (Object.keys(this.state.productSize).length > 0) {
                    qty = this.state.productSize.qty;
                } else {
                    if (newArrSize.length > 0) {
                        qty = newArrSize[0].qty;
                    }
                }

            }
        }

        return (
            <View style={styles.container}>
                <HeaderComm changeLang={this.changeLang} navigation={this.props.navigation} onRef={instance => { this.instance = instance; }} classObj={this} {...this.props}/>
                {addToBagActivityIndicator ? 
                <>{this.state.activityIndicator ?
                    (!noDataMessage ? (Object.keys(productDetailData).length > 0 ?
                        <View style={{ flex: 1 }}>
                            <ScrollView showsVerticalScrollIndicator={false}>
                                <View style={{ paddingHorizontal: scale(10), alignItems: 'center', paddingTop: scale(20) }}>

                                    <View style={[I18n.locale == 'en' && { flexDirection: 'row' }, I18n.locale == 'ar' && { flexDirection: 'row-reverse', right: 70 }]}>
                                        <View style={this.state.mediaVideoUrl !== '' ? { right: scale(12) } : { left: scale(20) }}>
                                            <View style={[I18n.locale == 'en' && { flexDirection: 'row' }, I18n.locale == 'ar' && { flexDirection: 'row-reverse', left: scale(35) }]}>

                                                {product[0].imageUrl.zoomimage !== undefined && product[0].imageUrl.zoomimage.length > 1 ?
                                                    <View style={[I18n.locale == 'en' && { flexDirection: 'column', height: scale(450) }, I18n.locale == 'ar' && { right: 30, height: scale(450) }]}>
                                                        <View style={{ maxHeight: scale(350), minHeight: scale(50) }}>
                                                            {this.state.scrollDownFlag ?
                                                                <TouchableOpacity onPress={() => this.scrollMoveTOUp()}>
                                                                    <Image style={[styles.scrollImage]} source={require('../../assets/productDetailIcon/up-arrow.png')} />
                                                                </TouchableOpacity> : <View />}
                                                            <FlatList
                                                                data={product[0].imageUrl.zoomimage}
                                                                ref={(ref) => { this.flatListRef = ref; }}
                                                                renderItem={this.renderProductImageItem}
                                                                ItemSeparatorComponent={this.renderSeparator}
                                                                //style={I18n.locale == 'ar' ? { flexDirection: 'row-reverse' } : ''}
                                                                showsVerticalScrollIndicator={false}
                                                                keyExtractor={(item, index) => index.toString()}
                                                            />

                                                        </View>
                                                        {mediaVideoUrl !== '' ?
                                                            <TouchableOpacity onPress={() => { this.selectImageItem(mediaVideoUrl, 1); }}>
                                                                <Image style={[styles.productImagesList]} source={{ uri: thumbnailImagesList[0] }} />
                                                                <Image style={[styles.playImage, {}]} source={require('../../assets/productDetailIcon/play-button.png')} />
                                                            </TouchableOpacity>
                                                            : <View />}
                                                        {product[0].imageUrl.zoomimage !== undefined && product[0].imageUrl.zoomimage.length > 4 && this.state.scrollUpFlag ?
                                                            <TouchableOpacity onPress={() => this.scrollMoveTODown(product[0].imageUrl.zoomimage.length)}>
                                                                <Image style={[styles.scrollImage]} source={require('../../assets/productDetailIcon/down-arrow.png')} />
                                                            </TouchableOpacity> : <View />}
                                                    </View> : <View />
                                                }

                                                {this.state.mediaVideoUrl !== '' ?
                                                    <View style={{ left: 10 }}>
                                                        <Video source={{ uri: this.state.mediaVideoUrl }}   // Can be a URL or a local file.
                                                            ref={(ref) => {
                                                                this.player = ref
                                                            }}                                      // Store reference
                                                            onBuffer={this.onBuffer}                // Callback when remote video is buffering
                                                            onError={this.videoError}
                                                            autoplay={true}
                                                            fullscreen={true}
                                                            repeat={true}         // Callback when video cannot be loaded
                                                            style={{ width: scale(290), height: scale(450) }}
                                                            onEnterFullscreen={() => this.openImages(this.state.mediaVideoUrl, product[0].imageUrl.zoomimage)}
                                                        />
                                                        {/* <TouchableOpacity style={{ zIndex: 999, opacity: 1, position: 'absolute', left: scale(70), bottom: scale(15) }} onPress={() => this.downloadVideo(this.state.mediaVideoUrl)}>
                                                            <Image style={[styles.downlaodImage]} source={require('../../assets/productDetailIcon/download.png')} />
                                                        </TouchableOpacity> */}
                                                    </View> :
                                                    selectedImages !== '' && product[0].imageUrl.zoomimage !== undefined ?
                                                        <View style={{ height: '100%', width: '100%' }}>
                                                            {/* <Image style={[styles.mainImageSize, product[0].imageUrl.thumbnail.length == 1 ? {width: width- scale(20), height: scale(500), left:0}:'' ]} source={{ uri: selectedImages }} /> */}
                                                            {product[0].imageUrl.zoomimage !== undefined && <Swiper style={{ height: scale(450), left: I18n.locale == 'ar' ? scale(115) : scale(15) }}
                                                                autoplay={false}
                                                                showsPagination={false}
                                                                index={currentIndexSwiper}
                                                                onIndexChanged={(i) => { this.checkIfIndex(i); }}>
                                                                {(product[0].imageUrl.zoomimage).map(this._renderZoomImageItem)}
                                                            </Swiper>}
                                                        </View> :
                                                        <View style={{ height: scale(450), left: I18n.locale == 'ar' ? scale(115) : scale(15) }} >
                                                            <Text style={[styles.mainImageSize, { marginTop: scale(250) }]}>{I18n.t('imagePreviewNotAvailable')}</Text>
                                                        </View>
                                                }
                                            </View>
                                        </View>

                                        {!product[0].is_in_wishlist && this.state.mediaVideoUrl === '' ?
                                            <View style={[styles.onImageView, I18n.locale == 'ar' ? { right: 110 } : '']}>
                                                <TouchableOpacity onPress={() => this.addToWishList()}>
                                                    <Image style={[styles.favouriteImage]} source={require('../../assets/productDetailIcon/favorite-heart.png')} />
                                                </TouchableOpacity>
                                            </View> : <View />}
                                        {product[0].is_in_wishlist && this.state.mediaVideoUrl === '' ?
                                            <View style={[styles.onImageView, I18n.locale == 'ar' ? { right: 110 } : '']}>
                                                <TouchableOpacity onPress={() => this.removeFromWishList()}>
                                                    <Image style={[styles.favouriteImage, { tintColor: '#f5a0c0' }]} source={require('../../assets/productDetailIcon/favorite-heart.png')} />
                                                </TouchableOpacity>
                                            </View> : <View />}
                                    </View>

                                    <View style={{ flexDirection: 'row', left: scale(100), top: scale(20) }}>
                                        <TouchableOpacity style={{ backgroundColor: COLORS.BRAND, right: 10, borderWidth: 1, borderColor: COLORS.BRAND, borderRadius: scale(3) }} onPress={() => this.shareOnFacebook()}>
                                            <MaterialIcons
                                                name={"facebook"}
                                                color={"#fff"}
                                                size={scale(40)}
                                            />
                                        </TouchableOpacity>

                                        <TouchableOpacity style={{ backgroundColor: COLORS.BRAND, borderWidth: 1, borderColor: COLORS.BRAND, borderRadius: scale(3) }} onPress={() => this.shareOnWhatsapp()}>
                                            <MaterialIcons
                                                name={"whatsapp"}
                                                color={"#fff"}
                                                size={scale(40)}
                                            />
                                        </TouchableOpacity>
                                    </View>
                                    <View style={{ padding: scale(15) }}>
                                        <View style={{ flexDirection: 'row' }}>
                                            <Text style={[styles.itemTextDetail]}>{product[0].name}</Text>
                                        </View>
                                        <View style={{ flexDirection: 'row' }}>
                                            <Text style={styles.itemTextFirst}>{product[0].collection_desc}</Text>
                                        </View>
                                        <View style={{ flexDirection: 'row' }}>
                                            <Text style={[styles.itemTextSecond]}>{I18n.t('productCode')} :
                                                <Text style={{ color: '#f5a0c0' }}>{product[0].sku}</Text>
                                            </Text>
                                        </View>
                                        {/* <Text>&#8729;</Text> */}
                                        {!this.state.showMoreLessFlag && product[0].description.length >= 200 ?
                                            <View style={{ flexDirection: "row", justifyContent: 'space-between' }}>
                                                <Text style={styles.itemTextThired}>{product[0].description.substring(0, 200)}...
                                            <Text style={[styles.itemTextThired, { color: '#f5a0c0' }]} onPress={() => this.showMoreLess()}>
                                                        {I18n.t('readMore')}
                                                    </Text>
                                                </Text>
                                            </View> : <View />}

                                        {this.state.showMoreLessFlag ?
                                            <View style={{ flexDirection: "row", justifyContent: 'space-between' }}>
                                                <Text style={styles.itemTextThired}>{product[0].description}
                                                    <Text style={[styles.itemTextThired, { color: '#f5a0c0' }]} onPress={() => this.showMoreLess()}>
                                                        {I18n.t('readLess')}
                                                    </Text>
                                                </Text>
                                            </View> : <View />}

                                        {product[0].description.length < 200 ?
                                            <View style={{ flexDirection: "row", justifyContent: 'space-between' }}>
                                                <Text style={styles.itemTextThired}>{product[0].description.substring(0, 500)}</Text>
                                            </View> : <View />}
                                        <View style={{ flexDirection: "row", justifyContent: 'space-between', paddingTop: scale(5) }}>
                                        </View>


                                        {product[0].offers.status === 1 && product[0].firstOffer ?
                                            <View>
                                                <View style={{ paddingTop: 5, flexDirection: 'row' }}>
                                                    <Text style={{ textDecorationLine: 'line-through', color: 'black' }}>{product[0].currency}&nbsp; {product[0].price}</Text>
                                                </View>

                                                <View style={[styles.productDetailSize]}>
                                                    <Text style={styles.amountText}>{product[0].currency}&nbsp; {product[0].firstOffer}</Text>
                                                </View>

                                            </View>
                                            : <View />}
                                        {product[0].offers.status === 0 ?
                                            <View style={[styles.productDetailSize]}>
                                                <Text style={[styles.amountText, { color: '#3b3b3b' }]}>{product[0].currency}&nbsp; {product[0].price}</Text>
                                            </View>
                                            : <View />}

                                        {product[0].offers.status === 1 && !product[0].firstOffer ?
                                            <View style={[styles.productDetailSize]}>
                                                <Text style={[styles.amountText, { color: '#3b3b3b' }]}>{product[0].currency}&nbsp; {product[0].price}</Text>
                                            </View>
                                            : <View />}

                                        {/*  */}
                                        {filteredSimpleProducts.length > 0 ?
                                            <View style={[styles.productColor]}>
                                                <View style={{ flexDirection: 'row' }}>
                                                    <Text style={[styles.itemTextSecond]}>{I18n.t('color')}&nbsp;
                                                            <Text style={[styles.itemTextSecond, { fontWeight: '600' }]}>{selectedColor}</Text>
                                                    </Text>
                                                </View>
                                                <View style={{ flexDirection: 'row' }}>
                                                    <FlatList
                                                        data={filteredSimpleProducts}
                                                        renderItem={this.renderColorItem}
                                                        ItemSeparatorComponent={this.renderSeparator}
                                                        numColumns={5}
                                                        //style={I18n.locale == 'ar' ? { flexDirection: 'row-reverse' } : {}}
                                                        keyExtractor={(item, index) => index.toString()}
                                                    />
                                                </View>
                                            </View>
                                            : <View />}


                                        {menuObject.size.length > 0 ?
                                            <View>
                                                <View style={{ flexDirection: 'row' }}>
                                                    {selectedSize.length > 3 && menuObject.cup_size.length > 0 ?

                                                        <Text style={[styles.itemTextSecond]}>{I18n.t('bandSize')} &nbsp;
                                                    <Text style={[styles.itemTextSecond, { fontWeight: '600' }]}>{selectedSize}</Text>
                                                        </Text> :
                                                        <Text style={[styles.itemTextSecond]}>{I18n.t('size')} &nbsp;
                                                    <Text style={[styles.itemTextSecond, { fontWeight: '600' }]}>{selectedSize}</Text>
                                                        </Text>}
                                                </View>
                                                <View style={{ flexDirection: 'row' }}>
                                                    <FlatList
                                                        data={menuObject.size}
                                                        renderItem={this.renderSizeItem}
                                                        ItemSeparatorComponent={this.renderSeparator}
                                                        // horizontal={true}
                                                        numColumns={4}
                                                        style={I18n.locale == 'ar' ? { flexDirection: 'row' } : {}}
                                                        keyExtractor={(item, index) => index.toString()}
                                                    />
                                                </View>
                                            </View> : <View />
                                        }

                                        {menuObject.cup_size.length > 0 ?
                                            <View style={{ paddingVertical: verticalScale(10) }}>
                                                <Text style={[styles.itemTextSecond]}>{I18n.t('cupSize')}  &nbsp;
                                                <Text style={[styles.itemTextSecond, { fontWeight: '600' }]}>{selectedCupSize}</Text>
                                                </Text>
                                                <View style={[{ flexDirection: 'row' }, I18n.locale === 'ar' && { right: scale(180) }]}>
                                                    <FlatList
                                                        data={menuObject.cup_size}
                                                        renderItem={this.renderCupSizeItem}
                                                        ItemSeparatorComponent={this.renderSeparator}
                                                        horizontal={true}
                                                        keyExtractor={(item, index) => index.toString()}
                                                        style={I18n.locale == 'ar' ? { flexDirection: 'row' } : ''}
                                                    />
                                                </View>
                                            </View> : <View />
                                        }


                                        {/*  */}

                                        <View style={[styles.sizeImage]}>
                                            <Image style={{ transform: [{ rotate: '45deg' }, { scaleX: 0.5 }, { scaleY: 0.5 }] }} source={require('../../assets/helpcenter/Size_guide.png')} />
                                            <TouchableOpacity onPress={() => this.openSizeGuide()}>
                                                <Text style={[styles.itemTextThired, { color: '#f5a0c0' }]}>{I18n.t('sizeFit')}</Text>
                                            </TouchableOpacity>
                                        </View>

                                        {product !== undefined ? <View>{product[0].offerList && product[0].offerList.length > 0 ?
                                            <View >
                                                <Text style={{ fontSize: scale(18), color: '#f599ba', textTransform: 'uppercase' }}>{I18n.t('buymore_savemore')}</Text>
                                                <View style={{ flexDirection: 'row' }}>
                                                    <Text style={[styles.itemText1, { fontWeight: '300', paddingTop: scale(10), paddingBottom: scale(10) }]}>
                                                        {Object.keys(product[0].offerList[0])[0]}
                                                        <Text style={{ fontWeight: '700' }}>&nbsp;{I18n.t('for')}</Text>
                                                        &nbsp;{product[0].currency} &nbsp;{Object.values(product[0].offerList[0])[0]}
                                                    </Text>


                                                    {product[0].offerList.length > 1 ? <Text style={[styles.itemText1, { fontWeight: '300', paddingTop: scale(10), paddingBottom: scale(10) }]}>
                                                        &nbsp;|&nbsp;{Object.keys(product[0].offerList[1])[0]}
                                                        <Text style={{ fontWeight: '700' }}>&nbsp;{I18n.t('for')}</Text>
                                                        &nbsp;{product[0].currency} &nbsp;{Object.values(product[0].offerList[1])[0]} &nbsp;|
                                                    </Text> : <View />}
                                                </View>
                                            </View>
                                            : <View />}</View> : <View />}


                                        <View>
                                            <View style={[styles.quantitySet]}>
                                                <Text>{I18n.t('qty')}</Text>
                                                <TouchableOpacity style={styles.minusPlus} onPress={() => this.minusQuantity()}>
                                                    <Text style={styles.itemText4}>-</Text>
                                                </TouchableOpacity>
                                                <Text style={[styles.itemText4, { minWidth: scale(20), maxWidth: scale(30) }]}>{this.state.quantity}</Text>
                                                <TouchableOpacity style={[styles.minusPlus]} onPress={() => this.addQuantity(qty)}>
                                                    <Text style={styles.itemText4}>+</Text>
                                                </TouchableOpacity>
                                                {this.state.showAlert ?
                                                    <View>{this.renderCustomAlert()}</View> : <View />}
                                            </View>
                                        </View>
                                        <View style={{ flexDirection: 'row' }}>
                                           {exclude_international !== 'Yes' && <View>{inStock !== '0' && exclude_international === 'No' ? <View style={{ paddingVertical: verticalScale(30) }}>
                                                <Text style={[styles.itemTextSecond, { color: '#f5a0c0', fontWeight: '600' }]}>
                                                    {I18n.t('inStock')}
                                                </Text>
                                            </View> :

                                                <View style={{ paddingVertical: verticalScale(30) }}>
                                                    <Text style={[styles.itemTextSecond, { color: '#f5a0c0', fontWeight: '600' }]}>
                                                        {I18n.t('outStock')}
                                                    </Text>
                                                </View>}</View>}
                                            {exclude_international === 'Yes' ?
                                                <View style={{ paddingVertical: verticalScale(30) }}>
                                                    <Text style={[styles.itemTextSecond, { color: 'red', fontWeight: '600' }]}>
                                                        {I18n.t('notInternational')}
                                                    </Text>
                                                </View> :
                                                <View />}
                                        </View>
                                        <View style={{ height: scale(10) }}>

                                        </View>
                                        <View style={styles.border} />
                                        <View style={{ flexDirection: 'column', paddingVertical: verticalScale(20) }}>
                                            <View style={[styles.bottomTermsMain]}>
                                                <View style={[styles.bottomTerms]}>
                                                    <Image style={styles.tempImage} source={require('../../assets/productDetailIcon/paymentsecurity.png')} />
                                                    <Text style={[styles.bottomTermsText]}>{"  "}{I18n.t('secureShopping')}</Text>
                                                </View>
                                                <View style={[styles.bottomTerms]}>
                                                    <Image style={styles.tempImage} source={require('../../assets/productDetailIcon/cash.png')} />
                                                    <Text style={[styles.bottomTermsText]}>{"  "}{I18n.t('cashOnDelivery')}</Text>
                                                </View>

                                            </View>
                                            <View style={[styles.bottomTermsMain]}>
                                                <View style={[styles.bottomTerms]}>
                                                    <Image style={styles.tempImage} source={require('../../assets/productDetailIcon/exchange.png')} />
                                                    <Text style={[styles.bottomTermsText]}>{"  "}{I18n.t('freeClickCollect')}</Text>
                                                </View>
                                                <View style={[styles.bottomTerms]}>
                                                    <Image style={styles.tempImage} source={require('../../assets/productDetailIcon/delivery.png')} />
                                                    <Text style={[styles.bottomTermsText]}>{"  "}{I18n.t('to5DaysDelivery')}</Text>
                                                </View>
                                            </View>
                                        </View>
                                        <View style={styles.border} />
                                        <View style={{ paddingVertical: scale(10), height: scale(400) }}>
                                            <View style={{ flexDirection: 'row' }}>
                                                <Text style={styles.youMayText}>{I18n.t('youMayAlsoLove')}</Text>
                                            </View>
                                            {/* <ScrollView style={{paddingVertical: verticalScale(10)}} horizontal = {true} showsHorizontalScrollIndicator={false}> */}
                                            <FlatList
                                                data={product[0].similar_products}
                                                renderItem={this.renderOptionItem}
                                                ItemSeparatorComponent={this.renderSeparator}
                                                horizontal={true}
                                                showsHorizontalScrollIndicator={false}
                                                style={{ marginTop: scale(10) }}
                                                keyExtractor={(item, index) => index.toString()}
                                            />
                                            {/* </ScrollView> */}
                                        </View>
                                    </View>
                                </View>
                                <Footer {...this.props} />
                            </ScrollView>
                            {this.state.showSizeCard ?
                                <View>{this.renderSizeCard()}</View> : <View />
                            }
                        </View> :
                        <View style={{ flex: 1, justifyContent: 'center' }}>
                            <ActivityIndicator size="large" color="#0000ff" />
                        </View>) : <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}><Text style={{ fontSize: scale(18), fontFamily: 'Roboto' }}>{noDataMessage}</Text></View>) :
                    <View style={{ flex: 1, justifyContent: 'center' }}>
                        <ActivityIndicator size="large" color="#0000ff" />
                    </View>}</> : <View style={{ flex: 1, justifyContent: 'center' }}>
                        <ActivityIndicator size="large" color="#0000ff" />
                    </View>}
                {/* <HeaderComm changeLang={this.changeLang} navigation={this.props.navigation}/> */}


                {exclude_international !== 'Yes' && <View style={{ height: 45, }}>
                    <View style={I18n.locale == 'ar' ? { flexDirection: 'row-reverse' } : { flexDirection: 'row' }}>
                        <TouchableOpacity style={{ width: '25%', top: scale(10), flexDirection: 'row', justifyContent: 'center', left: scale(-10) }} onPress={() => this.props.navigation.navigate('Cart')}>
                            <TouchableOpacity style={[styles.heroLargeButton, { height: scale(20), zIndex: 1, left: scale(33), top: scale(-8) }]}
                                onPress={() => this.props.navigation.navigate('Cart')}>
                                <Text style={[COMMONSTYLE.yesBtnTxt, { fontSize: scale(12) }]}>{this.state.cartCount}</Text>
                            </TouchableOpacity>
                            <Ionicons name={I18n.t('shopplingBag')} size={20} color="#f693b9" />
                        </TouchableOpacity>
                        <TouchableOpacity
                            disabled={inStock == '0' || !this.state.activityIndicator || !addToBagActivityIndicator}
                            style={[styles.addToCart, { opacity: (inStock == '0' || !this.state.activityIndicator ? 0.7 : 1) }]} onPress={() => this.getUserDetail(product[0], selectedSize, selectedCupSize, quantity, selectedColor)}>
                            <Text style={{ textAlign: 'center', top: 10, fontSize: 20, color: '#fff' }}>{I18n.t('addToBag')}</Text>
                        </TouchableOpacity>
                    </View>
                </View>}
                {showMandatory ?
                    <View>{this.renderCustomAlertFroManadatory()}</View> : <View />}
                {showSelectSize ?
                    <View>{this.renderCustomAlertFroSelectSize()}</View> : <View />}
            </View>
        );
    }
}

function mapStateToProps(state) {
    const { ProductListReducer, CommonReducer, HelpCenterReducer, CartReducer } = state;
    return {
        productDetailData: ProductListReducer.productDetailData,
        status: ProductListReducer.status,
        currentCountryData: CommonReducer.currentCountryData,
        sizeGuideData: HelpCenterReducer.sizeGuideData,
        addToCartDataStatus: CartReducer.status,
        addToCartDataLatest: CartReducer.addToCartData,
        cartData: CartReducer.cartData,
        cartDataStatus: CartReducer.status,
        addToWishListData: CommonReducer.addToWishListData,
        removeToWishListData: CommonReducer.removeToWishListData,
        guestUserQuoteIdData: CartReducer.guestUsrData.data,
        guestUserStatus: CartReducer.status,
        guestUserAddToCartData: CartReducer.guestUsrCartData.data,
        guestUserAddToCartStatus: CartReducer.status,
        swiperIndex: ProductListReducer.swiperIndex,
    };
}
const mapDispatchToProps = (dispatch) => {
    return {
        getProductDetail: (obj) => {
            dispatch(getProductDetailData(obj))
        },
        getSizeGuideData: (obj) => {
            dispatch(getSizeGuide(obj))
        },
        doAddToCart: (obj) => {
            dispatch(addToCart(obj))
        },
        getCartData: (obj) => {
            dispatch(getCart(obj))
        },
        addToWishList: (obj) => {
            dispatch(addToWishListProduct(obj))
        },
        removeToWishList: (obj) => {
            dispatch(removeToWishListProduct(obj))
        },
        guestUserCart: (obj) => {
            dispatch(guestUserData(obj))
        },
        guestUserAddCartData: (obj, GId, lang_code) => {
            dispatch(guestUserAddToCart(obj, GId, lang_code))
        },
        changeIndex: (obj) => {
            dispatch(changeSwiperIndex(obj))
        },
        clearProductDetailData: () => {
            dispatch(clearProductDetail())
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ProductDetail);
