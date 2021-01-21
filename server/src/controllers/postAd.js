// import { parseDomain } from "parse-domain";
import db from '../models';
import { generateRandomStringLowCase } from '../helpers/generateRandomString';
import { validateUrl, parseUrl } from '../helpers/url';

require('dotenv').config();
const metaget = require('metaget');
const BigNumber = require('bignumber.js');

const { Sequelize, Transaction, Op } = require('sequelize');

const countDecimals = function (value) {
  if (Math.floor(value) === value) return 0;
  return value.toString().split(".")[1].length || 0;
};

/**
 * Fetch PriceInfo
 */
export const addPostAd = async (req, res, next) => {
  console.log('12332145687');
  console.log(req.body);
  if (req.body.price % 1 !== 0) {
    if (countDecimals(req.body.runesPrice) > 8) {
      res.locals.error = 'MAX_8_DECIMALS';
      return next();
    }
  }
  if (req.body.price % 1 !== 0) {
    if (countDecimals(req.body.minAmount) > 8) {
      res.locals.error = 'MAX_8_DECIMALS';
      return next();
    }
  }
  if (req.body.price % 1 !== 0) {
    if (countDecimals(req.body.maxAmount) > 8) {
      res.locals.error = 'MAX_8_DECIMALS';
      return next();
    }
  }

  const runesPrice = new BigNumber(req.body.runesPrice).multipliedBy(1e8).toFixed(0);
  const minAmount = new BigNumber(req.body.minAmount).multipliedBy(1e8).toFixed(0);
  const maxAmount = new BigNumber(req.body.maxAmount).multipliedBy(1e8).toFixed(0);

  res.locals.postAd = await db.postAd.create({
    type: req.body.type,
    amount: 0,
    min: minAmount,
    max: maxAmount,
    price: runesPrice,
    currencyId: req.body.currency,
    paymentMethodId: req.body.paymentMethod,
    userId: req.user.id,
    location: req.body.location,
  });
  next();
};

export const fetchPostAd = async (req, res, next) => {
  if (req.body.type === 'buy') {
    res.locals.buy = await db.postAd.findAll({
      where: {
        type: req.body.type,
      },
    });
  }.
  if (req.body.type === 'sell') {
    res.locals.sell = await db.postAd.findAll({
      where: {
        type: req.body.type,
      },
    });
  }

  next();
};
