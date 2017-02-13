import React, { PropTypes } from 'react';
import noop from 'lodash/noop';
import { Card, CardText, CardActions } from 'react-toolbox/lib/card';
import { default as Button } from 'react-toolbox/lib/button';
import classNames from 'classnames';
import EditableLabel from '../EditableLabel';
import style from './Post.scss';
import icons from '../../constants/icons';
import translate from '../../i18n/Translate';

const canEdit = (post, currentUser) => currentUser === post.user;

const renderDelete = (post, currentUser, strings, onDelete) => {
    if (currentUser === post.user) {
        return (
            <Button
              icon={ icons.delete_forever }
              label={ strings.deleteButton }
              raised
              className={ style.deleteButton }
              onClick={ () => onDelete(post) }
            />
        );
    }

    return null;
};

const renderLike = (post, currentUser, onLike) => {
    const votes = post.likes.length;
    const label = votes ? votes.toString() : '-';
    const classNameFinal = classNames(style.like, null);

    return (
        <Button
          icon={icons.thumb_up}
          label={label}
          onClick={ () => onLike(post) }
          raised
          className={classNameFinal}
        />
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
                    { renderLike(post, currentUser, onLike) }
                    { renderDislike(post, currentUser, onUnlike) }
                    { renderDelete(post, currentUser, strings, onDelete) }
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
    strings: PropTypes.object
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
        noContent: '(This post has no content)'
    }
};

export default translate('Post')(Post);
