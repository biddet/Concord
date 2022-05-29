import React, { useState, useEffect } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import LoginForm from "./components/auth/LoginForm";
import SignUpForm from "./components/auth/SignUpForm";
import ProtectedRoute from "./components/auth/ProtectedRoute";

import MainPage from "./components/Main";
import { authenticate } from "./store/session";
import SplashPage from "./components/Splash";

function App() {
	const [loaded, setLoaded] = useState(false);
	const dispatch = useDispatch();
	const user = useSelector((state) => state.session.user);

	useEffect(() => {
		(async () => {
			await dispatch(authenticate());
			setLoaded(true);
		})();
	}, [dispatch]);

	if (!loaded) {
		return null;
	}

	return (
		<BrowserRouter>
			<Switch>
				<Route exact path="/">
					{user ? <MainPage /> : <SplashPage />}
				</Route>
				<Route path="/login" exact={true}>
					<LoginForm />
				</Route>
				<Route path="/sign-up" exact={true}>
					<SignUpForm />
				</Route>
				<ProtectedRoute
					path={["/", "/channels/:serverId", "/channels/:serverId/:channelId"]}
					exact={true}
				>
					<MainPage />
				</ProtectedRoute>
			</Switch>
		</BrowserRouter>
	);
}

export default App;
