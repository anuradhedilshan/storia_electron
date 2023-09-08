/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { AxiosError, AxiosResponse, RawAxiosRequestHeaders } from "axios";
import ProxyList from "./proxy";
import fetch from "node-fetch";
import parseAd from "./Ad";
import JSONWriter from "./JSONWriter";
import Logger from "./Logger";
import { CB } from "../../electron/render";

let logger: Logger | null = null;

export function setLoggerCallback(cb: CB): Logger {
  logger = new Logger(cb);
  return logger;
}

const Headers: RawAxiosRequestHeaders | HeadersInit = {
  Referer: "https://www.storia.ro/ro/cautare/vanzare/garsoniere/toata-romania",
  "User-Agent":
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/116.0.0.0 Safari/537.36",
};

const o: { [key: string]: string } = {
  Apartamente: "apartament",
  Garsoniere: "garsoniere",
  Case: "casa",
  Ansambluri: "investitii",
  Camere: "camera",
  Terenuri: "teren",
  "Spații comerciale": "spatiu-comercial",
  "Hale și depozite": "depozite-hale",
  OFFICE: "birou",
  Garaje: "garaj",
};

const t: { [key: string]: string } = {
  SELL: "vanzare",
  RENT: "inchiriere",
};

type LocationData = { id: string; name: string; children: string[] };

