export const SERVER_API = process.env.REACT_APP_SERVER_API || '';

export const GET_LOT_BY_ID = `${SERVER_API}/api/v1/lot/one?id=`;
export const CREATE_BID = `${SERVER_API}/api/v1/bid`;
export const GET_USER_BY_ID = `${SERVER_API}/api/v1/user?id=`;
export const CREATE_LOT = `${SERVER_API}/api/v1/lot`;
export const GET_LOTS = `${SERVER_API}/api/v1/lot/all`;
export const AUTH = `${SERVER_API}/api/v1/auth`;
export const REGISTER = `${SERVER_API}/api/v1/auth/register`;
export const LOGOUT = `${SERVER_API}/api/v1/user/logout`;
export const GET_TOP_LOTS = `${SERVER_API}/api/v1/top?qty=9&sort=l.date&direction=DESC`;
export const GET_IMAGE_LINK = `${SERVER_API}/api/v1/image`;
