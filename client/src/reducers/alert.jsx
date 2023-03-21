import { UPDATE_ALERT } from "../constants/actionTypes";

const alertReducer = (state = { alert: [] }, action) => {
	switch (action.type) {
		case UPDATE_ALERT:
			return { ...state, alert: action.payload };

		default:
			return state;
	}
};
export default alertReducer;
