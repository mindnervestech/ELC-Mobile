/**
 * @author Systango Technologies Pvt Ltd
 * Date: August 28, 2017
 *
 * ROOT REDUCER !
 *
 */

import { combineReducers } from 'redux';
import HomeReducer from './HomeReducer';
import SignInReducer from './SignInReducer';
import SignUpReducer from './SignUpReducer';
import ProductReducer from './ProductReducer';
import ForgotPassReducer from './ForgotPassReducer';
import ProductListReducer from './ProductListReducer';
import ContactUsReducer from './ContactUsReducer';
import HelpCenterReducer from './HelpCenterReducer';
import AmiraSignUpReducer from './AmiraSignUpReducer';
import CommonReducer from './commonReducer'
import StoreLocatorReducer from './StoreLocatorReducer'
import ProfileReducer from './ProfileReducer';
import OrderReducer from './OrderReducer';
import CartReducer from './CartReducer';
import CheckoutReducer from './CheckoutReducer';


export default combineReducers({
	HomeReducer,
	SignInReducer,
	SignUpReducer,
	ProductReducer,
	ForgotPassReducer,
	ProductListReducer,
	ContactUsReducer,
	HelpCenterReducer,
	AmiraSignUpReducer,
	CommonReducer,
	StoreLocatorReducer,
	ProfileReducer,
	OrderReducer,
	CartReducer,
	CheckoutReducer
});
