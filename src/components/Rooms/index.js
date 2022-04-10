import { useState } from "react";
import { MdAdd, MdClose } from "react-icons/md";
import { useUserContext } from "../../context/UserContext";
import { useLoader } from "../../hooks/useLoader";
import { Loader } from "../Loader";
import { ModalPortal } from "../RoomModal";
import { UserContainer } from "../UserContainer";

export function Rooms({ props } = {}) {
  const [showModal, setShowModal] = useState(false);
  const isLoading = useLoader();
  const { toggleDrawer } = props ? props : {};

  const { rooms, currentRoom, navigateRoom } = useUserContext();

  function toggleModal() {
    setShowModal(false);
  }
  function handleClick() {
    setShowModal(true);
  }

  return (
    <div className="h-full w-full border-r-2 border-zinc-700 flex-col justify-between flex">
      <header
        style={{ minHeight: "4rem" }}
        className="w-full h-16 flex justify-between items-center px-8 border-b-2 border-zinc-700"
      >
        <p>Rooms</p>
        <section className="flex gap-4">
          <button
            onClick={handleClick}
            className="p-1 bg-zinc-700 box-content rounded-full transition-transform hover:scale-125"
          >
            <MdAdd size={24} />
          </button>
          {toggleDrawer && (
            <button
              onClick={toggleDrawer}
              className="transition-transform hover:scale-125"
            >
              <MdClose size={24} />
            </button>
          )}
        </section>
      </header>
      <section className="w-full h-3/4 flex flex-col gap-2 p-4 overflow-auto">
        {isLoading ? (
          <div className="w-full h-full flex items-center justify-center">
            <Loader />
          </div>
        ) : (
          rooms &&
          currentRoom &&
          rooms.map((room) => {
            if (room === currentRoom.title) {
              return (
                <div
                  key={room}
                  className="w-full py-4 px-8 border-2 bg-zinc-800 border-zinc-700 rounded-xl text-center "
                >
                  {room}
                </div>
              );
            } else {
              return (
                <button
                  key={room}
                  onClick={() => {
                    navigateRoom(room);
                    toggleDrawer && toggleDrawer();
                  }}
                  className="w-full py-4 px-8 border-2 border-zinc-800 rounded-xl transition-colors hover:bg-zinc-800"
                >
                  {room}
                </button>
              );
            }
          })
        )}
      </section>
      <UserContainer props={toggleDrawer} />
      {showModal && <ModalPortal toggleModal={toggleModal} />}
    </div>
  );
}
