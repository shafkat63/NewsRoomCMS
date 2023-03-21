import React, { useEffect } from "react";
import { Box, Typography, Paper, Avatar } from "@mui/material";
import { DataGrid, gridClasses } from "@mui/x-data-grid";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useMemo } from "react";
import moment from "moment";
import { useState } from "react";
import { grey } from "@mui/material/colors";
import { getPosts } from "../../actions/posts";
import StoriesActions from "./StoriesActions";
// import UsersActions from "./UsersActions";
const Stories = ({ setSelectedLink, link }) => {
	const { posts } = useSelector((state) => state.posts);
	const dispatch = useDispatch();
	const [pageSize, setPageSize] = useState(5);
	const [rowId, setRowId] = useState(null);
	useEffect(() => {
		setSelectedLink(link);
		if (posts.length === 0) dispatch(getPosts());
	}, []);

	const columns = useMemo(
		() => [
			{
				field: "selectedFile",
				headerName: "Avater",
				width: 60,
				renderCell: (params) => <Avatar src={params.row.selectedFile} />,
				sortable: false,
				filterable: false,
				editable: true,
			},
			{ field: "_id", headerName: "ID", width: 220 },
			{ field: "title", headerName: "Title", width: 250, editable: true },
			{ field: "message", headerName: "Message", width: 400, editable: true },
			{
				field: "name",
				headerName: "Creator",
				width: 200,

				// editable: true,
			},
			{
				field: "creator",
				headerName: "Creator ID",
				width: 220,

				// editable: true,
			},
			{
				field: "factCheck",
				headerName: "FactCheck",
				width: 200,
				type: "singleSelect",
				valueOptions: [
					"FactCheck Coming",
					"True",
					"False",
					"Slightly  True",
					"Slightly  False",
					"Misleading",
				],
				editable: true,
			},
			{
				field: "comments",
				headerName: "Comments",
				width: 300,
				type: "string",
			},
			{
				field: "tags",
				headerName: "Tags",
				width: 150,
				type: "string",
				// editable: true,
			},

			{
				field: "createdAt",
				headerName: "Created At",
				width: 200,
				renderCell: (params) =>
					moment(params.row.createdAt).format("YYYY-MM-DD HH:MM:SS"),
			},
			{
				field: "storyStatus",
				headerName: "Story Status",
				width: 200,
				type: "singleSelect",
				valueOptions: [
					"pending",
					"upload pending",
					"approval pending",
					"approved",
				],
				editable: true,
				filterable: true,
			},
			{
				field: "actions",
				headerName: "Actions",
				type: "actions",
				renderCell: (params) => (
					<StoriesActions {...{ params, rowId, setRowId }} />
				),
			},
		],
		[rowId]
	);

	return (
		<Box
			sx={{
				height: 600,
				width: "100%",
			}}
		>
			{" "}
			<Paper sx={{ pt: "1px", pb: 1 }}>
				<Typography
					variant="h3"
					component="h3"
					sx={{
						textAlign: "center",
						mt: 3,
						mb: 3,
					}}
				>
					Manage Stories
				</Typography>
			</Paper>
			<DataGrid
				columns={columns}
				rows={posts}
				getRowId={(row) => row._id}
				rowsPerPageOptions={[5, 10, 20]}
				pageSize={pageSize}
				onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
				getRowSpacing={(params) => ({
					top: params.isFirstVisible ? 0 : 5,
					bottom: params.isLastVisible ? 0 : 5,
				})}
				sx={{
					[`& .${gridClasses.row}`]: {
						bgcolor: (theme) =>
							theme.palette.mode === "light" ? grey[200] : grey[900],
					},
				}}
				onCellEditCommit={(params) => setRowId(params.id)}
			/>
		</Box>
	);
};

export default Stories;
