import { URL , URL1, URL3, AUTHORIZATION, CONTENT_TYPE, NO_CACHE,  ACCEPT} from '../utils/Config'


export function homeData(object, callback) {
    var path='home/?';
    var requestObject = {};
    requestObject['method']= 'GET';
    requestObject['headers'] = {
				'Authorization' : AUTHORIZATION,
				// 'Authorization' : 'Bearer exn50dak2a5iahy02hawo5il0y6j25ct',
				'Content-Type': CONTENT_TYPE,
				'Accept': ACCEPT,
        // 'Content-Type': 'application/json; charset=utf-8',
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

// homeOfferApi
export function homeOffersData(storeId, callback) {
	var path='discover-more/storeId/';
	var requestObject = {};
	requestObject['method']= 'GET';
	requestObject['headers'] = {
			'Authorization' : AUTHORIZATION,
			'Content-Type': CONTENT_TYPE,
			'Accept': ACCEPT,
			'Cache-Control': NO_CACHE,
			'Access-control-allow-origin': '*',
	}
	fetch( URL3 + path + storeId, requestObject).then((response) => response.json())
			 .then((responseJson) => {
	if (responseJson.active) {
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