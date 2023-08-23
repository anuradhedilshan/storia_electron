import ProxyList from "../engine/proxy";

// eslint-disable-next-line react-refresh/only-export-components
const PL = new ProxyList();

async function onProxyListAdd(list: string[]): Promise<string[]> {
  const working: string[] = [];
  for (const i in list) {
    console.log("Proxy adding", i);

    const res = await PL.addProxy(i);
    if (res) {
      working.push(i);
    }
  }
  return working;
}

export { onProxyListAdd };
