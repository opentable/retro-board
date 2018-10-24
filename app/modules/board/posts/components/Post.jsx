import PropTypes from 'prop-types';
import React from 'react';
import noop from 'lodash/noop';
import { Card, CardText, CardActions } from 'react-toolbox/lib/card';
import Button from 'react-toolbox/lib/button';
import ReactTooltip from 'react-tooltip';
import classNames from 'classnames';
import EditableLabel from 'components/EditableLabel';
import icons from 'constants/icons';
import translate from 'i18n/Translate';
import style from './Post.scss';

const canEdit = (post, currentUser) => currentUser === post.user;

const renderDelete = (post, currentUser, strings, onDelete) => {
  if (currentUser === post.user) {
    return (
      <Button
        icon={icons.delete_forever}
        label={strings.deleteButton}
        raised
        className={style.deleteButton}
        onClick={() => onDelete(post)}
      />
    );
  }

  return null;
};

const renderLike = (post, currentUser, strings, onLike) => {
  const votes = post.likes.length;
  const label = votes ? votes.toString() : '-';
  const canUserLike = post.likes.filter(el => el === currentUser).length < 3;
  const classNameFinal = classNames(style.like, canUserLike ? null : style.disabled);
  const likes = post.likes.reduce((acc, current) => {
    acc[current] = acc[current] + 1 || 1;
    return acc;
  }, {});

  let tooltipContent;
  if (votes === 0) {
    tooltipContent = (
      <p>{strings.notLiked}</p>
    );
  } else {
    tooltipContent = (
      <div>
        <p>{strings.likedBy}</p>
        <ul>
          { Object.getOwnPropertyNames(likes).map((likedBy) => (
            <li key={`${post.id}_${likedBy}`}>{`${likedBy} (${likes[likedBy]})`}</li>
          ))}
        </ul>
      </div>
    );
  }

  return (
    <span>
      <Button
        icon={icons.thumb_up}
        label={label}
        onClick={canUserLike ? () => onLike(post) : noop }
        raised={canUserLike}
        className={classNameFinal}
        data-tip
        data-for={`${post.id}_likedByTooltip`}
      />
      <ReactTooltip
        id={`${post.id}_likedByTooltip`}
        key={`${post.id}_${votes}`}
        effect="solid"
        place="right"
        className={style.tooltip}
      >
        {tooltipContent}
      </ReactTooltip>
    </span>
  );
};

const renderDislike = (post, currentUser, onDislike) => {
  const votes = post.likes.indexOf(currentUser);
  const classNameFinal = classNames(style.dislike, null);

  if (votes >= 0) {
    return (
      <Button
        icon={icons.thumb_down}
        onClick={ () => onDislike(post) }
        raised
        className={classNameFinal}
      />
    );
  }

  return null;
};

const Post = ({ post, currentUser, onEdit, onLike, onUnlike, onDelete, strings }) => (
  <div className={classNames(style.post, style[post.postType])}>
    <Card raised className={style.card}>
      <CardText>
        <EditableLabel
          value={post.content}
          readOnly={!canEdit(post, currentUser)}
          placeholder={strings.noContent}
          onChange={v => onEdit(post, v)}
        />
      </CardText>
      <CardActions>
        <div className={style.actions}>
          { renderLike(post, currentUser, strings, onLike) }
          { renderDislike(post, currentUser, onUnlike) }
          { renderDelete(post, currentUser, strings, onDelete)}
        </div>
      </CardActions>
    </Card>
  </div>
);

Post.propTypes = {
  post: PropTypes.object.isRequired,
  currentUser: PropTypes.string.isRequired,
  onDelete: PropTypes.func,
  onLike: PropTypes.func,
  onUnlike: PropTypes.func,
  onEdit: PropTypes.func,
  strings: PropTypes.object,
};

Post.defaultProps = {
  post: null,
  currentUser: null,
  onDelete: noop,
  onLike: noop,
  onUnlike: noop,
  onEdit: noop,
  strings: {
    deleteButton: 'Delete',
    likedBy: 'Liked by:',
    noContent: '(This post has no content)',
    notLiked: 'Not liked'
  },
};

export default translate('Post')(Post);
