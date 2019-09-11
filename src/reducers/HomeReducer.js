import {
	HOME_DATA_SUCCESS,
	HOME_DATA_FAILED,
	HOME_DATA_RESET,
	HOME_DATA_OFFER_SUCCESS,
	HOME_DATA_OFFER_FAILED,
	HOME_DATA_OFFER_RESET,
} from '../actions/HomeAction';

const initialState = {
	homeData: {},
	homeOfferData: {},
	status: false,
};

export default function (state = initialState, action) {
	switch (action.type) {
		case HOME_DATA_SUCCESS:
			return {
				...state,
				status: true,
				homeData: action.payload,
			};
		case HOME_DATA_FAILED:
			return {
				...state,
				status: false,
				homeData: action.payload,
			};
		case HOME_DATA_RESET:
			return {
				...state,
				homeData: {},
				status: false,
			};
			case HOME_DATA_OFFER_SUCCESS:
			return {
				...state,
				status: true,
				homeOfferData: action.payload,
			};
		case HOME_DATA_OFFER_FAILED:
			return {
				...state,
				status: false,
				homeOfferData: action.payload,
			};
		case HOME_DATA_OFFER_RESET:
			return {
				...state,
				homeOfferData: {},
				status: false,
			};
		default: return state;
	}
}
