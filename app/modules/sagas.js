/* eslint func-names: "off" */

import { takeEvery, all } from 'redux-saga/effects';
import { AUTO_LOGIN, LOGIN, LOGOUT, CHANGE_LANGUAGE } from './user/state';
import {
  AUTO_JOIN,
  LEAVE_SESSION,
  CREATE_SESSION,
  RECEIVE_SESSION_NAME,
  RENAME_SESSION } from './board/session/state';
import { ADD_POST, LIKE } from './board/posts/state';

import {
  onLogout,
  onChangeLanguage,
  onLeaveSession,
  onAutoLogin,
  onLogin } from './user/sagas';
import { onAddPost, onLike } from './board/posts/sagas';
import { onAutoJoin, onCreateSession, onRenameSession } from './board/session/sagas';
import { onLocationChange } from './routing/sagas';

export default function* rootSaga() {
  yield all([
    takeEvery(AUTO_LOGIN, onAutoLogin),
    takeEvery(AUTO_JOIN, onAutoJoin),
    takeEvery(RECEIVE_SESSION_NAME, onRenameSession),
    takeEvery(RENAME_SESSION, onRenameSession),
    takeEvery(LOGIN, onLogin),
    takeEvery(LOGOUT, onLogout),
    takeEvery(CHANGE_LANGUAGE, onChangeLanguage),
    takeEvery(LEAVE_SESSION, onLeaveSession),
    takeEvery(ADD_POST, onAddPost),
    takeEvery(CREATE_SESSION, onCreateSession),
    takeEvery(LIKE, onLike),
    takeEvery('@@router/LOCATION_CHANGE', onLocationChange)
  ]);
}
