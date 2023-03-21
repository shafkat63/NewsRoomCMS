import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useNavigate, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { AppBar, Avatar, Button, Toolbar, Typography } from "@material-ui/core";
import useStyles from "./styles";
import news2 from "../../images/news2.png";
import { LOGOUT } from "../../constants/actionTypes";
import { IconButton, Tooltip } from "@mui/material";
import DashboardCustomizeIcon from "@mui/icons-material/DashboardCustomize";
const Navbar = () => {
	const classes = useStyles();
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const location = useLocation();
	const [user, setUser] = useState(JSON.parse(localStorage.getItem("profile")));
	const logout = () => {
		dispatch({ type: LOGOUT });
		navigate("/");
		setUser(null);
	};
	// useEffect(() => {
	// 	// const token = user?.token;
	// 	// JWT

	// 	setUser(JSON.parse(localStorage.getItem("profile")));
	// }, [location]);

	return (
		<AppBar className={classes.appBar} position="static" color="inherit">
			<div className={classes.brandContainer}>
				<Typography
					component={Link}
					to="/"
					className={classes.heading}
					variant="h2"
					align="center"
				>
					News Room CMS
				</Typography>
				<img className={classes.image} src={news2} alt="icon" height="60" />
			</div>

			<Toolbar className={classes.toolbar}>
				{user?.result ? (
					<div className={classes.profile}>
						<Avatar
							className={classes.purple}
							alt={user?.result.name}
							src={user?.result.imageUrl}
						>
							{user?.result.name.charAt(0)}
						</Avatar>

						<Typography
							sx={{ textDecoration: "none" }}
							component={Link}
							to={"/profile"}
							className={classes.userName}
							variant="h6"
						>
							{user.result.name}
						</Typography>
						<Button
							variant="contained"
							className={classes.logout}
							color="secondary"
							onClick={logout}
						>
							Logout
						</Button>

						{user?.result.role === "admin" && (
							<Tooltip title="Go To Dashboard">
								<IconButton
									sx={{ ml: 1 }}
									onClick={() => navigate("/dashboard")}
								>
									<DashboardCustomizeIcon />
								</IconButton>
							</Tooltip>
						)}
					</div>
				) : (
					<Button
						component={Link}
						to="/auth"
						variant="contained"
						color="primary"
					>
						Sign In
					</Button>
				)}
			</Toolbar>
		</AppBar>
	);
};

export default Navbar;
