import {
	PRODUCTLIST_DATA_SUCCESS,
	PRODUCTLIST_DATA_FAILED,
	PRODUCTLIST_DATA_RESET,

	PRODUCTDETAIL_DATA_SUCCESS,
	PRODUCTDETAIL_DATA_FAILED,
	PRODUCTDETAIL_DATA_RESET,

	SEARCH_PRODUCTLIST_DATA_SUCCESS,
	SEARCH_PRODUCTLIST_DATA_FAILED,
	SEARCH_PRODUCTLIST_DATA_RESET,

	CHANGE_SWIPER_INDEX,

	FILTER_PRODUCT_LIST
} from '../actions/ProductListAction';

const initialState = {
	productListData: {},
	status: false,
	productDetailData: {},
	swiperIndex: null,
	filterProductList: {},
};

export default function (state = initialState, action) {
	console.log(action);
	switch (action.type) {
		case PRODUCTLIST_DATA_SUCCESS:
			return {
				...state,
				productListData: action.payload.data,
				status: action.type,
			};
		case PRODUCTLIST_DATA_FAILED:
			return {
				...state,
				//productListData: action.payload,
				status: action.type,
			};
		case PRODUCTLIST_DATA_RESET:
			return {
				...state,
				//productListData: {},
				status: action.type,
			};

		case PRODUCTDETAIL_DATA_SUCCESS:
			return {
				...state,
				productDetailData: action.payload,
				status: action.type,
			};
		case PRODUCTDETAIL_DATA_FAILED:
			return {
				...state,
				status: action.payload,
				status: action.type,
			};
		case PRODUCTDETAIL_DATA_RESET:
			return {
				...state,
				productDetailData: {},
				status: action.type,
			};

		case SEARCH_PRODUCTLIST_DATA_SUCCESS:
			return {
				...state,
				productListData: action.payload.data,
				status: action.type,
			};
		case SEARCH_PRODUCTLIST_DATA_FAILED:
			return {
				...state,
				status: action.payload,
				status: action.type,
			};
		case SEARCH_PRODUCTLIST_DATA_RESET:
			return {
				...state,
				productListData: {},
				status: action.type,
			};
		case CHANGE_SWIPER_INDEX:
			return {
				...state,
				swiperIndex: action.payload,
				status: action.type,
			};
		case FILTER_PRODUCT_LIST:
			return {
				...state,
				filterProductList: action.payload,
				status: action.type,
			}
		default: return state;
	}
}
