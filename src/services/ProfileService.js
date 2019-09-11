import { URL , URL1, AUTHORIZATION, CONTENT_TYPE, NO_CACHE, ACCEPT } from '../utils/Config'

//Order History API
//http://nayomidev.iksulalive.com/index.php/rest/V1/app/orderhistory
export function orderHistoryData(object, callback) {
    var path='orderhistory/';
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

export function productWishList(object, callback) {
    var path='wishlistitems/';
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

export function addressList(object, callback) {
var path='addressbook/';
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
export function deleteAddressList(object, callback) {
var path='deleteaddress/';
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

export function updateAddress(object, callback) { 
  var path='addaddress/';
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