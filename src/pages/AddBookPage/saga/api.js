import api from '@apis/api';
import apiConfig from '@apis/apiConfig';
import nth from 'lodash/nth';

export function fetchBookHistory({ payload }) {
  const { pageNum, pageSize } = payload;

  const query = {
    'pg-num': pageNum,
    'pg-size': pageSize,
  };

  return api
    .get({
      url: apiConfig.books.history,
      query,
      needAuthenticate: true,
    })
    .then(({ data }) => ({ data, pageNum }));
}

export function searchBook({ payload }) {
  const { bookTitle, bookAuthor } = payload;

  return api.get({
    url: apiConfig.books.search,
    query: {
      title: bookTitle,
      author: bookAuthor,
    },
    needAuthenticate: true,
  });
}

export function addBook({ payload }) {
  const { asin, author, description, genres, imUrl, title } = payload;

  return api.post({
    url: apiConfig.books.add,
    body: {
      asin: asin || '',
      author: author || '',
      description: description || '',
      genres: nth(genres, 0) || '',
      imUrl: imUrl || '',
      title: title || '',
    },
    needAuthenticate: true,
  });
}
