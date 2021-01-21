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
import Info from '../containers/Info';
import {
  fetchPostAdData,
} from '../actions/postAd';

const Home = (props) => {
  const {
    postAd,
  } = props;
  console.log('RunesX Home View');
  const dispatch = useDispatch();
  useEffect(() => dispatch(fetchPostAdData('buy')), [dispatch]);
  useEffect(() => {
    console.log('6666666666666666');
    console.log(postAd);
  }, [postAd]);

  return (
    <div className="height100 content">
      <Grid container>
        <Info />
        {/* <Globe /> */}
        {/* <Domains /> */}
        {/* <Banner /> */}
        <div
          style={{
            width: '100%',
            textAlign: 'center',
            paddingBottom: '40px',
            zIndex: 50,
          }}
          className="spacing-top"
        >
          <iframe
            title="a-ads leaderboard 2"
            data-aa="1500077"
            src="//ad.a-ads.com/1500077?size=728x90"
            scrolling="no"
            style={{
              width: '728px',
              height: '90px',
              border: '0px',
              padding: 0,
              overflow: 'hidden',
            }}
            allowtransparency="true"
          />
          {/*  <Exchanges /> */}
        </div>
      </Grid>
    </div>
  )
}

const mapStateToProps = (state) => ({
  postAd: state.postAd,
  errorMessage: state.auth.error,
})

export default withRouter(connect(mapStateToProps, actions)(Home));
