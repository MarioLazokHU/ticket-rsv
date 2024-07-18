import { useEffect, useState } from "react";
import { FlightBooking } from "../utils/interfacees";
import { getCookie } from "../utils/cookies";
import { BASE_URL } from "../utils/config";
import { Typography, Card, Grid } from "@mui/material";

const UserBookings = () => {
  const [userBookings, setUserBookings] = useState<FlightBooking[]>([]);

  const getUserBookings = async () => {
    const userId = getCookie("user").id;
    if (userId) {
      const req = await fetch(`${BASE_URL}/booking/user-bookings/${userId}`);
      const res = await req.json();
      if (res) {
        setUserBookings(res);
      }
    }
  };

  useEffect(() => {
    getUserBookings();
  }, []);
  return (
    <>
      <div className="w-full p-20 flex flex-col gap-5 items-center justify-center">
        <Typography variant="h3">
          {getCookie("user").name}'s Bookings
        </Typography>
        <Card className="w-full p-10">
          <Grid className="w-full border-b" container spacing={1}>
            <Grid item xs={2}>
              <div>Departue</div>
            </Grid>
            <Grid item xs={2}>
              <div>Arrival</div>
            </Grid>
            <Grid item xs={1}>
              <div>Flight Date</div>
            </Grid>
            <Grid item xs={1}>
              <div>Flight time</div>
            </Grid>
            <Grid item xs={1}>
              <div>Total price</div>
            </Grid>
            <Grid item xs={1}>
              <div>Seats</div>
            </Grid>
            <Grid item xs={2}>
              <div>User</div>
            </Grid>
            <Grid item xs={2}>
              <div>Extras</div>
            </Grid>
          </Grid>
          {userBookings &&
            userBookings.map((b, index) => {
              return (
                <Grid
                  key={b.id}
                  className={`w-full pt-3 pb-3 border-b border-white/20 ${
                    index % 2 !== 0 ? "bg-gray-800/50" : ""
                  }`}
                  container
                  spacing={1}
                >
                  <Grid item xs={2}>
                    <div>{b.flight.departueAirport.country}</div>
                    <div className="text-sm text-white/50">
                      {b.flight.departueAirport.name}
                    </div>
                  </Grid>
                  <Grid item xs={2}>
                    <div>{b.flight.arrivalAirport.country}</div>
                    <div className="text-sm text-white/50">
                      {b.flight.arrivalAirport.name}
                    </div>
                  </Grid>
                  <Grid item xs={1}>
                    <div>{b.flight.departureDate.split("T")[0]}</div>
                    <div className="text-sm text-white/50">
                      {b.flight.departureDate.split("T")[1].split(".")[0]}
                    </div>
                  </Grid>
                  <Grid item xs={1}>
                    <div>{b.flight.flightTime / 60} h </div>
                  </Grid>
                  <Grid item xs={1}>
                    <div>
                      {b.flight.price +
                        b.extras.reduce(
                          (total, se) => total + se.price,
                          0,
                        )}{" "}
                      Ft
                    </div>
                  </Grid>
                  <Grid className="flex flex-wrap" item xs={1}>
                    {b.seats.map((s) => {
                      return <div className="pl-1">[{s.position}]</div>;
                    })}
                  </Grid>
                  <Grid item xs={2}>
                    <div>{b.user.name}</div>
                    <div className="text-sm text-white/50">{b.user.email}</div>
                  </Grid>
                  <Grid item xs={2}>
                    {b.extras.map((e) => {
                      return (
                        <div className="flex items-center justify-between">
                          <div>{e.name}</div>
                          <div className="text-sm text-white/50">
                            {e.price} Ft
                          </div>
                        </div>
                      );
                    })}
                  </Grid>
                </Grid>
              );
            })}
        </Card>
      </div>
    </>
  );
};

export default UserBookings;
