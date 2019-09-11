import {
	NO_NETWORK,
	NETWORK_COME,
	
	ALL_COUNTRY_LANGUAGES_DATA_SUCCESS,
	ALL_COUNTRY_LANGUAGES_DATA_FAILED,
	ALL_COUNTRY_LANGUAGES_DATA_RESET,

	COUNTRY_CHANGE,

	ADD_WISH_LIST_DATA_SUCCESS,
 	ADD_WISH_LIST_DATA_FAILED,
	ADD_WISH_LIST_DATA_RESET,

	REMOVE_WISH_LIST_DATA_SUCCESS,
	REMOVE_WISH_LIST_DATA_FAILED,
	REMOVE_WISH_LIST_DATA_RESET,

	ALL_COUNTRY_SUCCESS,
	ALL_COUNTRY_FAILED,
	ALL_COUNTRY_RESET,
} from '../actions/CommonAction';



const initialState = {
	isNetworkAvailable: true,
	countryAndLangData:{},
	status: false,
	countryStatus: false,
	allCountryAndLangData: {},
	currentCountryData: {},
	addToWishListData: {},
	removeToWishListData:{},
	addTOWishListStatus: false,
	removeTOWishListStatus: false,
	allCountryStatus: false,
	allCountryData: {},
};

export default function (state = initialState, action) {
	switch (action.type) {
		case NETWORK_COME:
			return {
				...state,
				isNetworkAvailable: true,
			};
		case NO_NETWORK:
			return {
				...state,
				isNetworkAvailable: false,
			};
		case ALL_COUNTRY_LANGUAGES_DATA_SUCCESS:
			return {
				...state,
				status: true,
				allCountryAndLangData: action.payload,
			};
		case ALL_COUNTRY_LANGUAGES_DATA_FAILED:
			return {
				...state,
				status: false,
				allCountryAndLangData: action.payload,
			};
		case ALL_COUNTRY_LANGUAGES_DATA_RESET:
			return {
				...state,
				allCountryAndLangData: {},
				status: false,
			};
		case ADD_WISH_LIST_DATA_SUCCESS:
			return {
				...state,
				addTOWishListStatus: true,
				addToWishListData: action.payload,
			};
		case ADD_WISH_LIST_DATA_FAILED:
			return {
				...state,
				addTOWishListStatus: false,
				addToWishListData: action.payload,
			};
		case ADD_WISH_LIST_DATA_RESET:
			return {
				...state,
				addToWishListData: {},
				addTOWishListStatus: false,
			};
		case COUNTRY_CHANGE:
			return {
				...state,
				countryStatus: true,
				currentCountryData: action.payload,
			};

		case REMOVE_WISH_LIST_DATA_SUCCESS:
			return {
				...state,
				removeTOWishListStatus: true,
				removeToWishListData: action.payload,
			};
		case REMOVE_WISH_LIST_DATA_FAILED:
			return {
				...state,
				removeTOWishListStatus: false,
				removeToWishListData: action.payload,
			};
		case REMOVE_WISH_LIST_DATA_RESET:
			return {
				...state,
				removeToWishListData: {},
				removeTOWishListStatus: false,
			};
		case ALL_COUNTRY_SUCCESS:
			return {
				...state,
				allCountryStatus: true,
				allCountryData: action.payload,
			};
		case ALL_COUNTRY_FAILED:
			return {
				...state,
				allCountryStatus: false,
				allCountryData: action.payload,
			};
		case ALL_COUNTRY_RESET:
			return {
				...state,
				allCountryData: {},
				allCountryStatus: false,
			};
		default: return state;
	}
}