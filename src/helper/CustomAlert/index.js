
import React, { Component } from 'react';
import { Modal, TouchableOpacity, StyleSheet, Text, View } from 'react-native';
import COMMONSTYLE from '../../utils/Style';
import I18n from '../../localization/index';

type Props = {
	yesPressed: Function,
	okPressed: Function,
	cancelPressed: Function,
}

export default class CustomAlert extends Component {
	constructor(props) {
		super(props)
		const { text1, text2 } = this.props
		this.state = {
			text1: text1,
			text2: text2,
		}
	}

	render() {
		const { text1, text2, yesPressed, okPressed, cancelPressed, alertType } = this.props
		return (
			<View >
				<Modal
					animationType="fade"
					transparent={true}
					visible={this.state.visible}>
					<View style={COMMONSTYLE.content}>
						<View style={COMMONSTYLE.container}>
							<View style={COMMONSTYLE.descriptionBtnContainer}>
									<View style={COMMONSTYLE.heading}>
										<Text style={[COMMONSTYLE.headline4, COMMONSTYLE.headingTextColor]}>{this.props.text1}</Text>
									</View>
									<View style={COMMONSTYLE.description}>
										<Text style={[COMMONSTYLE.paragraphNormal, COMMONSTYLE.descriptionText]}>{this.props.text2}</Text>
									</View>	
									
											{
												alertType == 'OK' &&
												<View style={COMMONSTYLE.btnMain}>
													<TouchableOpacity style={[COMMONSTYLE.heroLargeButton, COMMONSTYLE.yesBtn]} onPress={() => { okPressed() }}>
															<Text style={COMMONSTYLE.yesBtnTxt}>{I18n.t('ok')}</Text>
													</TouchableOpacity>
												</View>
											}
											{
												alertType == 'Qty_Size' &&
												<View style={COMMONSTYLE.btnMain}>
													<TouchableOpacity style={[COMMONSTYLE.heroLargeButton, COMMONSTYLE.yesBtn]} onPress={() => { okPressed() }}>
															<Text style={COMMONSTYLE.yesBtnTxt}>{I18n.t('ok')}</Text>
													</TouchableOpacity>
												</View>
											}	
											{
												alertType == 'OK_CANCEL' &&
												<View style={COMMONSTYLE.btnMain}>
													<TouchableOpacity style={[COMMONSTYLE.heroLargeButton, COMMONSTYLE.yesBtn]} onPress={() => { okPressed() }}>
															<Text style={COMMONSTYLE.yesBtnTxt}>{I18n.t('ok')}</Text>
													</TouchableOpacity>
													<TouchableOpacity style={[COMMONSTYLE.neutralLargeButton, COMMONSTYLE.yesBtn]} onPress={() => { cancelPressed() }}>
															<Text style={COMMONSTYLE.yesBtnTxt}>{I18n.t('cancel')}</Text>
													</TouchableOpacity>
												</View>
											}	
											{	alertType == 'YES_CANCEL' &&
												<View style={COMMONSTYLE.btnMain}>
													<TouchableOpacity style={[COMMONSTYLE.heroLargeButton, COMMONSTYLE.yesBtn]} onPress={() => { yesPressed() }}>
															<Text style={COMMONSTYLE.yesBtnTxt}>{I18n.t('yes')}</Text>
													</TouchableOpacity>
													<TouchableOpacity style={[COMMONSTYLE.neutralLargeButton, COMMONSTYLE.yesBtn]} onPress={() => { cancelPressed() }}>
															<Text style={COMMONSTYLE.yesBtnTxt}>{I18n.t('cancel')}</Text>
													</TouchableOpacity>
												</View>
											}
											{	alertType == 'CANCEL_YES' &&
												<View style={COMMONSTYLE.btnMain}>
													<TouchableOpacity style={[COMMONSTYLE.heroLargeButton, COMMONSTYLE.yesBtn]} onPress={() => { cancelPressed() }}>
															<Text style={COMMONSTYLE.yesBtnTxt}>{I18n.t('cancel')}</Text>
													</TouchableOpacity>
													<TouchableOpacity style={[COMMONSTYLE.neutralLargeButton, COMMONSTYLE.yesBtn]} onPress={() => { yesPressed()}}>
															<Text style={COMMONSTYLE.yesBtnTxt}>{I18n.t('yes')}</Text>
													</TouchableOpacity>
												</View>
											}
								</View>
							</View>
					</View>
				</Modal>

			</View>);

	}
}

const styles = StyleSheet.create({
})

