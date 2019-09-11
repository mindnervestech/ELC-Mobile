import {
	CONTACT_US_SUCCESS,
	CONTACT_US_FAILED,
	CONTACT_US_RESET,
} from '../actions/ContactUsAction';

const initialState = {
    contactUsData: {},
	status: false,
};

export default function (state = initialState, action) {
	switch (action.type) {
		case CONTACT_US_SUCCESS:
			return {
				...state,
				status: action.type,
				contactUsData: action.payload.message,
			};
		case CONTACT_US_FAILED:
			return {
				...state,
				status: action.type,
				contactUsData: action.payload.message,
			};
		case CONTACT_US_RESET:
			return {
				...state,
				contactUsData: {},
				status: action.type,
			};
		default: 
		return state;
	}
	
}
