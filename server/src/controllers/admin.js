import nodemailer from 'nodemailer';
import axios from 'axios';
import db from '../models';

const { Sequelize, Transaction, Op } = require('sequelize');
const { getInstance } = require('../services/rclient');

require('dotenv').config();

const transporter = nodemailer.createTransport({
  host: process.env.MAIL_HOST,
  port: process.env.MAIL_PORT,
  secure: false, // use SSL
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS,
  },
  tls: {
    requireTLS: true,
  },
});

/**
 * isAdmin
 */
export const isAdmin = async (req, res, next) => {
  if (req.user.role !== 4) {
    console.log('unauthorized');
    res.status(401).send({
      error: 'Unauthorized',
    });
  } else {
    next();
  }
};

/**
 * Fetch admin withdrawals
 */
export const fetchAdminWithdrawals = async (req, res, next) => {
  console.log('fetchAdminWithdrawals');
  try {
    res.locals.withdrawals = await db.transaction.findAll({
      order: [['createdAt', 'DESC']],
      include: [{
        model: db.address,
        as: 'address',
        include: [{
          model: db.wallet,
          as: 'wallet',
          include: [{
            model: db.user,
            as: 'user',
          }],
        }],
      }],
      where: {
        type: 'send',
      },
    });
    console.log(res.locals.withdrawals);
    next();
  } catch (error) {
    res.locals.error = error;
    next();
  }
};

export const fetchAdminPendingWithdrawalsCount = async (req, res, next) => {
  try {
    const transactionCount = await db.transaction.count({
      where: {
        type: 'send',
        phase: 'review',
      },
    });
    res.locals.count = transactionCount;
    console.log('transactionCOunt');
    console.log(transactionCount);
    if (!transactionCount) {
      res.locals.count = '0';
    }
    console.log(res.locals.count);
    next();
  } catch (error) {
    res.locals.error = error;
    next();
  }
};

export const fetchAdminPendingDisputeCount = async (req, res, next) => {
  try {
    const disputeCount = await db.dispute.count({
      where: {
        done: 'false',
      },
    });
    res.locals.count = disputeCount;
    console.log('disputeCount');
    console.log(disputeCount);
    if (!disputeCount) {
      res.locals.count = '0';
    }
    console.log(res.locals.count);
    next();
  } catch (error) {
    res.locals.error = error;
    next();
  }
};

export const fetchAdminPendingIdentityCount = async (req, res, next) => {
  try {
    const userCount = await db.user.count({
      where: {
        identityVerified: 'pending',
      },
    });
    res.locals.count = userCount;
    console.log('userCOunt');
    console.log(userCount);
    if (!userCount) {
      res.locals.count = '0';
    }
    console.log(res.locals.count);
    next();
  } catch (error) {
    res.locals.error = error;
    next();
  }
};
export const fetchAdminCurrentTrade = async (req, res, next) => {
  console.log(req.body.id);
  const trade = await db.trade.findOne({
    where: {
      id: req.body.id,
    },
    include: [
      {
        model: db.messages,
        as: 'messages',
        required: false,
        // attributes: ['username'],
        include: [
          {
            model: db.user,
            as: 'user',
            required: true,
            attributes: ['username'],
          },
        ],
      },
      {
        model: db.user,
        as: 'user',
        required: true,
        attributes: ['username'],
      },
      {
        model: db.postAd,
        as: 'postAd',
        required: true,
        // attributes: ['username'],
        include: [
          {
            model: db.paymentMethod,
            as: 'paymentMethod',
            required: true,
            // attributes: ['username'],
          },
          {
            model: db.currency,
            as: 'currency',
            required: true,
            // attributes: ['username'],
          },
          {
            model: db.user,
            as: 'user',
            required: true,
            attributes: ['username'],
          },
        ],
      },
    ],
  });
  if (trade) {
    res.locals.trade = trade;
    return next();
  }
  res.locals.error = "TRADE_NOT_FOUND";
  next();
};

export const fetchAdminPendingDisputes = async (req, res, next) => {
  console.log('fetchAdminDisputesPending');
  console.log('fetchAdminDisputesPending');
  console.log('fetchAdminDisputesPending');
  console.log('fetchAdminDisputesPending');
  console.log('fetchAdminDisputesPending');
  console.log('fetchAdminDisputesPending');
  console.log('fetchAdminDisputesPending');
  console.log('fetchAdminDisputesPending');
  console.log('fetchAdminDisputesPending');
  console.log('fetchAdminDisputesPending');
  console.log('fetchAdminDisputesPending');
  console.log('fetchAdminDisputesPending');
  console.log('fetchAdminDisputesPending');
  console.log('fetchAdminDisputesPending');
  console.log('fetchAdminDisputesPending');
  console.log('fetchAdminDisputesPending');
  console.log('fetchAdminDisputesPending');
  console.log('fetchAdminDisputesPending');
  console.log('fetchAdminDisputesPending');
  console.log('fetchAdminDisputesPending');
  console.log('fetchAdminDisputesPending');
  console.log('fetchAdminDisputesPending');
  console.log('fetchAdminDisputesPending');
  console.log('fetchAdminDisputesPending');
  console.log('fetchAdminDisputesPending');

  try {
    res.locals.disputes = await db.dispute.findAll({
      order: [['id', 'DESC']],
      where: {
        done: false,
      },
      include: [
        {
          model: db.user,
          as: 'initiator',
          required: false,
          attributes: [
            'username',
          ],
        },
        {
          model: db.user,
          as: 'releasedTo',
          required: false,
          attributes: [
            'username',
          ],
        },
        {
          model: db.trade,
          as: 'trade',
          required: true,
          include: [
            {
              model: db.user,
              as: 'user',
              attributes: [
                'username',
              ],
            },
            {
              model: db.postAd,
              as: 'postAd',
              include: [{
                model: db.user,
                as: 'user',
                attributes: [
                  'username',
                ],
              }],
            },
          ],
        }],
    });
    console.log(res.locals.disputes);
    console.log("res.locals.disputes");
    console.log("res.locals.disputes");
    console.log("res.locals.disputes");
    console.log("res.locals.disputes");
    console.log("res.locals.disputes");
    console.log("res.locals.disputes");
    console.log("res.locals.disputes");
    console.log("res.locals.disputes");
    console.log("res.locals.disputes");
    console.log("res.locals.disputes");
    console.log("res.locals.disputes");

    next();
  } catch (error) {
    res.locals.error = error;
    next();
  }
};

