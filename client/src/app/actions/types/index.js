export const SIGNUP_SUCCESS = 'SIGNUP_SUCCESS';
export const SIGNUP_FAILURE = 'SIGNUP_FAILURE';
export const SIGNUP_RESEND_FAILURE = 'SIGNUP_RESEND_FAILURE';
export const VERIFY_EMAIL_ERROR = 'VERIFY_EMAIL_ERROR';
export const SIGNIN_FAILURE = 'SIGNIN_FAILURE';

export const RESET_PASSWORD_SUCCESS = 'RESET_PASSWORD';
export const RESET_PASSWORD_FAILURE = 'RESET_PASSWORD_ERROR';
export const VERIFY_RESET_PASSWORD_SUCCESS = 'VERIFY_RESET_PASSWORD_SUCCESS';
export const VERIFY_RESET_PASSWORD_FAILURE = 'VERIFY_RESET_PASSWORD_FAILURE';

export const AUTH_USER = 'AUTH_USER';
export const UNAUTH_USER = 'UNAUTH_USER';

export const FETCH_USERS = 'FETCH_USERS';
export const FETCH_CHAININFO = 'FETCH_CHAININFO';
export const FETCH_WEBSITES = 'FETCH_WEBSITES';

export const CONTACT_SEND = 'CONTACT_SEND';
export const CONTACT_RESET = 'CONTACT_RESET';

export const EMAIL_NOT_VERIFIED = 'EMAIL_NOT_VERIFIED';

export const WEBSITE_CREATE_SUCCESS = 'WEBSITE_CREATE_SUCCESS';
export const WEBSITE_CREATE_FAIL = 'WEBSITE_CREATE_FAIL';

export const WEBSITE_REMOVE_SUCCESS = 'WEBSITE_REMOVE_SUCCESS';
export const WEBSITE_REMOVE_FAIL = 'WEBSITE_REMOVE_FAIL';

export const FETCH_CHAININFO_BEGIN = 'FETCH_CHAININFO_BEGIN';
export const FETCH_CHAININFO_SUCCESS = 'FETCH_CHAININFO_SUCCESS';
export const FETCH_CHAININFO_FAILURE = 'FETCH_CHAININFO_FAILURE';

export const FETCH_WEBSITES_BEGIN = 'FETCH_WEBSITES_BEGIN';
export const FETCH_WEBSITES_SUCCESS = 'FETCH_WEBSITES_SUCCESS';
export const FETCH_WEBSITES_FAILURE = 'FETCH_WEBSITES_FAILURE';

export const FETCH_USER_COUNT = 'FETCH_USER_COUNT';
export const FETCH_REGISTERED_COUNT = 'FETCH_REGISTERED_COUNT';

// FETCH REGISTERED USERCOUNT
export const FETCH_REGISTERED_BEGIN = 'FETCH_REGISTERED_BEGIN';
export const FETCH_REGISTERED_SUCCESS = 'FETCH_REGISTERED_SUCCESS';
export const FETCH_REGISTERED_FAILURE = 'FETCH_REGISTERED_FAILURE';

// FETCH ONLINE USER COUNT
export const FETCH_ONLINE_BEGIN = 'FETCH_ONLINE_BEGIN';
export const FETCH_ONLINE_SUCCESS = 'FETCH_ONLINE_SUCCESS';
export const FETCH_ONLINE_FAILURE = 'FETCH_ONLINE_FAILURE';

export const FETCH_VOLUME_BEGIN = 'FETCH_VOLUME_BEGIN';
export const FETCH_VOLUME_SUCCESS = 'FETCH_VOLUME_SUCCESS';
export const FETCH_VOLUME_FAIL = 'FETCH_VOLUME_FAIL';

export const FETCH_SURFSTART_BEGIN = 'FETCH_SURFSTART_BEGIN';
export const FETCH_SURFSTART_SUCCESS = 'FETCH_SURFSTART_SUCCESS';
export const FETCH_SURFSTART_FAILURE = 'FETCH_SURFSTART_FAILURE';

export const FETCH_SURFCOMPLETE_BEGIN = 'FETCH_SURFCOMPLETE_BEGIN';
export const FETCH_SURFCOMPLETE_SUCCESS = 'FETCH_SURFCOMPLETE_SUCCESS';
export const FETCH_SURFCOMPLETE_FAILURE = 'FETCH_SURFCOMPLETE_FAILURE';

