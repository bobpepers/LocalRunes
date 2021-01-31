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
  addPostAdAction,
  fetchPostAdData,
} from '../actions/postAd';

const renderTextField = ({
  input,
  type,
  placeholder,
  meta: {
    touched,
    error,
  },
}) => (
  <div className={`addWebsite-description-wrapper input-group ${touched && error ? 'has-error' : ''}`}>
    <TextField
          // id="outlined-multiline-static"
      label="Bio"
      multiline
      style={{ width: '100%' }}
      rows={6}
      defaultValue=""
      inputProps={{
        maxLength: 400,
        // className: 'outlined-adornment-field',
      }}
      variant="outlined"
      {...input}
    />
    { touched && error && <div className="form-error">{error}</div> }
  </div>
);

const radioButton = ({
  input,
  meta: {
    touched,
    error,
  },
  ...rest
}) => (
  <div className={`addWebsite-description-wrapper input-group ${touched && error ? 'has-error' : ''}`}>
    <FormControl>
      <RadioGroup {...input} {...rest}>
        <FormControlLabel value="buy" control={<Radio />} label="Buy" />
        <FormControlLabel value="sell" control={<Radio />} label="Sell" />
      </RadioGroup>
    </FormControl>
    { touched && error && <div className="form-error">{error}</div> }
  </div>
);

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

const PostAd = (props) => {
  const {
    handleSubmit,
    paymentMethods,
    currencies,
  } = props;
  const dispatch = useDispatch();
  console.log('RunesX Home View');
  useEffect(() => dispatch(fetchPaymentMethodData()), [dispatch]);
  useEffect(() => dispatch(fetchCurrenciesData()), [dispatch]);

  useEffect(() => {}, [paymentMethods, currencies]);

  const handleFormSubmit = async (obj) => {
    console.log(obj);
    await dispatch(addPostAdAction(obj));
  }

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
          <form onSubmit={handleSubmit(handleFormSubmit)}>
            <Grid container>
              <Grid item xs={12}>
                <h3>Trade type</h3>
                <p>I want to</p>
                <Field name="type" component={radioButton}>
                  <Radio value="buy" label="buy" />
                  <Radio value="sell" label="sell" />
                </Field>
              </Grid>
              <Grid item xs={12}>
                <p>Location</p>
                <Field
                  name="location"
                  component={renderField}
                  type="text"
                  placeholder="Location"
                />
              </Grid>
              <Grid item xs={12}>
                <p>Payment Method</p>
                <Field
                  name="paymentMethod"
                  component={renderSelectField}
                  label="Payment Method"
                  style={{ width: '100%' }}
                >
                  {paymentMethods && paymentMethods.data && paymentMethods.data.map((item) => <option value={item.id}>{item.name}</option>)}
                </Field>
              </Grid>
              <Grid item xs={12}>
                <h3>Additional Trade Information</h3>
                <Field
                  name="currency"
                  component={renderSelectField}
                  label="Currency"
                  style={{ width: '100%' }}
                >
                  {currencies && currencies.data && currencies.data.map((item) => <option value={item.id}>{item.currency_name}</option>)}
                </Field>
              </Grid>
              <Grid item xs={12}>
                <p>Min. amount</p>
                <Field
                  name="minAmount"
                  component={renderField}
                  type="text"
                  placeholder="Min Amount"
                />
              </Grid>
              <Grid item xs={12}>
                <p>Max. amount</p>
                <Field
                  name="maxAmount"
                  component={renderField}
                  type="text"
                  placeholder="Max Amount"
                />
              </Grid>
              <Grid item xs={12}>
                <p>Price/RUNES</p>
                <Field
                  name="runesPrice"
                  component={renderField}
                  type="text"
                  placeholder="Price/RUNES"
                />
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
                  Post Advertisement
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
  if (!formProps.type) {
    errors.type = 'Type is required'
  }
  if (!formProps.location) {
    errors.location = 'Location is required'
  }
  if (!formProps.paymentMethod) {
    errors.paymentMethod = 'Payment Method is required'
  }
  if (!formProps.currency) {
    errors.currency = 'Currency Method is required'
  }
  if (!formProps.minAmount) {
    errors.minAmount = 'Minimum Amount is required'
  }
  if (!formProps.maxAmount) {
    errors.maxAmount = 'Maximum Amount is required'
  }
  if (!formProps.runesPrice) {
    errors.runesPrice = 'Price is required'
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
export default connect(mapStateToProps, actions)(reduxForm({ form: 'postad', validate })(PostAd));
