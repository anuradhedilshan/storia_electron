import React from "react";
import "./App.css";
import Filter from "./components/filter";
import { Container, Grid } from "@mui/joy";
import Proxylist from "./components/proxy_switcher/ProxyList";
import { ActionType } from "./store/app.store";
import { DataView } from "./components/dataview";
import { context } from "./store/app.store";
export default class APP extends React.Component {
  static contextType = context;
  declare context: React.ContextType<typeof context>;

  render(): React.ReactNode {
    window.MyApi.OnEvent = (
      type: "progress" | "count" | "complete",
      p: number | boolean
    ) => {
      switch (type) {
        case "count":
          console.log("Count", p);
          this.context.dispatch({
            type: ActionType.SETSEARCHLOADING,
            payload: false,
          });
          this.context.dispatch({
            type: ActionType.SETCOUNT,
            payload: { counter: p },
          });
          this.context.dispatch({
            type: ActionType.SET_RUNNING_STATE,
            payload: false,
          });
          break;
        case "progress":
          console.log("Progress++++++++++++++++++++++++", p);

          this.context.dispatch({ type: ActionType.SETPROGRESS, payload: p });
          break;
        case "complete":
          this.context.dispatch({
            type: ActionType.SET_AS_COMPLETE,
            payload: p,
          });
          this.context.dispatch({
            type: ActionType.SET_RUNNING_STATE,
            payload: false,
          });
          break;
      }
    };
    return (
      <Container>
        <Filter />
        <Grid
          container
          spacing={1}
          sx={{ flexGrow: 1, mt: 2, justifyContent: "space-between" }}
        >
          <Grid>
            <DataView />
          </Grid>
          <Grid>
            <Proxylist />
          </Grid>
        </Grid>
      </Container>
    );
  }
}
