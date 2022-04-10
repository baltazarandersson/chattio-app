import { useUserContext } from "../../context/UserContext";
import { useLoader } from "../../hooks/useLoader";
import { Loader } from "../Loader";

export function Chat() {
  const { roomMessages, currentParticipants } = useUserContext();
  const isLoading = useLoader();

  if (isLoading) {
    return (
      <div className="w-full h-full flex items-center justify-center">
        <Loader />
      </div>
    );
  }

  return (
    <>
      {
        <div className="w-full h-full flex flex-col-reverse gap-6 pt-6 overflow-auto">
          {roomMessages.length > 0 &&
            roomMessages
              .slice(0)
              .reverse()
              .map((message) => {
                let messageUser = currentParticipants.find(
                  (e) => e.uid === message.sentBy
                );

                if (!messageUser) {
                  messageUser = {
                    photoURL: "null",
                    displayName: "Unaviable",
                  };
                }

                return (
                  <div
                    className="w-full flex gap-4"
                    key={`${message.unixDate}`}
                  >
                    <img
                      className="rounded-full w-12 h-12"
                      src={messageUser.photoURL}
                      alt="user-profile"
                    />
                    <div className="flex h-full flex-col justify-between">
                      <div className="flex gap-4 items-center">
                        <p className="text-zinc-400">
                          {messageUser.displayName}
                        </p>
                        <div className="hidden md:visible w-2 h-2 bg-zinc-500 rounded-full scale-90" />
                        <p className="text-zinc-500 text-sm">
                          {new Date(message.unixDate).toLocaleString("en-US", {
                            day: "numeric",
                            month: "numeric",
                            year: "numeric",
                            hour: "2-digit",
                            minute: "2-digit",
                            hour12: false,
                          })}
                        </p>
                      </div>
                      <p>{message.content}</p>
                    </div>
                  </div>
                );
              })}
        </div>
      }
    </>
  );
}
