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
  <FormControl error={touched && error} style={{ width: '100%' }}>
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

  useEffect(() => {}, [paymentMethods, currencies]);
  useEffect(() => {
    console.log('id');
    console.log('id');
    console.log('id');
    console.log('id');
    console.log('id');
    console.log('id');
    console.log('id');
    console.log('id');
    console.log('id');
    console.log('id');
    console.log(id);
  }, []);

  const handleFormSubmit = async (obj) => {
    console.log(obj);
    await dispatch(tradeSecondStepAction(obj, id));
  }
  const cancelTrade = async () => {
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
                <p>Amount</p>
                <Field
                  name="amount"
                  component={renderField}
                  type="text"
                  placeholder="Amount"
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
                  <option value="15">15 Min</option>
                  <option value="30">30 Min</option>
                </Field>
              </Grid>
              <Grid item xs={12}>
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
              <Grid item xs={12}>
                <Button
                  variant="contained"
                  color="primary"
                  // type="submit"
                  className="btn"
                  fullWidth
                  size="large"
                  onClick={() => cancelTrade()}
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
})

// export default withRouter(connect(mapStateToProps, actions)(PostAd));
export default connect(mapStateToProps, actions)(reduxForm({ form: 'postad', validate })(TradeInit));
