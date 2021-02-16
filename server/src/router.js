import passport from 'passport';
import {
  signin,
  signup,
  verifyEmail,
  resendVerification,
  destroySession,
  isUserBanned,
} from './controllers/auth';

import {
  getPhoneCode,
  verifyPhoneCode,
} from './controllers/verifyPhone';

import {
  uploadIdentity,
} from './controllers/identity';

import {
  uploadAvatar,
} from './controllers/upload';

import {
  insertIp,
  isIpBanned,
} from './controllers/ip';
import {
  fetchActivity,
  fetchRecentUserActivity,
} from './controllers/activity';
import {
  resetPassword,
  verifyResetPassword,
  resetPasswordNew,
} from './controllers/resetPassword';
import {
  // fetchUsers,
  fetchUserCount,
} from './controllers/users';
import trustUser from './controllers/trust';
import blockUser from './controllers/blocked';

import walletNotify from './controllers/walletNotify';

import {
  isAdmin,
  fetchAdminWithdrawals,
  acceptWithdraw,
  rejectWithdraw,
  fetchAdminUserList,
  fetchAdminUser,
  banAdminUser,
  fetchAdminCountries,
  addAdminCountries,
  addAdminCurrencies,
  fetchAdminCurrencies,
  addAdminPaymentMethod,
  fetchAdminPaymentMethod,
} from './controllers/admin';

import {
  fetchWallet,
  withdraw,
} from './controllers/wallet';
import {
  createMessage,
} from './controllers/messages';

import {
  fetchUser,
  fetchSpecificUser,
  updateBio,
  updateStoreStatus,
} from './controllers/user';

import passportService from './services/passport';
import {
  verifyMyCaptcha,
  isSurfCaptcha,
} from './helpers/recaptcha';
import {
  disabletfa,
  enabletfa,
  ensuretfa,
  unlocktfa,
  istfa,
} from './controllers/tfa';
import fetchPriceInfo from './controllers/price';
import fetchPaymentMethods from './controllers/paymentMethods';
import fetchCurrencies from './controllers/currencies';
import fetchCountries from './controllers/countries';
import { addPostAd, fetchPostAd } from './controllers/postAd';

import storeIp from './helpers/storeIp';
import {
  rateLimiterMiddlewareUser,
  rateLimiterMiddlewareIp,
  rateLimiterMiddlewareFaucet,
} from './helpers/rateLimiter';

import {
  startTrade,
  tradeInit,
  tradeAccept,
  tradeDispute,
  tradeDone,
  fetchTrade,
  secondTrade,
  fetchCurrentTrade,
  cancelCurrentTrade,
  acceptCurrentTrade,
  acceptCurrentMainTrade,
} from './controllers/trade';

const isbot = require('isbot');

const path = require('path');
const multer = require('multer');

const storage = multer.diskStorage({
  // destination: `${__dirname}./uploads`,
  destination: './uploads/temp',
  filename(_req, file, cb) {
    cb(null, `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`);
  },
  fileFilter: (req, file, cb) => {
    if (file.mimetype === "image/png" || file.mimetype === "image/jpg" || file.mimetype === "image/jpeg" || file.mimetype === "image/gif") {
      cb(null, true);
    } else {
      cb(null, false);
      return cb(new Error('Only .png, .gif, .jpg and .jpeg format allowed!'));
    }
  },
});

const checkFileType = (file, cb) => {
  // Allowed ext
  const filetypes = /jpeg|jpg|png|gif/;
  // Check ext
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  // Check mime
  const mimetype = filetypes.test(file.mimetype);

  if (mimetype && extname) {
    return cb(null, true);
  }
  cb('Error: Images Only!');
};

