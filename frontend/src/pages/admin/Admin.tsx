// src/pages/Admin.tsx

import { useEffect, useState } from "react";
import { useAuth } from "../../components/context/AuthContext";
import { redirect, Route, Routes, Link } from "react-router-dom";
import { Button, ButtonGroup, CircularProgress } from "@mui/material";
import Airports from "../admin/Airports";
import Flights from "../admin/Flights";
import Extras from "../admin/Extras";
import Bookings from "../admin/Bookings";

const Admin = () => {
  const [saveProgress, setSaveProgress] = useState(false);
  const { loggedIn, userRole } = useAuth();

  useEffect(() => {
    if (!loggedIn || userRole !== "admin") {
      throw redirect("/", 401);
    }
  }, [loggedIn, userRole]);

  return (
    <div className="w-full flex flex-col items-center justify-center pr-20 mb-20 pl-20">
      <ButtonGroup variant="contained" size="large">
        <Button component={Link} to="booking">
          Booking
        </Button>
        <Button component={Link} to="flights">
          Flights
        </Button>
        <Button component={Link} to="extras">
          Extra
        </Button>
        <Button component={Link} to="airports">
          Airports
        </Button>
      </ButtonGroup>
      {saveProgress && <CircularProgress className="absolute" />}
      <div className="mt-5 w-full">
        <Routes>
          <Route
            path="extras"
            element={<Extras setSaveProgress={setSaveProgress} />}
          />
          <Route
            path="airports"
            element={<Airports setSaveProgress={setSaveProgress} />}
          />
          <Route
            path="flights"
            element={<Flights setSaveProgress={setSaveProgress} />}
          />
          <Route path="booking" element={<Bookings />} />
        </Routes>
      </div>
    </div>
  );
};

export default Admin;
