import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';
import PianoRoll from './components/PianoRoll';
import Tutorial1Start from './components/Tutorial/Tutorial1Start';
import Tutorial2Tempo from './components/Tutorial/Tutorial2Tempo';
import Tutorial3Pitch from './components/Tutorial/Tutorial3Pitch';
import Tutorial4AllInstruments from './components/Tutorial/Tutorial4AllInstruments';
import TutorialSnare from 'components/Tutorial/TutorialSnare';
import TutorialPerc1 from 'components/Tutorial/TutorialPerc1';
import TutorialPerc2 from 'components/Tutorial/TutorialPerc2';

class Root extends Component {
  render() {
    return (
      <Router>
        <Route path="/piano-roll" component={PianoRoll} />
        <Route
          exact
          path="/"
          render={() => <Redirect to="/tutorial/start" />}
        />
        <Route path="/tutorial/start" component={Tutorial1Start} />
        <Route path="/tutorial/tempo" component={Tutorial2Tempo} />
        <Route path="/tutorial/pitch" component={Tutorial3Pitch} />
        <Route path="/tutorial/snare" component={TutorialSnare} />
        <Route path="/tutorial/perc1" component={TutorialPerc1} />
        <Route path="/tutorial/perc2" component={TutorialPerc2} />
        <Route
          path="/tutorial/instruments"
          component={Tutorial4AllInstruments}
        />
        <Route
          exact
          path="/tutorial/1"
          render={() => <Redirect to="/tutorial/start" />}
        />
        <Route
          exact
          path="/tutorial/2"
          render={() => <Redirect to="/tutorial/tempo" />}
        />
        <Route
          exact
          path="/tutorial/3"
          render={() => <Redirect to="/tutorial/pitch" />}
        />
        <Route
          exact
          path="/tutorial/4"
          render={() => <Redirect to="/tutorial/instruments" />}
        />
      </Router>
    );
  }
}

export default Root;
