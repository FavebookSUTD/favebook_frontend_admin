import { select, selectToJS } from '@utils/selectorUtils';
import { initialState } from './reducers';

const selectPearsonPage = state => state.get('PearsonPage', initialState);

const selectPearsonJobStatus = select(selectPearsonPage, 'pearsonJobStatus');

const selectCoefficient = select(selectPearsonPage, 'coefficient');

const selectReviewsAndPrices = selectToJS(selectPearsonPage, 'reviewsAndPrices');

const selectTotalCount = select(selectPearsonPage, 'totalCount');

const selectLoading = select(selectPearsonPage, 'loading');

const selectError = select(selectPearsonPage, 'error');

export {
  selectPearsonJobStatus,
  selectCoefficient,
  selectReviewsAndPrices,
  selectTotalCount,
  selectLoading,
  selectError,
};
