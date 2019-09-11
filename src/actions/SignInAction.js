
import { signInData, passwordChangeData } from '../services/SignInService';
export const SIGN_IN_DATA_SUCCESS = 'SIGN_IN_DATA_SUCCESS';
export const SIGN_IN_DATA_FAILED =  'SIGN_IN_DATA_FAILED';
export const SIGN_IN_DATA_RESET =  'SIGN_IN_DATA_RESET';

export const PASSWORD_CHANGE_SUCCESS = 'PASSWORD_CHANGE_SUCCESS';
export const PASSWORD_CHANGE_FAILED =  'PASSWORD_CHANGE_FAILED';
export const PASSWORD_CHANGE_RESET =  'PASSWORD_CHANGE_RESET';

export function clearSignIn(){
    return async (dispatch, getState) => {
        dispatch({
            type: SIGN_IN_DATA_RESET,
        })
    }
}

export function getSignInData(obj) {
	return async (dispatch, getState) => {
		dispatch({ type: SIGN_IN_DATA_RESET });
		try {
			await signInData(obj, (response) => {
				if (response.result === 'SUCCESS') {
					dispatch({
						type: SIGN_IN_DATA_SUCCESS,
						payload: response.data,
					});
				}
				else if (response.result === 'FAILED') {
					dispatch({
						type: SIGN_IN_DATA_FAILED,
						payload: response.data.message,
					})
				}
				else {
                    dispatch({
						type: SIGN_IN_DATA_RESET,
						payload: response.data.message,
					})
                }
			})
		} catch (err) {
			dispatch({
				type: SIGN_IN_DATA_FAILED,
				payload: err,
			})
		}
	}
}

export function passwordChange(obj) {
	return async (dispatch, getState) => {
		//  dispatch({ type: PASSWORD_CHANGE_RESET });
		try {
			await passwordChangeData(obj, (response) => {
				if (response.result === 'SUCCESS') {
					dispatch({
						type: PASSWORD_CHANGE_SUCCESS,
						payload: response.data,
					});
				}
				else if (response.result === 'FAILED') {
					dispatch({
						type: PASSWORD_CHANGE_FAILED,
						payload: response.data.message,
					})
				}
				else {
                    dispatch({
						type: PASSWORD_CHANGE_RESET,
						payload: response.data.message,
					})
                }
			})
		} catch (err) {
			dispatch({
				type: PASSWORD_CHANGE_FAILED,
				payload: err,
			})
		}
	}
}
