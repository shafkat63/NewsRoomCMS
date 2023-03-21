import React, { useEffect } from "react";
import { Box, Typography, Paper, Avatar } from "@mui/material";
import { DataGrid, gridClasses } from "@mui/x-data-grid";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { getUsers } from "../../actions/auth";
import { useMemo } from "react";
import moment from "moment";
import { useState } from "react";
import { grey } from "@mui/material/colors";
import UsersActions from "./UsersActions";
const Users = ({ setSelectedLink, link }) => {
	const { userData } = useSelector((state) => state.users);
	const dispatch = useDispatch();
	const [pageSize, setPageSize] = useState(5);
	const [rowId, setRowId] = useState(null);
	useEffect(() => {
		setSelectedLink(link);
		if (userData.length === 0) dispatch(getUsers());
	}, []);

	const columns = useMemo(
		() => [
			{
				field: "imageUrl",
				headerName: "Avater",
				width: 60,
				renderCell: (params) => <Avatar src={params.row.imageUrl} />,
				sortable: false,
				filterable: false,
			},
			{ field: "name", headerName: "Name", width: 170 },
			{ field: "email", headerName: "Email", width: 200 },
			{
				field: "role",
				headerName: "Role",
				width: 100,
				type: "singleSelect",
				valueOptions: ["user", "editor", "admin"],
				editable: true,
			},
			{
				field: "active",
				headerName: "Active",
				width: 100,
				type: "boolean",
				editable: true,
			},
			{ field: "_id", headerName: "ID", width: 220 },
			{
				field: "createdAt",
				headerName: "Created At",
				width: 200,
				renderCell: (params) =>
					moment(params.row.createdAt).format("YYYY-MM-DD HH:MM:SS"),
			},
			{
				field: "actions",
				headerName: "Actions",
				type: "actions",
				renderCell: (params) => (
					<UsersActions {...{ params, rowId, setRowId }} />
				),
			},
		],
		[rowId]
	);

	return (
		<Box
			sx={{
				height: 400,
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
					Manage User
				</Typography>
			</Paper>
			<DataGrid
				columns={columns}
				rows={userData}
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

export default Users;
