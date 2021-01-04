import React, {
  useEffect,
  useState,
  // Fragment,
} from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import {
  Grid,
  // Button,
} from '@material-ui/core';
import Card from '@material-ui/core/Card';
import * as actions from '../actions/auth';

const PostAd = () => {
  console.log('RunesX Home View');

  return (
    <div className="height100 content surfContainer">
      <Grid container>
        <Grid item xs={12}>
          <Card>
            <h3 className="text-center">Advertisement rules and requirements</h3>
            <ul className="listPostAd">
              <li>For your ads to display you need to have RUNES in your localrunes wallet. You need 100 RUNES or more for advertisements with online payment methods and 100 RUNES or more for local advertisements (Cash).</li>
              <li>Certain payment methods require you to be ID verified before your ads are visible.</li>
              <li>Each completed trade costs advertisers 1% of the total trade amount. See all fees on our fees page.</li>
              <li>Once a trade is opened the price is final, except when there is a clear mistake in the pricing.</li>
              <li>You are not allowed to buy or sell RUNES on behalf of someone else (brokering).</li>
              <li>You may only use payment accounts that are registered in your own name (no third party payments!).</li>
              <li>You must provide your payment details in the advertisement or in the trade chat.</li>
              <li>All communication must happen on LocalRunes</li>
              <li>Payment methods marked High Risk have a significant risk of fraud. Be careful and always ID verify your trading partners when using high risk payment methods.</li>
            </ul>
          </Card>
        </Grid>
        <Grid item xs={12}>
          123
        </Grid>
      </Grid>
    </div>
  )
}

const mapStateToProps = (state) => ({ errorMessage: state.auth.error })

export default withRouter(connect(mapStateToProps, actions)(PostAd));
