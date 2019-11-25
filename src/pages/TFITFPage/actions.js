const ACTIONS = {
  FETCH_TFITF: '@pages/TFITFPage/FETCH_TFITF',
  FETCH_TFITF_SUCCESS: '@pages/TFITFPage/FETCH_TFITF_SUCCESS',
  FETCH_TFITF_FAILURE: '@pages/TFITFPage/FETCH_TFITF_FAILURE',
  SEARCH_TFITF: '@pages/TFITFPage/SEARCH_TFITF',
  SEARCH_TFITF_SUCCESS: '@pages/TFITFPage/SEARCH_TFITF_SUCCESS',
  SEARCH_TFITF_FAILURE: '@pages/TFITFPage/SEARCH_TFITF_FAILURE',
  RESET_SEARCH_TFITF: '@pages/TFITFPage/RESET_SEARCH_TFITF',
};

export default ACTIONS;

export const fetchTFITF = (pageNum, pageSize) => ({
  type: ACTIONS.FETCH_TFITF,
  payload: { pageNum, pageSize },
});

export const fetchSearchTFITF = (searchValue, searchKey, pageNum, pageSize) => ({
  type: ACTIONS.SEARCH_TFITF,
  payload: { searchValue, searchKey, pageNum, pageSize },
});

export const resetSearchTFITF = () => ({
  type: ACTIONS.RESET_SEARCH_TFITF,
});
