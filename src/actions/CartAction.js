import { cartData, updatedCartData, deleteCartData, addToCartData, guestUser, guestCartAddCart, removeOutOfStockItem } from '../services/CartService';
export const CART_DATA_SUCCESS = 'CART_DATA_SUCCESS';
export const CART_DATA_FAILED =  'CART_DATA_FAILED';
export const CART_DATA_RESET =  'CART_DATA_RESET';

export const UPDATE_CART_DATA_SUCCESS = 'UPDATE_CART_DATA_SUCCESS';
export const UPDATE_CART_DATA_FAILED =  'UPDATE_CART_DATA_FAILED';
export const UPDATE_CART_DATA_RESET =  'UPDATE_CART_DATA_RESET';

export const DELETE_CART_DATA_SUCCESS = 'DELETE_CART_DATA_SUCCESS';
export const DELETE_CART_DATA_FAILED =  'DELETE_CART_DATA_FAILED';
export const DELETE_CART_DATA_RESET =  'DELETE_CART_DATA_RESET';

export const ADD_TO_CART_DATA_SUCCESS = 'ADD_TO_CART_DATA_SUCCESS';
export const ADD_TO_CART_DATA_FAILED =  'ADD_TO_CART_DATA_FAILED';
export const ADD_TO_CART_DATA_RESET =  'ADD_TO_CART_DATA_RESET';

export const GUEST_USER_SUCCESS = 'GUEST_USER_SUCCESS';
export const GUEST_USER_FAILED =  'GUEST_USER_FAILED';
export const GUEST_USER_RESET =  'GUEST_USER_RESET';

export const GUEST_USER_ADD_TO_CART_DATA_SUCCESS = 'GUEST_USER_ADD_TO_CART_DATA_SUCCESS';
export const GUEST_USER_ADD_TO_CART_DATA_FAILED =  'GUEST_USER_ADD_TO_CART_DATA_FAILED';
export const GUEST_USER_ADD_TO_CART_DATA_RESET =  'GUEST_USER_ADD_TO_CART_DATA_RESET';

export const REMOVE_OUT_STOCK_CART_DATA_SUCCESS = 'REMOVE_OUT_STOCK_CART_DATA_SUCCESS';
export const REMOVE_OUT_STOCK_CART_DATA_FAILED =  'REMOVE_OUT_STOCK_CART_DATA_FAILED';
export const REMOVE_OUT_STOCK_CART_DATA_RESET =  'REMOVE_OUT_STOCK_CART_DATA_RESET';


export function clearCartData() {
    return async (dispatch, getState) => {
        dispatch({
            type: CART_DATA_RESET,
        })
    }
}


export function getCart(obj) {
	return async (dispatch, getState) => {
		dispatch({ type: CART_DATA_RESET });
		try {
			await cartData(obj, (response) => {
				if (response.result === 'SUCCESS') {
					dispatch({
						type: CART_DATA_SUCCESS,
						payload: response.data,
					});
				}
				else if (response.result === 'FAILED') {
					dispatch({
						type: CART_DATA_FAILED,
						payload: response.data,
					})
                }
                else {
                    dispatch({
						type: CART_DATA_RESET,
						payload: response.data.message,
					})
                }
			})
		} catch (err) {
			dispatch({
				type: CART_DATA_FAILED,
				payload: err,
			})
		}
	}
}

export function getUpdatedCart(obj) {
	return async (dispatch, getState) => {
		dispatch({ type: UPDATE_CART_DATA_RESET });
		try {
			await updatedCartData(obj, (response) => {
				if (response.result === 'SUCCESS') {
					dispatch({
						type: UPDATE_CART_DATA_SUCCESS,
						payload: response.data,
					});
				}
				else if (response.result === 'FAILED') {
					dispatch({
						type: UPDATE_CART_DATA_FAILED,
						payload: response.data.message,
					})
                }
                else {
                    dispatch({
						type: UPDATE_CART_DATA_RESET,
						payload: response.data.message,
					})
                }
			})
		} catch (err) {
			dispatch({
				type: UPDATE_CART_DATA_FAILED,
				payload: err,
			})
		}
	}
}

