import React, { useState } from "react";
import { IoIosSend } from "react-icons/io";
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
      className="w-full h-full bg-zinc-00 flex rounded-xl overflow-hidden"
    >
      <input
        ref={inputRef}
        onChange={handleChange}
        className="w-full bg-zinc-700 px-8 outline-none"
      />
      <button
        onClick={handleSumbit}
        type="button"
        className="w-2/12 flex justify-center items-center bg-yellow-500"
      >
        <IoIosSend size="32" className="drop-shadow-lg" />
      </button>
    </form>
  );
}
