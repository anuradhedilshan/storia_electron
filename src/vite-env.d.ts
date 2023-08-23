import { WebviewTag } from "electron";
import ProxyList from "./engine/proxy";
/// <reference types="vite/client" />

declare namespace JSX {
  interface IntrinsicElements {
    webview: WebviewTag;
  }
}

declare global {
  interface Window {
    addProxy: (string) => void;
    name: string;
  }
}

