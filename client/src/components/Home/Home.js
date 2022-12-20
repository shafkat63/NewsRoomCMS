import React, { useState, useEffect } from "react";
import {
	Container,
	Grow,
	Grid,
	Paper,
	AppBar,
	TextField,
	Button,
} from "@material-ui/core";
import { useDispatch } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import ChipInput from "material-ui-chip-input";

import { getPosts, getPostsBySearch } from "../../actions/posts";
import Posts from "../Posts/Posts";
import Form from "../Form/Form";
import Pagination from "../Pagination";

import useStyles from "./styles";

function useQuery() {
	return new URLSearchParams(useLocation().search);
}

const Home = () => {
	const classes = useStyles();
	const query = useQuery();
	const page = query.get("page") || 1;
	const searchQuery = query.get("searchQuery");
	const [currentId, setCurrentId] = useState(0);
	const dispatch = useDispatch();

	const navigate = useNavigate();

	const [search, setSearch] = useState("");
	const [tags, setTags] = useState([]);

	// useEffect(() => {
	// 	dispatch(getPosts());
	// }, [currentId, dispatch]);

	const searchPost = (e) => {
		if (search.trim() || tags) {
			//dispatch->fetch search post
			dispatch(getPostsBySearch({ search, tags: tags.join(",") }));
			navigate(
				`/posts/search?searchQuery=${search || "none"}&tags=${tags.join(",")}`
			);
		} else {
			navigate("/");
		}
	};
	const handleKeyPress = (e) => {
		if (e.keycode === 13) {
			//search post
			searchPost();
		}
	};
	const handleAdd = (tag) => {
		setTags([...tags, tag]);
	};
	const handleDelete = (tagToDelete) => {
		setTags(tags.filter((tag) => tag !== tagToDelete));
	};
	return (
		<Grow in>
			<Container maxWidth="xl">
				<Grid
					container
					justify="space-between"
					alignItems="stretch"
					spacing={3}
					className={classes.gridContainer}
				>
					<Grid item xs={12} sm={6} md={9}>
						<Posts setCurrentId={setCurrentId} />
					</Grid>
					<Grid item xs={12} sm={6} md={3}>
						<AppBar
							className={classes.appBarSearch}
							position="static"
							color="inherit"
						>
							<TextField
								name="search"
								variant="outlined"
								label="Search Stories"
								fullWidth
								onKeyPress={handleKeyPress}
								value={search}
								onChange={(e) => {
									setSearch(e.target.value);
								}}
							/>
							<ChipInput
								style={{ margin: "10px 0" }}
								value={tags}
								onAdd={handleAdd}
								onDelete={handleDelete}
								label="Search via Tags"
								variant="outlined"
							/>
							<Button
								onClick={searchPost}
								className={classes.searchButton}
								color="primary"
								variant="contained"
							>
								Search
							</Button>
						</AppBar>
						<Form currentId={currentId} setCurrentId={setCurrentId} />

						{!searchQuery && !tags.length && (
							<Paper elevation={6} className={classes.pagination}>
								<Pagination page={page} />
							</Paper>
						)}
					</Grid>
				</Grid>
			</Container>
		</Grow>
	);
};

export default Home;
