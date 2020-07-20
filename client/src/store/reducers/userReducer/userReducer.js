import {
	LOGIN_USER,
	REGISTER_USER,
	AUTH_USER,
	LOGOUT_USER,
	ADD_TO_CART,
} from '../../actions/types';

export default function (state = {}, action) {
	switch (action.type) {
		case LOGIN_USER:
			return { ...state, loginSuccess: action.payload };
			break;
		case REGISTER_USER:
			return { ...state, register: action.payload };
			break;
		case AUTH_USER:
			return { ...state, userData: action.payload };
			break;
		case LOGOUT_USER:
			return { ...state, logoutSuccess: action.payload };
		case ADD_TO_CART:
			return {
				...state,
				userData: {
					...state.userData,
					cart: action.payload,
				},
			};
			break;
		default:
			return state;
	}
}
