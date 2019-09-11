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
  Alert,
  FlatList,
} from 'react-native';

import I18n from '../../localization/index';
// import PhoneInput from 'react-native-phone-input';
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
import { removeToWishListProduct } from '../../actions/CommonAction';
import showToast from "../../helper/Toast";
import { connect } from 'react-redux';
import { passwordChange } from '../../actions/SignInAction';
import { orderHistory, getWishList, getAddressList, deleteAddress, clearDeleteAddressData } from '../../actions/ProfileAction';
import Util from '../../utils/Util';
import { clearCartData } from '../../actions/CartAction';
import { EditAddress } from './EditAddress';

class Profile extends Component {
  // static navigationOptions = ({ navigation, props }) => ({
  //     title: "Profile"
  // });

  constructor(props) {
    super(props);
    this.state = {
      yourName: '',
      emailAddress: '',
      mobileNumber: '',
      comment: '',
      yourNameError: null,
      emailAddressError: null,
      mobileError: null,
      commentError: null,
      purpose: '',
      showAccount: true,
      showOrderHistory: false,
      showWishlist: false,
      activityIndicator: true,
      showChangePassword: false,
      showAddressBook: false,
      showAddAddress: false,
      hideShow: true,
      hideShowConfirm: true,
      password: '',
      confirmPassword: '',
      removeToWishFlag: false,
      passwordHelp: '',
      passwordError: null,
      confirmPasswordError: null,
      passwordButtonDisableEnable: true,
      profile: {},
      orderData: {},
      productListData: {},
      selectedProduct: {},
      noDataMessage: null,
      removeToWishListData: {},
      addressListData: {},
      deleteAddress: {},
      storeId: null,
      country_name: null,
      showOrders: false,
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
    let lastProps = this.props.navigation.state.params.profileData;
    if (this.props.navigation.state.params.flag) {
      this.setState({ showOrderHistory: false, showAccount: false, showWishlist: true });
    } else {
      this.setState({ showOrderHistory: false, showAccount: true, showWishlist: false });
    }
    this.setState({ activityIndicator: false, profile: lastProps });
    var obj = { customerid: lastProps.customer_id };
    // this.props.getAddressListData(obj);
    // this.props.getWishListData(obj);
    Util.getAsyncStorage('SELECTED_COUNTRY_LANGUAGE').then((language) => {
      this.setState({ storeId: language.store_id, country_name: language.country });
    });
  }

  componentDidMount() {
    this._onFocusListener = this.props.navigation.addListener('didFocus', (payload) => {
      // Perform the reset action here
      const { profile, storeId } = this.state;
      var obj = { customerid: profile.customer_id, store_id: storeId };
      this.props.getAddressListData(obj);
      this.props.getWishListData(obj);
    });
  }

  componentWillUpdate() {

  }

  componentWillReceiveProps(nextProps) {
    this.setState({ activityIndicator: true });
    if (nextProps.status === 'PASSWORD_CHANGE_SUCCESS') {
      this.setState({
        password: '',
        confirmPassword: '',
        hideShow: true,
        hideShowConfirm: true,
      });
      showToast('Password Changed Successfully', true);
    } else if (nextProps.orderStatus === 'ORDER_HISTORY_SUCCESS') {
      this.setState({ showOrders: true, orderData: (nextProps.orderHistoryData.orders_details).reverse() });
    } else if (nextProps.productWishListStatus) {
      this.setState({ productListData: nextProps.productListData.data });
      if (nextProps.productListData.data == null) {
        this.setState({ noDataMessage: MESSAGE.NO_DATA_AVAILABLE })
      } else {
        this.setState({ noDataMessage: null })
      }
      this.setState({ removeToWishFlag: false });
    }
    if (nextProps.addressListListStatus) {
      this.setState({ activityIndicator: true, addressListData: nextProps.addressListData.addressData });
    }
    if (nextProps.removeTOWishListStatus && this.state.removeToWishFlag) {
      this.setState({ removeToWishFlag: false, activityIndicator: false });
      this.showWishListData();
    }
    if (nextProps.deleteAddressStatus) {
      const { profile } = this.state;
      showToast(I18n.t('deleteAddressToster'), true);
      this.props.clearDeleteData();
      var obj = { customerid: profile.customer_id };
      this.props.getAddressListData(obj);
      this.setState({ deleteAddress: nextProps.deleteAddress });
    }
  }


  logout() {
    Util.removeAsyncstorage('SIGN_IN_DATA').then((data) => {
      this.setState({ userSignInData: null })
    });
    this.props.clearCart();
    this.props.navigation.navigate("SignIn");
  }

  ChangeHideShow = () => {
    setTimeout(() => {
      if (this.state.hideShow) {
        this.setState({ hideShow: false });
      } else {
        this.setState({ hideShow: true });
      }
    }, 100);
  }

  ChangeHideShowConfirm = () => {
    if (this.state.hideShowConfirm) {
      this.setState({ hideShowConfirm: false });
    } else {
      this.setState({ hideShowConfirm: true });
    }
  }

  handlePasswordInputChange = (password) => {
    if (Platform.OS == 'ios') {
      setTimeout(() => {
        this.setState({ password: password });
      }, 1);
    } else {
      this.setState({ password: password });
    }
    //this.setState({ password: password });
    if (Validators.isEmpty(password)) {
      this.setState({ passwordError: MESSAGE.PASS_REQ });
    } else if (password.length > 20) {
      this.setState({ passwordError: MESSAGE.PASSWORD_MAX_LENGTH_EXCEEDED });
    } else if (password.indexOf(" ") != -1) {
      this.setState({ passwordError: MESSAGE.NO_SPACE_ALLOWED_TEXT });
    } else if (!Validators.passwordPolicy(this.state.password)) {
      this.setState({ passwordError: null });
      this.setState({ passwordHelp: MESSAGE.HELP_TEXT });
    } else if (this.state.confirmPassword !== password && this.state.confirmPassword !== '') {
      this.setState({ confirmPasswordError: MESSAGE.PASSWORD_CONFIRM_PASSWORD_MISMATCH });
    } else if (this.state.confirmPassword === password && this.state.confirmPassword !== '') {
      this.setState({ confirmPasswordError: null })
    } else {
      this.setState({ passwordError: null });
    }
  }

  handleConfirmPasswordInputChange = (confirmPassword) => {
    this.setState({ confirmPassword: confirmPassword });
    if (this.state.password !== confirmPassword) {
      this.setState({ confirmPasswordError: MESSAGE.PASSWORD_CONFIRM_PASSWORD_MISMATCH });
    } else if (confirmPassword !== this.state.password) {
      this.setState({ passwordError: MESSAGE.PASSWORD_CONFIRM_PASSWORD_MISMATCH });
    } else {
      this.setState({ confirmPasswordError: null, passwordHelp: null })
    }
  }

  checkButtonDisableEnable() {
    setTimeout(() => {
      const { password, confirmPassword, } = this.state;
      const { passwordError, confirmPasswordError } = this.state;
      if (Validators.isEmpty(password) || Validators.isEmpty(confirmPassword) || passwordError !== null || confirmPasswordError !== null) {
        this.setState({ passwordButtonDisableEnable: true })
      } else {
        this.setState({ passwordButtonDisableEnable: false })
      }
    }, 100);

  }

  passwordChange() {
    this.setState({ showChangePassword: false })
    const { password, storeId, profile } = this.state;

    var obj = { customerid: profile.customer_id, newpassword: password, oldpassword: 'admin/rest/V1/cmsPageIdentifier/enable-cookies/storeId/' + storeId }

    this.setState({ activityIndicator: false });
    this.props.doPasswordChange(obj);
    // if (obj !== null) {
    //   try {
    //     Keyboard.dismiss();
    //     this.props.doPasswordChange(obj);
    //     console.log('below');
    //   } catch (err) {
    //     // this.setState({ reasonForFailure: err, showAlert: true, alertHeading: MESSAGE.LOGIN_FAILED, alertMessage: MESSAGE.LOGIN_FAILED_MESSAGE, alertType: 'YES_CANCEL' });
    //   }
    // }
  }

  orderHistory() {
    this.setState({ showOrderHistory: true, showAccount: false, showWishlist: false });
    const { profile } = this.state;
    var obj = { Customerid: profile.customer_id };
    this.props.getOrderHistory(obj);
  }

  showWishListData() {
    this.setState({ showOrderHistory: false, showAccount: false, showWishlist: true });
    const { profile, storeId } = this.state;
    var obj = { customerid: profile.customer_id, store_id: storeId };
    this.setState({ activityIndicator: true });
    this.props.getWishListData(obj);
  }

  orderView(id) {
    this.props.navigation.navigate('OrderView', { 'orderEntityid': id, });
  }

  setStateOf() {
    this.setState({
      password: '',
      confirmPassword: '',
      hideShow: true,
      hideShowConfirm: true,
      showChangePassword: false,
      passwordHelp: '',
      passwordError: null,
      confirmPasswordError: null,
    });
  }

  renderChangePassword() {
    const { profile } = this.state;
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
            <View style={[COMMONSTYLE.container, { backgroundColor: COLORS.BASE_WHITE }]}>
              <View style={COMMONSTYLE.descriptionBtnContainer}>
                <View style={styles.headingView}>
                  <View style={{ width: '90%' }}>
                    <Text style={{ paddingVertical: verticalScale(15), fontSize: scale(20), color: 'black' }}>{I18n.t('change_password')}</Text>
                  </View>
                  <TouchableOpacity style={{ width: '10%', alignItems: 'center' }}>
                    <MaterialIcons
                      name='close-circle-outline'
                      onPress={() => { this.setStateOf() }}
                      size={scale(25)}
                    />
                  </TouchableOpacity>
                </View>
                <View />
                <View>
                  <View style={styles.inputView}>
                    <Text style={styles.inputField}>{I18n.t('PASSWORD')}</Text>
                    <TextInput
                      style={[(this.state.passwordError ? styles.inputFieldTextError : styles.inputFieldText)]}
                      //placeholder="Password"
                      textAlign = {I18n.locale === 'ar' ? 'right' : 'left'}
                      autoCorrect={false}
                      textAlign={I18n.locale === 'ar' ? 'right' : 'left'}
                      underlineColorAndroid="transparent"
                      autoCapitalize='none'
                      keyboardType="default"
                      secureTextEntry={this.state.hideShow}
                      value={this.state.password}
                      onChangeText={this.handlePasswordInputChange}
                      onChange={() => { this.checkButtonDisableEnable(); }}
                      onBlur={() => {
                        (!this.state.passwordError ?
                          this.setState({
                            passwordError: Validators.isEmpty(this.state.password) ? MESSAGE.PASS_REQ : (this.state.password.length > 20
                              ? MESSAGE.PASSWORD_MAX_LENGTH_EXCEEDED : (!Validators.passwordPolicy(this.state.password)
                                ? MESSAGE.HELP_TEXT : null))
                          }) : null); this.checkButtonDisableEnable();
                      }}></TextInput>
                    <TouchableOpacity style={[styles.iconHideShow]} onPress={this.ChangeHideShow}>
                      <MaterialIcons
                        name={this.state.hideShow ? "eye-outline" : "eye-off-outline"}
                        color='#58606C'
                        size={scale(20)}
                      />
                      <Text style={[styles.paragraphSmall, styles.hideShow]}> {this.state.hideShow ? 'Show' : 'Hide'}</Text>
                    </TouchableOpacity>
                    {
                      this.state.passwordError ?
                        <Text style={[styles.paragraphNormal, styles.error]}>{this.state.passwordError}</Text> : (this.state.passwordHelp ?
                          <Text style={[styles.paragraphNormal, styles.help]}>{this.state.passwordHelp}</Text> : <View />)
                    }
                  </View>
                  <View style={styles.inputView}>
                    <Text style={styles.inputField}>{I18n.t('CONFIRM_PASSWORD')}</Text>
                    <TextInput
                      style={[(this.state.confirmPasswordError ? styles.inputFieldTextError : styles.inputFieldText)]}
                      //splaceholder="Confirm Password"
                      textAlign = {I18n.locale === 'ar' ? 'right' : 'left'}
                      autoCorrect={false}
                      textAlign={I18n.locale === 'ar' ? 'right' : 'left'}
                      underlineColorAndroid="transparent"
                      autoCapitalize='none'
                      keyboardType="default"
                      secureTextEntry={this.state.hideShowConfirm}
                      value={this.state.confirmPassword}
                      onChangeText={this.handleConfirmPasswordInputChange}
                      onChange={() => { this.checkButtonDisableEnable(); }}></TextInput>
                    <TouchableOpacity
                      style={[styles.iconHideShow]}
                      onPress={this.ChangeHideShowConfirm}>
                      <MaterialIcons
                        name={this.state.hideShowConfirm ? "eye-outline" : "eye-off-outline"}
                        color='#58606C'
                        size={scale(20)}
                      />
                      <Text style={[styles.paragraphSmall, styles.hideShow]}> {this.state.hideShowConfirm ? 'Show' : 'Hide'}</Text>
                    </TouchableOpacity>
                    {
                      this.state.confirmPasswordError ?
                        <Text style={[styles.paragraphNormal, styles.error]}> {this.state.confirmPasswordError}</Text> : <View />

                    }
                  </View>
                  <View style={{ marginTop: scale(10), flexDirection: 'row' }}>
                    <View style={{ width: '50%' }}>

                    </View>
                    <View style={{ width: '50%', flexDirection: 'row', paddingVertical: verticalScale(20) }}>
                      <TouchableOpacity
                        style={[COMMONSTYLE.heroLargeButton, { height: scale(35), width: '48%' }]}
                        activeOpacity={.5}
                        onPress={() => { this.setStateOf() }}
                      >
                        <Text style={COMMONSTYLE.yesBtnTxt}> {I18n.t('cancel')} </Text>
                      </TouchableOpacity>
                      <View style={{ width: '4%' }} />
                      <TouchableOpacity
                        disabled={this.state.passwordButtonDisableEnable}
                        style={[COMMONSTYLE.heroLargeButton, { height: scale(35), width: '48%' }]}
                        activeOpacity={.5}
                        onPress={() => this.passwordChange()}
                      >
                        <Text style={COMMONSTYLE.yesBtnTxt}> {I18n.t('save')} </Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
              </View>
            </View>
          </View>
        </Modal>
      </View>
    )
  }

