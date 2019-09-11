
import { URL , URL1, AUTHORIZATION, CONTENT_TYPE, NO_CACHE, ACCEPT } from '../utils/Config'


export function storeLocatorData(object, callback) {
    var path='storelocator?';
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

    fetch( URL + path + object, requestObject).then((response) => response.json())
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