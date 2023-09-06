// import Proxy from "../src/engine/proxy/Proxy";
export type CB = (
  Type: "progress" | "count" | "complete" | "error" | "details"|"warn",
  message: number | boolean | string| null
) => void;
export interface IElectronAPI {
  setProxyList: (string) => Promise<{ less: string; full: string }[]>;
  onSubmit: (OBJ, filepath: string) => void;
  OnEvent: CB | null;
  getCount: (OBJ) => void;
}

declare global {
  interface Window {
    MyApi: IElectronAPI;
    BuildID: string | null;
  }
  type OBJ = {
    estate: string;
    transaction: string;
    city: string;
    distanceRadius: number;
  };
}
