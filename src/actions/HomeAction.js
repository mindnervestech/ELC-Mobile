
import {homeData, homeOffersData} from '../services/HomeService';
export const HOME_DATA_SUCCESS = 'HOME_DATA_SUCCESS';
export const HOME_DATA_FAILED = 'HOME_DATA_FAILED';
export const HOME_DATA_RESET = 'HOME_DATA_RESET';
export const HOME_DATA_OFFER_SUCCESS = 'HOME_DATA_OFFER_SUCCESS';
export const HOME_DATA_OFFER_FAILED = 'HOME_DATA_OFFER_FAILED';
export const HOME_DATA_OFFER_RESET = 'HOME_DATA_OFFER_RESET';



export function getHomeData(obj) {
	return async (dispatch, getState) => {
		//  dispatch({ type: HOME_DATA_RESET });
		try {
			await homeData(obj, (response) => {
				if (response.result === 'SUCCESS') {
					dispatch({
						type: HOME_DATA_SUCCESS,
						payload: response.data,
					});
				}
				else if (response.result === 'FAILED') {
					dispatch({
						type: HOME_DATA_FAILED,
						payload: response.data,
					})
				}
			})
		} catch (err) {
			dispatch({
				type: HOME_DATA_FAILED,
				payload: err,
			})
		}
	}
}


export function getHomeOffer(storeId) {
	return async (dispatch, getState) => {
		//  dispatch({ type: HOME_DATA_OFFER_RESET });
		try {
			await homeOffersData(storeId, (response) => {
				if (response.result === 'SUCCESS') {
					dispatch({
						type: HOME_DATA_OFFER_SUCCESS,
						payload: response.data,
					});
				}
				else if (response.result === 'FAILED') {
					dispatch({
						type: HOME_DATA_OFFER_FAILED,
						payload: response.data,
					})
				}
			})
		} catch (err) {
			dispatch({
				type: HOME_DATA_OFFER_FAILED,
				payload: err,
			})
		}
	}
}
