import { createSelector } from 'reselect';
import sortBy from 'lodash/sortBy';

const sortByVotes = posts => sortBy(posts, p => -(p.likes.length - p.dislikes.length));
const filterByType = type => posts => posts.filter(p => p.postType === type);

export const getPosts = state => state.board.posts;

const getPostsOfType = type => createSelector(getPosts, filterByType(type));
export const getNotWellPosts = getPostsOfType('notWell');
export const getWellPosts = getPostsOfType('well');
export const getIdeasPosts = getPostsOfType('ideas');
export const getSortedNotWellPosts = createSelector(getNotWellPosts, sortByVotes);
export const getSortedWellPosts = createSelector(getWellPosts, sortByVotes);
export const getSortedIdeasPosts = createSelector(getIdeasPosts, sortByVotes);