  renderAddAddress() {


  }

  renderAddressBook() {

  }

  addContact() {
    this.props.navigation.navigate("EditAddress", { 'addressid': {} });
  }

  addAddress(item) {
    this.props.navigation.navigate("EditAddress", { 'addressid': item, });
  }

  deleteAddressFromList(item) {
    var obj = {
      addressId: item
    }
    Alert.alert(
      '',
      'Are you sure you want to delete this address?',
      [
        {
          text: 'CANCEL',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        {
          text: 'OK', onPress: () =>
            this.props.deleteAddressListData(obj)
        },
      ],
      { cancelable: false },
    );
  }

  //handling onPress action  
  getListViewItem = (item) => {
    Util.getAsyncStorage('SELECTED_COUNTRY_LANGUAGE').then((select) => {
      Util.getAsyncStorage('SIGN_IN_DATA').then((data) => {
        var obj = {
          customerid: data.customer_id,
          store: select.store_id,
          url_key: item.url_key
        }
        this.props.navigation.navigate('PriductDetail', { objectData: obj });
      });
    });
  }

  removeToWishList1(id) {
    this.setState({ removeToWishFlag: true, activityIndicator: false });
    Util.getAsyncStorage('SIGN_IN_DATA').then((data) => {
      if (data === null) {
        this.props.navigation.navigate('SignIn', { product_id: this.state.productDetailData.product[0].id });
      } else {
        obj = {
          wishilistitemid: id
        }
        this.setState({ removeToWishFlag: true });
        this.props.removeToWishList(obj);
      }
    });
  }


  renderAddressList() {
    const { addressListData, noDataMessage, showAddressBook } = this.state;
    return (
      <View style={{ padding: scale(5), justifyContent: 'center' }}>
        {addressListData != undefined ?
          <FlatList
            data={addressListData}
            renderItem={this.renderAddress}
            numColumns={1}
            ItemSeparatorComponent={this.renderSeparator}
            showsVerticalScrollIndicator={false}
            key={2}
            extraData={this.state}
          /> : <View />}
        {addressListData.length == 0 && !showAddressBook ?
          <View style={{ padding: scale(1) }}>
            <Text style={styles.fontTxt}>{I18n.t('TEXT3')}
              <Text style={[styles.fontTxt, { fontWeight: 'bold' }]}
                onPress={() => this.addContact()}>{I18n.t('click_me')}</Text>
            </Text>
          </View> : <View />}
      </View>
    )
  }

  renderAddress = ({ item }) => {
    return (
      <TouchableOpacity style={{ flexDirection: 'row', paddingVertical: scale(10) }} >
        <View >
          <Text style={[styles.addressheader, styles.fontTxt]} >{I18n.t('address')}&nbsp;{item.address_type}</Text>
          <Text style={styles.fontTxt}>{item.userFirstName}&nbsp;{item.userLastName}</Text>
          <Text style={styles.fontTxt}>{item.street}</Text>
          <Text style={styles.fontTxt}>{item.city}&nbsp;{item.state}</Text>
          <Text style={styles.fontTxt}>{item.postcode}</Text>
          <Text style={styles.fontTxt} >{item.carrier_code}{item.telephone}</Text>
          <View style={{ flex: 1, flexDirection: 'row', paddingBottom: scale(15) }}>
            <View style={{ width: '50%' }}>
              <Text onPress={() => this.addAddress(item)} style={{ textDecorationLine: 'underline' }}>{I18n.t('edit')}</Text>
            </View>
            <View style={{ width: '50%' }}>
              <Text onPress={() => this.deleteAddressFromList(item.Id)} style={{ textDecorationLine: 'underline' }}>{I18n.t('delete')}</Text>
            </View>
          </View>
          <View style={styles.border} />
        </View>
      </TouchableOpacity>
    )
  }


  renderWishList() {
    const { productListData, noDataMessage } = this.state;
    return (
      <View style={{ padding: scale(5), justifyContent: 'center' }}>
        {!noDataMessage ? (productListData != undefined ?
          <FlatList
            data={productListData}
            renderItem={this.renderOptionItem}
            numColumns={2}
            ItemSeparatorComponent={this.renderSeparator}
            showsVerticalScrollIndicator={false}
            key={2}
            extraData={this.state}
            keyExtractor={(item, index) => index.toString()}
          /> : <ActivityIndicator size="large" color="#0000ff" />
        ) : <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text style={{ fontSize: scale(18), fontFamily: 'Roboto' }}>{noDataMessage}</Text>
          </View>}
      </View>
    )
  }

  renderOptionItem = ({ item }) => {
    const { selectedProduct, country_name } = this.state;
    var arr = [];
    // for(var i in item.buymore_savemore.data){
    //     if(i!=1 && arr.length<2){
    //         var data = {}
    //         data[i] = item.buymore_savemore.data[i];
    //         arr.push(data);    
    //     }
    // }
    item.offerList = arr;
    return (
      <TouchableOpacity onPress={this.getListViewItem.bind(this, item)} style={{ width: '50%', justifyContent: 'center', alignItems: 'center', paddingBottom: verticalScale(10) }}>
        <Image style={{ width: '95%', height: verticalScale('250') }} source={{ uri: item.image[0] }} />
        <View style={{
          position: 'absolute',
          top: 10,
          bottom: 0,
          right: 10,
          backgroundColor: 'transparent',
        }}>
          <TouchableOpacity onPress={() => this.removeToWishList1(item.wishlist_id)}>
            <Image style={[styles.favouriteImage]} source={require('../../assets/productDetailIcon/favorite-heart.png')} />
          </TouchableOpacity>
        </View>

        <View style={{ paddingVertical: 10, alignItems: 'center' }}>
          <Text style={styles.itemText}>{item.type.toUpperCase()}</Text>
          <Text style={[styles.itemText1, { color: 'lightpink' }]}>{item.after_name}</Text>
          <View style={styles.itemText2}>
            <View style={{ flexDirection: 'row' }}>
              <Text style={[styles.amountText, { color: 'black' }]}>
                {country_name === 'uae' && <Text>{I18n.t('aed')} </Text>}
                {country_name === 'saudi' && <Text>{I18n.t('sar')} </Text>}
                {country_name === 'international' && <Text>{I18n.t('usd')} </Text>}
                {item.currency}&nbsp;{item.price}
              </Text>
            </View>
          </View>
          <TouchableOpacity onPress={this.getListViewItem.bind(this, item)} style={{ width: '100%', height: scale(30), borderRadius: scale(20), backgroundColor: '#f599ba', justifyContent: 'center', alignItems: 'center' }}>
            <Text style={[styles.itemText3, { padding: scale(10) }]}>{I18n.t('buymore_savemore').toUpperCase()}</Text>
          </TouchableOpacity>
        </View>
        {/* DIscover Mode Popup */}

        {selectedProduct == item.productid &&
          <View style={[styles.discoverMode]}>
            <View style={styles.closeOnImgScreen}>
              <TouchableOpacity >
                <MaterialIcons
                  name='close-circle-outline'
                  onPress={() => this.closeImg()}
                  size={scale(30)}
                  color={'#fff'}
                />
              </TouchableOpacity>
            </View>

            <View style={{ alignItems: 'center', paddingTop: '20%', }}>
              <View style={{ width: scale(35), height: scale(35), borderWidth: 1, borderColor: '#fff', borderRadius: scale(20), justifyContent: 'center', alignItems: 'center' }}>
                <Image style={{ height: scale(20), width: scale(20), tintColor: '#fff' }} source={require('../../assets/productDetailIcon/shopping-bag.png')} />
              </View>
            </View>
            <View style={{ alignItems: 'center', paddingTop: '20%' }}>
              <Text style={{ fontSize: scale(24), color: '#fff' }}>{I18n.t('buyMore')}</Text>
              <Text style={{ fontSize: scale(24), color: '#fff' }}>{I18n.t('saveMore')}</Text>
              <View style={{ borderWidth: .5, borderColor: '#fff', width: scale(110) }} />
              {item.qty == 189 ?
                <View style={{ top: 20 }}>
                  {item.offerList[0] ?
                    <Text style={[styles.itemText1, { color: '#fff', fontWeight: '300', padding: scale(10) }]}>
                      {Object.keys(item.offerList[0])[0]}
                      <Text style={{ fontWeight: '700' }}>&nbsp;{I18n.t('for')}</Text>
                      &nbsp;{item.currency} &nbsp;{Object.values(item.offerList[0])[0]}</Text>
                    : <View />}

                  {item.offerList[1] ?
                    <View>
                      <View style={{ borderWidth: .5, borderColor: '#fff', width: scale(110) }} />
                      <Text style={[styles.itemText1, { color: '#fff', fontWeight: '300', padding: scale(10) }]}>
                        {Object.keys(item.offerList[1])[0]}
                        <Text style={{ fontWeight: '700' }}>&nbsp;{I18n.t('for')}</Text>
                        &nbsp;{item.currency} &nbsp;{Object.values(item.offerList[1])[0]}</Text>
                    </View>
                    : <View />}
                </View>
                : <View />}

              <TouchableOpacity onPress={() => { this.props.navigation.navigate('HomeOffers') }} style={[styles.discoverMore, { top: 50 }]}>
                <Text style={[{ padding: scale(8), fontSize: scale(14), color: '#000' }]}>{I18n.t('discoverMore')}</Text>
              </TouchableOpacity>

            </View>
          </View>}
      </TouchableOpacity>
    )
  }

  renderOrderHistory = ({ item }) => {
    return (
      <TouchableOpacity style={[styles.orderTable, { width: '100%' }]}
        onPress={() => this.orderView(item.order_id)}>
        <View style={[styles.orderColumn, { width: '24%' }]}>
          <Text style={{ textAlign: 'center' }}>{item.order_date}</Text>
        </View>
        <View style={styles.orderColumn}>
          <Text style={{ textAlign: 'center' }}>{item.order_increment_id}</Text>
        </View>
        <View style={styles.orderColumn}>
          <Text style={{ textAlign: 'center' }}>{item.shipping_type}</Text>
        </View>
        <View style={styles.orderColumn}>
          <Text style={{ textAlign: 'center' }}>{item.payment_type}</Text>
        </View>
        <View style={styles.orderColumn}>
          <Text style={{ textAlign: 'center' }}>{item.currency} {item.order_total}</Text>
        </View>
      </TouchableOpacity>
    )
  }

  render() {
    const { profile, orderData, showAddressBook, showOrders } = this.state;
    return (
      <View style={{ flex: 1 }}>
        <HeaderComm changeLang={this.changeLang} navigation={this.props.navigation} onRef={instance => { this.instance = instance; }} classObj={this} {...this.props}/>
        {this.state.activityIndicator ?
          <ScrollView showsVerticalScrollIndicator={false}>
            <View style={styles.mainContainer}>
              <View style={styles.tabs}>
                <View style={{ width: '65%', flexDirection: 'row', justifyContent: 'space-around' }}>
                  <TouchableOpacity onPress={() => { this.setState({ showAccount: true, showOrderHistory: false, showWishlist: false, showAddressBook: false }) }}>
                    <Text style={[styles.headline, (this.state.showAccount ? styles.headingTextB : styles.headingText)]}>{I18n.t('acccount')}</Text>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => this.orderHistory()}>
                    <Text style={[styles.headline, (this.state.showOrderHistory ? styles.headingTextB : styles.headingText)]}>{I18n.t('order_history')}</Text>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => this.showWishListData()}>
                    <Text style={[styles.headline, (this.state.showWishlist ? styles.headingTextB : styles.headingText)]}>{I18n.t('wishlist')}</Text>
                  </TouchableOpacity>
                </View>
                <View style={{ width: '15%' }}></View>
                <View style={{ width: '20%' }}>
                  <TouchableOpacity style={[COMMONSTYLE.heroLargeButton, { height: scale(23) }]} onPress={() => this.logout()}>
                    <Text style={COMMONSTYLE.yesBtnTxt}>{I18n.t('logout')}</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
            <View>
              {this.state.showAccount ?
                <View style={[styles.mainContainer, { paddingHorizontal: scale(0) }]}>
                  <View style={{ marginTop: scale(20) }}>
                    <View style={{ flex: 1, paddingHorizontal: scale(10) }}>
                      <Text style={{ fontSize: scale(20) }}>{I18n.t('acccount')}</Text>
                      <View style={[styles.profileData, styles.border, { paddingHorizontal: scale(10) }]}>
                        {!showAddressBook ?
                          <View style={{ paddingHorizontal: scale(10) }}>
                            <Text style={{ paddingVertical: verticalScale(5), fontSize: scale(20) }}>{I18n.t('profile')}</Text>
                            <View style={{ flex: 1, flexDirection: 'row' }}>
                              <View style={{ width: '60%' }}>
                                <Text style={styles.fontTxt}>{I18n.t('EMAIL')}:</Text>
                                <Text style={[styles.fontTxt, I18n.locale === 'ar' && { marginRight: scale(70) }]}>{profile.email}</Text>
                              </View>
                              <View style={{ width: '40%' }}>
                                <Text style={styles.fontTxt}>{I18n.t('PASSWORD')}</Text>
                                <Text style={[styles.fontTxt, I18n.locale === 'ar' && { marginRight: scale(65) }]}>***********</Text>
                              </View>
                            </View>
                            <View style={{ flex: 1, flexDirection: 'row', paddingVertical: scale(5) }}>
                              <View style={{ width: '60%' }}>
                              </View>
                              <View style={{ width: '40%' }}>
                                <Text style={styles.fontTxt} onPress={() => { this.setState({ showChangePassword: true }) }}>{I18n.t('change_password')} ></Text>
                              </View>
                            </View>
                            <View style={{ flex: 1, flexDirection: 'row', marginTop: scale(10) }}>
                              <View style={{ width: '60%' }}>
                                <Text style={styles.fontTxt}>{I18n.t('phone_number')}</Text>
                                <Text style={[styles.fontTxt, I18n.locale === 'ar' && { marginRight: scale(120) }]}>{profile.phone_number}</Text>
                              </View>
                            </View>
                          </View>
                          : <View />}

                        <View style={{ marginTop: scale(10), paddingHorizontal: scale(10) }}>
                          <View style={{ flex: 1, flexDirection: 'row', width: '100%' }}>
                            <Text style={{ fontSize: scale(20), width: '50%' }}>{I18n.t('address_book')}</Text>
                            {showAddressBook ? <TouchableOpacity
                              style={[styles.addContactButton, { width: scale(170) }]}
                              activeOpacity={.5}
                              onPress={() => this.addContact()}>
                              <Text style={[styles.saveStyle, { paddingTop: scale(3) }]}>{I18n.t('addnewAddress')}</Text>
                            </TouchableOpacity> : <Text style={[styles.fontTxt, { width: '20%', textAlign: 'justify' }]} onPress={() => { this.setState({ showAddressBook: true }) }}>{I18n.t('view_all')}</Text>}
                          </View>
                          <View style={{ paddingHorizontal: scale(5) }}>{this.renderAddressList()}</View>
                        </View>
                      </View>
                    </View>
                  </View>
                </View> : <View />}
              {this.state.showOrderHistory ?
                <View style={[styles.mainContainer, { paddingHorizontal: scale(3) }]}>
                  <View style={{ marginTop: scale(20) }}>
                    <View style={styles.orderHeading}>
                      <Text style={{ fontSize: scale(20) }}>{I18n.t('order_history')}</Text>
                    </View>
                    {Object.keys(orderData).length > 0 ? <View>
                      {showOrders ? <View style={{ flex: 1, paddingHorizontal: scale(10) }}>
                        <View style={[styles.orderTable, { width: '100%' }]}>
                          <View style={[styles.orderColumn, { width: '24%' }]}>
                            <Text style={{ textAlign: 'center' }}>{I18n.t('order_date')}</Text>
                          </View>
                          <View style={styles.orderColumn}>
                            <Text style={{ textAlign: 'center' }}>{I18n.t('order_number1')}</Text>
                          </View>
                          <View style={styles.orderColumn}>
                            <Text style={{ textAlign: 'center' }}>{I18n.t('shipping_type')}</Text>
                          </View>
                          <View style={styles.orderColumn}>
                            <Text style={{ textAlign: 'center' }}>{I18n.t('payment_type')}</Text>
                          </View>
                          <View style={styles.orderColumn}>
                            <Text style={{ textAlign: 'center' }}>{I18n.t('order_total')}</Text>
                          </View>
                        </View>
                        {/* <View style={[styles.orderTable, { width: '100%', flexDirection: 'column', }]}> */}
                        <ScrollView showsHorizontalScrollIndicator={false}>
                          <FlatList
                            data={orderData}
                            renderItem={this.renderOrderHistory}
                            ItemSeparatorComponent={this.renderSeparator}
                            keyExtractor={(item, index) => index.toString()}
                          />
                        </ScrollView>
                        {/* </View> */}
                        <View style={{ paddingVertical: verticalScale(10) }}></View>
                      </View> : <View style={{ flex: 1, justifyContent: 'center' }}>
                          <ActivityIndicator size="large" color="#0000ff" />
                        </View>}
                    </View> :
                      <View style={{ textAlign: 'center', paddingHorizontal: scale(10) }}>
                        <Text>{I18n.t('TEXT14')}</Text>
                      </View>}
                  </View>
                </View> : <View />}
              {this.state.showWishlist ?
                <View style={{ backgroundColor: '#F8F8F8' }}>{this.renderWishList()}</View> : <View />}
              {this.state.showChangePassword ?
                <View>{this.renderChangePassword()}</View> : <View />}
              {this.state.showAddAddress ?
                <View>{this.renderAddAddress()}</View> : <View />}
              {this.state.showAddressBook ?
                <View>{this.renderAddressBook()}</View> : <View />}
            </View>
            <Footer {...this.props} />
          </ScrollView> : <View style={{ flex: 1, justifyContent: 'center' }}>
            <ActivityIndicator size="large" color="#0000ff" />
          </View>}
      </View>



      // <View style={styles.mainContainer}>
      //   <SubHeader headerTitle = {CONSTV.DELIVERYPOLICY_TEXT}  {...this.props}/>
      //   <ScrollView showsVerticalScrollIndicator={false}>
      //     <View style={styles.imageContainer}>
      //       <Image source={{uri: "https://facebook.github.io/react-native/img/favicon.png", height: 200}} />
      //     </View>
      //     <View style={styles.profileText}>
      //       <View>
      //         <Text style={styles.title}>SHALIA SABT</Text>
      //       </View>
      //     <View style={styles.inputFields}>
      //         <Text style={styles.inputLabel}>First Name</Text>
      //         <TextInput style={styles.inputText} autoCorrect={false} underlineColorAndroid="transparent" autoCapitalize='words'
      //            keyboardType="default" value='SHALIA' disabled={this.state.buttonDisableEnable}></TextInput>
      //     </View>
      //     <View style={styles.inputFields}>
      //       <Text style={styles.inputLabel}>Last Name</Text>
      //         <TextInput style={styles.inputText} autoCorrect={false} underlineColorAndroid="transparent" autoCapitalize='words'
      //            keyboardType="default" value='SABT' disabled={this.state.buttonDisableEnable}></TextInput>
      //       </View>
      //     <View style={styles.inputFields}>
      //       <Text style={styles.inputLabel}>Email*</Text>
      //         <TextInput style={styles.inputText} autoCorrect={false} underlineColorAndroid="transparent" autoCapitalize='words'
      //            keyboardType="default" value='shalia@gmail.com' disabled={this.state.buttonDisableEnable}></TextInput>
      //       </View>
      //     <View style={styles.inputFields}>
      //       <Text style={styles.inputLabel}>Mobile*</Text>
      //         <TextInput style={styles.inputText} autoCorrect={false} underlineColorAndroid="transparent" autoCapitalize='words'
      //            keyboardType="default" value='8975165464' disabled={this.state.buttonDisableEnable}></TextInput> 
      //       </View>
      //     <View style={styles.inputFields}>
      //       <Text style={styles.inputLabel}>Contry of Residence</Text>
      //         <TextInput style={styles.inputText} autoCorrect={false} underlineColorAndroid="transparent" autoCapitalize='words'
      //            keyboardType="default" value='UAE' disabled={this.state.buttonDisableEnable}></TextInput>
      //       </View>
      //     <View style={styles.inputFields}>
      //       <Text style={styles.inputLabel}>Birthday</Text>
      //         <TextInput style={styles.inputText} autoCorrect={false} underlineColorAndroid="transparent" autoCapitalize='words'
      //            keyboardType="default" value='29, July 1986' disabled={this.state.buttonDisableEnable}></TextInput>
      //     </View>
      //     <View style={styles.inputFields}>
      //       <Text style={styles.inputLabel}>Wedding Anniversary</Text>
      //         <TextInput style={styles.inputText} autoCorrect={false} underlineColorAndroid="transparent" autoCapitalize='words'
      //            keyboardType="default" value='16, Jun 2011' disabled={this.state.buttonDisableEnable}></TextInput>
      //     </View>
      //     <View style={styles.inputFields}>
      //     <Text>Edit Profile ></Text>
      //     </View>
      //     </View>
      //   </ScrollView>
      // </View>
    );
  }
}

