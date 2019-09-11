import React, { Component } from 'react';
import {
  Platform, StyleSheet, Text, TextInput, Modal, View, ScrollView, Button, TouchableOpacity, Alert, Keyboard, Image, TouchableHighlight, Linking,
  ActivityIndicator
} from 'react-native';

import Ionicons from "react-native-vector-icons/FontAwesome";
import styles from './Style';
import Validators from '../../utils/Validators';
import * as MESSAGE from '../../utils/Message';
import { scale, verticalScale } from '../../utils/Scale';
import COMMONSTYLE from '../../utils/Style';
import * as CONSTV from '../../utils/Const';
import * as COLORS from '../../utils/Color'
import MaterialIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { connect } from 'react-redux';
import { passwordReset, clearPasswordReset } from '../../actions/ForgotPassAction';
import { getSignInData, clearSignIn } from '../../actions/SignInAction';
import { addToWishListProduct } from '../../actions/CommonAction';
import Util from '../../utils/Util'
import NetInfo from "@react-native-community/netinfo"
import { networkLost, networkAvailable } from '../../actions/CommonAction';
import I18n from '../../localization/index';
import SubHeader from '../../common/header/subHeader';
import Footer from '../../common/footer';
import HeaderComm from '../../common/header/header';
import PhoneInput from 'react-native-phone-input';
import CheckBox from 'react-native-check-box';
import showToast from "../../helper/Toast";

let product_id = '';
class SignIn extends Component {

  constructor(props) {
    super(props);

        this.state = {
            //sign-in Page
            signInData: {},
            userName: '',
            userPassword: '',
            userNameError: null,
            userPasswordError: null,
            showResetPass: false,
            networkStatus: true,
            buttonDisableEnable: true,
            emailError: null,
            email: '',
            isChecked: false,
            mobileError: null,
            mobileNumber: '',
            buttonDisableEnable2: true,
            forgotPassData: {},
            hideShow: true,
            countryCode: '91',
            invalidCountryCode: false,
            forgotStatus: '',
            activityIndicator: true,
            comesFrom: this.props.comesFrom1,
            addToWishListData: {},
            GQuoteId: null,
            storeId: null,
        }
    }

    componentDidMount() {
        //var obj = { email: userName, password: userPassword, guestquote: '' }
        //this.props.getHomePageBanners(obj);
    }

    componentDidUpdate(prevProps) {
        const prevParam = prevProps.navigation.state.params
        product_id = this.props.navigation.state.params
    }

    handleConnectionChange = (isConnected) => {
        this.setState({ networkStatus: isConnected });
        if (isConnected == true) {
            this.props.updateNetworkAvailable();
        }
        else {
            this.props.updateNetworkLost();
        }
    }
    async componentWillMount() {
        NetInfo.isConnected.addEventListener('connectionChange', this.handleConnectionChange);
        NetInfo.isConnected.fetch().then(
            (isConnected) => {
                if (isConnected == true) {
                    this.props.updateNetworkAvailable();
                }
                else {
                    this.props.updateNetworkLost();
                }

        this.setState({ networkStatus: isConnected });
      }
    );
    Util.getAsyncStorage('SELECTED_COUNTRY_LANGUAGE').then((language) => {
        this.setState({ storeId: language.store_id });
    });
    Util.getAsyncStorage('G_quote_id_digit').then((Gdata) => {
        this.setState({ GQuoteId: Gdata });
    });

    Util.getAsyncStorage('rememberMe').then((user) => {
        this.setState({ userName: user.userName , userPassword: user.userPassword, isChecked : user.isChecked});
        this.checkButtonDisableEnable();
    });
  }
  componentWillUnmount() {
    NetInfo.isConnected.removeEventListener('connectionChange', this.handleConnectionChange);
    this.setState({
      userName: '',
      userPassword: '',
      buttonDisableEnable: true,
    });
  }

    ChangeHideShow = () => {
        if (this.state.hideShow) {
            this.setState({ hideShow: false });
        } else {
            this.setState({ hideShow: true });
        }
    }

