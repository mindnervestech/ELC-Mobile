import {
	FAQ_SUCCESS,
	FAQ_FAILED,
	FAQ_RESET,
	ABOUTUS_SUCCESS,
	ABOUTUS_FAILED,
	ABOUTUS_RESET,
	DELIVERY_POLICY_SUCCESS,
	DELIVERY_POLICY_FAILED,
	DELIVERY_POLICY_RESET,
	EXCHANGE_RETURN_SUCCESS,
	EXCHANGE_RETURN_FAILED,
	EXCHANGE_RETURN_RESET,
	PRIVACY_POLICY_SUCCESS,
	PRIVACY_POLICY_FAILED,
	PRIVACY_POLICY_RESET,
	TERMS_CONDITIONS_SUCCESS,
	TERMS_CONDITIONS_FAILED,
	TERMS_CONDITIONS_RESET,
	PAYMENT_METHODS_SUCCESS,
	PAYMENT_METHODS_FAILED,
	PAYMENT_METHODS_RESET,
	SIZE_GUIDE_SUCCESS,
	SIZE_GUIDE_FAILED,
	SIZE_GUIDE_RESET
} from '../actions/HelpCenterAction';

const initialState = {
	fagData: {},
	aboutUsData: {},
	deliveryPolicyData: {},
	returnExchangeData: {},
	privacyPolicyData: {},
	termsConditionsData: {},
	paymentMehodsData: {},
	sizeGuideData: {},
	status: false,
};

export default function (state = initialState, action) {
	switch (action.type) {
		case FAQ_SUCCESS:
			return {
				...state,
				fagData: action.payload,
				status: true
			};
		case FAQ_FAILED:
			return {
				...state,
				status: false
			};
		case FAQ_RESET:
			return {
				...state,
				status: false,
			};
		case DELIVERY_POLICY_SUCCESS:
			return {
				...state,
				deliveryPolicyData: action.payload,
				status: true
			};
		case DELIVERY_POLICY_FAILED:
			return {
				...state,
				status: false

			};
		case DELIVERY_POLICY_RESET:
			return {
				...state,
				status: false,
			};
		case EXCHANGE_RETURN_SUCCESS:
			return {
				...state,
				returnExchangeData: action.payload,
				status: action.type
			};
		case EXCHANGE_RETURN_FAILED:
			return {
				...state,
				status: action.type

			};
		case EXCHANGE_RETURN_RESET:
			return {
				...state,
				status: false,
			};
		case PRIVACY_POLICY_SUCCESS:
			return {
				...state,
				privacyPolicyData: action.payload,
				status: action.type
			};
		case PRIVACY_POLICY_FAILED:
			return {
				...state,
				status: action.type

			};
		case PRIVACY_POLICY_RESET:
			return {
				...state,
				status: false,
			};
		case TERMS_CONDITIONS_SUCCESS:
			return {
				...state,
				termsConditionsData: action.payload,
				status: action.type
			};
		case TERMS_CONDITIONS_FAILED:
			return {
				...state,
				status: action.type

			};
		case TERMS_CONDITIONS_RESET:
			return {
				...state,
				status: false,
			};
		case ABOUTUS_SUCCESS:
			return {
				...state,
				aboutUsData: action.payload,
				status: true
			};
		case ABOUTUS_FAILED:
			return {
				...state,
				status: false

			};
		case ABOUTUS_RESET:
			return {
				...state,
				status: false,
			};
		case PAYMENT_METHODS_SUCCESS:
			return {
				...state,
				paymentMehodsData: action.payload,
				status: true
			};
		case PAYMENT_METHODS_FAILED:
			return {
				...state,
				status: false
			};
		case PAYMENT_METHODS_RESET:
			return {
				...state,
				status: false,
			};
		case SIZE_GUIDE_SUCCESS:
			return {
				...state,
				sizeGuideData: action.payload.data,
				status: true
			};
		case SIZE_GUIDE_FAILED:
			return {
				...state,
				status: false
			};
		case SIZE_GUIDE_RESET:
			return {
				...state,
				status: false,
			};
		default: return state;
	}
}
