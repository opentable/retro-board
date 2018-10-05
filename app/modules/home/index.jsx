import PropTypes from 'prop-types';
import React from 'react';
import noop from 'lodash/noop';
import flow from 'lodash/flow';
import Button from 'react-toolbox/lib/button';
import { Card, CardMedia, CardText, CardTitle } from 'react-toolbox/lib/card';
import { List } from 'react-toolbox/lib/list';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import { createSession } from 'modules/board/session/state';
import translate from 'i18n/Translate';
import backgroundImage from 'components/images/logo.png';
import LanguagePicker from 'components/LanguagePicker';
import LogoutButton from 'modules/user/components/LogoutButton';
import { getSavedSessionsByDate } from 'modules/board/session/selectors';
import SessionTile from 'components/SessionTile';
import style from './index.scss';

const stateToProps = state => ({
  previousSessions: getSavedSessionsByDate(state),
});

const actionsToProps = dispatch => ({
  create: () => dispatch(createSession()),
  goToSession: session => dispatch(push(`/session/${session.id}`)),
});

const Join = ({ strings, previousSessions, goToSession, create }) => (
  <div style={{ padding: 20 }}>
    <Card raised className={style.join}>
      <CardMedia style={{ backgroundColor: '#EEE' }}>
        <img
          alt="Background image"
          src={backgroundImage}
          style={{ objectFit: 'contain', width: '100%', backgroundSize: 'contain', maxHeight: 150 }}
          role="presentation"
        />
      </CardMedia>
    </Card>

    <Card>
      <CardTitle title={strings.welcome} subtitle={strings.standardTab.text} />
      <CardText className={style.create}>
        <Button label={strings.standardTab.button} accent raised onClick={create} />
      </CardText>
    </Card>

    <Card>
      <CardTitle title={strings.previousTab.header} />
      <CardText>
        <List selectable ripple>
          {previousSessions.map(session => (
            <SessionTile key={session.id} session={session} onClick={() => goToSession(session)} />
          ))}
        </List>
      </CardText>
    </Card>

    <Card>
      <CardTitle title={strings.optionsTab.header} />
      <CardText className={style.options}>
        <LanguagePicker />
        <LogoutButton />
      </CardText>
    </Card>
  </div>
);

Join.propTypes = {
  previousSessions: PropTypes.array,
  create: PropTypes.func,
  goToSession: PropTypes.func,
  strings: PropTypes.object,
};

Join.defaultProps = {
  previousSessions: [],
  create: noop,
  goToSession: noop,
  strings: {
    welcome: 'Welcome to Retrospected',
    standardTab: {
      header: 'Create a Session',
      text: 'Click below and start retrospecting:',
      button: 'Create a new session',
    },
    optionsTab: {
      header: 'Options',
    },
    previousTab: {
      header: 'Previous sessions',
      rejoinButton: 'Rejoin',
    },
  },
};

const decorators = flow([
  connect(
    stateToProps,
    actionsToProps,
  ),
  translate('Join'),
]);

export default decorators(Join);
