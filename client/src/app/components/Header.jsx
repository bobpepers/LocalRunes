import React, {
  useState,
  useEffect,
  useRef,
  useCallback,
} from 'react';
import { connect, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import {
  Navbar,
  Nav,
  NavDropdown,
} from 'react-bootstrap';

import { withTranslation } from 'react-i18next';
import ReactCountryFlag from 'react-country-flag';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import LiveTvIcon from '@material-ui/icons/LiveTv';
// import MouseIcon from '@material-ui/icons/Mouse';
import DashboardIcon from '@material-ui/icons/Dashboard';
import AttachMoneyIcon from '@material-ui/icons/AttachMoney';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFaucet } from '@fortawesome/free-solid-svg-icons';
import Badge from '@material-ui/core/Badge';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import MenuIcon from '@material-ui/icons/Menu';
import IconButton from '@material-ui/core/IconButton';
import NotificationsIcon from '@material-ui/icons/Notifications';
import AccountBalanceWalletIcon from '@material-ui/icons/AccountBalanceWallet';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import FaceIcon from '@material-ui/icons/Face';
import SettingsIcon from '@material-ui/icons/Settings';
import MobileNav from '../assets/images/mobileNav.svg';
import Notifications from './Notifications';
import {
  getPendingWithdrawalCount,
  getPendingIdentityCount,
  getPendingDisputeCount,

} from '../actions/adminCounts';

// import 'bootstrap/dist/css/bootstrap.css';

