import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { Store } from "./store/app.store.tsx";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <Store>
      <App />
    </Store>
  </React.StrictMode>
);

// postMessage({ payload: "removeLoading" }, "*");
