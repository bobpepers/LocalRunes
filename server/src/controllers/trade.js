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
          include: [
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
    if (!trade) {
      throw new Error('TRADE_NOT_FOUND');
    }
    if (amount < trade.postAd.min) {
      throw new Error('BELOW_MIN_AMOUNT');
    }
    if (amount > trade.postAd.max) {
      throw new Error('ABOVE_MAX_AMOUNT');
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
          where: {
            userId: req.user.id,
          },
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

    if (trade.postAd.type === 'sell') {
      const walletBuy = await db.wallet.findOne({
        where: {
          userId: trade.postAd.userId,
        },
        transaction: t,
        lock: t.LOCK.UPDATE,
      });

      if (trade.amount > walletBuy.available) {
        console.log('not enough funds');
        throw new Error('NOT_ENOUGH_FUNDS');
      }

      res.locals.wallet = await walletBuy.update({
        available: walletBuy.available - trade.amount,
        locked: walletBuy.locked + trade.amount,
      }, {
        transaction: t,
        lock: t.LOCK.UPDATE,
      });

      return next();
    }

    if (trade.postAd.type === 'buy') {
      const walletSell = await db.wallet.findOne({
        where: {
          userId: trade.userId,
        },
        transaction: t,
        lock: t.LOCK.UPDATE,
      });

      if (trade.amount > walletSell.available) {
        console.log('not enough funds');
        throw new Error('NOT_ENOUGH_FUNDS');
      }

      res.locals.wallet = await walletSell.update({
        available: walletSell.available - trade.amount,
        locked: walletSell.locked + trade.amount,
      }, {
        transaction: t,
        lock: t.LOCK.UPDATE,
      });

      return next();
    }

    res.locals.error = "UNABLE_TO_ACCEPT_TRADE";
    t.afterCommit(() => {
      next();
    });
  }).catch((err) => {
    console.log(err.message);
    res.locals.error = err.message;
    next();
  });
};

