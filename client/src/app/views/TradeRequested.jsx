import React, {
  useEffect,
  useState,
  // Fragment,
} from 'react';
import { withRouter } from 'react-router-dom';
import { connect, useDispatch } from 'react-redux';
import {
  Grid,
  Button,
  TextField,
  FormControlLabel,
  FormControl,
  RadioGroup,
  Radio,
  InputLabel,
  Select,
} from '@material-ui/core';
import Countdown from 'react-countdown';
import Card from '@material-ui/core/Card';
import {
  reduxForm,
  Field,
  formValueSelector,
  change,
} from 'redux-form';
import * as actions from '../actions/auth';

import {
  fetchPaymentMethodData,
} from '../actions/paymentMethods';

import {
  fetchCurrenciesData,
} from '../actions/currencies';

import {
  cancelTradeAction,
  acceptTradeAction,
  fetchSingleTradeData,
} from '../actions/trade';

const renderer = ({
  hours, minutes, seconds, completed,
}) => {
  if (completed) {
    return (
      <div className="text-center">
        <p>canceled</p>
      </div>
    );
  }

  return (
    <span className="w-100 text-center">
      <h3 style={{ margin: 0, padding: 0 }}>Next claim in</h3>
      <h3 style={{ margin: 0, padding: 0 }}>
        {minutes}
        :
        {seconds}
      </h3>

    </span>
  );
};

const TradeRequested = (props) => {
  const {
    currentTrade,
    user,
    match: {
      params: {
        id,
      },
    },
  } = props;
  const dispatch = useDispatch();
  console.log('RunesX Home View');
  useEffect(() => dispatch(fetchSingleTradeData(id)), [dispatch]);

  useEffect(() => {
    console.log('currenTrade');
    console.log('currenTrade');
    console.log('currenTrade');
    console.log('currenTrade');
    console.log('currenTrade');
    console.log('currenTrade');
    console.log('currenTrade');
    console.log('currenTrade');
    console.log(currentTrade);
  }, [currentTrade]);

  const cancelTrade = async () => {
    // console.log(obj);
    await dispatch(cancelTradeAction(id));
  }

  const acceptTrade = async () => {
    // console.log(obj);
    await dispatch(acceptTradeAction(id));
  }

  return (
    <div className="height100 content surfContainer">
      <Grid container>
        <Grid item xs={12}>
          {currentTrade && currentTrade.id}
        </Grid>
        <Grid item xs={12}>
          <Grid container>
            <Grid item xs={12}>
              <p>Time left:</p>
              {
                  currentTrade
                  && (
                  <Countdown
                    key={new Date(currentTrade.reponseTime).valueOf()}
                    date={new Date(currentTrade.reponseTime).valueOf() + (10 * 60 * 1000)}
                    renderer={renderer}
                  />
                  )
                }
            </Grid>
            <Grid item xs={12}>
              <p>{currentTrade && currentTrade.amount}</p>
            </Grid>
            {currentTrade && currentTrade.user && user && user.data && currentTrade.user.username === user.data.username && (
              <Grid item xs={12}>
                <Button
                  variant="contained"
                  color="primary"
                  type="submit"
                  className="btn"
                  fullWidth
                  size="large"
                  onClick={() => acceptTrade()}
                >
                  Accept Trade
                </Button>
              </Grid>
            )}
            <Grid item xs={12}>
              <Button
                variant="contained"
                color="primary"
                type="submit"
                className="btn"
                fullWidth
                size="large"
                onClick={() => cancelTrade()}
              >
                Cancel Trade
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </div>
  )
}

const mapStateToProps = (state) => ({
  errorMessage: state.auth.error,
  user: state.user,
  currentTrade: state.currentTrade.data,
})

// export default withRouter(connect(mapStateToProps, actions)(PostAd));
export default connect(mapStateToProps, actions)(TradeRequested);
