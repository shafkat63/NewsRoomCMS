import React, { useState } from "react";
import { createTheme, styled, ThemeProvider } from "@mui/material/styles";
import Box from "@mui/material/Box";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import CssBaseline from "@mui/material/CssBaseline";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import SideList from "./SideList";
import { useMemo } from "react";
import { Tooltip } from "@mui/material";
import { Home, Brightness7, Brightness4 } from "@mui/icons-material";
import { Link, Routes, useNavigate } from "react-router-dom";
import HomePage from "../../components/Home/Home";


const drawerWidth = 240;

const AppBar = styled(MuiAppBar, {
	shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
	zIndex: theme.zIndex.drawer + 1,
	transition: theme.transitions.create(["width", "margin"], {
		easing: theme.transitions.easing.sharp,
		duration: theme.transitions.duration.leavingScreen,
	}),
	...(open && {
		marginLeft: drawerWidth,
		width: `calc(100% - ${drawerWidth}px)`,
		transition: theme.transitions.create(["width", "margin"], {
			easing: theme.transitions.easing.sharp,
			duration: theme.transitions.duration.enteringScreen,
		}),
	}),
}));

export default function Dashboard() {
	const [open, setOpen] = useState(false);
	const [dark, setDark] = useState(false);

	const darkTheme = useMemo(
		() =>
			createTheme({
				palette: {
					mode: dark ? "dark" : "light",
				},
			}),
		[dark]
	);
	const handleDrawerOpen = () => {
		setOpen(true);
	};
	const navigate = useNavigate();
	return (
		<ThemeProvider theme={darkTheme}>
			<CssBaseline enableColorScheme /> 
			<Box sx={{ display: "flex" }}>
				<CssBaseline />
				<AppBar position="fixed" open={open}>
					<Toolbar>
						<IconButton
							color="inherit"
							aria-label="open drawer"
							onClick={handleDrawerOpen}
							edge="start"
							sx={{
								marginRight: 5,
								...(open && { display: "none" }),
							}}
						>
							<MenuIcon />
						</IconButton>
						<Tooltip title="Go Back to Home Page">
							{/* <Link to="/"> */}
							<IconButton sx={{ mr: 1 }} onClick={() => navigate("/")}>
								{/* <Routes>
                <Route path='/' element={<HomePage/>}/>
                </Routes> */}

								<Home />
							</IconButton>
							{/* </Link> */}
						</Tooltip>
						<Typography
							variant="h6"
							noWrap
							component="div"
							sx={{ flexGrow: 1 }}
						>
							Dashboard
						</Typography>
						<IconButton onClick={() => setDark(!dark)}>
							{dark ? <Brightness7 /> : <Brightness4 />}
						</IconButton>
					</Toolbar>
				</AppBar>
				<SideList {...{ open, setOpen }} />
			</Box>
		</ThemeProvider>
	);
}
