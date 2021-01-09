import React, { useEffect } from 'react';
import { Route } from 'react-router-dom';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';

import UserList from './components/users/UserList';
import Signin from './components/auth/Signin';
import LoginTFA from './components/auth/Login2FA';
import Signout from './components/auth/Signout';
import Signup from './components/auth/Signup';
import VerifyEmail from './components/auth/VerifyEmail';
import SignupVerify from './components/auth/SignupVerify';
import ResetPassword from './components/resetPassword/ResetPassword';
import ResetPasswordVerify from './components/resetPassword/ResetPasswordVerify';
import ResetPasswordNew from './components/resetPassword/ResetPasswordNew';

import Deposit from './components/Deposit';
import Withdraw from './components/Withdraw';

import Dashboard from './views/Dashboard';
import Surf from './views/Surf';
import Click from './views/Click';
import Home from './views/Home';
import Jackpot from './views/Jackpot';
import Admin from './views/admin/Admin';
import AdApproval from './views/AdApproval';
import withTracker from './hooks/withTracker';
import Faucet from './views/Faucet';
import BuyRunes from './views/BuyRunes';
import SellRunes from './views/SellRunes';
import Terms from './views/Terms';
import Privacy from './views/Privacy';
import AboutUs from './views/AboutUs';
import Profile from './views/Profile';
import Wallet from './views/Wallet';
import PostAd from './views/PostAd';
import PublicProfile from './views/PublicProfile';

import requireAuth from './components/hoc/RequireAuth';
import requireNotAuth from './components/hoc/RequireNotAuth';

import toggleTheme from './helpers/toggleTheme';

const Routes = (props) => {
  const {
    theme,
  } = props;
  useEffect(() => {
    toggleTheme(theme);
  }, [theme]);

  return (
    <>
      <Route
        exact
        path="/"
        component={withTracker(Home)}
      />
      <Route
        path="/buy-runes"
        component={requireAuth(withTracker(BuyRunes))}
      />
      <Route
        path="/sell-runes"
        component={requireAuth(withTracker(SellRunes))}
      />
      <Route
        path="/dashboard"
        component={requireAuth(withTracker(Dashboard))}
      />
      <Route
        path="/signin"
        component={requireNotAuth(withTracker(Signin))}
      />
      <Route
        path="/login/2fa"
        component={requireAuth(withTracker(LoginTFA))}
      />
      <Route
        exact
        path="/signup"
        component={requireNotAuth(withTracker(Signup))}
      />
      <Route
        path="/signout"
        component={Signout}
      />
      <Route
        path="/signup/verify-email"
        component={requireNotAuth(withTracker(SignupVerify))}
      />
      <Route
        path="/verify-email"
        component={requireNotAuth(withTracker(VerifyEmail))}
      />
      <Route
        exact
        path="/reset-password"
        component={requireNotAuth(withTracker(ResetPassword))}
      />
      <Route
        path="/reset-password/verify"
        component={withTracker(ResetPasswordVerify)}
      />
      <Route
        path="/reset-password/new"
        component={requireNotAuth(withTracker(ResetPasswordNew))}
      />
      <Route
        path="/users"
        component={requireAuth(withTracker(UserList))}
      />
      <Route
        path="/admin"
        component={requireAuth(withTracker(Admin))}
      />
      <Route
        path="/aboutus"
        component={withTracker(AboutUs)}
      />
      <Route
        path="/terms"
        component={withTracker(Terms)}
      />
      <Route
        path="/policy"
        component={withTracker(Privacy)}
      />
      <Route
        path="/wallet"
        exact
        component={requireAuth(withTracker(Wallet))}
      />
      <Route
        path="/wallet/send"
        exact
        component={requireAuth(withTracker(Withdraw))}
      />
      <Route
        path="/wallet/receive"
        exact
        component={requireAuth(withTracker(Deposit))}
      />
      <Route
        path="/profile"
        component={requireAuth(withTracker(Profile))}
      />
      <Route
        path="/public_profile/*"
        component={requireAuth(withTracker(PublicProfile))}
      />
      <Route
        path="/post-ad"
        component={requireAuth(withTracker(PostAd))}
      />
    </>
  )
}

Routes.propTypes = {
  theme: PropTypes.shape({
    theme: PropTypes.string.isRequired,
  }).isRequired,
};

const mapStateToProps = (state) => ({
  theme: state.theme,
})

export default connect(mapStateToProps, null)(Routes);
