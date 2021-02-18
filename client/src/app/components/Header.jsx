import React, { Component } from 'react';
import { connect } from 'react-redux';
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
// import 'bootstrap/dist/css/bootstrap.css';

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      menu: false,
      height: 0,
      prevHash: '',
      currentHash: '',
      chainInfo: false,
      anchorEl: null,
      open: false,
    };
    this.toggleMenu = this.toggleMenu.bind(this);
    this.updateHeight = this.updateHeight.bind(this);
    this.detectHashChange = this.detectHashChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.handleClose = this.handleClose.bind(this);
  }

  toggleMenu() {
    this.setState({ menu: !this.state.menu });
  }

  componentDidMount() {
    this.updateHeight();
    window.addEventListener('resize', this.updateHeight);
    window.addEventListener('scroll', this.detectHashChange);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.updateHeight);
    window.removeEventListener('scroll', this.detectHashChange);
  }

  componentDidUpdate() {
    this.updateHeight();
    this.detectHashChange();
  }

  updateHeight() {
    if (this.state.height != this.div.clientHeight) {
      this.setState({ height: this.div.clientHeight });
    }
  }

  handleClick(event) {
    this.setState({ anchorEl: event.currentTarget, open: Boolean(event.currentTarget) });
  }

  handleClose(event) {
    this.setState({ anchorEl: event.currentTarget, open: false });
  }

  detectHashChange() {
    this.state.currentHash = window.location.hash.substring(1);

    if (this.state.currentHash == '') {
      // console.log('sip');

    } else {
      // console.log(this.state.currentHash);
      if (this.state.currentHash !== '' && this.state.currentHash !== this.state.prevHash) {
        this.setState({ currentHash: this.state.currentHash });
        this.state.prevHash = this.state.currentHash;
      }
    }
  }

  render() {
    const show = (this.state.menu) ? 'show' : '';
    const { t, i18n } = this.props;
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
    console.log(this.props.user);
    return (
      <header className="rootRow header" style={{ height: this.state.height }}>
        <Navbar ref={(div) => { this.div = div; }} fixed="top" className="navbar navbar-default" expand="lg">
          <Link to={this.props.authenticated ? '/' : '/'} className="nav-link">LocalRunes.com</Link>
          <button className="navbar-toggler" type="button" onClick={this.toggleMenu}>
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
              this.props.authenticated
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
              this.props.authenticated
                && (
                  <>
                    <li>
                      <Notifications />
                    </li>
                  </>

                )

            }

            </ul>
            <ul>
              {
              this.props.authenticated
                ? (
                  <>

                    <li>
                      <NavDropdown
                        className="langPadding toggleLangWrapper"
                        title={(this.props.user && this.props.user.username)}
                        id="basic-nav-dropdown"
                      >
                        <NavDropdown.Item onClick={this.handleClose}>
                          <div>
                            <Link style={{ color: '#000' }} className="nav-link" to="/wallet">
                              <AccountBalanceWalletIcon />
                              {' '}
                              Wallet
                            </Link>
                          </div>
                        </NavDropdown.Item>
                        <NavDropdown.Item onClick={this.handleClose}>
                          <div>
                            <Link style={{ color: '#000' }} className="nav-link" to="/profile">
                              <AccountCircleIcon />
                              {' '}
                              My Account
                            </Link>
                          </div>
                        </NavDropdown.Item>
                        <NavDropdown.Item onClick={this.handleClose}>
                          <div>
                            <Link style={{ color: '#000' }} className="nav-link" to={`/public_profile/${this.props.user && this.props.user.username}`}>
                              <FaceIcon />
                              {' '}
                              Public Profle
                            </Link>
                          </div>
                        </NavDropdown.Item>
                        <NavDropdown.Item onClick={this.handleClose}>
                          <div>
                            <Link style={{ color: '#000' }} className="nav-link" to="/dashboard">
                              <DashboardIcon />
                              {' '}
                              Dashboard
                            </Link>
                          </div>
                        </NavDropdown.Item>
                        <NavDropdown.Item onClick={this.handleClose}>
                          <div>
                            <Link style={{ color: '#000' }} className="nav-link" to="/settings">
                              <SettingsIcon />
                              {' '}
                              Settings
                            </Link>
                          </div>
                        </NavDropdown.Item>
                        <NavDropdown.Item onClick={this.handleClose}>
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
                  </>

                )
                : (
                  <>
                    <li>
                      <Link className="nav-link" to="/signup">Sign up free</Link>
                    </li>
                    <li>
                      <Link className="nav-link" to="/signin">Sign in</Link>
                    </li>
                  </>

                )
            }

            </ul>
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
              <NavDropdown.Item onClick={(event) => { this.toggleMenu; changeLanguage('en') }}>
                <div>
                  <ReactCountryFlag countryCode="us" svg />
                  {' '}
                  {t('en')}
                </div>
              </NavDropdown.Item>
              <NavDropdown.Item onClick={(event) => { this.toggleMenu; changeLanguage('pt') }}>
                <div>
                  <ReactCountryFlag countryCode="br" svg />
                  {' '}
                  {t('pt')}
                </div>
              </NavDropdown.Item>
              <NavDropdown.Item onClick={(event) => { this.toggleMenu; changeLanguage('nl') }}>
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
}

function mapStateToProps(state) {
  return {
    authenticated: state.auth.authenticated,
    user: state.user.data,
  };
}

export default connect(mapStateToProps)(withTranslation()(Header));
