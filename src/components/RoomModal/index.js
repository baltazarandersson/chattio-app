import { useState } from "react";
import ReactDOM from "react-dom";
import { MdDone } from "react-icons/md";
import { useUserContext } from "../../context/UserContext";

function Modal({ toggleModal }) {
  const { createRoom } = useUserContext();
  const [keyword, setKeyword] = useState("");

  function handleSumbit(e) {
    e.preventDefault();
    createRoom(keyword, toggleModal);
  }

  function handleChange(e) {
    setKeyword(e.target.value);
  }

  return (
    <div
      onClick={toggleModal}
      className="fixed z-10 bottom-0 top-0 left-0 right-0 flex justify-center items-center backdrop-blur-sm"
    >
      <div
        onClick={(e) => {
          e.stopPropagation();
        }}
        className="flex flex-col items-center justify-around h-1/2 w-1/3 bg-zinc-900 border-2 border-zinc-800 rounded-xl p-8"
      >
        <p className="text-4xl font-bold">Create a room</p>
        <section className="h-full flex flex-col gap-4 justify-center">
          <p className="text-xl font-bold mx-auto">Give it a title</p>
          <form
            onSubmit={handleSumbit}
            className="w-full h-12 bg-zinc-00 flex rounded-xl overflow-hidden"
          >
            <input
              className="w-full bg-zinc-700 px-8 outline-none"
              onChange={handleChange}
            />
            <button
              onClick={handleSumbit}
              type="button"
              className="w-4/12 flex justify-center items-center bg-green-600"
            >
              <MdDone size="32" className="drop-shadow-lg" />
            </button>
          </form>
        </section>
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
