import React from "react";
import { Alert, Snackbar } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { UPDATE_ALERT } from "../../constants/actionTypes";

const Notification = () => {
	const dispatch = useDispatch();
	const { alert } = useSelector((state) => state.alert);

	const handleClose = (event, reason) => {
		if (reason === "clickaway") return;
		dispatch({ type: UPDATE_ALERT, payload: { ...alert, open: false } });
	};
	return (
		<Snackbar
			open={alert?.open}
			autoHideDuration={6000}
			onClose={handleClose}
			anchorOrigin={{ vertical: "top", horizontal: "center" }}
		>
			<Alert
				onClose={handleClose}
				severity={alert?.severity}
				sx={{ width: "100%" }}
				variant="filled"
				elevation={6}
			>
				{alert?.message?.message}
			</Alert>
		</Snackbar>
	);
};

export default Notification;
