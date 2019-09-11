import  AsyncStorage from '@react-native-community/async-storage';

class Util {
	static async getAsyncStorage(key) {
		return new Promise((resolve, reject) => {
			AsyncStorage.getItem(key).then(
				(response) => {
					try {
					resolve( JSON.parse(response))
					}catch(err){

					}
				}
			);
		})
	}

	static async setAsyncStorage(key, value) {
				var stringyfy_value = JSON.stringify(value);
				try {
					AsyncStorage.setItem(key, stringyfy_value)
				}
				catch (err) {
				};
	}

	static async removeAsyncstorageItems(keys) {
		return await AsyncStorage.multiRemove(keys, (err) => {
		});
	}
	static async removeAsyncstorage(key) {
		return await AsyncStorage.removeItem(key).then(
			(response) => {
				return response;
			}
		);
	}





}

export default Util;
