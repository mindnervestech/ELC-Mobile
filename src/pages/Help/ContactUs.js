import React, { Component } from 'react';
import {
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
    Keyboard,
    Alert,
    Dimensions,
    Geolocation,
    ActivityIndicator,
    PermissionsAndroid,
    Platform,
} from 'react-native';

import I18n from '../../localization/index';
import PhoneInput from 'react-native-phone-input';
import ModalDropdown from 'react-native-modal-dropdown';
import MaterialIcons from "react-native-vector-icons/MaterialCommunityIcons";
import Validators from '../../utils/Validators';
import * as MESSAGE from '../../utils/Message';
import { scale, verticalScale } from '../../utils/Scale';
import * as COLORS from '../../utils/Color';
import styles1 from '../../utils/Style';
import styles from './StyleC';
import { getContactUs, clearContactUsData } from '../../actions/ContactUsAction';
import { connect } from 'react-redux';
import showToast from "../../helper/Toast";
import SubHeader from '../../common/header/subHeader'
import * as CONSTV from '../../utils/Const';
import Footer from '../../common/footer';
import HeaderComm from '../../common/header/header';
import Util from '../../utils/Util';
import MapView, { Marker } from "react-native-maps";

class ContactUs extends Component {

    constructor(props) {
        super(props);

        this.state = {
            contactUsData: {},
            yourName: '',
            emailAddress: '',
            mobileNumber: '',
            comment: '',
            yourNameError: null,
            emailAddressError: null,
            mobileError: null,
            commentError: null,
            purpose: '',
            countryCode: '91',
            invalidCountryCode: false,
            buttonDisableEnable: true,
            activityIndicator: true,
            mapCoordinate: {},
            marker: {},
            focusedLocation: {
                latitude: 25.2333562,
                longitude: 55.307943,
                latitudeDelta: 0.015,
                longitudeDelta:  0.015
                },
        }
    }

    changeLang = (lang) => {
        Util.getAsyncStorage('ALL_COUNTRY_AND_LANGUAGE').then((data) => {
            Util.getAsyncStorage('SELECTED_COUNTRY_LANGUAGE').then((select) => {
                for(var i in data.data){
                    if(data.data[i].country == select.country && data.data[i].language == lang){
                        Util.setAsyncStorage('SELECTED_COUNTRY_LANGUAGE', data.data[i]);
                        this.setState({ text: data.data[i].lang })
                    }
                }
            });
        });
    }

