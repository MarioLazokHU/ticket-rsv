import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import { AuthProvider, useAuth } from "./components/context/AuthContext";

import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import Header from "./components/Header";
import Home from "./pages/Home";
import { Register } from "./pages/Register";
import { Login } from "./pages/Login";
import Admin from "./pages/admin/Admin";
import Booking from "./pages/Booking";
import UserBookings from "./pages/MyBookings";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#222831",
    },
    secondary: { main: "#FFD369" },
  },
});

function App() {
  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <AuthProvider>
        <Router>
          <MainContent />
        </Router>
      </AuthProvider>
    </ThemeProvider>
  );
}

function MainContent() {
  const { loggedIn, userRole } = useAuth();

  return (
    <div className="flex w-full">
      <Header />
      <div className="w-full mt-36 flex text-white items-center justify-center">
        <Routes>
          {loggedIn ? (
            <>
              <Route path="/" element={<Home />} />
              <Route path="/my-bookings" element={<UserBookings />} />
              <Route path="/booking" element={<Booking />} />
              {userRole === "admin" && (
                <Route path="/admin/*" element={<Admin />} />
              )}
            </>
          ) : (
            <>
              <Route path="/register" element={<Register />} />
              <Route path="/login" element={<Login />} />
            </>
          )}
        </Routes>
      </div>
    </div>
  );
}

export default App;
