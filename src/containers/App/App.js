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
          <Grid fluid>
            <Row>
              <Col xs>
                <img style={{float: "left"}} style={{width: "125px", marginTop: "20px"}} alt="SVB" src="/svb-logo.jpg"/>
                <h2 style={{float: "left"}}>SVB Huishoudboekje</h2>
              </Col>
            </Row>
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
