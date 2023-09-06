import axios, {
  AxiosProxyConfig,
  AxiosRequestConfig,
  RawAxiosRequestHeaders,
} from "axios";
import { SocksProxyAgent } from "socks-proxy-agent";
export default class Proxy {
  host: string;
  port: number;
  protocol: string;
  lastUsed: number;
  requestsSent: number;
  maxRequests: number;
  cooldownTime: number;
  auth?: AxiosProxyConfig["auth"];
  static TestURL = "";
  Proxyconfig: AxiosRequestConfig;

  constructor(
    host: string,
    port: number,
    protocol: string,
    auth: AxiosProxyConfig["auth"]
  ) {
    console.log("Proxy Auth ", auth);
    this.host = host;
    this.port = port;
    this.protocol = protocol;
    this.lastUsed = 0;
    this.requestsSent = 0;
    this.maxRequests = 480;
    this.cooldownTime = 5 * 60 * 1000; // 5 minutes in milliseconds
    (this.auth = auth), (Proxy.TestURL = "https://www.storia.ro/robots.txt");
    if (
      protocol.toLocaleLowerCase() == "socks5" ||
      protocol.toLocaleLowerCase() == "socks4"
    ) {
      console.log("socks Proxy");

      const proxy = `${protocol}://${host}:${port}`;
      const httpAgent = new SocksProxyAgent(proxy);
      const httpsAgent = new SocksProxyAgent(proxy);
      this.Proxyconfig = {
        httpAgent,
        httpsAgent,
      };
    } else {
      this.Proxyconfig = {
        proxy: {
          protocol: this.protocol,
          host: this.host,
          port: this.port,
          auth: this.auth,
        },
        headers: {
          "User-Agent":
            "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/116.0.0.0 Safari/537.36",
        },
      };
    }
  }

  fetch(url: string, headersS: RawAxiosRequestHeaders) {
    this.markUsed();

    return axios.get(url, {
      ...this.Proxyconfig,
      headers: {
        ...headersS,
      },
    });
  }
  getProxyString(): { less: string; full: string } {
    return {
      less: `${this.host}:${this.port}`,
      full: `${this.protocol}:${this.auth?.username}:${this.auth?.password}@${this.host}:${this.port}`,
    };
  }
  async isLive() {
    try {
      const response = await axios.get(Proxy.TestURL, {
        ...this.Proxyconfig,
        timeout: 12000,
      });
      console.log("chewck IS live ***");

      if (response.status == 200) {
        console.log("Response OK - ^_^ - Proxy transformed");
        return true;
      } else {
        return false;
      }
    } catch (error) {
      console.error("Bad Response :/ ", error);
      return false;
    }
  }
  setWait() {
    this.requestsSent = 999;
  }
  canUse() {
    if (this.requestsSent >= this.maxRequests) {
      const timeSinceLastUse = Date.now() - this.lastUsed;
      const is = timeSinceLastUse > this.cooldownTime;
      if (is) this.requestsSent = 0;
      return is;
    }
    return true;
  }

  // mark as USed
  markUsed() {
    console.log("IP : ", this.host, "USed : ", this.requestsSent);

    this.lastUsed = Date.now();
    this.requestsSent++;
  }

  // {id  : string , val : boolean }

  reset() {
    this.lastUsed = 0;
    this.requestsSent = 0;
  }
}