export const CREATE_ORDER_BEGIN = 'CREATE_ORDER_BEGIN';
export const CREATE_ORDER_SUCCESS = 'CREATE_ORDER_SUCCESS';
export const CREATE_ORDER_FAILURE = 'CREATE_ORDER_FAIL';
export const CREATE_ORDER_IDLE = 'CREATE_ORDER_IDLE';

export const FETCH_WEBSLOT_BEGIN = 'FETCH_WEBSLOT_BEGIN';
export const FETCH_WEBSLOT_FAIL = 'FETCH_WEBSLOT_FAIL';
export const FETCH_WEBSLOT_SUCCESS = 'FETCH_WEBSLOT_SUCCESS';

export const CREATE_WEBSLOT_IDLE = 'CREATE_WEBSLOT_IDLE';
export const CREATE_WEBSLOT_BEGIN = 'CREATE_WEBSLOT_BEGIN';
export const CREATE_WEBSLOT_FAIL = 'CREATE_WEBSLOT_FAIL';
export const CREATE_WEBSLOT_SUCCESS = 'CREATE_WEBSLOT_SUCCESS';

export const REMOVE_WEBSLOT_BEGIN = 'REMOVE_WEBSLOT_BEGIN';
export const REMOVE_WEBSLOT_SUCCESS = 'REMOVE_WEBSLOT_SUCCESS';
export const REMOVE_WEBSLOT_FAIL = 'REMOVE_WEBSLOT_FAIL';
export const REMOVE_WEBSLOT_IDLE = 'REMOVE_WEBSLOT_IDLE';

export const FETCH_USER_BEGIN = 'FETCH_USER_BEGIN';
export const FETCH_USER_FAIL = 'FETCH_USER_FAIL';
export const FETCH_USER_SUCCESS = 'FETCH_USER_SUCCESS';

export const ENABLE_2FA_BEGIN = 'ENABLE_2FA_BEGIN';
export const ENABLE_2FA_SUCCESS = 'ENABLE_2FA_SUCCESS';
export const ENABLE_2FA_FAIL = 'ENABLE_2FA_FAIL';
export const ENABLE_2FA_IDLE = 'ENABLE_2FA_IDLE';

export const DISABLE_2FA_BEGIN = 'DISABLE_2FA_BEGIN';
export const DISABLE_2FA_SUCCESS = 'DISABLE_2FA_SUCCESS';
export const DISABLE_2FA_FAIL = 'DISABLE_2FA_FAIL';
export const DISABLE_2FA_IDLE = 'DISABLE_2FA_IDLE';

export const CHANGE_USER_TFA_STATE = 'CHANGE_USER_TFA_STATE';
export const AUTH_USER_TFA = 'AUTH_USER_TFA';

export const CREATE_WITHDRAW_BEGIN = 'CREATE_WITHDRAW_BEGIN';
export const CREATE_WITHDRAW_SUCCESS = 'CREATE_WITHDRAW_SUCCESS';
export const CREATE_WITHDRAW_FAIL = 'CREATE_WITHDRAW_FAIL';
export const CREATE_WITHDRAW_IDLE = 'CREATE_WITHDRAW_IDLE';

export const UPDATE_TRANSACTION = 'UPDATE_TRANSACTION';
export const INSERT_TRANSACTION = 'INSERT_TRANSACTION';

export const UPDATE_WALLET = 'UPDATE_WALLET';
export const UPDATE_WEBSLOT = 'UPDATE_WEBSLOT';

export const INSERT_ORDER = 'INSERT_ORDER'; // Change to INSERT_WEBSLOT_ORDER
export const REMOVE_WEBSLOT_ORDER = 'REMOVE_WEBSLOT_ORDER';
export const INSERT_WEBSLOT = 'INSERT_WEBSLOT';
export const REMOVE_WEBSLOT = 'REMOVE_WEBSLOT';

export const FETCH_ORDER_BEGIN = 'FETCH_ORDER_BEGIN';
export const FETCH_ORDER_SUCCESS = 'FETCH_ORDER_SUCCESS';
export const FETCH_ORDER_FAIL = 'FETCH_ORDER_FAIL';

