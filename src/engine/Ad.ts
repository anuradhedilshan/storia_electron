/* eslint-disable @typescript-eslint/no-explicit-any */
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
    area: data.target?.Area || "N/A",
    MarketType: getObjectValue(data.target?.MarketType),
    ProperType: getObjectValue(data.target?.ProperType),
    Rooms_num: getObjectValue(data.target?.Rooms_num),
    Price: data.target?.Price || "N/A",
    Price_per_m: getObjectValue(data.target?.Price_per_m),
    user_type: getObjectValue(data.target?.user_type),
    OfferType: getObjectValue(data.target?.OfferType),
    // property props
    property_area: data.property?.area?.value || "N/A",
    numberOfRooms: data.property?.properties?.numberOfRooms || "N/A",
    numberOfFloors: data.property?.buildingProperties?.numberOfFloors || "N/A",
    year: data.property?.buildingProperties?.year || "N/A",
    building_type: data.property?.buildingProperties?.type || "N/A",
    material: data.property?.buildingProperties?.material || "N/A",
    // characteristics
    ...characteristicsFormateData(data),
    // topInfo
    ...formatData(data, "topInformation"),
    // additionalInformation
    ...formatData(data, "additionalInformation"),
    // location
    latitude: data.location?.coordinates?.latitude || "N/A",
    longitude: data.location?.coordinates?.longitude || "N/A",
    // address
    street: data.location?.address?.street || "N/A",
    subdistrict: data.location?.address?.subdistrict || "N/A",
    district: data.location?.address?.district || "N/A",
    city: data.location?.address?.city?.name || "N/A",
    municipality: data.location?.address?.municipality || "N/A",
    postalCode: data.location?.address?.postalCode || "N/A",
    province: data.location?.address?.province?.name || "N/A",
    county: data.location?.address?.county?.name || "N/A",
    // owner
    ownerName: data.owner?.name || "N/A",
    ownerType: data.owner?.type || "N/A",
    phones: `[${data.owner?.phones?.toString() || ""}]`,
    // other
    title: data.title || "N/A",
    description: data.description || "N/A",
    url: data.url || "N/A",
    externalId: data.externalId || "N/A"
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
  } else if (obj === undefined || obj === null) {
    return "N/A";
  } else {
    return obj.toString();
  }
}

function characteristicsFormateData(data: any) {
  if (!Array.isArray(data["characteristics"])) return {};
  return data["characteristics"].reduce(
    (obj: any, info: { label: any; localizedValue: any }) => {
      const { label, localizedValue } = info;
      const value = localizedValue !== "" ? localizedValue : "N/A";
      return Object.assign(obj, { [label]: value });
    },
    {}
  );
}

function formatData(data: { [x: string]: any[] }, key: string) {
  if (!Array.isArray(data[key])) return {};
  return data[key].reduce((obj: any, info: { label: any; values: any }) => {
    const { label, values } = info;
    const value = values.length > 0 ? values[0] : "N/A";
    return Object.assign(obj, { [label]: value });
  }, {});
}