export function getDeleteItemCart(obj) {
	return async (dispatch, getState) => {
		dispatch({ type: DELETE_CART_DATA_RESET });
		try {
			await deleteCartData(obj, (response) => {
				if (response.result === 'SUCCESS') {
					dispatch({
						type: DELETE_CART_DATA_SUCCESS,
						payload: response.data,
					});
				}
				else if (response.result === 'FAILED') {
					dispatch({
						type: DELETE_CART_DATA_FAILED,
						payload: response.data.message,
					})
                }
                else {
                    dispatch({
						type: DELETE_CART_DATA_RESET,
						payload: response.data.message,
					})
                }
			})
		} catch (err) {
			dispatch({
				type: DELETE_CART_DATA_FAILED,
				payload: err,
			})
		}
	}
}

export function addToCart(obj) {
	return async (dispatch, getState) => {
		dispatch({ type: ADD_TO_CART_DATA_RESET });
		try {
			await addToCartData(obj, (response) => {
				if (response.result === 'SUCCESS') {
					dispatch({
						type: ADD_TO_CART_DATA_SUCCESS,
						payload: response,
					});
				}
				else if (response.result === 'FAILED') {
					dispatch({
						type: ADD_TO_CART_DATA_FAILED,
						payload: response.data.message,
					})
                }
                else {
                    dispatch({
						type: ADD_TO_CART_DATA_RESET,
						payload: response.data.message,
					})
                }
			})
		} catch (err) {
			dispatch({
				type: ADD_TO_CART_DATA_FAILED,
				payload: err,
			})
		}
	}
}

export function guestUserData(obj) {
	return async (dispatch, getState) => {
		dispatch({ type: GUEST_USER_RESET });
		try {
			await guestUser(obj, (response) => {
				if (response.result === 'SUCCESS') {
					dispatch({
						type: GUEST_USER_SUCCESS,
						payload: response,
					});
				}
				else if (response.result === 'FAILED') {
					dispatch({
						type: GUEST_USER_FAILED,
						payload: response.data.message,
					})
                }
                else {
                    dispatch({
						type: GUEST_USER_RESET,
						payload: response.data.message,
					})
                }
			})
		} catch (err) {
			dispatch({
				type: GUEST_USER_FAILED,
				payload: err,
			})
		}
	}
}


export function guestUserAddToCart(obj, GId, lang_code) {
	return async (dispatch, getState) => {
		dispatch({ type: GUEST_USER_ADD_TO_CART_DATA_RESET });
		try {
			await guestCartAddCart(obj, GId, lang_code, (response) => {
				if (response.result === 'SUCCESS') {
					dispatch({
						type: GUEST_USER_ADD_TO_CART_DATA_SUCCESS,
						payload: response,
					});
				}
				else if (response.result === 'FAILED') {
					dispatch({
						type: GUEST_USER_ADD_TO_CART_DATA_FAILED,
						payload: response.data.message,
					})
                }
                else {
                    dispatch({
						type: GUEST_USER_ADD_TO_CART_DATA_RESET,
						payload: response.data.message,
					})
                }
			})
		} catch (err) {
			dispatch({
				type: GUEST_USER_ADD_TO_CART_DATA_FAILED,
				payload: err,
			})
		}
	}
}

export function removeItemsOutOfStock(obj) {
	return async (dispatch, getState) => {
		dispatch({ type: REMOVE_OUT_STOCK_CART_DATA_RESET });
		try {
			await removeOutOfStockItem(obj, (response) => {
				if (response.result === 'SUCCESS') {
					dispatch({
						type: REMOVE_OUT_STOCK_CART_DATA_SUCCESS,
						payload: response,
					});
				}
				else if (response.result === 'FAILED') {
					dispatch({
						type: REMOVE_OUT_STOCK_CART_DATA_FAILED,
						payload: response.data.message,
					})
                }
                else {
                    dispatch({
						type: REMOVE_OUT_STOCK_CART_DATA_RESET,
						payload: response.data.message,
					})
                }
			})
		} catch (err) {
			dispatch({
				type: REMOVE_OUT_STOCK_CART_DATA_FAILED,
				payload: err,
			})
		}
	}
}
 