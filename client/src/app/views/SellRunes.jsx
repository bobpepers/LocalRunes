import React, {
  useEffect,
  // useState,
  // Fragment,
} from 'react';
import { withRouter } from 'react-router-dom';
import { connect, useDispatch } from 'react-redux';
import {
  Grid,
  // Button,
} from '@material-ui/core';

import {
  fetchPostAdData,
} from '../actions/postAd';
// import Info from '../containers/Info';
// import * as actions from '../actions/auth';
import TableAds from '../components/TableAds';

const headers = [
  'Seller',
  'Payment Method',
  'Price / RUNES',
  'Limits',
  'Actions',
];

const headCells = [
  {
    id: 'seller', numeric: false, disablePadding: true, label: 'Seller',
  },
  {
    id: 'country', numeric: true, disablePadding: false, label: 'Country',
  },
  {
    id: 'paymentMethod', numeric: true, disablePadding: false, label: 'Payment Method',
  },
  {
    id: 'price', numeric: true, disablePadding: false, label: 'Price / RUNES',
  },
  {
    id: 'currency', numeric: true, disablePadding: false, label: 'Currency',
  },
  {
    id: 'limits', numeric: true, disablePadding: false, label: 'Limits',
  },
  {
    id: 'actions', numeric: true, disablePadding: false, label: 'Actions',
  },
];

const sellRunes = (props) => {
  const {
    postAd,
  } = props;
  console.log('RunesX Home View');
  const dispatch = useDispatch();
  useEffect(() => dispatch(fetchPostAdData('sell')), [dispatch]);
  useEffect(() => {
    console.log('6666666666666666');
    console.log(postAd);
  }, [postAd]);

  return (
    <div className="height100 content">
      <Grid container>
        <TableAds
          headCells={headCells || []}
          postAd={postAd && postAd.sell ? postAd.sell : []}
        />
      </Grid>
    </div>
  )
}

const mapStateToProps = (state) => ({
  postAd: state.postAd,
  // errorMessage: state.auth.error,
})

export default withRouter(connect(mapStateToProps, null)(sellRunes));
