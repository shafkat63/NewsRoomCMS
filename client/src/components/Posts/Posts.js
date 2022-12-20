import React from "react";
import { Grid, CircularProgress, Typography, Paper } from "@material-ui/core";
import { useSelector } from "react-redux";

import Post from "./Post/Post";
import useStyles from "./styles";
const user = JSON.parse(localStorage.getItem("profile"));

const Posts = ({ setCurrentId }) => {
	const { posts, isLoading } = useSelector((state) => state.posts);
	const classes = useStyles();
	if (!user?.result) {
		return (
			<Paper className={classes.paper}>
				<Typography variant="h6" align="center">
					A subapp for FactcheckBD...!
				</Typography>
			</Paper>
		);
	}

	if (!posts.length && !isLoading) return "No Posts";
	return isLoading ? (
		<CircularProgress />
	) : (
		<Grid
			className={classes.container}
			container
			alignItems="stretch"
			spacing={3}
		>
			{posts.map((post) => (
				<Grid key={post._id} item xs={12} sm={12} md={6} lg={3}>
					<Post post={post} setCurrentId={setCurrentId} />
				</Grid>
			))}
		</Grid>
	);
};

export default Posts;
