import React, { Component } from 'react';
import Reactative, { View, Image, Text, TouchableOpacity} from 'react-native';
import Ionicons from "react-native-vector-icons/FontAwesome";
import { getStatusBarHeight } from 'react-native-status-bar-height';
import I18n from '../../localization/index';
import * as COLORS from '../../utils/Color';
import RNRestart from 'react-native-restart';
import { scale, verticalScale } from '../../utils/Scale';
import styles from './Style';
import Util from '../../utils/Util';
import { getProductMenuList } from '../../actions/ProductAction';
import { connect } from 'react-redux';
import COMMONSTYLE from '../../utils/Style';


class Header extends Component {

    constructor(props) {
        super(props);
        this.state = {
            text: '',
            productMenuList: {},
            offerMessage: '',
            // cartCount: 0
            cartCount: ('cartData' in this.props ) && (Object.keys(this.props.cartData).length > 0 && this.props.cartData.code !== 400 && this.props.cartData.message !== 'No Products in cart') ? ('data' in this.props.cartData) ? this.props.cartData.data.cart_count : 0 : 0,
            comesFrom: this.props.comesFrom,
        };

    }

    componentWillReceiveProps(nextProps) {
        this.setState({ offerMessage: nextProps.productMenuList.OfferMessage });
        Util.setAsyncStorage('offerMessage', nextProps.productMenuList.OfferMessage);
        if(nextProps.cartData.status) {
            if(nextProps.cartData.message !== 'No Products in cart') {
                this.setState({cartCount: nextProps.cartData.data.cart_count});
            } else {
                this.setState({cartCount: 0});
            }
        }        
    }

    componentDidMount() {
        // this.props.onRef(this);
        Util.getAsyncStorage('offerMessage').then((data) => {
            this.setState({ offerMessage: data });
        });
    }

    componentWillMount() {
        Util.getAsyncStorage('SIGN_IN_DATA').then((data) => {
            this.setState({ userData: data })
        });
    } 

    changeLanguage = (lang) => {
        if (lang === 'en') {
            I18n.locale = 'en';
            this.setState({ text: 'en' })
        } else {
            I18n.locale = 'ar';
            this.setState({ text: 'ar' })
        }
        Util.setAsyncStorage('CURRENT_LANGUAGE', lang);

        Util.getAsyncStorage('ALL_COUNTRY_AND_LANGUAGE').then((data) => {
            Util.getAsyncStorage('SELECTED_COUNTRY_LANGUAGE').then((select) => {
                for (var i in data.data) {
                    if (data.data[i].country == select.country && data.data[i].language == lang) {
                        Util.setAsyncStorage('SELECTED_COUNTRY_LANGUAGE', data.data[i]);
                        var obj = 'store='+data.data[i].store_id
                        this.props.getMenuList(obj);
                    }
                }
            });
        });
        this.props.changeLang(lang);

        setTimeout(()=> {
            if (I18n.locale === 'ar') {
                Reactative.I18nManager.isRTL = true
                Reactative.I18nManager.forceRTL(true);
                Reactative.I18nManager.allowRTL(true);
                RNRestart.Restart();
            } else {
                Reactative.I18nManager.isRTL = false;
                Reactative.I18nManager.forceRTL(false);
                Reactative.I18nManager.allowRTL(false);
                RNRestart.Restart();
            }
        }, 50)
    }

    componentDidUpdate() {

    }

    componentWillUpdate() {

    }

    render() {
        const { offerMessage, comesFrom } = this.state;
        return (
            <View style={{ marginTop: getStatusBarHeight(true) }}>
                {comesFrom !== 'checkout' ? 
                <View>
                <View style={[styles.header]}>
                    <TouchableOpacity style={{ width: '35%', alignItems: 'flex-start' }} onPress={() => this.props.navigation.toggleDrawer()}>
                        <Ionicons name="bars" size={30} color='#fff' style={{ left: scale(15) }} />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.imageNayomi} onPress={() => this.props.navigation.navigate('Home')}>
                        <Image source={require('../../assets/home/favicon.png')} style={styles.imageSize} />
                        
                    </TouchableOpacity>

                    <View style={[styles.headerIcon]}>
                        <View style={{ flexDirection: 'row',  justifyContent: 'center', top: scale(10)  }}>
                            <TouchableOpacity onPress={() => this.changeLanguage('en')}>
                                <Text style={{ color: '#fff' }}>{I18n.t('english')}</Text>
                            </TouchableOpacity>
                            <Text style={{ color: '#fff' }}>|</Text>
                            <TouchableOpacity onPress={() => this.changeLanguage('ar')}>
                                <Text style={{ color: '#fff' }}>{I18n.t('arabic')}</Text>
                            </TouchableOpacity>

                        </View>
                        <TouchableOpacity style={{ marginHorizontal: scale(13), top: scale(-7) }}
                            onPress={() => this.props.navigation.navigate('Cart')}>
                            <TouchableOpacity style={[styles.heroLargeButton, { height: scale(20), top: scale(7), left: scale(6), zIndex: 1 }]}
                                              onPress={() => this.props.navigation.navigate('Cart')}>
                                <Text style={[COMMONSTYLE.yesBtnTxt, {fontSize: scale(12)}]}>{this.state.cartCount}</Text>
                            </TouchableOpacity>
                            <Ionicons name={I18n.t('shopplingBag')} size={20} color="#fff" />
                        </TouchableOpacity>
                    </View>
                </View>
                <TouchableOpacity style={styles.nayomiHolidayText}>
                    <Text style={{ fontSize: scale(20), color: COLORS.BRAND_DARKEST, textAlign: 'center' }}>{offerMessage}</Text>
                </TouchableOpacity> 
                </View> :
                <View style={[styles.header]}> 
                    <TouchableOpacity style={styles.imageNayomi} onPress={() => this.props.navigation.navigate('Home')}>
                        <Image source={require('../../assets/home/favicon.png')} style={styles.imageSize} />
                    </TouchableOpacity>
                </View> }
            </View>
        );
    }
}

// export default Header;

function mapStateToProps(state) {
    const { ProductReducer, CartReducer } = state;
    return {
        productMenuList: ProductReducer.productMenuList,
        cartData: CartReducer.cartData,
    };
}
const mapDispatchToProps = (dispatch) => {
    return {
        getMenuList: (obj) => {
            dispatch(getProductMenuList(obj))
        },
    };

};


export default connect(mapStateToProps, mapDispatchToProps)(Header);
