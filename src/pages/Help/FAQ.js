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
import HTML from 'react-native-render-html';
import { getFagData } from '../../actions/HelpCenterAction';
import { connect } from 'react-redux'
import * as CONSTV from '../../utils/Const';
import SubHeader from '../../common/header/subHeader';
import { scale, verticalScale } from '../../utils/Scale';
import I18n from '../../localization/index';
import * as MESSAGE from '../../utils/Message';
import CustomAlert from '../../helper/CustomAlert';
import Footer from '../../common/footer';
import HeaderComm from '../../common/header/header';
import Util from '../../utils/Util';

class FAQ extends Component {

    constructor(props) {
        super(props)
        this.state = {
            fagData: '',
            searchFAQText: this.props.navigation.state.params.searchFAQText,
            showAlert: false

        }

    }

    componentWillMount() {
        Util.getAsyncStorage('SELECTED_COUNTRY_LANGUAGE').then((select) => {
            this.props.getFagData(select.store_id);
        });
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.status) {
            const { searchFAQText } = this.state;
            if (searchFAQText) {
                let word = searchFAQText;
                content = this.searchSpan(nextProps.fagData.content, word);
                this.setState({ fagData: content });
            } else {
                this.setState({ fagData: nextProps.fagData.content });
            }
        }
    }

    changeLang = (lang) => {
        Util.getAsyncStorage('ALL_COUNTRY_AND_LANGUAGE').then((data) => {
            Util.getAsyncStorage('SELECTED_COUNTRY_LANGUAGE').then((select) => {
                for (var i in data.data) {
                    if (data.data[i].country == select.country && data.data[i].language == lang) {
                        Util.setAsyncStorage('SELECTED_COUNTRY_LANGUAGE', data.data[i]);
                        this.props.getFagData(data.data[i].store_id);
                    }
                }
            });
        });
    }

    searchSpan = (input, word) => {
        let inputContent = input;
        function replacer(word) {
            return '<span style="backgroundColor:#faced7">' + word + '</span>';
        }
        let changeContent = input.replace(new RegExp('(' + word + ')', "gi"), replacer);
        if (changeContent == inputContent) {
            this.setState({ showAlert: true, alertHeading: MESSAGE.NO_FAQ_SEARCH_HEADER, alertMessage: MESSAGE.NO_FAQ_SEARCH_ERROR1 + word + MESSAGE.NO_FAQ_SEARCH_ERROR2, alertType: 'OK' });
            return null;
        };
        return changeContent;
    }

    renderCustomAlert() {
        if (this.state.alertType == 'OK') {
            return (
                <CustomAlert okPressed={() => { this.setState({ showAlert: false }); this.props.navigation.navigate("ContactUs") }} text1={this.state.alertHeading} text2={this.state.alertMessage} alertType={this.state.alertType} />
            )
        } else {
            return (
                <CustomAlert yesPressed={() => { this.setState({ showAlert: false }); BackHandler.exitApp() }} cancelPressed={() => { this.setState({ showAlert: false }); }} text1={this.state.alertHeading} text2={this.state.alertMessage} alertType={this.state.alertType} />
            )
        }
    }

    render() {
        const { fagData } = this.state;
        return (
            <View style={{ flex: 1 }}>
                {/* <SubHeader headerTitle = {CONSTV.HELP_TEXT}  {...this.props}/> */}
                <HeaderComm changeLang={this.changeLang} navigation={this.props.navigation} onRef={instance => { this.instance = instance; }} classObj={this} {...this.props}/>
                {fagData ?
                    <ScrollView showsVerticalScrollIndicator={false}>
                        <View style={styles.mainContainer}>
                            <HTML html={fagData} onLinkPress={(event, href) => {
                                Linking.openURL(href)
                            }} imagesMaxWidth={Dimensions.get('window').width} />
                        </View>
                        <Footer {...this.props} />
                    </ScrollView> : <View style={{ flex: 1, justifyContent: 'center' }}>
                        <ActivityIndicator size="large" color="#0000ff" />
                    </View>}
                {this.state.showAlert ?
                    <View>{this.renderCustomAlert()}</View> : <View />}
            </View>
        );
    }
}

function mapStateToProps(state) {
    const { HelpCenterReducer } = state;
    return {
        fagData: HelpCenterReducer.fagData,
        status: HelpCenterReducer.status,
    };
}
const mapDispatchToProps = (dispatch) => {
    return {
        getFagData: (storeId) => {
            dispatch(getFagData(storeId))
        },
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(FAQ);