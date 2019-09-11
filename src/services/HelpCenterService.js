import { URL , URL1,URL2, AUTHORIZATION, CONTENT_TYPE, NO_CACHE, ACCEPT } from '../utils/Config'

//FAQ data API
//http://nayomidev.iksulalive.com/rest/V1/cmsPageIdentifier/faq/storeId/4?storeId=4
export function getFaqData(storeId, callback) {
    var path='faq/storeId/';
    var requestObject = {};
    requestObject['method']= 'GET';
    requestObject['headers'] = {
				'Authorization' : AUTHORIZATION,
				'Content-Type': CONTENT_TYPE,
				'Accept': ACCEPT,
				'Cache-Control': NO_CACHE,
				'Access-control-allow-origin': '*',
    }

    fetch( URL2 + path + storeId, requestObject).then((response) => response.json())
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

//Delivery Policy API
//http://nayomidev.iksulalive.com/rest/V1/cmsPageIdentifier/delivery/storeId/4
export function getDeliveryPolicyData(storeId, callback) {
    var path='delivery/storeId/';
    var requestObject = {};
    requestObject['method']= 'GET';
    requestObject['headers'] = {
				'Authorization' : AUTHORIZATION,
				'Content-Type': CONTENT_TYPE,
				'Accept': ACCEPT,
				'Cache-Control': NO_CACHE,
				'Access-control-allow-origin': '*',
    }

    fetch( URL2 + path + storeId, requestObject).then((response) => response.json())
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

//Return Exchange API
//http://nayomidev.iksulalive.com/rest/V1/cmsPageIdentifier/returns-and-exchanges/storeId/4
export function getReturnandExchangeData(object, callback) {
    var path='returns-and-exchanges/storeId/';
    var requestObject = {};
    requestObject['method']= 'GET';
    requestObject['headers'] = {
				'Authorization' : AUTHORIZATION,
				'Content-Type': CONTENT_TYPE,
				'Accept': ACCEPT,
				'Cache-Control': NO_CACHE,
				'Access-control-allow-origin': '*',
    }

    fetch( URL2 + path + object , requestObject).then((response) => response.json())
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

//Privacy Policy API
//http://nayomidev.iksulalive.com/rest/V1/cmsPageIdentifier/privacy-policy/storeId/4
export function getPrivacyPolicyData(object, callback) {
    var path='privacy-policy/storeId/';
    var requestObject = {};
    requestObject['method']= 'GET';
    requestObject['headers'] = {
				'Authorization' : AUTHORIZATION,
				'Content-Type': CONTENT_TYPE,
				'Accept': ACCEPT,
				'Cache-Control': NO_CACHE,
				'Access-control-allow-origin': '*',
    }

    fetch( URL2 + path + object , requestObject).then((response) => response.json())
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


//Terms and Conditions API
//http://nayomidev.iksulalive.com/rest/V1/cmsPageIdentifier/terms-and-conditions/storeId/4
export function getTermsandConditionsData(object, callback) {
    var path='terms-and-conditions/storeId/';
    var requestObject = {};
    requestObject['method']= 'GET';
    requestObject['headers'] = {
				'Authorization' : AUTHORIZATION,
				'Content-Type': CONTENT_TYPE,
				'Accept': ACCEPT,
				'Cache-Control': NO_CACHE,
				'Access-control-allow-origin': '*',
      }

    fetch( URL2 + path + object, requestObject).then((response) => response.json())
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

//About Us API
export function getAboutUs(storeId, callback) {
	var path='brand-overview/storeId/';
	var requestObject = {};
	requestObject['method']= 'GET';
	requestObject['headers'] = {
			'Authorization' : AUTHORIZATION,
			'Content-Type': CONTENT_TYPE,
			'Accept': ACCEPT,
			'Cache-Control': NO_CACHE,
			'Access-control-allow-origin': '*',
	}
	fetch( URL2 + path + storeId , requestObject).then((response) => response.json())
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

//Payment Methods API
//http://nayomidev.iksulalive.com/rest/V1/cmsPageIdentifier/payment-methods/storeId/4
export function getPaymentMethodsData(object, callback) {
    var path='payment-methods/storeId/';
    var requestObject = {};
    requestObject['method']= 'GET';
    requestObject['headers'] = {
			'Authorization' : AUTHORIZATION,
			'Content-Type': CONTENT_TYPE,
			'Accept': ACCEPT,
			'Cache-Control': NO_CACHE,
			'Access-control-allow-origin': '*',
    }

    fetch( URL2 + path + object, requestObject).then((response) => response.json())
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

//Size Guide API
//http://nayomidev.iksulalive.com/index.php/rest/V1/app/sizechart
export function getSizeGuideData(object, callback) {
    var path='sizechart/?';
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

    fetch( URL1 + path + object , requestObject).then((response) => response.json())
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