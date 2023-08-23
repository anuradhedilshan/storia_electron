import { app, BrowserWindow, ipcMain } from "electron";
import path from "node:path";
import ProxyList from "../src/engine/proxy";
import { dialog } from "electron";
import { getRedirect, startf } from "../src/engine/Engine";
import Proxy from "../src/engine/proxy/Proxy";

// The built directory structure
//
// ├─┬─┬ dist
// │ │ └── index.html
// │ │
// │ ├─┬ dist-electron
// │ │ ├── main.js
// │ │ └── preload.js
// │
process.env.DIST = path.join(__dirname, "../dist");
process.env.PUBLIC = app.isPackaged
  ? process.env.DIST
  : path.join(process.env.DIST, "../public");

let win: BrowserWindow | null;
// 🚧 Use ['ENV_NAME'] avoid vite:define plugin - Vite@2.x
const VITE_DEV_SERVER_URL = process.env["VITE_DEV_SERVER_URL"];

function createWindow() {
  win = new BrowserWindow({
    icon: path.join(process.env.PUBLIC, "electron-vite.svg"),
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
      nodeIntegration: true,
      nodeIntegrationInSubFrames: true,
      contextIsolation: false,
      nodeIntegrationInWorker: true,
    },
    minWidth: 900,
    minHeight: 700,
    maxHeight: 700,
    maxWidth: 900,
    title: "Ditributed_Storia",
  });

  // Test active push message to Renderer-process.
  win.webContents.on("did-finish-load", () => {
    win?.webContents.send("main-process-message", new Date().toLocaleString());
  });

  if (VITE_DEV_SERVER_URL) {
    win.loadURL(VITE_DEV_SERVER_URL);
  } else {
    // win.loadFile('dist/index.html')
    win.loadFile(path.join(process.env.DIST, "index.html"));
  }
}

app.on("window-all-closed", () => {
  win = null;
});

app.whenReady().then(createWindow);

ipcMain.handle("openPathDialog", async () => {
  const result = await dialog.showOpenDialog({
    properties: ["openDirectory"],
  });
  return result;
});

// custom

const PL = new ProxyList();

ipcMain.on("start", async (event, arg) => {
  const { data, filepath, buildID } = arg;
  if (PL.getProxyCount() >= 1) {
    const a: string = await getRedirect(data, buildID);
    startf(a, buildID, PL, filepath, (el, val) => {
      event.sender.send("event", { el, val });
    });
  } else {
    event.sender.send("error", "No Usable PRoxy");
  }
});

ipcMain.handle("addProxy", async (_e, arg) => {
  console.log("Add proxy");

  const working = [];
  for (const i of arg.trim().split("\n")) {
    console.log("Ip Testing", i);

    const out = await PL.addProxy(i);
    if (out) working.push((out as Proxy).getProxyString());
  }
  return working;
});