export const REMOVE_WEBSLOT_ORDER_BEGIN = 'REMOVE_WEBSLOT_ORDER_BEGIN';
export const REMOVE_WEBSLOT_ORDER_SUCCESS = 'REMOVE_WEBSLOT_ORDER_SUCCESS';
export const REMOVE_WEBSLOT_ORDER_FAIL = 'REMOVE_WEBSLOT_ORDER_FAIL';
export const REMOVE_WEBSLOT_ORDER_IDLE = 'REMOVE_WEBSLOT_ORDER_IDLE';

export const FETCH_PRICE_BEGIN = 'FETCH_PRICE_BEGIN';
export const FETCH_PRICE_SUCCESS = 'FETCH_PRICE_SUCCESS';
export const FETCH_PRICE_FAIL = 'FETCH_PRICE_FAIL';

export const BUY_WEBSLOT_BEGIN = 'BUY_WEBSLOT_BEGIN';
export const BUY_WEBSLOT_SUCCESS = 'BUY_WEBSLOT_SUCCESS';
export const BUY_WEBSLOT_FAIL = 'BUY_WEBSLOT_FAIL';
export const BUY_WEBSLOT_IDLE = 'BUY_WEBSLOT_IDLE';
export const BUY_WEBSLOT = 'BUY_WEBSLOT';

export const FETCH_JACKPOT_BEGIN = 'FETCH_JACKPOT_BEGIN';
export const FETCH_JACKPOT_SUCCESS = 'FETCH_JACKPOT_SUCCESS';
export const FETCH_JACKPOT_FAIL = 'FETCH_JACKPOT_FAIL';

export const FETCH_ADMINWITHDRAWAL_BEGIN = 'FETCH_ADMINWITHDRAWAL_BEGIN';
export const FETCH_ADMINWITHDRAWAL_FAIL = 'FETCH_ADMINWITHDRAWAL_FAIL';
export const FETCH_ADMINWITHDRAWAL_SUCCESS = 'FETCH_ADMINWITHDRAWAL_SUCCESS';

export const REJECT_WITHDRAW_BEGIN = 'REJECT_WITHDRAW_BEGIN';
export const REJECT_WITHDRAW_SUCCESS = 'REJECT_WITHDRAW_SUCCESS';
export const REJECT_WITHDRAW_FAIL = 'REJECT_WITHDRAW_FAIL';

export const ACCEPT_WITHDRAW_BEGIN = 'ACCEPT_WITHDRAW_BEGIN';
export const ACCEPT_WITHDRAW_SUCCESS = 'ACCEPT_WITHDRAW_SUCCESS';
export const ACCEPT_WITHDRAW_FAIL = 'ACCEPT_WITHDRAW_FAIL';

export const THEME_TOGGLE = 'THEME_TOGGLE';

export const ENQUEUE_SNACKBAR = 'ENQUEUE_SNACKBAR';
export const REMOVE_SNACKBAR = 'REMOVE_SNACKBAR';

export const FETCH_ACTIVITY_BEGIN = 'FETCH_ACTIVITY_BEGIN';
export const FETCH_ACTIVITY_FAIL = 'FETCH_ACTIVITY_FAIL';
export const FETCH_ACTIVITY_SUCCESS = 'FETCH_ACTIVITY_SUCCESS';

export const INSERT_ACTIVITY = 'INSERT_ACTIVITY';
export const UPDATE_JACKPOT_TICKETS = 'UPDATE_JACKPOT_TICKETS';
export const UPDATE_SURF_COUNT = 'UPDATE_SURF_COUNT';

// export const UPDATE_PRICE = 'UPDATE_PRICE';

export const FETCH_ADMINUSERLIST_BEGIN = 'FETCH_ADMINUSERLIST_BEGIN';
export const FETCH_ADMINUSERLIST_SUCCESS = 'FETCH_ADMINUSERLIST_SUCCESS';
export const FETCH_ADMINUSERLIST_FAIL = 'FETCH_ADMINUSERLIST_FAIL';

export const FETCH_ADMINUSER_BEGIN = 'FETCH_ADMINUSER_BEGIN';
export const FETCH_ADMINUSER_SUCCESS = 'FETCH_ADMINUSER_SUCCESS';
export const FETCH_ADMINUSER_FAIL = 'FETCH_ADMINUSER_FAIL';

