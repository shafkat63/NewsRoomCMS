import React, { useEffect, useState } from "react";
import { Container } from "@material-ui/core";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Home from "./components/Home/Home";
// import Navbar from "./components/Navbar/Navbar";
import Auth from "./components/Auth/Auth";
import PostDetails from "./components/PostDetails/PostDetails";
import Dashboard from "./AdminPanel/Dashboard/Dashboard";
import CreatorOrTag from "./components/CreatorOrTag/CreatorOrTag";
import Notification from "./components/Notifications/Notifications";
import About from "./components/Profile/about";
const App = () => {
	// const [user, setUser] = useState(
	// 	JSON.parse(localStorage.getItem("profile"))
	// );

	const user = JSON.parse(localStorage.getItem("profile"));
	// useEffect(()=>{
	// 	if(!user){
	// 		setUser(JSON.parse(localStorage.getItem("profile")))
	// 	}

	// },[user])
	return (
		<div>
			<BrowserRouter>
				<Container maxWidth="xl">
					{/* <Navbar /> */}
					<Notification/>
					<Routes>
						{/* <Route path="/" exact element={<Navigate to="/posts" />} /> */}
						<Route path="/posts" exact element={<Home />} />
						{/* <Route path="/posts" exact element={<Navbar /> } /> */}
						<Route path="/posts/search" exact element={<Home />} />
						<Route path="/posts/:id" exact element={<PostDetails />} />
						<Route path="/notify" exact element={<Notification/>} />

						<Route
							path="/auth"
							exact
							element={!user ? <Auth /> : <Navigate to="/" />}
						/>
						<Route path="/auth" exact element={<Auth />} />

						{/* <Route
							path="/dashboard"
							exact
							element={
								user?.result?.role === "admin" ? <Dashboard /> : <Navigate to="/" />
							}
						/> */}
						<Route path="/creators/:name" element={<CreatorOrTag />} />
						<Route path="/tags/:name" element={<CreatorOrTag />} />
						<Route path="*" element={<Home />} />
						{/* <Route path="/posts/*" exact element={<PageNotFound />} /> */}

						<Route path="/dashboard/*" element={<Dashboard />} />
						<Route path="/profile" element={<About />} />
					</Routes>
				</Container>
			</BrowserRouter>
		</div>
	);
};

export default App;
