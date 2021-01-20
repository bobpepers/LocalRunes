// import { parseDomain } from "parse-domain";
import db from '../models';
import { generateRandomStringLowCase } from '../helpers/generateRandomString';
import { validateUrl, parseUrl } from '../helpers/url';

require('dotenv').config();
const metaget = require('metaget');

const { Sequelize, Transaction, Op } = require('sequelize');

/**
 * Fetch PriceInfo
 */
const addPostAd = async (req, res, next) => {
  console.log('12332145687');
  console.log(req.body);
  res.locals.postAd = await db.paymentMethod.findAll({
    where: {
      status: true,
    },
  });
  next();
};

export default addPostAd;
