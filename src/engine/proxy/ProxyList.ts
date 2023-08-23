import Proxy from "./Proxy";

// Parse PRoxy
interface ParsedProxy {
  protocol: string;
  username: string;
  password: string;
  host: string;
  port: string;
}

export default class ProxyList {
  static getProxy() {
    throw new Error("Method not implemented.");
  }
  PROXYLIST: Proxy[] = [];

  async addProxy(prxy: string): Promise<Proxy | boolean> {
    //protocol://host:port
    console.log("Add Proxy", prxy);

    const a = this.parseProxy(prxy);
    if (a) {
      let auth;
      if (a.username && a.password) {
        auth = {
          username: a.username,
          password: a.password,
        };
      }
      const p = new Proxy(a.host, parseInt(a.port), a.protocol, auth);

      if (await p.isLive()) {
        console.info("Proxy Added :)", prxy);
        this.PROXYLIST.push(p);
        return p;
      } else {
        console.warn("not working", prxy);
        return false;
      }
    }
    return false;
  }

  getProxy(): Proxy {
    const can = this.PROXYLIST.filter((e) => e.canUse());
    if (can.length <= 0) throw new Error("No Useble Proxy");
    return can[Math.floor(Math.random() * can.length)];
  }

  getProxyCount(): number {
    return this.PROXYLIST.length;
  }

  parseProxy(proxyString: string): ParsedProxy | null {
    const proxyRegex = /^(.*):\/\/(?:(.*):(.*)@)?(.+):(\d+)$/;
    const match = proxyString.match(proxyRegex);

    if (!match) {
      console.log("Invalid proxy format");
      return null;
    }

    const [, protocol, username, password, host, port] = match;
    const p: ParsedProxy = {
      protocol,
      host,
      port,
      username: "",
      password: "",
    };

    if (username && password) {
      p.username = username;
      p.password = password;
    }

    return p;
  }
}
