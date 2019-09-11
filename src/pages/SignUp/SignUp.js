
import React, { Component } from 'react';
import { Platform, StyleSheet, Text, TextInput, View, ScrollView, Button, TouchableOpacity, Alert, Image, TouchableHighlight, Linking, Keyboard, ActivityIndicator } from 'react-native';
import MaterialIcons from "react-native-vector-icons/MaterialCommunityIcons";
import PhoneInput from 'react-native-phone-input';

import Validators from '../../utils/Validators';
import * as MESSAGE from '../../utils/Message';
import { scale, verticalScale } from '../../utils/Scale';
import * as COLORS from '../../utils/Color';

import styles from './StyleS';
import { connect } from 'react-redux';
import { getSignUpData, clearSignUpData } from '../../actions/SignUpAction';
import NetInfo from "@react-native-community/netinfo"
import { networkLost, networkAvailable } from '../../actions/CommonAction';
import showToast from "../../helper/Toast";
import * as CONSTV from '../../utils/Const';
import SubHeader from '../../common/header/subHeader';
import I18n from '../../localization/index';
import Footer from '../../common/footer';
import HeaderComm from '../../common/header/header';
import Util from '../../utils/Util';

class SignUp extends Component {
    // static navigationOptions = ({ navigation, props }) => ({
    //     title: "Sign Up",
    //     headerTitleStyle: {
    //         //width: '60%',
    //         flex: 1,
    //         fontSize: 18,
    //         fontWeight: '500',
    //         textAlign: 'center'
    //     },
    //     headerStyle: {
    //         backgroundColor: '#faced7',
    //         shadowOpacity: 0.25,
    //         shadowOffset: {
    //             height: 1,
    //         },
    //         shadowRadius: 5,
    //     },
    // });

    constructor(props) {
        super(props);

        this.state = {
            firstName: '',
            lastName: '',
            mobileNumber: '',
            email: '',
            password: '',
            confirmPassword: '',
            hideShow: true,
            hideShowConfirm: true,
            countryCode: '91',
            invalidCountryCode: false,
            networkStatus: true,
            firstNameError: null,
            lastNameError: null,
            emailError: null,
            mobileError: null,
            passwordHelp: '',
            passwordError: null,
            confirmPasswordError: null,
            passwordHelp: '',
            buttonDisableEnable: true,
            signUpData: {},
            activityIndicator: true,
            comesFrom: this.props.navigation.state.params.comesFrom,

            emailAlreadyExist: '',
            mobileAlreadyExist: '',
            //comesFrom: '',
            GQuoteId: null,

        }
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

        Util.getAsyncStorage('G_quote_id_digit').then((Gdata) => {
            this.setState({ GQuoteId: Gdata });
        });
    }
    
    componentWillUnmount() {
        NetInfo.isConnected.removeEventListener('connectionChange', this.handleConnectionChange);
    }

    componentWillReceiveProps(nextProps) {
        const { comesFrom } = this.state;
        this.setState({ activityIndicator: true });
        if (nextProps.status === 'SIGN_UP_DATA_SUCCESS') {
            this.setState({
                firstName: '',
                lastName: '',
                mobileNumber: '',
                email: '',
                password: '',
                confirmPassword: '',
                hideShow: true,
                hideShowConfirm: true,
                countryCode: '91',
                buttonDisableEnable: true,
            });
            showToast('You\'re Account is Created Successfully');
            // if(comesFrom === 'checkout') {
            //     this.props.classObj.setState({ signInFlag: true });
            // } else {
            //     this.props.navigation.navigate("SignIn");
            // }
            if (comesFrom != 'checkout') {
                this.props.navigation.navigate("SignIn");
            } else {
                //this.props.classObj.setState({ signInFlag: true });
                this.props.navigation.navigate("Checkout", {comesFrom: 'SignUp'});
            }
        } else if(nextProps.status === 'SIGN_UP_DATA_FAILED') {
            showToast(nextProps.signUpData, true);
            this.setState({ buttonDisableEnable: true });
            this.props.clearAllSignUpData();
        }
    }


