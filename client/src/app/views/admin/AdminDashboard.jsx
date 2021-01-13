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
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import {
  fetchAdminPublishersData,
  banAdminPublisher,
} from '../../actions/admin';
// import { rejectWithdrawal, acceptWithdrawal } from '../../actions/adminWithdraw';

const AdminPublishers = (props) => {
  const {
    adminPublishers,
  } = props;
  const dispatch = useDispatch();
  useEffect(() => dispatch(fetchAdminPublishersData()), [dispatch]);
  useEffect(() => {
    console.log('adminPublishers');
    console.log(adminPublishers);
  }, [adminPublishers]);

  const ban = (id) => {
    dispatch(banAdminPublisher(id));
  }

  return (
    <div className="content index600 height100 w-100 transactions transaction">
      <Grid container>
        <Grid item xs={4}>
          321
        </Grid>
        <Grid item xs={4}>
          321
        </Grid>
        <Grid item xs={4}>
          321
        </Grid>
      </Grid>
    </div>
  )
}

function mapStateToProps(state) {
  console.log(state.adminPublishers)
  return {
    adminPublishers: state.adminPublishers,
  };
}

export default connect(mapStateToProps, null)(AdminPublishers);
