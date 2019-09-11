import { URL5 , URL1, URL4, AUTHORIZATION, CONTENT_TYPE, NO_CACHE,  ACCEPT } from '../utils/Config'

//Cart API
//http://nayomidev.iksulalive.com/index.php/rest/V1/app/mycart/
export function cartData(object, callback) {
    var path='mycart/';
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

//Update Cart Item API
//http://nayomidev.iksulalive.com/index.php/rest/V1/app/updatecart/
export function updatedCartData(object, callback) {
  var path='updatecart/';
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

//Delete Cart Data
//http://nayomidev.iksulalive.com/index.php/rest/V1/app/deletecart/
export function deleteCartData(object, callback) {
  var path='deletecart/';
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

//Add To CArt
//http://nayomidev.iksulalive.com/index.php/rest/V1/carts/mine/items/
export function addToCartData(object, callback) {
  var path='items/';
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

  fetch( URL4 + path, requestObject).then((response) => response.json())
       .then((responseJson) => {
  if (responseJson.item_id) {
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

//Guest User API
//http://nayomidev.iksulalive.com/index.php/rest/V1/guest-carts
export function guestUser(object, callback) {
  var path='guest-carts';
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

  fetch( URL5 + path, requestObject).then((response) => response.json())
       .then((responseJson) => {
  if (responseJson) {
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

//Guest User Cart API
//http://nayomidev.iksulalive.com/index.php/rest/uae_en/V1/guest-carts/17cf1162ee6ffd4c8998bdbae2390a1c/items
export function guestCartAddCart(object, GId, lang_code,  callback) {
  var path1 = 'http://nayomidev.iksulalive.com/index.php/rest/'
  var path2='/V1/guest-carts/';
  var path3='/items/'
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

  fetch( path1 + lang_code + path2 + GId + path3, requestObject).then((response) => response.json())
       .then((responseJson) => {
  if (responseJson.item_id) {
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

//Remove Out Of Stock Item
//http://nayomidev.iksulalive.com/index.php/rest/V1/app/removemultiple/
export function removeOutOfStockItem(object, callback) {
  var path='removemultiple/';
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