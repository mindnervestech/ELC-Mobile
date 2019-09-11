
import {setDelivery, getPayment, getDelivery,setPayment, orderConfirmation, placeOrder, applyVoucher, removeVoucher} from '../services/CheckoutService';
export const SET_DELIVERY_SUCCESS = 'SET_DELIVERY_SUCCESS';
export const SET_DELIVERY_FAILED =  'SET_DELIVERY_FAILED';
export const SET_DELIVERY_RESET =  'SET_DELIVERY_RESET';

export const GET_DELIVERY_SUCCESS = 'GET_DELIVERY_SUCCESS';
export const GET_DELIVERY_FAILED =  'GET_DELIVERY_FAILED';
export const GET_DELIVERY_RESET =  'GET_DELIVERY_RESET';

export const GET_PAYMENT_SUCCESS = 'GET_PAYMENT_SUCCESS';
export const GET_PAYMENT_FAILED =  'GET_PAYMENT_FAILED';
export const GET_PAYMENT_RESET =  'GET_PAYMENT_RESET';

export const SET_PAYMENT_SUCCESS = 'SET_PAYMENT_SUCCESS';
export const SET_PAYMENT_FAILED =  'SET_PAYMENT_FAILED';
export const SET_PAYMENT_RESET =  'SET_PAYMENT_RESET';

export const ORDER_CONFIRM_SUCCESS = 'ORDER_CONFIRM_SUCCESS';
export const ORDER_CONFIRM_FAILED =  'ORDER_CONFIRM_FAILED';
export const ORDER_CONFIRM_RESET =  'ORDER_CONFIRM_RESET';

export const PLACE_ORDER_SUCCESS = 'PLACE_ORDER_SUCCESS';
export const PLACE_ORDER_FAILED =  'PLACE_ORDER_FAILED';
export const PLACE_ORDER_RESET =  'PLACE_ORDER_RESET';

export const APPLY_VOUCHER_SUCCESS = 'APPLY_VOUCHER_SUCCESS';
export const APPLY_VOUCHER_FAILED =  'APPLY_VOUCHER_FAILED';
export const APPLY_VOUCHER_RESET =  'APPLY_VOUCHER_RESET';

export const REMOVE_VOUCHER_SUCCESS = 'REMOVE_VOUCHER_SUCCESS';
export const REMOVE_VOUCHER_FAILED =  'REMOVE_VOUCHER_FAILED';
export const REMOVE_VOUCHER_RESET =  'REMOVE_VOUCHER_RESET';


export function clearGetDeliveryData(){
    return async (dispatch, getState) => {
        dispatch({
            type: GET_DELIVERY_RESET,
        })
    }
}

export function clearSetDeliveryData(){
    return async (dispatch, getState) => {
        dispatch({
            type: SET_DELIVERY_RESET,
        })
    }
}

export function clearGetPayment(){
	return async (dispatch, getState) => {
		dispatch({ 
			type: GET_PAYMENT_RESET
		})
	}
}

export function clearSetPayment(){
	return async (dispatch, getState) => {
		dispatch({ 
			type: SET_PAYMENT_RESET
		})
	}
}

export function clearPlaceOrder(){
	return async (dispatch, getState) => {
		dispatch({ 
			type: PLACE_ORDER_RESET
		})
	}
}

export function clearOrderConfirm(){
	return async (dispatch, getState) => {
		dispatch({ 
			type: ORDER_CONFIRM_RESET
		})
	}
}

export function clearApplyVoucher(){
	return async (dispatch, getState) => {
		dispatch({ 
			type: APPLY_VOUCHER_RESET
		})
	}
}

export function clearRemoveVoucher(){
	return async (dispatch, getState) => {
		dispatch({ 
			type: REMOVE_VOUCHER_RESET
		})
	}
}

export function getDeliveryData(object) {
	return async (dispatch, getState) => {
		//dispatch({ type: GET_DELIVERY_RESET });
		try {
			await getDelivery(object, (response) => {
				if (response.result === 'SUCCESS') {
					dispatch({
						type: GET_DELIVERY_SUCCESS,
						payload: response.data,
					});
				}
				else if (response.result === 'FAILED') {
					dispatch({
						type: GET_DELIVERY_FAILED,
						payload: response.data.message,
					})
				}
				else {
                    dispatch({
						type: GET_DELIVERY_RESET,
						payload: response.data.message,
					})
                }
			})
		} catch (err) {
			dispatch({
				type: GET_DELIVERY_RESET,
				payload: err,
			})
		}
	}
}


