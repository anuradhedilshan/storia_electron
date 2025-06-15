import axios, { AxiosResponse } from "axios";

// Type definitions
type TransactionType = "SELL" | "RENT";
type PropertyTypeKey =
  | "Apartamente"
  | "Garsoniere"
  | "Case"
  | "Ansambluri"
  | "Camere"
  | "Terenuri"
  | "Spații comerciale"
  | "Hale și depozite"
  | "Birouri"
  | "Garaje";
type EstateType =
  | "FLAT"
  | "HOUSE"
  | "INVESTMENT"
  | "ROOM"
  | "TERRAIN"
  | "COMMERCIAL_PROPERTY"
  | "HALL"
  | "OFFICE"
  | "GARAGE";

interface FilterAttributes {
  estate: EstateType;
  hasDiscount: boolean;
  hasMovie: boolean;
  hasOpenDay: boolean;
  hasPhotos: boolean;
  hasRemoteServices: boolean;
  hasWalkaround: boolean;
  isBungalov: boolean;
  isForStudents: boolean;
  isPrivateOwner: boolean;
  isRecreational: boolean;
  market: string;
  ownerTypeSingleSelect: string;
  transaction: TransactionType;
  roomsNumber?: string[];
  [key: string]: any;
}

interface FilterLocations {
  byDomainId?: Array<{ domainId: string }>;
  [key: string]: any;
}

interface PropertyConfig {
  estate: EstateType;
  transaction: TransactionType;
  roomsNumber?: string[];
}

interface StoriaApiResponse {
  data?: {
    countAds?: {
      count: number;
      __typename: string;
    };
  };
  errors?: Array<{ message: string }>;
}

interface BatchConfig {
  propertyType: PropertyTypeKey;
  transaction?: TransactionType;
  location?: string | string[];
  additionalFilters?: Partial<FilterAttributes>;
}

interface BatchResult extends BatchConfig {
  count?: number;
  error?: string;
  success: boolean;
}

// Constants for transaction types
const transactionTypes: Record<string, TransactionType> = {
  SELL: "SELL",
  RENT: "RENT",
};

// Property configurations with their specific parameters
const propertyConfigs: Record<PropertyTypeKey, PropertyConfig> = {
  Apartamente: {
    estate: "FLAT",
    transaction: "SELL",
  },
  Garsoniere: {
    estate: "FLAT",
    transaction: "SELL",
    roomsNumber: ["ONE"],
  },
  Case: {
    estate: "HOUSE",
    transaction: "SELL",
  },
  Ansambluri: {
    estate: "INVESTMENT",
    transaction: "SELL",
  },
  Camere: {
    estate: "ROOM",
    transaction: "RENT",
  },
  Terenuri: {
    estate: "TERRAIN",
    transaction: "SELL",
  },
  "Spații comerciale": {
    estate: "COMMERCIAL_PROPERTY",
    transaction: "RENT",
  },
  "Hale și depozite": {
    estate: "HALL",
    transaction: "SELL",
  },
  Birouri: {
    estate: "OFFICE",
    transaction: "RENT",
  },
  Garaje: {
    estate: "GARAGE",
    transaction: "RENT",
  },
};

/**
 * Fetches property count from Storia.ro API
 * @param propertyType - Property type (e.g., "Apartamente", "Case", etc.)
 * @param transaction - Transaction type ("SELL" or "RENT") - will override default if provided
 * @param location - Location filter (domain ID like "alba" or array of domain IDs)
 * @param additionalFilters - Additional filter attributes
 * @returns Promise<number> - Property count
 */
