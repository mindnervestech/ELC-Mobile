import React, { Component } from 'react';
import {
    View, Text, TouchableOpacity, TextInput, ActivityIndicator, ScrollView, FlatList, Image,
} from 'react-native';
import styles from './Style'
import { connect } from 'react-redux'
import { scale, verticalScale } from '../../utils/Scale';
import I18n from '../../localization/index';
import PhoneInput from 'react-native-phone-input';
import Validators from '../../utils/Validators';
import * as MESSAGE from '../../utils/Message';
import * as COLORS from '../../utils/Color'
import MaterialIcons from "react-native-vector-icons/MaterialCommunityIcons";
import COMMONSTYLE from '../../utils/Style';
import ModalDropdown from 'react-native-modal-dropdown';
import RadioForm, { RadioButton, RadioButtonInput, RadioButtonLabel } from 'react-native-simple-radio-button';
import StoreLocator from '../StoreLocator/StoreLocator'
import { getAllCountry } from '../../actions/CommonAction';
import { setDeliveryData, getDeliveryData, clearGetDeliveryData, clearSetDeliveryData } from '../../actions/CheckoutAction';
import CartItem from '../../pages/Checkout';
import Util from '../../utils/Util';
import CustomAlert from '../../helper/CustomAlert';
import showToast from '../../helper/Toast';


var radio_props = [
    { label: 'Home', value: 0 },
    { label: 'Work', value: 1 }
];

class delivery extends Component {

    constructor(props) {
        super(props)
        this.state = {
            firstName: '',
            lastName: '',
            mobileNumber: '',
            email: '',
            // firstName: 'adfsad',
            // lastName: 'adsfa',
            // mobileNumber: '9637234412',
            // email: 'dfadsf@gmail.com',
            address1: '',
            address2: '',
            address3: '',
            firstNameError: null,
            lastNameError: null,
            emailError: null,
            mobileError: null,
            collectAndDeliveryFlag: false,
            countryList: [],
            value: null,
            addressId: null,
            sign_in_data: {},
            countryCode: '91',
            active_shipping_methods: {},
            defaultCountry: '-- All Countries --',
            defaultyCity: '-- All Cities --',
            storeId: null,
            quoteId: null,
            optionsCountryList: [],
            optionsRegionList: [],
            country_id: '',
            region_id: '',
            country: '',
            city: '',
            address1Error: null,
            showGCC: false,
            nayomi_store_id: null,
            userAddress: [],
            valueRadio: {},
            addAddressValue: true,
            G_quote_id: null,
            checkStateUpdate: false,
            activityIndicator: true,
            pAddress: true,
            countryError: null,
            stateError: null,
            buttonDisableEnable: true,
            countrySelected: null,
            postal_code: '',
            postal_code_error: null,
            markerIndexTick: null,
            radio_props: [
                { label: 'Home', value: 0 },
                { label: 'Work', value: 1 }
            ]
        }
    }

    componentDidMount() {
        this.props.onRef(this);
    }

    // componentDidUpdate(prevProps) {
    //     const { checkStateUpdate, nayomi_store_id } = this.state;
    //     if (this.props.classObj.state.nayomi_store_id > 0) {
    //         if (!checkStateUpdate) {
    //             console.log('this is nayomi_store_id componentDidUpdate If', this.props.classObj.state.nayomi_store_id);
    //             this.setState({ nayomi_store_id: this.props.classObj.state.nayomi_store_id, checkStateUpdate: true }, () => { this.checkButtonDisableEnable(); });
    //         } else {
    //             if (this.props.classObj.state.nayomi_store_id === nayomi_store_id) {

    //             } else {
    //                 console.log('this is nayomi_store_id componentDidUpdate else else', this.props.classObj.state.nayomi_store_id);
    //                 this.setState({ nayomi_store_id: this.props.classObj.state.nayomi_store_id }, () => { this.checkButtonDisableEnable(); });
    //             }
    //         }
    //     }
    // }

    componentWillMount() {
        this.setState({ activityIndicator: false });
        const { countryList } = this.props;
        Util.getAsyncStorage('SELECTED_COUNTRY_LANGUAGE').then((language) => {
            this.setState({ countryList: countryList, storeId: language.store_id, countrySelected: language.country === 'saudi' ? 'SAU' : language.country === 'uae' ? 'ARE' : null }, () => { this.setCountry(countryList); });
        });
        Util.getAsyncStorage('SIGN_IN_DATA').then((data) => {
            if (data !== null) {
                Util.getAsyncStorage('S_quote_id_digit').then((Sdata) => {
                    this.setState({ sign_in_data: data, quoteId: Sdata, firstName: data.firstname, lastName: data.lastname, mobileNumber: data.phone_number, email: data.email });
                    var obj = { customer_id: data.customer_id, store_id: this.state.storeId };
                    this.props.getDeliveryData(obj);
                });
            } else {
                Util.getAsyncStorage('G_quote_id_digit').then((Gdata) => {
                    if (Gdata !== null) {
                        this.setState({ G_quote_id: Gdata });
                    }
                });
                var obj = { customer_id: '', store_id: this.state.storeId };
                this.props.getDeliveryData(obj);
            }
        });
    }

