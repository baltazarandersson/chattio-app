import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { ChatContainer } from "../../components/ChatContainer";
import { Rooms } from "../../components/Rooms";
import { useUserContext } from "../../context/UserContext";
import { useRedirect } from "../../hooks/useRedirect";

export function Home() {
  let { room } = useParams();
  useRedirect();
  const { changeRoom, currentRoom } = useUserContext();

  useEffect(() => {
    if (currentRoom) {
      if (room === currentRoom.title) {
        return;
      } else {
        changeRoom(room);
      }
    } else {
      changeRoom(room);
    }
  }, [room]);

  return (
    <div className="flex w-screen h-screen bg-zinc-800  justify-center items-center p-8">
      <div className=" w-full h-full bg-zinc-900 md:rounded-xl flex border-2 border-zinc-700">
        <Rooms />
        <ChatContainer />
      </div>
    </div>
  );
}