export const FETCH_FAUCETRECORD_BEGIN = 'FETCH_FAUCETRECORD_BEGIN';
export const FETCH_FAUCETRECORD_SUCCESS = 'FETCH_FAUCETRECORD_SUCCESS';
export const FETCH_FAUCETRECORD_FAIL = 'FETCH_FAUCETRECORD_FAIL';

export const FETCH_FAUCETCLAIM_BEGIN = 'FETCH_FAUCETCLAIM_BEGIN';
export const FETCH_FAUCETCLAIM_SUCCESS = 'FETCH_FAUCETCLAIM_SUCCESS';
export const FETCH_FAUCETCLAIM_FAIL = 'FETCH_FAUCETCLAIM_FAIL';

export const FETCH_FAUCETROLLS_BEGIN = 'FETCH_FAUCETROLLS_BEGIN';
export const FETCH_FAUCETROLLS_SUCCESS = 'FETCH_FAUCETROLLS_SUCCESS';
export const FETCH_FAUCETROLLS_FAIL = 'FETCH_FAUCETROLLS_FAIL';

export const INSERT_FAUCETROLL = 'INSERT_FAUCETROLL';

export const FETCH_RECENTUSERACTIVITY_BEGIN = 'FETCH_RECENTUSERACTIVITY_BEGIN';
export const FETCH_RECENTUSERACTIVITY_SUCCESS = 'FETCH_RECENTUSERACTIVITY_SUCCESS';
export const FETCH_RECENTUSERACTIVITY_FAIL = 'FETCH_RECENTUSERACTIVITY_FAIL';

export const UPLOAD_AVATAR_BEGIN = 'UPLOAD_AVATAR_BEGIN';
export const UPLOAD_AVATAR_SUCCESS = 'UPLOAD_AVATAR_SUCCESS';
export const UPLOAD_AVATAR_FAIL = 'UPLOAD_AVATAR_FAIL';

export const UPDATE_AVATAR_PATH = 'UPDATE_AVATAR_PATH';

export const ADD_PUBLISHER_BEGIN = 'ADD_PUBLISHER_BEGIN';
export const ADD_PUBLISHER_SUCCESS = 'ADD_PUBLISHER_SUCCESS';
export const ADD_PUBLISHER_FAIL = 'ADD_PUBLISHER_FAIL';
export const ADD_PUBLISHER_IDLE = 'ADD_PUBLISHER_IDLE';

export const VERIFY_PUBLISHER_BEGIN = 'VERIFY_PUBLISHER_BEGIN';
export const VERIFY_PUBLISHER_SUCCESS = 'VERIFY_PUBLISHER_SUCCESS';
export const VERIFY_PUBLISHER_FAIL = 'VERIFY_PUBLISHER_FAIL';
export const VERIFY_PUBLISHER_IDLE = 'VERIFY_PUBLISHER_IDLE';

export const FETCH_PUBLISHER_BEGIN = 'FETCH_PUBLISHER_BEGIN';
export const FETCH_PUBLISHER_FAIL = 'FETCH_PUBLISHER_FAIL';
export const FETCH_PUBLISHER_SUCCESS = 'FETCH_PUBLISHER_SUCCESS';

export const UPDATE_PUBLISHER = 'UPDATE_PUBLISHER';
export const INSERT_PUBLISHER = 'INSERT_PUBLISHER';

export const ADD_BANNER_BEGIN = 'ADD_BANNER_BEGIN';
export const ADD_BANNER_SUCCESS = 'ADD_BANNER_SUCCESS';
export const ADD_BANNER_FAIL = 'ADD_BANNER_FAIL';
export const ADD_BANNER_IDLE = 'ADD_BANNER_IDLE';

export const FETCH_BANNER_BEGIN = 'FETCH_BANNER_BEGIN';
export const FETCH_BANNER_FAIL = 'FETCH_BANNER_FAIL';
export const FETCH_BANNER_SUCCESS = 'FETCH_BANNER_SUCCESS';

export const INSERT_BANNER = 'INSERT_BANNER';

export const FETCH_ADMINREVIEWPUBLISHERS_BEGIN = 'FETCH_ADMINREVIEWPUBLISHERS_BEGIN';
export const FETCH_ADMINREVIEWPUBLISHERS_SUCCESS = 'FETCH_ADMINREVIEWPUBLISHERS_SUCCESS';
export const FETCH_ADMINREVIEWPUBLISHERS_FAIL = 'FETCH_ADMINREVIEWPUBLISHERS_FAIL';