export const fetchAdminPendingWithdrawals = async (req, res, next) => {
  console.log('fetchAdminWithdrawals');
  try {
    res.locals.withdrawals = await db.transaction.findAll({
      order: [['id', 'DESC']],
      where: {
        type: 'send',
        phase: 'review',
      },
      include: [{
        model: db.address,
        as: 'address',
        include: [{
          model: db.wallet,
          as: 'wallet',
          include: [{
            model: db.user,
            as: 'user',
            attributes: [
              'username',
            ],
          }],
        }],
      }],
    });
    console.log(res.locals.withdrawals);
    next();
  } catch (error) {
    res.locals.error = error;
    next();
  }
};

export const fetchAdminPendingIdentity = async (req, res, next) => {
  try {
    res.locals.users = await db.user.findAll({
      // order: [['id', 'DESC']],
      where: {
        identityVerified: 'pending',
      },
      attributes: [
        'id',
        'username',
        'email',
        'banned',
        'firstname',
        'lastname',
        'phoneNumber',
        'identityFront',
        'identityBack',
        'identitySelfie',
        'identityVerified',
      ],

    });
    console.log('after find all');
    console.log(res.locals.users);
    next();
  } catch (error) {
    console.log(error);
    res.locals.error = error;
    next();
  }
};

/**
 * Fetch admin withdrawals
 */
export const fetchAdminUserList = async (req, res, next) => {
  try {
    res.locals.userlist = await db.user.findAll({
      order: [['id', 'DESC']],
      attributes: ['id', 'username', 'email', 'banned'],
      include: [{
        model: db.wallet,
        as: 'wallet',
        include: [{
          model: db.address,
          as: 'addresses',
        }],
      }],
    });
    console.log('after find all');
    console.log(res.locals.userlist);
    next();
  } catch (error) {
    console.log(error);
    res.locals.error = error;
    next();
  }
};

/**
 * Fetch admin withdrawals
 */
export const fetchAdminUser = async (req, res, next) => {
  try {
    res.locals.user = await db.user.findOne({
      where: {
        id: req.body.id,
      },
      attributes: ['id', 'username', 'email', 'banned'],
      include: [
        {
          model: db.wallet,
          as: 'wallet',
          include: [{
            model: db.address,
            as: 'addresses',
          }],
        },
        {
          model: db.activity,
          // required: false,
          as: 'spender',
        },
        {
          model: db.activity,
          // required: false,
          as: 'earner',
        },
        // {
        //  model: db.activityArchive,
        // required: false,
        //  as: 'archivedSpender',
        // },
        // {
        //  model: db.activityArchive,
        // required: false,
        //  as: 'archivedEarner',
        // },
        // {
        //  model: db.webslot,
        //  as: 'webslots',
        //  required: false,
        //  include: [
        //    {
        //      model: db.order,
        //      as: 'order',
        //      required: false,
        //    },
        //    {
        //      model: db.domain,
        //      as: 'domain',
        //      required: false,
        //    },
        //  ],
        // },
      ],
    });
    next();
  } catch (error) {
    console.log(error);
    res.locals.error = error;
    next();
  }
};

/**
 * isAdmin
 */
export const acceptWithdraw = async (req, res, next) => {
  await db.sequelize.transaction({
    isolationLevel: Transaction.ISOLATION_LEVELS.SERIALIZABLE,
  }, async (t) => {
    const transaction = await db.transaction.findOne({
      where: {
        id: req.body.id,
        phase: 'review',
      },
      include: [
        {
          model: db.address,
          as: 'address',
          include: [
            {
              model: db.wallet,
              as: 'wallet',
              include: [{
                model: db.user,
                as: 'user',
              }],
            },
          ],
        },
      ],
      transaction: t,
      lock: t.LOCK.UPDATE,
    });
    if (!transaction) {
      throw new Error('TRANSACTION_NOT_EXIST');
    }
    const amount = (((transaction.amount / 100) * 99) / 1e8);
    console.log((amount.toFixed(8)).toString());
    console.log('before reps');
    const response = await getInstance().sendToAddress(transaction.to_from, (amount.toFixed(8)).toString());
    console.log('999999999999');
    console.log('999999999999');
    console.log('999999999999');
    console.log('999999999999');
    console.log('999999999999');
    console.log('999999999999');
    console.log('999999999999');
    console.log('999999999999');
    console.log('999999999999');
    console.log('999999999999');
    console.log(amount);
    console.log(response);
    res.locals.transaction = await transaction.update(
      {
        txid: response,
        phase: 'confirming',
      },
      {
        transaction: t,
        lock: t.LOCK.UPDATE,
      },
    );
    const activity = await db.activity.create(
      {
        spenderId: transaction.address.wallet.userId,
        type: 'withdrawAccepted',
        txId: transaction.id,
      },
      {
        transaction: t,
        lock: t.LOCK.UPDATE,
      },
    );
    res.locals.activity = await db.activity.findOne({
      where: {
        id: activity.id,
      },
      attributes: [
        'createdAt',
        'type',
      ],
      include: [
        {
          model: db.user,
          as: 'spender',
          required: false,
          attributes: ['username'],
        },
      ],
      transaction: t,
      lock: t.LOCK.UPDATE,
    });
    t.afterCommit(() => {
      console.log('complete');
      next();
    });
  }).catch((err) => {
    res.locals.error = err.message;
    next();
  });
};

/**
 * isAdmin
 */
export const rejectWithdraw = async (req, res, next) => {
  await db.sequelize.transaction({
    isolationLevel: Transaction.ISOLATION_LEVELS.SERIALIZABLE,
  }, async (t) => {
    const transaction = await db.transaction.findOne({
      where: {
        id: req.body.id,
        phase: 'review',
      },
      include: [{
        model: db.address,
        as: 'address',
        include: [{
          model: db.wallet,
          as: 'wallet',
          include: [{
            model: db.user,
            as: 'user',
          }],
        }],
      }],
      transaction: t,
      lock: t.LOCK.UPDATE,
    });

    if (!transaction) {
      throw new Error('TRANSACTION_NOT_EXIST');
    }

    const wallet = await db.wallet.findOne({
      where: {
        userId: transaction.address.wallet.userId,
      },
      transaction: t,
      lock: t.LOCK.UPDATE,
    });

    if (!wallet) {
      throw new Error('WALLET_NOT_EXIST');
    }

    const updatedWallet = await wallet.update({
      available: wallet.available + transaction.amount,
      locked: wallet.locked - transaction.amount,
    }, {
      transaction: t,
      lock: t.LOCK.UPDATE,
    });

    res.locals.transaction = await transaction.update(
      {
        phase: 'rejected',
      },
      {
        transaction: t,
        lock: t.LOCK.UPDATE,
      },
    );

    const activity = await db.activity.create(
      {
        spenderId: transaction.address.wallet.userId,
        type: 'withdrawRejected',
        txId: res.locals.transaction.id,
      },
      {
        transaction: t,
        lock: t.LOCK.UPDATE,
      },
    );
    res.locals.activity = await db.activity.findOne({
      where: {
        id: activity.id,
      },
      attributes: [
        'createdAt',
        'type',
      ],
      include: [
        {
          model: db.user,
          as: 'spender',
          required: false,
          attributes: ['username'],
        },
      ],
      transaction: t,
      lock: t.LOCK.UPDATE,
    });

    t.afterCommit(() => {
      console.log('Withdrawal Rejected');
      next();
    });
  }).catch((err) => {
    res.locals.error = err.message;
    next();
  });
  console.log(req.body.id);
};