    async signUp() {
        const { firstName, lastName, mobileNumber, email, password, confirmPassword, countryCode, comesFrom, GQuoteId } = this.state;
        Util.getAsyncStorage('SELECTED_COUNTRY_LANGUAGE').then((select) => {
            var obj = {};
            if(comesFrom === 'checkout') {
                    if (GQuoteId !== null) {
                        obj = { carrier_code: parseInt(countryCode, 10), firstname: firstName.trim(), lastname: lastName.trim(), contact_number: parseInt(mobileNumber, 10), email: email.trim(), password: password.trim(), confirmpassword: confirmPassword.trim(), store_id: select.store_id, quest_quote: GQuoteId };
                    } 
            } else {
                obj = { carrier_code: parseInt(countryCode, 10), firstname: firstName.trim(), lastname: lastName.trim(), contact_number: parseInt(mobileNumber, 10), email: email.trim(), password: password.trim(), confirmpassword: confirmPassword.trim(), store_id: select.store_id, quest_quote: '' };
            }
            this.setState({ activityIndicator: false });
            if (obj !== null) {
                try {
                    Keyboard.dismiss();
                    this.props.doSignUp(obj);
                } catch (err) {
                    // this.setState({ reasonForFailure: err, showAlert: true, alertHeading: MESSAGE.LOGIN_FAILED, alertMessage: MESSAGE.LOGIN_FAILED_MESSAGE, alertType: 'YES_CANCEL' });
                }
            }
        });
        

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


    ChangeHideShow = () => {
        setTimeout(() => {
            if (this.state.hideShow) {
                this.setState({ hideShow: false });
            } else {
                this.setState({ hideShow: true });
            }
        }, 100);
    }

    ChangeHideShowConfirm = () => {
        if (this.state.hideShowConfirm) {
            this.setState({ hideShowConfirm: false });
        } else {
            this.setState({ hideShowConfirm: true });
        }
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

    handlePasswordInputChange = (password) => {
        if (Platform.OS == 'ios') {
            setTimeout(() => {
                this.setState({ password: password });
            }, 1);
        } else {
            this.setState({ password: password });
        }
        //this.setState({ password: password });
        if (Validators.isEmpty(password)) {
            this.setState({ passwordError: MESSAGE.PASS_REQ });
        } else if (password.length > 20) {
            this.setState({ passwordError: MESSAGE.PASSWORD_MAX_LENGTH_EXCEEDED });
        } else if (password.indexOf(" ") != -1) {
            this.setState({ passwordError: MESSAGE.NO_SPACE_ALLOWED_TEXT });
        } else if (!Validators.passwordPolicy(this.state.password)) {
            this.setState({ passwordError: null });
            this.setState({ passwordHelp: MESSAGE.HELP_TEXT });
        } else if (this.state.confirmPassword !== password && this.state.confirmPassword !== '') {
            this.setState({ confirmPasswordError: MESSAGE.PASSWORD_CONFIRM_PASSWORD_MISMATCH });
        } else if (this.state.confirmPassword === password && this.state.confirmPassword !== '') {
            this.setState({ confirmPasswordError: null })
        } else {
            this.setState({ passwordError: null });
        }
    }

    handleConfirmPasswordInputChange = (confirmPassword) => {
        this.setState({ confirmPassword: confirmPassword });
        if (this.state.password !== confirmPassword) {
            this.setState({ confirmPasswordError: MESSAGE.PASSWORD_CONFIRM_PASSWORD_MISMATCH });
        } else if (confirmPassword !== this.state.password) {
            this.setState({ passwordError: MESSAGE.PASSWORD_CONFIRM_PASSWORD_MISMATCH });
        } else {
            this.setState({ confirmPasswordError: null, passwordHelp: null })
        }
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

    checkButtonDisableEnable() {
        setTimeout(() => {
            const { firstName, lastName, email, countryCode, mobileNumber, password, confirmPassword, invalidCountryCode } = this.state;
            const { firstNameError, lastNameError, emailError, mobileError, passwordError, confirmPasswordError } = this.state;

            if (Validators.isEmpty(firstName) || Validators.isEmpty(lastName) || Validators.isEmpty(email) ||
                Validators.isEmpty(countryCode) || Validators.isEmpty(mobileNumber) || Validators.isEmpty(password) ||
                Validators.isEmpty(confirmPassword) || firstNameError !== null || lastNameError !== null || emailError !== null || mobileError !== null || passwordError !== null || confirmPasswordError !== null) {
                this.setState({ buttonDisableEnable: true })
            } else {
                this.setState({ buttonDisableEnable: false })
            }
        }, 100);

    }

    onClickValue() {
        Alert.alert('name');
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
        Util.getAsyncStorage('ALL_COUNTRY_AND_LANGUAGE').then((data) => {
            Util.getAsyncStorage('SELECTED_COUNTRY_LANGUAGE').then((select) => {
                for(var i in data.data){
                    if(data.data[i].country == select.country && data.data[i].language == lang){
                        Util.setAsyncStorage('SELECTED_COUNTRY_LANGUAGE', data.data[i]);
                        this.setState({ text: lang })
                    }
                }
            });
        });
    }

    render() {
        return (
            <View style={{ flex: 1 }}>
                {/* <SubHeader headerTitle = {CONSTV.SIGNUP_TEXT}  {...this.props}/> */}
                <HeaderComm changeLang={this.changeLang} navigation={this.props.navigation} onRef={instance => { this.instance = instance; }} classObj={this} {...this.props}/>
                {this.state.activityIndicator ?
                <ScrollView showsVerticalScrollIndicator={false}>
                    <View style={styles.container}>
                        <View style={styles.signupContainer}>
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
                                        {
                                            this.state.mobileAlreadyExist ?
                                                <Text style={[styles.paragraphNormal, styles.error]}>{this.state.mobileAlreadyExist}</Text> : <View />
                                        }
                                    </View>
                                </View>
                            </View>
                            <View style={styles.inputView}>
                                <Text style={styles.inputField}>{I18n.t('EMAIL')}</Text>
                                <TextInput
                                    style={[(this.state.emailError ? styles.inputFieldTextError : styles.inputFieldText)]}
                                    //placeholder="Email Address"
                                    textAlign = {I18n.locale === 'ar' ? 'right' : 'left'}
                                    autoCorrect={false}
                                    autoCapitalize='none'
                                    underlineColorAndroid="transparent"
                                    keyboardType="default"
                                    value={this.state.email}
                                    onChangeText={this.handleEmailInputChange}
                                    onBlur={e => this.validate()}
                                    onChange={() => { this.checkButtonDisableEnable(); }}></TextInput>
                                {
                                    this.state.emailError?
                                        <Text style={[styles.paragraphNormal, styles.error]}>{this.state.emailError}</Text> : <View />
                                }
                                {
                                    this.state.emailAlreadyExist ?
                                        <Text style={[styles.paragraphNormal, styles.error]}>{this.state.emailAlreadyExist}</Text> : <View />
                                }
                            </View>
                            <View style={styles.inputView}>
                                <Text style={styles.inputField}>{I18n.t('PASSWORD')}</Text>
                                <TextInput
                                    style={[(this.state.passwordError ? styles.inputFieldTextError : styles.inputFieldText)]}
                                    //placeholder="Password"
                                    textAlign = {I18n.locale === 'ar' ? 'right' : 'left'}
                                    autoCorrect={false}
                                    underlineColorAndroid="transparent"
                                    autoCapitalize='none'
                                    keyboardType="default"
                                    secureTextEntry={this.state.hideShow}
                                    value={this.state.password}
                                    onChangeText={this.handlePasswordInputChange}
                                    onChange={() => { this.checkButtonDisableEnable(); }}
                                    onBlur={() => {
                                        (!this.state.passwordError ?
                                            this.setState({
                                                passwordError: Validators.isEmpty(this.state.password) ? MESSAGE.PASS_REQ : (this.state.password.length > 20
                                                    ? MESSAGE.PASSWORD_MAX_LENGTH_EXCEEDED : (!Validators.passwordPolicy(this.state.password)
                                                        ? MESSAGE.HELP_TEXT : null))
                                            }) : null); this.checkButtonDisableEnable();
                                    }}></TextInput>
                                <TouchableOpacity style={[styles.iconHideShow]} onPress={this.ChangeHideShow}>
                                    <MaterialIcons
                                        name={this.state.hideShow ? "eye-outline" : "eye-off-outline"}
                                        color='#58606C'
                                        size={scale(20)}
                                    />
                                    <Text style={[styles.paragraphSmall, styles.hideShow]}> {this.state.hideShow ? 'Show' : 'Hide'}</Text>
                                </TouchableOpacity>
                                {
                                    this.state.passwordError ?
                                        <Text style={[styles.paragraphNormal, styles.error]}>{this.state.passwordError}</Text> : (this.state.passwordHelp ?
                                            <Text style={[styles.paragraphNormal, styles.help]}>{this.state.passwordHelp}</Text> : <View />)
                                }
                            </View>
                            <View style={styles.inputView}>
                                <Text style={styles.inputField}>{I18n.t('CONFIRM_PASSWORD')}</Text>
                                <TextInput
                                    style={[(this.state.confirmPasswordError ? styles.inputFieldTextError : styles.inputFieldText)]}
                                    //splaceholder="Confirm Password"
                                    autoCorrect={false}
                                    textAlign = {I18n.locale === 'ar' ? 'right' : 'left'}
                                    underlineColorAndroid="transparent"
                                    autoCapitalize='none'
                                    keyboardType="default"
                                    secureTextEntry={this.state.hideShowConfirm}
                                    value={this.state.confirmPassword}
                                    onChangeText={this.handleConfirmPasswordInputChange}s
                                    onChange={() => { this.checkButtonDisableEnable(); }}></TextInput>
                                <TouchableOpacity
                                    style={[styles.iconHideShow]}
                                    onPress={this.ChangeHideShowConfirm}>
                                    <MaterialIcons
                                        name={this.state.hideShowConfirm ? "eye-outline" : "eye-off-outline"}
                                        color='#58606C'
                                        size={scale(20)}
                                    />
                                    <Text style={[styles.paragraphSmall, styles.hideShow]}> {this.state.hideShowConfirm ? 'Show' : 'Hide'}</Text>
                                </TouchableOpacity>
                                {
                                    this.state.confirmPasswordError ?
                                        <Text style={[styles.paragraphNormal, styles.error]}> {this.state.confirmPasswordError}</Text> : <View />

                                }
                            </View>
                            <View style={styles.buttonContainer}>
                                <TouchableOpacity
                                    disabled={this.state.buttonDisableEnable}
                                    style={[styles.newButton, { opacity: (this.state.buttonDisableEnable ? 0.7 : 1) }]}
                                    activeOpacity={.5}
                                    onPress={() => this.signUp()}
                                >

                                        <Text style={styles.TextStyle}> {I18n.t('SIGN_UP')} </Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>
                        <Footer {...this.props} />
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
    const { SignUpReducer } = state;
    return {
        signUpData: SignUpReducer.signUpData,
        status: SignUpReducer.status
    };
}
const mapDispatchToProps = (dispatch) => {
    return {
        doSignUp: (obj) => {
            dispatch(getSignUpData(obj))
        },
        updateNetworkLost: () => {
            dispatch(networkLost());
        },
        updateNetworkAvailable: () => {
            dispatch(networkAvailable());
        },
        clearAllSignUpData: () => {
            dispatch(clearSignUpData())
        },
    };

};

export default connect(mapStateToProps, mapDispatchToProps)(SignUp);