    componentWillReceiveProps(nextProps) {
        const { comesFrom, isChecked, userPassword, userName } = this.state
        this.setState({ activityIndicator: true });
        if (nextProps.status === 'SIGN_IN_DATA_SUCCESS') {
            if(isChecked){
                var obj = {userName: userName.trim(), userPassword: userPassword.trim() , isChecked: true}
                Util.setAsyncStorage('rememberMe', obj);
            }else{
                var obj = {userName: "", userPassword: "" , isChecked: false}
                Util.setAsyncStorage('rememberMe', obj);
            }
            Util.setAsyncStorage('SIGN_IN_DATA', nextProps.signInData.customer_details)
            Util.setAsyncStorage('S_quote_id_digit', nextProps.signInData.customer_details.quote_id)
            // AsyncStorage.setItem('SIGN_IN_DATA',  JSON.stringify(nextProps.signInData.customer_details))
            showToast(I18n.t('signInSuccess'), true);
            this.setState({
                userName: '',
                userPassword: '',
                buttonDisableEnable: true,
            });
            if (comesFrom !== 'checkout') {
                this.props.navigation.navigate("Home");
            } else {
                this.props.classObj.setState({ signInFlag: true })
            }
            if(product_id !== undefined){
                Util.getAsyncStorage('SIGN_IN_DATA').then((data) => {
                    if(product_id.product_id && data.customer_id){
                        obj = {
                            customer_id: data.customer_id,
                            product_id: product_id.product_id
                        }
                        this.props.addToWishList(obj);
                    }
                    
                });
            }
            this.props.clearSignInData();
        } else if (nextProps.forgotStatus === 'FAILED') {
            showToast(nextProps.forgotPassData.message, true);
            this.setState({
                showResetPass: true,
                //email: '',
                //mobileNumber: '',
                emailError: nextProps.forgotPassData.message,
                buttonDisableEnable2: true,
                countryCode: '91',
            })
            this.props.clearForgot();
        } else if (nextProps.forgotStatus === 'SUCCESS') {
            showToast(nextProps.forgotPassData.message, true);
            this.setState({
                showResetPass: false,
                email: '',
                mobileNumber: '',
                buttonDisableEnable2: true,
                countryCode: '91',
            })
            this.props.clearForgot();
        } else if (nextProps.status === 'SIGN_IN_DATA_FAILED') {
            showToast(nextProps.signInData, true);
            this.setState({
                userName: '',
                userPassword: '',
                buttonDisableEnable: true,
            });
            this.props.clearSignInData();
        }
    }

    signInDataReceived() {
        const result = this.props.signInData;

    }

    async signIn() {
        const { userName, userPassword, GQuoteId } = this.state;
        const { comesFrom } = this.state
        var obj = {};
        if(comesFrom === 'checkout') {
                if (GQuoteId !== null) {
                    obj = { email: userName.trim(), password: userPassword.trim(), guestquote: GQuoteId };
                } else {
                    //obj = { email: userName.trim(), password: userPassword.trim(), guestquote: '' };
                }
        } else {
            obj = { email: userName.trim(), password: userPassword.trim(), guestquote: '' };
        }
        
        this.setState({ activityIndicator: false });
        if (obj !== null) {
            try {
                Keyboard.dismiss();
                this.props.getSignIn(obj);
            } catch (err) {
                // this.setState({ reasonForFailure: err, showAlert: true, alertHeading: MESSAGE.LOGIN_FAILED, alertMessage: MESSAGE.LOGIN_FAILED_MESSAGE, alertType: 'YES_CANCEL' });
            }
        }
    }

    handleUserNameInputChange = (userName) => {
        this.setState({ userName: userName });
        if (Validators.isEmpty(userName)) {
            this.setState({ userNameError: MESSAGE.USERNAME_NAME_REQ });
        } else if (userName.indexOf(" ") != -1) {
            this.setState({ userNameError: MESSAGE.NO_SPACE_ALLOWED_USERNAME });
        } else {
            this.setState({ userNameError: null });
        }
    }