/**
 * Fetch admin publishers
 */
export const fetchAdminPublishers = async (req, res, next) => {
  try {
    res.locals.publishers = await db.publisher.findAll({
      include: [
        {
          model: db.domain,
          // required: false,
          as: 'domain',
        },
      ],
    });
    next();
  } catch (error) {
    console.log(error);
    res.locals.error = error;
    next();
  }
};

/**
 * Fetch admin publishers
 */
export const fetchAdminReviewPublishers = async (req, res, next) => {
  try {
    res.locals.publishers = await db.publisher.findAll({
      where: {
        verified: true,
        review: 'pending',
      },
      include: [
        {
          model: db.domain,
          // required: false,
          as: 'domain',
        },
      ],
    });
    next();
  } catch (error) {
    console.log(error);
    res.locals.error = error;
    next();
  }
};

/**
 * Fetch admin publishers
 */
export const fetchAdminBanners = async (req, res, next) => {
  try {
    res.locals.banners = await db.banner.findAll({
      include: [
        {
          model: db.domain,
          // required: false,
          as: 'domain',
        },
        {
          model: db.user,
          // required: false,
          as: 'user',
        },
      ],
    });
    next();
  } catch (error) {
    console.log(error);
    res.locals.error = error;
    next();
  }
};

export const fetchAdminReviewBanners = async (req, res, next) => {
  try {
    res.locals.banners = await db.banner.findAll({
      where: {
        review: 'pending',
      },
      include: [
        {
          model: db.domain,
          // required: false,
          as: 'domain',
        },
        {
          model: db.user,
          // required: false,
          as: 'user',
        },
      ],
    });
    next();
  } catch (error) {
    console.log(error);
    res.locals.error = error;
    next();
  }
};

export const acceptAdminPendingIdentity = async (req, res, next) => {
  try {
    const user = await db.user.findOne({
      where: {
        id: req.body.id,
      },
    });
    res.locals.identity = await user.update({
      identityVerified: 'accepted',
    });
    next();
  } catch (error) {
    console.log(error);
    res.locals.error = error;
    next();
  }
};

export const rejectAdminPendingIdentity = async (req, res, next) => {
  try {
    const user = await db.user.findOne({
      where: {
        id: req.body.id,
      },
    });
    res.locals.identity = await user.update({
      identityVerified: 'rejected',
    });
    next();
  } catch (error) {
    console.log(error);
    res.locals.error = error;
    next();
  }
};

export const acceptAdminReviewBanner = async (req, res, next) => {
  try {
    const banner = await db.banner.findOne({
      where: {
        id: req.body.id,
      },
    });
    res.locals.banners = await banner.update({
      review: 'accepted',
    });
    next();
  } catch (error) {
    console.log(error);
    res.locals.error = error;
    next();
  }
};

export const rejectAdminReviewBanner = async (req, res, next) => {
  try {
    console.log(req.body);
    console.log('req body');
    const banner = await db.banner.findOne({
      where: {
        id: req.body.id,
      },
    });
    res.locals.banners = await banner.update({
      review: 'rejected',
    });
    next();
  } catch (error) {
    console.log(error);
    res.locals.error = error;
    next();
  }
};

export const banAdminBanner = async (req, res, next) => {
  try {
    console.log(req.body);
    console.log('req body');
    const banner = await db.banner.findOne({
      where: {
        id: req.body.id,
      },
      include: [
        {
          model: db.domain,
          // required: false,
          as: 'domain',
        },
      ],
    });
    res.locals.banners = await banner.update({
      banned: !banner.banned,
    });
    next();
  } catch (error) {
    console.log(error);
    res.locals.error = error;
    next();
  }
};

export const banAdminPublisher = async (req, res, next) => {
  try {
    console.log(req.body);
    console.log('req body');
    const publisher = await db.publisher.findOne({
      where: {
        id: req.body.id,
      },
      include: [
        {
          model: db.domain,
          // required: false,
          as: 'domain',
        },
      ],
    });
    res.locals.publishers = await publisher.update({
      banned: !publisher.banned,
    });
    next();
  } catch (error) {
    console.log(error);
    res.locals.error = error;
    next();
  }
};

export const banAdminUser = async (req, res, next) => {
  try {
    console.log(req.body);
    console.log('req body');
    const user = await db.user.findOne({
      where: {
        id: req.body.id,
      },
      include: [{
        model: db.wallet,
        as: 'wallet',
        include: [{
          model: db.address,
          as: 'addresses',
        }],
      }],
    });
    res.locals.users = await user.update({
      banned: !user.banned,
    });
    next();
  } catch (error) {
    console.log(error);
    res.locals.error = error;
    next();
  }
};

export const banAdminDomain = async (req, res, next) => {
  try {
    console.log(req.body);
    console.log('req body');
    const domain = await db.domain.findOne({
      where: {
        id: req.body.id,
      },
    });
    res.locals.domains = await domain.update({
      banned: !domain.banned,
    });
    next();
  } catch (error) {
    console.log(error);
    res.locals.error = error;
    next();
  }
};

export const fetchAdminDomains = async (req, res, next) => {
  try {
    console.log(req.body);
    console.log('req body');
    res.locals.domains = await db.domain.findAll({});
    next();
  } catch (error) {
    console.log(error);
    res.locals.error = error;
    next();
  }
};