    isGCC() {
        Util.getAsyncStorage('SELECTED_COUNTRY_LANGUAGE').then((language) => {
            if (language.country === 'international') {
                this.setState({ showGCC: true });
            } else {
                this.setState({ collectAndDeliveryFlag: true })
            }
        });
        this.checkButtonDisableEnable();
    }

    showHomeDelivery() {
        this.setState({ collectAndDeliveryFlag: false })
    }

    backToDelivery() {
        this.props.classObj.setState({ deliveryFlag: false });
        this.props.navigation.navigate('Cart');
    }

    _handelAddress(addressDataTemp) {
        var addressData = [];
        addressDataTemp.map((addData) => {
            if (addData.isaddressallowed) {
                addressData.push({ value: addData.Id, label: addData.address_type + ' ' + addData.country_id + ' ' + addData.userFirstName + ' ' + addData.userLastName + ' ' + addData.city + ', ' + addData.street + ', ' + addData.city + ' ' + addData.state + ' ' + addData.country_id + ' ' + addData.telephone })
            }
        });
        this.setState({ activityIndicator: true });
        this.setState({ userAddress: addressData, addressId: addressData.length > 0 ? addressData[0].value : null, activityIndicator: true })
        this.props.classObj.setState({ buttonDisableEnable: addressData.length > 0 ? false : true })
    }


    componentWillReceiveProps(nextProps) {
        if (this.props.classObj.state.nayomi_store_id > 0) {
            const { checkStateUpdate, nayomi_store_id, markerIndexTick } = this.state;
            if (!checkStateUpdate) {
                this.setState({ markerIndexTick: this.props.classObj.state.markerIndexTick, nayomi_store_id: this.props.classObj.state.nayomi_store_id, checkStateUpdate: true }, () => { this.checkButtonDisableEnable(); });
            } else {
                if (this.props.classObj.state.nayomi_store_id === nayomi_store_id) {

                } else {
                    this.setState({ markerIndexTick: this.props.classObj.state.markerIndexTick, nayomi_store_id: this.props.classObj.state.nayomi_store_id }, () => { this.checkButtonDisableEnable(); });
                }
            }
        }
        if (nextProps.setDeliveryDataStatus === 'SET_DELIVERY_SUCCESS') {
            this.setState({ activityIndicator: true });
            this.props.classObj.setState({ deliveryFlag: true });
            this.props.clearSetDelivery();
        } else if (nextProps.setDeliveryDataStatus === 'SET_DELIVERY_FAILED') {
            this.setState({ activityIndicator: true });
            showToast('Something Went Wrong', true);
        }
        if (nextProps.getDeliveryDataStatus) {
            var active_shipping_methods = nextProps.getDataForDelivery.active_shipping_methods;
            var addressDataTemp = nextProps.getDataForDelivery.addressData;
            this._handelAddress(addressDataTemp);
            this.setState({ active_shipping_methods: active_shipping_methods });
            this.props.clearGetDelivery();
        }
    }

    setCountry(listOfCountry) {
        const { countrySelected, countryList } = this.state;
        let optionsCountryList = [];
        if (countrySelected !== null) {
            let single = listOfCountry.find(o => o.three_letter_abbreviation === countrySelected);
            optionsCountryList.push(single.full_name_english);
            this.setState({ optionsCountryList: optionsCountryList }, () => {
                let optionsRegionObject = countryList.find(o => o.full_name_english === single.full_name_english);
                this.setState({
                    country_id: optionsRegionObject.id, country: optionsRegionObject.full_name_english,
                    optionsRegionList: (optionsRegionObject.available_regions).map(a => a.name)
                })
            });
        } else {
            this.setState({ optionsCountryList: listOfCountry.map(a => a.full_name_english) });
        }
    }

    checkCode(text) {
        var newText = '';
        var numbers = '+0123456789';
        if (text.length < 1) {
            this.setState({ countryCode: '' });
        }
        for (var i = 0; i < text.length; i++) {
            if (numbers.indexOf(text[i]) > -1) {
                newText = newText + text[i];
            }
            else {
                Alert.alert('Invalid Country Code');
                this.setState({ countryCode: '' });
            }
            this.setState({ countryCode: newText });
        }
        if (text.length >= 3) {
        }
        setTimeout(() => {
            this.validatePhoneNumber();
        }, 10);
    }

    handleFirstNameInputChange = (firstName) => {
        this.setState({ firstName: firstName });
        if (Validators.isEmpty(firstName)) {
            this.setState({ firstNameError: MESSAGE.FIRST_NAME_REQ });
        } else if (firstName.indexOf(" ") != -1) {
            this.setState({ firstNameError: MESSAGE.SPACE_NOT_ALLOWED });
        } else if (firstName.length > 30) {
            this.setState({ firstNameError: MESSAGE.CHARACTER_LIMIT_FIRSTNAME });
        } else {
            this.setState({ firstNameError: null });
        }
    }

    handleLastNameInputChange = (lastName) => {
        this.setState({ lastName: lastName });
        if (Validators.isEmpty(lastName)) {
            this.setState({ lastNameError: MESSAGE.LAST_NAME_REQ });
        } else if (lastName.indexOf(" ") != -1) {
            this.setState({ lastNameError: MESSAGE.SPACE_NOT_ALLOWED });
        } else if (lastName.length > 30) {
            this.setState({ lastNameError: MESSAGE.CHARACTER_LIMIT_LASTNAME });
        } else {
            this.setState({ lastNameError: null });
        }
    }

