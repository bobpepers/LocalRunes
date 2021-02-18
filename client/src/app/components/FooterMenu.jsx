import React, { useEffect, useRef, useState } from 'react';
import { connect } from 'react-redux';
import ReactGlobe from 'react-globe';
import {
  Grid,
} from '@material-ui/core';
import LanguageIcon from '@material-ui/icons/Language';
import SearchIcon from '@material-ui/icons/Search';
import Globe from 'react-globe.gl';
import * as d3 from 'd3';
import { Link } from 'react-router-dom';
import TwitterIcon from '@material-ui/icons/Twitter';
import FacebookIcon from '@material-ui/icons/Facebook';
import { getRequestRegister } from '../actions/registered';
import runebaseloop from '../assets/images/runebaseloop.gif';
import theme from '../theme';

const FooterMenu = (props) => {
  const { t } = props;
  return (
    <div
      style={{
        width: '100%',
        backgroundColor: '#222222',
        zIndex: '500',
        color: '#ffffff',
      }}
    >
      <Grid container>
        <Grid item xs={4}>
          <p>Trade Cryptocurrencies Locally or Online using secure escrow service. With Low fees & many ways of payment methods for you to complete your Trade Digitally.</p>
          <p>© All rights reserved localrunes.com</p>
        </Grid>
        <Grid item xs={4} className="text-center">
          <h3>About</h3>
          <Link className="nav-link" to="/aboutus">About us</Link>
          <Link className="nav-link" to="/terms">Terms of service</Link>
          <Link className="nav-link" to="/policy">Privacy policy</Link>
        </Grid>
        <Grid item xs={4} className="text-center">
          <h3>Follow us</h3>
          <p>
            <a target="_blank" rel="noreferrer" href="https://www.facebook.com/localrunes">
              <FacebookIcon />
              {' '}
              Facebook
            </a>
          </p>
          <p>
            <a target="_blank" rel="noreferrer" href="https://twitter.com/LocalRunes">
              <TwitterIcon />
              {' '}
              Twitter
            </a>
          </p>

        </Grid>
      </Grid>
    </div>
  )
}

const mapStateToProps = (state) => ({
  registered: state.registered.people,
  online: state.online.people,
})

export default connect(mapStateToProps)(FooterMenu);
