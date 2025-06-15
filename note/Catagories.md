
|                       | Vanzare | Inchiriere |      |
| --------------------- | ------- | ---------- | ---- |
| apartmente            | 101     | 102        | FLAT |
| Case                  | 201     | 202        |      |
| camere                | 302     | null       |      |
| Terenuri              | 401     | 402        |      |
| spatii comercial      | 501     | 502        |      |
| Depozite si hale      | 601     | 602        |      |
| Birouri               | 801     | 802        |      |
| Ansamburi Rezidentale | 11      | null       |      |
```bash
curl -H 'User-Agent: Android App Ver 2.20.0 (Android 11;)' -H 'Device-Id: a56aca257e9f4ae892aa1ea352fb1197' -H 'Token: J0VTaBLW7eSgdqujkOeeUnN924q1X32Z0CgUMpQgLRMuk1ni19' -H 'Connection: Keep-Alive' --compressed -H 'Cookie: PHPSESSID=hejpcns9fujkrsg5do0qfdddio' 'https://www.storia.ro/i2/ads/results/?total_count=1&json=1&search%5Bcategory_id%5D=201'
```

```total_count: '1'
json: '1'
search[location_id]: '20000000032.30000001513'
search[subregion_id]: '30000001513'
search[category_id]: '501'
search[region_id]: '20000000032'
```


```json
{
    "status": "ok",
    "total_count": 34101
}
```


