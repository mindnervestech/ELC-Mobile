import React, { Component } from 'react';
import {
    Text,
    View,
    StyleSheet,
    Button,
    Linking,
    Image,
    ScrollView,
    TouchableOpacity,
    ActivityIndicator,
    FlatList,
    Modal,
    ImageBackground,
    Dimensions,
} from 'react-native';
import styles from './Style'
// import {Header} from '../../common/header';
import MaterialIcons from "react-native-vector-icons/MaterialCommunityIcons";
import Collapsible from 'react-native-collapsible';
import NetInfo from "@react-native-community/netinfo"
import * as COLORS from '../../utils/Color'
import * as MESSAGE from '../../utils/Message';
import { scale, verticalScale } from '../../utils/Scale';
import { connect } from 'react-redux';
import { getHomeData } from '../../actions/HomeAction';
import { networkLost, networkAvailable } from '../../actions/CommonAction';
import Footer from '../../common/footer'
import I18n from '../../localization/index';
import HeaderComm from '../../common/header/header';
import showToast from "../../helper/Toast";
import CustomAlert from '../../helper/CustomAlert';
import Util from '../../utils/Util';
import COMMONSTYLE from '../../utils/Style';
import { getAllCountryAndLangData } from '../../actions/CommonAction';
import { getCart } from '../../actions/CartAction';
import { getProductMenuList } from '../../actions/ProductAction';
import ParallaxScrollView from 'react-native-parallax-scroll-view';
import Carousel from 'react-native-snap-carousel';
const { height, width } = Dimensions.get('window');

class Home extends Component {

