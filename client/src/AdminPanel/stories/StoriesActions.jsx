import React, { useEffect, useState } from "react";
import { Box, CircularProgress, Fab } from "@mui/material";
import { Check, Save } from "@mui/icons-material";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { green } from "@mui/material/colors";
import { updatePost } from "../../actions/posts";
const StoriesActions = ({ params, rowId, setRowId }) => {
	const [loading, setLoading] = useState(false);
	const [success, setSuccess] = useState(false);

	// const navigate = useNavigate();
	const dispatch = useDispatch();

	const handleSubmit = () => {
		setLoading(true);
		const {
			name,
			title,
			message,
			creator,
			storyStatus,
			selectedFile,
			factCheck,
			_id,
			comments,
			tags,
		} = params.row;

		// let { tags } = params?.row;
		// tags = tags.split(",");
		console.log(message, factCheck, tags, storyStatus, _id);

		const result = dispatch(
			updatePost(_id, {
				tags,
				name,
				title,
				message,
				creator,
				storyStatus,
				selectedFile,
				factCheck,
				comments,
			})
		);
		console.log(result);
		if (result) {
			setSuccess(true);
			setRowId(null);
		}
		setLoading(false);
	};
	useEffect(() => {
		if (rowId === params.id && success) setSuccess(false);
	}, [rowId]);

	// const openPost = (id) => {
	// 	navigate(`/posts/${id}`);
	// };
	// const deleteMessage = (id) => {
	// 	dispatch(deletePost(id));
	// };
	return (
		<Box
			sx={{
				m: 1,
				position: "relative",
			}}
		>
			{success ? (
				<Fab
					color="primary"
					sx={{
						width: 40,
						height: 40,
						bgcolor: green[500],
						"&:hover": { bgcolor: green[700] },
					}}
				>
					<Check />
				</Fab>
			) : (
				<Fab
					color="primary"
					sx={{
						width: 40,
						height: 40,
					}}
					disabled={params.id !== rowId || loading}
					onClick={handleSubmit}
				>
					<Save />
				</Fab>
			)}
			{loading && (
				<CircularProgress
					size={52}
					sx={{
						color: green[500],
						position: "absolute",
						top: -6,
						left: -6,
						zIndex: 1,
					}}
				/>
			)}

			{/* <Tooltip title="View Stories ">
				<IconButton onClick={openPost(params.row._id)}>
					<Preview />
				</IconButton>
			</Tooltip>
			<Tooltip title="Edit This Stories">
				<IconButton onClick={() => {}}>
					<Edit />
				</IconButton>
			</Tooltip>
			<Tooltip title="Delete this Storie">
				<IconButton
					// onClick={deleteMessage(params.row._id)}

					onClick={() => dispatch(deletePost(params.row._id))}
				>
					<Delete />
				</IconButton>
			</Tooltip> */}
		</Box>
	);
};

export default StoriesActions;
