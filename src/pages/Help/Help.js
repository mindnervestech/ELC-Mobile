import React, { Component } from 'react';
import {
  Text,
  View,
  StyleSheet,
  Button,
  ScrollView,
  TextInput,
  Image,
  TouchableOpacity,
  Modal
} from 'react-native';
import MaterialIcons from "react-native-vector-icons/MaterialCommunityIcons";
import styles from './StyleH';
import SubHeader from '../../common/header/subHeader';
import { scale, verticalScale } from '../../utils/Scale';
import I18n from '../../localization/index';
import Footer from '../../common/footer';
import HeaderComm from '../../common/header/header';
import { connect } from 'react-redux';
import { getSizeGuide } from '../../actions/HelpCenterAction';
import * as COLORS from '../../utils/Color';
import COMMONSTYLE from '../../utils/Style';
import Util from '../../utils/Util';


class Help extends Component {

  constructor(props) {
    super(props)
    this.state = {
      showSizeCard: false,
      searchFAQText: '',
      timeout: 0,
      sizeGuideData: {},
      bra: false,
      main: true,
      nightwear: false,
      panty: false,
      slippers: false,
    }
  }

  _searchFAQ = (searchFAQText) => {
    const { timeout } = this.state
    this.setState({ searchFAQText: searchFAQText });
    if (timeout) {
      clearTimeout(timeout);
    }

  this.setState({timeout : setTimeout(() => {
      this.props.navigation.navigate('FAQ', {searchFAQText: searchFAQText });
      this.setState({searchFAQText: ''});
  }, 5000)});
  
}

  componentWillReceiveProps(nextProps) {
    if (nextProps.status) {
      this.setState({
        sizeGuideData: nextProps.sizeGuideData
      });
    }
  }

  componentWillMount() {
    Util.getAsyncStorage('SELECTED_COUNTRY_LANGUAGE').then((select) => {
      var obj = 'store_id='+select.store_id
      this.props.getSizeGuideData(obj);
    });
  }

  getSizeGuidedd() {
    this.setState({ showSizeCard: true });
  }

  onSelectionTypeChanged(selected) {
    if(selected === 'bra') {
      this.setState({bra: true, main: false, nightwear: false, panty: false, slippers: false});   
    } else if(selected === 'main') {
      this.setState({bra: false, main: true, nightwear: false, panty: false, slippers: false});
    } else if(selected === 'nightwear') {
      this.setState({bra: false, main: false, nightwear: true, panty: false, slippers: false });
    } else if(selected === 'panty') {
      this.setState({bra: false, main: false, nightwear: false, panty: true, slippers: false});
    } else if(selected === 'slippers') {
      this.setState({bra: false, main: false, nightwear: false, panty: false, slippers: true});
    }
  
  }

