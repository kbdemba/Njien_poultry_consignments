import React, { useEffect, useState } from "react";
import LinearProgress from '@mui/material/LinearProgress';
import useAuth from "./auth";
import { useRouter } from "next/router";

export function withPublic(Component) {
	return function WithPublic(props) {
		const auth = useAuth();
		const router = useRouter()

		useEffect(() => {
			if (auth.user) {
				router.replace("/");
			}
		}, [auth.user]);
		if (auth.user) {
			return <div style={{height:'95vh'}}> <LinearProgress /></div>
		}

		return <Component auth={auth} {...props} />;
	};
}

export function withProtected(Component) {
	return function WithProtected(props) {
		const auth = useAuth();
		const router = useRouter()

		useEffect(() => {
			if (!auth.user) {
				router.replace("/login");
			}
		}, [auth.user]);
		
		if (!auth.user) {
			return <div style={{heigth:'95vh'}}><LinearProgress /></div>
		}
		return <Component auth={auth} {...props} />;
	};
}