export function setDeliveryData(obj) {
	return async (dispatch, getState) => {
		dispatch({ type: SET_DELIVERY_RESET });
		try {
			await setDelivery(obj, (response) => {
				if (response.result === 'SUCCESS') {
					dispatch({
						type: SET_DELIVERY_SUCCESS,
						payload: response.data,
					});
				}
				else if (response.result === 'FAILED') {
					dispatch({
						type: SET_DELIVERY_FAILED,
						payload: response.data.message,
					})
				}
				else {
                    dispatch({
						type: SET_DELIVERY_RESET,
						payload: response.data.message,
					})
                }
			})
		} catch (err) {
			dispatch({
				type: SET_DELIVERY_FAILED,
				payload: err,
			})
		}
	}
}


export function getPaymentData(object) {
	return async (dispatch, getState) => {
		dispatch({ type: GET_PAYMENT_RESET });
		try {
			await getPayment(object, (response) => {
				if (response.result === 'SUCCESS') {
					dispatch({
						type: GET_PAYMENT_SUCCESS,
						payload: response.data,
					});
				}
				else if (response.result === 'FAILED') {
					dispatch({
						type: GET_PAYMENT_FAILED,
						payload: response.data.message,
					})
				}
				else {
                    dispatch({
						type: GET_PAYMENT_RESET,
						payload: {},
					})
                }
			})
		} catch (err) {
			dispatch({
				type: GET_PAYMENT_FAILED,
				payload: err,
			})
		}
	}
}


export function setPaymentData(object) {
	return async (dispatch, getState) => {
	    dispatch({ type: SET_PAYMENT_RESET });
		try {
			await setPayment(object, (response) => {
				if (response.result === 'SUCCESS') {
					dispatch({
						type: SET_PAYMENT_SUCCESS,
						payload: response.data,
					});
				}
				else if (response.result === 'FAILED') {
					dispatch({
						type: SET_PAYMENT_FAILED,
						payload: response.data.message,
					})
				}
				else {
                    dispatch({
						type: SET_PAYMENT_RESET,
						payload: {},
					})
                }
			})
		} catch (err) {
			dispatch({
				type: SET_PAYMENT_FAILED,
				payload: err,
			})
		}
	}
}


export function orderConfirm(object) {
	return async (dispatch, getState) => {
		dispatch({ type: ORDER_CONFIRM_RESET });
		try {
			await orderConfirmation(object, (response) => {
				if (response.result === 'SUCCESS') {
					dispatch({
						type: ORDER_CONFIRM_SUCCESS,
						payload: response.data,
					});
				}
				else if (response.result === 'FAILED') {
					dispatch({
						type: ORDER_CONFIRM_FAILED,
						payload: response.data.message,
					})
				}
				else {
                    dispatch({
						type: ORDER_CONFIRM_RESET,
						payload: {},
					})
                }
			})
		} catch (err) {
			dispatch({
				type: ORDER_CONFIRM_FAILED,
				payload: err,
			})
		}
	}
}


export function placeOrderData(object) {
	return async (dispatch, getState) => {
		dispatch({ type: PLACE_ORDER_RESET });
		try {
			await placeOrder(object, (response) => {
				if (response.result === 'SUCCESS') {
					dispatch({
						type: PLACE_ORDER_SUCCESS,
						payload: response.data,
					});
				}
				else if (response.result === 'FAILED') {
					dispatch({
						type: PLACE_ORDER_FAILED,
						payload: response.data,
					})
				}
				else {
                    dispatch({
						type: PLACE_ORDER_RESET,
						payload: {},
					})
                }
			})
		} catch (err) {
			dispatch({
				type: PLACE_ORDER_FAILED,
				payload: err,
			})
		}
	}
}


export function applyVoucherData(object) {
	return async (dispatch, getState) => {
		dispatch({ type: APPLY_VOUCHER_RESET });
		try {
			await applyVoucher(object, (response) => {
				if (response.result === 'SUCCESS') {
					dispatch({
						type: APPLY_VOUCHER_SUCCESS,
						payload: response.data,
					});
				}
				else if (response.result === 'FAILED') {
					dispatch({
						type: APPLY_VOUCHER_FAILED,
						payload: response.data,
					})
				}
				else {
                    dispatch({
						type: APPLY_VOUCHER_RESET,
						payload: {},
					})
                }
			})
		} catch (err) {
			dispatch({
				type: APPLY_VOUCHER_FAILED,
				payload: err,
			})
		}
	}
}


export function removeVoucherData(object) {
	return async (dispatch, getState) => {
		dispatch({ type: REMOVE_VOUCHER_RESET });
		try {
			await removeVoucher(object, (response) => {
				if (response.result === 'SUCCESS') {
					dispatch({
						type: REMOVE_VOUCHER_SUCCESS,
						payload: response.data,
					});
				}
				else if (response.result === 'FAILED') {
					dispatch({
						type: REMOVE_VOUCHER_FAILED,
						payload: response.data.message,
					})
				}
				else {
                    dispatch({
						type: REMOVE_VOUCHER_RESET,
						payload: {},
					})
                }
			})
		} catch (err) {
			dispatch({
				type: REMOVE_VOUCHER_FAILED,
				payload: err,
			})
		}
	}
}


