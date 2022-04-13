import { createContext, useContext, useState } from "react";
import AuthService from "../service/AuthService";

const authContext = createContext();

export default function useAuth() {
	return useContext(authContext);
}

export function AuthProvider(props) {
	const [user, setUser] = useState(null);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState({});

  const registerWithEmailPassWord = async (data) => {
		setLoading(true)
		setError({})
    const { error, user } = await AuthService.registerWithEmailAndPassword(data);
		setUser(user ?? null);
		if(error){
			setError({signupError: error})
		}
		setLoading(false)
  }
  
  const loginWithPassWord = async (data) => {
		setLoading(true)
		setError({})
    const { error, user } = await AuthService.loginWithEmailAndPassword(data);
		setUser(user ?? null);
		if(error){
			setError({loginError: error})
		}
		setLoading(false)
		
		// setError(error ?? "");
		// if(user){
		// 	setSnack({open: true, message: 'Successfully logged in', type: 'success' })
		// }
  }

	const logout = async () => {
		await AuthService.logout();
		setUser(null);
		// setSnack({open: true, message: 'Successfully logged out', type: 'success' })
	};

	const value = { user, error, loginWithPassWord,registerWithEmailPassWord, logout, setUser, loading,};

	return <authContext.Provider value={value} {...props} />;
}
