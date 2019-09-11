import React, { Component } from 'react';
import {
    View,
    Text,
    ScrollView,
    TouchableOpacity
} from 'react-native';
import { connect } from 'react-redux'
import Footer from '../../common/footer';
import HeaderComm from '../../common/header/header';
import SignIn from '../../pages/SignIn/SignIn'
import Delivery from '../../pages/Checkout/delivery'
import Payment from '../../pages/Checkout/payment'
import Confirmation from '../../pages/Checkout/confirmation'
import Util from '../../utils/Util'

import I18n from '../../localization/index';
import { scale } from '../../utils/Scale';
import MaterialIcons from "react-native-vector-icons/MaterialCommunityIcons";
import styles from './Style'

class mainCheckout extends Component {

    constructor(props) {
        super(props)
        const {comesFrom} = this.props.navigation.state.params
        this.state = {
            userSignInData: {},
            signInFlag: false,
            deliveryFlag: false,
            paymentFlag: false,
            confirmationFlag: false,
            comesFrom: '',
            collectAndDeliveryFlag: false,
            checkStateUpdate: false,
            buttonDisableEnable: true,
        }
    }

    componentWillMount() {
        Util.getAsyncStorage('SIGN_IN_DATA').then((data) => {
            this.setState({ userSignInData: data, signInFlag : (Object.keys(data).length > 0 ? true : false)})
        });
    } 

    componentDidUpdate(prevProps){
        // const {comesFrom} = this.props.navigation.state.params.comesFrom;
        // if(comesFrom === 'SignUp') {
        //     console.log('inside comesFrom');
        //     this.setState({ signInFlag: true });
        // }   
        const { checkStateUpdate } = this.state;
        if(this.props.navigation.state.params.comesFrom === 'SignUp') {
            if(!checkStateUpdate) {
                this.setState({ signInFlag: true, checkStateUpdate: true });
            }
        }   
    }

    // shouldComponentUpdate(nextProps) {
    //     console.log('shouldComponentUpdate shouldComponentUpdate', nextProps)
    //     return true;
    // }


    componentWillReceiveProps(nextProps) {
    }

    changeLang = (lang) => {
        Util.getAsyncStorage('ALL_COUNTRY_AND_LANGUAGE').then((data) => {
            Util.getAsyncStorage('SELECTED_COUNTRY_LANGUAGE').then((select) => {
                for(var i in data.data){
                    if(data.data[i].country == select.country && data.data[i].language == lang){
                        Util.setAsyncStorage('SELECTED_COUNTRY_LANGUAGE', data.data[i]);
                        this.checkNetCnnection();
                    }
                }
            });
        });
	}
    

    renderCheckoutHeading() {
        const { signInFlag , deliveryFlag, paymentFlag, confirmationFlag} = this.state
        return (
            <View  style={{justifyContent: 'center', alignItems: 'center', paddingVertical: scale(10)}}>
                <Text style={{fontSize: scale(22), fontWeight: '600'}}>
                { paymentFlag && deliveryFlag && signInFlag ? 
                    'Confirmation' : deliveryFlag && signInFlag  ? 
                    'Payment Method' : signInFlag ?
                    'Delivery Details' : 
                    'Sign In'
                }
                </Text>
            </View>
        )
    }

