import db from '../models';

const { Sequelize, Transaction, Op } = require('sequelize');
/**
 * Fetch Wallet
 */
export const fetchUser = async (req, res, next) => {
  console.log(req.user.id);
  console.log('begin fetch user');
  res.locals.user = await db.user.findOne({
    where: {
      id: req.user.id,
    },
    attributes: {
      exclude: [
        'password',
        'id',
        'authtoken',
        'authused',
        'authexpires',
        'resetpasstoken',
        'resetpassused',
        'resetpassexpires',
        'updatedAt',
      ],
    },
    include: [
      {
        model: db.Referrals,
        required: false,
        as: 'referredBy',
        attributes: ['earned'],
        include: [
          {
            model: db.user,
            required: false,
            as: 'userReferrer',
            attributes: ['username'],
          },
        ],
      },
      {
        model: db.wallet,
        as: 'wallet',
        attributes: {
          exclude: [
            'userId',
            'createdAt',
            'id',
          ],
        },
        include: [
          {
            model: db.address,
            as: 'addresses',
            include: [
              {
                model: db.transaction,
                as: 'transactions',
              },
            ],
          },
        ],
      },

    ],
  });
  console.log(res.locals.user);
  console.log('end user controller');
  next();
};

/**
 * Fetch Wallet
 */
export const dbsync = async (req, res, next) => {
  db.sequelize.sync().then(() => {
    res.status(201).json({ message: 'Tables Created' });
  });
};
