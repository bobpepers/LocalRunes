import db from '../models';

const { Sequelize, Transaction, Op } = require('sequelize');
const BigNumber = require('bignumber.js');

/**
 * Fetch PriceInfo
 */
export const startTrade = async (req, res, next) => {
  console.log('123');
  await db.sequelize.transaction({
    isolationLevel: Transaction.ISOLATION_LEVELS.SERIALIZABLE,
  }, async (t) => {
    const postAd = await db.postAd.findOne({
      where: {
        id: req.body.id,
      },
      transaction: t,
      lock: t.LOCK.UPDATE,
    });
    if (req.user.id === postAd.userId) {
      throw new Error('CANT_TRADE_WITH_SELF');
    }
    const tradeExits = await db.trade.findOne({
      where: {
        userId: req.user.id,
        postAdId: postAd.id,
        [Op.not]: [
          {
            type: [
              'done',
              'disputeDone',
              'canceled',
            ],
          },
        ],
      },
      transaction: t,
      lock: t.LOCK.UPDATE,
    });

    if (tradeExits) {
      throw new Error('TRADE_ALREADY_EXIST');
    }

    const trade = await db.trade.create({
      userId: req.user.id,
      postAdId: postAd.id,
      type: 'init',
    }, {
      transaction: t,
      lock: t.LOCK.UPDATE,
    });

    res.locals.trade = trade;
    t.afterCommit(() => {
      next();
    });
  }).catch((err) => {
    console.log(err.message);
    res.locals.error = err.message;
    next();
  });
};

export const tradeInit = async (req, res, next) => {

};

export const tradeAccept = async (req, res, next) => {

};

export const tradeDispute = async (req, res, next) => {

};

export const tradeDone = async (req, res, next) => {

};

export const fetchTrade = async (req, res, next) => {
  const trade = await db.trade.findAll({
    where: {
      userId: req.user.id,
      [Op.not]: [
        {
          type: [
            'done',
            'disputeDone',
            'canceled',
          ],
        },
      ],
    },
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
            model: db.user,
            as: 'user',
            required: true,
            attributes: ['username'],
          },
        ],
      },
    ],
  });
  const tradeTwo = await db.trade.findAll({
    where: {
      [Op.not]: [
        {
          type: [
            'done',
            'init',
            'disputeDone',
            'canceled',
          ],
        },
      ],
    },
    include: [
      {
        model: db.postAd,
        as: 'postAd',
        required: true,
        where: {
          userId: req.user.id,
        },
        // attributes: ['username'],
      },
    ],
  });
  res.locals.trade = trade.concat(tradeTwo);
  next();
};

export const fetchCurrentTrade = async (req, res, next) => {
  console.log('fetchCurrentTrade');
  console.log('fetchCurrentTrade');
  console.log('fetchCurrentTrade');
  console.log('fetchCurrentTrade');
  console.log('fetchCurrentTrade');
  console.log('fetchCurrentTrade');
  console.log('fetchCurrentTrade');
  console.log('fetchCurrentTrade');
  console.log(req.body.id);
  const trade = await db.trade.findOne({
    where: {
      id: req.body.id,
    },
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
            model: db.user,
            as: 'user',
            required: true,
            attributes: ['username'],
          },
        ],
      },
    ],
  });
  if (trade.userId === req.user.id) {
    res.locals.trade = trade;
    return next();
  }
  if (trade.postAd.userId === req.user.id) {
    res.locals.trade = trade;
    return next();
  }
  res.locals.error = "TRADE_NOT_FOUND";
  next();
};

export const secondTrade = async (req, res, next) => {
  console.log('55555555555555555555555555555554545');
  await db.sequelize.transaction({
    isolationLevel: Transaction.ISOLATION_LEVELS.SERIALIZABLE,
  }, async (t) => {
    console.log('55555555555555555555555555555554545');
    console.log('55555555555555555555555555555554545');
    console.log('55555555555555555555555555555554545');
    console.log('55555555555555555555555555555554545');
    console.log('55555555555555555555555555555554545');
    console.log('55555555555555555555555555555554545');
    console.log('55555555555555555555555555555554545');
    console.log('55555555555555555555555555555554545');
    console.log('55555555555555555555555555555554545');
    console.log(req.body.obj.amount);
    const amount = new BigNumber(req.body.obj.amount).times(1e8).toNumber();

    if (amount < (100 * 1e8)) { // smaller then 5 RUNES
      throw new Error('MINIMUM_AMOUNT_100_RUNES');
    }

    if (amount % 1 !== 0) {
      throw new Error('MAX_8_DECIMALS');
    }

    const trade = await db.trade.findOne({
      where: {
        userId: req.user.id,
        id: req.body.id,
      },
      include: [
        {
          model: db.postAd,
          as: 'postAd',
          required: true,
          // attributes: ['username'],
        },
      ],
      transaction: t,
      lock: t.LOCK.UPDATE,
    });
    if (!trade) {
      throw new Error('TRADE_NOT_FOUND');
    }
    console.log(req.body);
    console.log('sponse timer');
    console.log(req.body.obj.repondTime);
    console.log(new Date(Date.now));
    // const endDate = new Date(new Date(Date.now).valueOf() + (Number(req.body.obj.repondTime) * 60 * 1000));
    const endDate = new Date(new Date().valueOf() + (Number(req.body.obj.repondTime) * 60 * 1000)); // (7 * 24 * 60 * 60 * 1000)
    console.log(endDate);
    console.log(trade);
    await trade.update({
      type: 'requested',
      reponseTime: endDate,
      amount,
    }, {
      transaction: t,
      lock: t.LOCK.UPDATE,
    });

    console.log(endDate);
    console.log(trade);

    res.locals.trade = trade;
    t.afterCommit(() => {
      next();
    });
  }).catch((err) => {
    console.log(err.message);
    res.locals.error = err.message;
    next();
  });
};

