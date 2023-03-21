import {
	FETCH_ALL_USER,
	FETCH_USER,
	UPDATE_USER,
} from "../constants/actionTypes";

const userReducer = (state = { userData: [] }, action) => {
	switch (action.type) {
		case FETCH_ALL_USER:
			return {
				...state,
				userData: action.payload,
			};
		case FETCH_USER:
			return {
				...state,
				userData: action.payload,
			};
		// case UPDATE_USER:
		// 	return{
		// 		...state,
		// 		userData:action.payload,

		// 	}
		case UPDATE_USER:
			// localStorage.setItem("profile", JSON.stringify({ ...action?.payload }));
			return {
				...state,
				userData: state.userData.map((user) =>
					user._id === action.payload.id ? action.payload : user
				),
			};
		default:
			return state;
	}
};
export default userReducer;
