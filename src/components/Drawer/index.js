import { useState } from "react";
import { CgMenu } from "react-icons/cg";
import { Rooms } from "../Rooms";

export function Drawer() {
  const [showDrawer, setShowDrawer] = useState(false);

  function toggleDrawer() {
    setShowDrawer((prevState) => !prevState);
  }

  return (
    <div className="h-full flex items-center sm:hidden ">
      <button onClick={toggleDrawer}>
        <CgMenu size={32} />
      </button>
      <nav
        className={`absolute transition-transform duration-500 left-0 top-0 right-0 bottom-0 bg-zinc-50 dark:bg-zinc-900 z-20 ${
          showDrawer ? "flex translate-x-0" : "-translate-x-full"
        }`}
      >
        <Rooms props={{ showDrawer, toggleDrawer }} />
      </nav>
    </div>
  );
}
