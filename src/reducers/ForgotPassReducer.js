import {
	FORGOT_PASSWORD_SUCCESS,
	FORGOT_PASSWORD_FAILED,
	FORGOT_PASSWORD_RESET,
} from '../actions/ForgotPassAction';
import showToast from '../helper/Toast';

const initialState = {
	forgotPassData: {},
	status: false,
};

export default function (state = initialState, action) {
	switch (action.type) {
		case FORGOT_PASSWORD_SUCCESS:
			return {
				...state,
				forgotPassData: action.payload,
				status: action.type
			}; 
		case FORGOT_PASSWORD_FAILED:
			return {
				...state,
				forgotPassData: action.payload,
				status: action.type

			};
		case FORGOT_PASSWORD_RESET:
			return {
				...state,
				status: false,
			};
		default: return state;
	}
}
