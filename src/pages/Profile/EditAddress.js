import React, { Component } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    TextInput,
    ActivityIndicator,
    ScrollView,
    FlatList,
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
import HeaderComm from '../../common/header/header';
import ModalDropdown from 'react-native-modal-dropdown';
import RadioForm, { RadioButton, RadioButtonInput, RadioButtonLabel } from 'react-native-simple-radio-button';
import StoreLocator from '../StoreLocator/StoreLocator';
import { getAllCountry } from '../../actions/CommonAction';
import CartItem from '../../pages/Checkout';
import Util from '../../utils/Util';
import CustomAlert from '../../helper/CustomAlert';
import showToast from '../../helper/Toast';
import { addUpdateAddress, clearUpdateAddressData } from '../../actions/ProfileAction';

var radio_props = [
    { label: 'Home', value: 0 },
    { label: 'Work', value: 1 }
];

class EditAddress extends Component {
    constructor(props) {
        super(props)
        this.state = {
            firstName: '',
            lastName: '',
            mobileNumber: '',
            email: '',
            address1: '',
            address2: '',
            address3: '',
            firstNameError: null,
            lastNameError: null,
            emailError: null,
            mobileError: null,
            //countryList: this.props,
            defaultAddressType: 0,
            value: null,
            collectAndDeliveryFlag: false,
            deliveryFlag: true,
            addressId: null,
            defaultCountry: '-- Select Countries --',
            defaultyCity: '-- Select Cities --',
            sign_in_data: {},
            countryCode: '91',
            active_shipping_methods: {},
            storeId: null,
            optionsCountryList: [],
            optionsRegionList: [],
            country_id: '',
            region_id: '',
            country: '',
            city: '',
            address1Error: '',
            showGCC: false,
            buttonDisableEnable: true,
            nayomi_store_id: null,
            userAddress: [],
            valueRadio: {},
            addAddressValue: true,
            postal_code: '',
            postal_code_error: null,
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

    componentDidMount() {
    }

    componentWillMount() {
        const { countryList } = this.props;
        this.setState({ countryList: countryList }, () => { this.setCountry(countryList); });
        let lastProps = this.props.navigation.state.params.addressid;
        this.setState({ activityIndicator: true });
        if (Object.keys(lastProps).length > 0) {
            this.setState({ addressId: lastProps.Id });
            this.setState({ firstName: lastProps.userFirstName });
            var spltt = lastProps.street.split(',');
            if (spltt.length >= 3) {
                this.setState({ address1: spltt[0], address2: spltt[1], address3: spltt[2] });
            } else if (spltt.length >= 2) {
                this.setState({ address1: spltt[0], address2: spltt[1] });
            } else if (spltt.length >= 1) {
                this.setState({ address1: spltt[0] });
            }
            this.setState({ 
                lastName: lastProps.userLastName,
                mobileNumber: lastProps.telephone,
                countryCode: lastProps.carrier_code,
                country: lastProps.country_id,
                region_id: lastProps.region_id,
                city: lastProps.city,
                defaultyCity: lastProps.city,
                country_id: lastProps.country_id,
                postal_code: lastProps.postcode,

             });
            let userCountryObject = countryList.find(o => o.id === lastProps.country_id);
            this.setState({ defaultCountry: userCountryObject.full_name_english });
            if (lastProps.isdefaultBilling) {
                this.setState({ deliveryFlag: true });
            } else {
                this.setState({ deliveryFlag: false });
            }
            if (lastProps.address_type == "Home") {
                this.setState({ defaultAddressType: 0 });
            } else {
                this.setState({ defaultAddressType: 1 });
            }
            const { deliveryFlag } = this.state;
        } else {

        }

        Util.getAsyncStorage('SELECTED_COUNTRY_LANGUAGE').then((language) => {
            this.setState({ storeId: language.store_id });
        });
    }

    _onCountrySelect(index, data) {
        const { countryList } = this.state;
        this.citiy_dropdown.select(-1);
        this.checkButtonDisableEnable();
        let optionsRegionObject = countryList.find(o => o.full_name_english === data);
        this.setState({
            city: '', defaultyCity: '-- All Cities --', country_id: optionsRegionObject.id, country: optionsRegionObject.full_name_english,
            optionsRegionList: (optionsRegionObject.available_regions).map(a => a.name)
        })
        this.checkButtonDisableEnable();
    }

    _onCitySelect(index, data) {
        const { countryList } = this.state;
        this.setState({ city: data });
        this.checkButtonDisableEnable();
        const { country_id } = this.state;
        Object.keys(countryList).map((item, index) => {
            if (countryList[item].country_id === country_id) {
                var tempList = countryList[item].available_regions;
                Object.keys(tempList).map((item, index) => {
                    if (tempList[item].name === city) {
                        this.setState({ region_id: tempList[item].id });
                    }
                });
            }
        });
    }

    _handelAddress(addressDataTemp) {
        var addressData = [];
        addressDataTemp.map((addData) => {
            if (addData.isaddressallowed) {
                addressData.push({ value: addData.Id, label: addData.address_type + ' ' + addData.country_id + ' ' + addData.userFirstName + ' ' + addData.userLastName + ' ' + addData.city + ', ' + addData.street + ', ' + addData.city + ' ' + addData.state + ' ' + addData.country_id + ' ' + addData.telephone })
            }
        });
        this.setState({ userAddress: addressData })
    }


    componentWillReceiveProps(nextProps) {
        if (nextProps.countryListStatus) {
            //this.setState({ countryList: nextProps.countryList }, () => { this.setCountry(nextProps.countryList); });
        }
        if (nextProps.updateAddressStatus) {
            this.setState({ activityIndicator: false });
            const { addressId } = this.state
            if (addressId) {
                showToast(I18n.t('updateAddressToster'), true);
            } else {
                showToast(I18n.t('addAddressToster'), true);
            }
            this.props.navigation.goBack();
        }
    }

    closeImg() {
        this.props.navigation.goBack();
    }

    setCountry(listOfCountry) {
        this.setState({ optionsCountryList: listOfCountry.map(a => a.full_name_english) });
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
            //this.focusNextField('mobileNumberBox');
        }
    }

    handleFirstNameInputChange = (firstName) => {
        this.setState({ firstName: firstName });
        if (Validators.isEmpty(firstName)) {
            this.setState({ firstNameError: MESSAGE.FIRST_NAME_REQ });
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

    handleAddress1Change = (address1) => {
        this.setState({ address1: address1 });
        if (Validators.isEmpty(address1)) {
            this.setState({ address1Error: MESSAGE.ADD_REQUIRED });
        } else {
            this.setState({ address1Error: '' });
        }
        this.checkButtonDisableEnable();
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
        } else {
            this.setState({ mobileError: null });
        }
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

    checkButtonDisableEnable() {
        setTimeout(() => {
            const { firstName, lastName, countryCode, mobileNumber, country_id, address1, city, postal_code } = this.state;
            const { firstNameError, lastNameError, mobileError, postal_code_error, emailError } = this.state;
            if (Validators.isEmpty(firstName) || Validators.isEmpty(lastName) || Validators.isEmpty(countryCode) || Validators.isEmpty(city) || Validators.isEmpty(mobileNumber) || Validators.isEmpty(country_id) || Validators.isEmpty(address1) || Validators.isEmpty(postal_code) ||
            firstNameError !== null || lastNameError !== null || emailError !== null || mobileError !== null || postal_code_error !== null) {
                this.setState({ buttonDisableEnable: true })
            } else {
                this.setState({ buttonDisableEnable: false })
            }
        }, 100);
    }

    doProceed() {
        var cnumber = '';
        var fname = '';
        var lname = '';
        var mnumber = '';
        var bemail = '';
        var shipping_code = '';
        var customer_address_type = '';
        var address_object = {};
        var obj = {};
        const { customer_id } = this.state.sign_in_data;
        const { countryCode, email, address1, address2, address3, storeId, mobileNumber, firstName, lastName, city, country_id, region_id, country, nayomi_store_id, addressId, addAddressValue, userAddress, collectAndDeliveryFlag, deliveryFlag, postal_code } = this.state;
        if (this.state.value) {
            customer_address_type = 'Work';
        } else {
            customer_address_type = 'Home';
        }

        Util.getAsyncStorage('SIGN_IN_DATA').then((data) => {
            var addressTotal = "";
            if (address1 != "" && address2 != "" && address3 != "") {
                addressTotal = address1 + ', ' + address2+ ', ' + address3;
            } else if (address1 != "" && address2 != "") {
                addressTotal = address1 + ', ' + address2;
            } else if (address1 != "") {
                addressTotal = address1;
            }
            obj = {
                addressId: addressId !== null ? addressId : '',
                UserId: data.customer_id,
                UserFirstName: firstName,
                UserLastName: lastName,
                WebsiteId: 1,
                countryCode: country_id,
                carrier_code: countryCode,
                UserTelephone: mobileNumber,
                UserStreet: addressTotal,
                UserCity: city,
                UserRegionId: region_id,
                UserCountry: country_id,
                DefaultBilling: deliveryFlag ? 1 : 0,
                DefaultShipping: 0,
                AddressType: customer_address_type,
                postcode: postal_code
            }
            this.props.updateAddress(obj);
            this.setState({ activityIndicator: false });
        });

    }

    _onSelectCountry(index, data) {
        var optionsRegionList = [];
        const { countryList } = this.state;
        Object.keys(countryList).map((item, index) => {
            if (countryList[item].full_name_english === data) {
                this.setState({ country_id: countryList[item].id, state: countryList[item].full_name_english, })
                var tempList = countryList[item].available_regions;
                Object.keys(tempList).map((item, index) => {
                    optionsRegionList.push(tempList[item].name);
                });
            }
        });
        this.setState({ optionsRegionList: optionsRegionList });
    }

    _onSelectCity(index, data) {
        const { countryList } = this.state;
        this.setState({ city: data });
        const { country_id } = this.state;
        Object.keys(countryList).map((item, index) => {
            if (countryList[item].country_id === country_id) {
                var tempList = countryList[item].available_regions;
                Object.keys(tempList).map((item, index) => {
                    if (tempList[item].name === city) {
                        this.setState({ region_id: tempList[item].id });
                    }
                });
            }
        });
    }

    addAddress() {
        this.setState({ addAddressValue: false });
    }

    cancelAddress() {
        this.setState({ addAddressValue: true });
    }

    returnAddress(item) {
        return (item.address_type + ' ' + item.country_id + ' ' + item.userFirstName + ' ' + item.userLastName + ' ' + item.city + ', ' + item.street + ', ' + item.city + ' ' + item.state + ' ' + item.country_id + ' ' + item.telephone)
    }

    renderAddressSheet() {
        const { userAddress } = this.state;
        return (
            <View style={{ paddingHorizontal: scale(10), paddingVertical: scale(16) }}>
                <View style={styles.topBoxMain}>
                    <Text>{I18n.t('address_information')}</Text>
                    <Text>{I18n.t('saved_addresses')}</Text>
                    <ScrollView style={{ height: scale(200), paddingTop: scale(10) }}>
                        <RadioForm
                            radio_props={userAddress}
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
                            disabled={this.state.buttonDisableEnable}
                            style={[styles.newButton, { opacity: (this.state.buttonDisableEnable ? 0.7 : 1) }]}
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

    renderCustomAlert() {
        return (
            <CustomAlert okPressed={() => { this.setState({ showGCC: false }); }} text1={MESSAGE.ERROR} text2={MESSAGE.GCC_ERROR} alertType='OK' />
        )
    }

    renderSelection() {
        const { collectAndDeliveryFlag } = this.state
        return (
            <>
                <View style={{ paddingHorizontal: scale(10), paddingVertical: scale(16) }}>
                    <View style={styles.topBoxMain}>
                        <View style={{ flexDirection: 'row' }}>
                            <TouchableOpacity style={[styles.topBoxSelection, deliveryFlag]} onPress={() => { this.isGCC() }}>
                                <Text>{I18n.t('click_collect')}</Text>
                            </TouchableOpacity>
                            <View style={{ width: '2%' }} />
                            <TouchableOpacity style={[styles.topBoxSelection, !deliveryFlag]} onPress={() => { this.showHomeDelivery() }}>
                                <Text>{I18n.t('home_delivery')}</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
                <View style={styles.breadcrumbBorder} />
            </>
        )
    }

    renderContactnformation() {
        const { countryList, addressId, defaultCountry, defaultyCity, optionsCountryList, optionsRegionList } = this.state;
        return (
            <>
                <View style={{ padding: scale(0) }}>
                    <View style={{ paddingHorizontal: scale(20) }}>
                        {addressId ? <Text style={{ top: 15, left: 5 }}>{I18n.t('editAddress')}</Text> : <Text style={{ top: 15, left: 5 }}>{I18n.t('addAddress')}</Text>}
                        <MaterialIcons
                            name='close-circle-outline'
                            onPress={() => this.closeImg()}
                            size={scale(30)}
                            color={'#000'}
                            style={{ position: 'absolute', top: 5, right: 5 }}
                        />
                    </View>
                    <View style={{ paddingHorizontal: scale(20), padding: scale(10), top: 25, backgroundColor: '#fafafa' }}>
                        <View style={styles.inputView}>
                            <Text style={styles.inputField}>{I18n.t('FIRST_NAME')}</Text>
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
                            <Text style={styles.inputField}>{I18n.t('LAST_NAME')}</Text>
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
                        {/* <View style={{ paddingHorizontal: scale(16) }}> */}
                        <View style={COMMONSTYLE.countryModalMain}>
                            <ModalDropdown
                                ref={el => this._countrydropdown = el}
                                options={optionsCountryList}
                                style={COMMONSTYLE.modalStyle}
                                dropdownStyle={[COMMONSTYLE.modalDropdownStyle]}
                                dropdownTextStyle={[COMMONSTYLE.modalTextDropdownTextStyle, , I18n.locale === 'ar' && {marginRight: scale(175)}]}
                                textStyle={[COMMONSTYLE.modalTextDropdownTextStyle, , I18n.locale === 'ar' && {marginRight: scale(165)}]}
                                // defaultIndex={0}
                                defaultValue={defaultCountry}
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
                            <ModalDropdown
                                ref={el => this.citiy_dropdown = el}
                                options={optionsRegionList}
                                style={COMMONSTYLE.modalStyle}
                                dropdownStyle={COMMONSTYLE.modalDropdownStyle}
                                dropdownTextStyle={[COMMONSTYLE.modalTextDropdownTextStyle, I18n.locale === 'ar' && {marginRight: scale(175)}]}
                                textStyle={[COMMONSTYLE.modalTextDropdownTextStyle, , I18n.locale === 'ar' && {marginRight: scale(175)}]}
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
                        <View style={styles.inputView}>
                            <Text style={styles.inputField}>{I18n.t('address1')}</Text>
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
                            ></TextInput>
                            {
                                this.state.address1Error ?
                                    <Text style={[styles.paragraphNormal, styles.error]}>{this.state.address1Error}</Text> : <View />
                            }
                        </View>
                        <View style={styles.inputView}>
                            <Text style={styles.inputField}>{I18n.t('address2')}</Text>
                            <TextInput
                                style={[(this.state.lastNameError ? styles.inputFieldTextError : styles.inputFieldText)]}
                                //placeholder="Address1"
                                textAlign = {I18n.locale === 'ar' ? 'right' : 'left'}
                                autoCorrect={false}
                                underlineColorAndroid="transparent"
                                autoCapitalize='words'
                                keyboardType="default"
                                onChangeText={this.handleAddress2Change}
                                value={this.state.address2}></TextInput>

                        </View>
                        <View style={styles.inputView}>
                            <Text style={styles.inputField}>{I18n.t('address3')}</Text>
                            <TextInput
                                style={[(this.state.lastNameError ? styles.inputFieldTextError : styles.inputFieldText)]}
                                //placeholder="Address3"
                                textAlign = {I18n.locale === 'ar' ? 'right' : 'left'}
                                autoCorrect={false}
                                underlineColorAndroid="transparent"
                                autoCapitalize='words'
                                keyboardType="default"
                                onChangeText={this.handleAddress3Change}
                                value={this.state.address3}></TextInput>

                        </View>
                        <View style={styles.inputView}>
                            <Text style={styles.inputField}>{I18n.t('MOBLIE')}</Text>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                <View style={[styles.country, styles.codeBorder]}>
                                    <PhoneInput
                                        ref='countryCodeBox'
                                        label={'Code'}
                                        initialCountry='IN'
                                        borderColor='#58606C'
                                        flagStyle={styles.phoneInputImageFlag}
                                        textstyle={[styles.paragraphNormal, styles.phoneInput]}
                                        onChange={() => { this.checkButtonDisableEnable(); }}
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
                                        onBlur={e => this.validatePhoneNumber()}
                                        value={this.state.mobileNumber}
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
                            <Text style={styles.inputField}>{I18n.t('postal_code')}</Text>
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
                    </View>
                </View>
                <View style={styles.breadcrumbBorder} />
            </>
        )
    }

    render() {
        const { showGCC, userAddress, addAddressValue, activityIndicator, defaultAddressType } = this.state
        const { cartData } = this.props
        return (
            <View style={{ flex: 1 }}>
                <HeaderComm changeLang={this.changeLang} navigation={this.props.navigation} onRef={instance => { this.instance = instance; }} classObj={this} {...this.props}/>
                {activityIndicator ?
                    <View style={{ flex: 1 }}>
                        {/* { Object.keys(cartData).length > 0 ? */}
                        <ScrollView showsVerticalScrollIndicator={false}>
                            <View>
                                {addAddressValue ?
                                    <View>
                                        {this.renderContactnformation()}
                                    </View> :
                                    <View>{this.renderContactnformation()}
                                        <View style={styles.buttonContainer}>
                                            <TouchableOpacity
                                                disabled={this.state.buttonDisableEnable}
                                                style={[styles.newButton, { opacity: (this.state.buttonDisableEnable ? 0.7 : 1) }]}
                                                activeOpacity={.5}
                                                onPress={() => this.cancelAddress()}>
                                                <Text style={styles.TextStyle}> {I18n.t('cancel')} </Text>
                                            </TouchableOpacity>
                                        </View>
                                    </View>
                                }
                            </View>
                            <View style={[styles.inputView, { padding: scale(20) }]}>
                                <Text style={styles.inputField}>{I18n.t('addressType')}</Text>
                                <View style={{ paddingVertical: scale(10) }}>
                                    <RadioForm
                                        radio_props={radio_props}
                                        animation={false}
                                        initial={this.state.defaultAddressType}
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

                            <View style={[styles.inputView, { padding: scale(20) }]}>
                                <Text style={styles.inputField}>{I18n.t('primaryAddress')}</Text>
                                <View style={{ flexDirection: 'row', paddingVertical: scale(10) }}>
                                    <TouchableOpacity style={[styles.yesNoBox, this.state.deliveryFlag ? { backgroundColor: '#f693b9' } : { backgroundColor: '#f5f5f5' }]} onPress={() => this.setState({ deliveryFlag: true })}>
                                        <Text>{I18n.t('yes')}</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity style={[styles.yesNoBox, !this.state.deliveryFlag ? { backgroundColor: '#f693b9' } : { backgroundColor: '#f5f5f5' }]} onPress={() => this.setState({ deliveryFlag: false })}>
                                        <Text>{I18n.t('no')}</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </ScrollView>
                        <View style={[styles.border, { flexDirection: 'row', justifyContent: 'flex-end', paddingVertical: scale(10) }]}>
                            <TouchableOpacity
                                style={[styles.cancelButton, { opacity: (this.state.buttonDisableEnable ? 0.7 : 1) }]}
                                activeOpacity={.5}
                                onPress={() => this.closeImg()}>
                                <Text style={styles.cancelStyle}> {I18n.t('cancel')} </Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                disabled={this.state.buttonDisableEnable}
                                style={[styles.saveButton, { opacity: (this.state.buttonDisableEnable ? 0.2 : 1) }]}
                                activeOpacity={.5}
                                onPress={() => this.doProceed()}>
                                <Text style={styles.saveStyle}> {I18n.t('save')} </Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                    : <View style={{ flex: 1, justifyContent: 'center' }}>
                        <ActivityIndicator size="large" color="#0000ff" />
                    </View>}
            </View>
        );
    }
}



function mapStateToProps(state) {
    const { CommonReducer, ProfileReducer } = state;
    return {
        countryList: CommonReducer.allCountryData,
        countryListStatus: CommonReducer.allCountryStatus,

        updateAddress: ProfileReducer.updateAddress,
        updateAddressStatus: ProfileReducer.updateAddressStatus,

    };
}
const mapDispatchToProps = (dispatch) => {
    return {
        getCountryList: () => {
            dispatch(getAllCountry())
        },
        updateAddress: (obj) => {
            dispatch(addUpdateAddress(obj))
        },
        clearAllUpdateAddressData: () => {
            dispatch(clearUpdateAddressData())
        },
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(EditAddress);