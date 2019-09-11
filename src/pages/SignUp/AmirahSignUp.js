import React, { Component } from 'react';
import {
    Text,
    View,
    StyleSheet,
    ScrollView,
    TextInput,
    TouchableOpacity,
    Image,
    Keyboard,
    Alert,
    ActivityIndicator
} from 'react-native';

import I18n from '../../localization/index';
import PhoneInput from 'react-native-phone-input';
import DateTimePicker from "react-native-modal-datetime-picker";
import MaterialIcons from "react-native-vector-icons/MaterialCommunityIcons";
import Validators from '../../utils/Validators';
import * as MESSAGE from '../../utils/Message';
import { scale, verticalScale } from '../../utils/Scale';
import * as COLORS from '../../utils/Color';
import styles1 from '../../utils/Style';
import styles from './StyleA';
import * as CONSTV from '../../utils/Const';
import { connect } from 'react-redux';
import { getSignUpData, clearAmirahSignUpData } from '../../actions/AmiraSignUpAction';
import showToast from "../../helper/Toast";
import SubHeader from '../../common/header/subHeader';
import Footer from '../../common/footer';
import HeaderComm from '../../common/header/header';
//import { getSignUpData } from '../../actions/SignUpAction';


class AmirahSignUp extends Component {

    // static navigationOptions = <SubHeader title = {CONSTV.AMIRAH_SIGNUP_TEXT} />
    //({ navigation, props }) => ({

    // title: "Amirah Club Sign Up",
    // headerTitleStyle: {
    //     //width: '60%',
    //     flex: 1,
    //     fontSize: 18,
    //     fontWeight: '500',
    //     textAlign: 'center'
    // },
    // headerStyle: {
    //     backgroundColor: '#faced7',
    //     shadowOpacity: 0.25,
    //     shadowOffset: {
    //         height: 1,
    //     },
    //     shadowRadius: 5,
    // },
    //});

    constructor(props) {
        super(props);

        this.state = {
            firstName: '',
            lastName: '',
            mobileNumber: '',
            email: '',
            countryCode: '91',
            invalidCountryCode: false,
            dob: '',
            dowa: '',

            firstNameError: null,
            lastNameError: null,
            emailError: null,
            mobileError: null,
            passwordHelp: '',
            passwordError: null,
            confirmPasswordError: null,

            passwordHelp: '',
            buttonDisableEnable: true,
            isDateTimePickerVisible: false,
            isDateTimePickerVisibleA: false,

            signUpData: {},
            flag: true,
            message: '',
            activityIndicator: true,
        }
    }

    componentWillReceiveProps(nextProps) {
        this.setState({ activityIndicator: true });
        if (nextProps.status === 'AMIRA_SIGN_IN_DATA_SUCCESS') {
            //showToast('Registration completed successfully', true);
            this.setState({ message: this.state.signUpData.message, flag: false });
            this.setState({
                firstName: '',
                lastName: '',
                mobileNumber: '',
                email: '',
                countryCode: '91',
                email: '',
                invalidCountryCode: false,
                dob: '',
                dowa: '',
                buttonDisableEnable: true,
            });
            // this.props.navigation.navigate("SignIn");
            showToast('You\'ve Successfully Joined Amirah Club');
        } else if(nextProps.status === 'AMIRA_SIGN_IN_DATA_FAILED') {
            showToast(nextProps.signUpData, true);
            this.props.clearAmirahData();
        }
    }