    validate = () => {
        const { email } = this.state
        if (Validators.isEmpty(email)) {
            this.setState({ emailError: MESSAGE.EMAIL_REQ });
        }
        else if (!Validators.validEmail(this.state.email)) {
            this.setState({ emailError: MESSAGE.INVALID_EMAIL_ID });
        } else {
            this.setState({ emailError: null });
        }
    }

    handleEmailInputChange = (email) => {
        this.setState({ email: email });
        if (Validators.isEmpty(email)) {
            this.setState({ emailError: MESSAGE.EMAIL_REQ });
        }
        else if (!Validators.validEmail(this.state.email)) {
            this.setState({ emailError: MESSAGE.INVALID_EMAIL_ID });
        } else {
            this.setState({ emailError: null });
        }
    }

    handleAddress1Change = (address1) => {
        this.setState({ address1: address1 });
        if (Validators.isEmpty(address1)) {
            this.setState({ address1Error: MESSAGE.ADD_REQUIRED });
        } else {
            this.setState({ address1Error: null });
        }
    }

    handleAddress2Change = (address2) => {
        this.setState({ address2: address2 });
    }

    handleAddress3Change = (address3) => {
        this.setState({ address3: address3 });
    }

    handlePostalCodeChange = (postal_code) => {
        this.setState({ postal_code: postal_code });
        if (Validators.isEmpty(postal_code)) {
            this.setState({ postal_code_error: MESSAGE.POSTAL_CODE_REQUIRED });
        } else {
            this.setState({ postal_code_error: null });
        }
    }

    handleMobileInputChange = (mobileNumber) => {
        this.setState({ mobileNumber: mobileNumber });
        if (Validators.isEmpty(mobileNumber)) {
            this.setState({ mobileError: MESSAGE.MOBILE_REQ });
        } else if (!/^\d+$/.test(mobileNumber)) {
            this.setState({ mobileError: MESSAGE.MOBILE_CONTAIN_NUMBER });
        }
        else {
            this.setState({ mobileError: null });
        }
    }

    checkButtonDisableEnable() {
        setTimeout(() => {
            const { firstName, lastName, email, countryCode, mobileNumber, address1, collectAndDeliveryFlag, postal_code, nayomi_store_id } = this.state;
            const { firstNameError, lastNameError, emailError, mobileError, address1Error, postal_code_error } = this.state;
            if (collectAndDeliveryFlag) {
                if (Validators.isEmpty(firstName) || Validators.isEmpty(lastName) || Validators.isEmpty(email) || nayomi_store_id === null ||
                    Validators.isEmpty(countryCode) || Validators.isEmpty(mobileNumber) || firstNameError !== null || lastNameError !== null || emailError !== null || mobileError !== null ) {
                    this.props.classObj.setState({ buttonDisableEnable: true });
                } else {
                    this.props.classObj.setState({ buttonDisableEnable: false });
                }
            } else {
                if (Validators.isEmpty(firstName) || Validators.isEmpty(lastName) || Validators.isEmpty(email) || Validators.isEmpty(address1) || Validators.isEmpty(postal_code) ||
                    Validators.isEmpty(countryCode) || Validators.isEmpty(mobileNumber) || firstNameError !== null || lastNameError !== null || emailError !== null || mobileError !== null || address1Error !== null || postal_code_error !== null) {
                    this.props.classObj.setState({ buttonDisableEnable: true });
                } else {
                    this.props.classObj.setState({ buttonDisableEnable: false });
                }
            }
        }, 100);

    }

    validatePhoneNumber() {
        const { countryCode, mobileNumber } = this.state;
        var cCode = parseInt(countryCode, 10);
        var mNumber = parseInt(mobileNumber, 10);
        if (cCode === 966 || cCode === 971) {
            if (!Validators.is09Digit(mNumber)) {
                this.setState({ mobileError: MESSAGE.MOBILE_09DIGIT })
            }
        } else if (cCode === 91 || cCode === 1) {
            if (!Validators.is10Digit(mNumber)) {
                this.setState({ mobileError: MESSAGE.MOBILE_10DIGIT })
            }
        }
    }

