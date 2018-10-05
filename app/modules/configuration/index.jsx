import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import Drawer from 'react-toolbox/lib/drawer';
import LanguagePicker from 'components/LanguagePicker';
import LogoutButton from 'modules/user/components/LogoutButton';
import Clients from './components/Clients';
import SummaryModeSwitch from './components/SummaryModeSwitch';
import LeaveButton from './components/LeaveButton';
import ForkMe from './components/ForkMe';
import { closeDrawer } from './state';
import { isDrawerOpen } from './selectors';

const stateToProps = state => ({
  open: isDrawerOpen(state),
});

const actionsToProps = dispatch => ({
  onClose: () => dispatch(closeDrawer()),
});

const NavDrawer = ({ open, onClose }) => (
  <Drawer active={open} type="right" onOverlayClick={onClose}>
    <div style={{ margin: '0 10px' }}>
      <LanguagePicker />
      <SummaryModeSwitch />
    </div>

    <Clients />
    <br />
    <br />
    <LeaveButton />
    <LogoutButton />
    <ForkMe />
  </Drawer>
);

NavDrawer.propTypes = {
  open: PropTypes.bool,
  onClose: PropTypes.func,
};

export default connect(
  stateToProps,
  actionsToProps,
)(NavDrawer);
