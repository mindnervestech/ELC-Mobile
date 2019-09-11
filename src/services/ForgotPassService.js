import { URL , URL1, AUTHORIZATION, CONTENT_TYPE, NO_CACHE, ACCEPT } from '../utils/Config'


export function forgotPassData(object, callback) {
    var path='forgotpassword/';
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