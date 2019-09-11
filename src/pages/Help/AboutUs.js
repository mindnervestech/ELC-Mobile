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
import * as CONSTV from '../../utils/Const';
import SubHeader from '../../common/header/subHeader';
import { scale, verticalScale } from '../../utils/Scale';
import { getAboutUsData } from '../../actions/HelpCenterAction';
import I18n from '../../localization/index';
import styles from './Style'
import { connect } from 'react-redux'
import HTML from 'react-native-render-html';
import Footer from '../../common/footer';
import HeaderComm from '../../common/header/header';
import Util from '../../utils/Util';

class AboutUs extends Component {

    constructor(props) {
        super(props)
        this.state = {
            aboutUsContent: ''
        }
    }

    componentWillMount() {
        Util.getAsyncStorage('SELECTED_COUNTRY_LANGUAGE').then((select) => {
            this.props.getAboutUsData(select.store_id);
        });

    }


    componentWillReceiveProps(nextProps) {
        if (nextProps.status) {
            this.setState({ aboutUsContent: nextProps.aboutUsData.content })
        }
    }

    changeLang = (lang) => {
        Util.getAsyncStorage('ALL_COUNTRY_AND_LANGUAGE').then((data) => {
            Util.getAsyncStorage('SELECTED_COUNTRY_LANGUAGE').then((select) => {
                for (var i in data.data) {
                    if (data.data[i].country == select.country && data.data[i].language == lang) {
                        Util.setAsyncStorage('SELECTED_COUNTRY_LANGUAGE', data.data[i]);
                        this.props.getAboutUsData(data.data[i].store_id);
                    }
                }
            });
        });
    }

    render() {
        const { aboutUsContent } = this.state
        return (
            <View style={{ flex: 1 }}>
                {/* <SubHeader headerTitle = {CONSTV.HELP_TEXT}  {...this.props}/> */}
                <HeaderComm changeLang={this.changeLang} navigation={this.props.navigation} onRef={instance => { this.instance = instance; }} classObj={this} {...this.props}/>
                {aboutUsContent ?
                    <ScrollView showsVerticalScrollIndicator={false}>
                        <View style={styles.mainContainer}>
                            <HTML html={aboutUsContent} onLinkPress={(event, href) => {
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
        aboutUsData: HelpCenterReducer.aboutUsData,
        status: HelpCenterReducer.status
    };
}
const mapDispatchToProps = (dispatch) => {
    return {
        getAboutUsData: (obj) => {
            dispatch(getAboutUsData(obj))
        },
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(AboutUs);