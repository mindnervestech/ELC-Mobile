import I18n from '../localization/index';


//Alert Headers
export const NETWORK_ERROR_HEADER = 'Network Error';
export const ERROR = 'Error'


//Nayomi Error Messages
export const ALL_FIELD_REQ = 'All fields are required'
export const FIRST_NAME_REQ = 'First name is required'
export const LAST_NAME_REQ = 'Last name is required'
export const EMAIL_REQ = 'Email is required'
export const MOBILE_REQ = 'Mobile number is required'
export const MOBILE_CONTAIN_NUMBER = 'Mobile number contain only numbers'
export const PASS_REQ = 'Password is required'
export const CONFIRM_PASS_REQ = 'Confirm password is required'
export const PASS_MATCH = 'Password do not match'
export const NICK_NAME_REQ = 'Nick name is required'
export const YOUR_NAME_REQ = 'Your name is required'

export const INVALID_EMAIL_ID = 'Please provide a valid Email id';

export const CHARACTER_LIMIT_FIRSTNAME = 'First name should be less than 30 characters'
export const CHARACTER_LIMIT_LASTNAME = 'Last name should be less than 30 characters'

export const PASSWORD_MAX_LENGTH_EXCEEDED = 'Password should be between 8-20 characters'
export const AT_LEAST_ONE_ALPHABET = 'Password Should Contain At Least One Letter';
export const PASSWORD_CONFIRM_PASSWORD_MISMATCH = 'Passwords do not match'
export const NO_SPACE_ALLOWED_TEXT = 'Password should not contain any spaces';
export const HELP_TEXT = 'Password should be between 8-20 characters containing both numbers and letters.';
export const MOBILE_10DIGIT = 'Mobile Number Should be 10 Digits';
export const MOBILE_09DIGIT = 'Mobile Number Should be 9 Digits'
export const PASSWORD_CONFIRM_MISMATCH = 'Passoword do not match';
export const SPACE_NOT_ALLOWED = 'Space Not Allowed'


export const NO_SPACE_ALLOWED_USERNAME = 'Username should not contain any spaces';
export const USERNAME_NAME_REQ = 'Username is required';

export const COMMENT_REQ = 'Comment Required';

export const LOGIN_FAILED = 'Login Failed';
export const LOGIN_FAILED_MESSAGE = "Login failed due to an internal issue. Do you want to report this issue?";
export const NETWORK_ERROR = 'Looks like you don’t have internet connectivity';

export const NO_FAQ_SEARCH_HEADER = 'No data found'
export const NO_FAQ_SEARCH_ERROR1 = 'Sorry, We couldn’t find any result Matching with  '
export const NO_FAQ_SEARCH_ERROR2 = ' . You can submit your Question and Our Customer Service Team will contact you soon.!!'

export const NO_DATA_AVAILABLE = 'Sorry.. No Data Available';

export const ENGLISH = 'en';
export const ARABIC = 'ar';

export const ADD_REQUIRED = 'Address is Required'
export const GCC_ERROR = 'Click and Collect not available for International Delivery'
export const CC_AND_CD = 'Cash on delivery cannot be selected for click and collect.'
export const HD_AND_CD = 'Cash on delivery is not available for International Delivery'
export const COUNTRY_REQUIRED = 'Please Select Country'
export const STARE_REQUIRED = 'Please Select State/City'

export const VOUCHER_CODE = 'Please Enter Vocher Code First'
export const EXCEEDED_CART1 = 'This product has a maximum orderable quantity of '
export const EXCEEDED_CART2 = ' Please update your selected quantity to be within this limit.To order quantity more than '
export const EXCEEDED_CART3 = ' please contact us.'
export const EXCEEDED_QTY = 'Order Quantity Exceeded'
export const POSTAL_CODE_REQUIRED = 'Please Enter Zipcode'

export const SELECT_MANADATORY = I18n.locale == 'ar' ? ' يرجى اختيار الحقول الالزامية لاضافة المنتج الى الحقيبة ' : 'Please Select the Mandatory Fields to add item to your bag.'
export const WARNING = I18n.locale == 'ar' ? 'حسنا' : 'Error'
export const SELECT_SIZE = 'Please Select Band Size'
export const OUT_OF_STOCK = I18n.locale == 'ar' ? 'المخزون غير متوفر لبعض من المنتجات، يرجى إضافتها إلى قائمة المفضلة أو إزالتها لمتابعة عملية الشراء!' : 'Few items are out of stock, Please add them to wishlist or remove to proceed further!!'
export const ABOVE_2500 = I18n.locale == 'ar' ? 'للأسف ، لا يتوفر الدفع عند الاستلام  لطلبيات أكبر من.' : 'Cash on Delivery is unfortunately not available on orders larger than'