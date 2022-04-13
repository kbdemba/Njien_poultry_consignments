import { getApp } from "firebase/app";
import {
	getAuth,
	signOut,
	onAuthStateChanged,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendEmailVerification,
	updateProfile,
	sendPasswordResetEmail,
} from "firebase/auth";

class AuthService {
	constructor(firebaseApp) {
		this.auth = getAuth(firebaseApp);
	}

	waitForUser(callback) {
		return onAuthStateChanged(this.auth, (userCred) => {
			callback(userCred);
		});
	}

  registerWithEmailAndPassword({email, password, fullName }) {
    return createUserWithEmailAndPassword(this.auth, email, password, fullName)
      .then(async (userCred) => {
        await this.sendEmailVerification()
				await this.updateProfile({displayName:fullName})
				// this.auth.currentUser.reload()
				return {
					user: userCred.user,
					//TODO: return if there was an email sent or there was an error
					//TODO: mayb return for update too
				};
        // TODO: then update cureetn user with fullName
			})
      .catch((error) => {
        // const errorCode = error.code;
        return {
					error:'Error Occured'
				};
      });
  }

  loginWithEmailAndPassword({email, password}) {
    return signInWithEmailAndPassword(this.auth, email, password)
      .then((userCred) => {
				return {
					user: userCred.user,
				};
			})
      .catch((error) => {
				let msg = 'Error occured'
				if( error.code === 'auth/wrong-password' || error.code === 'auth/user-not-found'){
					msg = 'Wrong email or Password'
				}
        return {
					error: msg,
				};
      });
  }

  sendEmailVerification(){
    return sendEmailVerification(this.auth.currentUser)
      .then(() => {
        console.log('email sent')
      })
      .catch((error) => {
        console.log('error occured')
        console.log(error)
      });
  }

	updateProfile(data){
    return updateProfile (this.auth.currentUser, data)
      .then(() => {
        console.log('Profile Updated')
      })
      .catch((error) => {
        console.log('error occured')
        console.log(error)
      });
  }

  forgotPassword(email){
		return sendPasswordResetEmail(this.auth, email)
		.then(() => {
    	return { success: true};
		})
		.catch((error) => {
			console.log(error)
			return { success: false};
		});
	}

	async logout() {
		await signOut(this.auth);
	}
}

export default new AuthService(getApp());