import {
	SIGN_UP_DATA_SUCCESS,
    SIGN_UP_DATA_FAILED,
    SIGN_UP_DATA_RESET
} from '../actions/SignUpAction';

const initialState = {
	signUpData: {},
	status: false,
};

export default function (state = initialState, action) {
	switch (action.type) {
		case SIGN_UP_DATA_SUCCESS:
			return {
                ...state,
                status: action.type,
				signUpData: action.payload,
			};
		case SIGN_UP_DATA_FAILED:
			return {
				...state,
				status: action.type,
				signUpData: action.payload,
			};
		case SIGN_UP_DATA_RESET:
			return {
				...state,
				signUpData: {},
				status: false,
			};
		default: return state;
	}
}