    handleUserPasswordInputChange = (userPassword) => {
        this.setState({ userPassword: userPassword });
        if (Validators.isEmpty(userPassword)) {
            this.setState({ userPasswordError: MESSAGE.PASS_REQ });
        } else if (userPassword.length > 20) {
            this.setState({ userPasswordError: MESSAGE.PASSWORD_MAX_LENGTH_EXCEEDED });
        } else if (userPassword.indexOf(" ") != -1) {
            this.setState({ userPasswordError: MESSAGE.NO_SPACE_ALLOWED_TEXT });
        } else {
            this.setState({ userPasswordError: null });
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


    forgotPassword = () => {
        this.setState({
            showResetPass: true
        })
    }

    async restPassword() {
        const { email, mobileNumber, countryCode, storeId } = this.state;
        var obj = { carrier_code: parseInt(countryCode, 10), contact_number: parseInt(mobileNumber, 10), email: email.trim(), store_id: storeId }
        this.setState({ activityIndicator: false });
        if (obj !== null) {
            try {
                this.props.callForgotPass(obj);
                this.setState({
                    //emailError: null,
                    //email: '',
                    //mobileError: null,
                    //mobileNumber: '',
                    buttonDisableEnable2: true, 
                });
            } catch (err) {

            }
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
    checkButtonDisableEnable() {
        setTimeout(() => {
            const { userName, userPassword } = this.state;
            const { userNameError, userPasswordError } = this.state;
            if (Validators.isEmpty(userName) || Validators.isEmpty(userPassword) || userNameError !== null || userPasswordError !== null) {
                this.setState({ buttonDisableEnable: true })
            } else {
                this.setState({ buttonDisableEnable: false })
            }
        }, 100);

    }

    checkButtonDisableEnable2() {
        setTimeout(() => {
            const { email, mobileNumber } = this.state;
            const { emailError, mobileError } = this.state;

            if (Validators.isEmpty(email) || Validators.isEmpty(mobileNumber) ||
                emailError !== null || mobileError !== null) {
                this.setState({ buttonDisableEnable2: true })
            } else {
                this.setState({ buttonDisableEnable2: false })
            }
        }, 100);
    }

    renderCustomAlert() {
        if (this.state.alertType == 'OK') {
            return (
                <CustomAlert okPressed={() => { this.setState({ showAlert: false }); this.checkNetCnnection(); }} text1={this.state.alertHeading} text2={this.state.alertMessage} alertType={this.state.alertType} />
            )
        } else {
            return (
                <CustomAlert yesPressed={() => { this.setState({ showAlert: false }); BackHandler.exitApp() }} cancelPressed={() => { this.setState({ showAlert: false }); }} text1={this.state.alertHeading} text2={this.state.alertMessage} alertType={this.state.alertType} />
            )
        }
    }

    changeLang = (lang) => {
        if (lang === 'en') {
            I18n.locale = 'en';
            this.setState({ text: 'en' })
        } else {
            I18n.locale = 'ar';
            this.setState({ text: 'ar' })
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
                //showToast(MESSAGE.INVALID_COUNTRY_CODE, true);
                Alert.alert('Invalid Country Code');
                this.setState({ countryCode: '' });
            }
            this.setState({ countryCode: newText });
        }
        if (text.length >= 3) {
            //this.focusNextField('mobileNumberBox');
        }
        setTimeout(() => {
            this.validatePhoneNumber();
        }, 10);
    }

    validatePhoneNumber() {
        const { countryCode, mobileNumber } = this.state;
        var cCode = parseInt(countryCode, 10);
        var mNumber = parseInt(mobileNumber, 10);
        if(cCode === 966 || cCode === 971) {
            if(!Validators.is09Digit(mNumber)) {
                this.setState({ mobileError: MESSAGE.MOBILE_09DIGIT })
            } 
        } else if(cCode === 91 || cCode === 1) {
            if(!Validators.is10Digit(mNumber)) {
                this.setState({ mobileError: MESSAGE.MOBILE_10DIGIT })
            }
        }
    }

    updateClassObj() {
    }

    setStateOf() {
        this.setState({ showResetPass: false, 
                        emailError: null,
                        email: '',
                        mobileError: null,
                        mobileNumber: '',
                        buttonDisableEnable2: true,  });
    }

    showResetPassModal() {
        return (
            <View>
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={this.state.showResetPass}
                    onRequestClose={() => {

                    }}
                >
                    <View style={COMMONSTYLE.content}>
                        <View style={[COMMONSTYLE.container, { backgroundColor: '#fff' }]}>
                            <View style={[COMMONSTYLE.descriptionBtnContainer]}>
                                <View style={[COMMONSTYLE.heading, { paddingVertical: verticalScale(20) }]}>
                                    <View style={{ flexDirection: 'row' }}>
                                        <Text style={{ fontSize: scale(20), fontWeight: '400' }}>{I18n.t('passwordReset')}</Text>
                                        <MaterialIcons
                                            name='close-circle-outline'
                                            onPress={() => { this.setStateOf() }}
                                            size={scale(25)}
                                            style={{ textAlign: 'left', left: scale(60) }}
                                        />
                                    </View>
                                </View>
                                <View>
                                    <View style={styles.inputBox}>
                                        <Text style={styles.inputField}>{I18n.t('emailAddress')}</Text>
                                        <TextInput
                                            style={styles.textBox}
                                            textAlign = {I18n.locale === 'ar' ? 'right' : 'left'}
                                            //placeholder="Email Address"
                                            autoCorrect={true}
                                            underlineColorAndroid="transparent"
                                            autoCapitalize='words'
                                            onChange={() => { this.checkButtonDisableEnable2(); }}
                                            keyboardType="default"
                                            value={this.state.email}
                                            onBlur={e => this.validate()}
                                            onChangeText={this.handleEmailInputChange}>
                                        </TextInput>
                                        {
                                            this.state.emailError ?
                                                <Text style={[styles.paragraphNormal, styles.error]}>{this.state.emailError}</Text> : <View />
                                        }
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
                                                    onPressFlag={this.onPressFlag}
                                                    onChange={() => { this.checkButtonDisableEnable2(); }}
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
                                                    onChange={() => { this.checkButtonDisableEnable2(); }}></TextInput>
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
                                </View>

                                <View style={COMMONSTYLE.btnMain}>
                                    <TouchableOpacity
                                        onPress={() => this.restPassword()}
                                        disabled={this.state.buttonDisableEnable2}
                                        style={[styles.newButton, { opacity: (this.state.buttonDisableEnable2 ? 0.7 : 1) }]}
                                        activeOpacity={.5}>
                                        <Text style={styles.TextStyle}>{I18n.t('Send')}</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>
                    </View>
                </Modal>
            </View>
        )
    }

    // signIn() {
    //   Alert.alert('You Clicked On Sign In');
    // }

    createAccount() {
        Alert.alert('You Clicked On Create Account');
    }

    render() {
        const { comesFrom } = this.state
        const signInData = this.props.signInData;
        return (
            <View style={{ flex: 1 }}>
                {/* <SubHeader headerTitle = {CONSTV.SIGNIN_TEXT}  {...this.props}/> */}
                {comesFrom == 'checkout' ? <View /> : <HeaderComm changeLang={this.changeLang} navigation={this.props.navigation} onRef={instance => { this.instance = instance; }} classObj={this} {...this.props}/>}
                {this.state.activityIndicator ?
                    <ScrollView showsVerticalScrollIndicator={false}>
                        <View style={styles.mainContainer}>
                            <View>
                                {/* <Text style={styles.title}>R<Text>{'\u200A'}</Text>E<Text>{'\u200A'}</Text>G<Text>{'\u200A'}</Text>I<Text>{'\u200A'}</Text>S<Text>{'\u200A'}</Text>T<Text>{'\u200A'}</Text>E<Text>{'\u200A'}</Text>R<Text>{'\u200A'}</Text>E<Text>{'\u200A'}</Text>D<Text>{'\u200A'}</Text> C<Text>{'\u200A'}</Text>U<Text>{'\u200A'}</Text>S<Text>{'\u200A'}</Text>T<Text>{'\u200A'}</Text>O<Text>{'\u200A'}</Text>M<Text>{'\u200A'}</Text>E<Text>{'\u200A'}</Text>R<Text>{'\u200A'}</Text>S<Text>{'\u200A'}</Text></Text> */}
                                <Text style={styles.title1}>{I18n.t('REGISTERED_CUSTORMERS')}</Text>
                                <Text style={styles.belowTitle}>{I18n.t('TEXT1')}</Text>
                            </View>
                            <View style={styles.inputBox}>
                                <Text style={styles.placeholderText}>{I18n.t('USERNAME')}</Text>
                                <TextInput
                                    style={styles.textBox}
                                    autoCorrect={false}
                                    textAlign = {I18n.locale === 'ar' ? 'right' : 'left'}
                                    underlineColorAndroid="transparent"
                                    keyboardType="default"
                                    value={this.state.userName}
                                    onChangeText={this.handleUserNameInputChange}
                                    onChange={() => { this.checkButtonDisableEnable(); }}></TextInput>
                                {
                                    this.state.userNameError ?
                                        <Text style={[styles.paragraphNormal, styles.error]}>{this.state.userNameError}</Text> : <View />
                                }
                            </View>
                            <View style={styles.inputBox}>
                                <Text style={styles.placeholderText}>{I18n.t('PASSWORD')}</Text>
                                <TextInput
                                    style={styles.textBox}
                                    autoCorrect={false}
                                    textAlign = {I18n.locale === 'ar' ? 'right' : 'left'}
                                    underlineColorAndroid="transparent"
                                    autoCapitalize='none'
                                    keyboardType="default"
                                    secureTextEntry={this.state.hideShow}
                                    value={this.state.userPassword}
                                    onChangeText={this.handleUserPasswordInputChange}
                                    onChange={() => { this.checkButtonDisableEnable(); }}></TextInput>
                                <TouchableOpacity style={[styles.iconHideShow]} onPress={this.ChangeHideShow}>
                                    <MaterialIcons
                                        name={this.state.hideShow ? "eye-outline" : "eye-off-outline"}
                                        color='#58606C'
                                        size={scale(20)}
                                    />
                                    <Text style={[styles.paragraphSmall, styles.hideShow]}> {this.state.hideShow ? 'Show' : 'Hide'}</Text>
                                </TouchableOpacity>
                                {
                                    this.state.userPasswordError ?
                                        <Text style={[styles.paragraphNormal, styles.error]}>{this.state.userPasswordError}</Text> : <View />
                                }
                            </View>
                            <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between', paddingVertical: verticalScale(6), }}>
                                <TouchableOpacity onPress={() => this.forgotPassword()}>
                                    <Text>{I18n.t('FORGOT_PASSWORD')} ?</Text>
                                </TouchableOpacity>
                                {this.state.showResetPass ? <View>{this.showResetPassModal()}</View> : <View />}
                            </View>
                            <View style={{ flex: 1, flexDirection: 'row'}}>
                            <CheckBox
                                style={{flex: 1, paddingHorizontal:scale(10),paddingTop:scale(15)}}
                                onClick={()=>{
                                  this.setState({
                                      isChecked:!this.state.isChecked
                                  })
                                }}
                                isChecked={this.state.isChecked}
                                rightText={I18n.t('remeber_me')}
                            />
                            </View>
                            <View style={{ flex: 9, paddingVertical: verticalScale(5) }}>
                                <TouchableOpacity
                                    disabled={this.state.buttonDisableEnable}
                                    style={[styles.newButton, { opacity: (this.state.buttonDisableEnable ? 0.7 : 1) }]}
                                    onPress={() => this.signIn()}>
                                    <Text style={styles.TextStyle}> {I18n.t('SECURE_SIGN_IN')} </Text>
                                </TouchableOpacity>
                            </View>
                            {comesFrom == 'checkout' ? <View>
                                <Text style={[styles.title, styles.paddingVertical30]}>{I18n.t('checkOutAsGuest')}</Text>
                                <View style={{ paddingVertical: verticalScale(20) }}>
                                    <TouchableOpacity
                                        style={[styles.newButton]}
                                        onPress={() => this.props.classObj.setState({ signInFlag: true })}
                                    >
                                        <Text style={styles.TextStyle}> {I18n.t('checkOutAsGuestButton')} </Text>
                                    </TouchableOpacity>
                                </View>
                            </View> : <View />}

                            <View>
                                {/* <Text style={[styles.title, styles.paddingVertical30]}><Text>{'\u200A'}</Text>C<Text>{'\u200A'}</Text>R<Text>{'\u200A'}</Text>E<Text>{'\u200A'}</Text>A<Text>{'\u200A'}</Text>T<Text>{'\u200A'}</Text>E<Text>{'\u200A'}</Text> A<Text>{'\u200A'}</Text>N<Text>{'\u200A'}</Text> <Text>{'\u200A'}</Text>A<Text>{'\u200A'}</Text>C<Text>{'\u200A'}</Text>C<Text>{'\u200A'}</Text>O<Text>{'\u200A'}</Text>U<Text>{'\u200A'}</Text>N<Text>{'\u200A'}</Text>T<Text>{'\u200A'}</Text></Text> */}
                                <Text style={[styles.title, styles.paddingVertical30]}>{I18n.t('CREATE_AN_ACCOUNT1')}</Text>
                                <Text style={[styles.belowTitle, styles.paddingBottom30,]}>{I18n.t('TEXT2')}</Text>
                                <View style={styles.bulletStyle}>
                                    <Text style={styles.allText}>{'\u2022'}</Text>
                                    <Text style={styles.width95}>{I18n.t('ORDER_TRACKING')}</Text>
                                </View>
                                <View style={styles.bulletStyle}>
                                    <Text style={styles.allText}>{'\u2022'}</Text>
                                    <Text style={styles.width95}>{I18n.t('WISHLIST')}</Text>
                                </View>
                                <View style={styles.bulletStyle}>
                                    <Text style={styles.allText}>{'\u2022'}</Text>
                                    <Text style={styles.width95}>{I18n.t('SAVE_ADDRESSES')}</Text>
                                </View>
                                <View style={styles.bulletStyle}>
                                    <Text style={styles.allText}>{'\u2022'}</Text>
                                    <Text style={styles.width95}>{I18n.t('ACCOUNT_PREFERENCES')}</Text>
                                </View>
                            </View>
                            <View style={{ paddingVertical: verticalScale(20) }}>
                            {comesFrom == 'checkout' ?
                                <TouchableOpacity
                                    style={[styles.newButton]}
                                    onPress={() => this.props.navigation.navigate("SignUp", {comesFrom: comesFrom, 'updateClassObj': () => {this.updateClassObj()}})}>
                                    <Text style={styles.TextStyle}> {I18n.t('CREATE_AN_ACCOUNT')} </Text>
                                </TouchableOpacity> : 
                                <TouchableOpacity
                                style={[styles.newButton]}
                                onPress={() => this.props.navigation.navigate("SignUp", {comesFrom: '', classObj: this.props.classObj})}>
                                <Text style={styles.TextStyle}> {I18n.t('CREATE_AN_ACCOUNT')} </Text>
                                </TouchableOpacity> }
                            </View>
                        </View>

                        {comesFrom == 'checkout' ? <View /> : <Footer {...this.props} />}
                    </ScrollView> : <View style={{ flex: 1, justifyContent: 'center' }}>
                        <ActivityIndicator size="large" color="#0000ff" />
                    </View>}
                {this.state.showAlert ?
                    <View>{this.renderCustomAlert()}</View> : <View />}
            </View>
        );
    }
}

function mapStateToProps(state) {
    const { SignInReducer, ForgotPassReducer, CommonReducer} = state;
    return {
        forgotPassData: ForgotPassReducer.forgotPassData,
        forgotStatus: ForgotPassReducer.status,
        signInData: SignInReducer.signInData,
        status: SignInReducer.status,
        addToWishListData: CommonReducer.addToWishListData
    };
}
const mapDispatchToProps = (dispatch) => {
    return {
        getSignIn: (obj) => {
            dispatch(getSignInData(obj))
        },
        callForgotPass: (obj) => {
            dispatch(passwordReset(obj))
        },
        updateNetworkLost: () => {
            dispatch(networkLost());
        },
        updateNetworkAvailable: () => {
            dispatch(networkAvailable());
        },
        addToWishList: (obj) => {
            dispatch(addToWishListProduct(obj))
        },
        clearForgot: () => {
            dispatch(clearPasswordReset());
        },
        clearSignInData: () => {
            dispatch(clearSignIn());
        }
    };

};

export default connect(mapStateToProps, mapDispatchToProps)(SignIn);
