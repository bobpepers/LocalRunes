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
  fetchAdminCountryData,
  addAdminCountry,
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

const AdminPublishers = (props) => {
  const {
    adminPublishers,
    adminCountries,
    handleSubmit,
  } = props;
  const dispatch = useDispatch();
  useEffect(() => dispatch(fetchAdminCountryData()), [dispatch]);
  useEffect(() => {}, [adminCountries]);

  const ban = (id) => {
    dispatch(banAdminPublisher(id));
  }
  const handleFormSubmit = async (obj) => {
    await dispatch(addAdminCountry(obj));
  }

  return (
    <div className="content index600 height100 w-100 transactions transaction">
      <form onSubmit={handleSubmit(handleFormSubmit)} style={{ width: '100%' }}>
        <Grid container>
          <Grid item xs={5}>
            <Field
              name="iso"
              component={renderField}
              type="iso"
              placeholder="iso"
            />
          </Grid>
          <Grid item xs={5}>
            <Field
              name="country"
              component={renderField}
              type="country"
              placeholder="country"
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
              <TableCell align="right">iso</TableCell>
              <TableCell align="right">name</TableCell>
              <TableCell align="right">status</TableCell>
              <TableCell align="right">action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {adminCountries
            && adminCountries.data
            && adminCountries.data.map((country, i) => {
              console.log(country);
              return (
                <TableRow key={i}>
                  <TableCell component="th" scope="row">
                    {country.id}
                  </TableCell>
                  <TableCell align="right">
                    {country.iso}
                  </TableCell>
                  <TableCell align="right">{country.name}</TableCell>
                  <TableCell align="right">{country.status ? 'Enabled' : 'Disabled'}</TableCell>
                  <TableCell align="right">
                    {country.status
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
                    </Button>
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
    adminPublishers: state.adminPublishers,
    adminCountries: state.adminCountries,
  };
}

const validate = (formProps) => {
  const errors = {};
  if (!formProps.iso) {
    errors.iso = 'Iso is required'
  }

  if (!formProps.country) {
    errors.country = 'Country is required'
  }

  return errors;
}

// const selector = formValueSelector('profile');

export default connect(mapStateToProps, null)(reduxForm({ form: 'adminCountries', validate })(AdminPublishers));
