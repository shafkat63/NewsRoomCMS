import React from "react";
import { useDispatch, useSelector } from "react-redux";
import FileBase from "react-file-base64";
import Navbar from "../Navbar/Navbar";
import { Avatar, Divider, Typography, Box, Button, Paper } from "@mui/material";
import { getUsers, updateStatus, updateStatusPP } from "../../actions/auth";
import { useState } from "react";
import { useEffect } from "react";
import useStyles from "./styles";
const About = () => {
	const [user, setUser] = useState(JSON.parse(localStorage.getItem("profile")));
	const dispatch = useDispatch();
	const { _id, role, active, imageUrl } = user?.result;
	const classes = useStyles();
	console.log(_id, role, active);
	console.log(user);
	const currentID = _id;
	console.log("Current ID", currentID);
	let googleId = user?.token;
	// googleId = googleId.length;
	console.log("Google Id ", googleId);
	const [userData, setUserData] = useState({ role, active, imageUrl });

	const handleSubmit = async (e) => {
		const result = dispatch(updateStatus(_id, userData));

		console.log(result);
	};

	useEffect(() => {
		const dataOfUser = dispatch(getUsers());
		console.log("dataofusers", dataOfUser);
	}, []);

	const oneUser2 = useSelector((state) =>
		currentID
			? state.users.userData.find((user1) => user1._id === currentID)
			: "null"
	);
	console.log("This is single data from user", oneUser2?.name);


	return (
		<div>
			<Navbar />{" "}
			<Paper style={{ padding: "20px", borderRadius: "20px" }} elevation={6}>
				<Typography variant="h3" component="h2" sx={{ textAlign: "center" }}>
					User Profile
				</Typography>
			</Paper>
			<Divider style={{ margin: "20px 0" }} />
			<Paper style={{ padding: "20px", borderRadius: "15px" }} elevation={6}>
				<div className={classes.card}>
					<div className={classes.section}>
						<Typography variant="h5" component="h5">
							Name:{" "}
							{googleId.length < 500 ? oneUser2?.name : user?.result?.name}
							{/* Name: {user?.result?.name} */}
						</Typography>

						<Typography gutterBottom variant="h6" component="p">
							ID:{" "}
							{googleId.length < 500 ? oneUser2?._id : user?.result?.googleId}
						</Typography>
						<Divider style={{ margin: "20px 0" }} />

						<Typography variant="h6">Email: {googleId.length < 500 ? oneUser2?.email : user?.result?.email}</Typography>

						<Divider style={{ margin: "20px 0" }} />
						<Typography variant="body1">Role: {oneUser2?.role}</Typography>
						<Divider style={{ margin: "20px 0" }} />
						<Typography variant="body1">Active: True.</Typography>
						<Divider style={{ margin: "20px 0" }} />
						{googleId.length < 500 && (
							<>
								<Typography variant="h4">Change Profile Picture:</Typography>

								<div>
									<form
										align="center"
										autoComplete="off"
										noValidate
										onSubmit={handleSubmit}
									>
										<div
											sx={{ alignItems: "center", justifyContent: "center" }}
										>
											<FileBase
												type="file"
												multiple={false}
												onDone={({ base64 }) => {
													setUserData({ ...userData, imageUrl: base64 });
												}}
											/>
										</div>
										<Button
											variant="contained"
											color="primary"
											size="large"
											type="submit"
										>
											Submit
										</Button>
									</form>
								</div>
							</>
						)}

						<Divider style={{ margin: "20px 0" }} />
					</div>

					{googleId.length < 500 ? (
						<div className={classes.imageSection}>
							<img
								className={classes.media}
								src={
									oneUser2?.imageUrl ||
									"https://user-images.githubusercontent.com/194400/49531010-48dad180-f8b1-11e8-8d89-1e61320e1d82.png"
								}
								alt={oneUser2?.name}
							/>
						</div>
					) : (
						<div className={classes.imageSection}>
							<img
								className={classes.media}
								src={
									user?.result?.imageUrl ||
									"https://user-images.githubusercontent.com/194400/49531010-48dad180-f8b1-11e8-8d89-1e61320e1d82.png"
								}
								alt={user?.result?.name}
							/>
						</div>
					)}
				</div>
			</Paper>{" "}
		</div>
	);
};

export default About;
