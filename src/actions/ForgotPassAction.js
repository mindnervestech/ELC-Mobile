
import {forgotPassData} from '../services/ForgotPassService';

export const FORGOT_PASSWORD_SUCCESS = 'FORGOT_PASSWORD_SUCCESS';
export const FORGOT_PASSWORD_FAILED = 'FORGOT_PASSWORD_FAILED'; 
export const FORGOT_PASSWORD_RESET = 'FORGOT_PASSWORD_RESET';


export function clearPasswordReset(){
    return async (dispatch, getState) => {
        dispatch({
            type: FORGOT_PASSWORD_RESET,
        })
    }
}


export function passwordReset(obj) {
	return async (dispatch, getState) => {
		dispatch({ type: FORGOT_PASSWORD_RESET });
		try {
			await forgotPassData(obj, (response) => {
				if (response.result === 'SUCCESS') {
					dispatch({
						type: FORGOT_PASSWORD_SUCCESS,
						payload: response.data,
					});
				}
				else if (response.result === 'FAILED') {
					dispatch({
						type: FORGOT_PASSWORD_FAILED,
						payload: response.data,
					})
				}
			})
		} catch (err) {
			dispatch({
				type: FAILED,
				payload: err,
			})
		}
	}
}
