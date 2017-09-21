import PropTypes from 'prop-types';
import React, { Component } from 'react';
import noop from 'lodash/noop';
import flow from 'lodash/flow';
import { connect } from 'react-redux';
import Board from './posts';
import { autoJoin } from './session/state';

const actionsToProps = dispatch => ({
  autoJoin: sessionId => dispatch(autoJoin(sessionId))
});

class Main extends Component {
  componentDidMount() {
    this.props.autoJoin(this.props.match.params.sessionId);
  }

  render() {
    return (
      <Board />
    );
  }
}

Main.propTypes = {
  autoJoin: PropTypes.func,
  match: PropTypes.object
};

Main.defaultProps = {
  autoJoin: noop
};

const decorators = flow([
  connect(null, actionsToProps)
]);

export default decorators(Main);
