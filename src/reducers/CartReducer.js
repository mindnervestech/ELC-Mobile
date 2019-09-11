import {
	CART_DATA_SUCCESS,
	CART_DATA_FAILED,
	CART_DATA_RESET,
	UPDATE_CART_DATA_SUCCESS,
	UPDATE_CART_DATA_FAILED,
	UPDATE_CART_DATA_RESET,
	DELETE_CART_DATA_SUCCESS,
	DELETE_CART_DATA_FAILED,
	DELETE_CART_DATA_RESET,
	ADD_TO_CART_DATA_SUCCESS,
	ADD_TO_CART_DATA_FAILED,
	ADD_TO_CART_DATA_RESET,
	GUEST_USER_SUCCESS,
	GUEST_USER_FAILED,
	GUEST_USER_RESET,
	GUEST_USER_ADD_TO_CART_DATA_SUCCESS,
	GUEST_USER_ADD_TO_CART_DATA_FAILED,
	GUEST_USER_ADD_TO_CART_DATA_RESET,
	REMOVE_OUT_STOCK_CART_DATA_SUCCESS,
	REMOVE_OUT_STOCK_CART_DATA_FAILED,
	REMOVE_OUT_STOCK_CART_DATA_RESET,
} from '../actions/CartAction';

const initialState = {
	cartData: {},
	updatedCartData: {},
	deleteItemCartData: {},
	addToCartData: {},
	status: false,
	guestUsrData: '',
	guestUsrCartData: {},
	removeOutOfStockItem: {},
};

export default function (state = initialState, action) {
	switch (action.type) {
		case CART_DATA_SUCCESS:
			return {
				...state,
				status: action.type,
				cartData: action.payload,
			};
		case CART_DATA_FAILED:
			return {
				...state,
				status: action.type,
				cartData: action.payload,
			};
		case CART_DATA_RESET:
			return {
				...state,
				cartData: {},
				status: false,
			};
		case UPDATE_CART_DATA_SUCCESS:
			return {
				...state,
				status: action.type,
				updatedCartData: action.payload,
			};
		case UPDATE_CART_DATA_FAILED:
			return {
				...state,
				status: action.type,
				updatedCartData: action.payload,
			};
		case UPDATE_CART_DATA_RESET:
			return {
				...state,
				updatedCartData: {},
				status: false,
			};
		case DELETE_CART_DATA_SUCCESS:
			return {
				...state,
				status: action.type,
				deleteItemCartData: action.payload,
			};
		case DELETE_CART_DATA_FAILED:
			return {
				...state,
				status: action.type,
				deleteItemCartData: action.payload,
			};
		case DELETE_CART_DATA_RESET:
			return {
				...state,
				deleteItemCartData: {},
				status: false,
			};
		case ADD_TO_CART_DATA_SUCCESS:
			return {
				...state,
				status: action.type,
				addToCartData: action.payload,
			};
		case ADD_TO_CART_DATA_FAILED:
			return {
				...state,
				status: action.type,
				addToCartData: action.payload,
			};
		case ADD_TO_CART_DATA_RESET:
			return {
				...state,
				addToCartData: {},
				status: false,
			};
		case GUEST_USER_SUCCESS:
			return {
				...state,
				status: action.type,
				guestUsrData: action.payload,
			};
		case GUEST_USER_FAILED:
			return {
				...state,
				status: action.type,
				guestUsrData: action.payload,
			};
		case GUEST_USER_RESET:
			return {
				...state,
				guestUsrData: {},
				status: false,
			};
		case GUEST_USER_ADD_TO_CART_DATA_SUCCESS:
			return {
				...state,
				status: action.type,
				guestUsrCartData: action.payload,
			};
		case GUEST_USER_ADD_TO_CART_DATA_FAILED:
			return {
				...state,
				status: action.type,
				guestUsrCartData: action.payload,
			};
		case GUEST_USER_ADD_TO_CART_DATA_RESET:
			return {
				...state,
				guestUsrCartData: {},
				status: false,
			};
		case REMOVE_OUT_STOCK_CART_DATA_SUCCESS:
			return {
				...state,
				status: action.type,
				removeOutOfStockItem: action.payload,
			};
		case REMOVE_OUT_STOCK_CART_DATA_FAILED:
			return {
				...state,
				status: action.type,
				removeOutOfStockItem: action.payload,
			};
		case REMOVE_OUT_STOCK_CART_DATA_RESET:
			return {
				...state,
				removeOutOfStockItem: {},
				status: false,
			};
		default: return state;
	}
}