type LOC_DATA = (string | LocationData)[][];
const LOC_DATA: LOC_DATA = [
  [
    "20000000032",
    {
      id: "20000000032",
      name: "Alba",
      children: [
        "30000001369",
        "30000001407",
        "30000002976",
        "30000001513",
        "30000002262",
        "30000001561",
        "30000001465",
        "30000001453",
        "30000001260",
        "30000001510",
        "30000001310",
        "30000001225",
        "30000002518",
        "30000001374",
        "30000001139",
        "30000001508",
        "30000001245",
        "30000001258",
        "30000001221",
        "30000001348",
        "30000001252",
        "30000001356",
        "30000001292",
        "30000001316",
        "30000003086",
        "30000001168",
        "30000001209",
        "30000001188",
        "30000001418",
        "30000001346",
        "30000001123",
        "30000001556",
        "30000001404",
        "30000001545",
        "30000002975",
        "30000001360",
        "30000001357",
        "30000001450",
        "30000001382",
        "30000001479",
        "30000001476",
        "30000001299",
        "30000001304",
        "30000001444",
        "30000001385",
        "30000001475",
        "30000001474",
        "30000001533",
        "30000001263",
        "30000001165",
        "30000001458",
        "30000001412",
        "30000001512",
        "30000001351",
        "30000001420",
        "30000001496",
        "30000001398",
        "30000001243",
        "30000001468",
        "30000001163",
        "30000002519",
        "30000001286",
        "30000001128",
        "30000001543",
        "30000001197",
        "30000001169",
        "30000001416",
        "30000001372",
        "30000001222",
        "30000001361",
        "30000002524",
        "30000001323",
        "30000001484",
        "30000001472",
        "30000001282",
        "30000001439",
        "30000001228",
        "30000001319",
      ],
    },
  ],
  ["20000000001", { id: "20000000001", name: "Arad", children: [] }],
  ["20000000002", { id: "20000000002", name: "Arges", children: [] }],
  ["20000000003", { id: "20000000003", name: "Bacau", children: [] }],
  ["20000000004", { id: "20000000004", name: "Bihor", children: [] }],
  ["20000000005", { id: "20000000005", name: "Bistrita-Nasaud", children: [] }],
  ["20000000006", { id: "20000000006", name: "Botosani", children: [] }],
  ["20000000007", { id: "20000000007", name: "Braila", children: [] }],
  ["20000000039", { id: "20000000039", name: "Brasov", children: [] }],
  ["20000000028", { id: "20000000028", name: "Bucuresti", children: [] }],
  ["20000000008", { id: "20000000008", name: "Buzau", children: [] }],
  ["20000000035", { id: "20000000035", name: "Calarasi", children: [] }],
  ["20000000009", { id: "20000000009", name: "Caras-Severin", children: [] }],
  ["20000000033", { id: "20000000033", name: "Cluj", children: [] }],
  ["20000000010", { id: "20000000010", name: "Constanta", children: [] }],
  ["20000000040", { id: "20000000040", name: "Covasna", children: [] }],
  ["20000000042", { id: "20000000042", name: "Dambovita", children: [] }],
  ["20000000011", { id: "20000000011", name: "Dolj", children: [] }],
  ["20000000012", { id: "20000000012", name: "Galati", children: [] }],
  ["20000000029", { id: "20000000029", name: "Giurgiu", children: [] }],
  ["20000000030", { id: "20000000030", name: "Gorj", children: [] }],
  ["20000000013", { id: "20000000013", name: "Harghita", children: [] }],
  ["20000000031", { id: "20000000031", name: "Hunedoara", children: [] }],
  ["20000000014", { id: "20000000014", name: "Ialomita", children: [] }],
  ["20000000037", { id: "20000000037", name: "Iasi", children: [] }],
  ["20000000036", { id: "20000000036", name: "Ilfov", children: [] }],
  ["20000000015", { id: "20000000015", name: "Maramures", children: [] }],
  ["20000000016", { id: "20000000016", name: "Mehedinti", children: [] }],
  ["20000000017", { id: "20000000017", name: "Mures", children: [] }],
  ["20000000038", { id: "20000000038", name: "Neamt", children: [] }],
  ["20000000018", { id: "20000000018", name: "Olt", children: [] }],
  ["20000000019", { id: "20000000019", name: "Prahova", children: [] }],
  ["20000000034", { id: "20000000034", name: "Salaj", children: [] }],
  ["20000000020", { id: "20000000020", name: "Satu Mare", children: [] }],
  ["20000000021", { id: "20000000021", name: "Sibiu", children: [] }],
  ["20000000022", { id: "20000000022", name: "Suceava", children: [] }],
  ["20000000041", { id: "20000000041", name: "Teleorman", children: [] }],
  ["20000000023", { id: "20000000023", name: "Timis", children: [] }],
  ["20000000024", { id: "20000000024", name: "Tulcea", children: [] }],
  ["20000000026", { id: "20000000026", name: "Valcea", children: [] }],
  ["20000000025", { id: "20000000025", name: "Vaslui", children: [] }],
  ["20000000027", { id: "20000000027", name: "Vrancea", children: [] }],
  ["40000005653", { id: "40000005653", name: "Abrud", children: [] }],
  ["40000005620", { id: "40000005620", name: "Soharu", children: [] }],
  [
    "30000001369",
    {
      id: "30000001369",
      name: "Abrud",
      children: ["40000005653", "40000005620"],
    },
  ],
  ["40000004143", { id: "40000004143", name: "Aiud", children: [] }],
  ["40000004145", { id: "40000004145", name: "Ciumbrud", children: [] }],
  ["40000004197", { id: "40000004197", name: "Gambas", children: [] }],
  ["40000004140", { id: "40000004140", name: "Garbova de Jos", children: [] }],
  ["40000004139", { id: "40000004139", name: "Garbova de Sus", children: [] }],
  ["40000004141", { id: "40000004141", name: "Garbovita", children: [] }],
  ["40000004146", { id: "40000004146", name: "Magina", children: [] }],
  ["40000004196", { id: "40000004196", name: "Pagida", children: [] }],
  ["40000004144", { id: "40000004144", name: "Sancrai", children: [] }],
  ["40000004142", { id: "40000004142", name: "Tifra", children: [] }],
  [
    "30000001407",
    {
      id: "30000001407",
      name: "Aiud",
      children: [
        "40000004143",
        "40000004145",
        "40000004197",
        "40000004140",
        "40000004139",
        "40000004141",
        "40000004146",
        "40000004196",
        "40000004144",
        "40000004142",
      ],
    },
  ],
  ["40000004019", { id: "40000004019", name: "Alba Iulia", children: [] }],
  ["40000004020", { id: "40000004020", name: "Oarda", children: [] }],
  ["40000003927", { id: "40000003927", name: "Paclisa", children: [] }],
  [
    "30000002976",
    {
      id: "30000002976",
      name: "Alba Iulia",
      children: ["40000004019", "40000004020", "40000003927"],
    },
  ],
  ["40000005602", { id: "40000005602", name: "Albac", children: [] }],
  ["40000005586", { id: "40000005586", name: "Budaiesti", children: [] }],
  ["40000005603", { id: "40000005603", name: "Fata", children: [] }],
  ["40000005585", { id: "40000005585", name: "Rusesti", children: [] }],
  [
    "30000001513",
    {
      id: "30000001513",
      name: "Albac",
      children: ["40000005602", "40000005586", "40000005603", "40000005585"],
    },
  ],
  ["40000005685", { id: "40000005685", name: "Almasu Mare", children: [] }],
  [
    "40000005688",
    { id: "40000005688", name: "Almasu de Mijloc", children: [] },
  ],
  ["40000005691", { id: "40000005691", name: "Bradet", children: [] }],
  ["40000005687", { id: "40000005687", name: "Cheile Cibului", children: [] }],
  ["40000005686", { id: "40000005686", name: "Cib", children: [] }],
  ["40000005690", { id: "40000005690", name: "Glod", children: [] }],
  ["40000005689", { id: "40000005689", name: "Nadastia", children: [] }],
  [
    "30000002262",
    {
      id: "30000002262",
      name: "Almasu Mare",
      children: [
        "40000005685",
        "40000005688",
        "40000005691",
        "40000005687",
        "40000005686",
        "40000005690",
        "40000005689",
      ],
    },
  ],
  ["40000005511", { id: "40000005511", name: "Arieseni", children: [] }],
  ["40000005506", { id: "40000005506", name: "Avramesti", children: [] }],
  ["40000005516", { id: "40000005516", name: "Bubesti", children: [] }],
  ["40000005503", { id: "40000005503", name: "Dealu Bajului", children: [] }],
  ["40000005505", { id: "40000005505", name: "Fata Cristesei", children: [] }],
  ["40000005510", { id: "40000005510", name: "Galbena", children: [] }],
  ["40000005513", { id: "40000005513", name: "Izlaz", children: [] }],
  ["40000005502", { id: "40000005502", name: "Pantesti", children: [] }],
  ["40000005509", { id: "40000005509", name: "Patrahaitesti", children: [] }],
  ["40000005501", { id: "40000005501", name: "Plisti", children: [] }],
  ["40000005504", { id: "40000005504", name: "Poienita", children: [] }],
  ["40000005512", { id: "40000005512", name: "Vanvucesti", children: [] }],
  [
    "30000001561",
    {
      id: "30000001561",
      name: "Arieseni",
      children: [
        "40000005511",
        "40000005506",
        "40000005516",
        "40000005503",
        "40000005505",
        "40000005510",
        "40000005513",
        "40000005502",
        "40000005509",
        "40000005501",
        "40000005504",
        "40000005512",
      ],
    },
  ],
  ["40000005494", { id: "40000005494", name: "Avram Iancu", children: [] }],
  ["40000005496", { id: "40000005496", name: "Dealu Crisului", children: [] }],
  ["40000005569", { id: "40000005569", name: "Incesti", children: [] }],
  ["40000005507", { id: "40000005507", name: "Tarsa", children: [] }],
  ["40000005495", { id: "40000005495", name: "Vidrisoara", children: [] }],
  [
    "30000001465",
    {
      id: "30000001465",
      name: "Avram Iancu",
      children: [
        "40000005494",
        "40000005496",
        "40000005569",
        "40000005507",
        "40000005495",
      ],
    },
  ],
  ["40000004237", { id: "40000004237", name: "Baia de Aries", children: [] }],
  ["40000004233", { id: "40000004233", name: "Brazesti", children: [] }],
  ["40000004234", { id: "40000004234", name: "Cioara de Sus", children: [] }],
  ["40000004236", { id: "40000004236", name: "Muncelu", children: [] }],
  ["40000004235", { id: "40000004235", name: "Sartas", children: [] }],
  ["40000004238", { id: "40000004238", name: "Simulesti", children: [] }],
  [
    "30000001453",
    {
      id: "30000001453",
      name: "Baia de Aries",
      children: [
        "40000004237",
        "40000004233",
        "40000004234",
        "40000004236",
        "40000004235",
        "40000004238",
      ],
    },
  ],
  ["40000004088", { id: "40000004088", name: "Berghin", children: [] }],
  ["40000004092", { id: "40000004092", name: "Ghirbom", children: [] }],
  ["40000004084", { id: "40000004084", name: "Henig", children: [] }],
  ["40000003926", { id: "40000003926", name: "Straja", children: [] }],
  [
    "30000001260",
    {
      id: "30000001260",
      name: "Berghin",
      children: ["40000004088", "40000004092", "40000004084", "40000003926"],
    },
  ],
  ["40000005760", { id: "40000005760", name: "Bistra", children: [] }],
  ["40000005676", { id: "40000005676", name: "Ciuldesti", children: [] }],
  ["40000005674", { id: "40000005674", name: "Garde", children: [] }],
  ["40000005673", { id: "40000005673", name: "Hudricesti", children: [] }],
  ["40000005682", { id: "40000005682", name: "Lunca Merilor", children: [] }],
  ["40000005675", { id: "40000005675", name: "Ratitis", children: [] }],
  ["40000005672", { id: "40000005672", name: "Tomnatec", children: [] }],
  ["40000005677", { id: "40000005677", name: "Trisoresti", children: [] }],
  [
    "30000001510",
    {
      id: "30000001510",
      name: "Bistra",
      children: [
        "40000005760",
        "40000005676",
        "40000005674",
        "40000005673",
        "40000005682",
        "40000005675",
        "40000005672",
        "40000005677",
      ],
    },
  ],
  ["40000004071", { id: "40000004071", name: "Blaj", children: [] }],
  ["40000004066", { id: "40000004066", name: "Manarade", children: [] }],
  ["40000004067", { id: "40000004067", name: "Spatac", children: [] }],
  ["40000004070", { id: "40000004070", name: "Tiur", children: [] }],
  [
    "30000001310",
    {
      id: "30000001310",
      name: "Blaj",
      children: ["40000004071", "40000004066", "40000004067", "40000004070"],
    },
  ],
  ["40000003969", { id: "40000003969", name: "Acmariu", children: [] }],
  ["40000003968", { id: "40000003968", name: "Blandiana", children: [] }],
  [
    "30000001225",
    {
      id: "30000001225",
      name: "Blandiana",
      children: ["40000003969", "40000003968"],
    },
  ],
  [
    "40000004135",
    { id: "40000004135", name: "Bucerdea Granoasa", children: [] },
  ],
  [
    "30000002518",
    {
      id: "30000002518",
      name: "Bucerdea Granoasa",
      children: ["40000004135"],
    },
  ],
  ["40000005707", { id: "40000005707", name: "Bucium Sasa", children: [] }],
  ["40000005702", { id: "40000005702", name: "Bucium-Sat", children: [] }],
  ["40000005694", { id: "40000005694", name: "Cerbu", children: [] }],
  ["40000005703", { id: "40000005703", name: "Coleseni", children: [] }],
  ["40000005750", { id: "40000005750", name: "Gura Izbitei", children: [] }],
  ["40000005751", { id: "40000005751", name: "Izbita", children: [] }],
  ["40000005696", { id: "40000005696", name: "Poieni", children: [] }],
  ["40000005755", { id: "40000005755", name: "Rusi", children: [] }],
  ["40000005695", { id: "40000005695", name: "Valea Abruzel", children: [] }],
  ["40000005704", { id: "40000005704", name: "Valea Sesii", children: [] }],
  ["40000005701", { id: "40000005701", name: "Valeni", children: [] }],
  [
    "30000001374",
    {
      id: "30000001374",
      name: "Bucium",
      children: [
        "40000005707",
        "40000005702",
        "40000005694",
        "40000005703",
        "40000005750",
        "40000005751",
        "40000005696",
        "40000005755",
        "40000005695",
        "40000005704",
        "40000005701",
      ],
    },
  ],
  ["40000003951", { id: "40000003951", name: "Calnic", children: [] }],
  ["40000003947", { id: "40000003947", name: "Deal", children: [] }],
  [
    "30000001139",
    {
      id: "30000001139",
      name: "Calnic",
      children: ["40000003951", "40000003947"],
    },
  ],
  ["40000005652", { id: "40000005652", name: "Bodesti", children: [] }],
  ["40000005611", { id: "40000005611", name: "Botesti", children: [] }],
  ["40000005609", { id: "40000005609", name: "Campeni", children: [] }],
  ["40000005608", { id: "40000005608", name: "Dealu Capsei", children: [] }],
  ["40000005610", { id: "40000005610", name: "Mihoesti", children: [] }],
  ["40000005612", { id: "40000005612", name: "Valea Bistrii", children: [] }],
  ["40000005613", { id: "40000005613", name: "Valea Caselor", children: [] }],
  ["40000005684", { id: "40000005684", name: "Varsi", children: [] }],
  [
    "30000001508",
    {
      id: "30000001508",
      name: "Campeni",
      children: [
        "40000005652",
        "40000005611",
        "40000005609",
        "40000005608",
        "40000005610",
        "40000005612",
        "40000005613",
        "40000005684",
      ],
    },
  ],
  ["40000004053", { id: "40000004053", name: "Capu Dealului", children: [] }],
  ["40000004051", { id: "40000004051", name: "Cenade", children: [] }],
  ["40000004052", { id: "40000004052", name: "Gorgan", children: [] }],
  [
    "30000001245",
    {
      id: "30000001245",
      name: "Cenade",
      children: ["40000004053", "40000004051", "40000004052"],
    },
  ],
  ["40000004090", { id: "40000004090", name: "Cergau Mare", children: [] }],
  ["40000004089", { id: "40000004089", name: "Cergau Mic", children: [] }],
  ["40000004023", { id: "40000004023", name: "Lupu", children: [] }],
  [
    "30000001258",
    {
      id: "30000001258",
      name: "Cergau",
      children: ["40000004090", "40000004089", "40000004023"],
    },
  ],
  ["40000003973", { id: "40000003973", name: "Bulbuc", children: [] }],
  ["40000003970", { id: "40000003970", name: "Ceru-Bacainti", children: [] }],
  ["40000003972", { id: "40000003972", name: "Curpeni", children: [] }],
  ["40000003971", { id: "40000003971", name: "Valea Mare", children: [] }],
  ["40000003974", { id: "40000003974", name: "Viezuri", children: [] }],
  [
    "30000001221",
    {
      id: "30000001221",
      name: "Ceru-Bacainti",
      children: [
        "40000003973",
        "40000003970",
        "40000003972",
        "40000003971",
        "40000003974",
      ],
    },
  ],
  [
    "40000003469",
    { id: "40000003469", name: "Cetatea de Balta", children: [] },
  ],
  [
    "40000003466",
    { id: "40000003466", name: "Craciunelu de Sus", children: [] },
  ],
  ["40000003468", { id: "40000003468", name: "Santamarie", children: [] }],
  ["40000003467", { id: "40000003467", name: "Tatarlaua", children: [] }],
  [
    "30000001348",
    {
      id: "30000001348",
      name: "Cetatea de Balta",
      children: ["40000003469", "40000003466", "40000003468", "40000003467"],
    },
  ],
  ["40000003929", { id: "40000003929", name: "Ciugud", children: [] }],
  ["40000003928", { id: "40000003928", name: "Drambar", children: [] }],
  ["40000003932", { id: "40000003932", name: "Hapria", children: [] }],
  ["40000003933", { id: "40000003933", name: "Limba", children: [] }],
  ["40000003931", { id: "40000003931", name: "Seusa", children: [] }],
  ["40000003930", { id: "40000003930", name: "Teleac", children: [] }],
  [
    "30000001252",
    {
      id: "30000001252",
      name: "Ciugud",
      children: [
        "40000003929",
        "40000003928",
        "40000003932",
        "40000003933",
        "40000003931",
        "40000003930",
      ],
    },
  ],
  ["40000005621", { id: "40000005621", name: "Buninginea", children: [] }],
  ["40000005622", { id: "40000005622", name: "Ciuruleasa", children: [] }],
  ["40000005623", { id: "40000005623", name: "Matisesti", children: [] }],
  ["40000005629", { id: "40000005629", name: "Vulcan", children: [] }],
  [
    "30000001356",
    {
      id: "30000001356",
      name: "Ciuruleasa",
      children: ["40000005621", "40000005622", "40000005623", "40000005629"],
    },
  ],
  [
    "40000004136",
    { id: "40000004136", name: "Craciunelu de Jos", children: [] },
  ],
  [
    "30000001292",
    {
      id: "30000001292",
      name: "Craciunelu de Jos",
      children: ["40000004136"],
    },
  ],
  ["40000004271", { id: "40000004271", name: "Craiva", children: [] }],
  ["40000004217", { id: "40000004217", name: "Cricau", children: [] }],
  ["40000004218", { id: "40000004218", name: "Tibru", children: [] }],
  [
    "30000001316",
    {
      id: "30000001316",
      name: "Cricau",
      children: ["40000004271", "40000004217", "40000004218"],
    },
  ],
  ["40000003959", { id: "40000003959", name: "Cugir", children: [] }],
  ["40000003960", { id: "40000003960", name: "Vinerea", children: [] }],
  [
    "30000003086",
    {
      id: "30000003086",
      name: "Cugir",
      children: ["40000003959", "40000003960"],
    },
  ],
  ["40000003943", { id: "40000003943", name: "Cut", children: [] }],
  [
    "30000001168",
    { id: "30000001168", name: "Cut", children: ["40000003943"] },
  ],
  ["40000003940", { id: "40000003940", name: "Daia Romana", children: [] }],
  [
    "30000001209",
    { id: "30000001209", name: "Daia Romana", children: ["40000003940"] },
  ],
  ["40000004110", { id: "40000004110", name: "Boz", children: [] }],
  [
    "40000004111",
    { id: "40000004111", name: "Dealu Dostatului", children: [] },
  ],
  ["40000004112", { id: "40000004112", name: "Dostat", children: [] }],
  [
    "30000001188",
    {
      id: "30000001188",
      name: "Dostat",
      children: ["40000004110", "40000004111", "40000004112"],
    },
  ],
  ["40000004166", { id: "40000004166", name: "Farau", children: [] }],
  ["40000004168", { id: "40000004168", name: "Heria", children: [] }],
  ["40000004165", { id: "40000004165", name: "Medves", children: [] }],
  ["40000004167", { id: "40000004167", name: "Sanbenedic", children: [] }],
  ["40000004164", { id: "40000004164", name: "Silea", children: [] }],
  [
    "30000001418",
    {
      id: "30000001418",
      name: "Farau",
      children: [
        "40000004166",
        "40000004168",
        "40000004165",
        "40000004167",
        "40000004164",
      ],
    },
  ],
  ["40000004119", { id: "40000004119", name: "Benic", children: [] }],
  ["40000004214", { id: "40000004214", name: "Cetea", children: [] }],
  ["40000004121", { id: "40000004121", name: "Galda de Jos", children: [] }],
  ["40000004215", { id: "40000004215", name: "Galda de Sus", children: [] }],
  ["40000004120", { id: "40000004120", name: "Mesentea", children: [] }],
  ["40000004122", { id: "40000004122", name: "Oiejdea", children: [] }],
  ["40000004216", { id: "40000004216", name: "Poiana Galdei", children: [] }],
  [
    "30000001346",
    {
      id: "30000001346",
      name: "Galda de Jos",
      children: [
        "40000004119",
        "40000004214",
        "40000004121",
        "40000004215",
        "40000004120",
        "40000004122",
        "40000004216",
      ],
    },
  ],
  ["40000003957", { id: "40000003957", name: "Carpinis", children: [] }],
  ["40000004093", { id: "40000004093", name: "Garbova", children: [] }],
  ["40000003956", { id: "40000003956", name: "Reciu", children: [] }],
  [
    "30000001123",
    {
      id: "30000001123",
      name: "Garbova",
      children: ["40000003957", "40000004093", "40000003956"],
    },
  ],
  ["40000005498", { id: "40000005498", name: "Biharia", children: [] }],
  ["40000005500", { id: "40000005500", name: "Dobresti", children: [] }],
  ["40000005593", { id: "40000005593", name: "Garda Seaca", children: [] }],
  ["40000005499", { id: "40000005499", name: "Garda de Sus", children: [] }],
  ["40000005592", { id: "40000005592", name: "Huzaresti", children: [] }],
  [
    "30000001556",
    {
      id: "30000001556",
      name: "Garda de Sus",
      children: [
        "40000005498",
        "40000005500",
        "40000005593",
        "40000005499",
        "40000005592",
      ],
    },
  ],
  ["40000004161", { id: "40000004161", name: "Hoparta", children: [] }],
  ["40000004160", { id: "40000004160", name: "Silivas", children: [] }],
  ["40000004159", { id: "40000004159", name: "Spalnaca", children: [] }],
  ["40000004162", { id: "40000004162", name: "Turdas", children: [] }],
  ["40000004163", { id: "40000004163", name: "Vama Seaca", children: [] }],
  [
    "30000001404",
    {
      id: "30000001404",
      name: "Hoparta",
      children: [
        "40000004161",
        "40000004160",
        "40000004159",
        "40000004162",
        "40000004163",
      ],
    },
  ],
  ["40000005587", { id: "40000005587", name: "Horea", children: [] }],
  ["40000005651", { id: "40000005651", name: "Mancesti", children: [] }],
  ["40000005605", { id: "40000005605", name: "Matisesti", children: [] }],
  [
    "30000001545",
    {
      id: "30000001545",
      name: "Horea",
      children: ["40000005587", "40000005651", "40000005605"],
    },
  ],
  [
    "40000004270",
    { id: "40000004270", name: "Bucerdea Vanoasa", children: [] },
  ],
  ["40000004267", { id: "40000004267", name: "Ighiel", children: [] }],
  ["40000004268", { id: "40000004268", name: "Ighiu", children: [] }],
  ["40000003995", { id: "40000003995", name: "Sard", children: [] }],
  ["40000004269", { id: "40000004269", name: "Telna", children: [] }],
  [
    "30000002975",
    {
      id: "30000002975",
      name: "Ighiu",
      children: [
        "40000004270",
        "40000004267",
        "40000004268",
        "40000003995",
        "40000004269",
      ],
    },
  ],
  ["40000004244", { id: "40000004244", name: "Intregalde", children: [] }],
  ["40000004245", { id: "40000004245", name: "Ivanis", children: [] }],
  ["40000004242", { id: "40000004242", name: "Modolesti", children: [] }],
  ["40000004239", { id: "40000004239", name: "Necrilesti", children: [] }],
  ["40000004246", { id: "40000004246", name: "Sfarcea", children: [] }],
  ["40000004272", { id: "40000004272", name: "Valea Mlacii", children: [] }],
  [
    "30000001360",
    {
      id: "30000001360",
      name: "Intregalde",
      children: [
        "40000004244",
        "40000004245",
        "40000004242",
        "40000004239",
        "40000004246",
        "40000004272",
      ],
    },
  ],
  ["40000004062", { id: "40000004062", name: "Balcaciu", children: [] }],
  ["40000004063", { id: "40000004063", name: "Capalna de Jos", children: [] }],
  ["40000003471", { id: "40000003471", name: "Feisa", children: [] }],
  ["40000004061", { id: "40000004061", name: "Jidvei", children: [] }],
  ["40000003470", { id: "40000003470", name: "Veseus", children: [] }],
  [
    "30000001357",
    {
      id: "30000001357",
      name: "Jidvei",
      children: [
        "40000004062",
        "40000004063",
        "40000003471",
        "40000004061",
        "40000003470",
      ],
    },
  ],
  ["40000004220", { id: "40000004220", name: "Izvoarele", children: [] }],
  ["40000004126", { id: "40000004126", name: "Livezile", children: [] }],
  ["40000004127", { id: "40000004127", name: "Poiana Aiudului", children: [] }],
  ["40000004221", { id: "40000004221", name: "Valisoara", children: [] }],
  [
    "30000001450",
    {
      id: "30000001450",
      name: "Livezile",
      children: ["40000004220", "40000004126", "40000004127", "40000004221"],
    },
  ],
  ["40000004204", { id: "40000004204", name: "Asinip", children: [] }],
  ["40000004150", { id: "40000004150", name: "Bagau", children: [] }],
  ["40000004148", { id: "40000004148", name: "Beta", children: [] }],
  ["40000004152", { id: "40000004152", name: "Ciuguzel", children: [] }],
  ["40000004149", { id: "40000004149", name: "Lopadea Noua", children: [] }],
  ["40000004068", { id: "40000004068", name: "Ocnisoara", children: [] }],
  ["40000004151", { id: "40000004151", name: "Odverem", children: [] }],
  [
    "30000001382",
    {
      id: "30000001382",
      name: "Lopadea Noua",
      children: [
        "40000004204",
        "40000004150",
        "40000004148",
        "40000004152",
        "40000004149",
        "40000004068",
        "40000004151",
      ],
    },
  ],
  ["40000004212", { id: "40000004212", name: "Gura Ariesului", children: [] }],
  ["40000004211", { id: "40000004211", name: "Lunca Muresului", children: [] }],
  [
    "30000001479",
    {
      id: "30000001479",
      name: "Lunca Muresului",
      children: ["40000004212", "40000004211"],
    },
  ],
  ["40000005683", { id: "40000005683", name: "Hadarau", children: [] }],
  ["40000005706", { id: "40000005706", name: "Lazuri", children: [] }],
  ["40000005681", { id: "40000005681", name: "Lunca", children: [] }],
  ["40000005705", { id: "40000005705", name: "Lupsa", children: [] }],
  ["40000005680", { id: "40000005680", name: "Manastire", children: [] }],
  ["40000005678", { id: "40000005678", name: "Margaia", children: [] }],
  ["40000005679", { id: "40000005679", name: "Musca", children: [] }],
  ["40000005708", { id: "40000005708", name: "Valea Lupsii", children: [] }],
  ["40000004265", { id: "40000004265", name: "Valea Sesii", children: [] }],
  [
    "30000001476",
    {
      id: "30000001476",
      name: "Lupsa",
      children: [
        "40000005683",
        "40000005706",
        "40000005681",
        "40000005705",
        "40000005680",
        "40000005678",
        "40000005679",
        "40000005708",
        "40000004265",
      ],
    },
  ],
  ["40000003992", { id: "40000003992", name: "Ampoita", children: [] }],
  ["40000003983", { id: "40000003983", name: "Isca", children: [] }],
  ["40000004266", { id: "40000004266", name: "Lunca Ampoitei", children: [] }],
  ["40000003991", { id: "40000003991", name: "Lunca Metesului", children: [] }],
  ["40000003985", { id: "40000003985", name: "Metes", children: [] }],
  ["40000003989", { id: "40000003989", name: "Padurea", children: [] }],
  [
    "40000003982",
    { id: "40000003982", name: "Poiana Ampoiului", children: [] },
  ],
  ["40000003986", { id: "40000003986", name: "Poiana Ursului", children: [] }],
  [
    "40000003987",
    { id: "40000003987", name: "Presaca Ampoiului", children: [] },
  ],
  ["40000003993", { id: "40000003993", name: "Remetea", children: [] }],
  ["40000003988", { id: "40000003988", name: "Tauti", children: [] }],
  ["40000003984", { id: "40000003984", name: "Valeni", children: [] }],
  [
    "30000001299",
    {
      id: "30000001299",
      name: "Metes",
      children: [
        "40000003992",
        "40000003983",
        "40000004266",
        "40000003991",
        "40000003985",
        "40000003989",
        "40000003982",
        "40000003986",
        "40000003987",
        "40000003993",
        "40000003988",
        "40000003984",
      ],
    },
  ],
  ["40000004116", { id: "40000004116", name: "Cistei", children: [] }],
  ["40000004118", { id: "40000004118", name: "Mihalt", children: [] }],
  ["40000004117", { id: "40000004117", name: "Obreja", children: [] }],
  ["40000004125", { id: "40000004125", name: "Zaries", children: [] }],
  [
    "30000001304",
    {
      id: "30000001304",
      name: "Mihalt",
      children: ["40000004116", "40000004118", "40000004117", "40000004125"],
    },
  ],
  ["40000004263", { id: "40000004263", name: "Cicau", children: [] }],
  ["40000004199", { id: "40000004199", name: "Decea", children: [] }],
  ["40000004264", { id: "40000004264", name: "Lopadea Veche", children: [] }],
  ["40000004213", { id: "40000004213", name: "Miraslau", children: [] }],
  ["40000004198", { id: "40000004198", name: "Ormenis", children: [] }],
  ["40000004147", { id: "40000004147", name: "Rachis", children: [] }],
  [
    "30000001444",
    {
      id: "30000001444",
      name: "Miraslau",
      children: [
        "40000004263",
        "40000004199",
        "40000004264",
        "40000004213",
        "40000004198",
        "40000004147",
      ],
    },
  ],
  ["40000004241", { id: "40000004241", name: "Barlesti", children: [] }],
  ["40000004240", { id: "40000004240", name: "Mamaligani", children: [] }],
  ["40000004243", { id: "40000004243", name: "Mogos", children: [] }],
  [
    "30000001385",
    {
      id: "30000001385",
      name: "Mogos",
      children: ["40000004241", "40000004240", "40000004243"],
    },
  ],
  ["40000004210", { id: "40000004210", name: "Captalan", children: [] }],
  ["40000004208", { id: "40000004208", name: "Copand", children: [] }],
  ["40000004205", { id: "40000004205", name: "Gabud", children: [] }],
  ["40000004206", { id: "40000004206", name: "Noslac", children: [] }],
  ["40000004209", { id: "40000004209", name: "Stana de Mures", children: [] }],
  ["40000004207", { id: "40000004207", name: "Valea Ciuciului", children: [] }],
  [
    "30000001475",
    {
      id: "30000001475",
      name: "Noslac",
      children: [
        "40000004210",
        "40000004208",
        "40000004205",
        "40000004206",
        "40000004209",
        "40000004207",
      ],
    },
  ],
  [
    "40000004202",
    { id: "40000004202", name: "Cisteiu de Mures", children: [] },
  ],
  ["40000004201", { id: "40000004201", name: "Micoslaca", children: [] }],
  ["40000004200", { id: "40000004200", name: "Ocna Mures", children: [] }],
  [
    "40000004203",
    { id: "40000004203", name: "Razboieni-Cetate", children: [] },
  ],
  [
    "30000001474",
    {
      id: "30000001474",
      name: "Ocna Mures",
      children: ["40000004202", "40000004201", "40000004200", "40000004203"],
    },
  ],
  ["40000002219", { id: "40000002219", name: "Lunca Larga", children: [] }],
  ["40000002220", { id: "40000002220", name: "Ocolis", children: [] }],
  ["40000002221", { id: "40000002221", name: "Runc", children: [] }],
  ["40000002218", { id: "40000002218", name: "Vidolm", children: [] }],
  [
    "30000001533",
    {
      id: "30000001533",
      name: "Ocolis",
      children: ["40000002219", "40000002220", "40000002221", "40000002218"],
    },
  ],
  ["40000004115", { id: "40000004115", name: "Colibi", children: [] }],
  ["40000004087", { id: "40000004087", name: "Maghierat", children: [] }],
  ["40000004085", { id: "40000004085", name: "Ohaba", children: [] }],
  ["40000004086", { id: "40000004086", name: "Secasel", children: [] }],
  [
    "30000001263",
    {
      id: "30000001263",
      name: "Ohaba",
      children: ["40000004115", "40000004087", "40000004085", "40000004086"],
    },
  ],
  ["40000003941", { id: "40000003941", name: "Pianu de Jos", children: [] }],
  ["40000003942", { id: "40000003942", name: "Pianu de Sus", children: [] }],
  ["40000003944", { id: "40000003944", name: "Plaiuri", children: [] }],
  ["40000003945", { id: "40000003945", name: "Purcareti", children: [] }],
  ["40000003946", { id: "40000003946", name: "Strungari", children: [] }],
  [
    "30000001165",
    {
      id: "30000001165",
      name: "Pianu",
      children: [
        "40000003941",
        "40000003942",
        "40000003944",
        "40000003945",
        "40000003946",
      ],
    },
  ],
  ["40000005582", { id: "40000005582", name: "Costesti", children: [] }],
  ["40000005577", { id: "40000005577", name: "Duduieni", children: [] }],
  ["40000005579", { id: "40000005579", name: "Fagetu de Jos", children: [] }],
  ["40000005600", { id: "40000005600", name: "Fagetu de Sus", children: [] }],
  ["40000005581", { id: "40000005581", name: "Hanasesti", children: [] }],
  ["40000005583", { id: "40000005583", name: "Lupaiesti", children: [] }],
  ["40000005497", { id: "40000005497", name: "Pastesti", children: [] }],
  ["40000005508", { id: "40000005508", name: "Petelei", children: [] }],
  ["40000005580", { id: "40000005580", name: "Poiana Vadului", children: [] }],
  ["40000005584", { id: "40000005584", name: "Stanesti", children: [] }],
  [
    "30000001458",
    {
      id: "30000001458",
      name: "Poiana Vadului",
      children: [
        "40000005582",
        "40000005577",
        "40000005579",
        "40000005600",
        "40000005581",
        "40000005583",
        "40000005497",
        "40000005508",
        "40000005580",
        "40000005584",
      ],
    },
  ],
  ["40000004255", { id: "40000004255", name: "Dupa Deal", children: [] }],
  ["40000004254", { id: "40000004254", name: "Geogel", children: [] }],
  ["40000004258", { id: "40000004258", name: "Macaresti", children: [] }],
  ["40000004259", { id: "40000004259", name: "Ponor", children: [] }],
  ["40000004251", { id: "40000004251", name: "Vale in Jos", children: [] }],
  ["40000004260", { id: "40000004260", name: "Valea Bucurului", children: [] }],
  [
    "30000001412",
    {
      id: "30000001412",
      name: "Ponor",
      children: [
        "40000004255",
        "40000004254",
        "40000004258",
        "40000004259",
        "40000004251",
        "40000004260",
      ],
    },
  ],
  ["40000002225", { id: "40000002225", name: "Cortesti", children: [] }],
  ["40000004223", { id: "40000004223", name: "Lunca", children: [] }],
  ["40000002224", { id: "40000002224", name: "Orasti", children: [] }],
  ["40000004224", { id: "40000004224", name: "Posaga de Jos", children: [] }],
  ["40000002223", { id: "40000002223", name: "Posaga de Sus", children: [] }],
  ["40000002226", { id: "40000002226", name: "Sagagea", children: [] }],
  [
    "30000001512",
    {
      id: "30000001512",
      name: "Posaga",
      children: [
        "40000002225",
        "40000004223",
        "40000002224",
        "40000004224",
        "40000002223",
        "40000002226",
      ],
    },
  ],
  ["40000004131", { id: "40000004131", name: "Leorint", children: [] }],
  ["40000004132", { id: "40000004132", name: "Mescreac", children: [] }],
  ["40000004134", { id: "40000004134", name: "Radesti", children: [] }],
  ["40000004133", { id: "40000004133", name: "Soimus", children: [] }],
  [
    "30000001351",
    {
      id: "30000001351",
      name: "Radesti",
      children: ["40000004131", "40000004132", "40000004134", "40000004133"],
    },
  ],
  ["40000004253", { id: "40000004253", name: "Bradesti", children: [] }],
  ["40000004256", { id: "40000004256", name: "Cotorasti", children: [] }],
  ["40000004249", { id: "40000004249", name: "Floresti", children: [] }],
  ["40000004261", { id: "40000004261", name: "Olteni", children: [] }],
  ["40000004252", { id: "40000004252", name: "Ramet", children: [] }],
  ["40000004248", { id: "40000004248", name: "Valea Fagetului", children: [] }],
  ["40000004250", { id: "40000004250", name: "Valea Inzelului", children: [] }],
  ["40000004257", { id: "40000004257", name: "Valea Poienii", children: [] }],
  [
    "30000001420",
    {
      id: "30000001420",
      name: "Ramet",
      children: [
        "40000004253",
        "40000004256",
        "40000004249",
        "40000004261",
        "40000004252",
        "40000004248",
        "40000004250",
        "40000004257",
      ],
    },
  ],
  ["40000004222", { id: "40000004222", name: "Coltesti", children: [] }],
  ["40000002217", { id: "40000002217", name: "Rametea", children: [] }],
  [
    "30000001496",
    {
      id: "30000001496",
      name: "Rametea",
      children: ["40000004222", "40000002217"],
    },
  ],
  ["40000005619", { id: "40000005619", name: "Carpinis", children: [] }],
  ["40000005692", { id: "40000005692", name: "Corna", children: [] }],
  ["40000005671", { id: "40000005671", name: "Gura Cornei", children: [] }],
  ["40000005618", { id: "40000005618", name: "Gura Rosiei", children: [] }],
  ["40000005693", { id: "40000005693", name: "Rosia Montana", children: [] }],
  [
    "30000001398",
    {
      id: "30000001398",
      name: "Rosia Montana",
      children: [
        "40000005619",
        "40000005692",
        "40000005671",
        "40000005618",
        "40000005693",
      ],
    },
  ],
  ["40000004076", { id: "40000004076", name: "Rosia de Secas", children: [] }],
  ["40000004077", { id: "40000004077", name: "Tau", children: [] }],
  ["40000004078", { id: "40000004078", name: "Ungurei", children: [] }],
  [
    "30000001243",
    {
      id: "30000001243",
      name: "Rosia de Secas",
      children: ["40000004076", "40000004077", "40000004078"],
    },
  ],
  ["40000004230", { id: "40000004230", name: "Dealu Caselor", children: [] }],
  ["40000004227", { id: "40000004227", name: "Dumesti", children: [] }],
  ["40000004226", { id: "40000004226", name: "Roine", children: [] }],
  ["40000004225", { id: "40000004225", name: "Salciua de Jos", children: [] }],
  ["40000004229", { id: "40000004229", name: "Salciua de Sus", children: [] }],
  ["40000004231", { id: "40000004231", name: "Sub Piatra", children: [] }],
  ["40000004232", { id: "40000004232", name: "Valea Larga", children: [] }],
  ["40000004228", { id: "40000004228", name: "Valea Matrii", children: [] }],
  [
    "30000001468",
    {
      id: "30000001468",
      name: "Salciua",
      children: [
        "40000004230",
        "40000004227",
        "40000004226",
        "40000004225",
        "40000004229",
        "40000004231",
        "40000004232",
        "40000004228",
      ],
    },
  ],
  ["40000003938", { id: "40000003938", name: "Salistea", children: [] }],
  ["40000003939", { id: "40000003939", name: "Salistea-Deal", children: [] }],
  ["40000003937", { id: "40000003937", name: "Tartaria", children: [] }],
  [
    "30000001163",
    {
      id: "30000001163",
      name: "Salistea",
      children: ["40000003938", "40000003939", "40000003937"],
    },
  ],
  ["40000004065", { id: "40000004065", name: "Iclod", children: [] }],
  ["40000004064", { id: "40000004064", name: "Panade", children: [] }],
  ["40000004069", { id: "40000004069", name: "Sancel", children: [] }],
  [
    "30000002519",
    {
      id: "30000002519",
      name: "Sancel",
      children: ["40000004065", "40000004064", "40000004069"],
    },
  ],
  ["40000004123", { id: "40000004123", name: "Coslariu", children: [] }],
  ["40000004154", { id: "40000004154", name: "Coslariu Nou", children: [] }],
  ["40000003936", { id: "40000003936", name: "Dumitra", children: [] }],
  ["40000004124", { id: "40000004124", name: "Galtiu", children: [] }],
  ["40000003935", { id: "40000003935", name: "Santimbru", children: [] }],
  ["40000003934", { id: "40000003934", name: "Totoi", children: [] }],
  [
    "30000001286",
    {
      id: "30000001286",
      name: "Santimbru",
      children: [
        "40000004123",
        "40000004154",
        "40000003936",
        "40000004124",
        "40000003935",
        "40000003934",
      ],
    },
  ],
  ["40000003954", { id: "40000003954", name: "Capalna", children: [] }],
  ["40000003953", { id: "40000003953", name: "Dumbrava", children: [] }],
  ["40000003955", { id: "40000003955", name: "Laz", children: [] }],
  ["40000003948", { id: "40000003948", name: "Loman", children: [] }],
  ["40000003950", { id: "40000003950", name: "Rachita", children: [] }],
  ["40000003952", { id: "40000003952", name: "Sasciori", children: [] }],
  ["40000003949", { id: "40000003949", name: "Sebesel", children: [] }],
  [
    "30000001128",
    {
      id: "30000001128",
      name: "Sasciori",
      children: [
        "40000003954",
        "40000003953",
        "40000003955",
        "40000003948",
        "40000003950",
        "40000003952",
        "40000003949",
      ],
    },
  ],
  ["40000005589", { id: "40000005589", name: "Barlesti", children: [] }],
  ["40000005590", { id: "40000005590", name: "Botesti", children: [] }],
  ["40000005604", { id: "40000005604", name: "Fata-Lazesti", children: [] }],
  ["40000005588", { id: "40000005588", name: "Matei", children: [] }],
  ["40000005591", { id: "40000005591", name: "Scarisoara", children: [] }],
  [
    "30000001543",
    {
      id: "30000001543",
      name: "Scarisoara",
      children: [
        "40000005589",
        "40000005590",
        "40000005604",
        "40000005588",
        "40000005591",
      ],
    },
  ],
  ["40000004015", { id: "40000004015", name: "Lancram", children: [] }],
  ["40000004012", { id: "40000004012", name: "Petresti", children: [] }],
  ["40000004010", { id: "40000004010", name: "Rahau", children: [] }],
  ["40000004011", { id: "40000004011", name: "Sebes", children: [] }],
  [
    "30000001197",
    {
      id: "30000001197",
      name: "Sebes",
      children: ["40000004015", "40000004012", "40000004010", "40000004011"],
    },
  ],
  ["40000003966", { id: "40000003966", name: "Bacainti", children: [] }],
  [
    "40000003965",
    { id: "40000003965", name: "Balomiru de Camp", children: [] },
  ],
  ["40000003964", { id: "40000003964", name: "Saracsau", children: [] }],
  ["40000003967", { id: "40000003967", name: "Sibot", children: [] }],
  [
    "30000001169",
    {
      id: "30000001169",
      name: "Sibot",
      children: ["40000003966", "40000003965", "40000003964", "40000003967"],
    },
  ],
  ["40000005616", { id: "40000005616", name: "Gura Sohodol", children: [] }],
  ["40000005607", { id: "40000005607", name: "Lazuri", children: [] }],
  ["40000005614", { id: "40000005614", name: "Poiana", children: [] }],
  ["40000005615", { id: "40000005615", name: "Sohodol", children: [] }],
  [
    "30000001416",
    {
      id: "30000001416",
      name: "Sohodol",
      children: ["40000005616", "40000005607", "40000005614", "40000005615"],
    },
  ],
  ["40000004194", { id: "40000004194", name: "Alecus", children: [] }],
  ["40000004059", { id: "40000004059", name: "Biia", children: [] }],
  ["40000004057", { id: "40000004057", name: "Lunca Tarnavei", children: [] }],
  ["40000004055", { id: "40000004055", name: "Sanmiclaus", children: [] }],
  ["40000004058", { id: "40000004058", name: "Sona", children: [] }],
  ["40000004195", { id: "40000004195", name: "Valea Sasului", children: [] }],
  [
    "30000001372",
    {
      id: "30000001372",
      name: "Sona",
      children: [
        "40000004194",
        "40000004059",
        "40000004057",
        "40000004055",
        "40000004058",
        "40000004195",
      ],
    },
  ],
  ["40000004081", { id: "40000004081", name: "Carpen", children: [] }],
  ["40000004091", { id: "40000004091", name: "Carpenii de Sus", children: [] }],
  ["40000004082", { id: "40000004082", name: "Cunta", children: [] }],
  ["40000004083", { id: "40000004083", name: "Drasov", children: [] }],
  ["40000004079", { id: "40000004079", name: "Spring", children: [] }],
  ["40000004080", { id: "40000004080", name: "Vingard", children: [] }],
  [
    "30000001222",
    {
      id: "30000001222",
      name: "Spring",
      children: [
        "40000004081",
        "40000004091",
        "40000004082",
        "40000004083",
        "40000004079",
        "40000004080",
      ],
    },
  ],
  ["40000004262", { id: "40000004262", name: "Fata Pietrii", children: [] }],
  ["40000004247", { id: "40000004247", name: "Geoagiu de Sus", children: [] }],
  ["40000004137", { id: "40000004137", name: "Geomal", children: [] }],
  ["40000004153", { id: "40000004153", name: "Stremt", children: [] }],
  [
    "30000001361",
    {
      id: "30000001361",
      name: "Stremt",
      children: ["40000004262", "40000004247", "40000004137", "40000004153"],
    },
  ],
  ["40000004022", { id: "40000004022", name: "Dobra", children: [] }],
  ["40000003961", { id: "40000003961", name: "Martinie", children: [] }],
  ["40000003963", { id: "40000003963", name: "Sugag", children: [] }],
  ["40000003962", { id: "40000003962", name: "Tau Bistra", children: [] }],
  [
    "30000002524",
    {
      id: "30000002524",
      name: "Sugag",
      children: ["40000004022", "40000003961", "40000003963", "40000003962"],
    },
  ],
  ["40000004128", { id: "40000004128", name: "Beldiu", children: [] }],
  ["40000004130", { id: "40000004130", name: "Capud", children: [] }],
  ["40000004129", { id: "40000004129", name: "Petelca", children: [] }],
  ["40000004138", { id: "40000004138", name: "Teius", children: [] }],
  [
    "30000001323",
    {
      id: "30000001323",
      name: "Teius",
      children: ["40000004128", "40000004130", "40000004129", "40000004138"],
    },
  ],
  ["40000004169", { id: "40000004169", name: "Ciugudu de Jos", children: [] }],
  ["40000004156", { id: "40000004156", name: "Ciugudu de Sus", children: [] }],
  ["40000004157", { id: "40000004157", name: "Dumbrava", children: [] }],
  ["40000004170", { id: "40000004170", name: "Inoc", children: [] }],
  ["40000004158", { id: "40000004158", name: "Mahaceni", children: [] }],
  ["40000004155", { id: "40000004155", name: "Unirea", children: [] }],
  [
    "30000001484",
    {
      id: "30000001484",
      name: "Unirea",
      children: [
        "40000004169",
        "40000004156",
        "40000004157",
        "40000004170",
        "40000004158",
        "40000004155",
      ],
    },
  ],
  ["40000005571", { id: "40000005571", name: "Lazesti", children: [] }],
  ["40000005578", { id: "40000005578", name: "Morcanesti", children: [] }],
  ["40000005573", { id: "40000005573", name: "Necsesti", children: [] }],
  ["40000005606", { id: "40000005606", name: "Popestii de Jos", children: [] }],
  ["40000005574", { id: "40000005574", name: "Popestii de Sus", children: [] }],
  ["40000005575", { id: "40000005575", name: "Rogoz", children: [] }],
  ["40000005570", { id: "40000005570", name: "Tomutesti", children: [] }],
  ["40000005601", { id: "40000005601", name: "Vadu Motilor", children: [] }],
  ["40000005576", { id: "40000005576", name: "Valtori", children: [] }],
  [
    "30000001472",
    {
      id: "30000001472",
      name: "Vadu Motilor",
      children: [
        "40000005571",
        "40000005578",
        "40000005573",
        "40000005606",
        "40000005574",
        "40000005575",
        "40000005570",
        "40000005601",
        "40000005576",
      ],
    },
  ],
  ["40000003465", { id: "40000003465", name: "Faget", children: [] }],
  ["40000004056", { id: "40000004056", name: "Glogovet", children: [] }],
  ["40000004054", { id: "40000004054", name: "Lodroman", children: [] }],
  ["40000004050", { id: "40000004050", name: "Lunca", children: [] }],
  ["40000003464", { id: "40000003464", name: "Tauni", children: [] }],
  ["40000004060", { id: "40000004060", name: "Valea Lunga", children: [] }],
  [
    "30000001282",
    {
      id: "30000001282",
      name: "Valea Lunga",
      children: [
        "40000003465",
        "40000004056",
        "40000004054",
        "40000004050",
        "40000003464",
        "40000004060",
      ],
    },
  ],
  ["40000005567", { id: "40000005567", name: "Bai", children: [] }],
  ["40000005594", { id: "40000005594", name: "Dos", children: [] }],
  ["40000005599", { id: "40000005599", name: "Goiesti", children: [] }],
  ["40000005596", { id: "40000005596", name: "Lunca", children: [] }],
  ["40000005568", { id: "40000005568", name: "Lunca de Jos", children: [] }],
  ["40000005565", { id: "40000005565", name: "Plescuta", children: [] }],
  ["40000005595", { id: "40000005595", name: "Ponorel", children: [] }],
  ["40000005597", { id: "40000005597", name: "Valea Morii", children: [] }],
  ["40000005566", { id: "40000005566", name: "Vartanesti", children: [] }],
  ["40000005598", { id: "40000005598", name: "Vidra", children: [] }],
  [
    "30000001439",
    {
      id: "30000001439",
      name: "Vidra",
      children: [
        "40000005567",
        "40000005594",
        "40000005599",
        "40000005596",
        "40000005568",
        "40000005565",
        "40000005595",
        "40000005597",
        "40000005566",
        "40000005598",
      ],
    },
  ],
  ["40000004001", { id: "40000004001", name: "Campu Goblii", children: [] }],
  ["40000003996", { id: "40000003996", name: "Codrisor", children: [] }],
  ["40000004000", { id: "40000004000", name: "Mereteu", children: [] }],
  ["40000004014", { id: "40000004014", name: "Parau lui Mihai", children: [] }],
  ["40000004013", { id: "40000004013", name: "Sibiseni", children: [] }],
  ["40000003997", { id: "40000003997", name: "Valea Goblii", children: [] }],
  ["40000003999", { id: "40000003999", name: "Valea Vintului", children: [] }],
  ["40000004021", { id: "40000004021", name: "Vintu de Jos", children: [] }],
  ["40000003998", { id: "40000003998", name: "Vurpar", children: [] }],
  [
    "30000001228",
    {
      id: "30000001228",
      name: "Vintu de Jos",
      children: [
        "40000004001",
        "40000003996",
        "40000004000",
        "40000004014",
        "40000004013",
        "40000003997",
        "40000003999",
        "40000004021",
        "40000003998",
      ],
    },
  ],
  ["40000005710", { id: "40000005710", name: "Botesti", children: [] }],
  ["40000005715", { id: "40000005715", name: "Budeni", children: [] }],
  ["40000003980", { id: "40000003980", name: "Fenes", children: [] }],
  ["40000003979", { id: "40000003979", name: "Galati", children: [] }],
  [
    "40000005713",
    { id: "40000005713", name: "Izvoru Ampoiului", children: [] },
  ],
  ["40000005716", { id: "40000005716", name: "Parau Gruiului", children: [] }],
  ["40000003981", { id: "40000003981", name: "Patrangeni", children: [] }],
  ["40000005714", { id: "40000005714", name: "Pirita", children: [] }],
  ["40000003978", { id: "40000003978", name: "Podu lui Paul", children: [] }],
  ["40000003975", { id: "40000003975", name: "Suseni", children: [] }],
  ["40000005712", { id: "40000005712", name: "Trampoiele", children: [] }],
  ["40000003977", { id: "40000003977", name: "Valea Mica", children: [] }],
  ["40000005711", { id: "40000005711", name: "Valtori", children: [] }],
  ["40000003976", { id: "40000003976", name: "Zlatna", children: [] }],
  [
    "30000001319",
    {
      id: "30000001319",
      name: "Zlatna",
      children: [
        "40000005710",
        "40000005715",
        "40000003980",
        "40000003979",
        "40000005713",
        "40000005716",
        "40000003981",
        "40000005714",
        "40000003978",
        "40000003975",
        "40000005712",
        "40000003977",
        "40000005711",
        "40000003976",
      ],
    },
  ],
];

