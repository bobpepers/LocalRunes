import db from '../models';

const { Sequelize, Transaction, Op } = require('sequelize');

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
    const trade = await db.trade.create({
      userId: req.user.id,
      postAdId: postAd.id,
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