  renderSizeCard() {
    const { sizeGuideData } = this.state
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
            <View style={[COMMONSTYLE.container,{backgroundColor: COLORS.BASE_WHITE}]}>
              <View style={COMMONSTYLE.descriptionBtnContainer}>
                <View style={[COMMONSTYLE.heading, I18n.locale == 'ar' ? {flexDirection:'row-reverse'} : {flexDirection: 'row'}]}>
                  <View style={{width: '30%'}}>
                    <Text style={styles.selectCountryText}>{I18n.t('sizeFit')}</Text>
                  </View>
                  <View  style={{width: '60%', alignItems: 'center'}}>
                  </View>
                  <TouchableOpacity  style={{width: '10%',alignItems: 'center' }}>
                    <MaterialIcons
                        name='close-circle-outline'
                        onPress={() => { this.setState({ showSizeCard: false }) }}
                        size={scale(25)}
                      />
                  </TouchableOpacity>
            
                </View>
                <View style={[styles.sizeGuideHeader, I18n.locale == 'ar' ? {flexDirection:'row-reverse'} : '']}>
                  <TouchableOpacity style={{ width: '21%', alignItems: 'center' }} onPress={() => { this.onSelectionTypeChanged('main'); }}>
                    <Text style={[styles.headline, (this.state.main ? styles.headingTextB : styles.headingText)]}>{I18n.t('sizeFit')}</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={{ width: '18%', alignItems: 'center' }} onPress={() => { this.onSelectionTypeChanged('bra'); }}>
                    <Text style={[styles.headline, (this.state.bra ? styles.headingTextB : styles.headingText)]}>{I18n.t('bra')}</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={{ width: '18%', alignItems: 'center' }} onPress={() => { this.onSelectionTypeChanged('panty'); }}>
                    <Text style={[styles.headline, (this.state.panty ? styles.headingTextB : styles.headingText)]}>{I18n.t('panty')}</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={{ width: '23%', alignItems: 'center' }} onPress={() => { this.onSelectionTypeChanged('nightwear'); }}>
                    <Text style={[styles.headline, (this.state.nightwear ? styles.headingTextB : styles.headingText)]}>{I18n.t('nightwear')}</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={{ width: '20%', alignItems: 'center' }} onPress={() => { this.onSelectionTypeChanged('slippers'); }}>
                    <Text style={[styles.headline, (this.state.slippers ? styles.headingTextB : styles.headingText)]}>{I18n.t('slippers')}</Text>
                  </TouchableOpacity>
                </View>
                <View style={{height : scale(480)}}>
                {this.state.main ?
                  <View>
                    <ScrollView showsVerticalScrollIndicator={false}>
                    <View style={[ styles.sizeFitImageView, {height: scale(465)}]}>
                        <Image style={styles.sizeFitImage} resizeMode='cover' source={{ uri: sizeGuideData.main}} />
                    </View>
                    </ScrollView>
                  </View> : <View />}
                {this.state.bra ?
                  <View>
                    <ScrollView showsVerticalScrollIndicator={false}>
                      <View style={[ styles.sizeFitImageView, {height: 1100}]}>
                        <Image style={styles.sizeFitImage} resizeMode='cover'  source={{ uri: sizeGuideData.bra}} />
                      </View>
                    </ScrollView>
                  </View> : <View />}
                  {this.state.panty ?
                  <View>
                    <ScrollView showsVerticalScrollIndicator={false}>
                    <View style={[ styles.sizeFitImageView, {height: scale(370)}]}>
                      <Image style={styles.sizeFitImage} resizeMode='cover' source={{ uri: sizeGuideData.panty}} />
                    </View>
                    </ScrollView>
                  </View> : <View />}
         
                  {this.state.nightwear ?
                  <View>
                    <ScrollView showsVerticalScrollIndicator={false}>
                    <View style={[ styles.sizeFitImageView, {height: scale(190)}]}>
                      <Image style={styles.sizeFitImage} resizeMode='cover' source={{ uri: sizeGuideData.nightwear}} />
                    </View>
                    </ScrollView>
                  </View> : <View />}

                  {this.state.slippers ?
                  <View>
                    <ScrollView showsVerticalScrollIndicator={false}>
                    <View style={[ styles.sizeFitImageView, {height: scale(340)}]}>
                      <Image style={styles.sizeFitImage} resizeMode='cover' source={{ uri: sizeGuideData.slippers}} />
                    </View>
                    </ScrollView>
                  </View> : <View />}
                </View>
              </View>
            </View>
          </View>
        </Modal>
      </View>
    )
  }


  changeLang = (lang) => {
    Util.getAsyncStorage('ALL_COUNTRY_AND_LANGUAGE').then((data) => {
      Util.getAsyncStorage('SELECTED_COUNTRY_LANGUAGE').then((select) => {
          for(var i in data.data){
              if(data.data[i].country == select.country && data.data[i].language == lang){
                  Util.setAsyncStorage('SELECTED_COUNTRY_LANGUAGE', data.data[i]);
                  this.setState({ text: data.data[i].lang })
                  var obj = {store_id: data.data[i].store_id}
                  this.props.getSizeGuideData(obj);
              }
          }
      });
    });
  }


  render() {
    return (
      <View style={{ flex: 1 }}>
        {/* <SubHeader headerTitle = {CONSTV.HELP_TEXT}  {...this.props}/> */}
        <HeaderComm changeLang={this.changeLang} navigation={this.props.navigation} onRef={instance => { this.instance = instance; }} classObj={this} {...this.props}/>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.container}>
            <View style={{ justifyContent: 'center' }}>
              <View style={styles.helpView}>
                <Text style={styles.helpText}>{I18n.t('TEXT4')}</Text>
                <View style={[styles.helpTextSearchIcon, I18n.locale == 'ar' ? {flexDirection:'row-reverse'} : {flexDirection: 'row'}]}>
                  <MaterialIcons
                    name={"magnify"}
                    color={'grey'}
                    size={scale(25)}
                  />
                  <TextInput style={{ padding: 1 }}
                    placeholder={I18n.t('TEXT5')}
                    onChangeText={this._searchFAQ}
                    value={this.state.searchFAQText}
                  />
                </View>
              </View>
              <View style={styles.helpCenterMain}>
                <Text style={styles.helpCenterText}>{I18n.t('needAssistance')}</Text>
                <View style={styles.helpCenterBorder} />
                <View style={styles.helpCenterBoxMain}>
                  <View style={[styles.helpCenterTwoBox, I18n.locale == 'ar' ? {flexDirection:'row-reverse'} : {flexDirection: 'row'}]}>
                    <TouchableOpacity style={styles.helpCenterBox} onPress={() => this.props.navigation.navigate("ContactUs")}>
                      <Image style={styles.helpCenterBoxImage} source={require('../../assets/helpcenter/Contact_Us.png')} />
                      <Text style={styles.inBoxText}>{I18n.t('contactUs')}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.helpCenterBox} onPress={() => this.getSizeGuidedd()}>
                      <Image style={styles.helpCenterBoxImage} source={require('../../assets/helpcenter/Size_guide.png')} />
                      <Text style={styles.inBoxText}>{I18n.t('sizeGuide')}</Text>
                    </TouchableOpacity>
                  </View>
                  <View style={[styles.helpCenterTwoBox, I18n.locale == 'ar' ? {flexDirection:'row-reverse'} : {flexDirection: 'row'}]}>
                    <TouchableOpacity style={styles.helpCenterBox} onPress={() => this.props.navigation.navigate("FAQ", { searchFAQText: null })}>
                      <Image style={styles.helpCenterBoxImage} source={require('../../assets/helpcenter/FAQ.png')} />
                      <Text style={styles.inBoxText} >{I18n.t('faq')}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.helpCenterBox} onPress={() => this.props.navigation.navigate("DeliveryPolicy")}>
                      <Image style={styles.helpCenterBoxImage} source={require('../../assets/helpcenter/delivery-truck.png')} />
                      <Text style={styles.inBoxText} >{I18n.t('delivery')}</Text>
                    </TouchableOpacity>
                  </View>
                  <View style={[styles.helpCenterTwoBox, I18n.locale == 'ar' ? {flexDirection:'row-reverse'} : {flexDirection: 'row'}]}>
                    <TouchableOpacity style={styles.helpCenterBox} onPress={() => this.props.navigation.navigate("ReturnPolicy")}>
                      <Image style={styles.helpCenterBoxImage} source={require('../../assets/helpcenter/Returns.png')} />
                      <Text style={styles.inBoxText}>{I18n.t('returns')}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.helpCenterBox} onPress={() => this.props.navigation.navigate("PrivacyPolicy")}>
                      <Image style={styles.helpCenterBoxImage} source={require('../../assets/helpcenter/Legal.png')} />
                      <Text style={styles.inBoxText}>{I18n.t('legal')}</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            </View>
          </View>
          <Footer {...this.props} />
        </ScrollView>
        {this.state.showSizeCard ?
          <View>{this.renderSizeCard()}</View> : <View />}
      </View>
    );
  }
}



function mapStateToProps(state) {
  const { HelpCenterReducer } = state;
  return {
    sizeGuideData: HelpCenterReducer.sizeGuideData,
    status: HelpCenterReducer.status,
  };
}
const mapDispatchToProps = (dispatch) => {
  return {
    getSizeGuideData: (obj) => {
      dispatch(getSizeGuide(obj))
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Help);