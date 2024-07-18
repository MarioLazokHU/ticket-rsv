import { useEffect, useState } from "react";
import { Card, Grid, TextField, Typography, Button } from "@mui/material";
import { BASE_URL } from "../../utils/config";

export interface AirportData {
  name?: string;
  country?: string;
  city?: string;
  id?: string;
}

interface AirportsProps {
  setSaveProgress: (progress: boolean) => void;
}

const Airports = ({ setSaveProgress }: AirportsProps) => {
  const [airportData, setAirportData] = useState<AirportData>({});
  const [savedAirports, setSavedAirports] = useState<AirportData[]>([]);

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

  const handleAirportDataChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setAirportData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmtiAirport = async () => {
    setSaveProgress(true);
    const req = await fetch(`${BASE_URL}/admin/save-airport`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(airportData),
    });
    const res = await req.json();

    if (res && res.id) {
      setAirportData({});
      setSaveProgress(false);
      await getAirports();
    }
  };

  return (
    <div className="flex flex-col justify-center gap-5">
      <Typography variant="h3">Airports</Typography>
      <Card elevation={3} className="p-10 mt-5 gap-3 flex flex-col">
        <Typography variant="h5">New Airport</Typography>
        <TextField
          value={airportData.name || ""}
          onChange={handleAirportDataChange}
          name="name"
          variant="standard"
          label="Airport Name"
          required
        />
        <TextField
          value={airportData.country || ""}
          onChange={handleAirportDataChange}
          name="country"
          variant="standard"
          label="Airport Country"
          required
        />
        <TextField
          value={airportData.city || ""}
          onChange={handleAirportDataChange}
          name="city"
          variant="standard"
          label="Airport City"
          required
        />
        <Button variant="contained" onClick={handleSubmtiAirport}>
          Submit
        </Button>
      </Card>
      <Card elevation={3} className="p-10 flex flex-col gap-4 items-center justify-center">
        <Typography variant="h5">Airports</Typography>
        <Grid className="w-full border-b" container spacing={2}>
          <Grid item xs={3}>
            <div>Name</div>
          </Grid>
          <Grid item xs={3}>
            <div>Country</div>
          </Grid>
          <Grid item xs={3}>
            <div>City</div>
          </Grid>
          <Grid item xs={3}>
            <div>Options</div>
          </Grid>
        </Grid>
        {savedAirports.map((ad: AirportData, index) => (
          <Grid
            key={ad.id}
            className={`w-full pt-3 pb-3 border-b border-white/20 ${
              index % 2 !== 0 ? "bg-gray-800/50" : ""
            }`}
            container
            spacing={2}
          >
            <Grid item xs={3}>
              <div>{ad.name}</div>
            </Grid>
            <Grid item xs={3}>
              <div>{ad.country}</div>
            </Grid>
            <Grid item xs={3}>
              <div>{ad.city}</div>
            </Grid>
            <Grid item xs={3}>
              <div></div>
            </Grid>
          </Grid>
        ))}
      </Card>
    </div>
  );
};

export default Airports;
