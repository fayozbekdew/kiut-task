import { SearchIcon } from "../assets";
import { useState } from "react";

function Navbar() {
  const [notification, setNotification] = useState(true);
  return (
    <div className="h-16 relative bg-white flex items-center pl-3">
      <p>KHeader</p>
    </div>
  );
}

export default Navbar;
