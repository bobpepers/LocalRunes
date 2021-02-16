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
import * as actions from '../actions/auth';
import PolicyImage from '../assets/images/policy.svg';
import { fetchSpecificUserData } from '../actions/user';
import { trustAction } from '../actions/trust';
import { blockAction } from '../actions/block';
// import Globe from '../containers/Globe';

const PublicProfile = (props) => {
  const {
    match: {
      params,
    },
    specificUser,
    user,
  } = props;
  console.log('RunesX Home View');
  const userName = params[0];
  const dispatch = useDispatch();
  useEffect(() => dispatch(fetchSpecificUserData(userName)), [dispatch]);
  useEffect(() => {}, [specificUser, user]);
  const clickTrust = (specificuserName) => {
    dispatch(trustAction(specificuserName));
  }
  const clickBlock = (specificuserName) => {
    dispatch(blockAction(specificuserName));
  }

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
        <Grid item xs={8} align="center" alignItems="center">
          <h3>{specificUser && specificUser.username }</h3>
          <h4>
            Information on
            {' '}
            {specificUser && specificUser.username }
          </h4>
          <p>
            Full Name:
            {' '}
            {specificUser && specificUser.firstname }
            {' '}
            {specificUser && specificUser.lastname }
          </p>
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
            {specificUser && specificUser.tradeCount }
          </p>
          <p>
            First purchase: 0
          </p>
          <p>
            Account created:
            {' '}
            {specificUser && specificUser.createdAt }
          </p>
          <p>
            Language: english
          </p>
          <p>
            Phone Number: +
            {specificUser && specificUser.phoneNumber }
          </p>
          <p>
            Phone verified:
            {' '}
            {specificUser && specificUser.phoneNumberVerified ? 'Verified' : 'Not Verified' }
          </p>
          <p>
            Identity:
            {' '}
            {specificUser && specificUser.identityVerified === 'init' && 'Not Verified' }
            {specificUser && specificUser.identityVerified === 'pending' && 'Not Verified' }
            {specificUser && specificUser.identityVerified === 'accepted' && 'Verified' }
            {specificUser && specificUser.identityVerified === 'rejected' && 'Not Verified' }
          </p>
          <p>
            email:
            {' '}
            {specificUser && specificUser.authused ? 'Verified' : 'Not Verified' }
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
        <Grid container item xs={4} align="center" alignItems="center">
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
          <Grid container item xs={12}>
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
          </Grid>
        </Grid>
        <Grid container item xs={12}>
          <h3>
            Buy RUNES from
            {' '}
            {specificUser && specificUser.username}
          </h3>
        </Grid>
      </Grid>
    </div>
  )
}

const mapStateToProps = (state) => ({
  errorMessage: state.auth.error,
  specificUser: state.specificUser.data,
  user: state.user.data,
})

export default withRouter(connect(mapStateToProps, actions)(PublicProfile));
