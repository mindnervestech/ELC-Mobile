import { signUpData } from '../services/SignUpService';
export const SIGN_UP_DATA_SUCCESS = 'SIGN_UP_DATA_SUCCESS';
export const SIGN_UP_DATA_FAILED =  'SIGN_UP_DATA_FAILED';
export const SIGN_UP_DATA_RESET =  'SIGN_UP_DATA_RESET';


export function clearSignUpData() {
    return async (dispatch, getState) => {
        dispatch({
            type: SIGN_UP_DATA_RESET,
        })
    }
}


export function getSignUpData(obj) {
	return async (dispatch, getState) => {
		dispatch({ type: SIGN_UP_DATA_RESET });
		try {
			await signUpData(obj, (response) => {
				if (response.result === 'SUCCESS') {
					dispatch({
						type: SIGN_UP_DATA_SUCCESS,
						payload: response.data,
					});
				}
				else if (response.result === 'FAILED') {
					dispatch({
						type: SIGN_UP_DATA_FAILED,
						payload: response.data.message,
					})
                }
                else {
                    dispatch({
						type: SIGN_UP_DATA_RESET,
						payload: response.data.message,
					})
                }
			})
		} catch (err) {
			dispatch({
				type: SIGN_UP_DATA_FAILED,
				payload: err,
			})
		}
	}
}