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
  cancelMainTradeAction,
  acceptMainTradeAction,
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
    if (currentTrade.userOneComplete === true && currentTrade.userTwoComplete === true) {
      console.log(currentTrade);
      history.push(`/trade/complete/${currentTrade.id}`);
    }
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
    await dispatch(cancelMainTradeAction(id));
  }

  const acceptTrade = async () => {
    // console.log(obj);
    await dispatch(acceptMainTradeAction(id));
  }

  return (
    <div className="height100 content surfContainer">
      <Grid container>
        <Grid container item xs={12}>
          <h3>
            Ad #
            {currentTrade && currentTrade.postAd && currentTrade.postAd.id}
            {' '}
            | Trade #
            {currentTrade && currentTrade.id}
          </h3>
        </Grid>
        <Grid container item xs={12}>
          <p>
            advertisment #
            {currentTrade && currentTrade.postAd && currentTrade.postAd.id}
            {' '}
            by
            {' '}
            {currentTrade && currentTrade.postAd && currentTrade.postAd.user && currentTrade.postAd.user.username }
            {' '}
            at the exchange rate
            {' '}
            {currentTrade && currentTrade.postAd && currentTrade.postAd.price / 1e8}
            {' '}
            {currentTrade && currentTrade.postAd && currentTrade.postAd.currency.currency_name}
            /RUNES
          </p>
        </Grid>
        <Grid container item xs={6}>
          <Grid container item xs={12}>
            Trade Status:
          </Grid>
          <Grid container item xs={12}>
            <Grid container item xs={12}>
              {currentTrade && currentTrade.messages ? currentTrade.messages.map((item, index) => (
                <p className="w-100">
                  (
                  {item.createdAt}
                  )
                  {' '}
                  {item.user.username}
                  :
                  {' '}
                  {item.message}
                </p>
              )) : ''}
            </Grid>
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
              Currency
            </Grid>
            <Grid container item xs={6}>
              {currentTrade && currentTrade.postAd && currentTrade.postAd.currency.currency_name}
            </Grid>
            <Grid container item xs={6}>
              Transaction status
            </Grid>
            <Grid container item xs={6}>
              running
            </Grid>
          </Grid>
        </Grid>
        <Grid container item xs={6}>
          <Grid item xs={12}>
            <Grid container>
              <Grid item xs={12}>
                <p>{currentTrade && currentTrade.amount / 1e8}</p>
              </Grid>
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
                  {// Buy
                  }
                  {
                  currentTrade
                  && user.data
                  && currentTrade.postAd
                  && currentTrade.postAd.type === 'sell'
                  && currentTrade.userOneComplete === false
                  && currentTrade.postAd.user.username === user.data.username
                  && 'i have received payment'
                  }
                  {
                  currentTrade
                  && user.data
                  && currentTrade.postAd
                  && currentTrade.postAd.type === 'sell'
                  && currentTrade.userOneComplete === true
                  && currentTrade.postAd.user.username === user.data.username
                  && 'Undo'
                  }
                  {
                  currentTrade
                  && user.data
                  && currentTrade.postAd
                  && currentTrade.postAd.type === 'sell'
                  && currentTrade.userTwoComplete === false
                  && currentTrade.user.username === user.data.username
                  && 'i have sent payment'
                  }
                  {
                  currentTrade
                  && user.data
                  && currentTrade.postAd
                  && currentTrade.postAd.type === 'sell'
                  && currentTrade.userTwoComplete === true
                  && currentTrade.user.username === user.data.username
                  && 'Undo'
                  }
                  {// Sell
                  }
                  {
                  currentTrade
                  && user.data
                  && currentTrade.postAd
                  && currentTrade.postAd.type === 'buy'
                  && currentTrade.userOneComplete === false
                  && currentTrade.postAd.user.username === user.data.username
                  && 'i have sent payment'
                  }
                  {
                  currentTrade
                  && user.data
                  && currentTrade.postAd
                  && currentTrade.postAd.type === 'buy'
                  && currentTrade.userOneComplete === true
                  && currentTrade.postAd.user.username === user.data.username
                  && 'Undo sent payment'
                  }
                  {
                  currentTrade
                  && user.data
                  && currentTrade.postAd
                  && currentTrade.postAd.type === 'buy'
                  && currentTrade.userTwoComplete === false
                  && currentTrade.user.username === user.data.username
                  && 'i have received payment'
                  }
                  {
                  currentTrade
                  && user.data
                  && currentTrade.postAd
                  && currentTrade.postAd.type === 'buy'
                  && currentTrade.userTwoComplete === true
                  && currentTrade.user.username === user.data.username
                  && 'Undo received payment'
                  }
                </Button>
              </Grid>

              <Grid item xs={12}>
                {
                  currentTrade
                  && user.data
                  && currentTrade.postAd
                  && currentTrade.postAd.type === 'sell'
                  && currentTrade.userTwoComplete === false
                  && currentTrade.user.username === user.data.username
                  && (
                  <Button
                    variant="contained"
                    color="primary"
                    type="submit"
                    className="btn"
                    fullWidth
                    size="large"
                    onClick={() => cancelTrade()}
                  >
                    Request Cancel Trade
                  </Button>
                  )
                  }
                {
                  currentTrade
                  && user.data
                  && currentTrade.postAd
                  && currentTrade.postAd.user
                  && currentTrade.postAd.type === 'sell'
                  && currentTrade.userOneComplete === false
                  && currentTrade.postAd.user.username === user.data.username
                  && (
                  <Button
                    variant="contained"
                    color="primary"
                    type="submit"
                    className="btn"
                    fullWidth
                    size="large"
                    onClick={() => cancelTrade()}
                  >
                    Request Cancel Trade
                  </Button>
                  )
                  }

              </Grid>
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