export const FETCH_ADMINREVIEWBANNERS_BEGIN = 'FETCH_ADMINREVIEWBANNERS_BEGIN';
export const FETCH_ADMINREVIEWBANNERS_SUCCESS = 'FETCH_ADMINREVIEWBANNERS_SUCCESS';
export const FETCH_ADMINREVIEWBANNERS_FAIL = 'FETCH_ADMINREVIEWBANNERS_FAIL';

export const FETCH_ADMINPUBLISHERS_BEGIN = 'FETCH_ADMINPUBLISHERS_BEGIN';
export const FETCH_ADMINPUBLISHERS_SUCCESS = 'FETCH_ADMINPUBLISHERS_SUCCESS';
export const FETCH_ADMINPUBLISHERS_FAIL = 'FETCH_ADMINPUBLISHERS_FAIL';

export const FETCH_ADMINBANNERS_BEGIN = 'FETCH_ADMINBANNERS_BEGIN';
export const FETCH_ADMINBANNERS_SUCCESS = 'FETCH_ADMINBANNERS_SUCCESS';
export const FETCH_ADMINBANNERS_FAIL = 'FETCH_ADMINBANNERS_FAIL';

export const UPDATE_WITHDRAW = 'UPDATE_WITHDRAW';
export const REMOVE_REVIEW_BANNER = 'REMOVE_REVIEW_BANNER';
export const REMOVE_REVIEW_PUBLISHER = 'REMOVE_REVIEW_PUBLISHER';

export const UPDATE_ADMIN_BANNER = 'UPDATE_ADMIN_BANNER';
export const UPDATE_ADMIN_PUBLISHER = 'UPDATE_ADMIN_PUBLISHER';
export const UPDATE_ADMIN_USER = 'UPDATE_ADMIN_USER';
export const UPDATE_ADMIN_DOMAIN = 'UPDATE_ADMIN_DOMAIN';

export const FETCH_ADMINDOMAINS_BEGIN = 'FETCH_ADMINDOMAINS_BEGIN';
export const FETCH_ADMINDOMAINS_SUCCESS = 'FETCH_ADMINDOMAINS_SUCCESS';
export const FETCH_ADMINDOMAINS_FAIL = 'FETCH_ADMINDOMAINS_FAIL';

export const CREATE_BANNERORDER_IDLE = 'CREATE_BANNERORDER_IDLE';
export const CREATE_BANNERORDER_BEGIN = 'CREATE_BANNERORDER_BEGIN';
export const CREATE_BANNERORDER_SUCCESS = 'CREATE_BANNERORDER_SUCCESS';
export const CREATE_BANNERORDER_FAIL = 'CREATE_BANNERORDER_FAIL';
export const INSERT_BANNER_ORDER = 'INSERT_BANNER_ORDER';

export const REMOVE_WEBSLOT_BANNER_IDLE = 'REMOVE_WEBSLOT_BANNER_IDLE';
export const REMOVE_WEBSLOT_BANNER_BEGIN = 'REMOVE_WEBSLOT_BANNER_BEGIN';
export const REMOVE_WEBSLOT_BANNER_SUCCESS = 'REMOVE_WEBSLOT_BANNER_SUCCESS';
export const REMOVE_WEBSLOT_BANNER_FAIL = 'REMOVE_WEBSLOT_BANNER_FAIL';
export const REMOVE_BANNER_ORDER = 'REMOVE_BANNER_ORDER';

export const ADD_ADZONE_IDLE = 'ADD_ADZONE_IDLE';
export const ADD_ADZONE_BEGIN = 'ADD_ADZONE_BEGIN';
export const ADD_ADZONE_SUCCESS = 'ADD_ADZONE_SUCCESS';
export const ADD_ADZONE_FAIL = 'ADD_ADZONE_FAIL';

export const FETCH_BANNERORDER_BEGIN = 'FETCH_BANNERORDER_BEGIN';
export const FETCH_BANNERORDER_SUCCESS = 'FETCH_BANNERORDER_SUCCESS';
export const FETCH_BANNERORDER_FAIL = 'FETCH_BANNERORDER_FAIL';

