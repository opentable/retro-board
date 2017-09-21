import PropTypes from 'prop-types';
import React from 'react';
import flow from 'lodash/flow';
import { connect } from 'react-redux';
import { getSummaryMode } from 'modules/configuration/selectors';
import PostBoard from './components/PostBoard';
import SummaryBoard from './components/SummaryBoard';
import SessionName from './components/SessionName';

const stateToProps = state => ({
  summaryMode: getSummaryMode(state)
});

const Board = ({ summaryMode }) => (
  <div>
    <div style={ { width: '100%', textAlign: 'center' } }>
      <SessionName />
    </div>
    { summaryMode ? <SummaryBoard /> : <PostBoard /> }
  </div>
);

Board.propTypes = {
  summaryMode: PropTypes.bool
};

Board.defaultProps = {
  summaryMode: false
};

const decorators = flow([
  connect(stateToProps)
]);

export default decorators(Board);
