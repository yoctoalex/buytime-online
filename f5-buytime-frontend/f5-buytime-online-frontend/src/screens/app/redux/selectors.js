export const getItemsList = state => {
	return { lots: state.lots.data, total: state.lots.totalPages * 10 }
};
