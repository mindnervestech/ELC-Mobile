import {
	AMIRA_SIGN_IN_DATA_SUCCESS,
    AMIRA_SIGN_IN_DATA_FAILED,
    AMIRA_SIGN_UP_DATA_RESET
} from '../actions/AmiraSignUpAction';

const initialState = {
	signUpData: {},
	status: false,
};

export default function (state = initialState, action) {
	switch (action.type) {
		case AMIRA_SIGN_IN_DATA_SUCCESS:
			return {
                ...state,
                status: action.type,
				signInData: action.payload,
			};
		case AMIRA_SIGN_IN_DATA_FAILED:
			return {
				...state,
				status: action.type,
				signInData: action.payload,
			};
		case AMIRA_SIGN_UP_DATA_RESET:
			return {
				...state,
				signInData: {},
				status: action.type,
			};
		default: return state;
	}
}
