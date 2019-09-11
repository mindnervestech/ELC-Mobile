import {
	ORDER_VIEW_DATA_SUCCESS,
	ORDER_VIEW_DATA_FAILED,
	ORDER_VIEW_DATA_RESET,
	ORDER_JSON_DATA_SUCCESS,
	ORDER_JSON_DATA_FAILED,
	ORDER_JSON_DATA_RESET,
	ORDER_SUMMARY_DATA_SUCCESS,
	ORDER_SUMMARY_DATA_FAILED,
	ORDER_SUMMARY_DATA_RESET,
} from '../actions/OrderAction';

const initialState = {
	orderViewData: {},
	orderJsonData: {},
	orderSummaryData: {},
	status: false,
};

export default function (state = initialState, action) {
	switch (action.type) {
		case ORDER_VIEW_DATA_SUCCESS:
			return {
                ...state,
                status: action.type,
				orderViewData: action.payload,
			};
		case ORDER_VIEW_DATA_FAILED:
			return {
				...state,
				status: action.type,
				orderViewData: action.payload,
			};
		case ORDER_VIEW_DATA_RESET:
			return {
				...state,
				orderViewData: {},
				status: false,
			};
		case ORDER_JSON_DATA_SUCCESS:
			return {
				...state,
				status: action.type,
				orderJsonData: action.payload,
			};
		case ORDER_JSON_DATA_FAILED:
			return {
				...state,
				status: action.type,
				orderJsonData: action.payload,
			};
		case ORDER_JSON_DATA_RESET:
			return {
				...state,
				orderJsonData: {},
				status: false,
			};
		case ORDER_SUMMARY_DATA_SUCCESS:
			return {
				...state,
				status: action.type,
				orderSummaryData: action.payload,
			};
		case ORDER_SUMMARY_DATA_FAILED:
			return {
				...state,
				status: action.type,
				orderSummaryData: action.payload,
			};
		case ORDER_SUMMARY_DATA_RESET:
			return {
				...state,
				orderSummaryData: {},
				status: action.type,
			};
		default: return state;
	}
}
