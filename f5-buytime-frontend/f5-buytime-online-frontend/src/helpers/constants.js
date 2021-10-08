export const BEARER = 'bearer';
export const PAGE_SIZE = 12;
export const META_DATE = process.env.REACT_APP_META || " ";
export const MAP_BG = process.env.REACT_APP_MAP_BG;
export const DEFAULT_COUNTRY = process.env.REACT_APP_COUNTRY_FLAG || 'US';
export const META_DATA_URL = process.env.REACT_APP_META_DATA_URL || "/meta";
export const META_FROM_URL = process.env.REACT_APP_META_FROM_URL || "false";
export const APP_NO_NEAREST_STORE = process.env.REACT_APP_NO_NEAREST_STORE || "false";
export const GEO_LOCATION_NEAREST_STORE = process.env.REACT_APP_GEO_LOCATION_NEAREST_STORE || "http://localhost:8080/api/v2/geo-services/nearest-store/zip";
export const GEO_LOCATION_USER_ZIPSTORES = process.env.REACT_APP_GEO_LOCATION_USER_ZIPSTORES || "http://localhost:8080/api/v2/geo-services/nearest-store/geo";
export const GEO_LOCATION_ZIP_INFO = process.env.REACT_APP_GEO_LOCATION_ZIP_INFO || "http://localhost:8080/api/v2/us-zip";


