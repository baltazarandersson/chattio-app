import { useUserContext } from "../../context/UserContext";
import { IoIosArrowUp, IoIosArrowDown } from "react-icons/io";
import { useState } from "react";
import { useLoader } from "../../hooks/useLoader";

export function UserContainer({ props }) {
  const [isOpened, setIsOpened] = useState(false);
  const { user, handleLogOut } = useUserContext();
  const isLoading = useLoader();
  const { toggleDrawer } = props ? props : {};

  function handleClick() {
    setIsOpened((prevState) => !prevState);
  }

  if (isLoading) {
    return (
      <div
        style={{ minHeight: "5rem" }}
        className={`w-full flex  px-8 py-4 border-t-2 border-zinc-200 dark:border-zinc-700 overflow-hidden`}
      ></div>
    );
  }

  return (
    <div
      style={{ minHeight: "5rem" }}
      className="w-full flex px-8 py-4 border-t-2 border-zinc-200 dark:border-zinc-700 h-20"
    >
      <div className="h-12 w-full flex justify-between gap-4 items-center">
        <img
          alt="profile-pic"
          src={user.photoURL}
          className="h-12 w-12 rounded-full"
        />
        <div className="flex sm:hidden h-full lg:flex flex-col justify-center text-sm">
          <p>{user.displayName}</p>
          <p className="text-zinc-500 dark:text-zinc-500 sm:hidden xl:block">
            {user.email.split("@")[0]}
          </p>
        </div>
        <div className="relative right-0 bg-zinc-50 dark:bg-zinc-900">
          <button
            onClick={handleLogOut}
            className={`absolute bottom-12 left-1/2 p-2 px-4 bg-zinc-200 dark:bg-zinc-800 -translate-x-2/4 rounded-xl transition-opacity hover:bg-zinc-300 dark:hover:bg-zinc-700 ${
              isOpened ? "opacity-100" : "invisible opacity-0"
            }`}
          >
            <p className="font-medium">LogOut</p>
          </button>
          <button
            onClick={() => {
              handleClick();
              toggleDrawer && toggleDrawer();
            }}
          >
            <IoIosArrowDown
              size={32}
              className={`transition-transform duration-300 text-zinc-700 dark:text-zinc-300 ${
                isOpened ? "rotate-180" : "rotate-0"
              }`}
            />
          </button>
        </div>
      </div>
    </div>
  );
}
