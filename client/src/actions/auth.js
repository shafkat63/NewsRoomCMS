import {
	AUTH,
	START_LOADING,
	END_LOADING,
	FETCH_ALL_USER,
	FETCH_USER,
	UPDATE_USER,
	UPDATE_ALERT,
} from "../constants/actionTypes";
import * as api from "../api/index.js";



export const signin = (formData, navigate) => async (dispatch) => {
	try {
		const { data } = await api.signIn(formData);

		dispatch({ type: AUTH, data });
		dispatch({
			type: UPDATE_ALERT,
			payload: {
				open: true,
				severity: "success",
				message: "Testing update alert",
			},
		});

		navigate("/");
	} catch (error) {
		dispatch({
			type: UPDATE_ALERT,
			payload: { open: true, severity: "error", message: error.response.data },
		});
		// console.log("Error message:", error.response.data);
	}
};

export const signup = (formData, navigate) => async (dispatch) => {
	try {
		//Sign up the user
		const { data } = await api.signUp(formData);
		dispatch({ type: AUTH, data });

		navigate("/");
	} catch (error) {
		dispatch({
			type: UPDATE_ALERT,
			payload: { open: true, severity: "error", message: error.response.data },
		});
		console.log("Error message:", error.response.data);
	}
};

export const getUsers = (userData) => async (dispatch) => {
	try {
		dispatch({ type: START_LOADING });
		const { data } = await api.fetchUsers(userData);
		dispatch({ type: END_LOADING });
		console.log(data);
		dispatch({ type: FETCH_ALL_USER, payload: data });
	} catch (error) {
		dispatch({
			type: UPDATE_ALERT,
			payload: { open: true, severity: "error", message: error.response.data },
		});
		console.log("Error message:", error.response.data);
	}
};

export const getUser = (id) => async (dispatch) => {
	try {
		dispatch({ type: START_LOADING });
		const { data } = await api.fetchUser(id);
		dispatch({ type: END_LOADING });
		console.log(data);
		dispatch({ type: FETCH_USER, payload: data });
	} catch (error) {
		dispatch({
			type: UPDATE_ALERT,
			payload: { open: true, severity: "error", message: error.response.data },
		});
		console.log("Error message:", error.response.data);
	}
};

export const updateStatus = (id, userdata) => async (dispatch) => {
	try {
		const { data } = await api.updateFields(id, userdata);
		dispatch({ type: UPDATE_USER, payload: data });
		const message = { message: "Data Updated" };	
		dispatch({
			type: UPDATE_ALERT,
			payload: { open: true, severity: "success", message: message },
		});
	} catch (error) {
		dispatch({
			type: UPDATE_ALERT,
			payload: { open: true, severity: "error", message: error.response.data },
		});
		console.log("Error message:", error.response.data);
	}
};

