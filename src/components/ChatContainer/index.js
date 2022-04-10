import { useUserContext } from "../../context/UserContext";
import { Chat } from "../Chat";
import { ChatInput } from "../ChatInput";
import { Drawer } from "../Drawer";

export function ChatContainer() {
  const { currentRoomData } = useUserContext();

  return (
    <div className="w-full flex flex-col justify-between">
      <header className="w-full h-16 flex items-center justify-between px-4 md:px-8 border-b-2 border-zinc-700">
        <div className="flex h-full items-center gap-4">
          <Drawer />
          <p>Chat</p>
        </div>
        {"participants" in currentRoomData ? (
          <p>{currentRoomData.participants.length} participants</p>
        ) : null}
      </header>
      <section className="flex w-full h-3/4 grow px-4 md:px-8 pb-4">
        <Chat />
      </section>
      <section className="w-full h-20 p-4 md:px-8 border-t-2 border-zinc-700">
        <ChatInput />
      </section>
    </div>
  );
}