export const fetchAdminCountries = async (req, res, next) => {
  try {
    res.locals.countries = await db.country.findAll({
      include: [
        {
          model: db.currency,
          as: 'currency',
          required: false,
        },
      ],
    });
    next();
  } catch (error) {
    console.log(error);
    res.locals.error = error;
    next();
  }
};
export const fetchAdminDeposits = async (req, res, next) => {
  try {
    res.locals.deposits = await db.transaction.findAll({
      where: {
        type: 'receive',
      },
      order: [
        ['id', 'DESC'],
      ],
      include: [
        {
          model: db.address,
          as: 'address',
          required: false,
          include: [
            {
              model: db.wallet,
              as: 'wallet',
              required: false,
              include: [
                {
                  model: db.user,
                  as: 'user',
                  required: false,
                  attributes: ['username'],
                },
              ],
            },
          ],
        },
      ],
    });

    next();
  } catch (error) {
    console.log(error);
    res.locals.error = error;
    next();
  }
};

export const fetchAdminTrades = async (req, res, next) => {
  try {
    res.locals.trades = await db.trade.findAll({
      order: [
        ['id', 'DESC'],
      ],
      include: [
        {
          model: db.user,
          as: 'user',
          required: true,
          attributes: ['username'],
        },
        {
          model: db.postAd,
          as: 'postAd',
          required: true,
          // attributes: ['username'],
          include: [
            {
              model: db.currency,
              as: 'currency',
              required: true,
              // attributes: ['username'],
            },
            {
              model: db.paymentMethod,
              as: 'paymentMethod',
              required: true,
              // attributes: ['username'],
            },
            {
              model: db.user,
              as: 'user',
              required: true,
              attributes: ['username'],
            },
          ],
        },
      ],
    });

    next();
  } catch (error) {
    console.log(error);
    res.locals.error = error;
    next();
  }
};

export const addAdminCountries = async (req, res, next) => {
  try {
    const country = await db.country.create({
      iso: req.body.iso,
      name: req.body.country,
      currencyId: req.body.currency,
      status: true,
    });
    res.locals.country = await db.country.findOne({
      where: {
        id: country.id,
      },
      include: [
        {
          model: db.currency,
          as: 'currency',
          required: false,
        },
      ],
    });
    next();
  } catch (error) {
    console.log(error);
    res.locals.error = error;
    next();
  }
};

export const fetchAdminCurrencies = async (req, res, next) => {
  try {
    res.locals.currencies = await db.currency.findAll({});
    next();
  } catch (error) {
    console.log(error);
    res.locals.error = error;
    next();
  }
};

export const addAdminCurrencies = async (req, res, next) => {
  try {
    res.locals.currencies = await db.currency.create({
      currency_name: req.body.name,
    });
    next();
  } catch (error) {
    console.log(error);
    res.locals.error = error;
    next();
  }
};

export const fetchAdminPaymentMethod = async (req, res, next) => {
  try {
    res.locals.paymentMethod = await db.paymentMethod.findAll({});
    next();
  } catch (error) {
    console.log(error);
    res.locals.error = error;
    next();
  }
};

export const fetchAdminMargin = async (req, res, next) => {
  try {
    const margin = await db.priceMargin.findAll({
      limit: 1,
      order: [['createdAt', 'DESC']],
    });
    console.log('margin');
    console.log('margin');
    console.log('margin');
    console.log('margin');
    console.log('margin');
    console.log('margin');
    console.log('margin');
    console.log('margin');
    console.log('margin');

    console.log(margin);

    if (!margin || !margin.length) {
      res.locals.margin = await db.priceMargin.create({
        margin: 0,
      });
      return next();
    }

    res.locals.margin = margin;
    next();
  } catch (error) {
    console.log(error);
    res.locals.error = error;
    next();
  }
};

export const addAdminPaymentMethod = async (req, res, next) => {
  try {
    res.locals.paymentMethod = await db.paymentMethod.create({
      name: req.body.name,
      description: req.body.description,
      status: true,
    });
    next();
  } catch (error) {
    console.log(error);
    res.locals.error = error;
    next();
  }
};

export const updateAdminCountry = async (req, res, next) => {
  try {
    const country = await db.country.findOne({
      where: {
        id: req.body.id,
      },
    });
    if (!country) {
      throw new Error('CURRENCY_NOT_EXIST');
    }
    await country.update({
      name: req.body.name,
      iso: req.body.iso,
      currencyId: req.body.currency,
    });
    res.locals.country = await db.country.findOne({
      where: {
        id: req.body.id,
      },
      include: [
        {
          model: db.currency,
          as: 'currency',
          required: false,
        },
      ],
    });
    console.log(req.body);
    next();
  } catch (error) {
    console.log(error);
    res.locals.error = error;
    next();
  }
};

export const updateAdminCurrency = async (req, res, next) => {
  try {
    const currency = await db.currency.findOne({
      where: {
        id: req.body.id,
      },
    });
    if (!currency) {
      throw new Error('CURRENCY_NOT_EXIST');
    }
    res.locals.currency = await currency.update({
      currency_name: req.body.name,
      iso: req.body.iso,
    });
    console.log(req.body);
    next();
  } catch (error) {
    console.log(error);
    res.locals.error = error;
    next();
  }
};

export const updateAdminMargin = async (req, res, next) => {
  console.log('req.body.margin');
  console.log('req.body.margin');
  console.log('req.body.margin');
  console.log('req.body.margin');
  console.log('req.body.margin');
  console.log('req.body.margin');
  console.log('req.body.margin');
  console.log('req.body.margin');
  console.log('req.body.margin');
  console.log('req.body.margin');
  console.log('req.body.margin');
  console.log('req.body.margin');
  console.log('req.body.margin');
  console.log('req.body.margin');
  console.log('req.body.margin');
  console.log('req.body.margin');
  console.log('req.body.margin');
  console.log('req.body.margin');
  console.log('req.body.margin');
  console.log('req.body.margin');
  console.log(req.body.margin);

  if (req.body.margin < 0) {
    throw new Error('MARGIN_MUST_BE_GREATER_THEN_ZERO');
  }
  if (req.body.margin > 100) {
    throw new Error('MARGIN_MUST_BE_LESS_THEN_HUNDERD');
  }

  try {
    const margin = await db.priceMargin.create({
      value: req.body.margin,
    });
    if (!margin) {
      throw new Error('CURRENCY_NOT_EXIST');
    }

    res.locals.margin = margin;
    console.log(req.body);
    next();
  } catch (error) {
    console.log(error);
    res.locals.error = error;
    next();
  }
};