    async requestLocationPermission() {
        try {
          const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
            {
              title: 'Cool Photo App Camera Permission',
              message:
                'Cool Photo App needs access to your camera ' +
                'so you can take awesome pictures.',
              buttonNeutral: 'Ask Me Later',
              buttonNegative: 'Cancel',
              buttonPositive: 'OK',
            },
          );
          if (granted === PermissionsAndroid.RESULTS.GRANTED) {
            this.getLocationHandler();
            console.log('You can use the camera');
          } else {
            console.log('Camera permission denied');
          }
        } catch (err) {
          console.warn(err);
        }
      }


    pickLocationHandler = event =>{
        const coords = event.nativeEvent.coordinate;
        this.setState(prevState=>{
        return{
            focusedLocation:{
                ...prevState.focusedLocation,
                latitude: coords.latitude,
                longitude: coords.longitude
            }
        }
        })
    }

    getLocationHandler= () =>{
        navigator.geolocation.getCurrentPosition(
          (position) => {
              console.log(">>>>>>>>",position.coords.latitude);
              console.log(">>>>>>>>",position.coords.longitude);
              const coordsEvent = {
                nativeEvent:{
                    coordinate:{
                        latitude: position.coords.latitude,
                        longitude: position.coords.longitude
                    }
                }
            };
            this.pickLocationHandler(coordsEvent);
            this.setState({ focusedLocation:{latitude: position.coords.latitude, longitude: position.coords.longitude, latitudeDelta: 0.009, longitudeDelta:  0.009} });
              
            var obj = {
                latitude: position.coords.latitude, longitude: position.coords.longitude,
                latitudeDelta: 0.01, longitudeDelta: 0.01
            };
            this.setState({ marker: {latitude: position.coords.latitude, longitude: position.coords.longitude}, mapCoordinate: obj })
          }
          ,
          (err) => console.log(err),
          { enableHighAccuracy: false, timeout: 8000 }
        );
    }

    componentWillReceiveProps(nextProps) {
        this.setState({ activityIndicator: true });
        if (nextProps.status === 'CONTACT_US_SUCCESS') {
            showToast(nextProps.contactUsData, true);
            this.setState({
                yourName: '',
                emailAddress: '',
                mobileNumber: '',
                comment: '',
                purpose: '',
                countryCode: '91',
                buttonDisableEnable: true,
            });
            this.props.clearAllContactUsData();
        } else if (nextProps.status === 'CONTACT_US_FAILED') {
            showToast(nextProps.contactUsData, true);
            this.props.clearAllContactUsData();
        }
    }
    componentWillMount (){
        //geolocation.requestAuthorization();
        console.log('componentWillMount componentWillMount');
        //this.getLocationHandler();
        this.requestLocationPermission();
    }

    _onSelect(index, value) {
        this.setState({ purpose: value });
        this.checkButtonDisableEnable();
    }

    handleEmailAddressInputChange = (emailAddress) => {
        this.setState({ emailAddress: emailAddress });
        if (Validators.isEmpty(emailAddress)) {
            this.setState({ emailAddressError: MESSAGE.EMAIL_REQ });
        }
        else if (!Validators.validEmail(this.state.emailAddress)) {
            this.setState({ emailAddressError: MESSAGE.INVALID_EMAIL_ID });
        } else {
            this.setState({ emailAddressError: null });
        }
    }

    handleYourNameInputChange = (yourName) => {
        this.setState({ yourName: yourName });
        if (Validators.isEmpty(yourName)) {
            this.setState({ yourNameError: MESSAGE.YOUR_NAME_REQ });
        } else if (yourName.length > 30) {
            this.setState({ yourNameError: MESSAGE.CHARACTER_LIMIT_FIRSTNAME });
        } else {
            this.setState({ yourNameError: null });
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

    commentInputChange = (comment) => {
        this.setState({ comment: comment });
        if (Validators.isEmpty(comment)) {
            this.setState({ commentError: MESSAGE.COMMENT_REQ });
        } else {
            this.setState({ commentError: null });
        }
    }

    checkButtonDisableEnable() {
        setTimeout(() => {
            const { yourName, emailAddress, mobileNumber, purpose, comment } = this.state;
            const { yourNameError, emailAddressError, mobileError, commentError } = this.state;

            if (Validators.isEmpty(yourName) || Validators.isEmpty(emailAddress) || Validators.isEmpty(mobileNumber) || Validators.isEmpty(purpose) || Validators.isEmpty(comment) || yourNameError !== null || emailAddressError !== null || mobileError !== null || commentError !== null) {
                this.setState({ buttonDisableEnable: true })
            } else {
                this.setState({ buttonDisableEnable: false })
            }
        }, 100);

    }

    validate = () => {
        const { emailAddress } = this.state
        this.setState({ emailAddress: this.state.emailAddress });
        if (Validators.isEmpty(emailAddress)) {
            this.setState({ emailAddressError: MESSAGE.EMAIL_REQ });
        }
        else if (!Validators.validEmail(this.state.emailAddress)) {
            this.setState({ emailAddressError: MESSAGE.INVALID_EMAIL_ID });
        } else {
            this.setState({ emailAddressError: null });
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

    async submitContactUs() {
        const { yourName, emailAddress, mobileNumber, comment, purpose, countryCode } = this.state;
        this.setState({ activityIndicator: false });
        // const number = countryCode+' '+mobileNumber;
        Util.getAsyncStorage('SELECTED_COUNTRY_LANGUAGE').then((select) => {
            var obj = { carrier_code: parseInt(countryCode, 10), name: yourName.trim(), email: emailAddress.trim(), phoneNumber: parseInt(mobileNumber, 10), comment: comment.trim(), purpose: purpose.trim(), store_id: select.store_id };

            if (obj !== null) {
                try {
                    Keyboard.dismiss();
                    this.props.getContactUsData(obj);
                } catch (err) {
                    // this.setState({ reasonForFailure: err, showAlert: true, alertHeading: MESSAGE.LOGIN_FAILED, alertMessage: MESSAGE.LOGIN_FAILED_MESSAGE, alertType: 'YES_CANCEL' });
                }
            }
        });
       

    }


    render() {
        const { mapCoordinate,marker, focusedLocation } = this.state;
        return (
            <View style={{ flex: 1 }}>
                {/* <SubHeader headerTitle = {CONSTV.CONTACTUS_TEXT}  {...this.props}/> */}
                <HeaderComm changeLang={this.changeLang} navigation={this.props.navigation} onRef={instance => { this.instance = instance; }} classObj={this} {...this.props}/>
                {this.state.activityIndicator ?
                    <ScrollView showsVerticalScrollIndicator={false}>
                        <View style={styles.mainContainer}>
                            <View style={{ paddingVertical: verticalScale(5) }}>
                                <Text style={styles.title}>{I18n.t('write_to_us')}</Text>
                            </View>
                            <View style={styles.inputView}>
                                <Text style={styles.inputField}>{I18n.t('your_name')}</Text>
                                <TextInput
                                    style={[(this.state.yourNameError ? styles.inputFieldTextError : styles.inputFieldText)]}
                                    //placeholder="Your Name"
                                    textAlign = {I18n.locale === 'ar' ? 'right' : 'left'}
                                    autoCorrect={false}
                                    underlineColorAndroid="transparent"
                                    autoCapitalize='words'
                                    keyboardType="default"
                                    value={this.state.yourName}
                                    onChangeText={this.handleYourNameInputChange}
                                    onChange={() => { this.checkButtonDisableEnable(); }}></TextInput>
                                {
                                    this.state.yourNameError ?
                                        <Text style={[styles.paragraphNormal, styles.error]}>{this.state.yourNameError}</Text> : <View />
                                }
                            </View>
                            <View style={styles.inputView}>
                                <Text style={styles.inputField}>{I18n.t('emailAddress')}</Text>
                                <TextInput
                                    style={[(this.state.emailAddressError ? styles.inputFieldTextError : styles.inputFieldText)]}
                                    //placeholder="Email Address"
                                    textAlign = {I18n.locale === 'ar' ? 'right' : 'left'}
                                    autoCorrect={false}
                                    underlineColorAndroid="transparent"
                                    autoCapitalize='words'
                                    keyboardType="default"
                                    value={this.state.emailAddress}
                                    onChangeText={this.handleEmailAddressInputChange}
                                    onBlur={e => this.validate()}
                                    onChange={() => { this.checkButtonDisableEnable(); }}></TextInput>
                                {
                                    this.state.emailAddressError ?
                                        <Text style={[styles.paragraphNormal, styles.error]}>{this.state.emailAddressError}</Text> : <View />
                                }
                            </View>
                            <View style={styles.inputView}>
                                <Text style={styles.inputField}>{I18n.t('mobile')}</Text>
                                <View style={[styles.mobileView, I18n.locale == 'ar' ? {flexDirection:'row-reverse'} : '']}>
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
                                <View style={[styles.mobileView,I18n.locale == 'ar' ? {flexDirection:'row-reverse'} : '']}>
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
                                <Text style={styles.inputField}>{I18n.t('purpose')}</Text>
                                <View style={styles1.countryModalMain}>
                                    <ModalDropdown
                                        ref={el => this._weeklydropdown = el}
                                        options={['Bulk Order', 'Complaint', 'General Inquiry', 'Issue In Website', 'Suggestion']}
                                        style={styles1.modalStyle}
                                        dropdownStyle={styles1.modalDropdownStyle}
                                        dropdownTextStyle={styles1.modalTextDropdownTextStyle}
                                        textStyle={styles1.modalTextDropdownTextStyle}
                                        defaultIndex={0}
                                        onSelect={(index, data) => this._onSelect(index, data)}
                                    />
                                    <TouchableOpacity style={styles.modalIcon} onPress={() => { this._weeklydropdown && this._weeklydropdown.show(); }}>
                                        <MaterialIcons
                                            name="chevron-down"
                                            color={COLORS.BRAND_DARKEST}
                                            size={scale(30)}
                                        />
                                    </TouchableOpacity>
                                </View>
                                {
                                    this.state.pickerError ?
                                        <Text style={[styles.paragraphNormal, styles.error]}>{this.state.pickerError}</Text> : <View />
                                }
                            </View>
                            {/* </View> */}
                            <View style={[styles.inputView, styles.paddingBottom10]}>
                                <Text style={styles.inputField}>{I18n.t('your_comment')}</Text>
                                <TextInput
                                    style={styles.commentText}
                                    //placeholder="Your Comment"
                                    textAlign = {I18n.locale === 'ar' ? 'right' : 'left'}
                                    autoCorrect={false}
                                    underlineColorAndroid="transparent"
                                    autoCapitalize='words'
                                    multiline={true}
                                    numberOfLines={4}
                                    keyboardType="default"
                                    value={this.state.comment}
                                    onChangeText={this.commentInputChange}
                                    onChange={() => { this.checkButtonDisableEnable(); }}></TextInput>
                                {
                                    this.state.commentError ?
                                        <Text style={[styles.paragraphNormal, styles.error]}>{this.state.commentError}</Text> : <View />
                                }
                            </View>
                            <View style={styles.buttonContainer}>
                                <TouchableOpacity
                                    disabled={this.state.buttonDisableEnable}
                                    style={[styles.newButton]}
                                    onPress={() => this.submitContactUs()}>
                                    <Text style={styles.TextStyle}> {I18n.t('submit')} </Text>
                                </TouchableOpacity>
                            </View>
                            <View style={styles.imageTextContainer}>
                                <Text style={[styles.title, { paddingVertical: verticalScale(15) }]}>{I18n.t('direct_contact')}</Text>
                                <View style={[styles.textContainerView, I18n.locale == 'ar' ? {flexDirection:'row-reverse'} : '']}>
                                    <Image style={styles.image} source={require('../../assets/helpcenter/fa-phone.png')} />
                                    <Text style={styles.imageText} onPress={() => Linking.openURL('tel:${97143974173}')}> 97143974173 </Text>
                                </View>
                                <View style={[styles.textContainerView, I18n.locale == 'ar' ? {flexDirection:'row-reverse'} : '']}>
                                    <Image style={styles.image} source={require('../../assets/helpcenter/fa-mail.png')} />
                                    <Text style={styles.imageText} onPress={() => Linking.openURL('mailto:help@nayomi.com')}> help@nayomi.com  </Text>
                                </View>
                                <View style={[styles.textContainerView, I18n.locale == 'ar' ? {flexDirection:'row-reverse'} : '']}>
                                    <Image style={styles.image} source={require('../../assets/helpcenter/fa-whatsapp.png')} />
                                    <Text style={styles.imageText} onPress={() => Linking.openURL('https://api.whatsapp.com/send?phone=971565069237&text=I%20Initiate%20This%20Chat%20From%20Nayomi%20Website')}> {I18n.t('WhatsApp_Click_to_Chat')} </Text>
                                </View>
                            </View>
                           
                            <View style={styles.imageContainer}>
                                <Text style={[styles.title, { paddingVertical: verticalScale(15) }]}>{I18n.t('social_media')}</Text>
                                <View style={[styles.imageContainerView, I18n.locale == 'ar' ? {flexDirection:'row-reverse'} : '']}>
                                    <TouchableOpacity onPress={() => Linking.openURL('https://www.instagram.com/nayomimena/')} ><Image style={styles.image} source={require('../../assets/helpcenter/fa-instagram.png')} /></TouchableOpacity>
                                    <TouchableOpacity onPress={() => Linking.openURL('http://www.facebook.com/NayomiMENA')}><Image style={styles.image} source={require('../../assets/helpcenter/fa-facebook.png')} /></TouchableOpacity>
                                    <TouchableOpacity onPress={() => Linking.openURL('http://www.youtube.com/NayomiMENA')}><Image style={styles.image} source={require('../../assets/helpcenter/fa-youtube.png')} /></TouchableOpacity>
                                    <TouchableOpacity onPress={() => Linking.openURL('https://api.whatsapp.com/send?phone=971565069237')}><Image style={styles.image} source={require('../../assets/helpcenter/fa-whatsapp.png')} /></TouchableOpacity>
                                </View>
                                <MapView style={styles.map}
                                    zoomEnabled={true}
                                    showsUserLocation={true}
                                    initialRegion={focusedLocation}
                              >
                              <Marker coordinate={{
                                        latitude: focusedLocation.latitude,
                                        longitude: focusedLocation.longitude,
                                    }} 
                                    >
                                     <Image style={{ flex: 1, width: 50, height: 100 }} resizeMode='contain' source={{ uri: "https://storage.googleapis.com/nay/icons/map-marker.png" }} />
                                    </Marker></MapView>
                            </View>
                        </View>
                        <Footer {...this.props} />
                    </ScrollView> : <View style={{ flex: 1, justifyContent: 'center' }}>
                        <ActivityIndicator size="large" color="#0000ff" />
                    </View>}
            </View>
        );
    }
}

function mapStateToProps(state) {
    const { ContactUsReducer } = state;
    return {
        contactUsData: ContactUsReducer.contactUsData,
        status: ContactUsReducer.status
    };
}
const mapDispatchToProps = (dispatch) => {
    return {
        getContactUsData: (obj) => {
            dispatch(getContactUs(obj))
        },
        clearAllContactUsData: () => {
            dispatch(clearContactUsData())
        },
    };

};
export default connect(mapStateToProps, mapDispatchToProps)(ContactUs);