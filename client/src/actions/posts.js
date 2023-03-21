import {
	FETCH_ALL,
	CREATE,
	UPDATE,
	DELETE,
	FETCH_BY_SEARCH,
	START_LOADING,
	END_LOADING,
	FETCH_POST,
	COMMENT,
	FETCH_BY_CREATOR,
	UPDATE_ALERT,
} from "../constants/actionTypes";

import * as api from "../api/index.js";

export const getPosts = (page) => async (dispatch) => {
	try {
		dispatch({ type: START_LOADING });
		const { data } = await api.fetchPosts(page);
		dispatch({ type: END_LOADING });
		console.log(data);

		dispatch({ type: FETCH_ALL, payload: data });
	} catch (error) {
		dispatch({
			type: UPDATE_ALERT,
			payload: { open: true, severity: "error", message: error.response.data },
		});
	}
};

export const getPost = (id) => async (dispatch) => {
	try {
		dispatch({ type: START_LOADING });
		const { data } = await api.fetchPost(id);
		dispatch({ type: END_LOADING });
		console.log(data);

		dispatch({ type: FETCH_POST, payload: data });
	} catch (error) {
		dispatch({
			type: UPDATE_ALERT,
			payload: { open: true, severity: "error", message: error.response.data },
		});
	}
};

export const getPostsBySearch = (searchQuery) => async (dispatch) => {
	try {
		dispatch({ type: START_LOADING });
		const {
			data: { data },
		} = await api.fetchPostsBySearch(searchQuery);
		console.log(data);
		dispatch({ type: FETCH_BY_SEARCH, payload: data });
		dispatch({ type: END_LOADING });
	} catch (error) {
		console.log("Error message:", error.response.data);
		dispatch({
			type: UPDATE_ALERT,
			payload: { open: true, severity: "error", message: error.response.data },
		});
	}
};

export const getPostsByCreator = (name) => async (dispatch) => {
	try {
		dispatch({ type: START_LOADING });
		const {
			data: { data },
		} = await api.fetchPostsByCreator(name);
		console.log(data);

		dispatch({ type: FETCH_BY_CREATOR, payload: data });
		dispatch({ type: END_LOADING });
	} catch (error) {
		console.log("Error message:", error.response.data);
		dispatch({
			type: UPDATE_ALERT,
			payload: { open: true, severity: "error", message: error.response.data },
		});
	}
};
export const createPost = (post, navigate) => async (dispatch) => {
	try {
		dispatch({ type: START_LOADING });
		const { data } = await api.createPost(post);

		dispatch({ type: CREATE, payload: data });
		navigate(`/posts/${data._id}`);
		const message = { message: "A new post Has been Created!!!" };

		dispatch({
			type: UPDATE_ALERT,
			payload: { open: true, severity: "info", message: message },
		});
	} catch (error) {
		console.log("Error message:", error.response.data);
		dispatch({
			type: UPDATE_ALERT,
			payload: { open: true, severity: "error", message: error.response.data },
		});
	}
};
export const updatePost = (id, post) => async (dispatch) => {
	try {
		const { data } = await api.updatePost(id, post);
		const message = { message: "Data Updated" };
		dispatch({ type: UPDATE, payload: data });
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

export const commentPost = (value, id) => async (dispatch) => {
	try {
		const { data } = await api.comment(value, id);

		dispatch({ type: COMMENT, payload: data });

		return data.comments;
	} catch (error) {
		console.log("Error message:", error.response.data);
		dispatch({
			type: UPDATE_ALERT,
			payload: { open: true, severity: "error", message: error.response.data },
		});
	}
};

export const deletePost = (id) => async (dispatch) => {
	try {
		await api.deletePost(id);
		const message = { message: "The post has been deleted!!!" };

		dispatch({ type: DELETE, payload: id });
		dispatch({
			type: UPDATE_ALERT,
			payload: { open: true, severity: "info", message: message },
		});
	} catch (error) {
		console.log("Error message:", error.response.data);
		dispatch({
			type: UPDATE_ALERT,
			payload: { open: true, severity: "error", message: error.response.data },
		});
	}
};
