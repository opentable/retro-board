import moment from 'moment';
import getState from 'modules/__tests__/getState';
import { getSessionId, getClients, getSessionName, getSavedSessions, getSavedSessionsByDate } from '../selectors';

const state = getState();

describe('Selectors - Index', () => {
  it('getSessionId', () => {
    expect(getSessionId(state)).toBe('ABCD');
  });

  it('getClients', () => {
    expect(getClients(state)).toEqual(['Zsolt', 'James', 'Stuart']);
  });

  it('getSessionName', () => {
    expect(getSessionName(state)).toBe('FT1.1 Retro');
  });

  it('getSavedSessions', () => {
    expect(getSavedSessions(state)).toEqual([
      { name: 'Retro 1', lastJoin: moment('2014-04-19').unix() },
      { name: 'Retro 2', lastJoin: moment('1952-04-24').unix() },
      { name: 'Retro 3', lastJoin: moment('1982-11-01').unix() },
    ]);
  });

  it('getSavedSessionsByDate', () => {
    expect(getSavedSessionsByDate(state)).toEqual([
      { name: 'Retro 1', lastJoin: moment('2014-04-19').unix() },
      { name: 'Retro 3', lastJoin: moment('1982-11-01').unix() },
      { name: 'Retro 2', lastJoin: moment('1952-04-24').unix() },
    ]);
  });
});
