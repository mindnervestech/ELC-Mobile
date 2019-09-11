import React, { Component } from 'react';
import {
    Text,
    View,
    Linking,
    Image,
    Button,
    Alert,
    TouchableOpacity,
    Dimensions,
    WebView,
} from 'react-native';
import styles from './Style'
import MaterialIcons from "react-native-vector-icons/MaterialCommunityIcons";
import Collapsible from 'react-native-collapsible';
import * as COLORS from '../../utils/Color'
import { scale, verticalScale } from '../../utils/Scale';
import I18n from '../../localization/index';
import Util from '../../utils/Util';
import HTML from 'react-native-render-html';
// import {WebView} from 'react-native';


class Footer extends Component {

    constructor(props) {
        super(props)
        this.state = {
            aboutNayomiCollapse: true,
            needAssCollapse: true,
            appDownloadCollapse: true,
            signUpCollapse: true,
            storeLocatorCollapse: true,
            readMore: true,
            readMoreHTML: true,
            country_lang_code: null,
            footer_descrtiption: this.props.footerDescription,
            comesFrom: this.props.comesFrom
        }
    }

    _onPressButton = () => {
        this.setState(previousState => ({ readMore: !previousState.readMore }))
    };
    _onPressButtonHtml = () => {
        this.setState(previousState => ({ readMoreHTML: !previousState.readMoreHTML }))
    };

    componentWillMount() {
        Util.getAsyncStorage('SELECTED_COUNTRY_LANGUAGE').then((language) => {
            this.setState({ country_lang_code: language.code });
        });
    }

    toggleCollapse(collapseType) {
        switch (collapseType) {
            case "aboutNayomi":
                this.setState({ aboutNayomiCollapse: !this.state.aboutNayomiCollapse })
                break;
            case "needAssistance":
                this.setState({ needAssCollapse: !this.state.needAssCollapse })
                break;
            case "appDownload":
                this.setState({ appDownloadCollapse: !this.state.appDownloadCollapse })
                break;
            case "signUp":
                this.setState({ signUpCollapse: !this.state.signUpCollapse })
                break;
            case "storeLocator":
                this.setState({ storeLocatorCollapse: !this.state.storeLocatorCollapse })
                break;
        }
    }

