/* eslint jsx-a11y/no-static-element-interactions:0 */

import React from 'react';
import PropTypes from 'prop-types';
import noop from 'lodash/noop';
import flow from 'lodash/flow';
import AppBar from 'react-toolbox/lib/app_bar';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import translate from 'i18n/Translate';
import { getCurrentUser } from 'modules/user/selectors';
import style from './index.scss';
import Invite from './invite';
import OpenDrawerButton from './components/OpenDrawerButton';

const stateToProps = state => ({
  user: getCurrentUser(state)
});

const actionsToProps = dispatch => ({
  goToHomepage: () => dispatch(push('/'))
});

const Header = ({ strings, goToHomepage, user }) => (
  <div>
    <AppBar fixed className={style.header}>
      <div className={style.titles}>
        <a onClick={goToHomepage}>Retrospected <br />
          <span className={style.subtitle}>{ strings.subtitle }</span>
        </a>
      </div>
      <div className={ style.navigation }>
        <span className={style.user}>{ user }</span>
        <Invite />
        <OpenDrawerButton />
      </div>
    </AppBar>
  </div>
);

Header.propTypes = {
  user: PropTypes.string,
  goToHomepage: PropTypes.func,
  strings: PropTypes.object
};

Header.defaultTypes = {
  user: null,
  goToHomepage: noop,
  strings: {
    subtitle: 'A good way of ranting in an orderly fashion'
  }
};

const decorators = flow([
  connect(stateToProps, actionsToProps),
  translate('Header')
]);

export default decorators(Header);
