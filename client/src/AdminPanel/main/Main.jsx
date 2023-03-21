import { Group, MapsHomeWork } from "@mui/icons-material";
import { Box, List, ListItem, Paper, Typography } from "@mui/material";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { getPosts } from "../../actions/posts";
import { getUsers } from "../../actions/auth";
import { useDispatch } from "react-redux";
import {
	Avatar,
	Divider,
	ListItemAvatar,
	ListItemText,
} from "@material-ui/core";
import moment from "moment";

const Main = ({ setSelectedLink, link }) => {
	const { userData } = useSelector((state) => state.users);
	const { posts } = useSelector((state) => state.posts);

	const dispatch = useDispatch();
	useEffect(() => {
		setSelectedLink(link);
		if (posts.length === 0) dispatch(getPosts());
		if (userData.length === 0) dispatch(getUsers());
		console.table(userData);
	}, []);

	return (
		<Box
			sx={{
				display: { xs: "flex", md: "grid" },
				gridTemplateColumns: "repeat(3,1fr)",
				gridAutoRows: "minmax(100px, auto)",
				gap: 3,
				textAlign: "center",
				flexDirection: "column",
			}}
		>
			<Paper elevation={3} sx={{ p: 3 }}>
				<Typography variant="h4">Total Users</Typography>
				<Box
					sx={{
						display: "flex",
						alignItems: "center",
						justifyContent: "center",
					}}
				>
					<Group sx={{ height: 100, width: 100, opacity: 0.3, mr: 1 }} />
					<Typography variant="h4">{userData.length}</Typography>
				</Box>
			</Paper>
			<Paper elevation={3} sx={{ p: 3 }}>
				<Typography variant="h4">Total Stories</Typography>
				<Box
					sx={{
						display: "flex",
						alignItems: "center",
						justifyContent: "center",
					}}
				>
					<MapsHomeWork sx={{ height: 100, width: 100, opacity: 0.3, mr: 1 }} />
					<Typography variant="h4"> {posts.length} </Typography>
				</Box>
			</Paper>
			<Paper elevation={3} sx={{ p: 2, gridColumn: 3, gridRow: "1/4" }}>
				<Box>
					<Typography variant="h6">Recently Added users</Typography>
					<List>
						{userData?.slice(0, 4).map((user, i) => (
							<Box key={user._id}>
								<ListItem>
									<ListItemAvatar>
										<Avatar
											alt={user?.name}
											src={user?.imageUrl}
											variant="circular"
										/>
									</ListItemAvatar>
									<ListItemText primary={user?.name} secondary={user?.email} />
									{/* <ListItemText primary={user?.email} /> */}
								</ListItem>
								{i !== 3 && <Divider variant="inset" />}
							</Box>
						))}
					</List>
				</Box>

				<Divider sx={{ mt: 3, mb: 3, opacity: 0.7 }} />
				<Box>
					<Typography variant="h6">Recently Added Stories</Typography>
					{}
					<List>
						{posts.slice(0, 4).map((post, i) => (
							<Box key={post._id}>
								<ListItem>
									<ListItemAvatar>
										<Avatar
											alt={post?.title}
											src={post?.selectedFile}
											variant="rounded"
										/>
									</ListItemAvatar>
									<ListItemText
										primary={post?.title} secondary={`Added: ${moment(post?.createdAt).fromNow(
											"YYYY-MM-DD H:mm:ss"
										)}`}
										// secondary={`Added: ${moment(post?.createdAt).fromNow(
										// 	"YYYY-MM-DD H:mm:ss"
										// )}`}
									/>
									{/* <ListItemText
										primary={`Added: ${moment(post?.createdAt).fromNow(
											"YYYY-MM-DD H:mm:ss"
										)}`}
									/> */}
								</ListItem>
								{i !== 3 && <Divider variant="inset" />}
							</Box>
						))}
					</List>
				</Box>
				{/* <Divider sx={{mt:3,mb:3,opacity:0.7}} */}
			</Paper>
		</Box>
	);
};

export default Main;
