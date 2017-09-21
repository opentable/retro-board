import { createSelector } from 'reselect';
import { getCurrentUser } from 'modules/user/selectors';
import { getSessionId } from 'modules/board/session/selectors';

export const getSummaryMode = state => state.configuration.summaryMode;
export const isDrawerOpen = state => state.configuration.drawerOpen;
export const shouldDisplayDrawerButton = createSelector(
  [getCurrentUser, getSessionId], (user, sessionId) => !!user && !!sessionId);
