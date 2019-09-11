import {
	PRODUCT_LIST_SUCCESS,
	PRODUCT_LIST_FAILED,
	PRODUCT_LIST_RESET,
} from '../actions/ProductAction';

const initialState = {
	productMenuList: {},
	productMenuStatus: false,
};

export default function (state = initialState, action) {
	switch (action.type) {
		case PRODUCT_LIST_SUCCESS:
			return {
				...state,
				productMenuStatus: action.type,
				productMenuList: action.payload,
			};
		case PRODUCT_LIST_FAILED:
			return {
				...state,
				productMenuList: action.payload,
				productMenuStatus: action.type,
			};
		case PRODUCT_LIST_RESET:
			return {
				...state,
				productMenuList: {},
				productMenuStatus: action.type,
			};
		default: return state;
	}
}