export const acceptCurrentMainTrade = async (req, res, next) => {
  await db.sequelize.transaction({
    isolationLevel: Transaction.ISOLATION_LEVELS.SERIALIZABLE,
  }, async (t) => {
    console.log(req.body);
    console.log(req.user.id);

    const trade = await db.trade.findOne({
      where: {
        id: req.body.id,
        type: 'accepted',
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
      res.locals.error = "UNABLE_TO_FIND_TRADE";
      return next();
    }

    if (trade.postAd.userId === req.user.id) {
      if (trade.userOneCancel) {
        res.locals.error = "UNABLE_TO_COMPLETE_CANCELED_TRADE";
        return next();
      }
    }
    if (trade.userId === req.user.id) {
      if (trade.userTwoCancel) {
        res.locals.error = "UNABLE_TO_COMPLETE_CANCELED_TRADE";
        return next();
      }
    }

    if (trade.postAd.userId === req.user.id) {
      console.log('123');
      if (trade.userOneComplete) {
        console.log('trade.userOneComplete');
        res.locals.trade = await trade.update({
          userOneComplete: false,
        }, {
          transaction: t,
          lock: t.LOCK.UPDATE,
        });
      } else if (!trade.userOneComplete) {
        res.locals.trade = await trade.update({
          userOneComplete: true,
        }, {
          transaction: t,
          lock: t.LOCK.UPDATE,
        });
      }
    }

    if (trade.userId === req.user.id) {
      console.log('123');
      if (trade.userTwoComplete) {
        res.locals.trade = await trade.update({
          userTwoComplete: false,
        }, {
          transaction: t,
          lock: t.LOCK.UPDATE,
        });
      } else if (!trade.userTwoComplete) {
        res.locals.trade = await trade.update({
          userTwoComplete: true,
        }, {
          transaction: t,
          lock: t.LOCK.UPDATE,
        });
      }
    }

    if (trade.userOneComplete && trade.userTwoComplete) {
      if (trade.postAd.type === "buy") {
        const walletUserOneSell = await db.wallet.findOne({
          where: {
            userId: trade.postAd.userId,
          },
          transaction: t,
          lock: t.LOCK.UPDATE,
        });
        const walletUserTwoSell = await db.wallet.findOne({
          where: {
            userId: trade.userId,
          },
          transaction: t,
          lock: t.LOCK.UPDATE,
        });
        console.log('walletUserOne');
        console.log(walletUserOneSell);
        console.log('walletUserTwo');
        console.log(walletUserTwoSell);
        if (trade.amount > walletUserTwoSell.locked) {
          console.log('not enough locked funds');
          throw new Error('NOT_ENOUGH_LOCKED_FUNDS');
        }
        res.locals.walletUserTwo = await walletUserTwoSell.update({
          locked: walletUserTwoSell.locked - trade.amount,
        }, {
          transaction: t,
          lock: t.LOCK.UPDATE,
        });
        res.locals.walletUserOne = await walletUserOneSell.update({
          available: walletUserOneSell.available + trade.amount,
        }, {
          transaction: t,
          lock: t.LOCK.UPDATE,
        });
        res.locals.trade = await trade.update({
          type: 'done',
        }, {
          transaction: t,
          lock: t.LOCK.UPDATE,
        });
        const userVolumeOne = await db.user.findOne({
          where: {
            id: trade.postAd.userId,
          },
          transaction: t,
          lock: t.LOCK.UPDATE,
        });
        const userVolumeTwo = await db.user.findOne({
          where: {
            id: trade.userId,
          },
          transaction: t,
          lock: t.LOCK.UPDATE,
        });
        await userVolumeOne.update({
          volume: userVolumeOne.volume + trade.amount,
          tradeCount: userVolumeOne.tradeCount + 1,
        }, {
          transaction: t,
          lock: t.LOCK.UPDATE,
        });
        await userVolumeTwo.update({
          volume: userVolumeTwo.volume + trade.amount,
          tradeCount: userVolumeTwo.tradeCount + 1,
        }, {
          transaction: t,
          lock: t.LOCK.UPDATE,
        });
      }
      if (trade.postAd.type === "sell") {
        const walletUserOne = await db.wallet.findOne({
          where: {
            userId: trade.userId,
          },
          transaction: t,
          lock: t.LOCK.UPDATE,
        });
        const walletUserTwo = await db.wallet.findOne({
          where: {
            userId: trade.postAd.userId,
          },
          transaction: t,
          lock: t.LOCK.UPDATE,
        });
        console.log('walletUserOne');
        console.log(walletUserOne);
        console.log('walletUserTwo');
        console.log(walletUserTwo);
        if (trade.amount > walletUserTwo.locked) {
          console.log('not enough locked funds');
          throw new Error('NOT_ENOUGH_LOCKED_FUNDS');
        }
        res.locals.walletUserTwo = await walletUserTwo.update({
          locked: walletUserTwo.locked - trade.amount,
        }, {
          transaction: t,
          lock: t.LOCK.UPDATE,
        });
        res.locals.walletUserOne = await walletUserOne.update({
          available: walletUserOne.available + trade.amount,
        }, {
          transaction: t,
          lock: t.LOCK.UPDATE,
        });
        res.locals.trade = await trade.update({
          type: 'done',
        }, {
          transaction: t,
          lock: t.LOCK.UPDATE,
        });
        const userBuyVolumeOne = await db.user.findOne({
          where: {
            id: trade.postAd.userId,
          },
          transaction: t,
          lock: t.LOCK.UPDATE,
        });
        const userBuyVolumeTwo = await db.user.findOne({
          where: {
            id: trade.userId,
          },
          transaction: t,
          lock: t.LOCK.UPDATE,
        });
        await userBuyVolumeOne.update({
          volume: userBuyVolumeOne.volume + trade.amount,
          tradeCount: userBuyVolumeOne.tradeCount + 1,
        }, {
          transaction: t,
          lock: t.LOCK.UPDATE,
        });
        await userBuyVolumeTwo.update({
          volume: userBuyVolumeTwo.volume + trade.amount,
          tradeCount: userBuyVolumeTwo.tradeCount + 1,
        }, {
          transaction: t,
          lock: t.LOCK.UPDATE,
        });
      }
    }

    t.afterCommit(() => {
      next();
    });
  }).catch((err) => {
    console.log(err.message);
    res.locals.error = err.message;
    next();
  });
};

export const cancelCurrentMainTrade = async (req, res, next) => {
  await db.sequelize.transaction({
    isolationLevel: Transaction.ISOLATION_LEVELS.SERIALIZABLE,
  }, async (t) => {
    console.log(req.body);
    console.log(req.user.id);

    const trade = await db.trade.findOne({
      where: {
        id: req.body.id,
        type: 'accepted',
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
      res.locals.error = "UNABLE_TO_FIND_TRADE";
      return next();
    }

    if (trade.postAd.userId === req.user.id) {
      if (trade.userOneComplete) {
        res.locals.error = "UNABLE_TO_COMPLETE_CANCELED_TRADE";
        return next();
      }
    }

    if (trade.userId === req.user.id) {
      if (trade.userTwoComplete) {
        res.locals.error = "UNABLE_TO_COMPLETE_CANCELED_TRADE";
        return next();
      }
    }

    if (trade.postAd.userId === req.user.id) {
      console.log('123');
      if (trade.userOneCancel) {
        console.log('trade.userOneComplete');
        res.locals.trade = await trade.update({
          userOneCancel: false,
        }, {
          transaction: t,
          lock: t.LOCK.UPDATE,
        });
      } else if (!trade.userOneCancel) {
        res.locals.trade = await trade.update({
          userOneCancel: true,
        }, {
          transaction: t,
          lock: t.LOCK.UPDATE,
        });
      }
    }

    if (trade.userId === req.user.id) {
      console.log('123');
      if (trade.userTwoCancel) {
        res.locals.trade = await trade.update({
          userTwoCancel: false,
        }, {
          transaction: t,
          lock: t.LOCK.UPDATE,
        });
      } else if (!trade.userTwoCancel) {
        res.locals.trade = await trade.update({
          userTwoCancel: true,
        }, {
          transaction: t,
          lock: t.LOCK.UPDATE,
        });
      }
    }

    if (trade.userOneCancel && trade.userTwoCancel) {
      if (trade.postAd.type === "buy") {
        const walletUserTwoSell = await db.wallet.findOne({
          where: {
            userId: trade.userId,
          },
          transaction: t,
          lock: t.LOCK.UPDATE,
        });

        if (trade.amount < walletUserTwoSell.locked) {
          console.log('not enough locked funds');
          throw new Error('NOT_ENOUGH_LOCKED_FUNDS');
        }
        res.locals.walletUserTwo = await walletUserTwoSell.update({
          locked: walletUserTwoSell.locked - trade.amount,
          available: walletUserTwoSell.available + trade.amount,
        }, {
          transaction: t,
          lock: t.LOCK.UPDATE,
        });

        res.locals.trade = await trade.update({
          type: 'canceled',
        }, {
          transaction: t,
          lock: t.LOCK.UPDATE,
        });
      }
      if (trade.postAd.type === "sell") {
        const walletUserTwo = await db.wallet.findOne({
          where: {
            userId: trade.postAd.userId,
          },
          transaction: t,
          lock: t.LOCK.UPDATE,
        });
        if (trade.amount < walletUserTwo.locked) {
          console.log('not enough locked funds');
          throw new Error('NOT_ENOUGH_LOCKED_FUNDS');
        }
        res.locals.walletUserTwo = await walletUserTwo.update({
          locked: walletUserTwo.locked - trade.amount,
          available: walletUserTwo.available + trade.amount,
        }, {
          transaction: t,
          lock: t.LOCK.UPDATE,
        });

        res.locals.trade = await trade.update({
          type: 'canceled',
        }, {
          transaction: t,
          lock: t.LOCK.UPDATE,
        });
      }
    }

    t.afterCommit(() => {
      next();
    });
  }).catch((err) => {
    console.log(err.message);
    res.locals.error = err.message;
    next();
  });
};