async function getStoriaPropertyCount(
  propertyType: PropertyTypeKey,
  transaction?: TransactionType | null,
  location?: string | null,
  additionalFilters: Partial<FilterAttributes> = {}
): Promise<number> {
  // Validate property type
  if (!propertyConfigs[propertyType]) {
    throw new Error(
      `Invalid property type: ${propertyType}. Available types: ${Object.keys(
        propertyConfigs
      ).join(", ")}`
    );
  }

  // Get base configuration for the property type
  const config: PropertyConfig = { ...propertyConfigs[propertyType] };

  // Override transaction if provided
  if (transaction) {
    if (!transactionTypes[transaction]) {
      throw new Error(
        `Invalid transaction type: ${transaction}. Use "SELL" or "RENT"`
      );
    }
    config.transaction = transaction;
  }

  // Build filter attributes
  const filterAttributes: FilterAttributes = {
    estate: config.estate,
    hasDiscount: false,
    hasMovie: false,
    hasOpenDay: false,
    hasPhotos: false,
    hasRemoteServices: false,
    hasWalkaround: false,
    isBungalov: false,
    isForStudents: false,
    isPrivateOwner: false,
    isRecreational: false,
    market: "ALL",
    ownerTypeSingleSelect: "ALL",
    transaction: config.transaction,
    ...additionalFilters,
  };

  // Add roomsNumber for Garsoniere
  if (config.roomsNumber) {
    filterAttributes.roomsNumber = config.roomsNumber;
  }

  // Build filter locations
  const filterLocations: FilterLocations = {};
  if (location) {
    if (location != "toata-romania") {
      filterLocations.byDomainId = [{ domainId: location.toLowerCase() }];
    }
  }

  // Build the variables object
  const variables = {
    filterAttributes,
    filterLocations,
  };

  console.log(variables);
  

  // API endpoint and parameters
  const url = "https://www.storia.ro/api/query";
  const params = {
    // operationName: "CountAds",
    query: `query CountAds($filterAttributes: FilterAttributes, $filterLocations: FilterLocations) {
  countAds(filterAttributes: $filterAttributes, filterLocations: $filterLocations) {
    __typename
    ... on CountAds {
      count
      __typename
    }
  }
}`,
    variables: JSON.stringify(variables),
    // extensions: JSON.stringify({
    //   persistedQuery: {
    //     sha256Hash:
    //       "61c633240ac9821be831e1b01d5162d5e22f6811e4b8c28fa4fb813a69c93b66",
    //     version: 1,
    //   },
    // }),
  };

  // Request headers
  const headers = {
    accept:
      "application/graphql-response+json, application/graphql+json, application/json, text/event-stream, multipart/mixed",
    "accept-language": "en-US,en;q=0.9,si;q=0.8",
    "is-desktop": "true",
    priority: "u=1, i",
    referer: "https://www.storia.ro/",
    "user-agent":
      "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Safari/537.36",
  };

  try {
    const response: AxiosResponse<StoriaApiResponse> = await axios.get(url, {
      params,
      headers,
    });

    if (response.data.errors) {
      throw new Error(
        `GraphQL errors: ${JSON.stringify(response.data.errors)}`
      );
    }

    return response.data.data?.countAds?.count || 0;
  } catch (error) {
    console.error("Error fetching property count:", error);
    throw error;
  }
}

// Usage examples:

// Example 1: Get apartment count for sale (default)
// getStoriaPropertyCount("Apartamente").then(count => console.log("Apartamente count:", count));

// Example 2: Get house count for rent (override default transaction)
// getStoriaPropertyCount("Case", "RENT").then(count => console.log("Case for rent:", count));

// Example 3: Get apartments in Alba county
// getStoriaPropertyCount("Apartamente", null, "alba").then(count => console.log("Apartamente in Alba:", count));

// Example 4: Get commercial spaces in multiple locations
// getStoriaPropertyCount("Spații comerciale", null, ["alba", "bucuresti"]).then(count => console.log("Commercial spaces:", count));

// Example 5: Batch fetch multiple property types
// const batchConfigs: BatchConfig[] = [
//   { propertyType: "Apartamente" },
//   { propertyType: "Case" },
//   { propertyType: "Apartamente", location: "alba" },
//   { propertyType: "Garsoniere", location: "bucuresti" }
// ];
// getBatchPropertyCounts(batchConfigs).then(results => console.log("Batch results:", results));

// Export the functions and types
export {
  getStoriaPropertyCount,
  propertyConfigs,
  transactionTypes,
  type PropertyTypeKey,
  type TransactionType,
  type BatchConfig,
  type BatchResult,
  type FilterAttributes,
  type FilterLocations,
};
