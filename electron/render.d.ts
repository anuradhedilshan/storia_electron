// import Proxy from "../src/engine/proxy/Proxy";

export interface IElectronAPI {
  setProxyList: (string) => Promise<{less : string , full : string}[]>;
  onSubmit: (OBJ, filepath: string) => void;
  OnEvent: ((Type: "progress" | "count" | "complete", p: number | boolean) => void) | null;
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
