import _ from 'lodash';

export default (limit: string, page: string) => {
  let correctLimit = parseInt(limit, 10);
  let correctPage = parseInt(page, 10);
  if (!_.isFinite(correctLimit) || correctLimit <= 0) {
    correctLimit = 10;
  }

  if (!_.isFinite(correctPage) || correctPage <= 0) {
    correctPage = 1;
  }

  return { limit: correctLimit, page: correctPage };
};
