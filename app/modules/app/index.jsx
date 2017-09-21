import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Layout, Panel } from 'react-toolbox/lib/layout';
import { Route, Switch } from 'react-router';
import Home from 'modules/home';
import Board from 'modules/board';
import noop from 'lodash/noop';
import flow from 'lodash/flow';
import Login from 'modules/user';
import Drawer from 'modules/configuration';
import { login, autoLogin } from 'modules/user/state';
import { getCurrentUser, getCurrentLanguage } from 'modules/user/selectors';
import Header from './header';
import style from './index.scss';

const stateToProps = state => ({
  user: getCurrentUser(state),
  currentLanguage: getCurrentLanguage(state)
});

const actionsToProps = dispatch => ({
  onLogin: user => dispatch(login(user)),
  autoLogin: () => dispatch(autoLogin())
});

class App extends Component {
  componentDidMount() {
    this.props.autoLogin();
  }

  renderLogin() {
    if (this.props.user) {
      return (
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/session/:sessionId" component={Board} />
        </Switch>
      );
    }
    return (
      <Login onLogin={this.props.onLogin} />
    );
  }

  render() {
    return (
      <Layout className={style.layout}>
        <Panel className={style.panel}>
          <Header />
          <Drawer />
          <div className={style.content}>
            { this.renderLogin() }
          </div>
        </Panel>
      </Layout>
    );
  }
}

App.propTypes = {
  user: PropTypes.string,
  onLogin: PropTypes.func,
  autoLogin: PropTypes.func
};

App.defaultTypes = {
  user: null,
  onLogin: noop
};

const decorators = flow([
  connect(stateToProps, actionsToProps)
]);

export default decorators(App);
