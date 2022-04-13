import React, { useEffect, useState } from "react";
import LinearProgress from '@mui/material/LinearProgress';

import useAuth from "../hooks/auth";
import AuthService from "../service/AuthService";
// import Snack from "../Components/Snack";


export default function AuthStateChanged({ children }) {
	const { setUser } = useAuth();
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		AuthService.waitForUser((userCred) => {
			setUser(userCred);
			setLoading(false);
		});
		return AuthService.waitForUser((userCred) => {});
		//eslint-disable-next-line
	}, []);

	if (loading) {
		return( <>
			<div style={{heigth:'95vh'}}><LinearProgress /></div>
		</>)
	}

	return (
		<>
			{children}
		</>
	);
}
