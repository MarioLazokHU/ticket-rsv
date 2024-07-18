import { useEffect, useState } from "react";
import { Flight } from "./admin/Flights";
import { BASE_URL } from "../utils/config";
import {
  Button,
  Card,
  Checkbox,
  Dialog,
  DialogActions,
  DialogTitle,
  Grid,
  Typography,
} from "@mui/material";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { getCookie } from "../utils/cookies";
import { NavLink } from "react-router-dom";
import dayjs from "dayjs";

export interface ExtrasData {
  name: string;
  price: number;
  description: string;
  id: string;
}

const Booking = () => {
  const [flightData, setFlightsData] = useState<Flight>();
  const [extrasData, setExtrasData] = useState<ExtrasData[]>([]);
  const [selectedExtras, setSelectedExtras] = useState<ExtrasData[]>([]);
  const [seatIDs, setSeatIDs] = useState<string[]>([]);
  const [successDialog, setSuccesDialog] = useState(false);
  const params = new URLSearchParams(window.location.search);
  const flightId = params.get("flight");

  const handleIntervall = (depDate: string, flightTime: number) => {
    const arrivalDate = dayjs(depDate).add(flightTime, "minute").format();
    if (arrivalDate) {
      return arrivalDate.split("T")[0]+' '+arrivalDate.split("T")[1].split('+')[0];
    }
  };

  const getFlightData = async () => {
    const req = await fetch(`${BASE_URL}/booking/flight/${flightId}`);
    const res = await req.json();
    if (res) {
      setFlightsData(res);
    }
  };

  const getExtras = async () => {
    const req = await fetch(`${BASE_URL}/admin/extras`);
    const res = await req.json();
    if (res) {
      setExtrasData(res);
    }
  };

  const handleBooking = async () => {
    const extraIds = selectedExtras.map((e) => e.id);
    const userId = getCookie("user").id;
    const req = await fetch(`${BASE_URL}/booking/save`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        flightId: flightId,
        userId: userId,
        extraIds: extraIds,
        seatIds: seatIDs,
      }),
    });

    const res = await req.json();

    if (res) {
      setSuccesDialog(true);
    }
  };

  useEffect(() => {
    getFlightData();
    getExtras();
  }, [flightId]);

  const handleCheckboxChange = (extra: ExtrasData, checked: boolean) => {
    if (checked) {
      setSelectedExtras((prevSelected) => [...prevSelected, extra]);
    } else {
      setSelectedExtras((prevSelected) =>
        prevSelected.filter((se) => se.id !== extra.id)
      );
    }
  };
  return (
    <>
      {successDialog && (
        <Dialog open={successDialog}>
          <DialogTitle id="alert-dialog-title">
            {"Your reservation is success!"}
          </DialogTitle>
          <DialogActions>
            <NavLink to={"/"} onClick={() => setSuccesDialog(false)}>
              <Button variant="contained">Ok</Button>
            </NavLink>
          </DialogActions>
        </Dialog>
      )}
      <div className="flex gap-5">
        <div className="w-full flex flex-col gap-10 items-center justify-center">
          <Card
            elevation={3}
            className="p-10 flex flex-col items-center justify-center w-[60dvw]"
          >
            <Grid className="w-full text-2xl" container spacing={1}>
              <Grid
                alignItems={"center"}
                className="flex items-center justify-center"
                item
                xs={4}
              >
                <div>{flightData?.departueAirport.country}</div>
              </Grid>
              <Grid
                alignItems={"center"}
                className="flex items-center justify-center"
                item
                xs={2}
              >
                <div>
                  <FontAwesomeIcon size="2x" icon={faArrowRight} />
                </div>
              </Grid>
              <Grid
                alignItems={"center"}
                className="flex items-center  justify-center"
                item
                xs={4}
              >
                <div>{flightData?.arrivalAirport.country}</div>
              </Grid>
            </Grid>
            <Grid className="w-full" container spacing={1}>
              <Grid
                alignItems={"center"}
                className="flex items-center text-white/50  justify-center"
                item
                xs={4}
              >
                <div>{flightData?.departueAirport.name}</div>
              </Grid>
              <Grid
                className="flex items-center justify-center"
                item
                xs={2}
              ></Grid>
              <Grid
                alignItems={"center"}
                className="flex items-center text-white/50 justify-center"
                item
                xs={4}
              >
                <div>{flightData?.arrivalAirport.name}</div>
              </Grid>
            </Grid>
            <Grid className="w-full" container spacing={1}>
              <Grid className="text-center text-white/50 " item xs={4}>
                <div className="text-white/80 mt-2">Departure:</div>
                <div>
                  {flightData?.departureDate.split("T")[0]}{" "}
                  {flightData?.departureDate.split("T")[1].split(".")[0]}
                </div>
              </Grid>
              <Grid
                className="flex items-center justify-center"
                item
                xs={2}
              ></Grid>
              <Grid
                alignItems={"center"}
                className="text-center text-white/50 "
                item
                xs={4}
              >
                <div className="text-white/80 mt-2">Arrival:</div>
                <div>
                  {flightData &&
                    handleIntervall(
                      flightData?.departureDate,
                      parseInt(flightData?.flightTime)
                    ) }
                </div>
              </Grid>
            </Grid>
          </Card>
          <Card
            elevation={3}
            className="p-10 flex flex-col items-start gap-5 justify-center w-[60dvw]"
          >
            <Typography variant="h5">Extras: </Typography>
            <Grid
              className="w-full border-b flex flex-col gap-2"
              container
              spacing={1}
            >
              <Grid item xs={4}>
                <div>Name</div>
              </Grid>
              <Grid item xs={4}>
                <div>Description</div>
              </Grid>
              <Grid item xs={2}>
                Price
              </Grid>
              <Grid item xs={1}>
                Select
              </Grid>
            </Grid>
            {extrasData?.map((ed) => {
              return (
                <div className="w-full" key={ed.id}>
                  <Grid
                    className="w-full border-b border-white/20 flex flex-col gap-2"
                    container
                    spacing={1}
                  >
                    <Grid item xs={4}>
                      <div>{ed.name}</div>
                    </Grid>
                    <Grid item xs={4}>
                      <div>{ed.description}</div>
                    </Grid>
                    <Grid item xs={2}>
                      {ed.price} Ft
                    </Grid>
                    <Grid alignItems={"end"} item xs={1}>
                      <Checkbox
                        color="secondary"
                        onChange={(e) =>
                          handleCheckboxChange(ed, e.target.checked)
                        }
                      />
                    </Grid>
                  </Grid>
                </div>
              );
            })}
          </Card>
          <Card elevation={3} className="p-10 flex justify-around w-[60dvw]">
            <div className="flex flex-col items-start justify-center">
              <Typography className="border-b" variant="h5">
                Extra prices:{" "}
                {selectedExtras.reduce((total, se) => total + se.price, 0)} Ft
              </Typography>
              <Typography variant="h5">
                Total Price:{" "}
                {flightData &&
                  flightData.price * (seatIDs.length > 0 ? seatIDs.length : 1) +
                    selectedExtras.reduce(
                      (total, se) => total + se.price,
                      0
                    )}{" "}
                Ft
              </Typography>
            </div>
            <Button
              disabled={seatIDs.length === 0}
              onClick={handleBooking}
              variant="contained"
              size="large"
            >
              Checkout & Book
            </Button>
          </Card>
        </div>
        <Card
          elevation={3}
          className="w-96 h-fit flex flex-wrap justify-center items-center"
        >
          <Typography variant="h5" className="w-full p-2">
            Please select seat(s):
          </Typography>
          {flightData?.seats
            .sort((a, b) => a.position.localeCompare(b.position))
            .map((seat) => {
              return (
                <div
                  key={seat.id}
                  className="flex flex-col items-center justify-center w-1/6 p-1"
                >
                  <Checkbox
                    size="small"
                    color="secondary"
                    disabled={seat.isBooked}
                    onChange={(e) => {
                      const isChecked = e.target.checked;
                      if (isChecked) {
                        setSeatIDs((prevSeatIDs) => [...prevSeatIDs, seat.id]);
                      } else {
                        setSeatIDs((prevSeatIDs) =>
                          prevSeatIDs.filter((id) => id !== seat.id)
                        );
                      }
                    }}
                  />

                  <div>{seat.position}</div>
                </div>
              );
            })}
        </Card>
      </div>
    </>
  );
};

export default Booking;
