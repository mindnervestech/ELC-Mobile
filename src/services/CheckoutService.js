import { URL, URL1, URL5, AUTHORIZATION, CONTENT_TYPE, NO_CACHE, ACCEPT } from '../utils/Config'



export function getDelivery(object, callback) {
  var path = 'getdelivery/';
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

  fetch(URL1 + path, requestObject).then((response) => response.json())
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

export function setDelivery(object, callback) {
  var path = 'setdelivery/';
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

  fetch(URL1 + path, requestObject).then((response) => response.json())
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


export function getPayment(object, callback) {
  var path = 'getpayment/';
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

  fetch(URL1 + path, requestObject).then((response) => response.json())
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

export function setPayment(object, callback) {
  var path = 'setPayment/';
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




export function orderConfirmation(object, callback) {
  var path = 'orderconfirmation/';
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

//Place Order API
//http://nayomidev.iksulalive.com/index.php/rest/V1/app/placeorder/
export function placeOrder(object, callback) {
  var path = 'placeorder/';
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

//Apply Voucher API
//http://nayomidev.iksulalive.com/index.php/rest/V1/app/checkvoucher
export function applyVoucher(object, callback) {
  var path = 'checkvoucher/';
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
  fetch(URL1 + path, requestObject).then((response) => response.json())
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

//Remove Voucher API
//http://nayomidev.iksulalive.com/index.php/rest/V1/app/removevoucher
export function removeVoucher(object, callback) {
  var path = 'removevoucher/';
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
  fetch(URL1 + path, requestObject).then((response) => response.json())
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
