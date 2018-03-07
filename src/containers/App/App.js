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
    margin: '40px',
    padding: '20px',
    backgroundColor: 'white',
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
          <Grid fluid style={{ padding: 0 }}>
            <Row>
              <Col xs style={{ textAlign: 'center', margin: '20px'}}>
                <img alt="BSN" src="/svb-logo.jpg" style={{ width: '240px' }}/>
              </Col>
            </Row>
            <Row>
              <Col xs style={{ backgroundColor: "black", color: 'white', padding: '5px', paddingLeft: '50px'}}>
                <h2>Dashboard SFTP openstaande verzoeken huishoudboekje</h2>
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
