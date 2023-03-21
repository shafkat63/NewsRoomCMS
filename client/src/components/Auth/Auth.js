import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import {
	Avatar,
	Button,
	Paper,
	Grid,
	Typography,
	Container,
} from "@material-ui/core";

import { GoogleLogin } from "react-google-login";
import LockOutlineIcon from "@material-ui/icons/LockOutlined";

import Icon from "./icon";
import { signin, signup } from "../../actions/auth";
import { AUTH } from "../../constants/actionTypes";
import useStyles from "./styles";
import Input from "./Input";
import { gapi } from "gapi-script";
import FileBase from "react-file-base64";

const initialState = {
	firstName: "",
	lastName: "",
	email: "",
	password: "",
	confirmPassword: "",
	imageUrl: "",
};

const Auth = () => {
	const [formData, setFormData] = useState(initialState);
	const [isSignUp, setIsSignup] = useState(false);
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const classes = useStyles();
	const clientId =
		"1045718220222-q4d63ck6cbhlfuv8brremuuk9o8p6fem.apps.googleusercontent.com";

	gapi.load("client:auth2", () => {
		gapi.auth2.init({ clientId: clientId });
	});

	const [showPassword, setShowPassword] = useState(false);

	const handleShowPassword = () =>
		setShowPassword((prevShowPassword) => !prevShowPassword);
	const switchMode = () => {
		setIsSignup((prevIsSignUp) => !prevIsSignUp);
		setShowPassword(false);
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		// console.log(formData);
		if (isSignUp) {
			dispatch(signup(formData, navigate));
		} else {
			dispatch(signin(formData, navigate));
		}
	};
	const handleChange = (e) => {
		setFormData({ ...formData, [e.target.name]: e.target.value });
	};

	const googleSuccess = async (res) => {
		const result = res?.profileObj;
		const token = res?.tokenId;
		console.log(token);
		try {
			dispatch({ type: AUTH, data: { result, token } });
			navigate("/");
		} catch (error) {
			console.log(error);
		}
	};

	const googleFailure = (error) => {
		console.log(error);
		console.log("Google Sign In was unsuccessful. Try Again Later");
	};

	return (
		<Container component="main" maxWidth="xs">
			<Paper className={classes.paper} elevation={3}>
				<Avatar className={classes.avatar}>
					<LockOutlineIcon />
				</Avatar>
				<Typography variant="h5">{isSignUp ? "Sign Up" : "Sign In"}</Typography>
				<form className={classes.form} onSubmit={handleSubmit}>
					<Grid container spacing={2}>
						{isSignUp && (
							<>
								<Input
									name="firstName"
									label="First Name"
									handleChange={handleChange}
									autoFocus
									half
								/>
								<Input
									name="lastName"
									label="Last Name"
									handleChange={handleChange}
									half
								/>
							</>
						)}
						<Input
							name="email"
							label="Email Address"
							handleChange={handleChange}
							type="email"
						/>
						<Input
							name="password"
							label="Password"
							handleChange={handleChange}
							type={showPassword ? "text" : "password"}
							handleShowPassword={handleShowPassword}
						/>
						{isSignUp && (
							<>
								<Input
									name="confirmPassword"
									label=" Repeat Password"
									handleChange={handleChange}
									type="password"
									// handleShowPassword={handleShowPassword}
								/>
								<FileBase
									name="imageUrl"
									// label=" photoURL"
									handleChange={handleChange}
									type="file"
									onDone={({ base64 }) =>
										setFormData({ ...formData, imageUrl: base64 })
									}
									// handleShowPassword={handleShowPassword}
								/>
							</>
						)}
					</Grid>

					<Button
						type="submit"
						fullWidth
						variant="contained"
						color="primary"
						className={classes.submit}
					>
						{isSignUp ? "Sign Up" : "Sign In"}
					</Button>

					<GoogleLogin
						render={(renderProps) => (
							<Button
								className={classes.googleButton}
								color="primary"
								fullWidth
								onClick={renderProps.onClick}
								disabled={renderProps.disabled}
								startIcon={<Icon />}
								variant="contained"
							>
								Google Sign In
							</Button>
						)}
						onSuccess={googleSuccess}
						onFailure={googleFailure}
						cookiePolicy="single_host_origin"
					/>

					<Grid container justify-content="flex end">
						<Grid item>
							<Button onClick={switchMode}>
								{isSignUp
									? "Already have an Account? Sign In"
									: "Don't have an account? Sign Up"}
							</Button>
						</Grid>
					</Grid>
				</form>
			</Paper>
		</Container>
	);
};

export default Auth;