export const adminCompleteDispute = async (req, res, next) => {
  await db.sequelize.transaction({
    isolationLevel: Transaction.ISOLATION_LEVELS.SERIALIZABLE,
  }, async (t) => {
    console.log('Finish the dispute here');
    const trade = await db.trade.findOne({
      where: {
        id: req.body.id,
        type: 'disputed',
      },
      include: [
        {
          model: db.dispute,
          as: 'dispute',
          required: false,
          include: [
            {
              model: db.user,
              as: 'initiator',
              required: true,
              attributes: ['username'],
            },
          ],
          // attributes: ['username'],
        },
        {
          model: db.messages,
          as: 'messages',
          required: false,
          // attributes: ['username'],
          include: [
            {
              model: db.user,
              as: 'user',
              required: true,
              attributes: ['username'],
            },
          ],
        },
        {
          model: db.user,
          as: 'user',
          required: true,
          attributes: ['username'],
        },
        {
          model: db.postAd,
          as: 'postAd',
          required: true,
          // attributes: ['username'],
          include: [
            {
              model: db.paymentMethod,
              as: 'paymentMethod',
              required: true,
              // attributes: ['username'],
            },
            {
              model: db.currency,
              as: 'currency',
              required: true,
              // attributes: ['username'],
            },
            {
              model: db.user,
              as: 'user',
              required: true,
              attributes: ['username'],
            },
          ],
        },
      ],
      transaction: t,
      lock: t.LOCK.UPDATE,
    });
    if (!trade) {
      throw new Error('TRADE_NOT_EXIST');
    }

    console.log('1');

    const dispute = await db.dispute.findOne({
      where: {
        id: trade.dispute[0].id,
      },
      transaction: t,
      lock: t.LOCK.UPDATE,
    });
    if (!dispute) {
      throw new Error('DISPUTE_NOT_FOUND');
    }
    console.log('2');
    if (req.body.side === "trader") {
      if (trade.postAd.type === 'sell') {
        const walletOne = await db.wallet.findOne({
          where: {
            userId: trade.userId,
          },
          transaction: t,
          lock: t.LOCK.UPDATE,
        });
        const walletTwo = await db.wallet.findOne({
          where: {
            userId: trade.postAd.userId,
          },
          transaction: t,
          lock: t.LOCK.UPDATE,
        });
        if (walletTwo.locked < (trade.amount)) {
          throw new Error('INSUFFICIENT_LOCKED_BALANCE_ADVERTISER');
        }
        res.locals.walletUserTwo = await walletTwo.update({
          locked: walletTwo.locked - trade.amount,
        }, {
          transaction: t,
          lock: t.LOCK.UPDATE,
        });
        res.locals.walletUserOne = await walletOne.update({
          available: walletOne.available + trade.amount,
        }, {
          transaction: t,
          lock: t.LOCK.UPDATE,
        });

        await trade.update({
          type: 'disputedDone',
        }, {
          transaction: t,
          lock: t.LOCK.UPDATE,
        });
        await dispute.update({
          done: true,
          conclusion: req.body.conclusion,
          releasedTo: trade.userId,
        }, {
          transaction: t,
          lock: t.LOCK.UPDATE,
        });
      }
      if (trade.postAd.type === 'buy') {
        console.log(trade.postAd.user.username);
        const walletOne = await db.wallet.findOne({
          where: {
            userId: trade.userId,
          },
          transaction: t,
          lock: t.LOCK.UPDATE,
        });
        res.locals.walletUserTwo = await db.wallet.findOne({
          where: {
            userId: trade.postAd.userId,
          },
          transaction: t,
          lock: t.LOCK.UPDATE,
        });
        if (walletOne.locked < (trade.amount)) {
          throw new Error(`INSUFFICIENT_LOCKED_BALANCE_TRADER: ${walletOne.locked / 1e8}`);
        }
        res.locals.walletUserOne = await walletOne.update({
          locked: walletOne.locked - trade.amount,
          available: walletOne.available + trade.amount,
        }, {
          transaction: t,
          lock: t.LOCK.UPDATE,
        });

        await trade.update({
          type: 'disputedDone',
        }, {
          transaction: t,
          lock: t.LOCK.UPDATE,
        });
        await dispute.update({
          done: true,
          conclusion: req.body.conclusion,
          releasedTo: trade.userId,
        }, {
          transaction: t,
          lock: t.LOCK.UPDATE,
        });
      }
    }
    if (req.body.side === "advertiser") {
      if (trade.postAd.type === 'sell') {
        res.locals.walletUserOne = await db.wallet.findOne({
          where: {
            userId: trade.userId,
          },
          transaction: t,
          lock: t.LOCK.UPDATE,
        });
        const walletTwo = await db.wallet.findOne({
          where: {
            userId: trade.postAd.userId,
          },
          transaction: t,
          lock: t.LOCK.UPDATE,
        });
        if (walletTwo.locked < (trade.amount)) {
          throw new Error('INSUFFICIENT_LOCKED_BALANCE_ADVERTISER');
        }
        res.locals.walletUserTwo = await walletTwo.update({
          locked: walletTwo.locked - trade.amount,
          available: walletTwo.available + trade.amount,
        }, {
          transaction: t,
          lock: t.LOCK.UPDATE,
        });

        await trade.update({
          type: 'disputedDone',
        }, {
          transaction: t,
          lock: t.LOCK.UPDATE,
        });
        await dispute.update({
          done: true,
          conclusion: req.body.conclusion,
          releasedTo: trade.postAd.userId,
        }, {
          transaction: t,
          lock: t.LOCK.UPDATE,
        });
      }
      if (trade.postAd.type === 'buy') {
        console.log(trade.postAd.user.username);
        const walletOne = await db.wallet.findOne({
          where: {
            userId: trade.userId,
          },
          transaction: t,
          lock: t.LOCK.UPDATE,
        });
        const walletTwo = await db.wallet.findOne({
          where: {
            userId: trade.postAd.userId,
          },
          transaction: t,
          lock: t.LOCK.UPDATE,
        });
        if (walletOne.locked < (trade.amount)) {
          throw new Error(`INSUFFICIENT_LOCKED_BALANCE_TRADER: ${walletOne.locked / 1e8}`);
        }
        res.locals.walletUserTwo = await walletTwo.update({
          available: walletTwo.available + trade.amount,
        }, {
          transaction: t,
          lock: t.LOCK.UPDATE,
        });
        res.locals.walletUserOne = await walletOne.update({
          locked: walletOne.locked - trade.amount,
        }, {
          transaction: t,
          lock: t.LOCK.UPDATE,
        });

        await trade.update({
          type: 'disputedDone',
        }, {
          transaction: t,
          lock: t.LOCK.UPDATE,
        });
        await dispute.update({
          done: true,
          conclusion: req.body.conclusion,
          releasedTo: trade.postAd.userId,
        }, {
          transaction: t,
          lock: t.LOCK.UPDATE,
        });
      }
    }

    res.locals.trade = await db.trade.findOne({
      where: {
        id: req.body.id,
      },
      include: [
        {
          model: db.dispute,
          as: 'dispute',
          required: false,
          include: [
            {
              model: db.messagesDispute,
              as: 'messagesDispute',
              required: false,
              // attributes: ['username'],
              include: [
                {
                  model: db.user,
                  as: 'user',
                  required: false,
                  attributes: ['username'],
                },
              ],
            },
            {
              model: db.user,
              as: 'initiator',
              required: true,
              attributes: ['username'],
            },
          ],
          // attributes: ['username'],
        },
        {
          model: db.messages,
          as: 'messages',
          required: false,
          // attributes: ['username'],
          include: [
            {
              model: db.user,
              as: 'user',
              required: true,
              attributes: ['username'],
            },
          ],
        },
        {
          model: db.user,
          as: 'user',
          required: true,
          attributes: ['username'],
        },
        {
          model: db.postAd,
          as: 'postAd',
          required: true,
          // attributes: ['username'],
          include: [
            {
              model: db.paymentMethod,
              as: 'paymentMethod',
              required: true,
              // attributes: ['username'],
            },
            {
              model: db.currency,
              as: 'currency',
              required: true,
              // attributes: ['username'],
            },
            {
              model: db.user,
              as: 'user',
              required: true,
              attributes: ['username'],
            },
          ],
        },
      ],
      transaction: t,
      lock: t.LOCK.UPDATE,
    });

    console.log(res.locals.trade);
    console.log('TRADE AFTER DISPUTE SETTLED');

    if (!res.locals.trade) {
      throw new Error('TRADE_NOT_EXIST');
    }

    t.afterCommit(() => {
      next();
    });
  }).catch((err) => {
    res.locals.error = err.message;
    next();
  });
};

