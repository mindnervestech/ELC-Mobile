import {
	ORDER_HISTORY_SUCCESS,
	ORDER_HISTORY_FAILED,
	ORDER_HISTORY_RESET,
	WISH_LIST_SUCCESS,
	WISH_LIST_FAILED,
	WISH_LIST_RESET,
	ADDRESS_LIST_SUCCESS,
	ADDRESS_LIST_FAILED,
	ADDRESS_LIST_RESET,
	DELETE_ADDRESS_SUCCESS,
	DELETE_ADDRESS_FAILED,
	DELETE_ADDRESS_RESET,
	UPDATE_ADDRESS_SUCCESS,
	UPDATE_ADDRESS_FAILED,
	UPDATE_ADDRESS_RESET,
} from '../actions/ProfileAction';

const initialState = {
	orderHistoryData: {},
	status: false,
	productWishList: {},
	productWishListStatus: false,
	addressList: {},
	addressListStatus: false,
	deleteAddress: {},
	deleteAddressStatus: false,
	updateAddress: {},
	updateAddressStatus: false,
};

export default function (state = initialState, action) {
    
	switch (action.type) {
		case ORDER_HISTORY_SUCCESS:
			return {
				...state,
				status: action.type,
				orderHistoryData: action.payload,
			};
		case ORDER_HISTORY_FAILED:
			return {
				...state,
				status: action.type,
				orderHistoryData: action.payload,
			};
		case ORDER_HISTORY_RESET:
			return {
				...state,
				orderHistoryData: {},
				status: false,
			};
		case WISH_LIST_SUCCESS:
			return {
				...state,
				productWishListStatus: true,
				productWishList: action.payload,
			};
		case WISH_LIST_FAILED:
			return {
				...state,
				productWishList: action.payload,
				productWishListStatus: false,
			};
		case WISH_LIST_RESET:
			return {
				...state,
				productWishList: {},
				productWishListStatus: false,
			};
		case ADDRESS_LIST_SUCCESS:
			return {
				...state,
				addressListStatus: true,
				addressList: action.payload,
			};
		case ADDRESS_LIST_FAILED:
			return {
				...state,
				addressList: action.payload,
				addressListStatus: false,
			};
		case ADDRESS_LIST_RESET:
			return {
				...state,
				addressList: {},
				addressListStatus: false,
			};
		case DELETE_ADDRESS_SUCCESS:
			return {
				...state,
				deleteAddressStatus: true,
				deleteAddress: action.payload,
			};
		case DELETE_ADDRESS_FAILED:
			return {
				...state,
				deleteAddress: action.payload,
				deleteAddressStatus: false,
			};
		case DELETE_ADDRESS_RESET:
			return {
				...state,
				deleteAddress: {},
				deleteAddressStatus: false,
			};

		case UPDATE_ADDRESS_SUCCESS:
			return {
				...state,
				updateAddressStatus: true,
				updateAddress: action.payload,
			};
		case UPDATE_ADDRESS_FAILED:
			return {
				...state,
				updateAddress: action.payload,
				updateAddressStatus: false,
			};
		case UPDATE_ADDRESS_RESET:
			return {
				...state,
				updateAddress: {},
				updateAddressStatus: false,
			};
		default: return state;
	}
}