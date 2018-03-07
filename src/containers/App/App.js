import React, { Component } from 'react'
import { BrowserRouter, Route } from 'react-router-dom'
import { connect } from 'react-redux';
import AppBar from 'material-ui/AppBar';
import Paper from 'material-ui/Paper';
import { Grid, Row, Col } from 'react-flexbox-grid';
import  Home from '../../containers/Home/Home';

import { deauthenticate } from '../../actions';

import './App.css';

const styles = {
  main: {
    minHeight: 200,
    margin: 20,
  },
};

class App extends Component {
  handleDeauth() {
    const { dispatch } = this.props;
    dispatch(deauthenticate());
  }

  render() {
    return (
      <BrowserRouter>
        <div>
          <AppBar title="Ketenpartner dashboard"/>
          <Grid fluid>
            <Row>
              <Col xs>
                <Paper style={styles.main} id="main-content">
                  <Route exact path="/" component={Home}/>
                </Paper>
              </Col>
            </Row>
          </Grid>
        </div>
      </BrowserRouter>
    )
  }
}

export default connect()(App);