function replaceAll(string, search, replace) {
  return string.split(search).join(replace);
}

export const sendAdminMassMail = async (req, res, next) => {
  console.log('start sendadminmail');
  await db.sequelize.transaction({
    isolationLevel: Transaction.ISOLATION_LEVELS.SERIALIZABLE,
  }, async (t) => {
    console.log('start sendadminmail');
    const users = await db.user.findAll({
      where: {
        authused: true,
      },
      include: [{
        model: db.country,
        as: 'country',
        required: false,
        include: [
          {
            model: db.currency,
            as: 'currency',
            required: false,
          },
        ],
      }],
    });

    const dataOne = await axios.get("https://api.coinpaprika.com/v1/tickers/runes-runebase");
    const dataTwo = await axios.get("https://api.coinpaprika.com/v1/coins/runes-runebase/ohlcv/today");
    const markets = await axios.get("https://api.coinpaprika.com/v1/coins/runes-runebase/markets");

    const openExchangeOptions = {
      method: 'GET',
      url: 'https://openexchangerates.org/api/latest.json?app_id=7fe614bf9a0f4d8cb7dd72a468a9ef59&show_alternative=1',
    };

    const currencyCoversion = await axios.request(openExchangeOptions);
    console.log(currencyCoversion);
    console.log(dataTwo);
    console.log(dataOne);

    const changePercentColor = dataOne.data.quotes.USD.percent_change_24h > 0 ? 'green' : 'red';
    const changePercentUniCode = dataOne.data.quotes.USD.percent_change_24h > 0 ? '&#9650;' : '&#9660;';

    users.forEach(async (user) => {
      let price;
      let low;
      let high;
      let open;
      if (user.country.currency.iso !== 'USD') {
        price = (Number(dataOne.data.quotes.USD.price) * Number(currencyCoversion.data.rates[user.country.currency.iso])).toFixed(8).toString();
        low = (Number(dataTwo.data[0].low) * Number(currencyCoversion.data.rates[user.country.currency.iso])).toFixed(8).toString();
        high = (Number(dataTwo.data[0].high) * Number(currencyCoversion.data.rates[user.country.currency.iso])).toFixed(8).toString();
        open = (Number(dataTwo.data[0].open) * Number(currencyCoversion.data.rates[user.country.currency.iso])).toFixed(8).toString();
      } else {
        price = dataOne.data[0].quotes.USD.price.toFixed(8).toString();
        low = dataTwo.data[0].low.toFixed(8).toString();
        high = dataTwo.data[0].high.toFixed(8).toString();
        open = dataTwo.data[0].open.toFixed(8).toString();
      }
      console.log(price);
      console.log(low);
      console.log(high);
      console.log(open);
      const returnValue = (high - low).toFixed(8).toString();
      const returnColor = returnValue > 0 ? 'green' : 'red';
      const returnUniCode = returnValue > 0 ? '&#9650;' : '&#9660;';

      let newtitle = req.body.title.replace(/\[firstname\]/gi, user.firstname);
      newtitle = newtitle.replace(/\[lastname\]/gi, user.lastname);
      newtitle = newtitle.replace(/\[username\]/gi, user.username);
      newtitle = newtitle.replace(/\[country_iso\]/gi, user.country.iso);
      newtitle = newtitle.replace(/\[country_name\]/gi, user.country.name);
      newtitle = newtitle.replace(/\[currency_iso\]/gi, user.country.currency.iso);
      newtitle = newtitle.replace(/\[currency_name\]/gi, user.country.currency.currency_name);
      console.log('newtitle');
      console.log(newtitle);
      let newMessage;
      newMessage = req.body.message.replace(/\n/g, "<br />");
      newMessage = newMessage.replace(/\[firstname\]/gi, user.firstname);
      newMessage = newMessage.replace(/\[lastname\]/gi, user.lastname);
      newMessage = newMessage.replace(/\[username\]/gi, user.username);
      newMessage = newMessage.replace(/\[country_iso\]/gi, user.country.iso);
      newMessage = newMessage.replace(/\[country_name\]/gi, user.country.name);
      newMessage = newMessage.replace(/\[currency_iso\]/gi, user.country.currency.iso);
      newMessage = newMessage.replace(/\[currency_name\]/gi, user.country.currency.currency_name);

      newMessage = newMessage.replace(/\[metrics\]/gi, `
      <table width="100%" align="center" style="width:100%; color: black;">
        <tr>
          <td>
            <div style="width: 100%; color: black">
            <div style="width: 100%; font-size: 20px;">Key Metrics</div>
          </td>
        </tr>
        <tr>
          <td style="border: 2px solid black; text-align: center;">
            <div style="width: 100%; font-size: 18px; text-decoration: underline;">24h low</div>
            <div style="width: 100%; font-size: 14px; font-weight:bold;">${low} ${user.country.currency.iso}</div>
          </td>
          <td style="border: 2px solid black; text-align: center;">
            <div style="width: 100%; font-size: 18px; text-decoration: underline;">24h high</div>
            <div style="width: 100%; font-size: 14px; font-weight:bold;">${high} ${user.country.currency.iso}</div>
          </td>
          <td style="border: 2px solid black; text-align: center;">
            <div style="width: 100%; font-size: 18px; text-decoration: underline;">24h open</div>
            <div style="width: 100%; font-size: 14px; font-weight:bold;">${open} ${user.country.currency.iso}</div>
          </td>
        </tr>
        <tr>
          <td style="border: 2px solid black; text-align: center;">
            <div style="width: 100%; font-size: 18px; text-decoration: underline;">Current Price</div>
            <div style="width: 100%; font-size: 14px; font-weight:bold;">${price} ${user.country.currency.iso}</div>
          </td>
          <td style="border: 2px solid black; text-align: center;">
            <div style="width: 100%; font-size: 18px; text-decoration: underline;">24h change</div>
            <div style="width: 100%; font-size: 14px; font-weight:bold; color: ${changePercentColor}">${changePercentUniCode} ${dataOne.data.quotes.USD.percent_change_24h} %</div>
          </td>
          <td style="border: 2px solid black; text-align: center;">
            <div style="width: 100%; font-size: 18px; text-decoration: underline;">24h returns</div>
            <div style="width: 100%; font-size: 14px; font-weight:bold; color: ${returnColor}">${returnUniCode} ${returnValue} ${user.country.currency.iso}</div>
          </td>
        </tr>
        </table>      
      `);

      newMessage = newMessage.replace(/\[socials\]/gi, `
      <div style="width: 100%;">
        <a href="https://www.facebook.com/localrunes"><img style="width: 75px;" src="https://downloads.runebase.io/facebook.png"></a>
        <a href="https://t.me/localrunes"><img style="width: 75px;" src="https://downloads.runebase.io/telegram.png"></a>
        <a href="https://twitter.com/LocalRunes"><img style="width: 75px;" src="https://downloads.runebase.io/twitter.png"></a>
      </div>
      `);

      const bololexRunesUsdt = markets.data.filter((item) => item.exchange_name === 'Bololex' && item.pair === 'RUNES/USDT');
      console.log(bololexRunesUsdt);
      const bololexRunesUsdtPrice = user.country.currency.iso !== 'USD'
        ? ((bololexRunesUsdt[0].quotes.USD.price) * Number(currencyCoversion.data.rates[user.country.currency.iso])).toFixed(8).toString()
        : bololexRunesUsdt[0].quotes.USD.price.toFixed(8).toString();
      const bololexRunesUsdtVolume = user.country.currency.iso !== 'USD'
        ? ((bololexRunesUsdt[0].quotes.USD.volume_24h) * Number(currencyCoversion.data.rates[user.country.currency.iso])).toFixed(8).toString()
        : bololexRunesUsdt[0].quotes.USD.volume_24h.toFixed(8).toString();

      const bololexRunesBtc = markets.data.filter((item) => item.exchange_name === 'Bololex' && item.pair === 'RUNES/BTC');
      console.log(bololexRunesBtc);
      const bololexRunesBtcPrice = user.country.currency.iso !== 'USD'
        ? ((bololexRunesBtc[0].quotes.USD.price) * Number(currencyCoversion.data.rates[user.country.currency.iso])).toFixed(8).toString()
        : bololexRunesBtc[0].quotes.USD.price.toFixed(8).toString();
      const bololexRunesBtcVolume = user.country.currency.iso !== 'USD'
        ? ((bololexRunesBtc[0].quotes.USD.volume_24h) * Number(currencyCoversion.data.rates[user.country.currency.iso])).toFixed(8).toString()
        : bololexRunesBtc[0].quotes.USD.volume_24h.toFixed(8).toString();

      const altmarketsRunesDoge = markets.data.filter((item) => item.exchange_name === 'Bololex' && item.pair === 'RUNES/BTC');
      console.log(bololexRunesBtc);
      const altmarketsRunesDogePrice = user.country.currency.iso !== 'USD'
        ? ((altmarketsRunesDoge[0].quotes.USD.price) * Number(currencyCoversion.data.rates[user.country.currency.iso])).toFixed(8).toString()
        : altmarketsRunesDoge[0].quotes.USD.price.toFixed(8).toString();
      const altmarketsRunesDogeVolume = user.country.currency.iso !== 'USD'
        ? ((altmarketsRunesDoge[0].quotes.USD.volume_24h) * Number(currencyCoversion.data.rates[user.country.currency.iso])).toFixed(8).toString()
        : altmarketsRunesDoge[0].quotes.USD.volume_24h.toFixed(8).toString();

      newMessage = newMessage.replace(/\[markets\]/gi, `
      <div style="width: 100%;">
        <p style="width: 100%; text-decoration: underline; font-size: 20px; margin-bottom: 5px;">Trade RUNES on Exchanges</p>
        <table cellspacing="0" width="100%" align="center" style="width:100%; color: black;">
          <tr>
            <th style="background: #ccc; border: 1px solid black">Exchange</th>
            <th style="background: #ccc; border: 1px solid black">Pair</th>
            <th style="background: #ccc; border: 1px solid black">Volume</th>
            <th style="background: #ccc; border: 1px solid black">Price</th>
          </tr>
          <tr>
            <td style="text-align: center; border: 1px solid black">
              <a href="https://bololex.com/trading/?symbol=RUNES-USDT"><img style="float: left;" src="https://downloads.runebase.io/bololex-thumb.png"><p>Bololex</p></a>
            </td>
            <td style="text-align: center; border: 1px solid black">
              <a href="https://bololex.com/trading/?symbol=RUNES-USDT">RUNES/USDT</a>
            </td>
            <td style="text-align: center; border: 1px solid black">
              ${bololexRunesUsdtPrice} ${user.country.currency.iso}
            </td>
            <td style=" text-align: center; border: 1px solid black">
              ${bololexRunesUsdtVolume} ${user.country.currency.iso}
            </td>
          </tr>
          <tr>
            <td style="text-align: center; border: 1px solid black">
              <a href="https://bololex.com/trading/?symbol=RUNES-BTC"><img style="float: left;" src="https://downloads.runebase.io/bololex-thumb.png"><p>Bololex</p></a>
            </td>
            <td style="text-align: center; border: 1px solid black">
              <a href="https://bololex.com/trading/?symbol=RUNES-BTC">RUNES/BTC</a>
            </td>
            <td style="text-align: center; border: 1px solid black">
              ${bololexRunesBtcPrice} ${user.country.currency.iso}
            </td>
            <td style="text-align: center; border: 1px solid black">
              ${bololexRunesBtcVolume} ${user.country.currency.iso}
            </td>
          </tr>
          <tr>
            <td style="text-align: center; border: 1px solid black">
              <a href="https://v2.altmarkets.io/trading/runesdoge"><img style="float: left;" src="https://downloads.runebase.io/altmarkets-thumb.png"><p>AltMarkets</p></a>
            </td>
            <td style="text-align: center; border: 1px solid black">
              <a href="https://v2.altmarkets.io/trading/runesdoge">RUNES/DOGE</a>
            </td>
            <td style="text-align: center; border: 1px solid black">
              ${altmarketsRunesDogePrice} ${user.country.currency.iso}
            </td>
            <td style="text-align: center; border: 1px solid black">
              ${altmarketsRunesDogeVolume} ${user.country.currency.iso}
            </td>
          </tr>
          <tr>
            <td style="text-align: center; border: 1px solid black">
              <a href="https://txbit.io/Trade/RUNES/BTC"><img style="float: left;" src="https://downloads.runebase.io/txbit-thumb.png"><p>TxBit</p></a>
            </td>
            <td style="text-align: center; border: 1px solid black">
              <a href="https://txbit.io/Trade/RUNES/BTC">RUNES/BTC</a>
            </td>
            <td style="text-align: center; border: 1px solid black">
              not available ${user.country.currency.iso}
            </td>
            <td style="text-align: center; border: 1px solid black">
              not available ${user.country.currency.iso}
            </td>
          </tr>
          <tr>
            <td style="text-align: center; border: 1px solid black">
              <a href="https://txbit.io/Trade/RUNES/ETH"><img style="float: left;" src="https://downloads.runebase.io/txbit-thumb.png"><p>TxBit</p></a>
            </td>
            <td style="text-align: center; border: 1px solid black">
              <a href="https://txbit.io/Trade/RUNES/ETH">RUNES/ETH</a>
            </td>
            <td style="text-align: center; border: 1px solid black">
              not available ${user.country.currency.iso}
            </td>
            <td style="text-align: center; border: 1px solid black">
              not available ${user.country.currency.iso}
            </td>
          </tr>         
          <tr>
            <td style="text-align: center; border: 1px solid black">
              <a href="https://txbit.io/Trade/RUNES/EUR"><img style="float: left;" src="https://downloads.runebase.io/txbit-thumb.png"><p>TxBit</p></a>
            </td>
            <td style="text-align: center; border: 1px solid black">
              <a href="https://txbit.io/Trade/RUNES/EUR">RUNES/EUR</a>
            </td>
            <td style="text-align: center; border: 1px solid black">
              not available
            </td>
            <td style="text-align: center; border: 1px solid black">
              not available
            </td>
          </tr>
          <tr>
            <td style="text-align: center; border: 1px solid black">
              <a href="https://txbit.io/Trade/RUNES/USD"><img style="float: left;" src="https://downloads.runebase.io/txbit-thumb.png"><p>TxBit</p></a>
            </td>
            <td style="text-align: center; border: 1px solid black">
              <a href="https://txbit.io/Trade/RUNES/USD">RUNES/USD</a>
            </td>
            <td style="text-align: center; border: 1px solid black">
              not available
            </td>
            <td style="text-align: center; border: 1px solid black">
              not available
            </td>
          </tr>
          
          <tr>
            <td style="text-align: center; border: 1px solid black">
              <a href="https://stakecenter.co/client/exchange/BTC/RUNES"><p>StakeCenter</p></a>
            </td>
            <td style="text-align: center; border: 1px solid black">
              <a href="https://stakecenter.co/client/exchange/BTC/RUNES">RUNES/BTC</a>
            </td>
            <td style="text-align: center; border: 1px solid black">
              not available
            </td>
            <td style="text-align: center; border: 1px solid black">
              not available
            </td>
          </tr>
          <tr>
            <td style="text-align: center; border: 1px solid black">
              <a href="https://stakecenter.co/client/exchange/LTC/RUNES"><p>StakeCenter</p></a>
            </td>
            <td style="text-align: center; border: 1px solid black">
              <a href="https://stakecenter.co/client/exchange/LTC/RUNES">RUNES/LTC</a>
            </td>
            <td style="text-align: center; border: 1px solid black">
              not available
            </td>
            <td style="text-align: center; border: 1px solid black">
              not available
            </td>
          </tr>
          <tr>
            <td style="text-align: center; border: 1px solid black">
              <a href="https://stakecenter.co/client/exchange/DOGE/RUNES"><p>StakeCenter</p></a>
            </td>
            <td style="text-align: center; border: 1px solid black">
              <a href="https://stakecenter.co/client/exchange/DOGE/RUNES">RUNES/DOGE</a>
            </td>
            <td style="text-align: center; border: 1px solid black">
              not available
            </td>
            <td style="text-align: center; border: 1px solid black">
              not available
            </td>
          </tr>
          <tr>
            <td style="text-align: center; border: 1px solid black">
              <a href="https://stakecenter.co/client/exchange/RDD/RUNES"><p>StakeCenter</p></a>
            </td>
            <td style="text-align: center; border: 1px solid black">
              <a href="https://stakecenter.co/client/exchange/RDD/RUNES">RUNES/RDD</a>
            </td>
            <td style="text-align: center; border: 1px solid black">
              not available
            </td>
            <td style="text-align: center; border: 1px solid black">
              not available
            </td>
          </tr>
        </table>
      </div>
      `);

      console.log('newtitle');
      console.log(newtitle);
      console.log('newMessage');
      console.log(newMessage);
      const fixColorDivFront = ``;
      const fixColorDivBack = "";
      const finalMessage = fixColorDivFront.concat(newMessage).concat(fixColorDivBack);
      await transporter.verify((error, success) => {
        if (error) {
          console.log('failed to verify');
          console.log(error);
        } else {
          console.log("Server is ready to take our messages");
        }
      });

      await transporter.sendMail({
        from: `LocalRunes <${process.env.MAIL_USER}>`, // sender address
        to: user.email, // list of receivers
        subject: newtitle, // Subject line
        // text: "Hello world?", // plain text body
        html: finalMessage, // html body
      });
    });

    // console.log('123');
    console.log(req.body);
    res.locals.mail = 'ok';

    t.afterCommit(() => {
      next();
    });
  }).catch((err) => {
    res.locals.error = err.message;
    next();
  });
};
