import { URL , URL1, URL3,URL5, AUTHORIZATION, CONTENT_TYPE, NO_CACHE, ACCEPT  } from '../utils/Config'

export function allCountryAndLangData(object, callback) {
    var path='storeinfo?';
    var requestObject = {};
    requestObject['method']= 'GET';
    requestObject['headers'] = {
			'Authorization' : AUTHORIZATION,
      'Content-Type': CONTENT_TYPE,
      'Accept': ACCEPT,
      'Cache-Control': NO_CACHE,
      'Access-control-allow-origin': '*',
    }
    //requestObject['body'] = JSON.stringify(object);

    fetch( URL1 + path + object, requestObject).then((response) => response.json())
         .then((responseJson) => {
		if (responseJson.status) {
			callback({ result: 'SUCCESS', data: responseJson });
		} else {
			callback({ result: 'FAILED', data: responseJson });
		}
	}).catch((error) => {
		callback({
			result: 'FAILED',
			data: error,
		});
	});

}


export function allCountries(callback) {
	var path='directory/countries';
	var requestObject = {};
	requestObject['method']= 'GET';
	requestObject['headers'] = {
			'Authorization' : AUTHORIZATION,
			'Content-Type': CONTENT_TYPE,
			'Accept': ACCEPT,
			'Cache-Control': NO_CACHE,
			'Access-control-allow-origin': '*',
	}
	// requestObject['body'] = JSON.stringify(object);

	fetch( URL5 + path, requestObject).then((response) => response.json())
			 .then((responseJson) => {
	if (responseJson.length !== 0) {
		callback({ result: 'SUCCESS', data: responseJson });
	} else {
		callback({ result: 'FAILED', data: responseJson });
	}
}).catch((error) => {
	callback({
		result: 'FAILED',
		data: error,
	});
});

}
export function addToWishListData(object, callback) {
    var path='addtowishlist';
    var requestObject = {};
    requestObject['method']= 'POST';
    requestObject['headers'] = {
				'Authorization' : AUTHORIZATION,
				'Content-Type': CONTENT_TYPE,
				'Accept': ACCEPT,
				'Cache-Control': NO_CACHE,
				'Access-control-allow-origin': '*',
    }
    requestObject['body'] = JSON.stringify(object);

    fetch( URL1 + path, requestObject).then((response) => response.json())
         .then((responseJson) => {
		if (responseJson.status) {
			callback({ result: 'SUCCESS', data: responseJson });
		} else {
			callback({ result: 'FAILED', data: responseJson });
		}
	}).catch((error) => {
		callback({
			result: 'FAILED',
			data: error,
		});
	});

} 

export function removeToWishListData(object, callback) {
	var path='removewishlistitem';
	var requestObject = {};
	requestObject['method']= 'POST';
	requestObject['headers'] = {
			'Authorization' : AUTHORIZATION,
			'Content-Type': CONTENT_TYPE,
			'Accept': ACCEPT,
			'Cache-Control': NO_CACHE,
			'Access-control-allow-origin': '*',
	}
	requestObject['body'] = JSON.stringify(object);
	fetch( URL1 + path, requestObject).then((response) => response.json())
			 .then((responseJson) => {
	if (responseJson.status) {
		callback({ result: 'SUCCESS', data: responseJson });
	} else {
		callback({ result: 'FAILED', data: responseJson });
	}
}).catch((error) => {
	callback({
		result: 'FAILED',
		data: error,
	});
});

}