    async register() {
        const { firstName, lastName, countryCode, mobileNumber, email, dob, dowa } = this.state;
        this.setState({ activityIndicator: false });
        var obj = {
            firstname: firstName.trim(),
            lastname: lastName.trim(),
            countryCode: parseInt(countryCode, 10),
            phoneNumber: parseInt(mobileNumber, 10),
            email: email.trim().toLowerCase(),
            Dob: dob.trim(),
            Dowa: dowa.trim(),
            storeid: 2,
        };

        if (obj !== null) {
            try {
                Keyboard.dismiss();
                this.props.doRegister(obj);
            } catch (err) {
                // this.setState({ reasonForFailure: err, showAlert: true, alertHeading: MESSAGE.LOGIN_FAILED, alertMessage: MESSAGE.LOGIN_FAILED_MESSAGE, alertType: 'YES_CANCEL' });
            }
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
    
    handleEmailInputChange = (email) => {
        this.setState({ email: email });
        if (Validators.isEmpty(email)) {
            this.setState({ emailError: MESSAGE.EMAIL_REQ });
        } else if (!Validators.validEmail(this.state.email)) {
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

    checkButtonDisableEnable() {
        setTimeout(() => {
            const { firstName, lastName, email, countryCode, mobileNumber, invalidCountryCode } = this.state;
            const { firstNameError, lastNameError, emailError, mobileError } = this.state;

            if (Validators.isEmpty(firstName) || Validators.isEmpty(lastName) || Validators.isEmpty(email) ||
                Validators.isEmpty(countryCode) || Validators.isEmpty(mobileNumber) ||
                firstNameError !== null || lastNameError !== null || emailError !== null || mobileError !== null) {
                this.setState({ buttonDisableEnable: true })
            } else {
                this.setState({ buttonDisableEnable: false })
            }
        }, 100);
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

    showDateTimePicker() {
        this.setState({ isDateTimePickerVisible: true });
    };

    hideDateTimePicker = () => {
        this.setState({ isDateTimePickerVisible: false });
    };

    handleDatePicked = date => {
        const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
        //const dobDate = date.getDate() + ", " + months[date.getMonth()] + " " + date.getFullYear();
        const dobDate = date.getMonth()+'/'+date.getDate()+'/'+date.getFullYear();
        this.setState({ dob: dobDate.toString() });
        this.hideDateTimePicker();
    }

    showDateTimePickerA() {
        this.setState({ isDateTimePickerVisibleA: true });
    };

    hideDateTimePickerA = () => {
        this.setState({ isDateTimePickerVisibleA: false });
    };

    handleDatePickedA = date => {
        const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
        //const dobDate = date.getDate() + ", " + months[date.getMonth()] + " " + date.getFullYear();
        const dobDate = date.getMonth()+'/'+date.getDate()+'/'+date.getFullYear();
        this.setState({ dowa: dobDate.toString() });
        this.hideDateTimePickerA();
    }

    renderBack() {
        this.setState({ flag: true });
    }

    registerSuccessfull() {
        return (
            <ScrollView
                showsVerticalScrollIndicator={false}>
                <View style={styles.imageSucccess}>
                    <View style={styles.imageContainer}>
                        <Image source={{ uri: "https://storage.googleapis.com/nay/images/banners/stg/qr/qr-h-en.jpg", height: scale(200) }} />
                    </View>
                </View>
                <View style={{ flex: 1 }}>
                    <View style={{ alignItems: 'center' }}>
                        <MaterialIcons
                            name="checkbox-marked-circle"
                            color='#008000'
                            size={scale(100)}
                        />
                    </View>
                    <View style={{ alignItems: 'center' }}>
                        <Text style={{ fontSize: scale(30), textAlign: 'center' }}>Registration completed successfully</Text>
                    </View>
                </View>
                <View style={styles.buttonContainer}>
                    <TouchableOpacity
                        style={[styles.newButton, { opacity: (this.state.buttonDisableEnable ? 0.7 : 1) }]}
                        onPress={() => this.renderBack()}>
                        <Text style={styles.TextStyle}> Ok </Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        )
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

    signUpPage() {
        return (
            <View style={{ flex: 1 }}>
                {/* <SubHeader headerTitle = {CONSTV.AMIRAH_SIGNUP_TEXT}  {...this.props}/> */}
                <HeaderComm changeLang={this.changeLang} navigation={this.props.navigation} onRef={instance => { this.instance = instance; }} classObj={this} {...this.props}/>
                {this.state.activityIndicator ?
                    <ScrollView showsVerticalScrollIndicator={false}>
                        <View style={styles.mainContainer}>
                            <View style={styles.imageSucccess}>
                                <View style={styles.imageContainer}>
                                    <Image source={{ uri: "https://storage.googleapis.com/nay/images/banners/stg/qr/qr-h-en.jpg", height: scale(200) }} />
                                </View>
                            </View>
                            <View style={styles.signupContainer}>
                                <View style={styles.inputView}>
                                    <Text style={styles.inputField}><Text style={{color: 'red'}}>*</Text>{I18n.t('FIRST_NAME')}</Text>
                                    <TextInput
                                        style={[(this.state.firstNameError ? styles.inputFieldTextError : styles.inputFieldText)]}
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
                                    <Text style={styles.inputField}><Text style={{color: 'red'}}>*</Text>{I18n.t('LAST_NAME')}</Text>
                                    <TextInput
                                        style={[(this.state.lastNameError ? styles.inputFieldTextError : styles.inputFieldText)]}
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
                                    <Text style={styles.inputField}><Text style={{color: 'red'}}>*</Text>{I18n.t('MOBLIE')}</Text>
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
                                                //style={styles.inputFieldText}
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
                                <View style={[(this.state.mobileError ? styles.inputViewNull : styles.inputView)]}>
                                    <View style={[(this.state.mobileError ? styles.inputViewINnull : styles.inputViewIN)]}>
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
                                    <Text style={styles.inputField}><Text style={{color: 'red'}}>*</Text>{I18n.t('EMAIL')}</Text>
                                    <TextInput
                                        style={[(this.state.emailError ? styles.inputFieldTextError : styles.inputFieldText)]}
                                        textAlign = {I18n.locale === 'ar' ? 'right' : 'left'}
                                        autoCorrect={false}
                                        underlineColorAndroid="transparent"
                                        autoCapitalize='none'
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
                                <View style={styles.inputView}>
                                    <Text style={styles.inputField}>{I18n.t('BIRTHDAY')}</Text>
                                    <TextInput
                                        editable={false}
                                        textAlign = {I18n.locale === 'ar' ? 'right' : 'left'}
                                        style={styles.inputFieldText}
                                        autoCorrect={false}
                                        underlineColorAndroid="transparent"
                                        autoCapitalize='words'
                                        keyboardType="default"
                                        value={this.state.dob}
                                        onChange={() => { this.checkButtonDisableEnable(); }}
                                        disabled={this.state.buttonDisableEnable}></TextInput>
                                    <DateTimePicker
                                        isVisible={this.state.isDateTimePickerVisible}
                                        onConfirm={this.handleDatePicked}
                                        onCancel={this.hideDateTimePicker}
                                    //mode='date'
                                    />
                                    <TouchableOpacity style={[styles1.modalIcon]} onPress={() => this.showDateTimePicker()}>
                                        <MaterialIcons
                                            name="calendar-month-outline"
                                            color={COLORS.BRAND_DARKEST}
                                            size={scale(30)}
                                        />
                                    </TouchableOpacity>
                                </View>
                                <View style={styles.inputView}>
                                    <Text style={styles.inputField}>{I18n.t('WEDDING_ANNIVERSARY')}</Text>
                                    <TextInput
                                        editable={false}
                                        textAlign = {I18n.locale === 'ar' ? 'right' : 'left'}
                                        style={styles.inputFieldText}
                                        autoCorrect={false}
                                        underlineColorAndroid="transparent"
                                        autoCapitalize='words'
                                        keyboardType="default"
                                        value={this.state.dowa}
                                        onChange={() => { this.checkButtonDisableEnable(); }}
                                        disabled={this.state.buttonDisableEnable}></TextInput>
                                    <DateTimePicker
                                        isVisible={this.state.isDateTimePickerVisibleA}
                                        onConfirm={this.handleDatePickedA}
                                        onCancel={this.hideDateTimePickerA}
                                    //mode='date'
                                    />
                                    <TouchableOpacity style={[styles1.modalIcon]} onPress={() => this.showDateTimePickerA()}>
                                        <MaterialIcons
                                            name="calendar-month-outline"
                                            color={COLORS.BRAND_DARKEST}
                                            size={scale(30)}
                                        />
                                    </TouchableOpacity>
                                </View>
                                <View style={styles.inputView}>
                                    <Text style={styles.inputField}><Text style={{color: 'red'}}>*</Text>{I18n.t('MANDATORY')}</Text>
                                </View>
                                <View style={styles.buttonContainer}>
                                    <TouchableOpacity
                                        disabled={this.state.buttonDisableEnable}
                                        style={[styles.newButton, { opacity: (this.state.buttonDisableEnable ? 0.7 : 1) }]}
                                        onPress={() => this.register()}>
                                        <Text style={styles.TextStyle}> {I18n.t('REGISTER')} </Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>
                        <Footer {...this.props} />
                    </ScrollView> : <View style={{ flex: 1, justifyContent: 'center' }}>
                        <ActivityIndicator size="large" color="#0000ff" />
                    </View>}
            </View>
        );
    }

    render() {
        return (
            (this.state.flag ? this.signUpPage() : this.registerSuccessfull())
        );
    }
}

function mapStateToProps(state) {
    const { AmiraSignUpReducer } = state;
    return {
        signUpData: AmiraSignUpReducer.signInData,
        status: AmiraSignUpReducer.status
    };
}
const mapDispatchToProps = (dispatch) => {
    return {
        doRegister: (obj) => {
            dispatch(getSignUpData(obj))
        },
        clearAmirahData: () => {
            dispatch(clearAmirahSignUpData())
        },
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(AmirahSignUp);