/* eslint-disable */
import { combineReducers } from 'redux';
import { reducer as form } from 'redux-form';
import auth from './auth';
import resetPassword from './resetPassword';
import user from './user';
import contact from './contact';
import chainInfo from "./chainInfo";
import website from "./website";
import online from "./online";
import registered from "./registered";
import volume from "./volume";
import createWithdraw from "./createWithdraw";
import tfa from "./tfa";
import theme from './changeTheme';
import price from './price';


import alert from "./alert";
import activity from "./activity";
import recentUserActivity from "./recentUserActivity";
import uploadAvatar from "./uploadAvatar";
import adminWithdrawals from "./admin/adminWithdrawals";
import adminUserList from "./admin/adminUserList";
import adminUser from "./admin/adminUser";
import adminBanners from "./admin/adminBanners";
import adminPublishers from "./admin/adminPublishers";
import adminReviewPublishers from "./admin/adminReviewPublishers";
import adminReviewBanners from "./admin/adminReviewBanners";
import adminDomains from "./admin/adminDomains";
import adminCountries from "./admin/adminCountries";
import adminCurrencies from "./admin/adminCurrencies";
import adminPaymentMethods from "./admin/adminPaymentMethods";
import adminPendingIdentity from "./admin/adminPendingIdentity";


import createReport from './createReport';

import verifyPhoneCode from './verifyPhoneCode';
import getPhoneCode from './getPhoneCode';
import uploadIdentity from './uploadIdentity';
import specificUser from './fetchSpecificUser';
import paymentMethods from './paymentMethods';
import currencies from './currencies';
import postAd from './postAd';
import trade from './trade';
import tradeSecondStep from './tradeSecondStep';
import currentTrade from './currentTrade';
import cancelTrade from './cancelTrade';
import acceptTrade from './acceptTrade';
import message from './message';
import countries from './countries';
import myAds from './myAds';
import deleteAd from './deleteAd';


const rootReducer = combineReducers({
  form,
  auth: auth,
  resetPass: resetPassword,
  user: user,
  contact: contact,
  chaininfo: chainInfo,
  website: website,
  online: online,
  registered: registered,
  volume: volume,
  createWithdraw: createWithdraw,
  tfa: tfa,
  theme: theme,
  price: price,
  alert: alert,
  activity: activity,
  recentUserActivity: recentUserActivity,
  uploadAvatar: uploadAvatar,
  createReport: createReport,

  adminWithdrawals: adminWithdrawals,
  adminUserList: adminUserList,
  adminUser: adminUser,
  adminPublishers: adminPublishers,
  adminBanners: adminBanners,
  adminReviewBanners: adminReviewBanners,
  adminReviewPublishers: adminReviewPublishers,
  adminDomains: adminDomains,
  adminCountries: adminCountries,
  adminCurrencies: adminCurrencies,
  adminPaymentMethods: adminPaymentMethods,
  adminPendingIdentity: adminPendingIdentity,

  verifyPhoneCode: verifyPhoneCode,
  getPhoneCode: getPhoneCode,
  uploadIdentity: uploadIdentity,
  specificUser: specificUser,
  paymentMethods: paymentMethods,
  currencies: currencies,
  postAd: postAd,
  trade: trade,
  tradeSecond: tradeSecondStep,
  currentTrade: currentTrade,
  cancelTrade: cancelTrade,
  acceptTrade: acceptTrade,
  message: message,
  countries: countries,
  myAds: myAds,
  deleteAd: deleteAd, 
  
});

export default rootReducer;