export const cancelCurrentTrade = async (req, res, next) => {
  await db.sequelize.transaction({
    isolationLevel: Transaction.ISOLATION_LEVELS.SERIALIZABLE,
  }, async (t) => {
    const trade = await db.trade.findOne({
      where: {
        id: req.body.id,
      },
      include: [
        {
          model: db.postAd,
          as: 'postAd',
          required: true,
          // attributes: ['username'],
        },
      ],
      transaction: t,
      lock: t.LOCK.UPDATE,
    });
    if (!trade) {
      throw new Error('TRADE_NOT_FOUND');
    }
    if (trade.userId === req.user.id) {
      if (trade.type === "init") {
        await trade.update({
          type: 'canceled',
        }, {
          transaction: t,
          lock: t.LOCK.UPDATE,
        });
        res.locals.trade = trade;
        return next();
      }
      if (trade.type === "requested") {
        await trade.update({
          type: 'canceled',
        }, {
          transaction: t,
          lock: t.LOCK.UPDATE,
        });
        res.locals.trade = trade;
        return next();
      }
    }
    if (trade.postAd.userId === req.user.id) {
      if (trade.type === "init") {
        await trade.update({
          type: 'canceled',
        }, {
          transaction: t,
          lock: t.LOCK.UPDATE,
        });
        res.locals.trade = trade;
        return next();
      }
      if (trade.type === "requested") {
        await trade.update({
          type: 'canceled',
        }, {
          transaction: t,
          lock: t.LOCK.UPDATE,
        });
        res.locals.trade = trade;
        return next();
      }
    }
    res.locals.error = "UNABLE_TO_CANCEL_TRADE";
    t.afterCommit(() => {
      next();
    });
  }).catch((err) => {
    console.log(err.message);
    res.locals.error = err.message;
    next();
  });
};

export const acceptCurrentTrade = async (req, res, next) => {
  await db.sequelize.transaction({
    isolationLevel: Transaction.ISOLATION_LEVELS.SERIALIZABLE,
  }, async (t) => {
    console.log(req.body);
    console.log(req.user.id);
    const trade = await db.trade.findOne({
      where: {
        id: req.body.id,
        type: 'requested',
      },
      include: [
        {
          where: {
            userId: req.user.id,
          },
          model: db.postAd,
          as: 'postAd',
          required: true,
          // attributes: ['username'],
        },
      ],
      transaction: t,
      lock: t.LOCK.UPDATE,
    });
    if (!trade) {
      res.locals.error = "UNABLE_TO_FIND_TRADE";
      return next();
    }
    const newTrade = await trade.update({
      type: 'accepted',
    }, {
      transaction: t,
      lock: t.LOCK.UPDATE,
    });

    res.locals.trade = newTrade;

    console.log(newTrade);

    if (trade.postAd.type === 'buy') {
      const walletBuy = await db.wallet.findOne({
        where: {
          userId: trade.userId,
        },
        transaction: t,
        lock: t.LOCK.UPDATE,
      });

      if (trade.amount > walletBuy.available) {
        console.log('not enough funds');
        throw new Error('NOT_ENOUGH_FUNDS');
      }

      res.locals.wallet = walletBuy.update({
        available: walletBuy.available - trade.amount,
        locked: walletBuy.locked + trade.amount,
      }, {
        transaction: t,
        lock: t.LOCK.UPDATE,
      });

      return next();
    }

    if (trade.postAd.type === 'sell') {
      const walletSell = await db.wallet.findOne({
        where: {
          userId: trade.postAd.userId,
        },
        transaction: t,
        lock: t.LOCK.UPDATE,
      });

      if (trade.amount > walletSell.available) {
        console.log('not enough funds');
        throw new Error('NOT_ENOUGH_FUNDS');
      }

      res.locals.wallet = walletSell.update({
        available: walletSell.available - trade.amount,
        locked: walletSell.locked + trade.amount,
      }, {
        transaction: t,
        lock: t.LOCK.UPDATE,
      });

      return next();
    }

    res.locals.error = "UNABLE_TO_CANCEL_TRADE";
    t.afterCommit(() => {
      next();
    });
  }).catch((err) => {
    console.log(err.message);
    res.locals.error = err.message;
    next();
  });
};
