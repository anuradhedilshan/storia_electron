import { WebviewTag } from "electron";
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
