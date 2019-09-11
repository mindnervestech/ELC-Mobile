import React, { Component } from 'react';
import { Text, View, ScrollView, StyleSheet, ActivityIndicator, Image, ImageBackground, Modal, TextInput, TouchableOpacity, Linking } from 'react-native';
import COMMONSTYLE from '../../utils/Style'
import ModalDropdown from 'react-native-modal-dropdown';
import Ionicons from "react-native-vector-icons/MaterialCommunityIcons";
import Collapsible from 'react-native-collapsible';
import MaterialIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { connect } from 'react-redux';
import NetInfo from "@react-native-community/netinfo"
import { getProductMenuList } from '../../actions/ProductAction';
import { networkLost, networkAvailable, updateCurrentCountry } from '../../actions/CommonAction';
import * as COLORS from '../../utils/Color'
import I18n from '../../localization/index';
import { scale, verticalScale } from '../../utils/Scale';
import styles from './Style';
import Util from '../../utils/Util';
import RNRestart from 'react-native-restart';



class drawerContentComponents extends Component {

    constructor(props) {
        super(props)
        this.state = {
            country: '',
            searchText: '',
            timeout: 0,
            menuCollapse: {},
            showCountry: false,
            productMenuList: {},
            userSignInData: {},
            selectCountryCollapse: true,
            selectedCountry: {},
            currentCountryData: {},
            prevState: "''",
        }
    }

    toggleCollapse(collapseType) {
        switch (collapseType) {
            case "selectCountry":
                this.setState({ selectCountryCollapse: !this.state.selectCountryCollapse })
                break;
        }
    }
    componentDidMount() {

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
        this.checkNetCnnection();
        Util.getAsyncStorage('SELECTED_COUNTRY_LANGUAGE').then((select) => {
            this.setState({ selectedCountry: select })
        });

    }
    componentWillUnmount() {
        NetInfo.isConnected.removeEventListener('connectionChange', this.handleConnectionChange);
    }

    componentWillReceiveProps(nextprops) {
            Util.getAsyncStorage('SIGN_IN_DATA').then((data) => {
            this.setState({ userSignInData : data })
         });
        if (nextprops.productMenuStatus) {
            Util.getAsyncStorage('SELECTED_COUNTRY_LANGUAGE').then((select) => {
                this.setState({ productMenuList: nextprops.productMenuList.data, selectedCountry: select })
            });
            // this.setState({ productMenuList: nextprops.productMenuList.data })
        }
    }


