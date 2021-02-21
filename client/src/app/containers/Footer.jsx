import React, {
  useEffect,
  useState,
  useRef,
} from 'react';
import {
  connect,
  useDispatch,
} from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import {
  Grid,
  Tooltip,
  Select,
  InputLabel,
  MenuItem,
  FormHelperText,
  FormControl,
} from '@material-ui/core';
import { withTranslation } from 'react-i18next';
// import actions from 'redux-form/lib/actions';
import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord';
import ConfirmationNumberIcon from '@material-ui/icons/ConfirmationNumber';
import AccountBalanceWalletIcon from '@material-ui/icons/AccountBalanceWallet';
import LocalOfferIcon from '@material-ui/icons/LocalOffer';
import ExposureIcon from '@material-ui/icons/Exposure';
import { fetchUserData } from '../actions/user';
import { getPrice } from '../actions';
import ThemeToggle from '../components/ThemeToggle';

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

const Footer = (props) => {
  const {
    t,
    error,
    loading,
    price,
    user,
    online,
  } = props;

  const dispatch = useDispatch();
  const [onlineCount, setOnlineCount] = useState('');
  const classes = useStyles();
  const [currencyState, setCurrencyState] = useState('USD');
  const [currencyData, setCurrencyData] = useState([{ id: 1, currency: 'USD', price: 0 }]);
  const handleChange = (event) => {
    // console.log(event.currentTarget.value)
    const { value } = event.currentTarget;
    setCurrencyState(value);
    setCurrencyData(price && price.filter((object) => object.currency === value));
  };

  useEffect(() => dispatch(fetchUserData()), [dispatch]);
  useEffect(() => dispatch(getPrice()), [dispatch]);

  useEffect(() => {
    if (price) {
      console.log(currencyState);

      console.log(currencyData);
    }
  }, [price, currencyState]);
  useEffect(() => {
    console.log('price');
    console.log('price');
    console.log('price');
    console.log('price');
    console.log('price');
    console.log('price');
    console.log('price');
    console.log('price');
    console.log('price');
    console.log('price');

    console.log(price)
    if (price) {
      setCurrencyData(price.filter((object) => object.currency === currencyState));
    }
  }, [price]);
  useEffect(() => {

  }, [price, user, currencyState, currencyData]);

  if (loading) {
    return <div>Loading...</div>;
  }
  return (
    <div className="infoBar footer">
      <Grid
        container
        // className="height100 d-flex justify-content-around justify-content-md-center Grid itemst-unstyled categories ng-scope"
        // ng-controller="myController"
        direction="row"
        justify="center"
        alignItems="baseline"
      >
        <Grid
          item
          container
          justify="center"
          xs={4}
          sm={4}
          md={2}
        >
          <Tooltip title="People Online" aria-label="show">
            <p className="noBottomMargin floatLeft">
              <FiberManualRecordIcon />
              {' '}
              {onlineCount !== '' ? onlineCount : online}
            </p>
          </Tooltip>
        </Grid>
        <Grid
          item
          container
          justify="center"
          xs={4}
          sm={4}
          md={2}
        >
          <Tooltip title="Wallet total balance" aria-label="show">
            <p className="noBottomMargin floatLeft">
              <AccountBalanceWalletIcon />
              {' '}
              {
             user && user.wallet
               ? ((user.wallet.available + user.wallet.locked) / 1e8)
               : 0
            }
              {' '}
              RUNES
            </p>
          </Tooltip>
        </Grid>
        <Grid
          item
          container
          xs={4}
          sm={4}
          md={2}
          justify="center"
          // direction="column"
        >
          <Tooltip title="Estimated Wallet Value" aria-label="show">
            <p className="noBottomMargin">
              <ExposureIcon />
              {' '}
              ~
              {
             user && user.wallet && currencyData.length
               ? (((user.wallet.available + user.wallet.locked) / 1e8) * currencyData[0].price).toFixed(3)
               : 0
            }
              {' '}
              {currencyState}
            </p>
          </Tooltip>
        </Grid>
        <Grid
          item
          container
          xs={4}
          sm={4}
          md={2}
          justify="center"
          // direction="column"
        >
          <Tooltip title="Current RUNES price" aria-label="show">
            <p className="noBottomMargin">
              <LocalOfferIcon />
              {' '}
              {currencyData.length && currencyData[0].price}
              {' '}
              {currencyState}
            </p>
          </Tooltip>
        </Grid>
        <Grid
          item
          container
          justify="center"
          xs={4}
          sm={4}
          md={2}
        >
          <Tooltip title="Currency Selection" aria-label="show">
            <FormControl className={classes.formControl}>
              {/* <InputLabel htmlFor="age-native-simple">Currency</InputLabel> */}
              <Select
                native
                value={currencyState}
                onChange={handleChange}
                inputProps={{
                  name: 'currency',
                  id: 'age-native-simple',
                }}
              >
                {price && price.map((currency, index) =>
                  // console.log(currency);
                  (
                    <option value={currency.currency}>{currency.currency}</option>
                  ))}
              </Select>
            </FormControl>
          </Tooltip>
        </Grid>
        <Grid
          item
          xs={4}
          sm={4}
          md={2}
          align="center"
          // alignItems="center"
          // direction="row"
        >
          <ThemeToggle />
        </Grid>
      </Grid>
    </div>
  )
}

const mapStateToProps = (state) => ({
  price: state.price.data,
  online: state.online.people,
  // wallet: state.user.data.user,
  user: state.user.data,
  errorMessage: state.auth.error,
})

export default connect(mapStateToProps)(withTranslation()(Footer));
