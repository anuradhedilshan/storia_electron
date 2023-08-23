/* eslint-disable @typescript-eslint/no-unused-vars */
import Grid from "@mui/joy/Grid";
import Select from "./Select";
import FmdGoodIcon from "@mui/icons-material/FmdGood";
import SearchIcon from "@mui/icons-material/Search";
import Button from "@mui/joy/Button";
import { Card, CircularProgress } from "@mui/joy";
import { useContext } from "react";
import { ActionType, context } from "../../store/app.store";
const b = {
  FLAT: "apartament",
  STUDIO_FLAT: "garsoniere",
  HOUSE: "casa",
  INVESTMENT: "investitii",
  ROOM: "camera",
  TERRAIN: "teren",
  COMMERCIAL_PROPERTY: "spatiu-comercial",
  HALL: "depozite-hale",
  OFFICE: "birou",
};
const o = { SELL: "vanzare", RENT: "inchiriere" };
const loc = [
  "toata-romania",
  "Alba",
  "Arad",
  "Arges",
  "Bacau",
  "Bihor",
  "Bistrita-Nasaud",
  "Botosani",
  "Braila",
  "Brasov",
  "Bucuresti",
  "Buzau",
  "Calarasi",
  "Caras-Severin",
  "Cluj",
  "Constanta",
  "Covasna",
  "Dambovita",
  "Dolj",
  "Galati",
  "Giurgiu",
  "Gorj",
  "Harghita",
  "Hunedoara",
  "Ialomita",
  "Iasi",
  "Ilfov",
  "Maramures",
  "Mehedinti",
  "Mures",
  "Neamt",
  "Olt",
  "Prahova",
  "Salaj",
  "Satu Mare",
  "Sibiu",
  "Suceava",
  "Teleorman",
  "Timis",
  "Tulcea",
  "Valcea",
  "Vaslui",
  "Vrancea",
];


const Filter = () => {
  const { state, dispatch } = useContext(context);
  const handler = (name: string, newValue: string | null) => {
    console.log(name, newValue);
    dispatch({
      type: ActionType.SET_FILTER_VALUES,
      payload: { [name]: newValue },
    });
  };

  return (
    <Card variant="outlined" sx={{ minWidth: 443 }}>
      <Grid container spacing={1} sx={{ flexGrow: 1, flexShrink: "inherit" }}>
        <Grid>
          <Select
            handlerW={handler}
            value={state.filters.estate}
            name="estate"
            options={Object.keys(b)}
          ></Select>
        </Grid>
        <Grid>
          <Select
            handlerW={handler}
            name="transaction"
            value={state.filters.transaction}
            options={Object.keys(o)}
          ></Select>
        </Grid>
        <Grid>
          <Select
            handlerW={handler}
            value={state.filters.city}
            name="city"
            options={loc}
            startDecorator={<FmdGoodIcon />}
          ></Select>
        </Grid>
        <Grid>
          <Button
            sx={{ m: 1, minWidth: 120 }}
            variant="outlined"
            size="md"
            endDecorator={
              state.searchLoading ? (
                <CircularProgress variant="solid" />
              ) : (
                <SearchIcon />
              )
            }
            color="success"
            onClick={() => {
              dispatch({
                type: ActionType.SETSEARCHLOADING,
                payload: true,
              });
              dispatch({
                type: ActionType.SET_RUNNING_STATE,
                payload: true,
              });
              window.MyApi.getCount(state.filters);
            }}
          >
            Caută
          </Button>
        </Grid>
      </Grid>
    </Card>
    //
  );
};

export default Filter;
