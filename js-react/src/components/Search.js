import React, { useContext } from 'react';
import * as bs from 'react-bootstrap';
// import {useRouteMatch} from "react-router-dom";
import AppContext from '../context'

export default function Search(props) {
//let match = useRouteMatch('/qualityanalysis/:searchparams/');
const context = useContext(AppContext)
if(context.campaigns) {
  return(
    <>
      <bs.Container fluid>
        <bs.Row>
          {Object.values(context.campaigns).map((camp) => {
                return (
                  <bs.Col md="3" key={camp.id}>
                    {/* put the campaigns here */}
                  </bs.Col>
                );
          })}
        </bs.Row>
      </bs.Container>
    </>
    );}
else {
  return (
    <p>Campaigns failed to load from the API. Try refreshing the page, to reconnect to the campaigns database.</p>
  );
}

}

// filename={`${process.env.PUBLIC_URL}/media/products/${pro.filename}-1.png`}