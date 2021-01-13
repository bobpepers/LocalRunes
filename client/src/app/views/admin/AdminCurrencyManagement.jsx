import React, { useEffect } from 'react';
import { connect, useDispatch } from 'react-redux';
// import { Link } from 'react-router-dom';
import {
  Grid,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  FormControl,
} from '@material-ui/core';

import { makeStyles } from '@material-ui/core/styles';
import {
  reduxForm,
  Field,
  formValueSelector,
  change,
} from 'redux-form';
import {
  fetchAdminPublishersData,
  banAdminPublisher,
  fetchAdminCurrencyData,
  addAdminCurrency,
  // dddCountryAdmin,
} from '../../actions/admin';
// import { rejectWithdrawal, acceptWithdrawal } from '../../actions/adminWithdraw';

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

const AdminCurrencies = (props) => {
  const {
    adminCurrencies,
    handleSubmit,
  } = props;
  const dispatch = useDispatch();
  useEffect(() => dispatch(fetchAdminCurrencyData()), [dispatch]);
  useEffect(() => {
    console.log('adminCurrencies');
    console.log('adminCurrencies');
    console.log('adminCurrencies');
    console.log('adminCurrencies');
    console.log('adminCurrencies');
    console.log('adminCurrencies');
    console.log('adminCurrencies');
    console.log('adminCurrencies');
    console.log('adminCurrencies');
    console.log(adminCurrencies);
  }, [adminCurrencies]);

  const ban = (id) => {
    dispatch(banAdminPublisher(id));
  }
  const handleFormSubmit = async (obj) => {
    await dispatch(addAdminCurrency(obj));
  }

  return (
    <div className="content index600 height100 w-100 transactions transaction">
      <form onSubmit={handleSubmit(handleFormSubmit)} style={{ width: '100%' }}>
        <Grid container>
          <Grid item xs={5}>
            <Field
              name="name"
              component={renderField}
              type="name"
              placeholder="name"
            />
          </Grid>
          <Grid item xs={2}>
            <Button variant="contained" color="primary" type="submit" className="btn" fullWidth size="large">
              Add
            </Button>
          </Grid>
        </Grid>

      </form>
      <TableContainer>
        <Table
          size="small"
          aria-label="simple table"
        >
          <TableHead>
            <TableRow>
              <TableCell>id</TableCell>
              <TableCell align="right">name</TableCell>
              <TableCell align="right">action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {adminCurrencies
            && adminCurrencies.data
            && adminCurrencies.data.map((currency, i) => {
              console.log(currency);
              return (
                <TableRow key={i}>
                  <TableCell component="th" scope="row">
                    {currency.id}
                  </TableCell>
                  <TableCell align="right">
                    {currency.currency_name}
                  </TableCell>
                  <TableCell align="right">
                    {/* {country.status
                      ? (
                        <Button
                          variant="contained"
                          color="primary"
                          size="large"
                          onClick={() => ban(country.id)}
                        >
                          Disable
                        </Button>
                      )
                      : (
                        <Button
                          variant="contained"
                          color="primary"
                          size="large"
                          onClick={() => ban(country.id)}
                        >
                          Enable
                        </Button>
                      )}
                    <Button
                      variant="contained"
                      color="primary"
                      size="large"
                      onClick={() => ban(country.id)}
                    >
                      Delete
                    </Button> */}
                  </TableCell>
                </TableRow>
              )
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  )
}

function mapStateToProps(state) {
  console.log(state.adminPublishers);
  console.log(state.adminCountries);
  return {
    adminCurrencies: state.adminCurrencies,
  };
}

const validate = (formProps) => {
  const errors = {};
  if (!formProps.name) {
    errors.name = 'Name is required'
  }

  return errors;
}

// const selector = formValueSelector('profile');

export default connect(mapStateToProps, null)(reduxForm({ form: 'adminCountries', validate })(AdminCurrencies));
