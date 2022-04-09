import { onAuthStateChanged } from "firebase/auth";
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
import { useNavigate } from "react-router-dom";
import { auth, db } from "../firebase/firebase";

const UserContext = React.createContext();

export const useUserContext = () => useContext(UserContext);

export function UserContextProvider({ children }) {
  const [user, setUser] = useState(null);
  const [currentRoom, setCurrentRoom] = useState({});
  const [rooms, setRooms] = useState(null);
  const [roomMessages, setRoomMessages] = useState({});
  const [currentParticipants, setCurrentParticipants] = useState([]);
  let navigate = useNavigate();

  async function changeRoom(room) {
    const docRef = doc(db, "rooms", room);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      setCurrentRoom(docSnap.data());
      updateDoc(doc(db, "rooms", room), {
        participants: arrayUnion(user.uid),
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
        setRoomMessages(snapData.messages);
        const listOfUsers = await getDocs(collection(db, "users"));
        listOfUsers.forEach((doc) => {
          setCurrentParticipants((prevState) => [...prevState, doc.data()]);
        });
      });
    }
  }, [currentRoom]);

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
          sentDate: new Date().toDateString(),
          content: message,
        }),
      });
    }
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
        roomMessages,
        currentParticipants,
        navigateRoom,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}