function mapStateToProps(state) {
  const { SignInReducer, CommonReducer, ProfileReducer } = state;
  return {
    passwordChangeData: SignInReducer.passwordChangeData,
    status: SignInReducer.status,
    orderHistoryData: ProfileReducer.orderHistoryData,
    orderStatus: ProfileReducer.status,
    productListData: ProfileReducer.productWishList,
    productWishListStatus: ProfileReducer.productWishListStatus,

    addressListData: ProfileReducer.addressList,
    addressListListStatus: ProfileReducer.addressListStatus,

    deleteAddress: ProfileReducer.deleteAddress,
    deleteAddressStatus: ProfileReducer.deleteAddressStatus,

    removeToWishListData: CommonReducer.removeToWishListData,
    removeTOWishListStatus: CommonReducer.removeTOWishListStatus,
  };
}
const mapDispatchToProps = (dispatch) => {
  return {
    doPasswordChange: (obj) => {
      dispatch(passwordChange(obj))
    },
    getOrderHistory: (obj) => {
      dispatch(orderHistory(obj))
    },
    removeToWishList: (obj) => {
      dispatch(removeToWishListProduct(obj))
    },
    getWishListData: (obj) => {
      dispatch(getWishList(obj))
    },
    getAddressListData: (obj) => {
      dispatch(getAddressList(obj))
    },
    deleteAddressListData: (obj) => {
      dispatch(deleteAddress(obj))
    },
    clearDeleteData: (obj) => {
      dispatch(clearDeleteAddressData(obj))
    },
    clearCart: () => {
      dispatch(clearCartData())
    },
    // updateNetworkLost: () => {
    //     dispatch(networkLost());
    // },
    // updateNetworkAvailable: () => {
    //     dispatch(networkAvailable());
    // },
  };

};

export default connect(mapStateToProps, mapDispatchToProps)(Profile);