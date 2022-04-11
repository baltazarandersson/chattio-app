import { onAuthStateChanged, signOut } from "firebase/auth";
import {
  doc,
  getDoc,
  onSnapshot,
  setDoc,
  updateDoc,
  arrayUnion,
  collection,
  getDocs,
} from "firebase/firestore";
import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { auth, db } from "../firebase/firebase";

const UserContext = React.createContext();

export const useUserContext = () => useContext(UserContext);

export function UserContextProvider({ children }) {
  const [user, setUser] = useState(null);
  const [currentRoom, setCurrentRoom] = useState({});
  const [rooms, setRooms] = useState(null);
  const [currentRoomData, setCurrentRoomData] = useState({});
  const [currentParticipants, setCurrentParticipants] = useState([]);
  const [darkMode, setDarkMode] = useState(
    localStorage.getItem("darkMode") === null
      ? true
      : JSON.parse(localStorage.getItem("darkMode"))
  );
  let navigate = useNavigate();

  async function changeRoom(room) {
    const roomRef = doc(db, "rooms", room);
    const roomSnap = await getDoc(roomRef);
    if (roomSnap.exists()) {
      setCurrentRoomData({});
      updateDoc(doc(db, "rooms", room), {
        participants: arrayUnion(user.uid),
      }).then(async () => {
        const updatedRoomDoc = doc(db, "rooms", room);
        const updatedRoomSnap = await getDoc(updatedRoomDoc);
        setCurrentRoom(updatedRoomSnap.data());
      });
    } else {
      navigate("/room/home");
    }
  }

  function navigateRoom(room) {
    navigate("/room/" + room);
  }

  useEffect(() => {
    onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        setUser((prevState) => {
          const { photoURL, displayName, email, uid } = currentUser;
          return { photoURL, displayName, email, uid };
        });
        await getRooms();
      }
    });
  }, []);

  useEffect(() => {
    if (Object.keys(currentRoom).length !== 0) {
      const roomRef = doc(db, "rooms", currentRoom.title);
      const unsub = onSnapshot(roomRef, async (doc) => {
        const snapData = doc.data();
        setCurrentRoomData(snapData);
        getParticipants();
      });
      return unsub;
    }
  }, [currentRoom]);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("darkMode", true);
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("darkMode", false);
    }
  }, [darkMode]);

  function toggleDark() {
    setDarkMode((prevState) => !prevState);
  }

  async function getParticipants() {
    const listOfUsers = await getDocs(collection(db, "users"));
    listOfUsers.forEach((doc) => {
      setCurrentParticipants((prevState) => [...prevState, doc.data()]);
    });
  }

  async function getRooms() {
    const docRef = doc(db, "rooms", "publicRooms");
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      const { rooms } = docSnap.data();
      setRooms(rooms);
    }
  }

  async function createRoom(keyword, toggleModal) {
    const roomRef = doc(db, "rooms", keyword);
    const docSnap = await getDoc(roomRef);

    if (docSnap._document === null) {
      await setDoc(roomRef, {
        title: keyword,
        createdBy: user.uid,
        participants: [user.uid],
        messages: {},
      });
      await updateDoc(doc(db, "rooms", "publicRooms"), {
        rooms: arrayUnion(keyword),
      });
      toggleModal();
      getRooms();
    }
  }

  async function sendMessage(message) {
    if (currentRoom) {
      const roomRef = doc(db, "rooms", currentRoom.title);
      await updateDoc(roomRef, {
        messages: arrayUnion({
          sentBy: user.uid,
          unixDate: new Date().getTime(),
          content: message,
        }),
      });
    }
  }

  function handleLogOut() {
    signOut(auth)
      .then(() => {
        localStorage.removeItem("Auth Token");
        navigate("/");
      })
      .catch((error) => {
        throw new Error(error.message);
      });
  }

  return (
    <UserContext.Provider
      value={{
        user,
        setUser,
        createRoom,
        rooms,
        currentRoom,
        changeRoom,
        sendMessage,
        currentRoomData,
        currentParticipants,
        navigateRoom,
        handleLogOut,
        toggleDark,
        darkMode,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}
