import { useUserContext } from "../../context/UserContext";
import { Chat } from "../Chat";
import { ChatInput } from "../ChatInput";

export function ChatContainer() {
  const { currentRoom } = useUserContext();

  return (
    <div className="w-full flex flex-col justify-between">
      <header className="w-full h-16 flex items-center justify-between px-8 border-b-2 border-zinc-700">
        <p>Chat</p>
        {"participants" in currentRoom ? (
          <p>{currentRoom.participants.length} participants</p>
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