export function findLocID(locname: string) {
  const foundLocation = LOC_DATA.find((e) => {
    if (typeof e[1] === "object" && e[1] !== null) {
      // Check if the element is an object with the expected properties
      return e[1].name === locname;
    }
    return false;
  });
  if (foundLocation && typeof foundLocation[1] !== "undefined") {
    const locationData = foundLocation[1] as LocationData; // Assert type as LocationData
    return locationData.id;
  } else {
    return "";
  }
}

export async function getRedirect(obj: OBJ, buildId: string) {
  const { estate, transaction, city } = obj;
  const oa = o[estate];
  const ta = t[transaction];
  const url = `
  https://www.storia.ro/_next/data/${buildId}/ro/rezultate/${ta}/${oa}/${city.toLowerCase()}.json?page=1&limit=72`;
  // const res = await fetch(url, {
  //   headers: Headers as HeadersInit,
  // });
  // console.log("Get REdirect status", url);

  // const data: any = await res.json();
  // return addJsonToUrl(
  //   `https://www.storia.ro/_next/data/${buildId}/` + data.pageProps.__N_REDIRECT
  // );

  return url;
}

// function addJsonToUrl(url: string) {
//   const queryStringIndex = url.indexOf("?");
//   const baseUrl = queryStringIndex > -1 ? url.slice(0, queryStringIndex) : url;
//   const queryString = queryStringIndex > -1 ? url.slice(queryStringIndex) : "";
//   return `${baseUrl}.json${queryString}`;
// }