const upload = multer({
  storage,
  limits: {
    fields: 5,
    fieldNameSize: 50, // TODO: Check if this size is enough
    fieldSize: 3145728, // TODO: Check if this size is enough
    fileSize: 3145728, // 3MB 3145728bytes max
  },
  filename(_req, file, cb) {
    cb(null, `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`);
  },
  fileFilter: (req, file, cb) => {
    if (file.mimetype === "image/png" || file.mimetype === "image/jpg" || file.mimetype === "image/jpeg" || file.mimetype === "image/gif") {
      cb(null, true);
    } else {
      cb(null, false);
      return cb(new Error('Only .png, .gif, .jpg and .jpeg format allowed!'));
    }
  },
});

const rateLimit = require("express-rate-limit");

const { startSync } = require('./services/sync');

const UserController = require('./controllers/user');

const requireAuth = passport.authenticate('jwt', { session: true, failWithError: true });
const requireSignin = passport.authenticate('local', { session: true, failWithError: true });

const IsAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) {
    console.log('isauthenticated');
    next();
  } else {
    res.status(401).send({
      error: 'Unauthorized',
    });
  }
};

const router = (app, io, pub, sub, expired_subKey, volumeInfo, onlineUsers) => {
  app.post('/api/rpc/walletnotify',
    walletNotify,
    (req, res) => {
      console.log('afterWalletNotify');
      if (res.locals.error) {
        console.log('walletnotify...');
        console.log(res.locals.error);
      } else if (!res.locals.error && res.locals.transaction) {
        console.log(res.locals.transaction);
        console.log('wtf');
        if (res.locals.activity) {
          console.log('inside res');
          if (onlineUsers[res.locals.userId.toString()]) {
            onlineUsers[res.locals.userId.toString()].emit('insertTransaction', { transaction: res.locals.transaction });
          }
          io.emit('Activity', res.locals.activity);
        }
        console.log('end insert');
      }
    }); // Make sure this endpoint is only accessible by Runebase Node

  // app.get('/api', requireAuth, fetchUsers);

  app.get('/api/authenticated',
    (req, res, next) => {
      if (req.isAuthenticated()) {
        next();
      } else {
        res.json({ success: false });
      }
    },
    istfa);

  app.post('/api/signup',
    verifyMyCaptcha,
    insertIp,
    signup);

  app.post('/api/admin/withdraw/accept',
    IsAuthenticated,
    isAdmin,
    insertIp,
    acceptWithdraw,
    (req, res) => {
      if (res.locals.error) {
        console.log(res.locals.error);
        res.status(401).send({
          error: res.locals.error,
        });
      }
      if (res.locals.activity) {
        io.emit('Activity', res.locals.activity);
      }
      if (res.locals.transaction) {
        res.json({
          transaction: res.locals.transaction,
        });
      }
    });

  app.post('/api/admin/withdraw/reject',
    IsAuthenticated,
    isAdmin,
    insertIp,
    rejectWithdraw,
    (req, res) => {
      if (res.locals.error) {
        console.log(res.locals.error);
        res.status(401).send({
          error: res.locals.error,
        });
      }
      if (res.locals.activity) {
        io.emit('Activity', res.locals.activity);
      }
      if (res.locals.transaction) {
        res.json({
          transaction: res.locals.transaction,
        });
      }
    });

  app.get('/api/admin/withdrawals',
    IsAuthenticated,
    isAdmin,
    fetchAdminWithdrawals,
    (req, res) => {
      if (res.locals.error) {
        res.status(401).send({
          error: {
            message: res.locals.error,
            resend: false,
          },
        });
      }
      if (res.locals.withdrawals) {
        console.log(res.locals.withdrawals);
        res.json({
          withdrawals: res.locals.withdrawals,
        });
      }
    });

  app.get('/api/admin/countries/all',
    IsAuthenticated,
    isAdmin,
    fetchAdminCountries,
    (req, res) => {
      if (res.locals.error) {
        res.status(401).send({
          error: {
            message: res.locals.error,
            resend: false,
          },
        });
      }
      if (res.locals.countries) {
        console.log(res.locals.countries);
        res.json({
          countries: res.locals.countries,
        });
      }
    });

  app.post('/api/admin/countries/add',
    IsAuthenticated,
    isAdmin,
    addAdminCountries,
    (req, res) => {
      if (res.locals.error) {
        res.status(401).send({
          error: {
            message: res.locals.error,
            resend: false,
          },
        });
      }
      if (res.locals.countries) {
        console.log(res.locals.countries);
        res.json({
          countries: res.locals.countries,
        });
      }
    });

  app.get('/api/admin/currencies/all',
    IsAuthenticated,
    isAdmin,
    fetchAdminCurrencies,
    (req, res) => {
      if (res.locals.error) {
        res.status(401).send({
          error: {
            message: res.locals.error,
            resend: false,
          },
        });
      }
      if (res.locals.currencies) {
        console.log(res.locals.currencies);
        res.json({
          currencies: res.locals.currencies,
        });
      }
    });

  app.post('/api/admin/currencies/add',
    IsAuthenticated,
    isAdmin,
    addAdminCurrencies,
    (req, res) => {
      if (res.locals.error) {
        res.status(401).send({
          error: {
            message: res.locals.error,
            resend: false,
          },
        });
      }
      if (res.locals.currencies) {
        console.log(res.locals.currencies);
        res.json({
          currencies: res.locals.currencies,
        });
      }
    });

  app.post('/api/getphonecode',
    IsAuthenticated,
    insertIp,
    getPhoneCode,
    (req, res) => {
      if (res.locals.error) {
        console.log(res.locals.error);
        res.status(401).send({
          error: res.locals.error,
        });
      }
      if (res.locals.phonecode) {
        res.json({
          phoneCode: res.locals.phonecode,
        });
      }
    });

  app.post('/api/verifyphonecode',
    IsAuthenticated,
    insertIp,
    verifyPhoneCode,
    (req, res) => {
      if (res.locals.error) {
        console.log(res.locals.error);
        res.status(401).send({
          error: res.locals.error,
        });
      }

      if (res.locals.verifyphonecode && res.locals.phoneNumber && res.locals.phoneNumberVerified) {
        res.json({
          verifyphonecode: res.locals.verifyphonecode,
          phoneNumber: res.locals.phoneNumber,
          phoneNumberVerified: res.locals.phoneNumberVerified,
        });
      }
    });

  app.post('/api/upload/identity',
    IsAuthenticated,
    isUserBanned,
    storeIp,
    ensuretfa,
    upload.fields([{
      name: 'front',
      maxCount: 1,
    }, {
      name: 'back',
      maxCount: 1,
    }]),
    uploadIdentity,
    (req, res) => {
      if (res.locals.error) {
        console.log(res.locals.error);
        res.status(401).send({
          error: res.locals.error,
        });
      }
      if (res.locals.identityFront && res.locals.identityBack && res.locals.identityVerified) {
        res.json({
          identityBack: res.locals.identityBack,
          identityFront: res.locals.identityFront,
          identityVerified: res.locals.identityVerified,
        });
      }
    });

  app.post('/api/admin/users/ban',
    IsAuthenticated,
    isAdmin,
    banAdminUser,
    (req, res) => {
      if (res.locals.error) {
        res.status(401).send({
          error: {
            message: res.locals.error,
            resend: false,
          },
        });
      }
      if (res.locals.users) {
        console.log(res.locals.users);
        res.json({
          users: res.locals.users,
        });
      }
    });

  app.get('/api/admin/paymentmethod/all',
    IsAuthenticated,
    isAdmin,
    fetchAdminPaymentMethod,
    (req, res) => {
      if (res.locals.error) {
        res.status(401).send({
          error: {
            message: res.locals.error,
            resend: false,
          },
        });
      }
      if (res.locals.paymentMethod) {
        console.log(res.locals.paymentMethod);
        res.json({
          paymentMethod: res.locals.paymentMethod,
        });
      }
    });

  app.post('/api/admin/paymentmethod/add',
    IsAuthenticated,
    isAdmin,
    addAdminPaymentMethod,
    (req, res) => {
      if (res.locals.error) {
        res.status(401).send({
          error: {
            message: res.locals.error,
            resend: false,
          },
        });
      }
      if (res.locals.paymentMethod) {
        console.log(res.locals.paymentMethod);
        res.json({
          paymentMethod: res.locals.paymentMethod,
        });
      }
    });

  app.get('/api/admin/userlist',
    IsAuthenticated,
    isAdmin,
    fetchAdminUserList,
    (req, res) => {
      if (res.locals.error) {
        res.status(401).send({
          error: {
            message: res.locals.error,
            resend: false,
          },
        });
      }
      if (res.locals.userlist) {
        console.log(res.locals.userlist);
        res.json({
          userlist: res.locals.userlist,
        });
      }
    });

  app.post('/api/admin/user',
    IsAuthenticated,
    isAdmin,
    fetchAdminUser,
    (req, res) => {
      if (res.locals.error) {
        res.status(401).send({
          error: {
            message: res.locals.error,
            resend: false,
          },
        });
      }
      if (res.locals.user) {
        console.log(res.locals.user);
        res.json({
          user: res.locals.user,
        });
      }
    });

  app.post('/api/signup/verify-email',
    insertIp,
    verifyEmail,
    (req, res) => {
      console.log(res.locals.error);
      if (res.locals.error === 'AUTH_TOKEN_EXPIRED') {
        res.status(401).send({
          error: {
            message: res.locals.error,
            resend: true,
          },
        });
      }
      if (res.locals.error) {
        res.status(401).send({
          error: {
            message: res.locals.error,
            resend: false,
          },
        });
      }
      if (res.locals.user) {
        res.json({
          firstname: res.locals.user.firstname,
          username: res.locals.user.username,
        });
      }
    });

  app.post('/api/resend-verify-code',
    resendVerification);

  app.post('/api/signin',
    (req, res, next) => {
      console.log('Click Login');
      next();
    },
    verifyMyCaptcha,
    insertIp,
    requireSignin,
    isUserBanned,
    signin,
    (err, req, res, next) => {
      if (req.authErr === 'EMAIL_NOT_VERIFIED') {
        req.session.destroy();
        res.status(401).send({
          error: req.authErr,
          email: res.locals.email,
        });
      } else if (req.authErr) {
        req.session.destroy();
        res.status(401).send({
          error: 'LOGIN_ERROR',
        });
      }
    },
    (req, res, next) => {
      if (res.locals.activity) {
        io.emit('Activity', res.locals.activity);
      }

      console.log('Login Successful');
      res.json({
        username: req.username,
      });
    });

  app.post('/api/reset-password',
    verifyMyCaptcha,
    resetPassword);

  app.post('/api/reset-password/verify',
    verifyResetPassword);

  app.post('/api/reset-password/new',
    resetPasswordNew);

  app.post('/api/2fa/enable',
    IsAuthenticated,
    isUserBanned,
    storeIp,
    ensuretfa,
    enabletfa);

  app.post('/api/2fa/disable',
    IsAuthenticated,
    storeIp,
    ensuretfa,
    disabletfa);

  app.post('/api/2fa/unlock',
    IsAuthenticated,
    isUserBanned,
    storeIp,
    unlocktfa);

  app.post('/api/update/store/status',
    IsAuthenticated,
    isUserBanned,
    // storeIp,
    ensuretfa,
    updateStoreStatus,
    (req, res) => {
      if (res.locals.error) {
        console.log(res.locals.error);
        res.status(401).send({
          error: res.locals.error,
        });
      }
      console.log(res.locals.store);
      console.log('res.locals.store');
      if (res.locals.store === 'true') {
        res.json({ store: true });
      }
      if (res.locals.store === 'false') {
        res.json({ store: false });
      }
    });

  app.post('/api/update/bio',
    IsAuthenticated,
    isUserBanned,
    storeIp,
    ensuretfa,
    updateBio,
    (req, res) => {
      console.log('ADDED PUBLISHER');
      if (res.locals.error) {
        console.log(res.locals.error);
        res.status(401).send({
          error: res.locals.error,
        });
      }
      if (res.locals.bio) {
        res.json(res.locals.bio);
      }
    });

  app.post('/api/message/send',
    IsAuthenticated,
    isUserBanned,
    storeIp,
    ensuretfa,
    createMessage,
    (req, res) => {
      console.log('ADDED PUBLISHER');
      if (res.locals.error) {
        console.log(res.locals.error);
        res.status(401).send({
          error: res.locals.error,
        });
      }
      if (onlineUsers[res.locals.trade.userId.toString()]) {
        onlineUsers[res.locals.trade.userId.toString()].emit('insertMessage', {
          message: res.locals.message,
        });
      }
      if (onlineUsers[res.locals.trade.postAd.userId.toString()]) {
        onlineUsers[res.locals.trade.postAd.userId.toString()].emit('insertMessage', {
          message: res.locals.message,
        });
      }
      if (res.locals.message) {
        res.json({ message: res.locals.message });
      }
    });

  app.post('/api/trade/start',
    (req, res, next) => {
      console.log("start");
      next();
    },
    IsAuthenticated,
    isUserBanned,
    // storeIp,
    ensuretfa,
    startTrade,
    (req, res) => {
      console.log('ADDED PUBLISHER');
      if (res.locals.error) {
        console.log(res.locals.error);
        res.status(401).send({
          error: res.locals.error,
        });
      }
      if (res.locals.trade) {
        res.json({ trade: res.locals.trade });
      }
    });

  app.post('/api/trade/second',
    (req, res, next) => {
      console.log("start");
      next();
    },
    IsAuthenticated,
    isUserBanned,
    // storeIp,
    ensuretfa,
    secondTrade,
    (req, res) => {
      console.log('ADDED secondTrade');
      if (res.locals.error) {
        console.log(res.locals.error);
        res.status(401).send({
          error: res.locals.error,
        });
      }
      console.log(res.locals.trade);

      if (onlineUsers[res.locals.trade.userId.toString()]) {
        onlineUsers[res.locals.trade.userId.toString()].emit('updateTrade', {
          trade: res.locals.trade,
        });
      }
      if (onlineUsers[res.locals.trade.postAd.userId.toString()]) {
        onlineUsers[res.locals.trade.postAd.userId.toString()].emit('updateTrade', {
          trade: res.locals.trade,
        });
      }
      if (res.locals.trade) {
        res.json({ trade: res.locals.trade });
      }
    });

  app.post('/api/trade/current',
    (req, res, next) => {
      console.log("start TRADE");
      next();
    },
    IsAuthenticated,
    isUserBanned,
    // storeIp,
    ensuretfa,
    fetchCurrentTrade,
    (req, res) => {
      console.log('API TRADE');
      if (res.locals.error) {
        console.log(res.locals.error);
        res.status(401).send({
          error: res.locals.error,
        });
      }
      console.log(res.locals.trade);
      if (res.locals.trade) {
        res.json({
          trade: res.locals.trade,
        });
      }
    });

  app.post('/api/trade/cancel',
    (req, res, next) => {
      console.log("start TRADE");
      next();
    },
    IsAuthenticated,
    isUserBanned,
    // storeIp,
    ensuretfa,
    cancelCurrentTrade,
    (req, res) => {
      console.log('API TRADE');
      if (res.locals.error) {
        console.log(res.locals.error);
        res.status(401).send({
          error: res.locals.error,
        });
      }
      console.log(res.locals.trade);
      if (res.locals.trade) {
        res.json({
          trade: res.locals.trade,
        });
      }
    });

  app.post('/api/trade/accept',
    (req, res, next) => {
      console.log("start TRADE");
      next();
    },
    IsAuthenticated,
    isUserBanned,
    // storeIp,
    ensuretfa,
    acceptCurrentTrade,
    (req, res) => {
      if (res.locals.error) {
        console.log(res.locals.error);
        res.status(401).send({
          error: res.locals.error,
        });
      }
      console.log(res.locals.trade);
      console.log(res.locals.wallet);
      if (!res.locals.error) {
        if (onlineUsers[res.locals.wallet.userId.toString()]) {
          onlineUsers[res.locals.wallet.userId.toString()].emit('updateWallet', {
            wallet: res.locals.wallet,
          });
        }

        if (onlineUsers[res.locals.trade.userId.toString()]) {
          onlineUsers[res.locals.trade.userId.toString()].emit('updateTrade', {
            trade: res.locals.trade,
          });
        }

        if (onlineUsers[res.locals.trade.postAd.userId.toString()]) {
          onlineUsers[res.locals.trade.postAd.userId.toString()].emit('updateTrade', {
            trade: res.locals.trade,
          });
        }

        if (onlineUsers[res.locals.trade.userId.toString()]) {
          onlineUsers[res.locals.trade.userId.toString()].emit('updateCurrentTrade', {
            trade: res.locals.trade,
          });
        }

        if (onlineUsers[res.locals.trade.postAd.userId.toString()]) {
          onlineUsers[res.locals.trade.postAd.userId.toString()].emit('updateCurrentTrade', {
            trade: res.locals.trade,
          });
        }
      }
    });

  app.post('/api/trade/main/accept',
    (req, res, next) => {
      console.log("start TRADE");
      next();
    },
    IsAuthenticated,
    isUserBanned,
    // storeIp,
    ensuretfa,
    acceptCurrentMainTrade,
    (req, res) => {
      if (res.locals.error) {
        console.log(res.locals.error);
        res.status(401).send({
          error: res.locals.error,
        });
      }

      if (!res.locals.error) {
        if (res.locals.walletUserOne) {
          if (onlineUsers[res.locals.walletUserOne.userId.toString()]) {
            onlineUsers[res.locals.walletUserOne.userId.toString()].emit('updateWallet', {
              wallet: res.locals.walletUserOne,
            });
          }
        }

        if (res.locals.walletUserTwo) {
          if (onlineUsers[res.locals.walletUserTwo.userId.toString()]) {
            onlineUsers[res.locals.walletUserTwo.userId.toString()].emit('updateWallet', {
              wallet: res.locals.walletUserTwo,
            });
          }
        }

        if (onlineUsers[res.locals.trade.userId.toString()]) {
          onlineUsers[res.locals.trade.userId.toString()].emit('updateTrade', {
            trade: res.locals.trade,
          });
        }

        if (onlineUsers[res.locals.trade.postAd.userId.toString()]) {
          onlineUsers[res.locals.trade.postAd.userId.toString()].emit('updateTrade', {
            trade: res.locals.trade,
          });
        }

        if (onlineUsers[res.locals.trade.userId.toString()]) {
          onlineUsers[res.locals.trade.userId.toString()].emit('updateCurrentTrade', {
            trade: res.locals.trade,
          });
        }

        if (onlineUsers[res.locals.trade.postAd.userId.toString()]) {
          onlineUsers[res.locals.trade.postAd.userId.toString()].emit('updateCurrentTrade', {
            trade: res.locals.trade,
          });
        }
      }
    });

  app.post('/api/trade',
    (req, res, next) => {
      console.log("start TRADE");
      next();
    },
    IsAuthenticated,
    isUserBanned,
    // storeIp,
    ensuretfa,
    fetchTrade,
    (req, res) => {
      console.log('API TRADE');
      if (res.locals.error) {
        console.log(res.locals.error);
        res.status(401).send({
          error: res.locals.error,
        });
      }
      console.log(res.locals.trade);
      if (res.locals.trade) {
        res.json({
          trade: res.locals.trade,
        });
      }
    });

  app.post('/api/postad/add',
    (req, res, next) => {
      console.log('55');
      next();
    },
    IsAuthenticated,
    isUserBanned,
    // storeIp,
    ensuretfa,
    addPostAd,
    (req, res) => {
      console.log('ADDED PUBLISHER');
      if (res.locals.error) {
        console.log(res.locals.error);
        res.status(401).send({
          error: res.locals.error,
        });
      }
      if (res.locals.postAd) {
        res.json({ postAd: res.locals.postAd });
      }
    });

  app.post('/api/postad',
    (req, res, next) => {
      console.log('55');
      next();
    },
    IsAuthenticated,
    isUserBanned,
    // storeIp,
    ensuretfa,
    fetchPostAd,
    (req, res) => {
      if (res.locals.error) {
        console.log(res.locals.error);
        res.status(401).send({
          error: res.locals.error,
        });
      }
      if (res.locals.buy) {
        res.json({ buy: res.locals.buy });
      }
      if (res.locals.sell) {
        res.json({ sell: res.locals.sell });
      }
    });

  app.get('/api/paymentmethods',
    IsAuthenticated,
    isUserBanned,
    // storeIp,
    ensuretfa,
    fetchPaymentMethods,
    (req, res) => {
      console.log('ADDED PUBLISHER');
      if (res.locals.error) {
        console.log(res.locals.error);
        res.status(401).send({
          error: res.locals.error,
        });
      }
      if (res.locals.paymentMethods) {
        console.log(res.locals.paymentMethods);
        console.log('banners');
        res.json({ paymentMethods: res.locals.paymentMethods });
      }
    });

  app.get('/api/currencies',
    IsAuthenticated,
    isUserBanned,
    // storeIp,
    ensuretfa,
    fetchCurrencies,
    (req, res) => {
      console.log('fetchCurrencies');
      console.log('ADDED fetchCurrencies');
      if (res.locals.error) {
        console.log(res.locals.error);
        res.status(401).send({
          error: res.locals.error,
        });
      }
      if (res.locals.currencies) {
        console.log(res.locals.currencies);
        console.log('banners');
        res.json({ currencies: res.locals.currencies });
      }
    });

  app.get('/api/countries',
    IsAuthenticated,
    isUserBanned,
    // storeIp,
    ensuretfa,
    fetchCountries,
    (req, res) => {
      console.log('fetchCurrencies');
      console.log('ADDED fetchCurrencies');
      if (res.locals.error) {
        console.log(res.locals.error);
        res.status(401).send({
          error: res.locals.error,
        });
      }
      if (res.locals.countries) {
        console.log(res.locals.countries);
        console.log('banners');
        res.json({ countries: res.locals.countries });
      }
    });

  app.post('/api/upload/avatar',
    IsAuthenticated,
    isUserBanned,
    storeIp,
    ensuretfa,
    upload.single('avatar'),
    uploadAvatar,
    (req, res) => {
      console.log('UPLOADED AVATAR');
      if (res.locals.error) {
        console.log(res.locals.error);
        res.status(401).send({
          error: res.locals.error,
        });
      }
      if (res.locals.avatar) {
        res.json(res.locals.avatar);
      }
    });

  // app.post('/contact/send', verifyMyCaptcha, contactSend);
  app.post('/api/chaininfo/block',
    (req, res) => {
      startSync(io, onlineUsers);
    });

  app.get('/api/price',
    fetchPriceInfo,
    (req, res) => {
      if (res.locals.error) {
        console.log(res.locals.error);
        res.status(401).send({
          error: res.locals.error,
        });
      }
      if (res.locals.price) {
        res.json({
          price: res.locals.price,
        });
      }
    });

  app.get('/api/logout',
    insertIp,
    storeIp,
    destroySession,
    (req, res) => {
      io.emit('Activity', res.locals.activity);
      res.redirect("/");
    });

  app.get('/api/users/total',
    fetchUserCount);

  app.get('/api/activity/all',
    fetchActivity,
    (req, res) => {
      if (res.locals.error) {
        res.status(401).send({
          error: res.locals.error,
        });
      }
      if (res.locals.activity) {
        res.json({
          activity: res.locals.activity,
        });
      }
    });

  app.get('/api/activity/user',
    IsAuthenticated,
    isUserBanned,
    storeIp,
    ensuretfa,
    fetchRecentUserActivity,
    (req, res) => {
      if (res.locals.error) {
        res.status(401).send({
          error: res.locals.error,
        });
      }
      if (res.locals.activity) {
        res.json({
          activity: res.locals.activity,
        });
      }
    });

  app.get('/api/volume',
    (req, res, next) => {
      console.log(volumeInfo);
      console.log('volumeInfo');
      console.log('volumeInfo');
      console.log('volumeInfo');
      console.log('volumeInfo');
      console.log('volumeInfo');
      console.log('volumeInfo');
      console.log('volumeInfo');
      console.log('volumeInfo');
      res.json(volumeInfo);
    });

  app.get('/api/user',
    IsAuthenticated,
    isUserBanned,
    storeIp,
    ensuretfa,
    fetchUser,
    (req, res, next) => {
      if (res.locals.error) {
        console.log(res.locals.error);
        res.status(401).send({
          error: res.locals.error,
        });
      }
      if (res.locals.user) {
        res.json(res.locals.user);
      }
    });

  app.post('/api/getuser',
    (req, res, next) => {
      console.log('api get user start');
      console.log('api get user start');
      console.log('api get user start');
      console.log('api get user start');
      console.log('api get user start');
      console.log('api get user start');
      console.log('api get user start');
      console.log('api get user start');
      console.log('api get user start');
      console.log('api get user start');
      next();
    },
    IsAuthenticated,
    isUserBanned,
    // storeIp,
    ensuretfa,
    fetchSpecificUser,
    (req, res, next) => {
      console.log('before send specificuser');
      if (res.locals.error) {
        console.log(res.locals.error);
        res.status(401).send({
          error: res.locals.error,
        });
      }
      if (res.locals.user) {
        res.json(res.locals.user);
      }
    });

  app.post('/api/trust',
    IsAuthenticated,
    isUserBanned,
    // storeIp,
    ensuretfa,
    trustUser,
    (req, res, next) => {
      if (res.locals.error) {
        res.status(401).send({
          error: res.locals.error,
        });
      }
      if (res.locals.trusted) {
        res.json({ trusted: res.locals.trusted });
      }
      if (res.locals.removed) {
        res.json({ removed: res.locals.removed });
      }
      if (res.locals.user) {
        res.json(res.locals.user);
      }
    });

  app.post('/api/block',
    IsAuthenticated,
    isUserBanned,
    // storeIp,
    ensuretfa,
    blockUser,
    (req, res, next) => {
      if (res.locals.error) {
        res.status(401).send({
          error: res.locals.error,
        });
      }
      if (res.locals.blocked) {
        res.json({ blocked: res.locals.blocked });
      }
      if (res.locals.removed) {
        res.json({ removed: res.locals.removed });
      }
      if (res.locals.user) {
        res.json(res.locals.user);
      }
    });

  // User Request Withdrawal
  app.post('/api/withdraw',
    IsAuthenticated,
    isUserBanned,
    storeIp,
    ensuretfa,
    withdraw,
    (req, res) => {
      if (res.locals.error) {
        console.log(res.locals.error);
        res.status(401).send({
          error: res.locals.error,
        });
      } else if (!res.locals.error && res.locals.wallet && res.locals.transaction) {
        res.locals.transaction.txid = null;
        res.locals.transaction.blockId = null;
        res.json({
          wallet: res.locals.wallet,
          transaction: res.locals.transaction,
        });
      }
    });
};

export default router;
