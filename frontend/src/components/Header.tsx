import { Typography } from "@mui/material";
import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "./context/AuthContext";
import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHome,
  faLock,
  faRightToBracket,
  faTicket,
  faUser,
  faUserPlus,
} from "@fortawesome/free-solid-svg-icons";
import { getCookie } from "../utils/cookies";

const Header = () => {
  const [role, setRole] = useState("user");
  const { loggedIn, userRole } = useAuth();
  const navigate = useNavigate();
  useEffect(() => {
    if (loggedIn) {
      navigate("/");
    }
    if (userRole === "admin") {
      setRole("admin");
    }
  }, [role, loggedIn]);

  return (
    <>
      <header className="w-screen z-30 flex justify-between pl-10 pr-20 items-center h-28 top-0 shadow-lg fixed bg-dark">
        <NavLink to="/" className="flex justify-center gap-2 items-center">
          <Typography variant="h2">BlackBox Air Services</Typography>
        </NavLink>

        <div className="flex ">
          {loggedIn ? (
            <>
              <div className="flex flex-row gap-5">
                <NavLink className="flex items-center gap-4" to="/">
                  <FontAwesomeIcon icon={faHome} />
                  Home
                </NavLink>
                {role === "admin" && (
                  <>
                    <NavLink
                      className="flex items-center gap-4"
                      to="/admin/flights"
                    >
                      <FontAwesomeIcon size="lg" icon={faLock} />
                      Admin
                    </NavLink>
                  </>
                )}

                <NavLink className="flex items-center gap-4" to="/my-bookings">
                  <FontAwesomeIcon icon={faTicket} />
                  My Flight Bookings
                </NavLink>
                <NavLink className="flex items-center gap-2" to="/account">
                  <FontAwesomeIcon size="lg" icon={faUser} />
                  {getCookie("user").name ?? "Account"}
                </NavLink>
              </div>
            </>
          ) : (
            <>
              <div className="flex flex-row gap-5">
                <NavLink className="flex items-center gap-2" to="/register">
                  <FontAwesomeIcon size="lg" icon={faUserPlus} />
                  Register
                </NavLink>
                <NavLink className="flex items-center gap-2" to="/login">
                  <FontAwesomeIcon size="lg" icon={faRightToBracket} />
                  Login
                </NavLink>
              </div>
            </>
          )}
        </div>
      </header>
    </>
  );
};
export default Header;
