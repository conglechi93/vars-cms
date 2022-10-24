import isArray from 'lodash/isArray';
import compact from 'lodash/compact';
import flatMap from 'lodash/flatMap';

const replaceParam = (path, params, prefix = ':') => {
  let newPath = path;

  Object.entries(params).forEach(([key, value]) => {
    newPath = newPath.replace(prefix + key, value);
  });
  return newPath;
};

const flatMapPath = (routes) => {
  if (routes == null || !isArray(routes)) return [];
  return compact(
    flatMap(routes.map((i) => flatMap([i?.path, flatMapPath(i?.children)]))),
  );
};

const Route = {replaceParam, flatMapPath};
export default Route;
