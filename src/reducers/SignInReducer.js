import {
	SIGN_IN_DATA_SUCCESS,
	SIGN_IN_DATA_FAILED,
	SIGN_IN_DATA_RESET,

	PASSWORD_CHANGE_SUCCESS,
	PASSWORD_CHANGE_FAILED,
	PASSWORD_CHANGE_RESET,
} from '../actions/SignInAction';

const initialState = {
	signInData: {},
	passwordChangeData: {},
	status: false,
};

export default function (state = initialState, action) {
	switch (action.type) {
		case SIGN_IN_DATA_SUCCESS:
			return {
				...state,
				status: action.type,
				signInData: action.payload,
			};
		case SIGN_IN_DATA_FAILED:
			return {
				...state,
				status: action.type,
				signInData: action.payload,
			};
		case SIGN_IN_DATA_RESET:
			return {
				...state,
				signInData: {},
				status: false,
			};
		case PASSWORD_CHANGE_SUCCESS:
			return {
				...state,
				status: action.type,
				passwordChangeData: action.payload,
			};
		case PASSWORD_CHANGE_FAILED:
			return {
				...state,
				status: action.type,
				passwordChangeData: action.payload,
			};
		case PASSWORD_CHANGE_RESET:
			return {
				...state,
				passwordChangeData: {},
				status: false,
			};
		default: return state;
	}
}
