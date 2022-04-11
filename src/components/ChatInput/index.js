import React, { useState } from "react";
import { IoSend } from "react-icons/io5";
import { useUserContext } from "../../context/UserContext";
import { useLoader } from "../../hooks/useLoader";

export function ChatInput() {
  const [keyword, setKeyword] = useState("");
  const { sendMessage } = useUserContext();
  const isLoading = useLoader();

  const inputRef = React.createRef();

  function handleChange(e) {
    setKeyword(e.target.value);
  }

  function handleSumbit(e) {
    e.preventDefault();
    sendMessage(keyword);
    inputRef.current.value = "";
  }
  if (isLoading) {
    return <div></div>;
  }

  return (
    <form
      onSubmit={handleSumbit}
      className="w-full h-full flex gap-4 md:gap-8 justify-between bg-zinc-50 dark:bg-zinc-900 rounded-xl"
    >
      <input
        ref={inputRef}
        onChange={handleChange}
        className="w-full sm:grow bg-zinc-300 dark:bg-zinc-700 box-border px-8 outline-none dark:hover:bg-zinc-600 rounded-xl"
      />
      <button
        onClick={handleSumbit}
        type="button"
        className="w-1/4 sm:w-2/12 flex justify-center items-center bg-sky-500 rounded-xl transition-transform hover:scale-110"
      >
        <IoSend size={26} className="text-zinc-50" />
      </button>
    </form>
  );
}
