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
  tradeSecondStepAction,
  cancelTradeAction,
  secondTradeIdleAction,
  cancelTradeIdleAction,
  fetchSingleTradeData,
} from '../actions/trade';

const renderField = ({
  input, type, placeholder, meta: { touched, error },
}) => (
  <div className={`input-group ${touched && error ? 'has-error' : ''}`}>
    <FormControl
      variant="outlined"
      fullWidth
    >
      <TextField
          // className="outlined-email-field"
        label={placeholder}
        type={type}
        variant="outlined"
        inputProps={{ className: 'outlined-email-field' }}
        {...input}
      />
      { touched && error && <div className="form-error">{error}</div> }
    </FormControl>
  </div>
);

const renderSelectField = ({
  input,
  label,
  name,
  meta: { touched, error },
  children,
  ...custom
}) => (
  <FormControl
    variant="outlined"
    error={touched && error}
    style={{ width: '100%' }}
  >
    <InputLabel htmlFor="age-native-simple">{label}</InputLabel>
    <Select
      native
      {...input}
      {...custom}
      inputProps={{
        name,
        // id: 'age-native-simple',
      }}
    >
      {children}
    </Select>
    { touched && error && <div className="form-error">{error}</div> }
  </FormControl>
)

const TradeInit = (props) => {
  const {
    handleSubmit,
    paymentMethods,
    currencies,
    currentTrade,
    cancelTrade,
    values,
    match: {
      params: {
        id,
      },
    },
  } = props;
  const dispatch = useDispatch();
  console.log('RunesX Home View');
  useEffect(() => dispatch(fetchPaymentMethodData()), [dispatch]);
  useEffect(() => dispatch(fetchCurrenciesData()), [dispatch]);
  useEffect(() => dispatch(fetchSingleTradeData(id)), [dispatch]);

  useEffect(() => {}, [paymentMethods, currencies]);
  useEffect(() => {
    dispatch(secondTradeIdleAction());
  }, []);
  useEffect(() => {
    dispatch(cancelTradeIdleAction());
  }, []);

  const history = useHistory();

  useEffect(() => {
    console.log('cancelTrade');
    console.log('cancelTrade');
    console.log('cancelTrade');
    console.log('cancelTrade');
    console.log('cancelTrade');
    console.log('cancelTrade');
    console.log('cancelTrade');
    console.log('cancelTrade');
    console.log('cancelTrade');
    console.log('cancelTrade');
    console.log('cancelTrade');
    console.log(cancelTrade);
    if (cancelTrade.type === 'canceled') {
      history.push('/');
    }
  }, [cancelTrade]);

  useEffect(() => {
    if (currentTrade.type === 'requested') {
      console.log(currentTrade);
      history.push(`/trade/requested/${currentTrade.id}`);
    }
  }, [currentTrade]);

  useEffect(() => {
    console.log(currentTrade);
    if (currentTrade.type === 'requested') {
      console.log(currentTrade);
      history.push(`/trade/requested/${currentTrade.id}`);
    }
  }, [currentTrade]);

  const handleFormSubmit = async (obj) => {
    console.log(obj);
    await dispatch(tradeSecondStepAction(obj, id));
  }
  const cancelTradeFunc = async () => {
    // console.log(obj);
    await dispatch(cancelTradeAction(id));
  }

  return (
    <div className="height100 content surfContainer">
      <Grid container>
        <Grid item xs={12}>
          <form onSubmit={handleSubmit(handleFormSubmit)}>
            <Grid container>
              <Grid item xs={12}>
                <p>
                  Price:
                  {' '}
                  {currentTrade && currentTrade.postAd && (currentTrade.postAd.price / 1e8)}
                  {' '}
                  {currentTrade && currentTrade.postAd && currentTrade.postAd.currency.currency_name}
                </p>
              </Grid>
              <Grid item xs={12}>
                <p>Amount</p>
                <Field
                  name="amount"
                  component={renderField}
                  type="number"
                  placeholder="Amount"
                  onChange={(event, index, value) => {
                    console.log('nummer');
                    console.log(event.currentTarget.valueAsNumber);
                    console.log((event.currentTarget.valueAsNumber * (currentTrade.postAd.price / 1e8)));
                    // if (currentTrade.postAd) {
                    dispatch(change('postad', 'total', (event.currentTarget.valueAsNumber * (currentTrade.postAd.price / 1e8))))
                    // }
                  }}
                />
                <p>Total</p>
                <Field
                  name="total"
                  component={renderField}
                  type="number"
                  placeholder="Total"
                  onChange={(event, index, value) => {
                    console.log('values');
                    console.log(values);
                    console.log(event.currentTarget.valueAsNumber);
                    console.log(value);
                    console.log(((event.currentTarget.valueAsNumber * 1e8) / (currentTrade.postAd.price)));
                    dispatch(change('postad', 'amount', (event.currentTarget.valueAsNumber / (currentTrade.postAd.price / 1e8))))
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <p>Respond Time</p>
                <Field
                  name="repondTime"
                  component={renderSelectField}
                  label="Respond Time"
                  style={{ width: '100%' }}
                >
                  <option value="" />
                  <option value="15">15 Min</option>
                  <option value="30">30 Min</option>
                  <option value="45">45 Min</option>
                  <option value="60">1 Hour</option>
                </Field>
              </Grid>
              <Grid
                item
                style={{ marginBottom: '20px', marginTop: '20px' }}
                xs={12}
              >
                <Button
                  variant="contained"
                  color="primary"
                  type="submit"
                  className="btn"
                  fullWidth
                  size="large"
                >
                  Start Trade
                </Button>
              </Grid>
              <Grid
                item
                style={{ marginBottom: '20px' }}
                xs={12}
              >
                <Button
                  variant="contained"
                  color="primary"
                  // type="submit"
                  className="btn"
                  fullWidth
                  size="large"
                  onClick={() => cancelTradeFunc()}
                >
                  Cancel Trade
                </Button>
              </Grid>
            </Grid>
          </form>
        </Grid>
      </Grid>
    </div>
  )
}

const validate = (formProps) => {
  const errors = {};
  if (!formProps.amount) {
    errors.amount = 'Amount is required'
  }
  if (!formProps.repondTime) {
    errors.repondTime = 'Respond Time is required'
  }
  return errors;
}

const selector = formValueSelector('postad');

const mapStateToProps = (state) => ({
  errorMessage: state.auth.error,
  paymentMethods: state.paymentMethods,
  currencies: state.currencies,
  currentTrade: state.currentTrade.data,
  cancelTrade: state.cancelTrade.data,
  values: selector(state, 'total', 'amount'),
})

// export default withRouter(connect(mapStateToProps, actions)(PostAd));
export default connect(mapStateToProps, actions)(reduxForm({ form: 'postad', validate })(TradeInit));
