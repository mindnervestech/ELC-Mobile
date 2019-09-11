
import {getFaqData} from '../services/HelpCenterService';
import { getDeliveryPolicyData } from '../services/HelpCenterService';
import { getReturnandExchangeData } from '../services/HelpCenterService';
import { getPrivacyPolicyData } from '../services/HelpCenterService';
import { getTermsandConditionsData } from '../services/HelpCenterService';
import {getAboutUs} from '../services/HelpCenterService';
import { getPaymentMethodsData } from '../services/HelpCenterService';
import { getSizeGuideData } from '../services/HelpCenterService';

export const FAQ_SUCCESS = 'FAQ_SUCCESS';
export const FAQ_FAILED = 'FAQ_FAILED'; 
export const FAQ_RESET = 'FAQ_RESET'; 

export const DELIVERY_POLICY_SUCCESS = 'SUCCESS';
export const DELIVERY_POLICY_FAILED = 'FAILED';
export const DELIVERY_POLICY_RESET = 'RESET';

export const EXCHANGE_RETURN_SUCCESS = 'EXCHANGE_RETURN_SUCCESS';
export const EXCHANGE_RETURN_FAILED = 'EXCHANGE_RETURN_FAILED';
export const EXCHANGE_RETURN_RESET = 'EXCHANGE_RETURN_RESET ';

export const PRIVACY_POLICY_SUCCESS = 'PRIVACY_POLICY_SUCCESS';
export const PRIVACY_POLICY_FAILED = 'PRIVACY_POLICY_FAILED';
export const PRIVACY_POLICY_RESET = 'PRIVACY_POLICY_RESET';

export const TERMS_CONDITIONS_SUCCESS = 'TERMS_CONDITIONS_SUCCESS';
export const TERMS_CONDITIONS_FAILED = 'TERMS_CONDITIONS_FAILED';
export const TERMS_CONDITIONS_RESET = 'TERMS_CONDITIONS_RESET';

export const PAYMENT_METHODS_SUCCESS = 'PAYMENT_METHODS_SUCCESS';
export const PAYMENT_METHODS_FAILED = 'PAYMENT_METHODS_FAILED';
export const PAYMENT_METHODS_RESET = 'PAYMENT_METHODS_RESET';

export const SIZE_GUIDE_SUCCESS = 'SIZE_GUIDE_SUCCESS';
export const SIZE_GUIDE_FAILED = 'SIZE_GUIDE_FAILED';
export const SIZE_GUIDE_RESET = 'SIZE_GUIDE_RESET';

export const ABOUTUS_SUCCESS = 'ABOUTUS_SUCCESS';
export const ABOUTUS_FAILED = 'ABOUTUS_FAILED'; 
export const ABOUTUS_RESET = 'ABOUTUS_RESET'; 



export function getFagData(obj) {
	return async (dispatch, getState) => {
		dispatch({ type: FAQ_RESET });
		try {
			await getFaqData(obj, (response) => {
				if (response.result === 'SUCCESS') {
					dispatch({
						type: FAQ_SUCCESS,
						payload: response.data,
					});
				}
				else if (response.result === 'FAILED') {
					dispatch({
						type: FAQ_FAILED,
						payload: response.data,
					})
				}
			})
		} catch (err) {
			dispatch({
				type: FAQ_FAILED,
				payload: err,
			})
		}
	}
}

export function getDeliveryPolicy(obj) {
	return async (dispatch, getState) => {
		dispatch({ type: DELIVERY_POLICY_RESET });
		try {
			await getDeliveryPolicyData(obj, (response) => {
				if (response.result === 'SUCCESS') {
					dispatch({
						type: DELIVERY_POLICY_SUCCESS,
						payload: response.data,
					});
				}
				else if (response.result === 'FAILED') {
					dispatch({
						type: EXCHANGE_RETURN_FAILED,
						payload: response.data,
					})
				}
			})
		} catch (err) {
			dispatch({
				type: EXCHANGE_RETURN_FAILED,
				payload: err,
			})
		}
	}
}

