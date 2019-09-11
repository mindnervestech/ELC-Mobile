import { orderHistoryData,productWishList,addressList, deleteAddressList,updateAddress} from '../services/ProfileService';
export const ORDER_HISTORY_SUCCESS = 'ORDER_HISTORY_SUCCESS';
export const ORDER_HISTORY_FAILED =  'ORDER_HISTORY_FAILED';
export const ORDER_HISTORY_RESET =  'ORDER_HISTORY_RESET';
export const WISH_LIST_SUCCESS =  'WISH_LIST_SUCCESS';
export const WISH_LIST_FAILED =  'WISH_LIST_FAILED';
export const WISH_LIST_RESET =  'WISH_LIST_RESET';
export const ADDRESS_LIST_SUCCESS =  'ADDRESS_LIST_SUCCESS';
export const ADDRESS_LIST_FAILED =  'ADDRESS_LIST_FAILED';
export const ADDRESS_LIST_RESET =  'ADDRESS_LIST_RESET';
export const DELETE_ADDRESS_SUCCESS =  'DELETE_ADDRESS_SUCCESS';
export const DELETE_ADDRESS_FAILED =  'DELETE_ADDRESS_FAILED';
export const DELETE_ADDRESS_RESET =  'DELETE_ADDRESS_RESET';
export const UPDATE_ADDRESS_SUCCESS =  'UPDATE_ADDRESS_SUCCESS';
export const UPDATE_ADDRESS_FAILED =  'UPDATE_ADDRESS_FAILED';
export const UPDATE_ADDRESS_RESET =  'UPDATE_ADDRESS_RESET';

export function clearUpdateAddressData() {
    return async (dispatch, getState) => {
        dispatch({
            type: UPDATE_ADDRESS_RESET,
        })
    }
}
export function clearDeleteAddressData() {
    return async (dispatch, getState) => {
        dispatch({
            type: DELETE_ADDRESS_RESET,
        })
    }
}
export function orderHistory(obj) {
	return async (dispatch, getState) => {
		//  dispatch({ type: HOME_DATA_RESET });
		try {
			await orderHistoryData(obj, (response) => {
				if (response.result === 'SUCCESS') {
					dispatch({
						type: ORDER_HISTORY_SUCCESS,
						payload: response.data,
					});
				}
				else if (response.result === 'FAILED') {
					dispatch({
						type: ORDER_HISTORY_FAILED,
						payload: response.data.message,
					})
				}
				else {
                    dispatch({
						type: ORDER_HISTORY_RESET,
						payload: response.data.message,
					})
                }
			})
		} catch (err) {
			dispatch({
				type: ORDER_HISTORY_FAILED,
				payload: err,
			})
		}
	}
}

export function getWishList(obj) {
	return async (dispatch, getState) => {
		dispatch({ type: WISH_LIST_RESET });
		try {
			await productWishList(obj, (response) => {
				if (response.result === 'SUCCESS') {
					dispatch({
						type: WISH_LIST_SUCCESS,
						payload: response.data,
					});
				}
				else if (response.result === 'FAILED') {
					dispatch({
						type: WISH_LIST_FAILED,
						payload: response.data.message,
					})
				}
				else {
                    dispatch({
						type: WISH_LIST_RESET,
						payload: response.data.message,
					})
                }
			})
		} catch (err) {
			dispatch({
				type: WISH_LIST_FAILED,
				payload: err,
			})
		}
	}
}

export function getAddressList(obj) {
	return async (dispatch, getState) => {
		try {
			await addressList(obj, (response) => {
				if (response.result === 'SUCCESS') {
					dispatch({
						type: ADDRESS_LIST_SUCCESS,
						payload: response.data,
					});
				}
				else if (response.result === 'FAILED') {
					dispatch({
						type: ADDRESS_LIST_FAILED,
						payload: response.data.message,
					})
				}
				else {
                    dispatch({
						type: ADDRESS_LIST_RESET,
						payload: response.data.message,
					})
                }
			})
		} catch (err) {
			dispatch({
				type: ADDRESS_LIST_FAILED,
				payload: err,
			})
		}
	}
}

export function deleteAddress(obj) {
	return async (dispatch, getState) => {
		try {
			await deleteAddressList(obj, (response) => {
				if (response.result === 'SUCCESS') {
					dispatch({
						type: DELETE_ADDRESS_SUCCESS,
						payload: response.data,
					});
				}
				else if (response.result === 'FAILED') {
					dispatch({
						type: DELETE_ADDRESS_FAILED,
						payload: response.data.message,
					})
				}
				else {
                    dispatch({
						type: DELETE_ADDRESS_RESET,
						payload: response.data.message,
					})
                }
			})
		} catch (err) {
			dispatch({
				type: DELETE_ADDRESS_FAILED,
				payload: err,
			})
		}
	}
}

export function addUpdateAddress(obj) {
	return async (dispatch, getState) => {
		try {
			await updateAddress(obj, (response) => {
				if (response.result === 'SUCCESS') {
					dispatch({
						type: UPDATE_ADDRESS_SUCCESS,
						payload: response.data,
					});
				}
				else if (response.result === 'FAILED') {
					dispatch({
						type: UPDATE_ADDRESS_FAILED,
						payload: response.data.message,
					})
				}
				else {
                    dispatch({
						type: UPDATE_ADDRESS_RESET,
						payload: response.data.message,
					})
                }
			})
		} catch (err) {
			dispatch({
				type: UPDATE_ADDRESS_FAILED,
				payload: err,
			})
		}
	}
}