```bash
curl 'https://www.storia.ro/api/query?query=query+CountAds%28%24filterAttributes%3A+FilterAttributes%2C+%24filterLocations%3A+FilterLocations%29+%7B%0A++countAds%28filterAttributes%3A+%24filterAttributes%2C+filterLocations%3A+%24filterLocations%29+%7B%0A++++__typename%0A++++...+on+CountAds+%7B%0A++++++count%0A++++++__typename%0A++++%7D%0A++%7D%0A%7D&operationName=CountAds&variables=%7B%22filterAttributes%22%3A%7B%22estate%22%3A%22GARAGE%22%2C%22hasDiscount%22%3Afalse%2C%22hasMovie%22%3Afalse%2C%22hasOpenDay%22%3Afalse%2C%22hasPhotos%22%3Afalse%2C%22hasRemoteServices%22%3Afalse%2C%22hasWalkaround%22%3Afalse%2C%22isBungalov%22%3Afalse%2C%22isForStudents%22%3Afalse%2C%22isPrivateOwner%22%3Afalse%2C%22isRecreational%22%3Afalse%2C%22market%22%3A%22ALL%22%2C%22ownerTypeSingleSelect%22%3A%22ALL%22%2C%22transaction%22%3A%22RENT%22%7D%2C%22filterLocations%22%3A%7B%22byDomainId%22%3A%5B%7B%22domainId%22%3A%22alba%22%7D%5D%7D%7D&extensions=%7B%22persistedQuery%22%3A%7B%22miss%22%3Atrue%2C%22sha256Hash%22%3A%2261c633240ac9821be831e1b01d5162d5e22f6811e4b8c28fa4fb813a69c93b66%22%2C%22version%22%3A1%7D%7D' \
  -H 'accept: application/graphql-response+json, application/graphql+json, application/json, text/event-stream, multipart/mixed' \
  -H 'accept-language: en-US,en;q=0.9,si;q=0.8' \
  -b 'laquesis=eure-34506@b#eure-34507@b#eure-34706@a#eure-34714@b#eure-35124@b#eure-35542@a#eure-36407@b#eure-37073@a#eure-37091@b#eure-37428@a#eure-37554@a; laquesisff=gre-12226#rer-135#rer-14#rer-142; OptanonAlertBoxClosed=2025-06-10T17:32:28.044Z; eupubconsent-v2=CQSx5GQQSx5GQAcABBROBuF8AP_gAAAAAAYgJwtT3G_fbXlj-Tp0aftkeYxf99h7rsQxBgbJk-4FyLvW_JwX32EyNAwapqYKmRIAu3RBIQFlHIDUBUCgaogVrTDMYECEgTNKJ6BEgFMRY2NYCFxvmYFDeQCY5tptd1d5mR-t7dr83dzyy4hnn3Kpf-QlUICdAYcgAAAAAAAAAAAAAAAQAAAABAAAAQAIAAAAAAAAAAAAAAAAAAAAA_YAAADAkD4ABcAFAAVAA4AB4AEEALwA1AB4AEwAKoAbwA_ACEgEMARIAjgBLACaAFaAMAAYcAygDLAGyAOeAdwB3wD2APiAfYB-gEAAIpARcBGACNQEiASWAn4CgwFQAVcAuYBegDFAGiANoAbgA4kCPQJEATsAocBR4CkQFNgLYAXIAuwBd4C8wGGwMjAyQBk4DMwGcwNXA1kBt4DcwG6gOTAcuBNwIAXAAcACQAI4BBwCOAE0ASsAmUBNoCkAFhALEAW4AvIBf4DEAGLAMhAaMA1MBtADbgG6DoJQAC4AKAAqABwAEEALgA1AB4AEwAKsAXABdADEAG8AP0AhgCJAEsAJoAUYArQBgADDAGUANEAbIA54B3AHeAPaAfYB-wEUARiAjoCSwE_AUGAqICrgFiALnAXkBegDFAG0ANwAcQA6gB9gEXwI9AkQBMgCdgFDwKPApCBTQFNgKsAWKAtgBboC4AFyQLsAu0Bd4C8wF9AMNAY9AyMDJAGTgMqAZYAzMBnIDTYGrgawA28BuoDiwHJgOXAm4BN4CcI4BRAA4ADwALgAkAB-AEcAKAAaABHADkAIBAQcBCACOAE0AKgAdIBKwCYgEygJtAUmArsBYgC1AFuAL_AYgAxYBkIDJgGjANTAa8A2gBtgDboG5gboA48By0DnQOfAm2QgPAALAAoAC4AGoAVQAuABiADeAMAAc8A7gDvAIoASkAoMBUQFXALmAYoA2gB1AEegKaAVYAsUBaIC4AFyALsAZGAycBnJAAkAA8ANAA5ACOAFiATaApMBYgC8gGeANGAamA2wBtwDdAHLAOfAm2SgSAALAAoABwAHgATAAqgBcADFAIYAiQBHACjAFaAMAAbIA7wB-QFRAVcAuYBigDqAImARfAj0CRAFHgKaAWKAtgBdgC84GRgZIAycBnIDWAG3gTcAnCSAJgAXACOAO4AgABBwCOAFQASsAmIBNoCkwFuAL_AYsAywBngDdAHLATbKQOgAFwAUABUADgAIIAZABoADwAJgAVQAxAB-gEMARIAowBWgDAAGUANEAbIA5wB3wD8AP0AiwBGICOgJKAUGAqICrgFzALyAYoA2gBuADqAHtAPsAiYBF8CPQJEATsAocBSECmgKbAVYAsUBbAC4AFyALtAXmAvoBhsDIwMkAZOAywBnMDWANZAbeA3UByYE3igB4AC4AJAAXABHAEcAOQAdwA-wCAAEHALEAa8A7YB_wExAJtAVIArsBbgC8gGLAMmAZ4A0YBqYDXoG5gboA5YCbYE4S0AkAGoAwAB3AF6APsApoBVgDMwJuFgBIAywCOAI9ATEAm0BowDUwG6AOWAA.f_wAAAAAAAAA; _cc_id=20f545a96e3acd210c88e7628799f802; _gcl_au=1.1.1919003472.1749578314; _ga=GA1.1.1656084570.1749578314; _fbp=fb.1.1749578315225.147594092866875030; _pctx=%7Bu%7DN4IgrgzgpgThIC4B2YA2qA05owMoBcBDfSREQpAeyRCwgEt8oBJAEzIEYOAWAJgE4AHIO4B2DgDYeAVl7cADNNEgAvkA; _pcid=%7B%22browserId%22%3A%22mbqtr7yckp624fte%22%7D; cX_P=mbqtr7yckp624fte; cX_G=cx%3Aq0z69n8hmkai2pl35tlk52inz%3A2ad19et875jma; _sharedid=784fb5e2-d224-4833-a909-cc20fa85b9d4; _sharedid_cst=dix7LFgshg%3D%3D; ab.storage.deviceId.4f0a36ae-c5e2-42b6-8825-1fc574cbc69a=g%3Ae5325aa0-7b46-4e87-bd9a-26473b70f7fb%7Ce%3Aundefined%7Cc%3A1749578324216%7Cl%3A1749744633367; __gads=ID=75f782af7fd2c4e1:T=1749585520:RT=1749744633:S=ALNI_MZ10QWLhkHXBmtC6LUMNlL_zlXeNA; __gpi=UID=000011292842f0a6:T=1749585520:RT=1749744633:S=ALNI_MaQwfwgcMWrc_4PrIqeZN8r5ZQwAw; __eoi=ID=f5d9e334bcdd7e68:T=1749585520:RT=1749744633:S=AA-AfjYbVRC7Do3fSBDmcZwL0nSy; __rtbh.uid=%7B%22eventType%22%3A%22uid%22%2C%22id%22%3Anull%2C%22expiryDate%22%3A%222026-06-12T16%3A10%3A53.984Z%22%7D; ab.storage.sessionId.4f0a36ae-c5e2-42b6-8825-1fc574cbc69a=g%3Aa9758fac-221b-af23-7524-8ca8b8d6cf39%7Ce%3A1749746454239%7Cc%3A1749744633366%7Cl%3A1749744654239; panoramaId_expiry=1749947646338; panoramaId=de5effca702050daaeba27df51d7a9fb927a34f1e81e4f205dd61a4d5daaa1df; panoramaIdType=panoDevice; OptanonConsent=isGpcEnabled=0&datestamp=Sat+Jun+14+2025+15%3A33%3A57+GMT%2B0530+(India+Standard+Time)&version=202501.2.0&browserGpcFlag=0&isIABGlobal=false&hosts=&consentId=25dd61ba-5d1e-44d5-8674-3627328dede7&interactionCount=1&isAnonUser=1&landingPath=NotLandingPage&groups=C0001%3A1%2CC0002%3A1%2CC0003%3A1%2CC0004%3A1%2Cgad%3A1&intType=1&geolocation=LK%3B1&AwaitingReconsent=false; lqstatus=1749896759|1976de55fdbx12fe1cb8|eure-35124|||0; _ga_NK3K3T1FT5=GS2.1.s1749895441$o8$g0$t1749895441$j60$l0$h0; cto_bundle=pAV8Tl9ORUlrdjFMWHh3TVE0d2ROMVVvbmVvbTBpQzRycHZRV3M1ZHh5MzRYQjRreE1kJTJGZUV4Y3k4WHNLcmNtak1zdWFoN0RoWjN5OHUwVDREUTd6SzZyS1ZCT1RFcER0NFBBWDIlMkZuYkk0TDhKN2ZkUFl6M1R5TTRLV0VDS3glMkZLRWVINmhyJTJGd3YxUGM4d3VsU0NHOHMlMkJUZk5nJTNEJTNE; __rtbh.lid=%7B%22eventType%22%3A%22lid%22%2C%22id%22%3A%22aZi04XbGKd7rVZtzJoOh%22%2C%22expiryDate%22%3A%222026-06-14T10%3A04%3A03.106Z%22%7D; _ga_XCWR76B4Y6=GS2.1.s1749895440$o12$g1$t1749895821$j20$l0$h0; onap=1975a3f28ecx66bd6c4b-11-1976de55fdbx12fe1cb8-31-1749897670' \
  -H 'dnt: 1' \
  -H 'is-desktop: true' \
  -H 'newrelic: eyJ2IjpbMCwxXSwiZCI6eyJ0eSI6IkJyb3dzZXIiLCJhYyI6IjEzODkzNjgiLCJhcCI6IjExMDEzMDM1ODEiLCJpZCI6IjkyZGIxYzUyMjY0NWJkZDkiLCJ0ciI6IjAwY2JiZWE0ZmQxMWRjZTBlMWY0OGQ0MmFiYzkwNjZiIiwidGkiOjE3NDk4OTU4NzA0OTYsInRrIjoiMTcwNTIyMiJ9fQ==' \
  -H 'priority: u=1, i' \
  -H 're-fp-session: 5d7680fd-7532-4574-8323-7dd80188b277' \
  -H 'referer: https://www.storia.ro/' \
  -H 'sec-ch-ua: "Google Chrome";v="137", "Chromium";v="137", "Not/A)Brand";v="24"' \
  -H 'sec-ch-ua-mobile: ?0' \
  -H 'sec-ch-ua-platform: "Linux"' \
  -H 'sec-fetch-dest: empty' \
  -H 'sec-fetch-mode: cors' \
  -H 'sec-fetch-site: same-origin' \
  -H 'traceparent: 00-00cbbea4fd11dce0e1f48d42abc9066b-92db1c522645bdd9-01' \
  -H 'tracestate: 1705222@nr=0-1-1389368-1101303581-92db1c522645bdd9----1749895870496' \
  -H 'user-agent: Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Safari/537.36'
```