export function getBuildId(parser: Document) {
  let buildId = null;
  const scriptElements = parser.getElementsByTagName("script");
  for (let i = 0; i < scriptElements.length; i++) {
    const src = scriptElements[i].getAttribute("src");
    if (src && src.includes("/_buildManifest.js")) {
      const parts = src.split("/");
      buildId = parts[parts.indexOf("static") + 1];
      break;
    }
  }
  return buildId;
}

const mode = ["ansamblu", "oferta"];
function getAdURL(slug: string, BUILDID: string, estate: string) {
  console.log(estate);
  const m = estate == "Ansambluri" ? mode[0] : mode[1];
  const url = `https://www.storia.ro/_next/data/${BUILDID}/ro/${m}/${slug}.json?lang=ro&id=${slug}`;
  return url;
}

export async function startf(
  URL: string,
  BUILDID: string,
  proxylist: ProxyList,
  file: string,
  filters: OBJ,
  onEvent: (
    event: "progress" | "count" | "complete",
    c: number | boolean
  ) => void
) {
  if (!logger) {
    console.error("Logger Callback not defined ");
    return;
  }
  const Writer = new JSONWriter(file);
  console.log("STart fuck");
  console.log("fetch Url ", URL);
  const temp: any = await (
    await fetch(URL, { headers: Headers as HeadersInit })
  ).json();
  console.log("from engine", URL);

  const max = temp.pageProps.data.searchAds.pagination.totalPages;
  let Loopfailed: any[] = [];
  // send count
  const stepper = max !== 0 ? 1 : 0;
  for (let loop = 1; loop <= max + stepper; loop += 1) {
    logger?.log(`Looping <b>${max}<b> => <b>${loop}</b>`);
    const response = await fetch(URL.replace(/page=\d+/, "page=" + loop), {
      headers: Headers as HeadersInit,
    });
    try {
      if (response.ok) {
        const Intialdata: any = await response.json();
        // ids = 0: {id: 7572173, slug: 'garsoniera-viaduct-p-4-IDwLRP'}
        let ids: { id: string; slug: string }[] =
          Intialdata.pageProps.data.searchAds.items.map(
            (e: { id: string; slug: string }) => ({
              id: e.id,
              slug: e.slug,
            })
          );
        console.log(`Page Contain <b>${ids.length}</b> of Ads`);
        if (Loopfailed.length > 0) ids = ids.concat(Loopfailed);

        try {
          proxylist.getProxy();
        } catch {
          // eslint-disable-next-line no-constant-condition
          while (true) {
            logger?.log("No Proxy servers useable - Entering 50s Idel Time");
            await sleep(50000);
            if (typeof proxylist.getProxy() == typeof Proxy) {
              logger?.log("Proxy Get Free");
              break;
            }
          }
        }
        // res =  { succeeded, failed }
        const { data, failed, failedReq } = await getAds(
          ids,
          BUILDID,
          proxylist,
          filters.estate
        );
        ids = [];
        logger?.log(`got <b>${failed} </b> Failed Request -  Retring`);
        if (data.length > 0) Writer.appendData(data);
        if (failedReq.length > 0) Loopfailed = failedReq;
        // send Progress
        const p = Math.floor((loop / max) * 100);
        if (onEvent) onEvent("progress", p);
        // do something with response here, not outside the function
      } else if (response.status >= 500 && response.status < 600) {
        console.log("error @ Start 1 ");
        loop = loop - 1;
        continue;
      }
    } catch (err) {
      console.error("error @ Start 2 ", err);
      loop = loop - 1;
      continue;
    }
  }
  await sleep(5000);
  Writer.close();
  if (onEvent) onEvent("complete", true);
  logger?.log("****** Json Writer Commited ************");
}

