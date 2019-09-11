
import {amiraSignUpData} from '../services/AmiraSignUpService';
export const AMIRA_SIGN_IN_DATA_SUCCESS = 'AMIRA_SIGN_IN_DATA_SUCCESS';
export const AMIRA_SIGN_IN_DATA_FAILED =  'AMIRA_SIGN_IN_DATA_FAILED';
export const AMIRA_SIGN_UP_DATA_RESET =  'AMIRA_SIGN_IN_DATA_RESET';


export function clearAmirahSignUpData() {
    return async (dispatch, getState) => {
        dispatch({
            type: AMIRA_SIGN_UP_DATA_RESET,
        })
    }
}

export function getSignUpData(obj) {
	return async (dispatch, getState) => {
		dispatch({ type: AMIRA_SIGN_UP_DATA_RESET });
		try {
			await amiraSignUpData(obj, (response) => {
				if (response.result === 'SUCCESS') {
					dispatch({
						type: AMIRA_SIGN_IN_DATA_SUCCESS,
						payload: response.data,
					});
				}
				else if (response.result === 'FAILED') {
					dispatch({
						type: AMIRA_SIGN_IN_DATA_FAILED,
						payload: response.data.message,
					})
				}
				else {
                    dispatch({
						type: AMIRA_SIGN_UP_DATA_RESET,
						payload: response.data.message,
					})
                }
			})
		} catch (err) {
			dispatch({
				type: AMIRA_SIGN_IN_DATA_FAILED,
				payload: err,
			})
		}
	}
}
