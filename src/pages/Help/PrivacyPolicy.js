import React, { Component } from 'react';
import {
    Text,
    View,
    StyleSheet,
    Button,
    ScrollView,
    Dimensions,
    Linking,
    ActivityIndicator
} from 'react-native';
import styles from './Style';
import * as CONSTV from '../../utils/Const';
import SubHeader from '../../common/header/subHeader';
import { scale, verticalScale } from '../../utils/Scale';
import HTML from 'react-native-render-html';
import { connect } from 'react-redux';
import { getPrivacyPolicy } from '../../actions/HelpCenterAction';
import I18n from '../../localization/index';
import Footer from '../../common/footer';
import HeaderComm from '../../common/header/header';
import Util from '../../utils/Util';

class PrivacyPolicy extends Component {

    constructor(props) {
        super(props)
        this.state = {
            privacyPolicyData: '',
        }
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.status === 'PRIVACY_POLICY_SUCCESS') {
            this.setState({ privacyPolicyData: nextProps.privacyPolicyData.content });
        }
    }

    componentWillMount() {
        Util.getAsyncStorage('SELECTED_COUNTRY_LANGUAGE').then((select) => {
            this.props.getPrivacyPolicyData(select.store_id);
        });

    }

    changeLang = (lang) => {
        Util.getAsyncStorage('ALL_COUNTRY_AND_LANGUAGE').then((data) => {
            Util.getAsyncStorage('SELECTED_COUNTRY_LANGUAGE').then((select) => {
                for (var i in data.data) {
                    if (data.data[i].country == select.country && data.data[i].language == lang) {
                        Util.setAsyncStorage('SELECTED_COUNTRY_LANGUAGE', data.data[i]);
                        this.props.getPrivacyPolicyData(data.data[i].store_id);
                    }
                }
            });
        });
    }

    render() {
        const { privacyPolicyData } = this.state;
        return (
            <View style={{ flex: 1 }}>
                {/* <SubHeader headerTitle = {CONSTV.HELP_TEXT}  {...this.props}/> */}
                <HeaderComm changeLang={this.changeLang} navigation={this.props.navigation} onRef={instance => { this.instance = instance; }} classObj={this} {...this.props}/>
                {privacyPolicyData ?
                    <ScrollView showsVerticalScrollIndicator={false}>
                        <View style={styles.mainContainer}>
                            <HTML html={privacyPolicyData} onLinkPress={(event, href) => {
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
        privacyPolicyData: HelpCenterReducer.privacyPolicyData,
        status: HelpCenterReducer.status
    };
}
const mapDispatchToProps = (dispatch) => {
    return {
        getPrivacyPolicyData: (obj) => {
            dispatch(getPrivacyPolicy(obj))
        },
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(PrivacyPolicy);
