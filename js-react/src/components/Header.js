import React from 'react';
import * as bs from 'react-bootstrap'
import {useHistory} from 'react-router-dom'
// import { Link } from "react-router-dom";

export default function Header(props) {

  const history = useHistory();

function handleClick(e) {
  history.push("/")
}

return(
    <bs.Navbar expand="lg" style={{backgroundColor: 'white'}}>
      <bs.Col md={1}></bs.Col>
        <bs.Col md={2}>
          <bs.Navbar.Brand href="/" style={{color: '#5cb85c'}}>AirBnB Analytics</bs.Navbar.Brand>
        </bs.Col>
        
        <bs.Col md={5}>
          <bs.Nav className="justify-content-end" activeKey="/home">
            <bs.Nav.Item>
              <bs.Nav.Link eventKey="predict" href="/">Predict Success</bs.Nav.Link>
            </bs.Nav.Item>
          </bs.Nav>
        </bs.Col>
        <bs.Col md={3}>
          <bs.Form inline onSubmit={(e) => handleClick(e)}>
            <bs.FormControl name="title" style={{float: 'right', width: '70%'}} type="text" placeholder="Search" className="m-1" />
            <bs.Button variant="outline-success" type="submit">Search</bs.Button>
          </bs.Form>
        </bs.Col>
        <bs.Col md={1}>
          <bs.Nav className="justify-content-end" activeKey="/home">
            <bs.Nav.Item>
              <bs.Nav.Link eventkey="login" href="/log-in">Log In</bs.Nav.Link>
            </bs.Nav.Item>
          </bs.Nav>
        </bs.Col>
    </bs.Navbar>
  );
}