import { put, select } from 'redux-saga/effects';
import { leave } from 'modules/board/session/state';
import { getSessionId } from 'modules/board/session/selectors';

export function* onLocationChange(action) {
  if (action.payload.pathname === '/') {
    const sessionId = yield select(getSessionId);
    if (sessionId) {
      yield put(leave());
    }
  }
}

export default onLocationChange;
