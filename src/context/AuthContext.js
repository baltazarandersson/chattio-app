import React, { useContext } from "react";
import {
  FacebookAuthProvider,
  getAdditionalUserInfo,
  GithubAuthProvider,
  GoogleAuthProvider,
  signInWithPopup,
  TwitterAuthProvider,
} from "firebase/auth";
import { auth, db } from "../firebase/firebase";
import { ref, set } from "firebase/database";

const AuthContext = React.createContext();

export const useAuthContext = () => useContext(AuthContext);

export function AuthContextProvider({ children }) {
  async function loginWithFacebook() {
    const facebookProvider = new FacebookAuthProvider();
    await signInWithPopup(auth, facebookProvider).then((response) => {
      console.log(response);
      if (getAdditionalUserInfo(response).isNewUser) {
        set(ref(db, "/users/" + response.user.uid), {
          email: response.user.email,
          profilePic: response.user.photoURL,
          username: response.user.displayName,
        });
      }
    });
  }
  async function loginWithTwitter() {
    const twitterProvider = new TwitterAuthProvider();
    await signInWithPopup(auth, twitterProvider).then((response) => {
      if (getAdditionalUserInfo(response).isNewUser) {
        set(ref(db, "/users/" + response.user.uid), {
          email: response.user.email,
          profilePic: response.user.photoURL,
          username: response.user.displayName,
        });
      }
    });
  }

  async function loginWithGithub() {
    const gitProvider = new GithubAuthProvider();
    await signInWithPopup(auth, gitProvider).then((response) => {
      if (getAdditionalUserInfo(response).isNewUser) {
        set(ref(db, "/users/" + response.user.uid), {
          email: response.user.email,
          profilePic: response.user.photoURL,
          username: response.user.displayName,
        });
      }
    });
  }

  async function loginWithGoogle() {
    const googleProvider = new GoogleAuthProvider();
    await signInWithPopup(auth, googleProvider).then((response) => {
      if (getAdditionalUserInfo(response).isNewUser) {
        set(ref(db, "/users/" + response.user.uid), {
          email: response.user.email,
          profilePic: response.user.photoURL,
          username: response.user.displayName,
        });
      }
    });
  }

  return (
    <AuthContext.Provider
      value={{
        loginWithFacebook,
        loginWithTwitter,
        loginWithGithub,
        loginWithGoogle,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
