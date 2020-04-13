import React from 'react';
import './App.css';
import * as bs from 'react-bootstrap';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
//custom component imports
import Header from './components/Header.js';
import LeftSide from './components/LeftSide.js';
import Home from './components/Home.js';
import Footer from './components/Footer.js';
import RightSide from './components/RightSide';
import Prediction from './components/Prediction';
import NotFound from './components/NotFound'


function App() {
  return (
    <Router>
      <bs.Container fluid className="p-0 min-vh-100 d-flex flex-column">
        <bs.Row noGutters className="flex-grow-0 flex-shrink-0 shadow-lg">
          <bs.Col md={12} style={{ backgroundColor: "white", boxShadow: "0px 2px 5px #9E9E9E"}}>
            <Header />
          </bs.Col>
        </bs.Row>
        <bs.Row style={{backgroundColor: '#ECECEC'}}>
          <div><p></p></div>
        </bs.Row>
        <bs.Row noGutters className="flex-grow-1 shadow-sm">
          <bs.Col md={2} style={{ backgroundColor: "#ECECEC"}} className="px-3 py-4" > 
            <LeftSide />
          </bs.Col>
          <bs.Col md={8} style={{ position: "relative", backgroundColor: "white", borderRadius: '3px', boxShadow: "-3px 5px 20px #9E9E9E"}} className="px-3 py-4" >
              <Switch>
                <Route path="/home">
                  <Home />
                </Route>
                <Route path="/prediction">
                  <Prediction />
                </Route>
                <Route path="/not-found">
                  <NotFound/>
                </Route>
                <Route path="/">
                  <Home/>
                </Route>
                
              </Switch>
          </bs.Col>
          <bs.Col md={2} style={{ backgroundColor: "#ECECEC"}} className="px-3 py-4" > 
            <RightSide />
          </bs.Col>
        </bs.Row>
        <bs.Row style={{backgroundColor: '#ECECEC'}}>
          <div><p></p></div>
        </bs.Row>
        <bs.Row>
          <bs.Col md={12}>
            <Footer />
          </bs.Col>
        </bs.Row>
      </bs.Container>
    </Router>
  );
}

export default App;
