/* eslint-disable @typescript-eslint/no-var-requires */
import { Worker, isMainThread, parentPort, workerData } from 'node:worker_threads';
import parseAd from "./Ad.mjs";

const Headers = {
  Referer: "https://www.storia.ro/ro/cautare/vanzare/garsoniere/toata-romania",
  "User-Agent":
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/115.0.0.0 Safari/537.36",
};

console.log(`Child Process spawnded `);

parentPort?.on("message", (e) => {
  console.log("worker Got", e);

  //   for (let loop = e.start; loop <= e.end; loop++) {
  //     console.log("Looping+ ", loop, max);
  //     const response = await fetch(URL.replace(/page=\d+/, "page=" + loop), {
  //       headers: Headers as HeadersInit,
  //     });
  //     try {
  //       if (response.ok) {
  //         const data: any = await response.json();
  //         // ids = 0: {id: 7572173, slug: 'garsoniera-viaduct-p-4-IDwLRP'}
  //         const ids = data.pageProps.data.searchAds.items.map(
  //           (e: { id: string; slug: string }) => ({
  //             id: e.id,
  //             slug: e.slug,
  //           })
  //         );
  //         // res =  { succeeded, failed }
  //         const res = await getAds(ids, BUILDID, proxylist);
  //         // Writer.appendData(res.data);
  //         // send Progress
  //         const p = Math.floor(((loop / max) * 100) / 4);
  //         if (process.send) process.send({ res, p });

  //         // do something with response here, not outside the function
  //       } else if (response.status >= 500 && response.status < 600) {
  //         continue;
  //       }
  //     } catch (err) {
  //       console.error(err);
  //       continue;
  //     }
  //   }
});



async function getAds(
  ids,
  BuildID,
  proxylist
) {
  console.log("Get Ads calling");
  const promises = [];
  let succeeded = 0;
  let failed = 0;
  const data = [];
  let proxy = proxylist.getProxy();
  let index = 0;
  // eslint-disable-next-line no-constant-condition
  while (true) {
    if (succeeded >= ids.length) {
      console.log("Worker Break here");
      break;
    }
    const i = ids[index];
    await sleep(50);
    if (!proxy.canUse()) {
      proxy = proxylist.getProxy();
    }
    proxy.markAsReserved(true);
    promises.push(
      proxy
        .fetch(getAdURL(i.slug, BuildID), Headers)
        .then((response) => {
          if (response.status >= 400 && response.status < 600) {
            proxy.setWait();
            throw new Error(`Server error: ${response.status}`);
          }
          succeeded++;
          index++;
          const parseddaat = parseAd(response.data["pageProps"]["ad"]);

          data.push(parseddaat);
        })
        .catch((error) => {
          console.error("Error:", error);
          proxy.setWait();
          failed += 1;
          return {
            url: error.request,
          };
        })
    );
  }

  await Promise.all(promises);

  console.log(`Successful requests: ${succeeded}, Failed requests: ${failed}`);
  proxy.markAsReserved(false);
  return { succeeded, failed, data };
}

function getAdURL(slug, BUILDID) {
  const url = `https://www.storia.ro/_next/data/${BUILDID}/ro/oferta/${slug}.json?lang=ro&id=${slug}`;
  return url;
}


function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
