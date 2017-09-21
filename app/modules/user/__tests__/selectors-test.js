import getState from 'modules/__tests__/getState';
import {
  getCurrentUser,
  getCurrentLanguage,
  getCurrentLanguageInfo
} from '../selectors';

const state = getState();

describe('Selectors - Index', () => {
  it('getCurrentUser', () => {
    expect(getCurrentUser(state)).toEqual('Antoine');
  });

  it('getCurrentLanguage', () => {
    expect(getCurrentLanguage(state)).toBe('fr');
  });

  it('getCurrentLanguageInfo', () => {
    expect(getCurrentLanguageInfo(state).name).toBe('Français');
  });
});
