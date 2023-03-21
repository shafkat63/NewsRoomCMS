import React from "react";
import {
	Card,
	CardActions,
	CardContent,
	CardMedia,
	Button,
	Typography,
	ButtonBase,
} from "@material-ui/core/";
import DeleteIcon from "@material-ui/icons/Delete";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";
import moment from "moment";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { deletePost } from "../../../actions/posts";
import useStyles from "./styles";

const Post = ({ post, setCurrentId }) => {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const classes = useStyles();
	const user = JSON.parse(localStorage.getItem("profile"));
	const openPost = () => {
		navigate(`/posts/${post._id}`);
	};
	const confirmDelete = (id) => {
		const result = window.confirm(
			"Are you sure you want to delete this post??!!"
		);
		if (result) {
			dispatch(deletePost(post._id));
		}
	};
	return (
		<Card className={classes.card} raised elevation={6}>
			<ButtonBase className={classes.cardAction} onClick={openPost}>
				<CardMedia
					className={classes.media}
					image={
						post.selectedFile ||
						"https://user-images.githubusercontent.com/194400/49531010-48dad180-f8b1-11e8-8d89-1e61320e1d82.png"
					}
					title={post.title}
				/>
				

				<div className={classes.overlay}>
					<Typography variant="h6">{post.name}</Typography>
					<Typography variant="body2">
						{moment(post.createdAt).fromNow()}
					</Typography>
				</div>

				{(user?.result?.googleId === post?.creator ||
					user?.result?._id === post?.creator 
					||user?.result?.role === "editor"
					// ||user?.result?.role === "admin"
					) 
				
					&& (
					<div className={classes.overlay2} name="edit">
						<Button
							onClick={(e) => {
								e.stopPropagation();
								setCurrentId(post._id);
							}}
							style={{ color: "white" }}
							size="small"
						>
							<MoreHorizIcon fontSize="default" />
						</Button>
					</div>
				)}
				<div className={classes.details}>
					<Typography variant="body2" color="textSecondary" component="h2">
						{post.tags.map((tag) => `#${tag} `)}
					</Typography>
				</div>
				<Typography
					className={classes.title}
					gutterBottom
					variant="h5"
					component="h2"
				>
					{post.title}
				</Typography>
				<CardContent>
					<Typography variant="body2" color="textSecondary" component="p">
						{post.message.split(" ").splice(0, 20).join(" ")}...
					</Typography>
				</CardContent>
			</ButtonBase>

			<CardActions className={classes.cardActions}>
				<Typography
					// className={classes.details}
					gutterBottom
					// variant="h6"
					// component="h2"
					fontSize="2"
				>
					{post.factCheck}
				</Typography>

				{(user?.result?.googleId === post?.creator ||
					user?.result?._id === post?.creator 
					||
					user?.result?.role === "admin"
					
					) && (
					<Button
						size="small"
						color="secondary"
						onClick={() => confirmDelete(post.id)}
					>
						<DeleteIcon fontSize="small" /> Delete
					</Button>
					//dispatch(deletePost(post._id))
				)}
			</CardActions>
		</Card>
	);
};

export default Post;
