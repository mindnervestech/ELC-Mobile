
import { contactUsData } from '../services/ContactUsService';
export const CONTACT_US_SUCCESS = 'CONTACT_US_SUCCESS';
export const CONTACT_US_FAILED =  'CONTACT_US_FAILED';
export const CONTACT_US_RESET =  'CONTACT_US_RESET';

export function clearContactUsData() {
    return async (dispatch, getState) => {
        dispatch({
            type: CONTACT_US_RESET,
        })
    }
}

export function getContactUs(obj) {
	return async (dispatch, getState) => {
		//  dispatch({ type: HOME_DATA_RESET });
		try {
			await contactUsData(obj, (response) => {
				if (response.result === 'SUCCESS') {
					dispatch({
						type: CONTACT_US_SUCCESS,
						payload: response.data,
					});
				}
				else if (response.result === 'FAILED') {
					dispatch({
						type: CONTACT_US_FAILED,
						payload: response.data.message,
					})
				}
				else {
                    dispatch({
						type: CONTACT_US_RESET,
						payload: response.data.message,
					})
                }
			})
		} catch (err) {
			dispatch({
				type: CONTACT_US_FAILED,
				payload: err,
			})
		}
	}
}
