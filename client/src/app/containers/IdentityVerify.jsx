import React, { useState, useEffect } from 'react';
import {
  Paper,
  TextField,
  MenuItem,
  Button,
  IconButton,
} from '@material-ui/core';
import { connect, useDispatch } from 'react-redux';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import {
  reduxForm,
  Field,
  formValueSelector,
  change,
} from 'redux-form';
import { uploadIdentity } from '../actions/identity';

const adaptFileEventToValue = (delegate) => (e) => delegate(e.target.files[0]);

const FileInput = ({
  input: {
    value: omitValue, onChange, onBlur, ...inputProps
  },
  meta: omitMeta,
  ...props
}) => (
  <input
    onChange={adaptFileEventToValue(onChange)}
    onBlur={adaptFileEventToValue(onBlur)}
    type="file"
    {...props.input}
    {...props}
  />
);

const IdentityVerify = (props) => {
  const {
    getPhoneCodeProp,
    verifyPhoneCodeProp,
    handleSubmit,
  } = props;
  const dispatch = useDispatch();

  const onFormSubmit = (data) => {
    dispatch(uploadIdentity(data));
  }

  return (
    <div style={{

      backgroundColor: 'rgba(160, 160, 160, 0.2)',
    }}
    >
      <Paper elevation={4} style={{ padding: 20, width: 300, marginBottom: 60 }}>
        <form onSubmit={handleSubmit(onFormSubmit)}>
          <div>
            <label>front</label>
            <Field
              name="front"
              component={FileInput}
              type="file"
            />
          </div>
          <div>
            <label>back</label>
            <Field
              name="back"
              component={FileInput}
              type="file"
            />
          </div>
          <button type="submit">Submit</button>
        </form>
      </Paper>
    </div>
  );
}

const mapStateToProps = (state) => {
  console.log(state.uploadAvatar);
  return {
    user: state.user.data,
    verifyPhoneCodeProp: state.verifyPhoneCode.data,
    getPhoneCodeProp: state.getPhoneCode.data,
  }
}

const validate = (formProps) => {
  const errors = {};
  if (!formProps.front) {
    errors.email = 'Front is required'
  }

  if (!formProps.back) {
    errors.password = 'Back is required'
  }

  return errors;
}
const selector = formValueSelector('identityUpload');

export default connect(mapStateToProps, null)(reduxForm({ form: 'identityUpload', validate })(IdentityVerify));
