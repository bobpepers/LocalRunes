import React, {
  useEffect,
  useState,
  // Fragment,
} from 'react';
import { withRouter } from 'react-router-dom';
import { connect, useDispatch } from 'react-redux';
import {
  Grid,
  // Button,
} from '@material-ui/core';
import * as actions from '../actions/auth';
// import Contact from '../components/Contact';
// import Community from '../components/Community';
// import Exchanges from '../components/Exchanges';
// import Download from '../components/Download';
// import Banner from '../components/Banner';
// import Domains from '../containers/Domains';
import Activity from '../containers/Activity';
import Info from '../containers/Info';
import Volume from '../containers/Volume';
import Runebase from '../containers/Runebase';
import AdvertisersPublishers from '../components/AdvertisersPublishers';
// import Globe from '../containers/Globe';
import {
  fetchCurrentTradeIdle,
  secondTradeIdleAction,
  cancelTradeIdleAction,
} from '../actions/trade';

const Home = () => {
  console.log('RunesX Home View');
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(cancelTradeIdleAction());
  }, []);
  useEffect(() => {
    dispatch(fetchCurrentTradeIdle());
  }, []);
  useEffect(() => {
    dispatch(secondTradeIdleAction());
  }, []);

  return (
    <div className="height100 content">
      <Grid
        container
        spacing={0}
      >
        <Info />
        {/* <Globe /> */}
        {/* <Domains /> */}
        {/* <Banner /> */}
      </Grid>
    </div>
  )
}

const mapStateToProps = (state) => ({ errorMessage: state.auth.error })

export default withRouter(connect(mapStateToProps, actions)(Home));
