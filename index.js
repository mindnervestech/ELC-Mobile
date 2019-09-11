/**
 * @format
 */

import React, {Component} from 'react';
import {View} from 'react-native';
import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import { Provider } from 'react-redux';
import configureStore from './src/configureStore';

export default class ELC extends Component {
	constructor(props){
		super(props);
		this.state = {
			store: configureStore()
		};
	}

	render() {
		console.log(this.state.store);
		return (
			<View style={{flex:1}}>
				<Provider store={this.state.store}>
					<App />
				</Provider>
			</View>
		);
	}
}

AppRegistry.registerComponent(appName, () => ELC);
