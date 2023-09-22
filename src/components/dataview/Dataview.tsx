import {
  Button,
  Card,
  CardActions,
  CardContent,
  Input,
  LinearProgress,
  Stack,
  Typography,
} from "@mui/joy";
import { ActionType, context } from "../../store/app.store";
import { useContext } from "react";
import FolderIcon from "@mui/icons-material/Folder";
import { ipcRenderer } from "electron";
import React from "react";
// eslint-disable-next-line react-refresh/only-export-components
const DataView = () => {
  const { state, dispatch } = useContext(context);
  const { progress } = state;
  return (
    <Card
      sx={{
        maxHeight: "410px",
        maxWidth: "300px",
        width: 300,
        overflowx: "auto",
        minHeight: 300,
      }}
    >
      <CardContent orientation="vertical">
        <div>
          <Typography fontSize="lg" fontWeight="lg" textAlign={"right"}>
            Total - {state.dataObj.counter} Ads
          </Typography>
        </div>
      </CardContent>

      <CardContent orientation="vertical">
        <Input
          value={state.filePath}
          startDecorator={<FolderIcon />}
          endDecorator={
            <Button
              onClick={async () => {
                console.log("click path open");
                const e = await ipcRenderer.invoke("openPathDialog");
                dispatch({
                  type: ActionType.SET_FILE_PATH,
                  payload: e.filePaths,
                });
              }}
            >
              Set Location
            </Button>
          }
        />
        <Stack
          spacing={1}
          direction={"row"}
          px={2}
          py={1}
          sx={{ alignItems: "center", justifyContent: "space-between" }}
        >
          <Typography level="body-md"> Threads - </Typography>
          <Input
            type="number"
            sx={{ width: 60 }}
            value={state.threads}
            onChange={(e) => {
              const val = parseInt(e.target.value);
              if (val >= 4 && val <= 30)
                dispatch({
                  type: ActionType.SET_THREAD,
                  payload: val,
                });
            }}
          ></Input>
        </Stack>
      </CardContent>
      <CardContent orientation="horizontal">
        <Card variant="soft" color="primary" invertedColors>
          <CardContent orientation="vertical" sx={{ textAlign: "justify" }}>
            <Typography level="body-lg">
              {" "}
              <b>Estae</b> - {state.filters.estate}
            </Typography>
            <Typography level="body-lg">
              {" "}
              <b>Location</b> - {state.filters.city}
            </Typography>
            <Typography level="body-lg">
              <b>transaction</b> - {state.filters.transaction}
            </Typography>
            <Typography level="body-lg">
              <b>FilePath</b> - {state.filePath}
            </Typography>
            <Typography level="body-lg">
              <b>Threads</b> - {state.threads}
            </Typography>
          </CardContent>
        </Card>
      </CardContent>
      <CardContent orientation="vertical">
        <div>
          {state.progress && (
            <LinearProgress
              variant="plain"
              determinate
              value={
                typeof progress == "boolean" ? 0 : (state.progress as number)
              }
              sx={{
                "--LinearProgress-thickness": "15px",
                "--LinearProgress-radius": "1px",
                "--LinearProgress-progressRadius": "7px",
              }}
              thickness={32}
            >
              <Typography
                level="body-xs"
                fontWeight="xl"
                textColor="common.white"
                sx={{ mixBlendMode: "difference" }}
              >
                LOADING…
              </Typography>
            </LinearProgress>
          )}
        </div>
      </CardContent>
      <CardActions>
        <Button
          disabled={state.running}
          onClick={() => {
            if (
              state.completed &&
              state.filePath != "N/A" &&
              state.filePath != ""
            ) {
              const filePath = `${state.filePath}/${state.filters.city}_${state.filters.estate}_${state.filters.transaction}_.json`;
              dispatch({
                type: ActionType.SET_RUNNING_STATE,
                payload: true,
              });
              
              window.MyApi.onSubmit(state.filters, filePath);
              dispatch({ type: ActionType.CLEAR_LOG, payload: null });
            } else {
              window.alert("SET File Path");
            }
          }}
        >
          Start Fetch
        </Button>
      </CardActions>
    </Card>
  );
};
const ex = React.memo(DataView);
export default ex;
