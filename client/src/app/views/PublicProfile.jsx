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
} from '@material-ui/core';
import Rating from 'react-rating';
import * as actions from '../actions/auth';
import PolicyImage from '../assets/images/policy.svg';
import { fetchSpecificUserData } from '../actions/user';
import { trustAction } from '../actions/trust';
import { blockAction } from '../actions/block';
// import Globe from '../containers/Globe';
import {
  fetchPostAdData,
} from '../actions/postAd';
import TableAds from '../components/TableAds';
import EmptyStar from '../assets/images/Empty_Star.svg';
import FullStar from '../assets/images/Full_Star_Yellow.svg';

const headCellsBuy = [
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
  // {
  //  id: 'actual', numeric: true, disablePadding: false, label: 'Over/Under Price %',
  // },
  {
    id: 'limits', numeric: true, disablePadding: false, label: 'Limits',
  },
  {
    id: 'actions', numeric: true, disablePadding: false, label: 'Actions',
  },
];

const headCellsSell = [
  {
    id: 'buyer', numeric: false, disablePadding: true, label: 'Buyer',
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
  // {
  //  id: 'actual', numeric: true, disablePadding: false, label: 'Over/Under Price %',
  // },
  {
    id: 'limits', numeric: true, disablePadding: false, label: 'Limits',
  },
  {
    id: 'actions', numeric: true, disablePadding: false, label: 'Actions',
  },
];

const PublicProfile = (props) => {
  const {
    match: {
      params,
    },
    specificUser,
    user,
    postAd,
  } = props;
  console.log('RunesX Home View');
  const userName = params[0];
  const dispatch = useDispatch();
  useEffect(() => dispatch(fetchSpecificUserData(userName)), [dispatch]);

  const clickTrust = (specificuserName) => {
    dispatch(trustAction(specificuserName));
  }
  const clickBlock = (specificuserName) => {
    dispatch(blockAction(specificuserName));
  }

  // const userToFetch = specificUser && specificUser.username ? specificUser.username : 'all';

  useEffect(() => {
  }, [specificUser, user, postAd]);

  useEffect(() => {
    if (specificUser) {
      console.log('specificUser.username');
      console.log('specificUser.username');
      console.log('specificUser.username');
      console.log('specificUser.username');
      console.log('specificUser.username');
      console.log('specificUser.username');
      console.log('specificUser.username');
      console.log('specificUser.username');
      console.log('specificUser.username');
      console.log('specificUser.username');
      console.log('specificUser.username');
      console.log(specificUser.username);
      dispatch(fetchPostAdData(
        'sell',
        'all',
        'all',
        'all',
        'all',
        'all',
        specificUser.username,
      ));
      dispatch(fetchPostAdData(
        'buy',
        'all',
        'all',
        'all',
        'all',
        'all',
        specificUser.username,
      ));
    }
  }, [specificUser]);

  const userTrusted = (username) => {
    if (specificUser && specificUser.trustedUsers) {
      return specificUser.trustedUsers.some((el) => el.userTrust.username === username);
    }
  }

  const userBlocked = (username) => {
    if (specificUser && specificUser.blockedUsers) {
      return specificUser.blockedUsers.some((el) => el.userBlock.username === username);
    }
  }

  return (
    <div className="height100 content surfContainer">
      <Grid container align="center" alignConent="center" alignItems="center">
        <Grid
          item
          xs={12}
          sm={12}
          md={8}
          lg={8}
          xl={8}
          align="center"
          alignItems="center"
        >
          <h3>{specificUser && specificUser.username }</h3>
          <Rating
            readonly
            emptySymbol={<EmptyStar />}
            fullSymbol={<FullStar />}
          />
          <h4>
            Information on
            {' '}
            {specificUser && specificUser.username }
          </h4>
          {/* <p>
            Full Name:
            {' '}
            {specificUser && specificUser.firstname }
            {' '}
            {specificUser && specificUser.lastname }
          </p> */}
          <p>
            Trade Volume:
            {' '}
            {specificUser && (specificUser.volume / 1e8) }
            {' '}
            RUNES
          </p>
          <p>
            Number of completed trades:
            {' '}
            {specificUser && specificUser.tradeCount ? specificUser.tradeCount.toString() : '0' }
          </p>
          <p>
            First trade:
            {' '}
            {specificUser && specificUser.firstTrade ? specificUser.firstTrade : 'never'}
          </p>
          <p>
            Account created:
            {' '}
            {specificUser && specificUser.createdAt }
          </p>
          <p>
            Language: english
          </p>
          {/* <p>
            Phone Number: +
            {specificUser && specificUser.phoneNumber }
          </p> */}
          <p>
            Phone verified:
            {' '}
            {specificUser && specificUser.phoneNumberVerified ? (<span className="color-green">Verified</span>) : (<span className="color-red">Not Verified</span>) }
          </p>
          <p>
            Identity:
            {' '}
            {specificUser && specificUser.identityVerified === 'init' && (<span className="color-red">Not Verified</span>)}
            {specificUser && specificUser.identityVerified === 'pending' && (<span className="color-red">Not Verified</span>) }
            {specificUser && specificUser.identityVerified === 'accepted' && (<span className="color-green">Verified</span>)}
            {specificUser && specificUser.identityVerified === 'rejected' && (<span className="color-red">Not Verified</span>) }
          </p>
          <p>
            email:
            {' '}
            {specificUser && specificUser.authused ? (<span className="color-green">Verified</span>) : (<span className="color-red">Not Verified</span>) }
          </p>
          <p>
            Trusted by
            {' '}
            {specificUser && specificUser.trustedUsers ? specificUser.trustedUsers.length : '0' }
            {' '}
            people
          </p>
          <p>
            Blocked by
            {' '}
            {specificUser && specificUser.blockedUsers ? specificUser.blockedUsers.length : '0' }
            {' '}
            people
          </p>
        </Grid>
        <Grid
          container
          item
          xs={12}
          sm={12}
          md={4}
          lg={4}
          xl={4}
          align="center"
          alignItems="center"
        >
          <Grid container item xs={12}>
            {specificUser && specificUser.username === user.username ? (
              <p>
                Can't Trust or Block yourself
              </p>
            ) : (
              <>

                <Grid container item xs={6}>
                  <Button
                    variant="contained"
                    size="large"
                    color="primary"
                    onClick={() => clickTrust(specificUser && specificUser.username)}
                  >

                    {userTrusted(user && user.username) ? 'Untrust' : 'Trust'}
                  </Button>
                </Grid>
                <Grid container item xs={6}>
                  <Button
                    variant="contained"
                    size="large"
                    color="primary"
                    onClick={() => clickBlock(specificUser && specificUser.username)}
                  >
                    {userBlocked(user && user.username) ? 'Unblock' : 'Block'}
                  </Button>
                </Grid>
              </>
            ) }

          </Grid>
          {/* <Grid container item xs={12}>
            <Grid container item xs={12}>
              <h3>
                Feedback
              </h3>
            </Grid>
            <Grid container item xs={12}>
              <p>
                december 14 2020 16:59pm, Bago
              </p>
            </Grid>
            <Grid container item xs={12}>
              <p>
                Good trader, fast delivery
              </p>
            </Grid>
          </Grid> */}
        </Grid>
        <Grid container item xs={12}>
          <h3>
            Buy RUNES from
            {' '}
            {specificUser && specificUser.username}
          </h3>
        </Grid>
        <Grid item xs={12}>
          <TableAds
            defaultPageSize={3}
            headCells={headCellsBuy || []}
            postAd={postAd && postAd.sell ? postAd.sell : []}
          />
        </Grid>
        <Grid container item xs={12}>
          <h3>
            Sell RUNES to
            {' '}
            {specificUser && specificUser.username}
          </h3>
        </Grid>
        <Grid item xs={12}>
          <TableAds
            defaultPageSize={3}
            headCells={headCellsSell || []}
            postAd={postAd && postAd.buy ? postAd.buy : []}
          />
        </Grid>
      </Grid>
    </div>
  )
}

const mapStateToProps = (state) => ({
  errorMessage: state.auth.error,
  specificUser: state.specificUser.data,
  user: state.user.data,
  postAd: state.postAd,
})

export default withRouter(connect(mapStateToProps, actions)(PublicProfile));