export const BUY_BANNERSLOT_IDLE = 'BUY_BANNERSLOT_IDLE';
export const BUY_BANNERSLOT_BEGIN = 'BUY_BANNERSLOT_BEGIN';
export const BUY_BANNERSLOT_SUCCESS = 'BUY_BANNERSLOT_SUCCESS';
export const BUY_BANNERSLOT_FAIL = 'BUY_BANNERSLOT_FAIL';
export const BUY_BANNERSLOT = 'BUY_BANNERSLOT';

export const BUY_PUBLISHERSLOT_IDLE = 'BUY_PUBLISHERSLOT_IDLE';
export const BUY_PUBLISHERSLOT_BEGIN = 'BUY_PUBLISHERSLOT_BEGIN';
export const BUY_PUBLISHERSLOT_SUCCESS = 'BUY_PUBLISHERSLOT_SUCCESS';
export const BUY_PUBLISHERSLOT_FAIL = 'BUY_PUBLISHERSLOT_FAIL';
export const BUY_PUBLISHERSLOT = 'BUY_PUBLISHERSLOT';

export const BUY_ADZONESLOT_IDLE = 'BUY_ADZONESLOT_IDLE';
export const BUY_ADZONESLOT_BEGIN = 'BUY_ADZONESLOT_BEGIN';
export const BUY_ADZONESLOT_SUCCESS = 'BUY_ADZONESLOT_SUCCESS';
export const BUY_ADZONESLOT_FAIL = 'BUY_ADZONESLOT_FAIL';
export const BUY_ADZONESLOT = 'BUY_ADZONESLOT';

export const UPDATE_JACKPOT = 'UPDATE_JACKPOT';

export const CREATE_REPORT_BEGIN = 'CREATE_REPORT_BEGIN';
export const CREATE_REPORT_FAIL = 'CREATE_REPORT_FAIL';
export const CREATE_REPORT_SUCCESS = 'CREATE_REPORT_SUCCESS';
export const CREATE_REPORT_IDLE = 'CREATE_REPORT_IDLE';

export const FETCH_PHONECODE_BEGIN = 'FETCH_PHONECODE_BEGIN';
export const FETCH_PHONECODE_SUCCESS = 'FETCH_PHONECODE_SUCCESS';
export const FETCH_PHONECODE_FAIL = 'FETCH_PHONECODE_FAIL';
export const FETCH_PHONECODE_IDLE = 'FETCH_PHONECODE_IDLE';

export const VERIFY_PHONECODE_BEGIN = 'VERIFY_PHONECODE_BEGIN';
export const VERIFY_PHONECODE_SUCCESS = 'VERIFY_PHONECODE_SUCCESS';
export const VERIFY_PHONECODE_FAIL = 'VERIFY_PHONECODE_FAIL';
export const VERIFY_PHONECODE_IDLE = 'VERIFY_PHONECODE_IDLE';

export const UPDATE_USER_PHONE = 'UPDATE_USER_PHONE';

export const UPLOAD_IDENTITY_BEGIN = 'UPLOAD_IDENTITY_BEGIN';
export const UPLOAD_IDENTITY_SUCCESS = 'UPLOAD_IDENTITY_SUCCESS';
export const UPLOAD_IDENTITY_FAIL = 'UPLOAD_IDENTITY_FAIL';
export const UPLOAD_IDENTITY_IDLE = 'UPLOAD_IDENTITY_IDLE';
export const UPDATE_USER_IDENTITY = 'UPDATE_USER_IDENTITY';

export const FETCH_SPECIFICUSER_BEGIN = 'FETCH_SPECIFICUSER_BEGIN';
export const FETCH_SPECIFICUSER_FAIL = 'FETCH_SPECIFICUSER_FAIL';
export const FETCH_SPECIFICUSER_SUCCESS = 'FETCH_SPECIFICUSER_SUCCESS';

export const POST_TRUST_BEGIN = 'POST_TRUST_BEGIN';
export const POST_TRUST_SUCCESS = 'POST_TRUST_SUCCESS';
export const POST_TRUST_FAIL = 'POST_TRUST_FAIL';

export const ADD_TRUST = 'ADD_TRUST';
export const DELETE_TRUST = 'DELETE_TRUST';

