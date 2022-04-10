import React, { useState } from "react";
import { IoSend } from "react-icons/io5";
import { useUserContext } from "../../context/UserContext";

export function ChatInput() {
  const [keyword, setKeyword] = useState("");
  const { sendMessage } = useUserContext();

  const inputRef = React.createRef();

  function handleChange(e) {
    setKeyword(e.target.value);
  }

  function handleSumbit(e) {
    e.preventDefault();
    sendMessage(keyword);
    inputRef.current.value = "";
  }

  return (
    <form
      onSubmit={handleSumbit}
      className="w-full h-full flex justify-between bg-zinc-00 rounded-xl"
    >
      <input
        ref={inputRef}
        onChange={handleChange}
        className="w-3/4 bg-zinc-700 px-8 outline-none transition-colors hover:bg-zinc-600 rounded-xl"
      />
      <button
        onClick={handleSumbit}
        type="button"
        className="w-2/12 flex justify-center items-center bg-green-600 rounded-xl transition-transform hover:scale-110"
      >
        <IoSend size={28} className="drop-shadow-lg" />
      </button>
    </form>
  );
}
