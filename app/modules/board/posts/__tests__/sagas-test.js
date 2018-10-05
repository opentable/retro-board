import { put, call, select } from 'redux-saga/effects';
import uuid from 'uuid/v1';
import sagaHelper from 'redux-saga-testing';
import { getCurrentUser } from 'modules/user/selectors';
import { onAddPost, onLike } from '../sagas';
import { addPostSuccess, likeSuccess } from '../state';

jest.mock('uuid');

describe('Sagas - posts', () => {
  describe('When a user adds a post', () => {
    const it = sagaHelper(onAddPost({ payload: { postType: 'well', content: 'Hello You' } }));

    it('should get the current user', result => {
      expect(result).toEqual(select(getCurrentUser));
      return 'Antoine';
    });

    it('then should then generate a unique id', result => {
      expect(result).toEqual(call(uuid));
      return 'AA-BB-CC';
    });

    it('then call the add post success action', result => {
      expect(result).toEqual(
        put(
          addPostSuccess({
            id: 'AA-BB-CC',
            postType: 'well',
            content: 'Hello You',
            user: 'Antoine',
            likes: [],
            dislikes: [],
          }),
        ),
      );
    });
  });

  describe('When a user likes a post', () => {
    const it = sagaHelper(onLike({ payload: { post: { id: 123 }, like: true } }));

    it('should get the current user', result => {
      expect(result).toEqual(select(getCurrentUser));
      return 'Danièle';
    });

    it('then call the like success action', result => {
      expect(result).toEqual(
        put(
          likeSuccess({
            post: { id: 123 },
            like: true,
            user: 'Danièle',
          }),
        ),
      );
    });
  });
});
