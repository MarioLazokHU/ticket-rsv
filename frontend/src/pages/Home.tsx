import {
  Alert,
  Button,
  Card,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { useEffect, useState } from "react";
import { AirportData } from "./admin/Airports";
import { BASE_URL } from "../utils/config";
import { faList, faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import dayjs from "dayjs";
import { Flight } from "./admin/Flights";
import { NavLink } from "react-router-dom";

const Home = () => {
  const [savedAirports, setSavedAirports] = useState<AirportData[]>([]);
  const [searchFlightsParams, setSearchFlightsParams] = useState({
    departueAirport: "",
    arrivalAirport: "",
    departureDate: dayjs().format("YYYY-MM-DD"),
    passengers: 1,
  });
  const [flightsResultList, setFlightsResultList] = useState<Flight[]>([]);
  const [errorStatus, setErrorStatus] = useState<{status: number, message: string}>()

  useEffect(() => {
    getAirports();
  }, []);

  const getAirports = async () => {
    const req = await fetch(`${BASE_URL}/admin/airports`);
    const res = await req.json();
    if (res) {
      setSavedAirports(res);
    }
  };

  const handleSearchFlights = async () => {
    const req = await fetch(`${BASE_URL}/booking/search`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(searchFlightsParams),
    });
    const res = await req.json();
    if (res && Array.isArray(res)) {
      setFlightsResultList(res);
    }else{
      setErrorStatus(res)
    }
  };

  const handleAllFlights = async () => {
    const req = await fetch(`${BASE_URL}/admin/flights`);
    const res = await req.json();
    if (res) {
      setFlightsResultList(res);
    }
  };

  return (
    <>
      <div className="flex flex-col items-center p-20 gap-20">
        <div className="w-full flex justify-center ">
          <Card
            elevation={3}
            className="flex w-fit p-10 gap-5 flex-col justify-center items-start"
          >
            <Typography variant="h5">Find flights</Typography>
            <div className="flex items-center p-5 gap-5 justify-start">
              <div className="w-60">
                <InputLabel>Departure Airport</InputLabel>
                <Select
                  value={searchFlightsParams.departueAirport || ""}
                  onChange={(e) =>
                    setSearchFlightsParams({
                      ...searchFlightsParams,
                      departueAirport: e.target.value,
                    })
                  }
                  required
                  className="w-60"
                  variant="outlined"
                  name="departueAirport"
                >
                  {savedAirports.map((sa: AirportData, index) => (
                    <MenuItem selected={index === 0} key={sa.id} value={sa.id}>
                      {sa.country} <div>({sa.name})</div>
                    </MenuItem>
                  ))}
                </Select>
              </div>
              <div className="w-60">
                <InputLabel>Arrival Airport</InputLabel>
                <Select
                  value={searchFlightsParams.arrivalAirport || ""}
                  onChange={(e) =>
                    setSearchFlightsParams({
                      ...searchFlightsParams,
                      arrivalAirport: e.target.value,
                    })
                  }
                  required
                  className="w-60"
                  variant="outlined"
                  name="arrivalAirport"
                >
                  {savedAirports.map((sa: AirportData) => (
                    <MenuItem key={sa.id} value={sa.id}>
                      {sa.country} <div>({sa.name})</div>
                    </MenuItem>
                  ))}
                </Select>
              </div>
              <div>
                <InputLabel>Departure Date</InputLabel>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DatePicker
                    value={dayjs(searchFlightsParams.departureDate)}
                    onChange={(date) =>
                      setSearchFlightsParams({
                        ...searchFlightsParams,
                        departureDate: dayjs(date).format("YYYY-MM-DD"),
                      })
                    }
                  />
                </LocalizationProvider>
              </div>
              <div>
                <InputLabel>Passengers</InputLabel>
                <TextField
                  type="number"
                  value={searchFlightsParams.passengers}
                  onChange={(e) =>
                    setSearchFlightsParams({
                      ...searchFlightsParams,
                      passengers: parseInt(e.target.value),
                    })
                  }
                />
              </div>

              <Button
                className="flex h-14 gap-2"
                variant="contained"
                size="large"
                onClick={handleSearchFlights}
              >
                Search <FontAwesomeIcon icon={faMagnifyingGlass} />
              </Button>
              <Button
                className="flex h-14 gap-2"
                variant="contained"
                size="large"
                onClick={handleAllFlights}
              >
                All Flight <FontAwesomeIcon icon={faList} />
              </Button>
            </div>
          </Card>
        </div>
        {errorStatus && errorStatus.status && <Alert severity="warning">Flight Not Found</Alert>}
        {flightsResultList.length > 0 && (
          <>
            <Typography variant="h4">Results:</Typography>
            <div className="flex w-full justify-center gap-10 flex-wrap">
              {flightsResultList.map((fr) => {
                return (
                  <Card
                    elevation={3}
                    className="p-5 w-96 flex flex-col items-center justify-center gap-3"
                    key={fr.id}
                  >
                    <Typography variant="h5">
                      {fr.departueAirport.country} - {fr.arrivalAirport.country}
                    </Typography>
                    <img className="w-80" src="/stock-plane.jpg" />
                    <Typography variant="h4">Price: {fr.price} Ft</Typography>
                    <Paper className="p-2 text-xl" elevation={3}>
                      Avaidable free seats:{" "}
                      {fr.seats.filter((seat) => !seat.isBooked).length}
                    </Paper>
                    <Paper className="p-2 text-xl" elevation={3}>
                      <Typography>
                        Departure:{" "}
                        {fr.departureDate.split("T")[0] +
                          " " +
                          fr.departureDate.split("T")[1].split(".")[0]}
                      </Typography>
                    </Paper>
                    <NavLink to={`/booking?flight=${fr.id}`}>
                      <Button size="large" variant="contained">
                        Book now
                      </Button>
                    </NavLink>
                  </Card>
                );
              })}
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default Home;
