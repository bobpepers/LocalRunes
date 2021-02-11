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
  sendMessageAction,
} from '../actions/message';

import {
  cancelTradeAction,
  acceptTradeAction,
  fetchSingleTradeData,
} from '../actions/trade';

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
      label="Message"
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

const Trade = (props) => {
  const {
    currentTrade,
    handleSubmit,
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
  const [descriptionLength, setDescriptionLength] = useState(0);

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

  const onBasicFieldChange = (event, newValue, previousValue, name) => {
    setDescriptionLength(newValue.length);
  };

  const handleFormSubmit = async (message) => {
    await dispatch(sendMessageAction(message, currentTrade.id));
  }

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
        <Grid container item xs={12}>
          title
        </Grid>
        <Grid container item xs={6}>
          <Grid container item xs={12}>
            Trade Status:
          </Grid>
          <Grid container item xs={12}>
            <Grid item xs={12}>
              <h3>Send message to </h3>
            </Grid>
            <Grid item xs={12}>
              <form onSubmit={handleSubmit(handleFormSubmit)}>
                <Grid item>
                  <Field
                    name="message"
                    component={renderTextField}
                    type="message"
                    placeholder="Message"
                    onChange={onBasicFieldChange}
                  />
                  <div>
                    {descriptionLength}
                    {' '}
                    / 400
                  </div>
                </Grid>
                <Grid item>
                  <Button variant="contained" color="primary" type="submit" className="btn" fullWidth size="large">
                    Send
                  </Button>
                </Grid>
              </form>
            </Grid>
            <Grid container item xs={12}>
              {currentTrade && currentTrade.messages ? currentTrade.messages.map((item, index) => (
                <p>
                  {item.user.username}
                  :
                  {' '}
                  {item.message}
                </p>
              )) : ''}
            </Grid>
          </Grid>
          <Grid container item xs={12}>
            <Grid container item xs={12}>
              <h3>Detailed info</h3>
            </Grid>
            <Grid container item xs={6}>
              Advertiser
            </Grid>
            <Grid container item xs={6}>
              Bago
            </Grid>
            <Grid container item xs={6}>
              Deal Type
            </Grid>
            <Grid container item xs={6}>
              Sell/buy
            </Grid>
            <Grid container item xs={6}>
              Deal amount
            </Grid>
            <Grid container item xs={6}>
              {currentTrade && currentTrade.amount / 1e8}
            </Grid>
            <Grid container item xs={6}>
              price
            </Grid>
            <Grid container item xs={6}>
              {currentTrade && currentTrade.postAd && currentTrade.postAd.price / 1e8}
            </Grid>
            <Grid container item xs={6}>
              total
            </Grid>
            <Grid container item xs={6}>
              {currentTrade && currentTrade.postAd && ((currentTrade.amount / 1e8) * (currentTrade.postAd.price / 1e8))}
            </Grid>
            <Grid container item xs={6}>
              Transaction status
            </Grid>
            <Grid container item xs={6}>
              done
            </Grid>
          </Grid>
        </Grid>
        <Grid container item xs={6}>
          <Grid container item xs={12}>
            rechts
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <Grid container>
            <Grid item xs={12}>
              <p>{currentTrade && currentTrade.amount}</p>
            </Grid>
            {currentTrade && currentTrade.postAd && currentTrade.postAd.user && user && user.data && currentTrade.postAd.user.username === user.data.username && (
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
});

const validate = (formProps) => {
  const errors = {};
  if (!formProps.message) {
    errors.message = 'Message is required'
  }

  return errors;
}

// export default withRouter(connect(mapStateToProps, actions)(PostAd));
// export default connect(mapStateToProps, actions)(TradeRequested);
export default connect(mapStateToProps, actions)(reduxForm({ form: 'message', validate })(Trade));
