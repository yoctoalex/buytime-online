import axios from "axios";
import { GET_LOTS, CREATE_BID } from "../../../helpers/api";
import { PAGE_SIZE } from "../../../helpers/constants";
import { getBearerHeader } from "../../../utils";
import { FETCH_ITEMS } from './actionTypes';
let currentPage = 0;

const fetchItemsRequest = (page) => {
	const headerBearer = getBearerHeader();
	return axios.get(`${GET_LOTS}?page=${page}&pageSize=${PAGE_SIZE}`, headerBearer)
};

export const fetchItems = (page = currentPage) => async (dispatch) => {
	try {
		const request = await fetchItemsRequest(page);
		if (request.data.data && Array.isArray(request.data.data)) {
			dispatch({
				type: FETCH_ITEMS,
				payload: request.data,
			});
		} else {
			dispatch({
				type: FETCH_ITEMS,
				payload: { data: null },
			});
		}
		
		currentPage = page;
		return request
	} catch (error) {
		if (error.response && error.response.status === 401) {
			return { isAuthError: true, error};
		} else {
			return { data: error, isAuthError: true, error};
		}
		
		
	}
};


