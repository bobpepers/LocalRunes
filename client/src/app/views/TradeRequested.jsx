import React, {
  useEffect,
  useState,
  // Fragment,
} from 'react';
import { withRouter, useHistory } from 'react-router-dom';
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
      <h3 style={{ margin: 0, padding: 0 }}>Time Left</h3>
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
  const history = useHistory();
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

  useEffect(() => {
    if (currentTrade.type === 'accepted') {
      console.log(currentTrade);
      history.push(`/trade/${currentTrade.id}`);
    }
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
          <p>
            Trade id:
            {' '}
            {currentTrade && currentTrade.id}
          </p>
          <p>
            Ad id:
            {' '}
            {currentTrade && currentTrade.postAd && currentTrade.postAd.id}
          </p>
          <p>
            Amount:
            {' '}
            {currentTrade && (currentTrade.amount / 1e8)}
          </p>
          <p>
            Price:
            {' '}
            {currentTrade && currentTrade.postAd && (currentTrade.postAd.price / 1e8)}
            {' '}
            {currentTrade && currentTrade.postAd && currentTrade.postAd.currency && currentTrade.postAd.currency.currency_name}
          </p>
          <p>
            Total:
            {' '}
            {currentTrade && currentTrade.postAd && ((currentTrade.amount / 1e8) * (currentTrade.postAd.price / 1e8))}
            {' '}
            {currentTrade && currentTrade.postAd && currentTrade.postAd.currency && currentTrade.postAd.currency.currency_name}
          </p>
        </Grid>
        <Grid item xs={12}>
          {currentTrade
          && currentTrade.postAd
          && currentTrade.postAd.type === 'sell'
          && currentTrade.postAd.user
          && user
          && user.username === currentTrade.user.username
          && (
          <p className="text-center">
            You want to buy
            {' '}
            {currentTrade.amount / 1e8}
            {' '}
            RUNES from
            {' '}
            {currentTrade.postAd.user.username}
            {' '}
            for
            {' '}
            {((currentTrade.amount / 1e8) * (currentTrade.postAd.price / 1e8))}
            {' '}
            {currentTrade.postAd.currency.currency_name}
          </p>
          )}
          {currentTrade
          && currentTrade.postAd
          && currentTrade.postAd.type === 'sell'
          && currentTrade.postAd.user
          && user
          && user.username === currentTrade.postAd.user.username
          && (
          <p className="text-center">
            {currentTrade.user.username}
            {' '}
            wants to buy
            {' '}
            {currentTrade.amount / 1e8}
            {' '}
            RUNES from you for
            {' '}
            {((currentTrade.amount / 1e8) * (currentTrade.postAd.price / 1e8))}
            {' '}
            {currentTrade.postAd.currency.currency_name}
          </p>
          )}
        </Grid>
        <Grid item xs={12}>
          <Grid container>
            <Grid item xs={12}>
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
            {currentTrade && currentTrade.postAd && currentTrade.postAd.user && user && user && currentTrade.postAd.user.username === user.username && (
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
  user: state.user.data,
  currentTrade: state.currentTrade.data,
})

// export default withRouter(connect(mapStateToProps, actions)(PostAd));
export default connect(mapStateToProps, actions)(TradeRequested);
