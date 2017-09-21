import getState from 'modules/__tests__/getState';
import {
  getSummaryMode,
  isDrawerOpen,
  shouldDisplayDrawerButton
} from '../selectors';

const state = getState();

describe('Selectors - Index', () => {
  it('getSummaryMode', () => {
    expect(getSummaryMode(state)).toBe(true);
  });

  it('isDrawerOpen', () => {
    expect(isDrawerOpen(state)).toBe(true);
  });

  it('shouldDisplayDrawerButton', () => {
    expect(shouldDisplayDrawerButton(state)).toBe(true);
  });
});
