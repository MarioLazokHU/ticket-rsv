import { useEffect, useState } from "react";
import {
  Card,
  Grid,
  TextField,
  Typography,
  Button,
  Select,
  MenuItem,
  InputLabel,
  Tooltip,
} from "@mui/material";
import { BASE_URL } from "../../utils/config";
import { AirportData } from "./Airports";
import dayjs, { Dayjs } from "dayjs";
import { LocalizationProvider, DateTimePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

interface Airport {
  city: string;
  country: string;
  name: string;
  id: string;
}

interface Seat {
  position: string;
  isBooked: boolean;
  id: string;
}

export interface Flight {
  departureDate: string;
  price: number;
  id: string;
  flightTime: string;
  arrivalAirport: Airport;
  departueAirport: Airport;
  seats: Seat[];
}

interface FlightsProps {
  setSaveProgress: (progress: boolean) => void;
}

const Flights = ({ setSaveProgress }: FlightsProps) => {
  const [flightsData, setFlightsData] = useState({
    departureDate: dayjs().format("YYYY-MM-DD hh:mm"),
    price: "",
    departueAirport: "",
    arrivalAirport: "",
    flightTime: "",
  });
  const [savedFlights, setSavedFlights] = useState<Flight[]>([]);
  const [savedAirports, setSavedAirports] = useState<AirportData[]>([]);

  useEffect(() => {
    getFlights();
    getAirports();
  }, []);

  const getAirports = async () => {
    const req = await fetch(`${BASE_URL}/admin/airports`);
    const res = await req.json();
    if (res) {
      setSavedAirports(res);
    }
  };

  const getFlights = async () => {
    const req = await fetch(`${BASE_URL}/admin/flights`);
    const res = await req.json();
    if (res) {
      setSavedFlights(res);
    }
  };

  const handleSubmitFlight = async () => {
    setSaveProgress(true);
    const req = await fetch(`${BASE_URL}/admin/save-flight`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(flightsData),
    });
    const res = await req.json();

    if (res && res.id) {
      setFlightsData({
        departureDate: dayjs().format("YYYY-MM-DD hh:mm"),
        price: "",
        departueAirport: "",
        arrivalAirport: "",
        flightTime: "",
      });
      setSaveProgress(false);
      await getFlights();
    }
  };

  return (
    <div className="flex flex-col justify-center gap-5">
      <Typography variant="h3">Flights</Typography>
      <Card elevation={3} className="p-10 mt-5 gap-3 flex flex-col">
        <Typography variant="h5">New Flight</Typography>

        <InputLabel>Departure Date</InputLabel>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DateTimePicker
            views={["year", "month", "day", "hours", "minutes"]}
            value={dayjs(flightsData.departureDate)}
            onChange={(date) => {
              if (date) {
                setFlightsData({
                  ...flightsData,
                  departureDate: date.toDate().toDateString(),
                });
              }
            }}
          />
        </LocalizationProvider>
        <TextField
          value={flightsData.price || ""}
          onChange={(e) =>
            setFlightsData({ ...flightsData, price: e.target.value })
          }
          name="price"
          variant="standard"
          label="Price"
          required
        />
        <TextField
          value={flightsData.flightTime || ""}
          onChange={(e) =>
            setFlightsData({ ...flightsData, flightTime: e.target.value })
          }
          name="flightTime"
          variant="standard"
          label="Flight Time"
          required
        />
        <InputLabel id="departureAirport">Departure Airport*</InputLabel>
        <Select
          value={flightsData.departueAirport || ""}
          required
          variant="standard"
          labelId="departureAirport"
          name="departueAirport"
          onChange={(e) =>
            setFlightsData({ ...flightsData, departueAirport: e.target.value })
          }
        >
          {savedAirports.map((sa) => (
            <MenuItem key={sa.id} value={sa.id}>
              {sa.name} ({sa.country})
            </MenuItem>
          ))}
        </Select>
        <InputLabel id="arrivalAirport">Arrival Airport*</InputLabel>
        <Select
          value={flightsData.arrivalAirport || ""}
          required
          variant="standard"
          labelId="arrivalAirport"
          name="arrivalAirport"
          onChange={(e) =>
            setFlightsData({ ...flightsData, arrivalAirport: e.target.value })
          }
        >
          {savedAirports.map((sa) => (
            <MenuItem key={sa.id} value={sa.id}>
              {sa.name} ({sa.country})
            </MenuItem>
          ))}
        </Select>

        <Button variant="contained" onClick={handleSubmitFlight}>
          Submit
        </Button>
      </Card>
      <Card
        elevation={3}
        className="p-10 flex flex-col gap-4 items-center justify-center"
      >
        <Typography variant="h5">Flights</Typography>
        <Grid className="w-full border-b" container spacing={2}>
          <Grid item xs={2}>
            <div>Departue</div>
          </Grid>
          <Grid item xs={2}>
            <div>Arrival</div>
          </Grid>
          <Grid item xs={2}>
            <div>Flight Date</div>
          </Grid>
          <Grid item xs={1}>
            <div>Flight time </div>
          </Grid>
          <Grid item xs={2}>
            <div>Price</div>
          </Grid>
          <Grid item xs={2}>
            <div>Seats</div>
          </Grid>
          <Grid item xs={1}>
            <div>Options</div>
          </Grid>
        </Grid>
        {savedFlights &&
          savedFlights.map((sf: Flight, index) => (
            <Grid
              key={sf.id}
              className={`w-full pt-3 pb-3 border-b border-white/20 ${
                index % 2 !== 0 ? "bg-gray-800/50" : ""
              }`}
              container
              spacing={2}
            >
              <Grid item xs={2}>
                <Tooltip title={sf.departueAirport.city} arrow>
                  <div className="flex flex-col">
                    <span>{sf.departueAirport.country}</span>
                    <span className="text-xs text-white/60">
                      {sf.departueAirport.name}{" "}
                    </span>
                  </div>
                </Tooltip>
              </Grid>
              <Grid item xs={2}>
                <Tooltip title={sf.arrivalAirport.city} arrow>
                  <div className="flex flex-col">
                    <span>{sf.arrivalAirport.country}</span>
                    <span className="text-xs text-white/60">
                      {sf.arrivalAirport.name}{" "}
                    </span>
                  </div>
                </Tooltip>
              </Grid>
              <Grid item xs={2}>
                <div>
                  {sf.departureDate.split("T")[0] +
                    " " +
                    sf.departureDate.split("T")[1].split(".")[0].slice(0, 5)}
                </div>
              </Grid>
              <Grid item xs={1}>
                <div>{sf.flightTime} min</div>
              </Grid>
              <Grid item xs={2}>
                <div>{sf.price} Ft</div>
              </Grid>
              <Grid item xs={2}>
                <div>{sf.seats.length}</div>
              </Grid>
              <Grid item xs={1}>
                <div></div>
              </Grid>
            </Grid>
          ))}
      </Card>
    </div>
  );
};

export default Flights;
