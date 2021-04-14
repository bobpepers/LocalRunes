import db from '../models';

const { Sequelize, Transaction, Op } = require('sequelize');
const { getInstance } = require('../services/rclient');

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
