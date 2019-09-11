import React, { Component } from 'react';
import {
    Text,
    View,
    StyleSheet,
    Button,
    ScrollView,
    Linking,
    Dimensions,
    TouchableOpacity,
    ActivityIndicator
} from 'react-native';
import styles from './Style';
import * as CONSTV from '../../utils/Const';
import SubHeader from '../../common/header/subHeader';
import { scale, verticalScale } from '../../utils/Scale';
import HTML from 'react-native-render-html';
import { getHomeOffer } from '../../actions/HomeAction';
import { connect } from 'react-redux';
import I18n from '../../localization/index';
import Footer from '../../common/footer';
import HeaderComm from '../../common/header/header';
import Util from '../../utils/Util';

class HomeOffers extends Component {

    constructor(props) {
        super(props)
        this.state = {
            homeOfferData: '',
        }
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.status) {
            this.setState({
                homeOfferData: nextProps.homeOfferData.content,
            });
        }
    }

    componentWillMount() {
        Util.getAsyncStorage('SELECTED_COUNTRY_LANGUAGE').then((select) => {
            this.props.getHomeOfferData(select.store_id);
        });
    }

    changeLang = (lang) => {
        Util.getAsyncStorage('ALL_COUNTRY_AND_LANGUAGE').then((data) => {
            Util.getAsyncStorage('SELECTED_COUNTRY_LANGUAGE').then((select) => {
                for (var i in data.data) {
                    if (data.data[i].country == select.country && data.data[i].language == lang) {
                        Util.setAsyncStorage('SELECTED_COUNTRY_LANGUAGE', data.data[i]);
                        this.props.getHomeOfferData(data.data[i].store_id);
                    }
                }
            });
        });
    }

    render() {
        const { homeOfferData } = this.state;
        console.log('homeOfferData homeOfferData', homeOfferData)
        return (
            <View style={{ flex: 1 }}>
                {/* <SubHeader headerTitle = {CONSTV.HELP_TEXT}  {...this.props}/> */}
                <HeaderComm changeLang={this.changeLang} navigation={this.props.navigation} />
                {homeOfferData ?
                    <ScrollView showsVerticalScrollIndicator={false}>
                        <View style={styles.mainContainer}>
                            <HTML html={homeOfferData} onLinkPress={(event, href) => {
                                Linking.openURL(href)
                            }} imagesMaxWidth={Dimensions.get('window').width} />
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
    const { HomeReducer } = state;
    return {
        homeOfferData: HomeReducer.homeOfferData,
        status: HomeReducer.status
    };
}
const mapDispatchToProps = (dispatch) => {
    return {
        getHomeOfferData: (storeId) => {
            dispatch(getHomeOffer(storeId))
        },
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(HomeOffers);
