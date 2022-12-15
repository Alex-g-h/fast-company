import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import Avatar from "../common/avatar";

const NavProfile = () => {
  const { currentUser } = useAuth();
  const [isOpen, setOpen] = useState(false);

  const toggleDropdown = () => {
    setOpen((prevState) => !prevState);
  };

  return (
    <div className="dropdown" onClick={toggleDropdown}>
      <div className="btn dropdown-toggle d-flex align-items-center">
        <div className="me-2">{currentUser.name}</div>
        <Avatar
          name={currentUser.name}
          width="40"
          classAddon="img-responsive"
        />
      </div>
      <div className={"w-100 dropdown-menu" + (isOpen ? " show" : "")}>
        <Link to={`/users/${currentUser._id}`} className="dropdown-item">
          Profile
        </Link>
        <Link to="/logout" className="dropdown-item">
          Log out
        </Link>
      </div>
    </div>
  );
};

export default NavProfile;
