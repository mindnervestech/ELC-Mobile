
import {productListData, searchProductListData, productDetailData} from '../services/ProductListService';
export const PRODUCTLIST_DATA_SUCCESS = 'PRODUCTLIST_DATA_SUCCESS';
export const PRODUCTLIST_DATA_FAILED = 'PRODUCTLIST_DATA_FAILED';
export const PRODUCTLIST_DATA_RESET = 'PRODUCTLIST_DATA_RESET';

export const PRODUCTDETAIL_DATA_SUCCESS = 'PRODUCTDETAIL_DATA_SUCCESS';
export const PRODUCTDETAIL_DATA_FAILED = 'PRODUCTDETAIL_DATA_FAILED';
export const PRODUCTDETAIL_DATA_RESET = 'PRODUCTDETAIL_DATA_RESET';

export const SEARCH_PRODUCTLIST_DATA_SUCCESS = 'SEARCH_PRODUCTLIST_DATA_SUCCESS';
export const SEARCH_PRODUCTLIST_DATA_FAILED = 'SEARCH_PRODUCTLIST_DATA_FAILED';
export const SEARCH_PRODUCTLIST_DATA_RESET = 'SEARCH_PRODUCTLIST_DATA_RESET';

export const CHANGE_SWIPER_INDEX = 'CHANGE_SWIPER_INDEX';

export const FILTER_PRODUCT_LIST = 'FILTER_PRODUCT_LIST';

export function clearProductList(){
	return async (dispatch, getState) => {
		dispatch({ type: PRODUCTLIST_DATA_RESET })
	}
}

export function clearSearchList(){
	return async (dispatch, getState) => {
		dispatch({ type: SEARCH_PRODUCTLIST_DATA_RESET })
	}
}

export function changeSwiperIndex(obj){
	return async (dispatch, getState) => {
		dispatch({
			type: CHANGE_SWIPER_INDEX,
			payload: obj,
		})
	}
}

export function saveFilterData(obj){
	return async (dispatch, getState) => {
		dispatch({
			type: FILTER_PRODUCT_LIST,
			payload: obj,
		})
	}
}

export function clearProductDetail(){
	return async (dispatch, getState) => {
		dispatch({ type: PRODUCTDETAIL_DATA_RESET })
	}
}
 
export function getProductListData(obj) {
	return async (dispatch, getState) => {
		dispatch({ type: PRODUCTLIST_DATA_RESET });
		try {
			await productListData(obj, (response) => {
				if (response.result === 'SUCCESS') {
					dispatch({
						type: PRODUCTLIST_DATA_SUCCESS,
						payload: response.data,
					});
				}
				else if (response.result === 'FAILED') {
					dispatch({
						type: PRODUCTLIST_DATA_FAILED,
						payload: response.data,
					})
				}
			})
		} catch (err) {
			dispatch({
				type: PRODUCTLIST_DATA_RESET,
				payload: err,
			})
		}
	}
}

export function searchProductList(obj) {

	return async (dispatch, getState) => {
		dispatch({ type: SEARCH_PRODUCTLIST_DATA_RESET });
		try {
			await searchProductListData(obj, (response) => {
				if (response.result === 'SUCCESS') {
					dispatch({
						type: SEARCH_PRODUCTLIST_DATA_SUCCESS,
						payload: response.data,
					});
				}
				else if (response.result === 'FAILED') {
					dispatch({
						type: SEARCH_PRODUCTLIST_DATA_FAILED,
						payload: response.data,
					})
				}
			})
		} catch (err) {
			dispatch({
				type: SEARCH_PRODUCTLIST_DATA_RESET,
				payload: err,
			})
		}
	}
}

export function getProductDetailData(obj) {
	return async (dispatch, getState) => {
		//dispatch({ type: PRODUCTDETAIL_DATA_RESET });
		try {
			await productDetailData(obj, (response) => {
				if (response.result === 'SUCCESS') {
					dispatch({
						type: PRODUCTDETAIL_DATA_SUCCESS,
						payload: response.data,
					});
				}
				else if (response.result === 'FAILED') {
					dispatch({
						type: PRODUCTDETAIL_DATA_FAILED,
						payload: response.data,
					})
				}
			})
		} catch (err) {
			dispatch({
				type: PRODUCTDETAIL_DATA_RESET,
				payload: err,
			})
		}
	}
}