    doProceed() {
        var shipping_code = '';
        var customer_address_type = '';
        var address_object = {};
        var obj = {};
        const { customer_id } = this.state.sign_in_data;
        var main_Quote_id = null;
        const { countryCode, email, address1, address2, address3, quoteId, storeId, mobileNumber, firstName, lastName, city, country_id, region_id, country, nayomi_store_id, addressId, addAddressValue, collectAndDeliveryFlag, userAddress, G_quote_id, active_shipping_methods, value, postal_code } = this.state;
        if (!collectAndDeliveryFlag && (country === '' || country_id === '') && !(userAddress.length > 0)) {
            this.setState({ countryError: MESSAGE.COUNTRY_REQUIRED })
        } else if (!collectAndDeliveryFlag && (city === '' || region_id === '') && !(userAddress.length > 0)) {
            this.setState({ stateError: MESSAGE.STARE_REQUIRED, countryError: null })
        } else {
            this.setState({ stateError: null, countryError: null, activityIndicator: true })
            // if (this.state.value) {
            //     customer_address_type = 'Work';
            // } else {
            //     customer_address_type = 'Home';
            // }
            // if (collectAndDeliveryFlag) {
            //     shipping_code = active_shipping_methods[1].code;

            // } else {
            //shipping_code = active_shipping_methods[0].code;
            address_object = {
                addressId: '',
                carrier_code: countryCode,
                //city: 'American Samoa',
                //country_id: 'US',
                city: city,
                country_id: country_id,
                customer_address_type: value ? 'Work' : 'Home',
                customer_email: email,
                postcode: postal_code,
                //region_id: 3,
                //state: 'United States',
                region_id: region_id,
                state: country,
                street: address1 + ', ' + address2 + ', ' + address3,
                telephone: mobileNumber,
                userFirstName: firstName,
                userLastName: lastName,
            }
            if (userAddress.length !== 0) {
                address_object.UserID = customer_id;
            }
            //}
            this.props.classObj.setState({ collectAndDeliveryFlag: collectAndDeliveryFlag });
            // if (G_quote_id === null) {
            //     main_Quote_id = quoteId;
            // } else {
            //     main_Quote_id = G_quote_id;
            // }
            obj = {
                address_id: collectAndDeliveryFlag ? '' : addAddressValue ? addressId !== null ? addressId : '' : '',
                address_object: collectAndDeliveryFlag ? {} : addAddressValue ? userAddress.length !== 0 ? {} : address_object : address_object,
                cnumber: collectAndDeliveryFlag ? countryCode : '',
                email: collectAndDeliveryFlag ? email : '',
                fname: collectAndDeliveryFlag ? firstName : '',
                lname: collectAndDeliveryFlag ? lastName : '',
                mnumber: collectAndDeliveryFlag ? mobileNumber : '',
                nayomi_store_id: collectAndDeliveryFlag ? nayomi_store_id : '',
                quote_id: G_quote_id === null ? quoteId : G_quote_id,
                shipping_code: collectAndDeliveryFlag ? active_shipping_methods[1].code : active_shipping_methods[0].code,
                store_id: storeId,
            }
            console.log('this is objc', obj);
            this.setState({ activityIndicator: false })
            this.props.setDeliveryData(obj);
        }
    }

    _onCountrySelect(index, data) {
        const { countryList } = this.state;
        this.citiy_dropdown.select(-1);
        let optionsRegionObject = countryList.find(o => o.full_name_english === data);
        this.setState({
            country_id: optionsRegionObject.id, country: optionsRegionObject.full_name_english,
            optionsRegionList: (optionsRegionObject.available_regions).map(a => a.name)
        })
    }

    _onCitySelect(index, data) {
        const { countryList } = this.state;
        this.setState({ city: data });
        const { country_id } = this.state;
        Object.keys(countryList).map((item, index) => {
            if (countryList[item].id === country_id) {
                var tempList = countryList[item].available_regions;
                Object.keys(tempList).map((item, index) => {
                    if (tempList[item].name === data) {
                        this.setState({ region_id: tempList[item].id });
                    }
                });
            }
        });
    }

    addAddress() {
        this.props.classObj.setState({ buttonDisableEnable: true });
        this.setState({ addAddressValue: false, addAddressCheckOut: true });
    }

    cancelAddress() {
        this.props.classObj.setState({ buttonDisableEnable: false });
        this.setState({ addAddressValue: true, addAddressCheckOut: false });
    }

    assignPrimaryAddress(key) {
        //this.setState({ pAddress: key === 'yes' ? true : false })
    }

    returnAddress(item) {
        return (item.address_type + ' ' + item.country_id + ' ' + item.userFirstName + ' ' + item.userLastName + ' ' + item.city + ', ' + item.street + ', ' + item.city + ' ' + item.state + ' ' + item.country_id + ' ' + item.telephone)
    }

