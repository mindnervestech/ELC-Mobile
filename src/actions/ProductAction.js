
// import { productMenuList } from '../services/ProductService';
import {productMenuList} from '../services/ProductService';

export const PRODUCT_LIST_SUCCESS = 'PRODUCT_LIST_SUCCESS';
export const PRODUCT_LIST_FAILED = 'PRODUCT_LIST_FAILED';
export const PRODUCT_LIST_RESET = 'PRODUCT_LIST_RESET';



export function getProductMenuList(obj) {
	return async (dispatch, getState) => {
        //dispatch({ type: PRODUCT_LIST_RESET });
		try {
			await productMenuList(obj, (response) => {
				if (response.result === 'SUCCESS') {
					dispatch({
						type: PRODUCT_LIST_SUCCESS,
						payload: response.data,
					});
				}
				else if (response.result === 'FAILED') {
					dispatch({
						type: PRODUCT_LIST_FAILED,
						payload: response.data,
					})
				}
            })
		} catch (err) {
			dispatch({
				type: PRODUCT_LIST_FAILED,
				payload: err,
			})
        }
	}
}
