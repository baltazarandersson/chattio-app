import { useState } from "react";
import ReactDOM from "react-dom";
import { BsArrowReturnLeft } from "react-icons/bs";
import { useUserContext } from "../../context/UserContext";

function Modal({ toggleModal }) {
  const { createRoom, rooms } = useUserContext();
  const [keyword, setKeyword] = useState("");
  const [Error, setError] = useState(false);

  function handleSumbit(e) {
    e.preventDefault();
    if (rooms.find((room) => room === keyword)) {
      setError("That room title is currently in use");
      setTimeout(() => {
        setError(false);
      }, 2000);
    }
    createRoom(keyword, toggleModal);
  }

  function handleChange(e) {
    setKeyword(e.target.value);
  }

  return (
    <div
      onClick={toggleModal}
      className="fixed z-30 bottom-0 top-0 left-0 right-0 flex justify-center items-center backdrop-blur-sm"
    >
      <div
        onClick={(e) => {
          e.stopPropagation();
        }}
        className="relative flex flex-col items-center justify-around h-1/2 w-full sm:w-1/3 border-2 bg-zinc-50 border-zinc-200 dark:bg-zinc-900 dark:border-zinc-800 rounded-xl p-8"
      >
        <p className="text-4xl font-bold">Create a room</p>
        <section className="h-full flex flex-col gap-4 justify-center">
          <p className="text-xl font-bold mx-auto">Give it a title</p>
          <form
            onSubmit={handleSumbit}
            className="w-full h-12 bg-zinc-50 dark:bg-zinc-900 flex rounded-xl overflow-hidden"
          >
            <input
              className={`w-full transition-colors px-8 outline-none ${
                Error
                  ? "bg-red-300 dark:bg-red-900"
                  : "bg-zinc-300 dark:bg-zinc-700"
              }`}
              onChange={handleChange}
            />
            <button
              onClick={handleSumbit}
              type="button"
              className={`w-4/12 flex justify-center items-center ${
                Error ? "bg-red-600" : "bg-sky-500"
              }`}
            >
              <BsArrowReturnLeft size={32} className="text-zinc-50" />
            </button>
          </form>
        </section>
        <p className="absolute bottom-8 font-semibold text-red-600">
          {Error ? Error : ""}
        </p>
      </div>
    </div>
  );
}
export function ModalPortal({ toggleModal }) {
  return ReactDOM.createPortal(
    <Modal toggleModal={toggleModal} />,
    document.getElementById("modal-root")
  );
}