    _renderAboutNayomi() {
        return (
            <View style={styles.collapseMainContainer}>
                <View style={styles.collapseMain}>
                    <TouchableOpacity style={[styles.collapseTextPlus]} onPress={() => this.toggleCollapse('aboutNayomi')}>
                        <Text style={styles.collapseText}>{I18n.t('aboutNayomi')}</Text>

                        <MaterialIcons
                            name={this.state.aboutNayomiCollapse ? "plus" : "minus"}
                            color={COLORS.BRAND_DARKEST}
                            size={scale(25)}
                        />
                    </TouchableOpacity>
                    <Collapsible collapsed={this.state.aboutNayomiCollapse}>
                        <View style={styles.afterCollapseMain}>
                            <TouchableOpacity style={styles.collapseInText} onPress={() => this.props.navigation.navigate("AboutUs")}>
                                <Text>{I18n.t('brandOverview')}</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => Linking.openURL('https://kojhr.com/en/careers/main/home.aspx')} style={styles.collapseInText}>
                                <Text>{I18n.t('careers')}</Text>
                            </TouchableOpacity>
                        </View>
                    </Collapsible>
                </View>
                <View style={styles.collabsibleBorder} />
            </View>
        )
    }

    _renderNeedAss() {
        return (

            <View style={styles.collapseMainContainer}>
                <View style={styles.collapseMain}>
                    <TouchableOpacity style={[styles.collapseTextPlus]} onPress={() => this.toggleCollapse('needAssistance')}>
                        <Text style={styles.collapseText}>
                            {I18n.t('needAssistance')}</Text>
                        <MaterialIcons
                            name={this.state.needAssCollapse ? "plus" : "minus"}
                            color={COLORS.BRAND_DARKEST}
                            size={scale(25)}
                        />
                    </TouchableOpacity>
                    <Collapsible collapsed={this.state.needAssCollapse}>
                        <View style={styles.afterCollapseMain}>
                            <TouchableOpacity style={styles.collapseInText} onPress={() => this.props.navigation.navigate("Help")}>
                                <Text>{I18n.t('helpCenter')}</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.collapseInText} onPress={() => this.props.navigation.navigate("ContactUs")}>
                                <Text>{I18n.t('contactUs')}</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.collapseInText} onPress={() => this.props.navigation.navigate("DeliveryPolicy")} >
                                <Text>{I18n.t('delivery')}</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.collapseInText} onPress={() => this.props.navigation.navigate("FAQ", { searchFAQText: null })}>
                                <Text>{I18n.t('faq')}</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.collapseInText} onPress={() => this.props.navigation.navigate("ReturnPolicy")}>
                                <Text>{I18n.t('returnsAndExchanges')}</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.collapseInText} onPress={() => this.props.navigation.navigate("PrivacyPolicy")}>
                                <Text>{I18n.t('privacyPolicy')}</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.collapseInText} onPress={() => this.props.navigation.navigate("TermsandConditions")}>
                                <Text>{I18n.t('termsAndConditions')}</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.collapseInText} onPress={() => this.props.navigation.navigate("PaymentMethods")}>
                                <Text>{I18n.t('paymentMethods')}</Text>
                            </TouchableOpacity>
                        </View>
                    </Collapsible>
                </View>
                <View style={styles.collabsibleBorder} />
            </View>
        )
    }
    _renderAppDownload() {
        return (


            <View style={styles.collapseMainContainer}>
                <View style={styles.collapseMain}>
                    <TouchableOpacity style={[styles.collapseTextPlus]} onPress={() => this.toggleCollapse('appDownload')}>
                        <Text style={styles.collapseText}  >
                            {I18n.t('appDownload')}</Text>
                        <MaterialIcons
                            name={this.state.appDownloadCollapse ? "plus" : "minus"}
                            color={COLORS.BRAND_DARKEST}
                            size={scale(25)}
                        />
                    </TouchableOpacity>
                    <Collapsible collapsed={this.state.appDownloadCollapse}>
                        <View style={styles.afterCollapseMain}>
                            <TouchableOpacity onPress={() => Linking.openURL('https://play.google.com/store/apps/details?id=prototype.nayomi.app')}>
                                <Image style={{ width: scale(150), height: scale(50) }} source={require('../../assets/helpcenter/android-store-logo.png')} />
                            </TouchableOpacity>
                            <TouchableOpacity style={{ paddingTop: verticalScale(10) }} onPress={() => Linking.openURL('https://itunes.apple.com/app/nayomi-lingerie/id965168348?mt=8')}>
                                <Image style={{ width: scale(150), height: scale(50) }} source={require('../../assets/helpcenter/apple-store-logo.png')} />
                            </TouchableOpacity>
                            {/* <Text>{I18n.t('appDownload')}</Text> */}
                        </View>
                    </Collapsible>
                </View>
                <View style={styles.collabsibleBorder} />
            </View>
        )
    }
    _renderSignUp() {
        return (


            <View style={styles.collapseMainContainer}>
                <View style={styles.collapseMain}>
                    <TouchableOpacity style={[styles.collapseTextPlus]} onPress={() => this.toggleCollapse('signUp')}>
                        <Text style={styles.collapseText}  >
                            {I18n.t('amiraClubSignUp')}</Text>
                        <MaterialIcons
                            name={this.state.signUpCollapse ? "plus" : "minus"}
                            color={COLORS.BRAND_DARKEST}
                            size={scale(25)}
                        />
                    </TouchableOpacity>
                    <Collapsible collapsed={this.state.signUpCollapse}>
                        <View style={styles.afterCollapseMain}>
                            <TouchableOpacity style={[styles.collapseTextPlus]} onPress={() => this.props.navigation.navigate("AmirahSignUp")}>
                                <View style={{ justifyContent: 'center', alignItems: 'center', width: '35%' }}>
                                    <Image source={require('../../assets/home/amirah-club.png')} />
                                    <Text style={styles.amirahSignupText}>{I18n.t('sign_up_now')}</Text>
                                </View>
                            </TouchableOpacity>

                        </View>
                    </Collapsible>
                </View>
                <View style={styles.collabsibleBorder} />
            </View>


        )
    }
    _renderStoreLocator() {
        return (


            <View style={styles.collapseMainContainer}>
                <View style={styles.collapseMain}>
                    <TouchableOpacity style={[styles.collapseTextPlus]} onPress={() => this.toggleCollapse('storeLocator')}>
                        <Text style={styles.collapseText}  >
                            {I18n.t('storeLocator')}</Text>
                        <MaterialIcons
                            name={this.state.storeLocatorCollapse ? "plus" : "minus"}
                            color={COLORS.BRAND_DARKEST}
                            size={scale(25)}
                        />
                    </TouchableOpacity>
                    <Collapsible collapsed={this.state.storeLocatorCollapse}>
                        <View style={styles.afterCollapseMain}>
                            <TouchableOpacity style={styles.collapseInText} onPress={() => this.props.navigation.navigate("StoreLocator", { country: 'United Arab Emirates' })}>
                                <Text>{I18n.t('unitedArabEmirates')}</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.collapseInText} onPress={() => this.props.navigation.navigate("StoreLocator", { country: 'Saudi Arabia' })}>
                                <Text>{I18n.t('saudiArabia')}</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.collapseInText} onPress={() => this.props.navigation.navigate("StoreLocator", { country: 'Kuwait' })}>
                                <Text>{I18n.t('kuwait')}</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.collapseInText} onPress={() => this.props.navigation.navigate("StoreLocator", { country: 'Bahrain' })}>
                                <Text>{I18n.t('bahrain')}</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.collapseInText} onPress={() => this.props.navigation.navigate("StoreLocator", { country: 'Qatar' })}>
                                <Text>{I18n.t('qatar')}</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.collapseInText} onPress={() => this.props.navigation.navigate("StoreLocator", { country: 'Oman' })}>
                                <Text>{I18n.t('oman')}</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.collapseInText} onPress={() => this.props.navigation.navigate("StoreLocator", { country: 'Morocco' })}>
                                <Text>{I18n.t('morocco')}</Text>
                            </TouchableOpacity>
                        </View>
                    </Collapsible>
                </View>
                <View style={styles.collabsibleBorder} />
            </View>


        )
    }

    render() {
        const { country_lang_code, footer_descrtiption, comesFrom } = this.state;
        return (
            <View style={{ backgroundColor: '#f4f4f4', paddingTop: scale(20) }}>
                <View style={{ paddingVertical: verticalScale(10) }} />
                <View style={styles.textView}>
                    <Text style={{ fontWeight: 'bold', }}>{I18n.t('CUSTOMER_SERVICE')}</Text>
                    <Text>{I18n.t('SUNDAY')} - {I18n.t('THURSDAY')}  8:00 {I18n.t('AM')} <Text>{country_lang_code === 'uae_en' ? <Text>05:00</Text> : <Text>04:30</Text>}</Text> {I18n.t('PM')} </Text>
                    <View style={{ flexDirection: 'row' }}>
                        <Text>{I18n.t('CONTACT')}</Text>
                        {country_lang_code === 'uae_en' ?
                            <TouchableOpacity onPress={() => Linking.openURL('tel:43974173')}>
                                <Text> - 43974173 </Text>
                            </TouchableOpacity  > :
                            <TouchableOpacity onPress={() => Linking.openURL('tel:8001244443')}>
                                <Text> - 8001244443 </Text>
                            </TouchableOpacity  >
                        }
                    </View>
                </View>
                <View style={styles.textView}>
                    <Text style={{ fontWeight: 'bold', }}>{I18n.t('SHIPPING')}</Text>
                    <Text>{I18n.t('EXPRESS')}: {I18n.t('_1_to_3')} {I18n.t('DAYS')}</Text>
                    <Text>{I18n.t('FREE_DELIVERY_ON_ALL_ORDERS_ABOVE')} <Text>{country_lang_code === 'uae_en' ? <Text>{I18n.t('aed')}</Text> : <Text>{I18n.t('sar')}</Text>}</Text> </Text>
                </View>
                <View style={styles.textView}>
                    {/* <Text style={styles.contactText}>{I18n.t('customerService')}<Text style={{fontWeight: '600', color: COLORS.BRAND_DARKEST}}>+917 439 74173</Text></Text> */}
                    <Text style={[styles.contactText, { paddingTop: verticalScale(10) }]}>{I18n.t('connectWithUs')}</Text>
                </View>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: '60%', alignSelf: 'center' }}>
                    <TouchableOpacity onPress={() => Linking.openURL('http://www.instagram.com/nayomimena')}>
                        <MaterialIcons
                            name={"instagram"}
                            color={COLORS.BRAND}
                            size={scale(40)}
                        />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => Linking.openURL('http://www.facebook.com/NayomiMENA')}>
                        <MaterialIcons
                            name={"facebook"}
                            color={COLORS.BRAND}
                            size={scale(40)}
                        />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => Linking.openURL('http://www.youtube.com/NayomiMENA')}>
                        <MaterialIcons
                            name={"youtube"}
                            color={COLORS.BRAND}
                            size={scale(40)}
                        />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => Linking.openURL('https://api.whatsapp.com/send?phone=971565069237')}>
                        <MaterialIcons
                            name={"whatsapp"}
                            color={COLORS.BRAND}
                            size={scale(40)}
                        />
                    </TouchableOpacity>
                </View>
                <TouchableOpacity style={styles.textView} onPress={() => this.props.navigation.navigate("PaymentMethods")}>
                    <Text style={styles.contactText}>{I18n.t('paymentMethod')}</Text>
                    <Image style={styles.paymentImageSize} source={require('../../assets/home/payment-methods.png')} />
                </TouchableOpacity>

                {this._renderAboutNayomi()}
                {this._renderNeedAss()}
                {this._renderStoreLocator()}
                {this._renderSignUp()}
                {/* {this._renderAppDownload()} */}
            <View style={[styles.textView, { backgroundColor: COLORS.BRAND_LIGHTEST }]}>
                    {comesFrom !== 'productList' ?
                        <Text style={[styles.descriptionText, { fontWeight: 'bold' }]}>
                            {I18n.t('descriptionHeader')}
                        </Text> :
                        <View  style={{justifyContent: 'center', alignItems: 'center'}}>
                         {this.state.readMoreHTML ? 
                            <View style={{ height: scale(150)}}>
                            <HTML html={footer_descrtiption} resizeMode={'contain'} imagesMaxWidth={Dimensions.get('window').width} />
                            </View> :
                            // <Collapsible collapsed={this.state.readMoreHTML} duration={1000}>
                              <View style={{justifyContent: 'center',alignItems: 'center'}}>
                                    <HTML html={footer_descrtiption} imagesMaxWidth={Dimensions.get('window').width} />
                                </View>}

                            {this.state.readMoreHTML ? <TouchableOpacity style={[styles.descriptionText]} onPress={this._onPressButtonHtml}>
                                <Text style={{textAlign: 'center'}}>{I18n.t('seeMore')}</Text>
                            </TouchableOpacity> : null}
                            {!this.state.readMoreHTML ? <TouchableOpacity style={[styles.descriptionText]} onPress={this._onPressButtonHtml}>
                                <Text style={{textAlign: 'center'}}>{I18n.t('seeLess')}</Text>
                            </TouchableOpacity> : null}


                        </View>
                    }
            </View>


            {comesFrom !== 'productList' ?
            <View style={[styles.textViewFooter, { backgroundColor: COLORS.BRAND_LIGHTEST }]}>
                    <Text style={[styles.descriptionText, { paddingTop: verticalScale(10) }]}>
                        {I18n.t('descriptionMsgShort')}
                    </Text> 
                    
                        <Collapsible duration={1000} collapsed={this.state.readMore} >
                            <Text style={[styles.descriptionText, { paddingTop: verticalScale(10) }]}>{I18n.t('descriptionMsg')}</Text>  
                            <Text style={[styles.descriptionText, { paddingTop: verticalScale(10) }]}>{I18n.t('descriptionMsg0')}</Text> 
                            <Text style={[styles.descriptionText, { paddingTop: verticalScale(10) }]}>{I18n.t('descriptionMsg1')}</Text>
                        </Collapsible> 

                    {this.state.readMore ? <TouchableOpacity style={[styles.descriptionText]} onPress={this._onPressButton}>
                        <Text>{I18n.t('seeMore')}</Text>
                    </TouchableOpacity> : null}
                    {!this.state.readMore ? <TouchableOpacity style={[styles.descriptionText]} onPress={this._onPressButton}>
                        <Text>{I18n.t('seeLess')}</Text>
                    </TouchableOpacity> : null}
            </View>: null}
                <View style={[styles.textFooterRights, { backgroundColor: COLORS.BRAND_LIGHTEST, height: 50 }]}>
                    <Text style={[styles.descriptionText, { backgroundColor: COLORS.BRAND_LIGHTEST, paddingTop: verticalScale(15) ,height: 170}]}>
                        {I18n.t('descriptionFooter')}
                    </Text>
                </View>
            </View>
        );
    }
}



export default Footer;
