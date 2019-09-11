import {INVALID_AMOUNT_MAX_LENGTH, INVALID_ACCOUNT_NUMBER, INVALID_ACCOUNT_NUMBER_MAX_LENGTH, INVALID_ACCOUNT_NUMBER_SPECIAL_CHARACTERS } from '../../src/utils/Message';

class Validators {
	// static validEmail(email) {
	//   return /^([^\x00-\x20\x22\x28\x29\x2c\x2e\x3a-\x3c\x3e\x40\x5b-\x5d\x7f-\xff]+|\x22([^\x0d\x22\x5c\x80-\xff]|\x5c[\x00-\x7f])*\x22)(\x2e([^\x00-\x20\x22\x28\x29\x2c\x2e\x3a-\x3c\x3e\x40\x5b-\x5d\x7f-\xff]+|\x22([^\x0d\x22\x5c\x80-\xff]|\x5c[\x00-\x7f])*\x22))*\x40([^\x00-\x20\x22\x28\x29\x2c\x2e\x3a-\x3c\x3e\x40\x5b-\x5d\x7f-\xff]+|\x5b([^\x0d\x5b-\x5d\x80-\xff]|\x5c[\x00-\x7f])*\x5d)(\x2e([^\x00-\x20\x22\x28\x29\x2c\x2e\x3a-\x3c\x3e\x40\x5b-\x5d\x7f-\xff]+|\x5b([^\x0d\x5b-\x5d\x80-\xff]|\x5c[\x00-\x7f])*\x5d))*$/.test( email );
	// }

	static validEmail(email) {
		email = email.trim();
		var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
		return re.test(email);
	}

	static is10Digit(number) {
		var re = /^\d{10}$/;
		return re.test(number)
	}
	
	static is09Digit(number) {
		var re = /^\d{9}$/;
		return re.test(number)
	}

	//just checking length now.
	static validPassword(password) {
		if (password.length < 5) {
			return false;
		}
		return true;
	}
	static passwordPolicy(password) {
		let passRegex = /^(?=.*\d)(?=.*[a-zA-Z]).{8,20}$/;
		return passRegex.test(password);
	}

	static validPhoneNumber(number) {
		var re = /^(?:(?:\+?1\s*(?:[.-]\s*)?)?(?:\(\s*([2-9]1[02-9]|[2-9][02-8]1|[2-9][02-8][02-9])\s*\)|([2-9]1[02-9]|[2-9][02-8]1|[2-9][02-8][02-9]))\s*(?:[.-]\s*)?)?([2-9]1[02-9]|[2-9][02-9]1|[2-9][02-9]{2})\s*(?:[.-]\s*)?([0-9]{4})(?:\s*(?:#|x\.?|ext\.?|extension)\s*(\d+))?$/mg;
		if (!re.test(number)) {
			return false;
		}
		return true;
	}

	static validMobileNumber(number) {
		if (number.length < 9) {
			return false;
		}
		return true;
	}

	static isEmpty(name) {
		name = name + ''.trim();
		if (name && name !== '') {
			return false;
		}
		return true;
	}

	static isValidAmountLength(amount) {
		if (amount && amount.length > 9) {
			return {
				result: false,
				message: INVALID_AMOUNT_MAX_LENGTH
			};
		}
		return {
			result: true
		};
	}
	static isValidAccountNumber(accountNumber) {
		const regex = /^[a-z0-9]+$/i;
		if (accountNumber && accountNumber.length > 16) {
			return {
				result: false,
				message: INVALID_ACCOUNT_NUMBER_MAX_LENGTH
			};
		} else if (accountNumber.length < 16 && accountNumber.length > 0) {
			const isValid = regex.test(accountNumber);
			return {
				result: isValid,
				message: isValid ? '' : INVALID_ACCOUNT_NUMBER_SPECIAL_CHARACTERS
			};
		}
		return {
			result: true
		};
	}

	static isValidAmount(amountText) {
		const regex = /^\$?[0-9]?((\.[0-9]+)|([0-9]+(\.[0-9]+)?))$/g;
		return regex.test(amountText);
	}

	static isBlack(name) {
		if (name) {
			return false;
		}
		return true;
	}

	static isDigit(digit) {
		var re = /^\d+$/;
		return re.test(digit);
	}

	static atLeastCharacter(password) {
		password = password.trim();
		var re = /[A-z]+$/i;
		//var re = /[A-Za-z]+$/;
		//var re = /[A-Za-z]+$/;
		return re.test(password);
	}
}


export default Validators;
