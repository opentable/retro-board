import ga from 'react-ga';
import { ADD_POST, DELETE_POST, LIKE } from 'modules/board/posts/state';
import { JOIN_SESSION } from 'modules/board/session/state';
import { LOGIN } from 'modules/user/state';

export const googleAnalyticsMiddleware = (/* store */) => next => action => {
  const result = next(action);

  // Each of these actions will be recorded with Google Analytics
  const actions = [ADD_POST, JOIN_SESSION, DELETE_POST, LIKE, LOGIN];

  if (actions.indexOf(action.type) > -1) {
    ga.event({
      category: 'Action',
      action: action.type.replace('retrospected/', ''),
    });
  }

  if (action.type === '@@router/LOCATION_CHANGE') {
    ga.pageview(action.payload.pathname);
  }

  return result;
};

export default googleAnalyticsMiddleware;
