
import React, { Component } from 'react';
import {
	StyleSheet,
	Image,
	SafeAreaView,
	Dimensions
} from 'react-native';
const {height, width} = Dimensions.get('window');
import { scale, verticalScale } from '../../utils/Scale';
import { getAllCountry } from '../../actions/CommonAction';

import { connect } from 'react-redux';



class SplashScreen extends Component {
	constructor(props) {
		super(props);
		this.state = {
		};
	}


	componentWillMount() {
		this.props.getAllCountryList();
		setTimeout(() => {
			this.props.navigation.navigate("Root");
		}, 5000);
	}


	render() {
		return (
			<SafeAreaView style={styles.container}>
				<Image source={require('../../assets/splashScreen/splash-NAY.gif')} style={styles.SplashImage} />
			</SafeAreaView>
		);
	}
}

var styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	SplashImage: {
		flex: 1,
		width: width,
        resizeMode: 'cover',
	}
});

function mapStateToProps(state) {
	const { } = state;
	return {
	};
  }

const mapDispatchToProps = (dispatch) => {
	return {
	  getAllCountryList: () => {
		dispatch(getAllCountry())
	  },
	};
  
  };

export default connect(mapStateToProps, mapDispatchToProps)(SplashScreen);