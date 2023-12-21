export default function parseAd(data: any): string {
  delete data.images;
  const d = {
    id: data.id,
    market: data.market,
    advertiserType: data.advertiserType,
    advertType: data.advertType,
    createdAt: data.createdAt,
    modifiedAt: data.modifiedAt,
    developmentTitle: data.developmentTitle,
    exclusiveOffer: data.exclusiveOffer,
    features: getObjectValue(data.features),
    // target
    area: data.target.Area,
    Building_floors_num: getObjectValue(data.target.Building_floors_num),
    Building_type: getObjectValue(data.target.Building_type),
    Condition: getObjectValue(data.target.Condition),
    Construction_year: getObjectValue(data.target.Construction_year),
    Infrastructure: getObjectValue(data.target.Infrastructure),
    Location: getObjectValue(data.target.Location),
    Main: getObjectValue(data.target.Main),
    MarketType: getObjectValue(data.target.MarketType),
    Price_per_m: getObjectValue(data.target.Price_per_m),
    ProperType: getObjectValue(data.target.ProperType),
    Rooms_num: getObjectValue(data.target.Rooms_num),
    Security: getObjectValue(data.target.Security),
    Wc_count: getObjectValue(data.target.Wc_count),
    user_type: getObjectValue(data.target.user_type),
    // characteristics
    ...characteristicsFormateData(data),
    // topInfo
    ...formatData(data, "topInformation"),
    // additionalInformation
    ...formatData(data, "additionalInformation"),
    // location
    latitude: data.location.coordinates.latitude,
    longitude: data.location.coordinates.longitude,
    // address
    street: data.location?.address?.street?.name || "N/A",
    subdistrict: data.location?.address?.subdistrict || "N/A",
    district: data.location?.address?.district || "N/A",
    city: data.location?.address?.city?.name || "N/A",
    municipality: data.location?.address?.municipality || "N/A",
    postalCode: data.location?.address?.postalCode || "N/A",
    // owner
    ownerName: data.owner?.name || "N/A",
    ownerType: data.owner?.type || "N/A",
    phones: `[${data.owner.phones.toString()}]`,
  };

  return d;
}

function getObjectValue(obj: any) {
  if (Array.isArray(obj)) {
    if (obj.length === 0) {
      return "N/A";
    } else if (obj.length === 1) {
      return obj[0];
    } else {
      return `[${obj.toString()}]`;
    }
  } else if (obj === undefined) {
    return "N/A";
  } else {
    return obj.toString();
  }
}

function characteristicsFormateData(data: any) {
  return data["characteristics"].reduce(
    (obj: any, info: { label: any; localizedValue: any }) => {
      const { label, localizedValue } = info;
      const value = localizedValue != "" ? localizedValue : "N/A";
      return Object.assign(obj, { [label]: value });
    },
    {}
  );
}

function formatData(data: { [x: string]: any[] }, key: string) {
  return data[key].reduce((obj: any, info: { label: any; values: any }) => {
    const { label, values } = info;
    const value = values.length > 0 ? values[0] : "N/A";
    return Object.assign(obj, { [label]: value });
  }, {});
}
