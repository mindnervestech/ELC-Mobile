import { URL , URL1, AUTHORIZATION, CONTENT_TYPE, NO_CACHE, ACCEPT } from '../utils/Config'

export function productListData(object, callback) {
    var path='productlisting/';
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
    fetch( URL1 + path + '?url_key=' +object.url_key + '&storeid=' + object.storeid, requestObject).then((response) => response.json())
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

export function searchProductListData(object, callback) {

	var path='searchresult/';
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

	fetch( URL1 + path + '?q=' +object.q + '&storeid=' + object.storeId, requestObject).then((response) => response.json())
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

export function productDetailData(object, callback) {
    var path='productbyid/?';
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