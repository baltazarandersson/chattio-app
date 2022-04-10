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
import { useNavigate } from "react-router-dom";
import { arrayUnion, doc, setDoc, updateDoc } from "firebase/firestore";

const AuthContext = React.createContext();

export const useAuthContext = () => useContext(AuthContext);

export function AuthContextProvider({ children }) {
  const navigate = useNavigate();

  async function setUserInitialData(response) {
    await setDoc(doc(db, "/users/" + response.user.uid), {
      email: response.user.email,
      photoURL: response.user.photoURL,
      displayName: response.user.displayName,
      uid: response.user.uid,
    });
    await updateDoc(doc(db, "rooms", "home"), {
      participants: arrayUnion(response.user.uid),
    });
  }

  async function loginWithFacebook() {
    const facebookProvider = new FacebookAuthProvider();
    await signInWithPopup(auth, facebookProvider).then((response) => {
      if (getAdditionalUserInfo(response).isNewUser) {
        setUserInitialData(response);
      }
      localStorage.setItem("Auth Token", response._tokenResponse.refreshToken);
      navigate("/room/home");
    });
  }
  async function loginWithTwitter() {
    const twitterProvider = new TwitterAuthProvider();
    await signInWithPopup(auth, twitterProvider).then((response) => {
      if (getAdditionalUserInfo(response).isNewUser) {
        setUserInitialData(response);
      }
      localStorage.setItem("Auth Token", response._tokenResponse.refreshToken);
      navigate("/room/home");
    });
  }

  async function loginWithGithub() {
    const gitProvider = new GithubAuthProvider();
    await signInWithPopup(auth, gitProvider).then((response) => {
      if (getAdditionalUserInfo(response).isNewUser) {
        setUserInitialData(response);
      }
      localStorage.setItem("Auth Token", response._tokenResponse.refreshToken);
      navigate("/room/home");
    });
  }

  async function loginWithGoogle() {
    const googleProvider = new GoogleAuthProvider();
    await signInWithPopup(auth, googleProvider).then((response) => {
      if (getAdditionalUserInfo(response).isNewUser) {
        setUserInitialData(response);
      }
      localStorage.setItem("Auth Token", response._tokenResponse.refreshToken);
      navigate("/room/home");
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
