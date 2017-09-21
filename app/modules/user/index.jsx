/* eslint react/no-string-refs:0 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import noop from 'lodash/noop';
import flow from 'lodash/flow';
import Button from 'react-toolbox/lib/button';
import EnterInput from 'components/EnterInput';
import translate from 'i18n/Translate';
import LanguagePicker from 'components/LanguagePicker';
import icons from 'constants/icons';
import style from './index.scss';

class Login extends Component {
  render() {
    return (
      <div className={style.login}>
        <LanguagePicker />
        <EnterInput
          placeholder={this.props.strings.namePlaceholder}
          icon={icons.people}
          onEnter={this.props.onLogin}
          ref="input"
          maxLength={12}
        />
        <Button label={this.props.strings.buttonLabel}
          accent
          raised
          onClick={() => {
            const text = this.refs.input.state.value;
            if (text) {
              this.props.onLogin(text);
            }
          }}
        />
      </div>
    );
  }
}

Login.propTypes = {
  onLogin: PropTypes.func,
  strings: PropTypes.object
};

Login.defaultProps = {
  onLogin: noop,
  strings: {
    namePlaceholder: 'Who are you exactly? Enter your name here',
    buttonLabel: 'Let\'s start'
  }
};

const decorators = flow([
  translate('Login')
]);

export default decorators(Login);
