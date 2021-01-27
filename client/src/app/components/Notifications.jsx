import React, { useEffect, useState } from 'react';
import { connect, useDispatch } from 'react-redux';
import {
  Navbar,
  Nav,
  NavDropdown,
} from 'react-bootstrap';

import { withTranslation } from 'react-i18next';
import Badge from '@material-ui/core/Badge';
import IconButton from '@material-ui/core/IconButton';
import NotificationsIcon from '@material-ui/icons/Notifications';
import {
  fetchTradeData,
} from '../actions/trade';

const Notifications = (props) => {
  const { trade } = props;
  const dispatch = useDispatch();
  useEffect(() => dispatch(fetchTradeData()), [dispatch]);
  useEffect(() => {
    console.log(trade);
  });
  const [open, setOpen] = useState(false);
  const handleClick = (event) => {
    // this.setState({ anchorEl: event.currentTarget, open: Boolean(event.currentTarget) });
  }

  const handleClose = (event) => {
    // this.setState({ anchorEl: event.currentTarget, open: false });
  }

  return (

    <NavDropdown
      className="langPadding toggleLangWrapper"
      title={(
        <IconButton
          aria-label="show notifications"
          color="inherit"
          onClick={handleClick}
        >
          <Badge badgeContent={3} color="secondary">
            <NotificationsIcon />
          </Badge>
        </IconButton>
              )}
      id="basic-nav-dropdown"
    >
      <NavDropdown.Item onClick={handleClose}>
        <div>
          Advertisement #1
        </div>
      </NavDropdown.Item>
      <NavDropdown.Item onClick={handleClose}>
        <div>
          Advertisement #1
        </div>
      </NavDropdown.Item>
      <NavDropdown.Item onClick={handleClose}>
        <div>
          Advertisement #1
        </div>
      </NavDropdown.Item>
    </NavDropdown>

  )
}

function mapStateToProps(state) {
  return {
    trade: state.trade.data,
  };
}

export default connect(mapStateToProps)(withTranslation()(Notifications));
