
import {allCountryAndLangData, addToWishListData, removeToWishListData, allCountries} from '../services/CommonServices';

export const ALL_COUNTRY_LANGUAGES_DATA_SUCCESS = 'ALL_COUNTRY_LANGUAGES_DATA_SUCCESS';
export const ALL_COUNTRY_LANGUAGES_DATA_FAILED = 'ALL_COUNTRY_LANGUAGES_DATA_FAILED';
export const ALL_COUNTRY_LANGUAGES_DATA_RESET = 'ALL_COUNTRY_LANGUAGES_DATA_RESET';

export const ADD_WISH_LIST_DATA_SUCCESS = 'ADD_WISH_LIST_DATA_SUCCESS';
export const ADD_WISH_LIST_DATA_FAILED = 'ADD_WISH_LIST_DATA_FAILED';
export const ADD_WISH_LIST_DATA_RESET = 'ADD_WISH_LIST_DATA_RESET';

export const REMOVE_WISH_LIST_DATA_SUCCESS = 'REMOVE_WISH_LIST_DATA_SUCCESS';
export const REMOVE_WISH_LIST_DATA_FAILED = 'REMOVE_WISH_LIST_DATA_FAILED';
export const REMOVE_WISH_LIST_DATA_RESET = 'REMOVE_WISH_LIST_DATA_RESET';

export const ALL_COUNTRY_SUCCESS = 'ALL_COUNTRY_SUCCESS';
export const ALL_COUNTRY_FAILED = 'ALL_COUNTRY_FAILED';
export const ALL_COUNTRY_RESET = 'ALL_COUNTRY_RESET';

export const NO_NETWORK = 'NO_NETWORK';
export const NETWORK_COME = 'NETWORK_COME';

export const COUNTRY_CHANGE = 'COUNTRY_CHANGE';



export function networkLost() {
	return { type: NO_NETWORK };
}

export function networkAvailable() {
	return { type: NETWORK_COME };
}

export function updateCurrentCountry(country) {
	return {type: COUNTRY_CHANGE,
			payload: country};
}

export function clearGetAllCountryAndLangData(){
    return async (dispatch, getState) => {
        dispatch({
            type: ALL_COUNTRY_RESET,
        })
    }
}

export function getAllCountryAndLangData(obj) {
	return async (dispatch, getState) => {
		//  dispatch({ type: HOME_DATA_RESET });
		try {
			await allCountryAndLangData(obj, (response) => {
				if (response.result === 'SUCCESS') {
					dispatch({
						type: ALL_COUNTRY_LANGUAGES_DATA_SUCCESS,
						payload: response.data,
					});
				}
				else if (response.result === 'FAILED') {
					dispatch({
						type: ALL_COUNTRY_LANGUAGES_DATA_FAILED,
						payload: response.data,
					})
				}
			})
		} catch (err) {
			dispatch({
				type: ALL_COUNTRY_LANGUAGES_DATA_RESET,
				payload: err,
			})
		}
	}
}

export function addToWishListProduct(obj) {
	return async (dispatch, getState) => {
		//  dispatch({ type: HOME_DATA_RESET });
		try {
			await addToWishListData(obj, (response) => {
				if (response.result === 'SUCCESS') {
					dispatch({
						type: ADD_WISH_LIST_DATA_SUCCESS,
						payload: response.data,
					});
				}
				else if (response.result === 'FAILED') {
					dispatch({
						type: ADD_WISH_LIST_DATA_FAILED,
						payload: response.data,
					})
				}
			})
		} catch (err) {
			dispatch({
				type: ADD_WISH_LIST_DATA_RESET,
				payload: err,
			})
		}
	}
}

export function removeToWishListProduct(obj) {
	return async (dispatch, getState) => {
		//  dispatch({ type: HOME_DATA_RESET });
		try {
			await removeToWishListData(obj, (response) => {
				if (response.result === 'SUCCESS') {
					dispatch({
						type: REMOVE_WISH_LIST_DATA_SUCCESS,
						payload: response.data,
					});
				}
				else if (response.result === 'FAILED') {
					dispatch({
						type: REMOVE_WISH_LIST_DATA_FAILED,
						payload: response.data,
					})
				}
			})
		} catch (err) {
			dispatch({
				type: REMOVE_WISH_LIST_DATA_RESET,
				payload: err,
			})
		}
	}
}

export function getAllCountry() {
	return async (dispatch, getState) => {
		//  dispatch({ type: HOME_DATA_RESET });
		try {
			await allCountries((response) => {
				if (response.result === 'SUCCESS') {
					dispatch({
						type: ALL_COUNTRY_SUCCESS,
						payload: response.data,
					});
				}
				else if (response.result === 'FAILED') {
					dispatch({
						type: ALL_COUNTRY_FAILED,
						payload: response.data,
					})
				}
			})
		} catch (err) {
			dispatch({
				type: ALL_COUNTRY_RESET,
				payload: err,
			})
		}
	}
}

