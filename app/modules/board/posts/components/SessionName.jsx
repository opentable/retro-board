/* eslint jsx-a11y/no-static-element-interactions:0 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import noop from 'lodash/noop';
import flow from 'lodash/flow';
import { connect } from 'react-redux';
import Input from 'components/Input';
import FontIcon from 'react-toolbox/lib/font_icon';
import { getSessionName } from 'modules/board/session/selectors';
import { renameSession } from 'modules/board/session/state';
import translate from 'i18n/Translate';
import icons from 'constants/icons';
import style from './SessionName.scss';

const stateToProps = state => ({
  sessionName: getSessionName(state),
});

const actionsToProps = dispatch => ({
  rename: name => dispatch(renameSession(name)),
});

class SessionName extends Component {
  constructor(props) {
    super(props);
    this.state = { editMode: false };
    this.inputRef = React.createRef();
  }

  onKeyPress(e) {
    if (e.keyCode === 13 || e.keyCode === 27) {
      this.setState({ editMode: false });
    }
  }

  renderViewMode() {
    const { sessionName, strings } = this.props;

    return (
      <div
        className={style.sessionName}
        onClick={() =>
          this.setState({ editMode: true }, () => {
            this.inputRef.current.focus();
          })
        }
      >
        <span className={style.name}>
          {sessionName || strings.defaultSessionName}
          &nbsp;
          <FontIcon className={style.editIcon} value={icons.create} />
        </span>
      </div>
    );
  }

  renderEditMode() {
    const { sessionName, rename } = this.props;
    return (
      <div className={style.sessionName}>
        <div className={style.edit}>
          <Input
            ref={this.inputRef}
            maxLength={30}
            icon={icons.create}
            value={sessionName}
            onBlur={() => {
              this.setState({ editMode: false });
            }}
            onKeyPress={e => this.onKeyPress(e.nativeEvent)}
            onChange={rename}
          />
        </div>
      </div>
    );
  }

  render() {
    if (this.state.editMode) {
      return this.renderEditMode();
    }
    return this.renderViewMode();
  }
}

SessionName.propTypes = {
  sessionName: PropTypes.string,
  rename: PropTypes.func,
  strings: PropTypes.object,
};

SessionName.defaultProps = {
  sessionName: null,
  rename: noop,
  strings: {
    optionsTab: {
      input: 'Enter a name for your session',
    },
    defaultSessionName: 'My Retrospective',
  },
};

const decorators = flow([
  connect(
    stateToProps,
    actionsToProps,
  ),
  translate('Join'),
  translate('SessionName'),
]);

export default decorators(SessionName);