async function getAds(
  ids: { id: string; slug: string }[],
  BuildID: string,
  proxylist: ProxyList,
  estate: string
) {
  logger?.log(
    ` Get Ads calling - <b>${ids.length}</b> - Hash :  <i>${BuildID}</i>`
  );
  const promises: any[] = [];
  let succeeded = 0;
  let failed = 0;
  const data: any[] = [];
  let proxy = proxylist.getProxy();
  const failedReq: any[] = [];
  // eslint-disable-next-line no-constant-condition

  for (const i of ids) {
    if (succeeded >= ids.length) {
      console.log("Worker Break here");
      break;
    }

    await sleep(50);

    if (!proxy.canUse()) {
      try {
        proxy = proxylist.getProxy();
      } catch {
        break;
      }
    }
    if (proxy.canUse()) console.log(getAdURL(i.slug, BuildID, estate));

    promises.push(
      proxy
        .fetch(
          getAdURL(i.slug, BuildID, estate),
          Headers as RawAxiosRequestHeaders
        )

        .then((response: AxiosResponse) => {
          // if (response.status >= 410 && response.status < 600)
          if (response.status != 200) {
            logger?.log(
              `Request Failed (Retring) Due to  : ${response.status} `
            );
            logger?.warn(
              `<i> ${proxy.getProxyString()["less"]} </i> -  set 5 minute Idle `
            );
            failed += 1;
            failedReq.push(i);
            proxy.setWait();
            throw new Error(`Server error: ${response.status}`);
          }
          try {
            const parseddaat = parseAd(response.data["pageProps"]["ad"]);
            succeeded++;

            data.push(parseddaat);
          } catch (e) {
            logger?.error(e as string);
            console.log(e);
            failed += 1;
            failedReq.push(i);
            /* empty */
          }
        })
        .catch((error: AxiosError) => {
          console.error("Error:", error.status);
          logger?.warn(
            `<i> ${proxy.getProxyString()["less"]}</i> -  set 5 minute Idle `
          );
          proxy.setWait();
          failed += 1;
          failedReq.push(i);
        })
    );
  }

  await Promise.all(promises);

  logger?.log(
    `Successful requests: <b>${succeeded} </b>, Failed requests: <b> ${failed} </b>`
  );

  return { succeeded, failed, data, failedReq };
}
// THis function Return Promise After Seconds of input   2023/

function sleep(ms: number): Promise<unknown> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
