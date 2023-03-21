import React, { useEffect, useState, useMemo } from "react";
import MuiDrawer from "@mui/material/Drawer";
import Main from "../main/Main";
import Users from "../users/Users";
import Request from "../request/Requests";
import Stories from "../stories/Stories";
import {
	Avatar,
	Box,
	Divider,
	IconButton,
	List,
	ListItem,
	ListItemButton,
	ListItemIcon,
	ListItemText,
	styled,
	Tooltip,
	Typography,
} from "@mui/material";
import {
	ChevronLeft,
	Dashboard,
	Logout,
	MarkChatUnread,
	NotificationsActive,
	PeopleAlt,
} from "@mui/icons-material";
import { useSelector } from "react-redux";
import { useNavigate, useLocation, Routes, Route } from "react-router-dom";
import { useDispatch } from "react-redux";
import { LOGOUT } from "../../constants/actionTypes";
import { getUsers } from "../../actions/auth";
const drawerWidth = 240;

const openedMixin = (theme) => ({
	width: drawerWidth,
	transition: theme.transitions.create("width", {
		easing: theme.transitions.easing.sharp,
		duration: theme.transitions.duration.enteringScreen,
	}),
	overflowX: "hidden",
});

const closedMixin = (theme) => ({
	transition: theme.transitions.create("width", {
		easing: theme.transitions.easing.sharp,
		duration: theme.transitions.duration.leavingScreen,
	}),
	overflowX: "hidden",
	width: `calc(${theme.spacing(7)} + 1px)`,
	[theme.breakpoints.up("sm")]: {
		width: `calc(${theme.spacing(8)} + 1px)`,
	},
});

const DrawerHeader = styled("div")(({ theme }) => ({
	display: "flex",
	alignItems: "center",
	justifyContent: "flex-end",
	padding: theme.spacing(0, 1),
	// necessary for content to be below app bar
	...theme.mixins.toolbar,
}));
const Drawer = styled(MuiDrawer, {
	shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
	width: drawerWidth,
	flexShrink: 0,
	whiteSpace: "nowrap",
	boxSizing: "border-box",
	...(open && {
		...openedMixin(theme),
		"& .MuiDrawer-paper": openedMixin(theme),
	}),
	...(!open && {
		...closedMixin(theme),
		"& .MuiDrawer-paper": closedMixin(theme),
	}),
}));

const SideList = ({ open, setOpen }) => {
	const [Currentuser, setCurrentUser] = useState(
		JSON.parse(localStorage.getItem("profile"))
	);

	const location = useLocation();
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const userdata = useSelector((state) => state.authData);
	const currentID = Currentuser?.result?._id;
	console.log(currentID);
	useEffect(() => {
		// const token = user?.token;
		// JWT

		setCurrentUser(JSON.parse(localStorage.getItem("profile")));
	}, [location]);

	const handlelogout = () => {
		dispatch({ type: LOGOUT });
		navigate("/");
		setCurrentUser(null);
	};

	const [selectedLink, setSelectedLink] = useState("");
	const list = useMemo(
		() => [
			{
				title: "Main",
				icon: <Dashboard />,
				link: "",
				component: <Main {...{ setSelectedLink, link: "" }} />,
			},
			{
				title: "Users",
				icon: <PeopleAlt />,
				link: "users",
				component: <Users {...{ setSelectedLink, link: "users" }} />,
			},
			{
				title: "Requests",
				icon: <NotificationsActive />,
				link: "requests",
				component: <Request {...{ setSelectedLink, link: "requests" }} />,
			},
			{
				title: "Stories",
				icon: <MarkChatUnread />,
				link: "stories",
				component: <Stories {...{ setSelectedLink, link: "stories" }} />,
			},
		],
		[]
	);

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
		<>
			<Drawer variant="permanent" open={open}>
				<DrawerHeader>
					<IconButton onClick={() => setOpen(false)}>
						<ChevronLeft />
					</IconButton>
				</DrawerHeader>
				<Divider />
				<List>
					{list.map((item) => (
						<ListItem key={item.title} disablePadding sx={{ display: "block" }}>
							<ListItemButton
								sx={{
									minHeight: 48,
									justifyContent: open ? "initial" : "center",
									px: 2.5,
								}}
								onClick={() => navigate(item.link)}
								selected={selectedLink === item.link}
							>
								<ListItemIcon
									sx={{
										minWidth: 0,
										mr: open ? 3 : "auto",
										justifyContent: "center",
									}}
								>
									{item.icon}
								</ListItemIcon>
								<ListItemText
									primary={item.title}
									sx={{ opacity: open ? 1 : 0 }}
								/>
							</ListItemButton>
						</ListItem>
					))}
				</List>
				<Divider />
				<Box sx={{ mx: "auto", mt: 3, mb: 1 }}>
					<Tooltip title={Currentuser?.result?.name || ""}>
						<Avatar
							src={oneUser2?.imageUrl}
							{...(open && { sx: { width: 100, height: 100 } })}
						></Avatar>
					</Tooltip>
				</Box>
				<Box sx={{ textAlign: "center" }}>
					{open && <Typography>{Currentuser?.result?.name}</Typography>}
					<Typography>{oneUser2?.role || "Role"}</Typography>
					{open && (
						<Typography variant="body2">
							{Currentuser?.result?.email}
						</Typography>
					)}
					<Tooltip title="Logout" sx={{ mt: 1 }}>
						<IconButton onClick={handlelogout}>
							<Logout />
						</IconButton>
					</Tooltip>
				</Box>

			</Drawer>
			<Box component="main" sx={{ flexGrow: 1, p: 3 }}>
				<DrawerHeader />

				<Routes>
					{list.map((item) => (
						<Route key={item.title} path={item.link} element={item.component} />
					))}
				</Routes>
			</Box>
		</>
	);
};

export default SideList;
