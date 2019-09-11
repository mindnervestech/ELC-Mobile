import React, { Component } from 'react';
import { Platform, StyleSheet, Text, TextInput, Modal, View, ScrollView, Button, TouchableOpacity, Alert, Keyboard, Image, TouchableHighlight, Linking } from 'react-native';
//import styles from './Style';
import Validators from '../../utils/Validators';
import * as MESSAGE from '../../utils/Message';
import { scale, verticalScale } from '../../utils/Scale';
import MaterialIcons from "react-native-vector-icons/MaterialCommunityIcons";
import I18n from '../../localization/index';
import showToast from "../../helper/Toast";
import COMMONSTYLE from '../../utils/Style';
import styles from './Style';

class LanguagePopAtStart extends Component {

    constructor(props) {
        super(props);

        this.state = {
            showLanguage: false,
        }
    }

    showLanguageChooseModal = () => {
        this.setState({
            showLanguage: true
        })
    }


    showLanguageChooseDesign() {
        return (
            <View>
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={this.state.showLanguage}
                    onRequestClose={() => {

                    }}
                >
                    {/* <View style={COMMONSTYLE.content}>
                <View style={[COMMONSTYLE.container, { backgroundColor: '#fff' }]}>
                  <View style={[COMMONSTYLE.descriptionBtnContainer]}>
                    <View style={[COMMONSTYLE.heading, { paddingVertical: verticalScale(20) }]}>
                      <View style={{ flexDirection: 'row' }}>
                        <Text style={{ fontSize: scale(20), fontWeight: '400' }}>{I18n.t('passwordReset')}</Text>
                        <MaterialIcons
                          name='close-circle-outline'
                          onPress={() => { this.setState({ showResetPass: false }) }}
                          size={scale(25)}
                          style={{ textAlign: 'left', left: 60 }}
                        />
                      </View>
                    </View>
                    <View>
                      <View style={styles.inputBox}>
                        <Text style={styles.inputField}>{I18n.t('emailAddress')}</Text>
                        <TextInput
                          style={styles.textBox}
                          //placeholder="Email Address"
                          autoCorrect={false}
                          underlineColorAndroid="transparent"
                          autoCapitalize='words'
                          onChange={() => { this.checkButtonDisableEnable2(); }}
                          keyboardType="default"
                          value={this.state.email}
                          onChangeText={this.handleEmailInputChange}>
                        </TextInput>
                        {
                          this.state.emailError ?
                            <Text style={[styles.paragraphNormal, styles.error]}>{this.state.emailError}</Text> : <View />
                        }
                      </View>
    
                      <View style={styles.inputBox}>
                        <Text style={styles.inputField}>{I18n.t('mobile')}</Text>
                        <TextInput
                          style={styles.textBox}
                          //placeholder="Mobile Number"
                          autoCorrect={false}
                          underlineColorAndroid="transparent"
                          autoCapitalize='words'
                          onChange={() => { this.checkButtonDisableEnable2(); }}
                          keyboardType="numeric"
                          value={this.state.mobileNumber}
                          onChangeText={this.handleMobileInputChange} >
                        </TextInput>
                        {
                          this.state.mobileError ?
                            <Text style={[styles.paragraphNormal, styles.error]}>{this.state.mobileError}</Text> : <View />
                        }
                      </View>
                    </View>
    
                    <View style={COMMONSTYLE.btnMain}>
                      <TouchableOpacity
                        onPress={() => this.restPassword()}
                        disabled={this.state.buttonDisableEnable2}
                        style={[styles.newButton, { opacity: (this.state.buttonDisableEnable2 ? 0.7 : 1) }]}
                        activeOpacity={.5}>
                        <Text style={styles.TextStyle}>{I18n.t('Send')}</Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
              </View> */}
                    <View style={COMMONSTYLE.content}>
                        <View style={[COMMONSTYLE.container, { backgroundColor: '#fff' }]}>
                            <View style={[COMMONSTYLE.descriptionBtnContainer]}>
                                <View style={[styles.heading]}>
                                    <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
                                        <Text style={{ fontSize: scale(16), left: scale(20) }}>{I18n.t('SELECT_YOUR_COUNTRY')}</Text>
                                        <MaterialIcons
                                            name='close-circle-outline'
                                            onPress={() => { this.setState({ showLanguage: false }) }}
                                            size={scale(25)}
                                            style={{ textAlign: 'left', }}
                                        />
                                    </View>
                                    <View style={{ flexDirection: 'row' }}>
                                        <View style={{ flexDirection: 'column' }}>
                                            <MaterialIcons
                                                name='earth'
                                                onPress={() => { this.setState({ showLanguage: false }) }}
                                                size={scale(50)}
                                                style={{ left: scale(10), color: '#f5a0c0' }}
                                            />
                                            <Text style={{ fontSize: scale(15), left: scale(0), fontWeight: '400'}}>دولي</Text>
                                            <Text style={{ fontSize: scale(17), left: scale(5), fontWeight: '400' }}>International</Text>
                                        </View>
                                        <View style={{ flexDirection: 'column' }}>
                                            <MaterialIcons
                                                name='earth'
                                                onPress={() => { this.setState({ showLanguage: false }) }}
                                                size={scale(50)}
                                                style={{ left: scale(27), color: '#f5a0c0' }}
                                            />
                                            <Text style={{ fontSize: scale(15), left: scale(50), fontWeight: '400' }}>الإمارات</Text>
                                            <Text style={{ fontSize: scale(17), left: scale(50), fontWeight: '400' }}>UAE</Text>
                                        </View>
                                        <View style={{ flexDirection: 'column' }}>
                                            <MaterialIcons
                                                name='earth'
                                                onPress={() => { this.setState({ showLanguage: false }) }}
                                                size={scale(50)}
                                                style={{ left: scale(90), color: '#f5a0c0' }}
                                            />
                                            <Text style={{ fontSize: scale(15), left: scale(90), fontWeight: '400'}}>المملكة</Text>
                                            <Text style={{ fontSize: scale(17), left: scale(100), fontWeight: '400'}}>KSA</Text>
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


    render() {
        return (
            <View style={{ flex: 1, paddingHorizontal: 20, paddingVertical: 30 }}>
                <TouchableOpacity onPress={() => this.showLanguageChooseModal()}>
                    <Text>Choose Language</Text>
                </TouchableOpacity>
                {this.state.showLanguage ? <View>{this.showLanguageChooseDesign()}</View> : <View />}
            </View>
        );
    }

}

export default LanguagePopAtStart;