const Header = (props) => {
  // const { t } = props;
  const {
    t,
    i18n,
    authenticated,
    user,
    adminPendingWithdrawalsCount,
    adminPendingIdentityCount,
    adminPendingDisputeCount,
  } = props;
  const heightRef = useRef(null);
  const [ref, setRef] = useState(null);
  const dispatch = useDispatch();
  const [menu, setMenu] = useState(false);
  const [height, setHeight] = useState(0);

  const handleClick = (event) => {
    // this.setState({ anchorEl: event.currentTarget, open: Boolean(event.currentTarget) });

  }

  const handleClose = (event) => {
    // this.setState({ anchorEl: event.currentTarget, open: false });
  }

  const handleWindowResize = useCallback((event) => {
    console.log('resize window');
    if (height !== heightRef.current.clientHeight) {
      // this.setState({ height: this.div.clientHeight });
      setHeight(heightRef.current.clientHeight);
    }
  }, []);

  useEffect(() => {
    window.addEventListener('resize', handleWindowResize);

    return () => {
      window.removeEventListener('resize', handleWindowResize);
    };
  }, [handleWindowResize]);

  useEffect(() => {
    if (user && user.role === 4) {
      dispatch(getPendingWithdrawalCount());
      dispatch(getPendingIdentityCount());
      dispatch(getPendingDisputeCount());
      const interval = setInterval(() => {
        dispatch(getPendingWithdrawalCount());
        dispatch(getPendingIdentityCount());
        dispatch(getPendingDisputeCount());
      }, 1 * 60 * 1000);
      return () => clearInterval(interval);
    }
  }, [user]);

  useEffect(() => { }, [adminPendingWithdrawalsCount, adminPendingDisputeCount]);

  useEffect(() => {
    setHeight(heightRef.current.clientHeight);
  }, [menu]);

  const toggleMenu = () => {
    setMenu(!menu);
  }

  const show = (menu) ? 'show' : '';

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };
  const getCurrentLng = () => i18n.language || window.localStorage.i18nextLng || '';
  const countryCode = (country) => {
    if (country == 'pt') {
      return 'br';
    }
    if (country == 'en') {
      return 'us';
    }
    if (country == 'nl') {
      return 'nl';
    }
  }
  // console.log(this.props.user);
  return (
    <header className="rootRow header" style={{ height }}>
      <Navbar
      // ref={(div) => { this.div = div; }}
        ref={heightRef}
        fixed="top"
        className="navbar navbar-default"
        expand="lg"
      >
        <Link to={authenticated ? '/' : '/'} className="nav-link">LocalRunes.com</Link>
        <button
          className="navbar-toggler"
          type="button"
          onClick={toggleMenu}
        >
          <MobileNav />
        </button>
        <Navbar.Collapse id="basic-navbar-nav" className={`collapse navbar-collapse ${show}`}>
          <Nav className="mr-auto rNavbar">
            <Link className="nav-link" to="/buy-runes">
              Buy RUNES
            </Link>
            <Link className="nav-link" to="/sell-runes">
              Sell RUNES
            </Link>
            {
              authenticated
                 && (
                 <>
                   <Link className="nav-link" to="/post-ad">
                     Post a Trade
                   </Link>

                 </>
                 )
            }

          </Nav>
          <ul>
            {
              authenticated
                && (
                  <>
                    <li>
                      <Notifications />
                    </li>
                  </>

                )

            }
          </ul>

          {
              authenticated && user && user.role === 4 && (
                <ul className="adminDropdownWrapper">
                  <li>
                    <Badge
                      badgeContent={adminPendingWithdrawalsCount
                        && Number(adminPendingDisputeCount)
                        + Number(adminPendingWithdrawalsCount)
                        + Number(adminPendingIdentityCount)}
                      color="secondary"
                    >
                      <NavDropdown
                        className="langPadding toggleLangWrapper"
                        title="Admin"
                        id="admin_nav_dropdown"
                      >
                        <NavDropdown.Item onClick={handleClose}>
                          <div>
                            <Link
                              style={{ color: '#000' }}
                              className="nav-link"
                              to="/admin"
                            >
                              <AccountBalanceWalletIcon />
                              {' '}
                              Dashboard
                            </Link>
                          </div>
                        </NavDropdown.Item>
                        <NavDropdown.Item onClick={handleClose}>
                          <div>
                            <Link style={{ color: '#000' }} className="nav-link" to="/admin/withdrawals/pending">
                              <SettingsIcon />
                              {' '}
                              Pending Withdrawals (
                              {adminPendingWithdrawalsCount || 0}
                              )
                            </Link>
                          </div>
                        </NavDropdown.Item>
                        <NavDropdown.Item onClick={handleClose}>
                          <div>
                            <Link style={{ color: '#000' }} className="nav-link" to="/admin/identity/pending">
                              <SettingsIcon />
                              {' '}
                              Pending Identity (
                              {adminPendingIdentityCount || 0}
                              )
                            </Link>
                          </div>
                        </NavDropdown.Item>
                        <NavDropdown.Item onClick={handleClose}>
                          <div>
                            <Link style={{ color: '#000' }} className="nav-link" to="/admin/disputes/pending">
                              <SettingsIcon />
                              {' '}
                              Pending Disputes (
                              {adminPendingDisputeCount || 0}
                              )
                            </Link>
                          </div>
                        </NavDropdown.Item>
                        <NavDropdown.Item onClick={handleClose}>
                          <div>
                            <Link style={{ color: '#000' }} className="nav-link" to="/admin/withdrawals">
                              <SettingsIcon />
                              {' '}
                              Withdrawals
                            </Link>
                          </div>
                        </NavDropdown.Item>
                        <NavDropdown.Item onClick={handleClose}>
                          <div>
                            <Link style={{ color: '#000' }} className="nav-link" to="/admin/deposits">
                              <SettingsIcon />
                              {' '}
                              Deposits
                            </Link>
                          </div>
                        </NavDropdown.Item>
                        <NavDropdown.Item onClick={handleClose}>
                          <div>
                            <Link style={{ color: '#000' }} className="nav-link" to="/admin/trades">
                              <SettingsIcon />
                              {' '}
                              Trades
                            </Link>
                          </div>
                        </NavDropdown.Item>
                        <NavDropdown.Item onClick={handleClose}>
                          <div>
                            <Link style={{ color: '#000' }} className="nav-link" to="/admin/users">
                              <AccountCircleIcon />
                              {' '}
                              User Managment
                            </Link>
                          </div>
                        </NavDropdown.Item>
                        <NavDropdown.Item onClick={handleClose}>
                          <div>
                            <Link style={{ color: '#000' }} className="nav-link" to="/admin/countries">
                              <FaceIcon />
                              {' '}
                              Countries
                            </Link>
                          </div>
                        </NavDropdown.Item>
                        <NavDropdown.Item onClick={handleClose}>
                          <div>
                            <Link style={{ color: '#000' }} className="nav-link" to="/admin/currencies">
                              <DashboardIcon />
                              {' '}
                              Currencies
                            </Link>
                          </div>
                        </NavDropdown.Item>
                        <NavDropdown.Item onClick={handleClose}>
                          <div>
                            <Link style={{ color: '#000' }} className="nav-link" to="/admin/paymentmethods">
                              <SettingsIcon />
                              {' '}
                              Payment Methods
                            </Link>
                          </div>
                        </NavDropdown.Item>
                      </NavDropdown>
                    </Badge>
                  </li>
                </ul>
              )
  }
          {
              authenticated
                ? (
                  <>
                    <ul>
                      <li>
                        <NavDropdown
                          className="langPadding toggleLangWrapper"
                          title={(user && user.username)}
                          id="basic-nav-dropdown"
                        >
                          <NavDropdown.Item onClick={handleClose}>
                            <div>
                              <Link style={{ color: '#000' }} className="nav-link" to="/wallet">
                                <AccountBalanceWalletIcon />
                                {' '}
                                Wallet
                              </Link>
                            </div>
                          </NavDropdown.Item>
                          <NavDropdown.Item onClick={handleClose}>
                            <div>
                              <Link style={{ color: '#000' }} className="nav-link" to="/profile">
                                <AccountCircleIcon />
                                {' '}
                                My Account
                              </Link>
                            </div>
                          </NavDropdown.Item>
                          <NavDropdown.Item onClick={handleClose}>
                            <div>
                              <Link style={{ color: '#000' }} className="nav-link" to={`/public_profile/${user && user.username}`}>
                                <FaceIcon />
                                {' '}
                                Public Profle
                              </Link>
                            </div>
                          </NavDropdown.Item>
                          <NavDropdown.Item onClick={handleClose}>
                            <div>
                              <Link style={{ color: '#000' }} className="nav-link" to="/dashboard">
                                <DashboardIcon />
                                {' '}
                                Dashboard
                              </Link>
                            </div>
                          </NavDropdown.Item>
                          <NavDropdown.Item onClick={handleClose}>
                            <div>
                              <Link style={{ color: '#000' }} className="nav-link" to="/settings">
                                <SettingsIcon />
                                {' '}
                                Settings
                              </Link>
                            </div>
                          </NavDropdown.Item>
                          <NavDropdown.Item onClick={handleClose}>
                            <div>
                              <Link style={{ color: '#000' }} className="nav-link" to="/signout">
                                <ExitToAppIcon />
                                {' '}
                                Logout
                              </Link>
                            </div>
                          </NavDropdown.Item>
                        </NavDropdown>
                      </li>
                    </ul>
                  </>

                )
                : (
                  <>
                    <ul>
                      <li>
                        <Link className="nav-link" to="/signup">Sign up free</Link>
                      </li>
                      <li>
                        <Link className="nav-link" to="/signin">Sign in</Link>
                      </li>
                    </ul>
                  </>

                )
            }

          <NavDropdown
            className="langPadding toggleLangWrapper"
            title={(
              <span>
                <ReactCountryFlag countryCode={countryCode(`${getCurrentLng()}`)} svg />
                {' '}
                {t(`${getCurrentLng()}`)}
              </span>
              )}
            id="basic-nav-dropdown"
          >
            <NavDropdown.Item
              onClick={(event) => {
                toggleMenu();
                changeLanguage('en')
              }}
            >
              <div>
                <ReactCountryFlag countryCode="us" svg />
                {' '}
                {t('en')}
              </div>
            </NavDropdown.Item>
            <NavDropdown.Item
              onClick={(event) => {
                toggleMenu();
                changeLanguage('pt')
              }}
            >
              <div>
                <ReactCountryFlag countryCode="br" svg />
                {' '}
                {t('pt')}
              </div>
            </NavDropdown.Item>
            <NavDropdown.Item
              onClick={(event) => {
                toggleMenu();
                changeLanguage('nl')
              }}
            >
              <div>
                <ReactCountryFlag countryCode="nl" svg />
                {' '}
                {t('nl')}
              </div>
            </NavDropdown.Item>
          </NavDropdown>

        </Navbar.Collapse>
      </Navbar>
    </header>
  )
}

function mapStateToProps(state) {
  return {
    authenticated: state.auth.authenticated,
    user: state.user.data,
    adminPendingWithdrawalsCount: state.adminPendingWithdrawalsCount.data,
    adminPendingIdentityCount: state.adminPendingIdentityCount.data,
    adminPendingDisputeCount: state.adminPendingDisputeCount.data,
  };
}

export default connect(mapStateToProps)(withTranslation()(Header));
