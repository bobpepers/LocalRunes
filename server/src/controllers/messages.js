import db from '../models';

const { Sequelize, Transaction, Op } = require('sequelize');
const BigNumber = require('bignumber.js');

export const createMessage = async (req, res, next) => {
  await db.sequelize.transaction({
    isolationLevel: Transaction.ISOLATION_LEVELS.SERIALIZABLE,
  }, async (t) => {
    console.log('123');
    console.log(req.body);
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
      const messageOne = await db.messages.create({
        tradeId: trade.id,
        userId: req.user.id,
        message: req.body.message.message,
      }, {
        transaction: t,
        lock: t.LOCK.UPDATE,
      });
      res.locals.message = await db.messages.findOne({
        where: {
          id: messageOne.id,
        },
        include: [
          {
            model: db.user,
            as: 'user',
            required: true,
            attributes: ['username'],
          },
        ],
        transaction: t,
        lock: t.LOCK.UPDATE,
      });
    } else if (trade.postAd.userId === req.user.id) {
      const messageTwo = await db.messages.create({
        tradeId: trade.id,
        userId: req.user.id,
        message: req.body.message.message,
      }, {
        transaction: t,
        lock: t.LOCK.UPDATE,
      });
      res.locals.message = await db.messages.findOne({
        where: {
          id: messageTwo.id,
        },
        include: [
          {
            model: db.user,
            as: 'user',
            required: true,
            attributes: ['username'],
          },
        ],
        transaction: t,
        lock: t.LOCK.UPDATE,
      });
    } else {
      throw new Error('USER_NOT_FOUND');
    }
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

export const fetchMessages = async (req, res, next) => {
  await db.sequelize.transaction({
    isolationLevel: Transaction.ISOLATION_LEVELS.SERIALIZABLE,
  }, async (t) => {
    console.log('123');
    t.afterCommit(() => {
      next();
    });
  }).catch((err) => {
    console.log(err.message);
    res.locals.error = err.message;
    next();
  });
};