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

export const fetchSpecificUser = async (req, res, next) => {
  console.log('fetch speicic user start');
  console.log(req.body);
  res.locals.user = await db.user.findOne({
    where: {
      username: req.body.user,
    },
    attributes: {
      exclude: [
        'click_count',
        'identityBack',
        'identityFront',
        'jackpot_tickets',
        'lastClicked',
        'reputation',
        'role',
        'tfa',
        'tfa_secret',
        'webslot_amount',
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
        model: db.trusted,
        as: 'trustedUsers',
        required: false,
        attributes: ['id'],
        include: [
          {
            model: db.user,
            required: false,
            as: 'userTrust',
            attributes: ['username'],
          },
        ],
      },
      {
        model: db.blocked,
        as: 'blockedUsers',
        required: false,
        attributes: ['id'],
        include: [
          {
            model: db.user,
            required: false,
            as: 'userBlock',
            attributes: ['username'],
          },
        ],
      },

    ],
  });
  console.log(res.locals.user);
  console.log('end user controller fetchSpecificUser');
  next();
};

export const updateBio = async (req, res, next) => {
  if (!req.body.bio.description) {
    res.locals.error = 'BIO_NOT_FOUND';
    return next();
  }
  if (req.body.bio.description > 400) {
    res.locals.error = 'BIO_LENGTH_TOO_LONG';
    return next();
  }
  const bio = await db.user.update(
    {
      bio: req.body.bio.description,
    },
    {
      where: {
        id: req.user.id,
      },
    },
  );
  if (!bio) {
    res.locals.error = "UPDATE_BIO_ERROR";
    return next();
  }
  res.locals.bio = bio;
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
