/* eslint react/prefer-stateless-function: "off" */
/* Because stateless functions don't have context it seems */
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import en from './en';
import es from './es';
import fr from './fr';
import hu from './hu';
import ptbr from './pt-br';
import pl from './pl';
import nl from './nl';
import ru from './ru';
import zhtw from './zh-tw';
import zhcn from './zh-cn';
import ar from './ar';

const languages = { en, es, fr, hu, pl, ptbr, nl, ru, zhtw, zhcn, ar };

export default function translate(key) {
  return Component => {
    const stateToProps = state => ({
      currentLanguage: state.user.lang
    });

    class TranslationComponent extends React.Component {
      render() {
        const strings = languages[this.props.currentLanguage][key];
        const merged = {
          ...this.props.strings,
          ...strings
        };
        if (strings) {
          return (
            <Component {...this.props}
              strings={merged}
              currentLanguage={this.props.currentLanguage}
            />
          );
        }

        return (
          <Component {...this.props}
            currentLanguage={this.props.currentLanguage}
          />
        );
      }
    }

    TranslationComponent.propTypes = {
      strings: PropTypes.object,
      currentLanguage: PropTypes.string
    };

    return connect(stateToProps)(TranslationComponent);
  };
}