    renderBreadcumbs() {
        const { signInFlag , deliveryFlag, paymentFlag, confirmationFlag} = this.state
        return (
            <View>
                <View style={styles.breadcrumbMain}>
                    <View style={ signInFlag ? styles.breadcrumbCircle : styles.breadcrumbCircleLight}>
                        {signInFlag && <MaterialIcons
                            name='check'
                            onPress={() => { this.setState({ showResetPass: false }) }}
                            size={scale(15)}
                            color={'white'}
                        />}
                    </View>
                    <View style={styles.breadcrumbLine } />
                    <View style={signInFlag && deliveryFlag ?  styles.breadcrumbCircle : signInFlag ? styles.breadcrumbCircleLight : styles.breadcrumbCircleSmall}>
                        {deliveryFlag && <MaterialIcons
                            name='check'
                            onPress={() => { this.setState({ showResetPass: false }) }}
                            size={scale(15)}
                            color={'white'}
                        />}
                    </View>
                    <View style={styles.breadcrumbLine} />
                    <View style={(signInFlag && deliveryFlag && paymentFlag ? styles.breadcrumbCircle : signInFlag && deliveryFlag ? styles.breadcrumbCircleLight : styles.breadcrumbCircleSmall)}>
                        {paymentFlag && <MaterialIcons
                            name='check'
                            onPress={() => { this.setState({ showResetPass: false }) }}
                            size={scale(15)}
                            color={'white'}
                        />}
                    </View>
                    <View style={styles.breadcrumbLine} />
                    <View style={(signInFlag && deliveryFlag && paymentFlag ? styles.breadcrumbCircleLight : styles.breadcrumbCircleSmall)}>
                        {confirmationFlag && <MaterialIcons
                            name='check'
                            onPress={() => { this.setState({ showResetPass: false }) }}
                            size={scale(15)}
                            color={'white'}
                        />}
                    </View>
                </View>
                <View style={{ flexDirection: 'row', alignItems: 'center' , paddingBottom: scale(25)}}>
                    <View style={ paymentFlag && deliveryFlag && signInFlag ? { width: '13%' } : deliveryFlag && signInFlag ? { width: '15%' } : signInFlag ? { width: '16%' } :  { width: '17%' } } />
                    <Text style={styles.breadcrumbText}>{I18n.t('SIGN_IN')}</Text>
                    <View style={signInFlag ? { width: '10%' } : { width: '9%' } } />
                    <Text style={styles.breadcrumbText}>{I18n.t('delivery')}</Text>
                    <View style={paymentFlag && deliveryFlag && signInFlag ? { width: '9%' } : deliveryFlag && signInFlag ? { width: '8%' } : { width: '7%' } } />
                    <Text style={styles.breadcrumbText}>{I18n.t('payment1')}</Text>
                    <View style={{ width: '5%' }} />
                    <Text style={styles.breadcrumbText}>{I18n.t('confirmation')}</Text>

                </View>
                <View style={styles.breadcrumbBorder} />
            </View>
        )
    }



    render() {
        const { signInFlag , deliveryFlag, paymentFlag, confirmationFlag, buttonDisableEnable} = this.state
        return (
            <View style={{ flex: 1 }}>
                <HeaderComm changeLang={this.changeLang} comesFrom={'checkout'} navigation={this.props.navigation} onRef={instance => { this.instance = instance; }} classObj={this} {...this.props}/>
                <ScrollView showsVerticalScrollIndicator={false}>
                    {this.renderCheckoutHeading()}
                    {this.renderBreadcumbs()}
                    { paymentFlag && deliveryFlag && signInFlag ? 
                        <Confirmation onRef={instance => { this.instance = instance; }} classObj={this} {...this.props}/> : deliveryFlag && signInFlag  ? 
                        <Payment onRef={instance => { this.instance = instance; }} classObj={this} {...this.props}/> : signInFlag ?
                        <Delivery onRef={instance => { this.instance = instance; }} classObj={this} {...this.props}/> : 
                        <SignIn comesFrom1={'checkout'} classObj={this}  {...this.props}/>
                    }
                    <Footer {...this.props} />
                </ScrollView>
                {signInFlag ?
                <View style={I18n.locale == 'ar' ? { flexDirection: 'row-reverse', } : { flexDirection: 'row', }}>
                        <TouchableOpacity style={[styles.backButton, { top: scale(0) }]} onPress={() => { this.instance.backToDelivery()}}>
                            <Text style={[styles.checkOutButtonTxt, { color: 'black', fontSize: scale(25), top: scale(5) }]}>{I18n.t('symbol')}</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.checkOutButton} onPress={() => this.instance.doProceed()} disabled={buttonDisableEnable}>
                            <Text style={styles.checkOutButtonTxt}>{ !paymentFlag ? I18n.t('proceed') : I18n.t('placeOrder')}</Text>
                        </TouchableOpacity>
                </View> : <View />}
            </View>
        );
    }
}



function mapStateToProps(state) {
    return {

    };
}
const mapDispatchToProps = (dispatch) => {
    return {

    };
}

export default connect(mapStateToProps, mapDispatchToProps)(mainCheckout);