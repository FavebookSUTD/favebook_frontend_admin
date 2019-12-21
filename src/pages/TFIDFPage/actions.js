const ACTIONS = {
  FETCH_TFIDF_JOB_STATUS: '@pages/TFIDFPage/FETCH_TFIDF_JOB_STATUS',
  FETCH_TFIDF_JOB_STATUS_SUCCESS: '@pages/TFIDFPage/FETCH_TFIDF_JOB_STATUS_SUCCESS',
  FETCH_TFIDF_JOB_STATUS_FAILURE: '@pages/TFIDFPage/FETCH_TFIDF_JOB_STATUS_FAILURE',
  FETCH_TFIDF: '@pages/TFIDFPage/FETCH_TFIDF',
  FETCH_TFIDF_SUCCESS: '@pages/TFIDFPage/FETCH_TFIDF_SUCCESS',
  FETCH_TFIDF_FAILURE: '@pages/TFIDFPage/FETCH_TFIDF_FAILURE',
  SEARCH_TFIDF: '@pages/TFIDFPage/SEARCH_TFIDF',
  SEARCH_TFIDF_SUCCESS: '@pages/TFIDFPage/SEARCH_TFIDF_SUCCESS',
  SEARCH_TFIDF_FAILURE: '@pages/TFIDFPage/SEARCH_TFIDF_FAILURE',
  RESET_SEARCH_TFIDF: '@pages/TFIDFPage/RESET_SEARCH_TFIDF',
};

export default ACTIONS;

export const fetchTFIDFJobStatus = () => ({
  type: ACTIONS.FETCH_TFIDF_JOB_STATUS,
});

export const fetchTFIDF = (pageNum, pageSize) => ({
  type: ACTIONS.FETCH_TFIDF,
  payload: { pageNum, pageSize },
});

export const fetchSearchTFIDF = (searchValue, searchKey, pageNum, pageSize) => ({
  type: ACTIONS.SEARCH_TFIDF,
  payload: { searchValue, searchKey, pageNum, pageSize },
});

export const resetSearchTFIDF = () => ({
  type: ACTIONS.RESET_SEARCH_TFIDF,
});
