import React, { Component } from 'react';
import {
    Text,
    View,
    StyleSheet,
    Button,
    ScrollView,
    Linking,
    Dimensions,
    ActivityIndicator
} from 'react-native';
import styles from './Style';
import * as CONSTV from '../../utils/Const';
import SubHeader from '../../common/header/subHeader';
import { scale, verticalScale } from '../../utils/Scale';
import HTML from 'react-native-render-html';
import { connect } from 'react-redux';
import { getReturnandExchange } from '../../actions/HelpCenterAction';
import I18n from '../../localization/index';
import Footer from '../../common/footer';
import HeaderComm from '../../common/header/header';
import Util from '../../utils/Util';

class ReturnPolicy extends Component {

    constructor(props) {
        super(props)
        this.state = {
            returnExchangeData: '',
            title: '',
        }
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.status === 'EXCHANGE_RETURN_SUCCESS') {
            this.setState({ 
                returnExchangeData: nextProps.returnExchangeData.content,
                title: nextProps.returnExchangeData.title });
        }
    }

    componentWillMount() {
        Util.getAsyncStorage('SELECTED_COUNTRY_LANGUAGE').then((select) => {
            this.props.getReturnExchangeData(select.store_id);
        });
    }

    changeLang = (lang) => {
        Util.getAsyncStorage('ALL_COUNTRY_AND_LANGUAGE').then((data) => {
            Util.getAsyncStorage('SELECTED_COUNTRY_LANGUAGE').then((select) => {
                for (var i in data.data) {
                    if (data.data[i].country == select.country && data.data[i].language == lang) {
                        Util.setAsyncStorage('SELECTED_COUNTRY_LANGUAGE', data.data[i]);
                        this.props.getReturnExchangeData(data.data[i].store_id);
                    }
                }
            });
        });
    }

    render() {
        const { returnExchangeData, title } = this.state;
        return (
            <View style={{ flex: 1 }}>
                {/* <SubHeader headerTitle = {CONSTV.HELP_TEXT}  {...this.props}/> */}
                <HeaderComm changeLang={this.changeLang} navigation={this.props.navigation} onRef={instance => { this.instance = instance; }} classObj={this} {...this.props}/>
                {returnExchangeData ?
                    <ScrollView showsVerticalScrollIndicator={false}>
                        <View style={styles.mainContainer}>
                            <Text style={styles.title}>{title}</Text>
                            <HTML html={returnExchangeData} onLinkPress={(event, href) => {
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
    const { HelpCenterReducer } = state;
    return {
        returnExchangeData: HelpCenterReducer.returnExchangeData,
        status: HelpCenterReducer.status
    };
}
const mapDispatchToProps = (dispatch) => {
    return {
        getReturnExchangeData: (obj) => {
            dispatch(getReturnandExchange(obj))
        },
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(ReturnPolicy);
