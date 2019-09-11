import React, { Component } from 'react';
import {
    Platform,
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
    ActivityIndicator,
    Modal,
    FlatList,
} from 'react-native';

import I18n from '../../localization/index';
import * as CONSTV from '../../utils/Const';
import SubHeader from '../../common/header/subHeader'
import styles from './Style'
import Validators from '../../utils/Validators';
import * as MESSAGE from '../../utils/Message';
import { scale, verticalScale } from '../../utils/Scale';
import Footer from '../../common/footer';
import HeaderComm from '../../common/header/header';
import COMMONSTYLE from '../../utils/Style';
import MaterialIcons from "react-native-vector-icons/MaterialCommunityIcons";
import * as COLORS from '../../utils/Color';
import showToast from "../../helper/Toast";
import { connect } from 'react-redux';
import Util from '../../utils/Util';

class OrderConfirmation extends Component {

    constructor(props) {
        super(props);

        this.state = {
            activityIndicator: true,
            orderStatus: true,
            orderData: {},
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

    componentWillMount() {
    }

    componentWillReceiveProps(nextProps) {
    }

    render() {
        return (
            <View style={{ flex: 1 }}>
                <HeaderComm changeLang={this.changeLang} navigation={this.props.navigation} onRef={instance => { this.instance = instance; }} classObj={this} {...this.props}/>
                {this.state.activityIndicator ?
                    <ScrollView showsVerticalScrollIndicator={false}>
                        <View style={styles.mainContainer}>
                            <View style={{ paddingVertical: verticalScale(16) }}>
                                <View>
                                    <Text style={styles.headerTxt}>{this.state.orderStatus ? <Text>{I18n.t('sorry')}</Text> : <Text>{I18n.t('thankyou')}</Text>}</Text>
                                    <Text style={styles.headerSubTxt}>{this.state.orderStatus ?
                                        <Text>{I18n.t('TEXT11')}</Text> :
                                        <Text>{I18n.t('TEXT12')}</Text>}</Text>
                                </View>
                                <View style={styles.orderBlock}>
                                    <Text style={{ paddingVertical: verticalScale(10), fontSize: scale(20) }}>{I18n.t('order_number')}</Text>
                                    <View style={{ paddingBottom: scale(30), paddingVertical: verticalScale(5) }}>
                                        <Text style={{ paddingHorizontal: scale(2), fontSize: scale(25) }}>000000751</Text>
                                    </View>
                                </View>
                                <View style={styles.orderBlock}>
                                    <Text style={{ paddingVertical: verticalScale(10), fontSize: scale(20) }}>{I18n.t('address')}</Text>
                                    <View style={{ paddingBottom: scale(30), paddingVertical: verticalScale(5) }}>
                                        <Text style={{ paddingHorizontal: scale(2), fontWeight: 'bold' }}>{I18n.t('deliver_to')}</Text>
                                        <Text>No. 04, 2nd Floor Nitron Classic, ,St. Patrick Town (Before Gate, Next to Kalpana Housing Society,, Hadapsar, Pune, Maharashtra 411013</Text>
                                        <Text>Maharashtra,Maharashtra</Text>
                                    </View>
                                </View>
                                <View style={styles.orderBlock}>
                                    <Text style={{ paddingVertical: verticalScale(10), fontSize: scale(20) }}>{I18n.t('delivery')}</Text>
                                    <View style={{ paddingBottom: scale(30), paddingVertical: verticalScale(5) }}>
                                        <Text style={{ paddingHorizontal: scale(2), fontSize: scale(25) }}>Deliver To Address</Text>
                                    </View>
                                </View>
                                <View style={styles.orderBlock}>
                                    <Text style={{ paddingVertical: verticalScale(10), fontSize: scale(20) }}>{I18n.t('payment')}</Text>
                                    <View style={{ paddingBottom: scale(30), paddingVertical: verticalScale(5) }}>
                                        <Text style={{ paddingHorizontal: scale(2), fontSize: scale(25) }}>Pay By Card</Text>
                                    </View>
                                </View>
                                <View style={[styles.orderProduct, styles.orderBlock]}>
                                    <View style={styles.imageContainer}>
                                        <Image source={{ uri: "https://storage.googleapis.com/nay/images/product/sm/sp19/nay-sp19-slippers-opentoe-harmonia-212465328-1199.jpg", height: scale(128), width: scale(128) }}  style={{ resizeMode: 'contain'}}/>
                                    </View>
                                    <View style={{ width: '35%' }}>
                                        <Text style={{ fontWeight: 'bold' }}>Slippers</Text>
                                        <Text>Color: Ivory</Text>
                                        <Text>Size : S</Text>
                                        <Text>212465344</Text>
                                    </View>
                                    <View style={{ width: '25%' }}>
                                        <Text style={styles.price}>USD 59</Text>
                                        <Text style={styles.price}>Qty 1</Text>
                                    </View>
                                </View>
                                <View style={[styles.orderBlock, { paddingVertical: verticalScale(5) }]}>
                                    <Text style={{fontSize: scale(20)}}>{I18n.t('order_summary')}</Text>
                                    <View style={styles.orderBlockMargin}>
                                        <View style={styles.orderSummary}>
                                            <View style={styles.alignRow}>
                                                <Text>{I18n.t('subtotal')}</Text>
                                                <Text>USD 59</Text>
                                            </View>
                                            <View style={styles.alignRow}>
                                                <Text>{I18n.t('shipping')}</Text>
                                                <Text>USD 10</Text>
                                            </View>
                                            <View style={styles.alignRow}>
                                                <Text>{I18n.t('cod')}</Text>
                                                <Text>USD 0</Text>
                                            </View>
                                            <View style={styles.alignRow}>
                                                <Text style={{fontWeight: 'bold'}}>{I18n.t('total')}</Text>
                                                <Text style={{fontWeight: 'bold'}}>USD 18</Text>
                                            </View>
                                            <View style={styles.alignRow}>
                                                <Text>{I18n.t('vat')}</Text>
                                                <Text>USD 0.86</Text>
                                            </View>
                                        </View>
                                    </View>
                                </View>
                                <View style={[styles.orderBlock, { paddingVertical: verticalScale(5) }]}>
                                    <Text style={{fontSize: scale(20)}}>{I18n.t('order_status1')}</Text>
                                    <View style={styles.orderBlockMargin}>
                                        <View style={styles.orderSummary}>
                                            <View style={styles.alignRow}>
                                                <Text>{I18n.t('order_status')}</Text>
                                                <Text>Ordered</Text>
                                            </View>
                                        </View>
                                    </View>
                                </View>
                                <View style={[styles.orderBlock, { paddingVertical: verticalScale(5) }]}>
                                    <Text style={{fontSize: scale(20)}}>{I18n.t('payment_summary')}</Text>
                                    <View style={styles.orderBlockMargin}>
                                        <View style={styles.orderSummary}>
                                            <View style={styles.alignRow}>
                                                <Text>{I18n.t('pay_by_card')}</Text>
                                                <Text>USD 18</Text>
                                            </View>
                                        </View>
                                    </View>
                                </View>
                                <View style={[styles.orderBlock, { paddingVertical: verticalScale(5) }]}>
                                    <View style={styles.orderBlockMargin}>
                                        <View style={styles.alignRow}>
                                            <Text style={{textAlign: 'center'}}>Should you have any queries, contact our customer service by calling us at +971 4 3576754 or e-mail us to customerservice@nayomi.com</Text>
                                        </View>
                                    </View>
                                </View>
                                <Image source={{ uri: "https://storage.googleapis.com/nay/images/product/sm/sp19/nay-sp19-slippers-opentoe-harmonia-212465328-1199.jpg" }}/>
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
    const { CommonReducer } = state;
    return {
    };
}
const mapDispatchToProps = (dispatch) => {
    return {
        //   doPasswordChange: (obj) => {
        //     dispatch(passwordChange(obj))
        //   },
        //   getOrderHistory: (obj) => {
        //     dispatch(orderHistory(obj))
        //   },
        // updateNetworkLost: () => {
        //     dispatch(networkLost());
        // },
        // updateNetworkAvailable: () => {
        //     dispatch(networkAvailable());
        // },
    };

};

export default connect(mapStateToProps, mapDispatchToProps)(OrderConfirmation);