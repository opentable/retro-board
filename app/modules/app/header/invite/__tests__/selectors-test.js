import getState from 'modules/__tests__/getState';
import {
  isInviteDialogOpen
} from '../selectors';

const state = getState();

describe('Selectors - app/header/invite', () => {
  it('isInviteDialogOpen', () => {
    expect(isInviteDialogOpen(state)).toBe(false);
  });
});