export function getReturnandExchange(obj) {
	return async (dispatch, getState) => {
		dispatch({ type: EXCHANGE_RETURN_RESET });
		try {
			await getReturnandExchangeData(obj, (response) => {
				if (response.result === 'SUCCESS') {
					dispatch({
						type: EXCHANGE_RETURN_SUCCESS,
						payload: response.data,
					});
				}
				else if (response.result === 'FAILED') {
					dispatch({
						type: EXCHANGE_RETURN_FAILED,
						payload: response.data,
					})
				}
			})
		} catch (err) {
			dispatch({
				type: EXCHANGE_RETURN_FAILED,
				payload: err,
			})
		}
	}
}


export function getPrivacyPolicy(obj) {
	return async (dispatch, getState) => {
		dispatch({ type: PRIVACY_POLICY_RESET });
		try {
			await getPrivacyPolicyData(obj, (response) => {
				if (response.result === 'SUCCESS') {
					dispatch({
						type: PRIVACY_POLICY_SUCCESS,
						payload: response.data,
					});
				}
				else if (response.result === 'FAILED') {
					dispatch({
						type: PRIVACY_POLICY_FAILED,
						payload: response.data,
					})
				}
			})
		} catch (err) {
			dispatch({
				type: PRIVACY_POLICY_FAILED,
				payload: err,
			})
		}
	}
}

export function getTermsandConditions(obj) {
	return async (dispatch, getState) => {
		dispatch({ type: TERMS_CONDITIONS_RESET });
		try {
			await getTermsandConditionsData(obj, (response) => {
				if (response.result === 'SUCCESS') {
					dispatch({
						type: TERMS_CONDITIONS_SUCCESS,
						payload: response.data,
					});
				}
				else if (response.result === 'FAILED') {
					dispatch({
						type: TERMS_CONDITIONS_FAILED,
						payload: response.data,
					})
				}
			})
		} catch (err) {
			dispatch({
				type: PRIVACY_POLICY_FAILED,
				payload: err,
			})
		}
	}
}
  
export function getAboutUsData(storeId) {
	return async (dispatch, getState) => {
		dispatch({ type: ABOUTUS_RESET });
		try {
			await getAboutUs(storeId, (response) => {
				if (response.result === 'SUCCESS') {
					dispatch({
						type: ABOUTUS_SUCCESS,
						payload: response.data,
					});
				}
				else if (response.result === 'FAILED') {
					dispatch({
						type: ABOUTUS_FAILED,
						payload: response.data,
					})
				}
			})
		} catch (err) {
			dispatch({
				type: ABOUTUS_FAILED,
				payload: err,
			})
		}
	}
}

export function getPaymentMethods(obj) {
	return async (dispatch, getState) => {
		dispatch({ type: PAYMENT_METHODS_RESET });
		try {
			await getPaymentMethodsData(obj, (response) => {
				if (response.result === 'SUCCESS') {
					dispatch({
						type: PAYMENT_METHODS_SUCCESS,
						payload: response.data,
					});
				}
				else if (response.result === 'FAILED') {
					dispatch({
						type: PAYMENT_METHODS_FAILED,
						payload: response.data,
					})
				}
			})
		} catch (err) {
			dispatch({
				type: PAYMENT_METHODS_FAILED,
				payload: err,
			})
		}
	}
}

export function getSizeGuide(obj) {
	return async (dispatch, getState) => {
		dispatch({ type: SIZE_GUIDE_RESET });
		try {
			await getSizeGuideData(obj, (response) => {
				if (response.result === 'SUCCESS') {
					dispatch({
						type: SIZE_GUIDE_SUCCESS,
						payload: response.data,
					});
				}
				else if (response.result === 'FAILED') {
					dispatch({
						type: SIZE_GUIDE_FAILED,
						payload: response.data,
					})
				}
			})
		} catch (err) {
			dispatch({
				type: SIZE_GUIDE_FAILED,
				payload: err,
			})
		}
	}
}