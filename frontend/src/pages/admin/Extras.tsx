import { useEffect, useState } from "react";
import { Card, Grid, TextField, Typography, Button, Alert } from "@mui/material";
import { BASE_URL } from "../../utils/config";

export interface ExtrasData {
  name?: string;
  price?: number;
  description?: string;
  id?: string;
}

interface ExtrasProps {
  setSaveProgress: (progress: boolean) => void;
}

const Extras = ({ setSaveProgress }: ExtrasProps) => {
  const [extraData, setExtraData] = useState<ExtrasData>({});
  const [savedExtras, setSavedExtras] = useState<ExtrasData[]>([]);
  const [error, setError] = useState(false)

  useEffect(() => {
    getExtras();
  }, []);

  const getExtras = async () => {
    const req = await fetch(`${BASE_URL}/admin/extras`);
    const res = await req.json();
    if (res) {
      setSavedExtras(res);
    }
  };

  const handleExtraDataChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setExtraData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmtiExtra = async () => {
    // TODO: use zod for data validation
    if(extraData.name && extraData.price && extraData.description){
    setSaveProgress(true);
    const req = await fetch(`${BASE_URL}/admin/save-extra`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(extraData),
    });
    const res = await req.json();

    if (res && res.id) {
      setExtraData({});
      setSaveProgress(false);
      setError(false)
      await getExtras();
    }
  }else{
    setError(true)
  }
  };

  return (
    <div className="flex flex-col justify-center gap-5">
      <Typography variant="h3">Extras</Typography>
      <Card elevation={3} className="p-10 mt-5 gap-3 flex flex-col">
        <Typography variant="h5">New Extra</Typography>
        <TextField
          value={extraData.name || ""}
          onChange={handleExtraDataChange}
          name="name"
          variant="standard"
          label="Extra Name"
          required
        />
        <TextField
          value={extraData.description || ""}
          onChange={handleExtraDataChange}
          name="description"
          variant="standard"
          label="Description"
          multiline
          rows={4}
          required
        />
        <TextField
          value={extraData.price || ""}
          onChange={handleExtraDataChange}
          name="price"
          variant="standard"
          label="Price"
          required
        />
        <Button variant="contained" onClick={handleSubmtiExtra}>
          Submit
        </Button>
        {error && <Alert severity="error">Please fill all data!</Alert>}
      </Card>
      <Card
        elevation={3}
        className="p-10 flex flex-col gap-4 items-center justify-center"
      >
        <Typography variant="h5">Extras</Typography>
        <Grid className="w-full border-b" container spacing={2}>
          <Grid item xs={2}>
            <div>Name</div>
          </Grid>
          <Grid item xs={8}>
            <div>Description</div>
          </Grid>
          <Grid item xs={1}>
            <div>Price</div>
          </Grid>
          <Grid item xs={1}>
            <div>Options</div>
          </Grid>
        </Grid>
        {savedExtras &&
          savedExtras.map((se: ExtrasData, index) => (
            <Grid
              key={se.id}
              className={`w-full pt-3 pb-3 border-b border-white/20 ${
                index % 2 !== 0 ? "bg-gray-800/50" : ""
              }`}
              container
              spacing={2}
            >
              <Grid item xs={2}>
                <div>{se.name}</div>
              </Grid>

              <Grid item xs={8}>
                <div>{se.description}</div>
              </Grid>
              <Grid item xs={1}>
                <div>{se.price} Ft</div>
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

export default Extras;
