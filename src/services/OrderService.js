import { URL , URL1, AUTHORIZATION, CONTENT_TYPE, NO_CACHE, ACCEPT } from '../utils/Config'

//Order View API
//http://nayomidev.iksulalive.com/index.php/rest/V1/app/orderview
export function orderViewData(object, callback) {
    var path='orderview/';
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

//Order Json API
//http://nayomidev.iksulalive.com/index.php/rest/V1/app/OrderJson
export function orderJson(object, callback) {
  var path = 'OrderJson/';
  var requestObject = {};
  requestObject['method'] = 'POST';
  requestObject['headers'] = {
      'Authorization' : AUTHORIZATION,
      'Content-Type': CONTENT_TYPE,
      'Accept': ACCEPT,
      'Cache-Control': NO_CACHE,
      'Access-control-allow-origin': '*',
  }
  requestObject['body'] = JSON.stringify(object);
  fetch(URL1+path, requestObject).then((response) => response.json())
    .then((responseJson) => {
      if (responseJson.length === 0) {
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

//OrderSummary API
//http://nayomidev.iksulalive.com/index.php/rest/V1/app/OrderSummary/
export function orderSummary(object, callback) {
  var path = 'OrderSummary/';
  var requestObject = {};
  requestObject['method'] = 'POST';
  requestObject['headers'] = {
      'Authorization' : AUTHORIZATION,
      'Content-Type': CONTENT_TYPE,
      'Accept': ACCEPT,
      'Cache-Control': NO_CACHE,
      'Access-control-allow-origin': '*',
  }
  requestObject['body'] = JSON.stringify(object);
  fetch(URL1+path, requestObject).then((response) => response.json())
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