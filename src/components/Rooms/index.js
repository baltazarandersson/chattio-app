import { useState } from "react";
import { MdAdd } from "react-icons/md";
import { useUserContext } from "../../context/UserContext";
import { useLoader } from "../../hooks/useLoader";
import { Loader } from "../Loader";
import { ModalPortal } from "../RoomModal";
import { UserContainer } from "../UserContainer";

export function Rooms() {
  const [showModal, setShowModal] = useState(false);
  const isLoading = useLoader();

  const { rooms, currentRoom, navigateRoom } = useUserContext();

  function toggleModal() {
    setShowModal(false);
  }
  function handleClick() {
    setShowModal(true);
  }

  return (
    <div className="h-full w-1/3 border-r-2 border-zinc-700 flex flex-col justify-between">
      <header
        style={{ minHeight: "4rem" }}
        className="w-full h-16 flex justify-between items-center px-8 border-b-2 border-zinc-700"
      >
        <p>Rooms</p>
        <button
          onClick={handleClick}
          className="p-1 bg-zinc-700 box-content rounded-full"
        >
          <MdAdd size={24} />
        </button>
      </header>
      <section className="w-full h-full flex flex-col gap-2 p-4">
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
                  onClick={() => navigateRoom(room)}
                  className="w-full py-4 px-8 border-2 border-zinc-800 rounded-xl"
                >
                  {room}
                </button>
              );
            }
          })
        )}
      </section>
      <UserContainer />
      {showModal && <ModalPortal toggleModal={toggleModal} />}
    </div>
  );
}