    checkNetCnnection() {
        NetInfo.isConnected.addEventListener('connectionChange', this.handleConnectionChange);
        NetInfo.isConnected.fetch().then(
            (isConnected) => {
                if (isConnected == true) {
                    Util.getAsyncStorage('SELECTED_COUNTRY_LANGUAGE').then((select) => {
                        var obj = 'store='+select.store_id
                        this.props.getMenuList(obj);
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

    getProductData(item) {
        console.log(item)
        Util.getAsyncStorage('SELECTED_COUNTRY_LANGUAGE').then((language) => {
            Util.getAsyncStorage('SIGN_IN_DATA').then((data) => {
                var obj = {
                    customerid: data === null ? "" : data.customer_id,
                    filters: {},
                    sortby: "relevance",
                    storeid: parseInt(language.store_id),
                    url_key: item.url_key
                }
                setTimeout(() => {
                    this.props.navigation.closeDrawer();
                }, 10);
                this.props.navigation.navigate('ProductList', { objectData: obj, comeFrom: 'product' });
            });
        });
    }


    showCountryModal() {
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
                        <View style={COMMONSTYLE.container}>
                            <View style={COMMONSTYLE.descriptionBtnContainer}>
                                <View style={COMMONSTYLE.heading}>
                                    <Text style={styles.selectCountryText}>Select your country</Text>
                                </View>
                                <View style={[styles.countryImageTextMain]}>
                                    <View style={{ alignItems: 'center' }}>
                                        <Image style={styles.countryImage} source={require('../../assets/home/amirah-club.png')} />
                                        <Text style={styles.countryText}>KSA</Text>
                                    </View>
                                    <View style={{ alignItems: 'center' }}>
                                        <Image style={styles.countryImage} source={require('../../assets/home/amirah-club.png')} />
                                        <Text style={styles.countryText}>UAE</Text>
                                    </View>
                                    <View style={{ alignItems: 'center' }}>
                                        <Image style={styles.countryImage} source={require('../../assets/home/amirah-club.png')} />
                                        <Text style={styles.countryText}>International</Text>
                                    </View>
                                </View>
                                <View style={styles.orMain}>
                                    {/* <Text>أو</Text> */}
                                    <Text style={styles.orAndRestText}>OR</Text>
                                </View>
                                <View style={styles.restOfWorldMain}>
                                    {/* <Text>بقية العالم:</Text> */}
                                    <Text style={styles.orAndRestText}>Rest of the world:</Text>
                                </View>
                                <View style={[styles.countryModalMain]}>
                                    <ModalDropdown
                                        ref={el => this._weeklydropdown = el}
                                        options={['option 1', 'option 2', 'option 3', 'option 4', 'option 5', 'option 6']}
                                        style={styles.modalStyle}
                                        dropdownStyle={styles.modalDropdownStyle}
                                        dropdownTextStyle={styles.modalTextDropdownTextStyle}
                                        textStyle={styles.modalTextDropdownTextStyle}
                                        defaultValue={'Select Country'}
                                    />
                                    <TouchableOpacity style={styles.modalIcon} onPress={() => { this._weeklydropdown && this._weeklydropdown.show(); }}>
                                        <MaterialIcons
                                            name="chevron-down"
                                            color={COLORS.BRAND_DARKEST}
                                            size={scale(30)}
                                        />
                                    </TouchableOpacity>
                                </View>
                                <View style={[styles.selectLanguageMain]}>
                                    <Text style={{ fontSize: 18 }}>Select Language</Text>
                                    <View style={{ flexDirection: 'row' }}>
                                        <Text>{I18n.t('english')}</Text>
                                        <Text>{I18n.t('arabic')}</Text>
                                    </View>
                                </View>
                                <View style={COMMONSTYLE.btnMain}>
                                    <TouchableOpacity style={[COMMONSTYLE.heroLargeButton, COMMONSTYLE.yesBtn]} onPress={() => { this.setState({ showCountry: false }) }}>
                                        <Text style={COMMONSTYLE.yesBtnTxt}>Go</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>
                    </View>
                </Modal>
            </View>)

    }

    _renderSubMenuItem = (item, index) => {
        return (
            <TouchableOpacity key={`_renderSubMenuItem${item.name + index}`} style={[{ marginBottom: 6 }]} onPress={() => { this.getProductData(item) }} key={`render_sub_menu_item_${item.entity_id}`}>
                <Text style={{ fontSize: 14, fontFamily:'VAGRoundedELC-Light',color:'#0D943F', fontWeight:'700' }}>{item.name}</Text>
            </TouchableOpacity>
        )
    }

    _renderSubMenuList = (data, item_name) => {
        let styleCat = data.filter((hero) => {
            return hero.custom_category_attribute === 'style';
        });

        let collectionCat = data.filter((hero) => {
            return hero.custom_category_attribute === 'collection';
        });
        return (
            <View key={`_renderSubMenuList${item_name}`}>
                <View style={{ marginBottom: 5 }}>
                    {/* <View style={[styles.styleCollection]}>
                        <Text style={{ fontSize: 18, color: COLORS.BRAND_DARKEST }}>{I18n.t('style')}</Text>
                    </View> */}
                    {/* <TouchableOpacity key={`_renderSubMenuItem${item.name + index}`} style={[{ marginBottom: 5 }]} onPress={() => { this.getProductData(item) }} key={`render_sub_menu_item_${item.entity_id}`}>
                        <Text style={{ fontSize: 16 }}>{item.name}</Text>
                    </TouchableOpacity> */}
                    {data.map(this._renderSubMenuItem)}
                </View>
                <View style={{ marginBottom: 5 }}>
                    {/* <View style={[styles.styleCollection]}>
                        <Text style={{ fontSize: 18, color: COLORS.BRAND_DARKEST }}>{I18n.t('collection')}</Text>
                    </View> */}
                    {/* {collectionCat.map(this._renderSubMenuItem)} */}
                </View>
            </View>
        )
    }

    _checkSubMenu = item => {
        if (item.hasOwnProperty('children')) {
            return (
                <View key={`_checkSubMenu${item.entity_id}`} style={{ marginHorizontal: 50 }}>
                    {/* <View style={[{ paddingTop: 15 }]}>
                        <Text style={{ fontSize: scale(16) }} onPress={() => { this.getProductData(item) }}> {I18n.t('showAll')} {`${item.name}`.toUpperCase()} </Text>
                    </View> */}
                    {
                        item.children.map(
                            (x) => this._renderSubMenuList(x, item.name)
                        )
                    }
                    <View style={{ alignItems: 'center' }}>
                        {/* <Image
                            resizeMode='stretch'
                            style={{ height: scale(100), width: '100%' }}
                            resizeMode='contain'
                            source={{ uri: item.image }}
                        /> */}

                    </View>
                    <View>
                        <View>
                            <View>
                                <View>
                                    <View>
                                        <Image source={{ uri: 'http://nayomijsuat.iksulalive.com/static/media/bra-sar-en.fb57cfc8.jpg' }} />
                                    </View>
                                </View>
                            </View>
                        </View>
                    </View>
                </View>
            )
        }
    }

    _renderMenuList = (item, index) => {
        return (
            <View key={`render_menu_list_${item.entity_id}`}>
                <View style={[styles.menuList]}>
                    <TouchableOpacity style={{width:'85%'}} onPress={() => { this.getProductData(item) }}>
                        <Text style={{ fontSize: 16, fontFamily: 'VAGRoundedELC-Light' }}>{item.name}</Text>
                    </TouchableOpacity>
                    {item.children[0].length > 0 ?
                    <TouchableOpacity onPress={() => {
                        let menuCollapse = this.state.menuCollapse;
                        if (this.state.prevState != "''" && this.state.prevState != item.name) {
                            menuCollapse[this.state.prevState] = false;
                        }
                        if (this.state.menuCollapse[item.name]) {
                            menuCollapse[item.name] = false;
                            this.setState({ menuCollapse })
                        } else {
                            menuCollapse[item.name] = true;
                            this.setState({ menuCollapse })
                        }
                        this.setState({ prevState: item.name });

                    }}>
                        <Ionicons name={this.state.menuCollapse[item.name] == undefined || !this.state.menuCollapse[item.name] ? "plus" : "minus"} color="black" size={20} />
                    </TouchableOpacity> : <View />}
                </View>
                <Collapsible collapsed={!this.state.menuCollapse[item.name]}>
                    {this._checkSubMenu(item)}
                </Collapsible>
            </View>
        )
    }

    _renderMenuNavigation = (item, index) => {
        const { productMenuList } = this.state;
        return productMenuList[item].map(this._renderMenuList)
    }

    _navigateLoginOrProfile = (userSignInData) => {
        if (userSignInData) {
            this.props.navigation.navigate('Profile', { 'profileData': userSignInData, 'flag': false})
        } else {
            this.props.navigation.navigate('SignIn')
        }
    }

    _navigateLoginOrWishlist = (userSignInData) => {
        if (userSignInData) {
            this.props.navigation.navigate('Profile', { 'profileData': userSignInData, 'flag': true})
        } else {
            this.props.navigation.navigate('SignIn')
        }
    }

    // _onLogout = () =>{
    //     Util.removeAsyncstorage('SIGN_IN_DATA').then((data) => {
    //         this.setState({ userSignInData : null })
    //      });
    // }

    _searchInputChange = (searchText) => {
        const { timeout } = this.state
        this.setState({ searchText: searchText });
        if (timeout) {
            clearTimeout(timeout);
        }

        Util.getAsyncStorage('SELECTED_COUNTRY_LANGUAGE').then((select) => {
            Util.getAsyncStorage('SIGN_IN_DATA').then((data) => {
                this.setState({
                    timeout: setTimeout(() => {
                        var obj = {
                            customerid: data === null ? "" : data.customer_id,
                            filters: {},
                            q: searchText,
                            page: 1,
                            limit: 5,
                            sortby: "relevance",
                            storeId: select.store_id
                        }
                        this.props.navigation.closeDrawer();
                        this.props.navigation.navigate('ProductList', { objectData: obj, comeFrom: 'search' });
                        this.setState({ searchText: '' });
                    }, 5000)
                });
            });
        });
    }

    setCountry(country) {
        Util.getAsyncStorage('ALL_COUNTRY_AND_LANGUAGE').then((data) => {
            console.log(data);
            Util.getAsyncStorage('SELECTED_COUNTRY_LANGUAGE').then((select) => {
                console.log(select);
                for (var i in data.data) {
                    console.log(data.data[i].country, country);
                    console.log(data.data[i].language, select.language);
                    if (data.data[i].country == country && data.data[i].language == select.language) {
                        this.setState({ selectedCountry: data.data[i] });
                        Util.setAsyncStorage('SELECTED_COUNTRY_LANGUAGE', data.data[i]);
                        this.props.getCurrentCountry(data.data[i]);
                        setTimeout(() => {
                            this.props.navigation.closeDrawer();
                        }, 10);
                    }
                }
            });
        });
        setTimeout(() => {
            RNRestart.Restart();
        }, 50);
    }

    goTOStoreLocator() {
        Util.getAsyncStorage('SELECTED_COUNTRY_LANGUAGE').then((select) => {
            this.setState({ selectedCountry: select })
            this.props.navigation.closeDrawer();
            this.props.navigation.navigate("StoreLocator", select.country === 'saudi' ? { country: 'Saudi Arabia' } : { country: 'United Arab Emirates' })
        });
    }

    render() {
        const { userSignInData, productMenuList, selectedCountry} = this.state;
        //   const productMenuList = Object.keys(this.props.productMenuList).length > 0 ?  this.props.productMenuList.data : {};
        return (
            <View>
                {Object.keys(productMenuList).length > 0 ?
                    <View style={{ marginTop: scale(30) }}>
                        <ScrollView showsVerticalScrollIndicator={false}>
                            <TouchableOpacity style={[styles.loginContainer]} onPress={() => this._navigateLoginOrProfile(userSignInData)}>
                                <View>
                                    <Ionicons name="account-circle-outline" color="#0D943F" size={45} />
                                </View>
                                <View style={{ marginTop: -1 }}>
                                    <Text style={{ fontSize: 18, marginLeft: 8, fontFamily: 'VAGRoundedELC-Light' }}> {userSignInData ? userSignInData.firstname : I18n.t('login')}</Text>
                                </View>
                            </TouchableOpacity>
                            <View style={[styles.searchConatiner]}>
                                <View>
                                    <Ionicons name="magnify" color="#575657" size={25} />
                                </View>
                                <View style={{ width: "70%" }}>
                                    <TextInput
                                        style={styles.searchTextInput}
                                        onChangeText={this._searchInputChange}
                                        value={this.state.searchText}
                                        placeholder={I18n.t('search')}
                                    />
                                </View>
                            </View>
                            {/* <View style={[styles.offersList]}>
                                <TouchableOpacity onPress={() => { this.props.navigation.navigate('HomeOffers') }}>
                                    <Text style={{ fontSize: 18, fontWeight: '600' }}>{I18n.t('offers')}</Text>
                                </TouchableOpacity>
                            </View> */}

                            {Object.keys(productMenuList).map(this._renderMenuNavigation)}


                            {/* <View
            style={{
                backgroundColor: '#f50057',
                height: 140,
                alignItems: 'center',
                justifyContent: 'center',
            }}
            >
            <Text style={{ color: 'white', fontSize: 30 }}>
                Header
            </Text>
            <View style={{flex:1, flexDirection: 'row', justifyContent: 'space-around', paddingVertical: 18,}}>
            <Text style={{paddingRight: '20%', fontSize: 22, color: '#f599bb'}}  
            onPress={() => this.props.navigation.navigate("SignIn")}>Sign In</Text>
            <Text style={{fontSize: 22, color: '#f599bb'}} onPress={() => this.props.navigation.navigate("SignUp")}>Sign Up</Text>
            </View>
            </View> */}
                            {/* <TouchableOpacity style={{padding : 20}} onPress={ () => this.setState({showCountry : true})}>
                <Text>Select your country</Text>
            </TouchableOpacity> */}
                            <View>
                                <TouchableOpacity style={{ paddingHorizontal: scale(20) }} onPress={() => this.toggleCollapse('selectCountry')}>
                                    <View style={[styles.collapseTextPlusStart]}>
                                        {/* {selectedCountry.country === 'international' ? <Image style={[styles.helpCenterBoxImage, { paddingHorizontal: scale(7) }]} source={require('../../assets/sidebar/4.png')} /> : <View />} */}
                                        {selectedCountry.country === 'saudi' ? <Image style={[styles.helpCenterBoxImage, { paddingHorizontal: scale(7) }]} source={require('../../assets/sidebar/2.png')} /> : <View />}
                                        {selectedCountry.country === 'uae' ? <Image style={[styles.helpCenterBoxImage, { paddingHorizontal: scale(7) }]} source={require('../../assets/sidebar/3.png')} /> : <View />}
                                        <Text style={{ top: scale(6), paddingHorizontal: scale(7), fontFamily:'VAGRoundedELC-Light' }}>  {I18n.t('SELECT_YOUR_COUNTRY')}</Text>
                                    </View> 
                                    
                                </TouchableOpacity>
                                <Collapsible collapsed={this.state.selectCountryCollapse}>
                                    <View style={{ paddingHorizontal: scale(20) }}>
                                        <TouchableOpacity onPress={() => { this.setCountry('saudi') }} style={[styles.collapseTextPlus]}>
                                            <Image style={[styles.helpCenterBoxImage, { paddingHorizontal: scale(7) }]} source={require('../../assets/sidebar/2.png')} />
                                            <Text style={{ top: scale(6), paddingHorizontal: scale(7) }}>  {I18n.t('KSA')}</Text>
                                        </TouchableOpacity>
                                        <TouchableOpacity onPress={() => { this.setCountry('uae') }} style={[styles.collapseTextPlus]}>
                                            <Image style={[styles.helpCenterBoxImage, { paddingHorizontal: scale(7) }]} source={require('../../assets/sidebar/3.png')} />
                                            <Text style={{ top: scale(6), paddingHorizontal: scale(7) }}>  {I18n.t('UAE')}</Text>
                                        </TouchableOpacity>
                                        {/* <TouchableOpacity onPress={() => { this.setCountry('international') }} style={[styles.collapseTextPlus]}>
                                            <Image style={[styles.helpCenterBoxImage, { paddingHorizontal: scale(7) }]} source={require('../../assets/sidebar/4.png')} />
                                            <Text style={{ top: scale(6), paddingHorizontal: scale(7) }}>  {I18n.t('INTERNATIONAL')}</Text>
                                        </TouchableOpacity> */}
                                    </View>
                                </Collapsible>
                            </View>

                            <View style={[styles.belowIcons]}>
                                {/* <TouchableOpacity style={styles.circleIcons} onPress={() => { this.goTOStoreLocator('international') }}
                                >
                                    <MaterialIcons
                                        name='map-marker-outline'
                                        size={scale(35)}
                                        style={{ color: '#f5a0c0' }}

                                    />
                                </TouchableOpacity> */}
                                {/* <TouchableOpacity style={styles.circleIcons}
                                    onPress={() => {this.props.navigation.closeDrawer(); this.props.navigation.navigate("AmirahSignUp")}}>
                                    <Image style={{ width: scale(50), height: scale(50) }} resizeMode='contain' source={require('../../assets/home/amirah-club.png')} />
                                    
                                </TouchableOpacity> */}
                                {/* <TouchableOpacity style={styles.circleIcons}
                                    onPress={() => this._navigateLoginOrWishlist(userSignInData)}>
                                    <MaterialIcons
                                        name='heart-outline'
                                        size={scale(35)}
                                        style={{ color: '#f5a0c0' }}

                                    />
                                </TouchableOpacity> */}
                                {/* <TouchableOpacity style={styles.circleIcons}
                                    onPress={() => {this.props.navigation.closeDrawer(); Linking.openURL('https://api.whatsapp.com/send?phone=+971565069237')}}>
                                    <MaterialIcons
                                        name='whatsapp'
                                        size={scale(35)}
                                        style={{ color: '#f5a0c0' }}

                                    />
                                </TouchableOpacity> */}
                            </View>
                            {/* <TouchableOpacity style={{ padding: 20 }} onPress={() => this._onLogout()}>
                                <Text>Logout</Text>
                            </TouchableOpacity> */}
                        </ScrollView>
                    </View>
                    :
                    <View style={{ paddingTop: 50 }}>
                        <ActivityIndicator size="large" color="#0000ff" />
                    </View>}
                {this.state.showCountry ?
                    <View>{this.showCountryModal()}</View> : <View />}
            </View>
        )
    }
}

function mapStateToProps(state) {
    const { ProductReducer, CommonReducer } = state;
    return {
        productMenuList: ProductReducer.productMenuList,
        currentCountryData: CommonReducer.currentCountryData,
        productMenuStatus: ProductReducer.productMenuStatus
    };
}
const mapDispatchToProps = (dispatch) => {
    return {
        getMenuList: (obj) => {
            dispatch(getProductMenuList(obj))
        },
        updateNetworkLost: () => {
            dispatch(networkLost());
        },
        updateNetworkAvailable: () => {
            dispatch(networkAvailable());
        },
        getCurrentCountry: (country) => {
            dispatch(updateCurrentCountry(country));
        },
    };

};


export default connect(mapStateToProps, mapDispatchToProps)(drawerContentComponents);
