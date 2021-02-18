// import { parseDomain } from "parse-domain";
import db from '../models';
import { generateRandomStringLowCase } from '../helpers/generateRandomString';
import { validateUrl, parseUrl } from '../helpers/url';

require('dotenv').config();
const metaget = require('metaget');
const BigNumber = require('bignumber.js');

const { Sequelize, Transaction, Op } = require('sequelize');

const countDecimals = function (value) {
  if ((value % 1) !== 0) { return value.toString().split(".")[1].length; }
  return 0;
};

/**
 * Fetch PriceInfo
 */
export const addPostAd = async (req, res, next) => {
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
  if (req.body.minAmount < 100) {
    res.locals.error = 'MIN_AMOUNT_100_RUNES';
    return next();
  }

  if (Number(req.body.minAmount) > Number(req.body.maxAmount)) {
    res.locals.error = 'MIN_AMOUNT_MUST_BE_SMALLER_THEN_MAX';
    return next();
  }
  if (Number(req.body.maxAmount) < Number(req.body.minAmount)) {
    res.locals.error = 'MAX_AMOUNT_MUST_BE_LARGER_THEN_MIN';
    return next();
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
    countryId: req.body.country,
  });
  next();
};

export const fetchPostAd = async (req, res, next) => {
  if (req.body.type === 'buy') {
    res.locals.buy = await db.postAd.findAll({
      where: {
        type: req.body.type,
      },
      include: [
        {
          model: db.user,
          as: 'user',
          required: false,
          attributes: ['username'],
        },
        {
          model: db.paymentMethod,
          as: 'paymentMethod',
          required: false,
        },
        {
          model: db.currency,
          as: 'currency',
          required: false,
        },
        {
          model: db.country,
          as: 'country',
          required: false,
        },
      ],
    });
  }
  if (req.body.type === 'sell') {
    res.locals.sell = await db.postAd.findAll({
      where: {
        type: req.body.type,
      },
      include: [
        {
          model: db.user,
          as: 'user',
          required: false,
          attributes: ['username'],
        },
        {
          model: db.paymentMethod,
          as: 'paymentMethod',
          required: false,
        },
        {
          model: db.currency,
          as: 'currency',
          required: false,
        },
        {
          model: db.country,
          as: 'country',
          required: false,
        },
      ],
    });
  }

  next();
};

export const fetchMyPostAd = async (req, res, next) => {
  res.locals.ads = await db.postAd.findAll({
    where: {
      userId: req.user.id,
    },
    include: [
      {
        model: db.user,
        as: 'user',
        required: false,
        attributes: ['username'],
      },
      {
        model: db.paymentMethod,
        as: 'paymentMethod',
        required: false,
      },
      {
        model: db.currency,
        as: 'currency',
        required: false,
      },
      {
        model: db.country,
        as: 'country',
        required: false,
      },
    ],
  });
  next();
};
