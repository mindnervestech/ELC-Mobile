
import { storeLocatorData } from '../services/StoreLocatorService';
export const STORE_LOCATOR_SUCCESS = 'STORE_LOCATOR_SUCCESS';
export const STORE_LOCATOR_FAILED =  'STORE_LOCATOR_FAILED';
export const STORE_LOCATOR_RESET =  'STORE_LOCATOR_RESET';



export function getStoreLocator(obj) {
	return async (dispatch, getState) => {
		//  dispatch({ type: HOME_DATA_RESET });
		try {
			await storeLocatorData(obj, (response) => {
				if (response.result === 'SUCCESS') {
					dispatch({
						type: STORE_LOCATOR_SUCCESS,
						payload: response.data,
					});
				}
				else if (response.result === 'FAILED') {
					dispatch({
						type: STORE_LOCATOR_FAILED,
						payload: response.data.message,
					})
				}
				else {
                    dispatch({
						type: STORE_LOCATOR_RESET,
						payload: response.data.message,
					})
                }
			})
		} catch (err) {
			dispatch({
				type: STORE_LOCATOR_FAILED,
				payload: err,
			})
		}
	}
}