    constructor(props) {
        super(props)
        this.state = {
            homeData: {},
            text: '',
            networkStatus: true,
            showAlert: false,
            alertHeading: '',
            alertMessage: '',
            showLanguage: false,
            buttonDisableEnable: true,
            ksaborder: null,
            uaeborder: null,
            intborder: null,
            arabicbgc: null,
            internationalbgc: null,
            selectCountry: '',
            selectLanguage: '',
            language: 'ar',
            countrySelected: false,
            langSelected: false,
            countryAndLangData: {},
            allCountryAndLangData: {},
            showRegisterVIP: false,
            currentCountryData: {},
            productMenuList: {},
            quoteId: null,
            storeId: null,

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

    // shopCollection(type) {

    //     Util.getAsyncStorage('SELECTED_COUNTRY_LANGUAGE').then((language) => {
    //         Util.getAsyncStorage('SIGN_IN_DATA').then((data) => {
    //             //console.log(data);
    //             if (data === null) {
    //                 var url_key = type.split('/');
    //                 var obj = {
    //                     customerid: " ",
    //                     filters: {},
    //                     sortby: "relevance",
    //                     storeid: 1,
    //                     url_key: url_key[url_key.length - 1]
    //                 }
    //                 obj.storeid = parseInt(language.store_id)
    //                 this.props.navigation.navigate('ProductList', { objectData: obj, comeFrom: 'home' });
    //             } else {
    //                 var url_key = type.split('/');
    //                 var obj = {
    //                     customerid: data.customer_id,
    //                     filters: {},
    //                     sortby: "relevance",
    //                     storeid: 1,
    //                     url_key: url_key[url_key.length - 1]
    //                 }
    //                 obj.storeid = parseInt(language.store_id)
    //                 this.props.navigation.navigate('ProductList', { objectData: obj, comeFrom: 'home' });
    //             }
    //         });
    //     });
    // }

    // handleConnectionChange = (isConnected) => {
    //     this.setState({ networkStatus: isConnected });
    //     if (isConnected == true) {
    //         this.props.updateNetworkAvailable();
    //     }
    //     else {
    //         this.setState({ showAlert: true, alertHeading: MESSAGE.NETWORK_ERROR_HEADER, alertMessage: MESSAGE.NETWORK_ERROR, alertType: 'OK' });
    //         this.props.updateNetworkLost();
    //     }
    // }
    async componentWillMount() {
        // Util.getAsyncStorage('SIGN_IN_DATA').then((data) => {
        //     console.log('this is data', data);
        //     if (data !== null) {
        //         Util.getAsyncStorage('SELECTED_COUNTRY_LANGUAGE').then((language) => {
        //             var obj = { quote_id: data.quote_id, store_id: language.store_id };
        //             this.props.getCartData(obj);
        //         });
        //     } else {
        //         var obj = { quote_id: data.quote_id, store_id: language.store_id };
        //         this.props.getCartData(obj);
        //     }
        // });

        // Util.getAsyncStorage('SELECTED_COUNTRY_LANGUAGE').then((language) => {
        //     this.setState({ storeId: language.store_id });
        // });
        // Util.getAsyncStorage('SIGN_IN_DATA').then((data) => {
        //     console.log('this is data', data);
        //     if (data !== null) {
        //         Util.getAsyncStorage('S_quote_id_digit').then((Sdata) => {
        //             var obj = { quote_id: Sdata, store_id: this.state.storeId };
        //             this.setState({ quoteId: Sdata, activityIndicator: false });
        //             // this.props.getCartData(obj);
        //         });
        //     } else {
        //         Util.getAsyncStorage('G_quote_id_digit').then((Gdata) => {
        //             if (Gdata !== null) {
        //                 var obj = { quote_id: Gdata, store_id: this.state.storeId };
        //                 this.setState({ activityIndicator: false });
        //                 // this.props.getCartData(obj);
        //             }
        //         });
        //     }
        // });


        // Util.getAsyncStorage('SIGN_IN_DATA').then((data) => {
        //     if (data !== null) {
        //         this.setState({ quote_id: data.quote_id })
        //         Util.setAsyncStorage('quote_id', data.quote_id);
        //     } else {
        //         var obj = {};
        //         Util.getAsyncStorage('G_quote_id').then((Gdata) => {
        //             console.log('this is Gdata', Gdata);
        //             if (Gdata !== null) {
        //                 console.log('assgigning guest user quoute id');
        //                 this.setState({ guestUserQuoteId: Gdata });
        //             } else {
        //                 console.log('callling again athe guest user gquoa API');
        //                 this.props.guestUserCart(obj);
        //             }
        //         });
        //     }
        // });


        // Util.getAsyncStorage('SELECTED_COUNTRY_LANGUAGE').then((language) => {
        //     this.setState({ storeId: language.store_id });
        // });
        // Util.getAsyncStorage('SIGN_IN_DATA').then((data) => {
        //     console.log('this is data', data);
        //     if (data !== null) {
        //             var obj = { quote_id: data.quote_id, store_id: storeId };
        //             this.setState({ quoteId: data.quote_id });
        //             this.props.getCartData(obj);
        //     } else {
        //         Util.getAsyncStorage('G_quote_id_digit').then((Gdata) => {
        //             if (Gdata !== null) {
        //                 var obj = { quote_id: Gdata, store_id: this.state.storeId };
        //                 this.props.getCartData(obj);
        //             } 
        //         });
        //     }
        // });


        // Util.getAsyncStorage('SELECTED_COUNTRY_LANGUAGE').then((language) => {
        //     this.setState({ storeId: language.store_id });
        // });
        // Util.getAsyncStorage('SIGN_IN_DATA').then((data) => {
        //     console.log('this is data', data);
        //     if (data !== null) {
        //             var obj = { quote_id: data.quote_id, store_id: storeId };
        //             this.setState({ quoteId: data.quote_id });
        //             this.props.getCartData(obj);
        //     } else {
        //         Util.getAsyncStorage('G_quote_id').then((Gdata) => {
        //             if (Gdata !== null) {
        //                 var obj = { quote_id: Gdata, store_id: this.state.storeId };
        //                 this.props.getCartData(obj);
        //             } 
        //         });
        //     }
        // });
        this.checkNetCnnection();
        Util.getAsyncStorage('lang').then((data) => {
            this.setState({ language: data });
            if (this.state.language !== null) {
                this.setState({ showLanguage: false });
            } else {
                this.getAllCountryAndLangData();
                this.setState({ showLanguage: true });
            }
        });
        setTimeout(() => {
            this.setState({
                showRegisterVIP: true,
            })
        }, 40000);
    }

    getAllCountryAndLangData() {
        var obj1 = 'store_data='
        this.props.getAllCountryAndLang(obj1);
    }

    componentWillUnmount() {
        NetInfo.isConnected.removeEventListener('connectionChange', this.handleConnectionChange);
    }

    async componentWillReceiveProps(nextprops) {
        if (nextprops.status === 'CART_DATA_FAILED') {
            if (nextprops.cartData.code === 400) {
                Util.setAsyncStorage('G_quote_id_digit', nextprops.cartData.new_quote_id);
                Util.setAsyncStorage('S_quote_id_digit', nextprops.cartData.new_quote_id);
            }
        }
        if (Object.keys(nextprops.currentCountryData).length > 0) {
            Util.getAsyncStorage('SELECTED_COUNTRY_LANGUAGE').then((language) => {
                if (JSON.stringify(nextprops.currentCountryData) != JSON.stringify(language)) {
                    this.setState({ homeData: {} });
                    this.checkNetCnnection();
                    Util.setAsyncStorage('SELECTED_COUNTRY_LANGUAGE', nextprops.currentCountryData);
                }
            });
        }
        if (nextprops.allCountryAndLangData.status) {
            Util.getAsyncStorage('SELECTED_COUNTRY_LANGUAGE').then((data) => {
                if(data === null){
                    let allCountry = nextprops.allCountryAndLangData.data;
                    for (var i in allCountry, allCountry) {
                        if (allCountry[i].name === 'UAE_en') {
                            Util.setAsyncStorage('SELECTED_COUNTRY_LANGUAGE', allCountry[i]);
                            this.checkNetCnnection();
                            var obj = 'store=' + parseInt(allCountry[i].store_id)
                            this.props.getMenuList(obj);
                        }
                    }
                }
            });
            Util.setAsyncStorage('ALL_COUNTRY_AND_LANGUAGE', nextprops.allCountryAndLangData);
            
        }
    }

    countrySelect(country) {
        if (country === 'KSA') {
            this.setState({ selectCountry: country, language: MESSAGE.ARABIC, ksaborder: 'ksaborder', uaeborder: null, intborder: null });
        } else if (country === 'UAE') {
            this.setState({ selectCountry: country, language: MESSAGE.ARABIC, ksaborder: null, uaeborder: 'uaeborder', intborder: null });
        } else if (country === 'International') {
            this.setState({ selectCountry: country, language: MESSAGE.ENGLISH, ksaborder: null, uaeborder: null, intborder: 'intborder' });
        }
        this.setState({ countrySelected: true });
        if (this.state.langSelected) {
            this.setState({ buttonDisableEnable: false });
        }
    }

    langSelect(lang) {
        if (lang === 'ar') {
            this.setState({ selectLanguage: lang, language: MESSAGE.ARABIC, arabicbgc: 'arabicbgc', internationalbgc: null });
        } else if (lang === 'en') {
            this.setState({ selectLanguage: lang, language: MESSAGE.ENGLISH, arabicbgc: null, internationalbgc: 'internationalbgc' });
        }
        this.setState({ langSelected: true });
        if (this.state.countrySelected) {
            this.setState({ buttonDisableEnable: false });
        }
    }

    langSubmit() {
        if (this.state.language !== null) {
            let store_data = this.state.selectCountry + '_' + this.state.selectLanguage;
            var obj = {
                store_data: store_data,
            }
            Util.getAsyncStorage('ALL_COUNTRY_AND_LANGUAGE').then((data) => {
                for (var i in data.data) {
                    if (data.data[i].name === store_data) {
                        storeid = data.data[i];
                        Util.setAsyncStorage('SELECTED_COUNTRY_LANGUAGE', data.data[i]);
                        this.checkNetCnnection();
                        var obj = 'store=' + parseInt(data.data[i].store_id)
                        // this.props.getMenuList(obj);
                    }
                }
            });
            Util.setAsyncStorage('lang', this.state.language);
            if (this.state.language === 'en') {
                showToast('You\'ve Choosen English', true);
            } else {
                showToast('You\'ve Choosen Arabic', true);
            }
        }
        this.setState({ showLanguage: false });
    }

    callAmirahSignUp() {
        this.setState({
            showRegisterVIP: false,
        });
        this.props.navigation.navigate("AmirahSignUp");
    }

    registerVIPClub() {
        return (
            <Modal
                animationType="slide"
                transparent={true}
                visible={this.state.showCountry}
                onRequestClose={() => {
                }}
            >

                <View style={COMMONSTYLE.content}>
                    {/* <View style={COMMONSTYLE.container}> */}
                    <View style={{ marginHorizontal: scale(5) }}>

                        <ImageBackground source={{ uri: "https://storage.googleapis.com/nay/icons/Amirah_BG.JPG" }} resizeMode='stretch' style={{ height: scale(500), marginHorizontal: scale(10), }}>
                            <View style={[COMMONSTYLE.heading, { flexDirection: 'row', paddingVertical: verticalScale(15) }]}>
                                <View style={{ width: '85%', alignItems: 'center' }}>
                                </View>
                                <TouchableOpacity style={{ width: '15%', alignItems: 'center' }}>
                                    <MaterialIcons
                                        name='close-circle-outline'
                                        onPress={() => { this.setState({ showRegisterVIP: false }) }}
                                        size={scale(25)}
                                    />
                                </TouchableOpacity>
                            </View>
                            <View style={{ marginTop: scale(22) }}>
                                <View style={{ alignItems: 'center' }}>
                                    <Image style={styles.countryImage} source={require('../../assets/home/amirah-club.png')} />
                                </View>
                            </View>
                            <View style={[styles.orMain, { paddingTop: scale(20) }]}>
                                <Text style={[styles.orAndRestText, { fontFamily: 'cursive', fontStyle: 'italic', fontSize: scale(35) }]}>{I18n.t('registerNow')}</Text>
                            </View>
                            <View style={[styles.orMain, { paddingTop: scale(0) }]}>
                                <Text style={[styles.orAndRestText, { fontSize: scale(40), fontFamily: 'Noto Sans KR' }]}>{I18n.t('toOurVipClub')}</Text>
                            </View>
                            <View style={[styles.orMain, { flexDirection: 'row', }]}>
                                <Text style={styles.orAndRestText}>{I18n.t('vipDiscount')}</Text>
                                {/* <Text style={styles.orAndRestText}>Birthday Treats</Text> */}
                            </View>
                            <View style={[styles.orMain, { flexDirection: 'row' }]}>
                                <Text style={styles.orAndRestText}>{I18n.t('privateEvents')}</Text>
                                {/* <Text style={styles.orAndRestText}>And Much Much More</Text> */}
                            </View>
                            {/* <View style={{ paddingTop: scale(50), alignItems: 'center' }}>
                                <TouchableOpacity style={[COMMONSTYLE.heroLargeButton, COMMONSTYLE.yesBtn, { paddingHorizontal: scale(20), width: '80%' }]} onPress={() => this.callAmirahSignUp()}>
                                    <Text style={styles.yesBtnTxt}>{I18n.t('REGISTER')}</Text>
                                </TouchableOpacity>
                            </View> */}

                        </ImageBackground>
                    </View>
                    {/* </View> */}
                </View>

            </Modal>
        )
    }

    showLanguageChooseDesign() {
        return (
            <View>
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={this.state.showLanguage}
                    onRequestClose={() => {

                    }}
                >
                    <View style={COMMONSTYLE.content}>
                        <View style={[COMMONSTYLE.container, { backgroundColor: COLORS.BASE_WHITE }]}>
                            <View style={COMMONSTYLE.descriptionBtnContainer}>
                                <View style={[styles.heading]}>
                                    <View style={{ flexDirection: 'row', justifyContent: 'space-around', paddingVertical: verticalScale(25) }}>
                                        <Text style={{ fontSize: scale(16), left: scale(20) }}>اختر بلدك/Select Your Country</Text>
                                    </View>
                                    <View style={{ flexDirection: 'row' }}>
                                        <TouchableOpacity style={[(this.state.intborder ? styles.langSelectBorder : styles.langSelected)]}
                                            onPress={() => this.countrySelect('International')}>
                                            <View>
                                                <Image style={[styles.helpCenterBoxImage, { paddingHorizontal: scale(7) }]} source={require('../../assets/sidebar/4.png')} />
                                            </View >
                                            <View>
                                                <Text style={{ fontSize: scale(15), fontWeight: '400' }}>دولي</Text>
                                            </View>
                                            <View>
                                                <Text style={{ fontSize: scale(15), fontWeight: '400' }}>International</Text>
                                            </View>
                                        </TouchableOpacity>
                                        <TouchableOpacity style={[(this.state.uaeborder ? styles.langSelectBorder : styles.langSelected)]}
                                            onPress={() => this.countrySelect('UAE')}>
                                            <View>
                                                <Image style={[styles.helpCenterBoxImage, { paddingHorizontal: scale(7) }]} source={require('../../assets/sidebar/3.png')} />
                                            </View >
                                            <View>
                                                <Text style={{ fontSize: scale(15), fontWeight: '400' }}>الإمارات</Text>
                                            </View>
                                            <View>
                                                <Text style={{ fontSize: scale(15), fontWeight: '400' }}>UAE</Text>
                                            </View>
                                        </TouchableOpacity>
                                        <TouchableOpacity style={[(this.state.ksaborder ? styles.langSelectBorder : styles.langSelected)]}
                                            onPress={() => this.countrySelect('KSA')}>
                                            <View>
                                                <Image style={[styles.helpCenterBoxImage, { paddingHorizontal: scale(7) }]} source={require('../../assets/sidebar/2.png')} />
                                            </View >
                                            <View>
                                                <Text style={{ fontSize: scale(15), fontWeight: '400' }}>المملكة</Text>
                                            </View>
                                            <View>
                                                <Text style={{ fontSize: scale(15), fontWeight: '400' }}>KSA</Text>
                                            </View>
                                        </TouchableOpacity>
                                    </View>
                                    <View style={{ flexDirection: 'row', paddingTop: verticalScale(20) }}>
                                        <View style={{ flex: 1, alignSelf: 'flex-end' }}>
                                            <Text>اختار اللغة/Select Language</Text>
                                        </View>
                                    </View>
                                    <View style={{ flexDirection: 'row', paddingVertical: verticalScale(10) }}>
                                        <TouchableOpacity style={[(this.state.internationalbgc ? styles.langBoxSelectBorder : styles.langBoxSelect)]}
                                            onPress={() => this.langSelect('en')}>
                                            <Text style={[styles.TextStyle, { color: 'black', padding: scale(5) }]}>English/الإنجليزية</Text>
                                        </TouchableOpacity>
                                        <TouchableOpacity style={[(this.state.arabicbgc ? styles.langBoxSelectBorder : styles.langBoxSelect)]}
                                            onPress={() => this.langSelect('ar')}>
                                            <Text style={[styles.TextStyle, { color: 'black', padding: scale(5) }]}>Arabic/عربى</Text>
                                        </TouchableOpacity>
                                    </View>
                                    <View>
                                        <View style={{ alignSelf: 'stretch' }}>
                                            <TouchableOpacity
                                                onPress={() => this.langSubmit()}
                                                disabled={this.state.buttonDisableEnable}
                                                style={[styles.newButton, { opacity: (this.state.buttonDisableEnable ? 0.7 : 1) }]}
                                                activeOpacity={.5}>
                                                <Text style={styles.TextStyle}>Submit/خضع</Text>
                                            </TouchableOpacity>
                                        </View>
                                    </View>
                                </View>
                            </View>
                        </View>

                    </View>
                </Modal>
            </View>
        )
    }


    checkNetCnnection() {
        NetInfo.isConnected.addEventListener('connectionChange', this.handleConnectionChange);
        NetInfo.isConnected.fetch().then(
            (isConnected) => {
                var obj = 'store=2'
                this.props.getHomePageBanners(obj);
                if (isConnected == true) {
                    Util.getAsyncStorage('SELECTED_COUNTRY_LANGUAGE').then((language) => {
                        var obj = { store: language.store_id ? parseInt(language.store_id) : 4 }
                        var obj = 'store=' + language.store_id
                        this.props.getHomePageBanners(obj);
                    });
                    this.props.updateNetworkAvailable();
                }
                else {
                    this.props.updateNetworkLost();
                    this.setState({ showAlert: true, alertHeading: MESSAGE.NETWORK_ERROR_HEADER, alertMessage: MESSAGE.NETWORK_ERROR, alertType: 'OK' });
                }

                this.setState({ networkStatus: isConnected });
            }
        );
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


    _renderInstaImages = ({ item }) => {
        return (
            <TouchableOpacity style={{ marginHorizontal: scale(10) }} onPress={() => Linking.openURL(item.a_link)}>
                <Image style={styles.scrollImageSize} source={{ uri: item.image }} />
            </TouchableOpacity>
        );
    }

    _renderItem ({item, index}) {
        return (
            <View style={styles.slide}>
                 <Image style={{ width: '100%', height: scale('230') }} source={{ uri: item.BLOCK_MOBILE_BANNER }} />
            </View>
        );
    }

    renderOptionItem = ({ item }) => {
        // var showSaleIn = false;
        // var discountedPrice = 0;
        // if (item.buymore_savemore.status) {
        //     var arr = [];
        //     for (var i in item.buymore_savemore.data) {
        //         if (i != 1 && arr.length < 2) {
        //             var data = {}
        //             data[i] = item.buymore_savemore.data[i];
        //             arr.push(data);
        //         } else if (i == 1) {
        //             //this.setState({ showSale : true });
        //             showSaleIn = true;
        //             discountedPrice = item.buymore_savemore.data[i];
        //         }
        //     }
        //     item.offerList = arr;
        // }
        return (
            <TouchableOpacity style={{ width: '50%', alignItems: 'center', paddingBottom: verticalScale(10) }}
                >
                <Image style={{ width: '90%', height: scale('200') }} source={{ uri: item.BLOCK_MOBILE_BANNER }} />
                <View style={{width: '90%',height:scale(50), paddingVertical: scale(15), alignItems: 'center', backgroundColor:'#1da44c', color:'#FFFFFF' }}>
                    <Text style={[styles.itemText,{fontFamily: 'VAGRoundedELC-Light'}]}>{item.TITLE}</Text>
                </View>
            </TouchableOpacity>
        )
    }

    // render(){
    //     return(
    //         <View>
    //             <Text>hihihihihihihihih</Text>
    //             </View>
    //     )
    // }

    render() {
        let homeData = this.props.homeData;
        let homeData1 = {};
        if(homeData){
            homeData1 = homeData.data;
        }
        
        return (
            <View style={styles.container}>
                <HeaderComm changeLang={this.changeLang} navigation={this.props.navigation} />
                {Object.keys(homeData).length > 0 ?
                    <ScrollView showsVerticalScrollIndicator={false}>
                        <Carousel
                                // ref={(c) => { this._carousel = c; }}
                                data={homeData1.banners}
                                renderItem={this._renderItem}
                                sliderWidth={width}
                                itemWidth={width}
                                loop={true}
                                // autoplay={true}
                                autoplayDelay={5000}
                        />
                        <View style={{ flex: 1 }}>
                        <View style={{ padding: scale(5), justifyContent: 'center' }}>
                            <FlatList
                                data={homeData1.blocks}
                                renderItem={this.renderOptionItem}
                                numColumns={2}
                                ItemSeparatorComponent={this.renderSeparator}
                                showsVerticalScrollIndicator={false}
                                key={2}
                                extraData={this.state}
                                keyExtractor={(item, index) => index.toString()}
                            />
                        </View>
                        </View>
                        {/* <TouchableOpacity style={styles.nayomiHolidayText}>
                            <Text style={{ fontSize: scale(20), color: COLORS.BRAND_DARKEST }}>{I18n.t('nayomiHolidayShop')}</Text>
                        </TouchableOpacity> */}
                        {/* <ParallaxScrollView
                            style={{ flex: 1, height: scale(width * 1.2) }}
                            backgroundColor="white"
                            renderBackground={() => <Image style={styles.mainImageSize} source={{ uri: homeData.Block1.BLOCK1_MOBILE_BANNER1 }} />}
                            renderFixedHeader={() => <View style={styles.onImageView}>
                                <Text style={[styles.onImageText]}>{homeData.Block1.BLOCK1_TITLE1}</Text>
                            </View>}
                            parallaxHeaderHeight={scale(width * 1.2)}>
                            <View style={[styles.onImageView]}>
                                <TouchableOpacity onPress={() => this.shopCollection(homeData.Block1.BLOCK1_URL1)}>
                                    <Text style={styles.showCollection}>{I18n.t('shopCollection')}</Text>
                                </TouchableOpacity>
                            </View>
                        </ParallaxScrollView> */}

                        {/* <ParallaxScrollView
                            style={{ flex: 1, height: scale(width * 1.2) }}
                            backgroundColor="white"
                            renderBackground={() => <Image style={styles.mainImageSize} source={{ uri: homeData.Block2.BLOCK2_MOBILE_BANNER1 }} />}
                            parallaxHeaderHeight={scale(width * 1.2)}>
                            <View style={[styles.onImageTextTitle]}>
                                <Text style={[styles.onImageText]}>{homeData.Block2.BLOCK2_TITLE1}</Text>
                            </View>
                            <TouchableOpacity style={[styles.onImageView]} onPress={() => this.shopCollection('glamour-nightwear')}>
                                <Text style={styles.showCollection}>{I18n.t('shopCollection')}</Text>
                            </TouchableOpacity>
                        </ParallaxScrollView> */}

                        {/* <ParallaxScrollView
                            style={{ flex: 1, height: scale(width * 1.2) }}
                            backgroundColor="white"
                            renderBackground={() => <Image style={styles.mainImageSize} source={{ uri: homeData.Block2.BLOCK2_MOBILE_BANNER2 }} />}
                            parallaxHeaderHeight={scale(width * 1.2)}>
                            <View style={styles.onImageTextTitle}>
                                <Text style={[styles.onImageText, { flexDirection: 'row' }]}>{homeData.Block2.BLOCK2_TITLE2}</Text>
                            </View>
                            <TouchableOpacity style={[styles.onImageView, { bottom: scale(175) }]} onPress={() => this.shopCollection('glamour-nightwear')}>
                                <Text style={styles.showCollection}>{I18n.t('shopCollection')}</Text>
                            </TouchableOpacity>
                        </ParallaxScrollView> */}

                        {/* <ParallaxScrollView
                            style={{ flex: 1, height: scale(width * 1.2) }}
                            backgroundColor="white"
                            renderBackground={() => <Image style={styles.mainImageSize} source={{ uri: homeData.Block3.BLOCK3_MOBILE_BANNER1 }} />}
                            parallaxHeaderHeight={scale(width * 1.2)}>
                            <View style={styles.onImageTextTitle}>
                                <Text style={{ color: '#404040', fontSize: scale(30) }}>{homeData.Block3.BLOCK3_TITLE1}</Text>
                            </View>
                            <TouchableOpacity onPress={() => this.shopCollection(homeData.Block3.BLOCK3_URL1)}>
                                <Text style={[styles.showCollection, { color: '#f599ba' }]}>{I18n.t('shopCollection')}</Text>
                            </TouchableOpacity>
                        </ParallaxScrollView>

                        <ParallaxScrollView
                            style={{ flex: 1, height: scale(width * 1.2) }}
                            backgroundColor="white"
                            renderBackground={() => <Image style={styles.mainImageSize} source={{ uri: homeData.Block3.BLOCK3_MOBILE_BANNER2 }} />}
                            parallaxHeaderHeight={scale(width * 1.2)}>
                            <View style={styles.textOnImages2} >
                                <Text style={{ color: '#404040', fontSize: scale(30) }}>{homeData.Block3.BLOCK3_TITLE2}</Text>
                                <TouchableOpacity onPress={() => this.shopCollection(homeData.Block3.BLOCK3_URL2)}>
                                    <Text style={[styles.showCollection, { color: '#f599ba' }]}>{I18n.t('shopCollection')}</Text>
                                </TouchableOpacity>
                            </View>
                        </ParallaxScrollView> */}

                        {/* <ParallaxScrollView
                            style={{ flex: 1, height: scale(width * 1.2) }}
                            backgroundColor="white"
                            renderBackground={() => <Image style={styles.mainImageSize} source={{ uri: homeData.Block4.BLOCK4_MOBILE_BANNER1 }} />}
                            parallaxHeaderHeight={scale(width * 1.2)}>
                            <View style={styles.Block4_Titl4}>
                                <Text style={[styles.onImageText]}>{homeData.Block4.BLOCK4_TITLE}</Text>
                            </View>
                            <TouchableOpacity style={[styles.Block4_Titl4, { top: scale(110) }]} onPress={() => this.shopCollection(homeData.Block4.BLOCK4_URL)}>
                                <Text style={styles.showCollection}>{I18n.t('shopCollection')}</Text>
                            </TouchableOpacity>
                        </ParallaxScrollView> */}
                        <View style={{ paddingVertical: scale(10), height: scale(400) }}>
                            <View style={{ flexDirection: 'row' }}>
                                <Text style={styles.youMayText}>{I18n.t('youMayAlsoLove')}</Text>
                            </View>
                            {/* <ScrollView style={{paddingVertical: verticalScale(10)}} horizontal = {true} showsHorizontalScrollIndicator={false}> */}
                            {/* {homeData1.banners ?<FlatList
                                data={homeData1.banners}
                                renderItem={this.renderOptionItem}
                                ItemSeparatorComponent={this.renderSeparator}
                                horizontal={true}
                                showsHorizontalScrollIndicator={false}
                                style={{ marginTop: scale(10) }}
                                keyExtractor={(item, index) => index.toString()}
                            /> : <View />} */}
                            
                            {/* </ScrollView> */}
                        </View>
                        

                        {/* <TouchableOpacity style={styles.textView}
                            onPress={() => Linking.openURL('https://www.instagram.com/nayomimena/')}>
                            <View style={[styles.happningNowMain, I18n.locale == 'ar' ? { flexDirection: 'row-reverse' } : {}]}>
                                <MaterialIcons
                                    name={"instagram"}
                                    color={'grey'}
                                    size={scale(30)}
                                />
                                <Text style={styles.textSize}>{"  "}{I18n.t('happeningNow')}<Text style={{ color: COLORS.BRAND_DARKEST }}>{I18n.t('Nayomi')}</Text></Text>
                            </View>
                        </TouchableOpacity> */}
                        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
                            {/* <FlatList
                                data={homeData.instagram.image_data}
                                renderItem={this._renderInstaImages}
                                numColumns={homeData.instagram.image_data.length}
                                keyExtractor={(item, index) => index.toString()}
                            // numColumns={2} 
                            // ItemSeparatorComponent={this.renderInstaImages}  
                            /> */}

                        </ScrollView >
                        <Footer {...this.props} />
                    </ScrollView> :
                    <View style={{ flex: 1, justifyContent: 'center' }}>
                        <ActivityIndicator size="large" color="#0000ff" />
                    </View>}
                {this.state.showAlert ?
                    <View>{this.renderCustomAlert()}</View> : <View />}
                {/* {this.state.showLanguage ?
                    <View>{this.showLanguageChooseDesign()}</View> : <View />} */}
                {/* {this.state.showRegisterVIP ?
                    <View>{this.registerVIPClub()}</View> : <View />} */}
            </View>
        );
    }
}

function mapStateToProps(state) {
    const { HomeReducer, CommonReducer } = state;
    return {
        // productMenuList: ProductReducer.productMenuList,
        homeData: HomeReducer.homeData,
        allCountryAndLangData: CommonReducer.allCountryAndLangData,
        currentCountryData: CommonReducer.currentCountryData,
        // cartData: CartReducer.cartData,
        // status: CartReducer.status,
    };
}
const mapDispatchToProps = (dispatch) => {
    return {
        getHomePageBanners: (obj) => {
            dispatch(getHomeData(obj))
        },
        updateNetworkLost: () => {
            dispatch(networkLost());
        },
        updateNetworkAvailable: () => {
            dispatch(networkAvailable());
        },
        getAllCountryAndLang: (obj) => {
            dispatch(getAllCountryAndLangData(obj));
        },
        // getCartData: (obj) => {
        //     dispatch(getCart(obj));
        // },
        getMenuList: (obj) => {
            dispatch(getProductMenuList(obj))
        },
    };

};


export default connect(mapStateToProps, mapDispatchToProps)(Home);
