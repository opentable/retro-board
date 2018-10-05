import getState from 'modules/__tests__/getState';
import {
  getPosts,
  getNotWellPosts,
  getWellPosts,
  getIdeasPosts,
  getSortedNotWellPosts,
  getSortedWellPosts,
  getSortedIdeasPosts,
} from '../selectors';

const state = getState();

describe('Selectors - Index', () => {
  it('getPosts', () => {
    expect(getPosts(state).length).toBe(6);
  });

  it('getNotWellPosts', () => {
    expect(getNotWellPosts(state).length).toBe(2);
  });

  it('getWellPosts', () => {
    expect(getWellPosts(state).length).toBe(2);
  });

  it('getIdeasPosts', () => {
    expect(getIdeasPosts(state).length).toBe(2);
  });

  it('getSortedNotWellPosts', () => {
    expect(getSortedNotWellPosts(state).length).toBe(2);
  });

  it('getSortedWellPosts', () => {
    expect(getSortedWellPosts(state).length).toBe(2);
  });

  it('getSortedIdeasPosts', () => {
    expect(getSortedIdeasPosts(state).length).toBe(2);
  });
});
