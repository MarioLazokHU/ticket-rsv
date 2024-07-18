import { useEffect, useState } from "react";
import { BASE_URL } from "../../utils/config";
import { Card, Grid, Typography } from "@mui/material";
import { FlightBooking } from "../../utils/interfacees";

const Bookings = () => {
  const [bookings, setBookings] = useState<FlightBooking[]>([]);

  const getBookings = async () => {
    const req = await fetch(`${BASE_URL}/booking/bookings`);
    const res = await req.json();

    if (res) {
      setBookings(res);
    }
  };
  useEffect(() => {
    getBookings();
  }, []);

  return (
    <>
      <div className="w-full flex flex-col gap-5 items-center justify-center">
        <Typography variant="h3">Bookings list</Typography>
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
              <div>Flight price</div>
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
          {bookings &&
            bookings.map((b, index) => {
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
                    <div>{b.flight.price} Ft</div>
                  </Grid>
                  <Grid className="flex flex-wrap" item xs={1}>
                    {b.seats.map((s) => {
                      return <div>{s.position}</div>;
                    })}
                  </Grid>
                  <Grid item xs={2}>
                    <div>{b.user.name}</div>
                    <div className="text-sm text-white/50">{b.user.email}</div>
                  </Grid>
                  <Grid item xs={2}>
                    {b.extras.map((e) => {
                      return (
                        <div>
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
export default Bookings;
