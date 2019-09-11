import {
    GET_DELIVERY_SUCCESS,
    GET_DELIVERY_FAILED,
    GET_DELIVERY_RESET,
    SET_DELIVERY_SUCCESS,
    SET_DELIVERY_FAILED,
    SET_DELIVERY_RESET,
    GET_PAYMENT_SUCCESS,
    GET_PAYMENT_FAILED,
    GET_PAYMENT_RESET,
    SET_PAYMENT_SUCCESS,
    SET_PAYMENT_FAILED,
    SET_PAYMENT_RESET,
    ORDER_CONFIRM_SUCCESS,
    ORDER_CONFIRM_FAILED,
    ORDER_CONFIRM_RESET,
    PLACE_ORDER_SUCCESS,
    PLACE_ORDER_FAILED,
    PLACE_ORDER_RESET,

    APPLY_VOUCHER_SUCCESS,
    APPLY_VOUCHER_FAILED,
    APPLY_VOUCHER_RESET,

    REMOVE_VOUCHER_SUCCESS,
    REMOVE_VOUCHER_FAILED,
    REMOVE_VOUCHER_RESET,

} from '../actions/CheckoutAction';

const initialState = {
    setDeliveryData: {},
    getDataForDelivery: {},
    paymentDataStatus: false,
    paymentData: {},
    status: false,
    paymentSetData: {},
    paymentSetStatus: false,
    orderConfirmStatus: false,
    orderConfirmData: {},
    dataForPlaceOrderStatus: false,
    dataForPlaceOrder: {},
    removeVoucherData: {},
    removeVoucherStatus: false,
    applyVoucherData: {},
    applyVoucherStatus: false,
};

export default function (state = initialState, action) {
    switch (action.type) {
        case GET_DELIVERY_SUCCESS:
            return {
                ...state,
                getDataForDeliverystatus: true,
                getDataForDelivery: action.payload,
            };
        case GET_DELIVERY_FAILED:
            return {
                ...state,
                getDataForDeliverystatus: false,
                getDataForDelivery: action.payload,
            };
        case GET_DELIVERY_RESET:
            return {
                ...state,
                getDataForDelivery: {},
                getDataForDeliverystatus: false,
            };
        case SET_DELIVERY_SUCCESS:
            return {
                ...state,
                setDeliveryDatastatus: 'SET_DELIVERY_SUCCESS',
                setDeliveryData: action.payload,
            };
        case SET_DELIVERY_FAILED:
            return {
                ...state,
                setDeliveryDatastatus: 'SET_DELIVERY_FAILED',
                setDeliveryData: action.payload,
            };
        case SET_DELIVERY_RESET:
            return {
                ...state,
                setDeliveryData: {},
                setDeliveryDatastatus: false,
            };
        case GET_PAYMENT_SUCCESS:
            return {
                ...state,
                paymentDataStatus: true,
                paymentData: action.payload,
            };
        case GET_PAYMENT_FAILED:
            return {
                ...state,
                paymentDataStatus: false,
                paymentData: action.payload,
            };
        case GET_PAYMENT_RESET:
            return {
                ...state,
                paymentData: {},
                paymentDataStatus: false,
            };
        case SET_PAYMENT_SUCCESS:
            return {
                ...state,
                paymentSetStatus: true,
                paymentSetData: action.payload,
            };
        case SET_PAYMENT_FAILED:
            return {
                ...state,
                paymentSetStatus: false,
                paymentSetData: action.payload,
            };
        case SET_PAYMENT_RESET:
            return {
                ...state,
                paymentSetData: {},
                paymentSetStatus: false,
            };
        case ORDER_CONFIRM_SUCCESS:
            return {
                ...state,
                orderConfirmStatus: true,
                orderConfirmData: action.payload,
            };
        case ORDER_CONFIRM_FAILED:
            return {
                ...state,
                orderConfirmStatus: false,
                orderConfirmData: action.payload,
            };
        case ORDER_CONFIRM_RESET:
            return {
                ...state,
                orderConfirmData: {},
                orderConfirmStatus: false,
            };
        case PLACE_ORDER_SUCCESS:
            return {
                ...state,
                dataForPlaceOrderStatus: 'PLACE_ORDER_SUCCESS',
                dataForPlaceOrder: action.payload,
            };
        case PLACE_ORDER_FAILED:
            return {
                ...state,
                dataForPlaceOrderStatus: 'PLACE_ORDER_FAILED',
                dataForPlaceOrder: action.payload,
            };
        case PLACE_ORDER_RESET:
            return {
                ...state,
                dataForPlaceOrderStatus: false,
                dataForPlaceOrder: {},
            };
        case APPLY_VOUCHER_SUCCESS:
            return {
                ...state,
                applyVoucherStatus: action.type,
                applyVoucherData: action.payload,
            };
        case APPLY_VOUCHER_FAILED:
            return {
                ...state,
                applyVoucherStatus: action.type,
                applyVoucherData: action.payload,
            };
        case APPLY_VOUCHER_RESET:
            return {
                ...state,
                applyVoucherStatus: action.type,
                applyVoucherData: {},
            };
        case REMOVE_VOUCHER_SUCCESS:
            return {
                ...state,
                removeVoucherStatus: action.type,
                removeVoucherData: action.payload,
            };
        case REMOVE_VOUCHER_FAILED:
            return {
                ...state,
                removeVoucherStatus: action.type,
                removeVoucherData: action.payload,
            };
        case REMOVE_VOUCHER_RESET:
            return {
                ...state,
                removeVoucherStatus: false,
                removeVoucherData: {},
            };
        default: return state;
    }
}