    calculateSaving(splprice, price) {
        return Math.round(((price - splprice) * 100) / price);
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

    addProductToListAtDelivery = ({ item }) => {
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
                            }</View> : <Text style={styles.price}> {I18n.t('free')}</Text>}
                        <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
                            <View style={styles.box}>
                                <Text>{item.qty}</Text>
                            </View>
                        </View>
                    </View>
                </View></View>

        )
    }


    cartItemData() {
        const { cartData } = this.props;
        var cartDataProduct = cartData.data.products;
        var cartDataPrice = cartData.data;
        var comesFrom = '';
        return (
            <View style={{ flex: 1 }}>
                {cartData ?
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
                                {comesFrom == 'payment' ? <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: scale(16) }}>
                                    <View style={{ width: '80%' }}>
                                        <TextInput
                                            style={[(styles.inputFieldText)]}
                                            placeholder="Voucher"
                                            textAlign = {I18n.locale === 'ar' ? 'right' : 'left'}
                                            autoCorrect={false}
                                            underlineColorAndroid="transparent"
                                            autoCapitalize='words'
                                            keyboardType="default"
                                        >
                                        </TextInput>
                                    </View>
                                    <View style={styles.voucherCheck}>
                                        <MaterialIcons
                                            name='check'
                                            size={scale(20)}
                                            color={COLORS.BASE_GREY}
                                        />
                                    </View>
                                </View> : <View />}
                                <View style={{ maxHeight: verticalScale(400) }}>
                                    <FlatList
                                        data={cartDataProduct}
                                        renderItem={this.addProductToListAtDelivery}
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
                                            <Text>{cartDataPrice.currency} {cartDataPrice.subtotal}</Text>
                                        </View>
                                        <View style={styles.brdBottom} />
                                        {cartDataPrice.discount_amount !== 0 && <View>
                                            <View style={styles.alignRow}>
                                                <Text>{I18n.t('saving')}</Text>
                                                <Text>{cartDataPrice.currency} {cartDataPrice.discount_amount}</Text>
                                            </View>
                                            <View style={styles.brdBottom} /></View>}
                                        {/* <View style={styles.alignRow}>
                                            <Text>{I18n.t('shipping')}</Text>
                                            <Text>{cartDataPrice.currency} 0</Text>
                                        </View> */}
                                        {comesFrom == 'confirm' ?
                                            <View>
                                                <View style={styles.brdBottom} />
                                                <View style={styles.alignRow}>
                                                    <Text>{I18n.t('cod')}</Text>
                                                </View>
                                            </View> : <View />}
                                        <View style={styles.brdBottom} />
                                        <View style={styles.alignRow}>
                                            <Text style={{ fontWeight: 'bold' }}>{I18n.t('total')}</Text>
                                            <Text>{cartDataPrice.currency} {cartDataPrice.subtotal_with_discount}</Text>
                                        </View>
                                        <View style={styles.brdBottom} />
                                        <View style={styles.alignRow}>
                                            <Text>{I18n.t('vat')}</Text>
                                            <Text>{cartDataPrice.currency} {6.14}</Text>
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

    renderAddressSheet() {
        const { userAddress, buttonDisableEnable } = this.state;
        return (
            <View style={{ paddingHorizontal: scale(10), paddingVertical: scale(16) }}>
                <View style={styles.topBoxMain}>
                    <Text>{I18n.t('address_information')}</Text>
                    <Text>{I18n.t('saved_addresses')}</Text>
                    <ScrollView style={{ height: scale(200), paddingTop: scale(10) }}>
                        <RadioForm
                            radio_props={userAddress}
                            animation={false}
                            initial={0}
                            buttonSize={10}
                            formHorizontal={false}
                            labelHorizontal={true}
                            labelStyle={{ paddingRight: '10%' }}
                            buttonColor={COLORS.BRAND_DARKEST}
                            selectedButtonColor={COLORS.BRAND_DARKEST}
                            onPress={(value) => { this.setState({ addressId: value }) }}
                        />
                    </ScrollView>
                    {/* <Text onPress={() => { this.setState({ addressId: userAddress[0].id }) }}>{this.returnAddress(userAddress[0])}</Text> */}
                    <View style={styles.buttonContainer}>
                        <TouchableOpacity
                            disabled={!buttonDisableEnable}
                            style={[styles.newButton, { opacity: (!buttonDisableEnable ? 0.7 : 1) }]}
                            activeOpacity={.5}
                            onPress={() => this.addAddress()}
                        >
                            <Text style={styles.TextStyle}> {I18n.t('add_new_address')} </Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        )
    }

    renderSelection() {
        const { collectAndDeliveryFlag } = this.state
        return (
            <>
                <View style={{ paddingHorizontal: scale(10), paddingVertical: scale(16) }}>
                    <View style={styles.topBoxMain}>
                        <View style={{ flexDirection: 'row' }}>
                            <TouchableOpacity style={[styles.topBoxSelection, collectAndDeliveryFlag && styles.topBoxSelectionChange]} onPress={() => { this.isGCC() }}>
                                <Text>{I18n.t('click_collect')}</Text>
                            </TouchableOpacity>
                            <View style={{ width: '2%' }} />
                            <TouchableOpacity style={[styles.topBoxSelection, !collectAndDeliveryFlag && styles.topBoxSelectionChange]} onPress={() => { this.showHomeDelivery() }}>
                                <Text>{I18n.t('home_delivery')}</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
                <View style={styles.breadcrumbBorder} />
            </>
        )
    }

    renderCustomAlert() {
        return (
            <CustomAlert okPressed={() => { this.setState({ showGCC: false }); }} text1={MESSAGE.ERROR} text2={MESSAGE.GCC_ERROR} alertType='OK' />
        )
    }

    renderContactnformation() {
        return (
            <>
                <View style={{ padding: scale(20) }}>
                    <View style={{ paddingHorizontal: scale(20) }}>
                        <Text>{I18n.t('contact_information')}</Text>
                        <Text style={{ paddingTop: scale(5) }}>{I18n.t('TEXT7')} <Text style={{ color: 'red' }}>*</Text> {I18n.t('TEXT8')}</Text>
                    </View>
                    <View style={{ padding: scale(10) }}>
                        <View style={styles.inputView}>
                            <Text style={styles.inputField}>{I18n.t('FIRST_NAME')}<Text style={{ color: 'red' }}>*</Text></Text>
                            <TextInput
                                style={[(this.state.firstNameError ? styles.inputFieldTextError : styles.inputFieldText)]}
                                //placeholder="First Name"
                                textAlign = {I18n.locale === 'ar' ? 'right' : 'left'}
                                autoCorrect={false}
                                underlineColorAndroid="transparent"
                                autoCapitalize='words'
                                keyboardType="default"
                                value={this.state.firstName}
                                onChangeText={this.handleFirstNameInputChange}
                                onChange={() => { this.checkButtonDisableEnable(); }}></TextInput>
                            {
                                this.state.firstNameError ?
                                    <Text style={[styles.paragraphNormal, styles.error]}>{this.state.firstNameError}</Text> : <View />
                            }
                        </View>
                        <View style={styles.inputView}>
                            <Text style={styles.inputField}>{I18n.t('LAST_NAME')}<Text style={{ color: 'red' }}>*</Text></Text>
                            <TextInput
                                style={[(this.state.lastNameError ? styles.inputFieldTextError : styles.inputFieldText)]}
                                //placeholder="Last Name"
                                textAlign = {I18n.locale === 'ar' ? 'right' : 'left'}
                                autoCorrect={false}
                                underlineColorAndroid="transparent"
                                autoCapitalize='words'
                                keyboardType="default"
                                value={this.state.lastName}
                                onChangeText={this.handleLastNameInputChange}
                                onChange={() => { this.checkButtonDisableEnable(); }}></TextInput>
                            {
                                this.state.lastNameError ?
                                    <Text style={[styles.paragraphNormal, styles.error]}>{this.state.lastNameError}</Text> : <View />
                            }
                        </View>
                        <View style={styles.inputView}>
                            <Text style={styles.inputField}>{I18n.t('MOBLIE')}<Text style={{ color: 'red' }}>*</Text></Text>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                <View style={[styles.country, styles.codeBorder]}>
                                    <PhoneInput
                                        ref='countryCodeBox'
                                        label={'Code'}
                                        initialCountry='IN'
                                        borderColor='#58606C'
                                        flagStyle={styles.phoneInputImageFlag}
                                        textstyle={[styles.paragraphNormal, styles.phoneInput]}
                                        //onChange={() => { this.checkButtonDisableEnable(); }}
                                        autoCapitalize={'none'}
                                        autoCorrect={false}
                                        onInvalidInputOccur={(isInvalid) => this.setState({
                                            invalidCountryCode: isInvalid
                                        })}
                                        onChangePhoneNumber={(text) => { this.checkCode(text) }}
                                        value={this.state.countryCode}

                                    />
                                </View>
                                <View style={styles.mobile}>
                                    <TextInput
                                        style={[(this.state.mobileError ? styles.inputFieldTextError : styles.inputFieldText)]}
                                        //placeholder="Mobile Number"
                                        textAlign = {I18n.locale === 'ar' ? 'right' : 'left'}
                                        autoCorrect={false}
                                        underlineColorAndroid="transparent"
                                        autoCapitalize='words'
                                        keyboardType="numeric"
                                        value={this.state.mobileNumber}
                                        onBlur={e => this.validatePhoneNumber()}
                                        onChangeText={this.handleMobileInputChange}
                                        onChange={() => { this.checkButtonDisableEnable(); }}></TextInput>
                                </View>
                            </View>
                        </View>
                        <View style={styles.inputView}>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                <View>

                                </View>
                                <View style={styles.mobile}>
                                    {
                                        this.state.mobileError ?
                                            <Text style={[styles.paragraphNormal, styles.error]}>{this.state.mobileError}</Text> : <View />
                                    }
                                </View>
                            </View>
                        </View>
                        <View style={styles.inputView}>
                            <Text style={styles.inputField}>{I18n.t('EMAIL')}<Text style={{ color: 'red' }}>*</Text></Text>
                            <TextInput
                                style={[(this.state.emailError ? styles.inputFieldTextError : styles.inputFieldText)]}
                                //placeholder="Email Address"
                                textAlign = {I18n.locale === 'ar' ? 'right' : 'left'}
                                autoCorrect={false}
                                autoCapitalize='none'
                                underlineColorAndroid="transparent"
                                keyboardType="default"
                                value={this.state.email}
                                onBlur={e => this.validate()}
                                onChangeText={this.handleEmailInputChange}
                                onChange={() => { this.checkButtonDisableEnable(); }}></TextInput>
                            {
                                this.state.emailError ?
                                    <Text style={[styles.paragraphNormal, styles.error]}>{this.state.emailError}</Text> : <View />
                            }
                        </View>

                    </View>
                </View>
                <View style={styles.breadcrumbBorder} />
            </>
        )
    }

    renderAddressInfo() {
        const { countryList, defaultCountry, defaultyCity, optionsCountryList, optionsRegionList, collectAndDeliveryFlag, pAddress, countryError, stateError, countrySelected } = this.state;
        return (
            <View style={{ padding: scale(20) }}>
                <View style={{ paddingHorizontal: scale(20) }}>
                    <Text>{I18n.t('address_information')}</Text>
                </View>
                <View style={{ paddingHorizontal: scale(10) }}>
                    <View style={{ flexDirection: 'row', paddingVertical: scale(30) }}>
                        <View style={[styles.breadcrumbCircle, { backgroundColor: COLORS.BRAND_DARKER1 }]}>
                            <MaterialIcons
                                name='exclamation'
                                size={scale(15)}
                                color={'white'}
                            />
                        </View>
                        <Text >{'  '}{I18n.t('TEXT9')}</Text>
                    </View>
                    {/* <View style={{ paddingHorizontal: scale(16) }}> */}
                    <View style={COMMONSTYLE.countryModalMain}>
                        <ModalDropdown
                            ref={el => this._countrydropdown = el}
                            options={optionsCountryList}
                            style={COMMONSTYLE.modalStyle}
                            dropdownStyle={[COMMONSTYLE.modalDropdownStyle]}
                            dropdownTextStyle={COMMONSTYLE.modalTextDropdownTextStyle}
                            textStyle={COMMONSTYLE.modalTextDropdownTextStyle}
                            //defaultIndex={countrySelected !== null ? 0 : -1}
                            defaultValue={countrySelected !== null ? optionsCountryList[0] : defaultCountry}
                            onSelect={(index, data) => this._onCountrySelect(index, data)}
                        />
                        <TouchableOpacity style={COMMONSTYLE.modalIcon} onPress={() => { this._countrydropdown && this._countrydropdown.show(); }}>
                            <MaterialIcons
                                name="chevron-down"
                                color={COLORS.BRAND_DARKEST}
                                size={scale(30)}
                            />
                        </TouchableOpacity>
                    </View>
                    <View style={COMMONSTYLE.countryModalMain}>
                        {
                            countryError ?
                                <Text style={[styles.paragraphNormal, styles.error]}>{countryError}</Text> : <View />
                        }
                    </View>
                    <View style={COMMONSTYLE.countryModalMain}>
                        <ModalDropdown
                            ref={el => this.citiy_dropdown = el}
                            options={optionsRegionList}
                            style={COMMONSTYLE.modalStyle}
                            dropdownStyle={COMMONSTYLE.modalDropdownStyle}
                            dropdownTextStyle={COMMONSTYLE.modalTextDropdownTextStyle}
                            textStyle={COMMONSTYLE.modalTextDropdownTextStyle}
                            // defaultIndex={0}
                            defaultValue={defaultyCity}
                            onSelect={(index, data) => this._onCitySelect(index, data)}
                        />
                        <TouchableOpacity style={COMMONSTYLE.modalIcon} onPress={() => { this.citiy_dropdown && this.citiy_dropdown.show(); }}>
                            <MaterialIcons
                                name="chevron-down"
                                color={COLORS.BRAND_DARKEST}
                                size={scale(30)}
                            />
                        </TouchableOpacity>
                    </View>
                    <View style={COMMONSTYLE.countryModalMain}>
                        {
                            stateError ?
                                <Text style={[styles.paragraphNormal, styles.error]}>{stateError}</Text> : <View />
                        }
                    </View>
                    <View style={{ paddingVertical: scale(20) }}>
                        <View style={[styles.inputView]}>
                            <Text style={styles.inputField}>{I18n.t('address1')}<Text style={{ color: 'red' }}>*</Text></Text>
                            <TextInput
                                style={[(this.state.lastNameError ? styles.inputFieldTextError : styles.inputFieldText)]}
                                //placeholder="Last Name"
                                textAlign = {I18n.locale === 'ar' ? 'right' : 'left'}
                                autoCorrect={false}
                                underlineColorAndroid="transparent"
                                autoCapitalize='words'
                                keyboardType="default"
                                value={this.state.address1}
                                onChangeText={this.handleAddress1Change}
                                onChange={() => { this.checkButtonDisableEnable(); }}></TextInput>
                            {
                                this.state.address1Error ?
                                    <Text style={[styles.paragraphNormal, styles.error]}>{this.state.address1Error}</Text> : <View />
                            }
                        </View>
                        <View style={styles.inputView}>
                            <Text style={styles.inputField}>{I18n.t('address2')}</Text>
                            <TextInput
                                style={[(this.state.lastNameError ? styles.inputFieldTextError : styles.inputFieldText)]}
                                //placeholder="Last Name"
                                textAlign = {I18n.locale === 'ar' ? 'right' : 'left'}
                                autoCorrect={false}
                                underlineColorAndroid="transparent"
                                autoCapitalize='words'
                                keyboardType="default"
                                value={this.state.address2}
                                onChangeText={this.handleAddress2Change}
                            >
                            </TextInput>
                        </View>
                        <View style={styles.inputView}>
                            <Text style={styles.inputField}>{I18n.t('address3')}</Text>
                            <TextInput
                                style={[(this.state.lastNameError ? styles.inputFieldTextError : styles.inputFieldText)]}
                                //placeholder="Last Name"
                                textAlign = {I18n.locale === 'ar' ? 'right' : 'left'}
                                autoCorrect={false}
                                underlineColorAndroid="transparent"
                                autoCapitalize='words'
                                keyboardType="default"
                                value={this.state.address3}
                                onChangeText={this.handleAddress3Change}
                            >
                            </TextInput>
                        </View>
                        <View style={styles.inputView}>
                            <Text style={styles.inputField}>{I18n.t('postal_code')}<Text style={{ color: 'red' }}>*</Text></Text>
                            <TextInput
                                style={[(this.state.postal_code_error ? styles.inputFieldTextError : styles.inputFieldText)]}
                                //placeholder="Address3"
                                textAlign = {I18n.locale === 'ar' ? 'right' : 'left'}
                                autoCorrect={false}
                                underlineColorAndroid="transparent"
                                autoCapitalize='words'
                                keyboardType="default"
                                onChangeText={this.handlePostalCodeChange}
                                value={this.state.postal_code}
                                onChange={() => { this.checkButtonDisableEnable(); }}></TextInput>
                            {
                                this.state.postal_code_error ?
                                    <Text style={[styles.paragraphNormal, styles.error]}>{this.state.postal_code_error}</Text> : <View />
                            }
                        </View>
                        <View style={[styles.inputView]}>
                            <Text style={styles.inputField}>{I18n.t('addressType')}</Text>
                            <View style={{ paddingVertical: scale(10) }}>
                                <RadioForm
                                    radio_props={radio_props}
                                    animation={false}
                                    initial={0}
                                    buttonSize={10}
                                    formHorizontal={true}
                                    labelHorizontal={true}
                                    labelStyle={{ paddingRight: '25%' }}
                                    buttonColor={COLORS.BRAND_DARKEST}
                                    selectedButtonColor={COLORS.BRAND_DARKEST}
                                    onPress={(value) => { this.setState({ value: value }) }}
                                />
                            </View>
                        </View>
                        <View style={[styles.inputView]}>
                            <Text style={styles.inputField}>{I18n.t('primaryAddress')}</Text>
                            <View style={{ flexDirection: 'row', paddingVertical: scale(10) }}>
                                <TouchableOpacity style={[styles.yesNoBox, pAddress ? styles.yesNoBoxSelection : { backgroundColor: '#f5f5f5' }]} onPress={() => this.setState({ pAddress: true })}>
                                    <Text>{I18n.t('yes')}</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={[styles.yesNoBox, !pAddress ? styles.yesNoBoxSelection : { backgroundColor: '#f5f5f5' }]} onPress={() => this.setState({ pAddress: false })}>
                                    <Text>{I18n.t('no')}</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </View>
            </View>
        )
    }



    render() {
        const { collectAndDeliveryFlag, showGCC, userAddress, addAddressValue, activityIndicator, buttonDisableEnable, markerIndexTick } = this.state;
        const { cartData } = this.props
        return (
            <View style={{ flex: 1 }}>
                {/* { Object.keys(cartData).length > 0 ? */}
                {activityIndicator ?
                    <View>
                        {this.renderSelection()}
                        {collectAndDeliveryFlag ?
                            <View>
                                <StoreLocator comesFrom={'delivery'} markerIndexTick={markerIndexTick} {...this.props} />
                                {this.renderContactnformation()}
                            </View>
                            :
                            <View>
                                {addAddressValue ?
                                    <View>
                                        {userAddress.length !== 0 ?
                                            <View>{this.renderAddressSheet()}</View> :
                                            <View>{this.renderContactnformation()}{this.renderAddressInfo()}</View>
                                        }
                                    </View> :
                                    <View>{this.renderContactnformation()}{this.renderAddressInfo()}
                                        <View style={styles.buttonContainer}>
                                            <TouchableOpacity
                                                //sdisabled={buttonDisableEnable}
                                                style={[styles.newButton, { opacity: (buttonDisableEnable ? 0.7 : 1) }]}
                                                activeOpacity={.5}
                                                onPress={() => this.cancelAddress()}>
                                                <Text style={styles.TextStyle}> {I18n.t('cancel')} </Text>
                                            </TouchableOpacity>
                                        </View>
                                    </View>
                                }
                            </View>
                        }

                        {showGCC ?
                            <View>{this.renderCustomAlert()}</View> : <View />}
                        {this.cartItemData()}
                        {/* <CartItem cartData ={cartData} comesFrom={'delivery'} {...this.props} /> */}
                    </View> : <View style={{ flex: 1, justifyContent: 'center' }}>
                        <ActivityIndicator size="large" color="#0000ff" />
                    </View>}
            </View>
        );
    }
}



function mapStateToProps(state) {
    const { CommonReducer, CheckoutReducer, CartReducer } = state;
    return {
        countryList: CommonReducer.allCountryData,
        countryListStatus: CommonReducer.allCountryStatus,
        setDeliveryDataObj: CheckoutReducer.setDeliveryData,
        setDeliveryDataStatus: CheckoutReducer.setDeliveryDatastatus,
        getDeliveryDataStatus: CheckoutReducer.getDataForDeliverystatus,
        getDataForDelivery: CheckoutReducer.getDataForDelivery,
        cartData: CartReducer.cartData,
    };
}
const mapDispatchToProps = (dispatch) => {
    return {
        setDeliveryData: (obj) => {
            dispatch(setDeliveryData(obj))
        },
        getDeliveryData: (obj) => {
            dispatch(getDeliveryData(obj))
        },
        clearGetDelivery: () => {
            dispatch(clearGetDeliveryData())
        },
        clearSetDelivery: () => {
            dispatch(clearSetDeliveryData())
        }
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(delivery);
