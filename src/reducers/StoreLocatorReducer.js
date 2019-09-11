import {
	STORE_LOCATOR_SUCCESS,
	STORE_LOCATOR_FAILED,
	STORE_LOCATOR_RESET,
} from '../actions/StoreLocatorAction';

const initialState = {
    storeLocatorData: {},
	status: false,
};

export default function (state = initialState, action) {
	switch (action.type) {
		case STORE_LOCATOR_SUCCESS:
			return {
				...state,
				status: true,
				storeLocatorData: action.payload.data,
			};
		case STORE_LOCATOR_FAILED:
			return {
				...state,
				status: false,
				storeLocatorData: action.payload.data,
			};
		case STORE_LOCATOR_RESET:
			return {
				...state,
				storeLocatorData: {},
				status: false,
			};
		default: 
		return state;
	}
	
}