export const POST_BLOCK_BEGIN = 'POST_BLOCK_BEGIN';
export const POST_BLOCK_SUCCESS = 'POST_BLOCK_SUCCESS';
export const POST_BLOCK_FAIL = 'POST_BLOCK_FAIL';

export const ADD_BLOCK = 'ADD_BLOCK';
export const DELETE_BLOCK = 'DELETE_BLOCK';
export const UPDATE_BIO = 'UPDATE_BIO';

export const FETCH_ADMINCOUNTRIES_BEGIN = 'FETCH_ADMINCOUNTRIES_BEGIN';
export const FETCH_ADMINCOUNTRIES_SUCCESS = 'FETCH_ADMINCOUNTRIES_SUCCESS';
export const FETCH_ADMINCOUNTRIES_FAIL = 'FETCH_ADMINCOUNTRIES_FAIL';
export const UPDATE_ADMIN_COUNTRIES = 'UPDATE_ADMIN_COUNTRIES';

export const ADD_ADMINCOUNTRIES_BEGIN = 'ADD_ADMINCOUNTRIES_BEGIN';
export const ADD_ADMINCOUNTRIES_SUCCESS = 'ADD_ADMINCOUNTRIES_SUCCESS';
export const ADD_ADMINCOUNTRIES_FAIL = 'ADD_ADMINCOUNTRIES_FAIL';
export const ADD_ADMINCOUNTRY = 'ADD_ADMINCOUNTRY';

export const FETCH_ADMINCURRENCIES_BEGIN = 'FETCH_ADMINCURRENCIES_BEGIN';
export const FETCH_ADMINCURRENCIES_SUCCESS = 'FETCH_ADMINCURRENCIES_SUCCESS';
export const FETCH_ADMINCURRENCIES_FAIL = 'FETCH_ADMINCURRENCIES_FAIL';
export const UPDATE_ADMIN_CURRENCIES = 'UPDATE_ADMIN_CURRENCIES';
export const ADD_ADMINCURRENCY = 'ADD_ADMINCURRENCY';

export const ADD_ADMINCURRENCY_BEGIN = 'ADD_ADMINCURRENCY_BEGIN';
export const ADD_ADMINCURRENCY_SUCCESS = 'ADD_ADMINCURRENCY_SUCCESS';
export const ADD_ADMINCURRENCY_FAIL = 'ADD_ADMINCURRENCY_FAIL';

export const UPDATE_STORESTATUS = 'UPDATE_STORESTATUS';

export const FETCH_ADMINPAYMENTMETHOD_BEGIN = 'FETCH_ADMINPAYMENTMETHOD_BEGIN';
export const FETCH_ADMINPAYMENTMETHOD_SUCCESS = 'FETCH_ADMINPAYMENTMETHOD_SUCCESS';
export const FETCH_ADMINPAYMENTMETHOD_FAIL = 'FETCH_ADMINPAYMENTMETHOD_FAIL';
export const UPDATE_ADMIN_PAYMENTMETHOD = 'UPDATE_ADMIN_PAYMENTMETHOD';
export const ADD_ADMINPAYMENTMETHOD = 'ADD_ADMINPAYMENTMETHOD';

export const FETCH_PAYMENTMETHODS_BEGIN = 'FETCH_PAYMENTMETHODS_BEGIN';
export const FETCH_PAYMENTMETHODS_SUCCESS = 'FETCH_PAYMENTMETHODS_SUCCESS';
export const FETCH_PAYMENTMETHODS_FAIL = 'FETCH_PAYMENTMETHODS_FAIL';

export const FETCH_CURRENCIES_BEGIN = 'FETCH_CURRENCIES_BEGIN';
export const FETCH_CURRENCIES_SUCCESS = 'FETCH_CURRENCIES_SUCCESS';
export const FETCH_CURRENCIES_FAIL = 'FETCH_CURRENCIES_FAIL';

export const ADD_POSTAD_BEGIN = 'ADD_CURRENCY_BEGIN';
export const ADD_POSTAD = 'ADD_CURRENCY';

export const FETCH_POSTAD_FAIL = 'FETCH_POSTAD_FAIL';
export const FETCH_POSTAD_SUCCESS = 'FETCH_POSTAD_SUCCESS';
export const FETCH_POSTAD_BEGIN = 'FETCH_POSTAD_BEGIN';
