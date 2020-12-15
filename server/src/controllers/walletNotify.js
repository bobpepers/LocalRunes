import { getInstance } from '../services/rclient';

import db from '../models';

const { Sequelize, Transaction, Op } = require('sequelize');

/**
 * Notify New Block From Runebase Node
 */
const walletNotify = async (req, res, next) => {
  const txId = req.body.payload;
  const transaction = await getInstance().getTransaction(txId);
  console.log(transaction);
  console.log(transaction.details[0]);

  // const testt = await getInstance().utils.toUtf8(transaction.hex);
  // console.log(testt);

  if (transaction.details[0].category === 'receive') {
    await db.sequelize.transaction({
      isolationLevel: Transaction.ISOLATION_LEVELS.SERIALIZABLE,
    }, async (t) => {
      console.log(transaction.details[0].address);
      console.log(transaction.txid);
      const address = await db.address.findOne({
        where: {
          address: transaction.details[0].address,
        },
        include: [
          {
            model: db.wallet,
            as: 'wallet',
          },
        ],
        transaction: t,
        lock: t.LOCK.UPDATE,
      });
      console.log(address);
      res.locals.userId = address.wallet.userId;
      res.locals.transaction = await db.transaction.findOrCreate({
        where: {
          txid: transaction.txid,
        },
        defaults: {
          txid: txId,
          addressId: address.id,
          phase: 'confirming',
          type: transaction.details[0].category,
          amount: transaction.details[0].amount * 1e8,
        },
        transaction: t,
        lock: t.LOCK.UPDATE,
      });

      console.log(res.locals.transaction);
      console.log(res.locals.transaction[1]);
      console.log('111111111111111111112222222222222222222222222222222222');

      if (res.locals.transaction[1]) {
        const activity = await db.activity.findOrCreate({
          where: {
            txid: res.locals.transaction[0].id,
          },
          defaults: {
            earnerId: res.locals.userId,
            type: 'depositAccepted',
            amount: transaction.details[0].amount * 1e8,
            txId: res.locals.transaction[0].id,
          },
          transaction: t,
          lock: t.LOCK.UPDATE,
        });

        res.locals.activity = await db.activity.findOne({
          where: {
            txId: res.locals.transaction[0].id,
          },
          attributes: [
            'createdAt',
            'type',
            'amount',
          ],
          include: [
            {
              model: db.user,
              as: 'earner',
              required: false,
              attributes: ['username'],
            },
            {
              model: db.transaction,
              as: 'txActivity',
              required: false,
              attributes: ['txid'],
            },
          ],
          transaction: t,
          lock: t.LOCK.UPDATE,
        });
      }

      t.afterCommit(() => {
        next();
        console.log('commited');
      });
    });
  }
};

export default walletNotify;
