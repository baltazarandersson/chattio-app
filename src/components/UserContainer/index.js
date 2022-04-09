import { useUserContext } from "../../context/UserContext";
import { IoIosArrowUp, IoIosArrowDown } from "react-icons/io";
import { useState } from "react";
import { useLoader } from "../../hooks/useLoader";

export function UserContainer() {
  const [isOpened, setIsOpened] = useState(false);
  const { user } = useUserContext();
  const isLoading = useLoader();

  function handleClick() {
    setIsOpened((prevState) => !prevState);
  }

  if (isLoading) {
    return (
      <div
        style={{ minHeight: "5rem" }}
        className={`w-full flex  px-8 py-4 border-t-2 border-zinc-700 overflow-hidden ${
          isOpened ? "h-48" : "h-20"
        }`}
      ></div>
    );
  }

  return (
    <div
      style={{ minHeight: "5rem" }}
      className="w-full flex  px-8 py-4 border-t-2 border-zinc-700 transition-all duration-300 h-20"
    >
      <div className="h-12 w-full flex justify-between lg:justify-start gap-4 items-center">
        <img
          alt="profile-pic"
          src={user.photoURL}
          className="h-12 w-12 rounded-full"
        />
        <div className="hidden h-full lg:flex flex-col justify-center text-sm">
          <p>{user.displayName}</p>
          <p className="text-zinc-500 hidden xl:block">{user.email}</p>
        </div>
        <div className="relative">
          <button
            className={`absolute bottom-12 left-1/2 p-2 px-4 bg-zinc-800 border-2 border-zinc-700 -translate-x-2/4 rounded-xl ${
              isOpened ? "visible" : "invisible"
            }`}
          >
            LogOut
          </button>
          <button onClick={handleClick}>
            <IoIosArrowUp size={32} />
          </button>
        </div>
      </div>
    </div>
  );
}
