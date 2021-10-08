import { FETCH_ITEMS } from "../actionTypes";

const initialState = {
	data: [],
	totalPages: 0
};

const lots = (state = initialState, action) => {
	switch (action.type) {
		case FETCH_ITEMS: {
			return action.payload;
		}
		default: {
			return state;
		}
	}
};

export default lots;
