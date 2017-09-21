import { createSelector } from 'reselect';
import sortBy from 'lodash/sortBy';

const sortByLastJoin = sessions => sortBy(sessions, s => -s.lastJoin);

export const getSessionId = state => state.board.session.id;
export const getClients = state => state.board.session.clients;
export const getSessionName = state => state.board.session.name;
export const getSavedSessions = state => state.board.session.previousSessions;

export const getSavedSessionsByDate = createSelector(getSavedSessions, sortByLastJoin);
