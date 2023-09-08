import fetch from "node-fetch";
import { getBuildId, getRedirect } from "../src/engine/Engine";
import { ipcRenderer } from "electron";
// import { logger } from "./main";

function domReady(
  condition: DocumentReadyState[] = ["complete", "interactive"]
) {
  return new Promise((resolve) => {
    if (condition.includes(document.readyState)) {
      resolve(true);
    } else {
      document.addEventListener("readystatechange", () => {
        if (condition.includes(document.readyState)) {
          resolve(true);
        }
      });
    }
  });
}

const safeDOM = {
  append(parent: HTMLElement, child: HTMLElement) {
    if (!Array.from(parent.children).find((e) => e === child)) {
      parent.appendChild(child);
    }
  },
  remove(parent: HTMLElement, child: HTMLElement) {
    if (Array.from(parent.children).find((e) => e === child)) {
      parent.removeChild(child);
    }
  },
};

/**
 * https://tobiasahlin.com/spinkit
 * https://connoratherton.com/loaders
 * https://projects.lukehaas.me/css-loaders
 * https://matejkustec.github.io/SpinThatShit
 */
function useLoading() {
  const className = `loaders-css__square-spin`;
  const styleContent = `
@keyframes square-spin {
  25% { transform: perspective(100px) rotateX(180deg) rotateY(0); }
  50% { transform: perspective(100px) rotateX(180deg) rotateY(180deg); }
  75% { transform: perspective(100px) rotateX(0) rotateY(180deg); }
  100% { transform: perspective(100px) rotateX(0) rotateY(0); }
}
.${className} > div {
  animation-fill-mode: both;
  width: 50px;
  height: 50px;
  background: #fff;
  animation: square-spin 3s 0s cubic-bezier(0.09, 0.57, 0.49, 0.9) infinite;
}
.app-loading-wrap {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #282c34;
  z-index: 9;
}
    `;
  const oStyle = document.createElement("style");
  const oDiv = document.createElement("div");

  oStyle.id = "app-loading-style";
  oStyle.innerHTML = styleContent;
  oDiv.className = "app-loading-wrap";
  oDiv.innerHTML = `<div class="${className}"><div></div></div>`;

  return {
    appendLoading() {
      safeDOM.append(document.head, oStyle);
      safeDOM.append(document.body, oDiv);
    },
    removeLoading() {
      safeDOM.remove(document.head, oStyle);
      safeDOM.remove(document.body, oDiv);
    },
  };
}

// ----------------------------------------------------------------------

// eslint-disable-next-line react-hooks/rules-of-hooks
const { appendLoading, removeLoading } = useLoading();
domReady().then(appendLoading);

window.onmessage = (ev) => {
  ev.data.payload === "removeLoading" && removeLoading();
};

// setTimeout(removeLoading, 999);
(async () => {
  // appendLoading();
  try {
    const html = await (
      await fetch("https://www.storia.ro/", {
        headers: {
          Referer:
            "https://www.storia.ro/ro/cautare/vanzare/garsoniere/toata-romania",
          "User-Agent":
            "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/116.0.0.0 Safari/537.36",
        },
      })
    ).text();
    console.log(html);
    const parser = new DOMParser();
    const doc = parser.parseFromString(html, "text/html");
    const BuildID = getBuildId(doc);
    window.BuildID = BuildID;
    removeLoading();
    console.log(BuildID);
  } catch (e) {
    console.log(e);
    if (window.MyApi.OnEvent)
      window.MyApi.OnEvent("error", "Cannot Parse Build Id Please Reopen App");

    window.alert("Cannot Parse Build Id Please Relanching  App");
    ipcRenderer.send("relanch");
  }
})();

console.log("this is Preload.ts");

ipcRenderer.on("event", (_e, arg) => {
  console.log(arg);
  sendEvent(arg.Type, arg.p);
});
window.MyApi = {
  setProxyList: async (e: string) => {
    return ipcRenderer.invoke("addProxy", e);
  },
  onSubmit: async (data, filepath) => {
    console.log("On Submit",data);
    if (window.BuildID) {
      ipcRenderer.send("start", { buildID: window.BuildID, filepath, data });
      ipcRenderer.on("error", (_e, t) => {
        window.alert(t);
        sendEvent("count", 0);
        sendEvent("complete", true);
      });
    } else {
      window.alert("Please Reopen ");
      sendEvent("count", 0);
      sendEvent("complete", true);
    }
  },
  OnEvent: null,
  async getCount(data) {
    if (window.BuildID) {
      try {
        const a: string = await getRedirect(data, window.BuildID);
        sendEvent("details", `Get Count url : <b> ${a} </b>`);
        const temp: any = await (
          await fetch(a, {
            headers: {
              "User-Agent":
                "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/116.0.0.0 Safari/537.36",
            },
          })
        ).json();
        // send count

        const count = temp.pageProps.data.searchAds.pagination.totalResults;
        if (window.MyApi.OnEvent)
          window.MyApi.OnEvent("details", `Got <b>${count}</b> as Count`);
        sendEvent("count", count);
      } catch (error) {
        if (window.MyApi.OnEvent)
          window.MyApi.OnEvent("error", "Failed to get Count Please Try Again");
        sendEvent("count", null);
      }
    }
  },
};

function sendEvent(
  Type: "progress" | "count" | "complete" | "error" | "details" | "warn",
  message: number | boolean | string | null
) {
  if (window.MyApi.OnEvent) window.MyApi.OnEvent(Type, message);
}
