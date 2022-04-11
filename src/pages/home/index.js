import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { ChatContainer } from "../../components/ChatContainer";
import { Rooms } from "../../components/Rooms";
import { useUserContext } from "../../context/UserContext";
import { useRedirect } from "../../hooks/useRedirect";

export function Home() {
  let { room } = useParams();
  useRedirect();
  const { changeRoom, currentRoom, user } = useUserContext();

  useEffect(() => {
    if (user) {
      if (room === currentRoom.title) {
        return;
      } else {
        changeRoom(room);
      }
    }
  }, [room, user]);

  return (
    <div className="flex w-full h-full  bg-zinc-100 dark:bg-zinc-800  justify-center items-center md:p-8">
      <div className=" w-full h-full bg-zinc-50 dark:bg-zinc-900 md:rounded-xl flex md:border-2 border-zinc-200 dark:border-zinc-700">
        <div className="h-full w-1/3 hidden sm:flex">
          <Rooms />
        </div>
        <ChatContainer />
      </div>
    </div>
  );
}
