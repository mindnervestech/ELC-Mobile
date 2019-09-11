import { orderViewData, orderJson, orderSummary } from '../services/OrderService';
export const ORDER_VIEW_DATA_SUCCESS = 'ORDER_VIEW_DATA_SUCCESS';
export const ORDER_VIEW_DATA_FAILED =  'ORDER_VIEW_DATA_FAILED';
export const ORDER_VIEW_DATA_RESET =  'ORDER_VIEW_DATA_RESET';

export const ORDER_JSON_DATA_SUCCESS = 'ORDER_JSON_DATA_SUCCESS';
export const ORDER_JSON_DATA_FAILED =  'ORDER_JSON_DATA_FAILED';
export const ORDER_JSON_DATA_RESET =  'ORDER_JSON_DATA_RESET';

export const ORDER_SUMMARY_DATA_SUCCESS = 'ORDER_SUMMARY_DATA_SUCCESS';
export const ORDER_SUMMARY_DATA_FAILED =  'ORDER_SUMMARY_DATA_FAILED';
export const ORDER_SUMMARY_DATA_RESET =  'ORDER_SUMMARY_DATA_RESET';

export function clearOrderData() {
    return async (dispatch, getState) => {
        dispatch({
            type: ORDER_SUMMARY_DATA_RESET,
        })
    }
}

export function clearOrderJsonData() {
    return async (dispatch, getState) => {
        dispatch({
            type: ORDER_JSON_DATA_RESET,
        })
    }
}

export function getOrderView(obj) {
	return async (dispatch, getState) => {
		//  dispatch({ type: HOME_DATA_RESET });
		try {
			await orderViewData(obj, (response) => {
				if (response.result === 'SUCCESS') {
					dispatch({
						type: ORDER_VIEW_DATA_SUCCESS,
						payload: response.data,
					});
				}
				else if (response.result === 'FAILED') {
					dispatch({
						type: ORDER_VIEW_DATA_FAILED,
						payload: response.data.message,
					})
                }
                else {
                    dispatch({
						type: ORDER_VIEW_DATA_RESET,
						payload: response.data.message,
					})
                }
			})
		} catch (err) {
			dispatch({
				type: ORDER_VIEW_DATA_FAILED,
				payload: err,
			})
		}
	}
}


export function getOrderJson(obj) {
	return async (dispatch, getState) => {
		//  dispatch({ type: HOME_DATA_RESET });
		try {
			await orderJson(obj, (response) => {
				if (response.result === 'SUCCESS') {
					dispatch({
						type: ORDER_JSON_DATA_SUCCESS,
						payload: response.data,
					});
				}
				else if (response.result === 'FAILED') {
					dispatch({
						type: ORDER_JSON_DATA_FAILED,
						payload: response.data.message,
					})
                }
                else {
                    dispatch({
						type: ORDER_JSON_DATA_RESET,
						payload: response.data.message,
					})
                }
			})
		} catch (err) {
			dispatch({
				type: ORDER_JSON_DATA_FAILED,
				payload: err,
			})
		}
	}
}


export function getOrderSummary(obj) {
	return async (dispatch, getState) => {
		//  dispatch({ type: HOME_DATA_RESET });
		try {
			await orderSummary(obj, (response) => {
				if (response.result === 'SUCCESS') {
					dispatch({
						type: ORDER_SUMMARY_DATA_SUCCESS,
						payload: response.data,
					});
				}
				else if (response.result === 'FAILED') {
					dispatch({
						type: ORDER_SUMMARY_DATA_FAILED,
						payload: response.data.message,
					})
                }
                else {
                    dispatch({
						type: ORDER_SUMMARY_DATA_RESET,
						payload: response.data.message,
					})
                }
			})
		} catch (err) {
			dispatch({
				type: ORDER_SUMMARY_DATA_FAILED,
				payload: err,
			})
		}
	}
}