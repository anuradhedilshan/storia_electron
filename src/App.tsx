import React from "react";
import "./App.css";
import Filter from "./components/filter";
import { Container, Grid } from "@mui/joy";
import Proxylist from "./components/proxy_switcher/ProxyList";
import { ActionType } from "./store/app.store";
import { DataView } from "./components/dataview";
import { context } from "./store/app.store";
import Logger_View from "./components/Logger_view";
function padTo2Digits(num: number) {
  return num.toString().padStart(2, "0");
}
function formatDate(date: Date) {
  return (
    [
      date.getFullYear(),
      padTo2Digits(date.getMonth() + 1),
      padTo2Digits(date.getDate()),
    ].join("-") +
    " " +
    [
      padTo2Digits(date.getHours()),
      padTo2Digits(date.getMinutes()),
      padTo2Digits(date.getSeconds()),
    ].join(":")
  );
}
export default class APP extends React.Component {
  static contextType = context;
  declare context: React.ContextType<typeof context>;

  parseLog(type: "error" | "warn" | "details", message: string | number) {
    return `   <span class='${type} log'><span align="left" style="color:grey">${formatDate(
      new Date()
    )} : </span> ${message}</span> <br />`;
  }
  render(): React.ReactNode {
    window.MyApi.OnEvent = (
      Type: "progress" | "count" | "complete" | "error" | "details" | "warn",
      message: number | boolean | string | null
    ) => {
      console.log(Type, message);
      switch (Type) {
        case "count":
          message = message ? message : "retry";
          console.log("Count", message);
          this.context.dispatch({
            type: ActionType.SETSEARCHLOADING,
            payload: false,
          });
          this.context.dispatch({
            type: ActionType.SETCOUNT,
            payload: { counter: message },
          });
          this.context.dispatch({
            type: ActionType.SET_RUNNING_STATE,
            payload: false,
          });
          break;
        case "progress":
          console.log("Progress++++++++++++++++++++++++", message);
          this.context.dispatch({
            type: ActionType.SETPROGRESS,
            payload: message,
          });
          break;
        case "complete":
          this.context.dispatch({
            type: ActionType.SET_AS_COMPLETE,
            payload: message,
          });
          this.context.dispatch({
            type: ActionType.SETPROGRESS,
            payload: false,
          });
          this.context.dispatch({
            type: ActionType.SET_RUNNING_STATE,
            payload: false,
          });
          break;
        case "error":
        case "warn":
        case "details":
          this.context.dispatch({
            type: ActionType.SET_LOGGER_DATA,
            payload: this.parseLog(Type, message as string),
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
        <div style={{ paddingTop: "5px", width: "100%" }}>
          <Logger_View />
        </div>
      </Container>
    );
  }
}
