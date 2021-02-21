import axios from 'axios';
import {
  FETCH_ADMINWITHDRAWAL_BEGIN,
  FETCH_ADMINWITHDRAWAL_FAIL,
  FETCH_ADMINWITHDRAWAL_SUCCESS,
  FETCH_ADMINUSERLIST_BEGIN,
  FETCH_ADMINUSERLIST_SUCCESS,
  FETCH_ADMINUSERLIST_FAIL,
  ENQUEUE_SNACKBAR,
  FETCH_ADMINUSER_BEGIN,
  FETCH_ADMINUSER_SUCCESS,
  FETCH_ADMINUSER_FAIL,
  FETCH_ADMINPUBLISHERS_BEGIN,
  FETCH_ADMINPUBLISHERS_SUCCESS,
  FETCH_ADMINPUBLISHERS_FAIL,
  FETCH_ADMINBANNERS_BEGIN,
  FETCH_ADMINBANNERS_SUCCESS,
  FETCH_ADMINBANNERS_FAIL,
  FETCH_ADMINREVIEWBANNERS_BEGIN,
  FETCH_ADMINREVIEWBANNERS_SUCCESS,
  FETCH_ADMINREVIEWBANNERS_FAIL,
  FETCH_ADMINREVIEWPUBLISHERS_BEGIN,
  FETCH_ADMINREVIEWPUBLISHERS_SUCCESS,
  FETCH_ADMINREVIEWPUBLISHERS_FAIL,
  REMOVE_REVIEW_BANNER,
  REMOVE_REVIEW_PUBLISHER,
  UPDATE_ADMIN_BANNER,
  UPDATE_ADMIN_PUBLISHER,
  UPDATE_ADMIN_USER,
  UPDATE_ADMIN_DOMAIN,
  FETCH_ADMINDOMAINS_BEGIN,
  FETCH_ADMINDOMAINS_SUCCESS,
  FETCH_ADMINDOMAINS_FAIL,
  FETCH_ADMINCOUNTRIES_BEGIN,
  FETCH_ADMINCOUNTRIES_SUCCESS,
  FETCH_ADMINCOUNTRIES_FAIL,
  ADD_ADMINCOUNTRIES_BEGIN,
  ADD_ADMINCOUNTRIES_SUCCESS,
  ADD_ADMINCOUNTRIES_FAIL,
  ADD_ADMINCOUNTRY,
  FETCH_ADMINCURRENCIES_BEGIN,
  FETCH_ADMINCURRENCIES_SUCCESS,
  FETCH_ADMINCURRENCIES_FAIL,
  UPDATE_ADMIN_CURRENCIES,
  ADD_ADMINCURRENCY,
  ADD_ADMINCURRENCY_BEGIN,
  ADD_ADMINCURRENCY_SUCCESS,
  ADD_ADMINCURRENCY_FAIL,
  FETCH_ADMINPAYMENTMETHOD_BEGIN,
  FETCH_ADMINPAYMENTMETHOD_SUCCESS,
  FETCH_ADMINPAYMENTMETHOD_FAIL,
  UPDATE_ADMIN_PAYMENTMETHOD,
  ADD_ADMINPAYMENTMETHOD,
  FETCH_ADMINPENDINGIDENTITY_BEGIN,
  FETCH_ADMINPENDINGIDENTITY_SUCCESS,
  FETCH_ADMINPENDINGIDENTITY_FAIL,
  REMOVE_ADMINPENDINGIDENTITY,
  UPDATE_ADMINCURRENCY,
} from './types/index';

export function adminRejectIdentity(id) {
  return function (dispatch) {
    axios.post(`${process.env.API_URL}/admin/identity/reject`, { id })
      .then((response) => {
        dispatch({
          type: REMOVE_ADMINPENDINGIDENTITY,
          payload: response.data.identity,
        })
      }).catch((error) => {
        if (error.response) {
          // client received an error response (5xx, 4xx)
          console.log(error.response);
          dispatch({
            type: ENQUEUE_SNACKBAR,
            notification: {
              message: `${error.response.status}: ${error.response.data.error}`,
              key: new Date().getTime() + Math.random(),
              options: {
                variant: 'error',
              },
            },
          });
        } else if (error.request) {
          // client never received a response, or request never left
          dispatch({
            type: ENQUEUE_SNACKBAR,
            notification: {
              message: 'Connection Timeout',
              key: new Date().getTime() + Math.random(),
              options: {
                variant: 'error',
              },
            },
          });
        } else {
          dispatch({
            type: ENQUEUE_SNACKBAR,
            notification: {
              message: 'Unknown Error',
              key: new Date().getTime() + Math.random(),
              options: {
                variant: 'error',
              },
            },
          });
        }
      });
  }
}
export function adminAcceptIdentity(id) {
  return function (dispatch) {
    axios.post(`${process.env.API_URL}/admin/identity/accept`, { id })
      .then((response) => {
        dispatch({
          type: REMOVE_ADMINPENDINGIDENTITY,
          payload: response.data.identity,
        })
      }).catch((error) => {
        if (error.response) {
          // client received an error response (5xx, 4xx)
          console.log(error.response);
          dispatch({
            type: ENQUEUE_SNACKBAR,
            notification: {
              message: `${error.response.status}: ${error.response.data.error}`,
              key: new Date().getTime() + Math.random(),
              options: {
                variant: 'error',
              },
            },
          });
        } else if (error.request) {
          // client never received a response, or request never left
          dispatch({
            type: ENQUEUE_SNACKBAR,
            notification: {
              message: 'Connection Timeout',
              key: new Date().getTime() + Math.random(),
              options: {
                variant: 'error',
              },
            },
          });
        } else {
          dispatch({
            type: ENQUEUE_SNACKBAR,
            notification: {
              message: 'Unknown Error',
              key: new Date().getTime() + Math.random(),
              options: {
                variant: 'error',
              },
            },
          });
        }
      });
  }
}

export function fetchAdminPendingIdentityData() {
  return function (dispatch) {
    dispatch({
      type: FETCH_ADMINPENDINGIDENTITY_BEGIN,
    });
    // axios.get(`${API_URL}/user`, { headers: { authorization: user.token } })
    axios.get(`${process.env.API_URL}/admin/identity/pending`)
      .then((response) => {
        dispatch({
          type: FETCH_ADMINPENDINGIDENTITY_SUCCESS,
          payload: response.data.users,
        })
      }).catch((error) => {
        dispatch({
          type: FETCH_ADMINPENDINGIDENTITY_FAIL,
          payload: error,
        });
      });
  }
}

/**
 * Fetch Withdrawal Data
 */
export function fetchAdminWithdrawalData() {
  return function (dispatch) {
    dispatch({
      type: FETCH_ADMINWITHDRAWAL_BEGIN,
    });
    // axios.get(`${API_URL}/user`, { headers: { authorization: user.token } })
    axios.get(`${process.env.API_URL}/admin/withdrawals`)
      .then((response) => {
        dispatch({
          type: FETCH_ADMINWITHDRAWAL_SUCCESS,
          payload: response.data,
        })
      }).catch((error) => {
        dispatch({
          type: FETCH_ADMINWITHDRAWAL_FAIL,
          payload: error,
        });
      });
  }
}

/**
 * Fetch Withdrawal Data
 */
export function fetchAdminUserListData() {
  return function (dispatch) {
    dispatch({
      type: FETCH_ADMINUSERLIST_BEGIN,
    });
    // axios.get(`${API_URL}/user`, { headers: { authorization: user.token } })
    axios.get(`${process.env.API_URL}/admin/userlist`)
      .then((response) => {
        dispatch({
          type: FETCH_ADMINUSERLIST_SUCCESS,
          payload: response.data,
        });
      }).catch((error) => {
        dispatch({
          type: FETCH_ADMINUSERLIST_FAIL,
          payload: error,
        });

        if (error.response) {
          // client received an error response (5xx, 4xx)
          console.log(error.response);
          dispatch({
            type: ENQUEUE_SNACKBAR,
            notification: {
              message: `${error.response.status}: ${error.response.data.error}`,
              key: new Date().getTime() + Math.random(),
              options: {
                variant: 'error',
              },
            },
          });
        } else if (error.request) {
          // client never received a response, or request never left
          dispatch({
            type: ENQUEUE_SNACKBAR,
            notification: {
              message: 'Connection Timeout',
              key: new Date().getTime() + Math.random(),
              options: {
                variant: 'error',
              },
            },
          });
        } else {
          dispatch({
            type: ENQUEUE_SNACKBAR,
            notification: {
              message: 'Unknown Error',
              key: new Date().getTime() + Math.random(),
              options: {
                variant: 'error',
              },
            },
          });
        }
      });
  }
}

/**
 * Fetch admin user Data
 */
export function fetchAdminUserData(obj) {
  return function (dispatch) {
    dispatch({
      type: FETCH_ADMINUSER_BEGIN,
    });
    // axios.get(`${API_URL}/user`, { headers: { authorization: user.token } })
    axios.post(`${process.env.API_URL}/admin/user`, obj)
      .then((response) => {
        dispatch({
          type: FETCH_ADMINUSER_SUCCESS,
          payload: response.data,
        })
      }).catch((error) => {
        dispatch({
          type: FETCH_ADMINUSER_FAIL,
          payload: error,
        });

        if (error.response) {
          // client received an error response (5xx, 4xx)
          console.log(error.response);
          dispatch({
            type: ENQUEUE_SNACKBAR,
            notification: {
              message: `${error.response.status}: ${error.response.data.error}`,
              key: new Date().getTime() + Math.random(),
              options: {
                variant: 'error',
              },
            },
          });
        } else if (error.request) {
          // client never received a response, or request never left
          dispatch({
            type: ENQUEUE_SNACKBAR,
            notification: {
              message: 'Connection Timeout',
              key: new Date().getTime() + Math.random(),
              options: {
                variant: 'error',
              },
            },
          });
        } else {
          dispatch({
            type: ENQUEUE_SNACKBAR,
            notification: {
              message: 'Unknown Error',
              key: new Date().getTime() + Math.random(),
              options: {
                variant: 'error',
              },
            },
          });
        }
      });
  }
}

/**
 * Fetch admin user Data
 */
export function fetchAdminPublishersData() {
  return function (dispatch) {
    dispatch({
      type: FETCH_ADMINPUBLISHERS_BEGIN,
    });
    // axios.get(`${API_URL}/user`, { headers: { authorization: user.token } })
    axios.get(`${process.env.API_URL}/admin/publishers/all`)
      .then((response) => {
        dispatch({
          type: FETCH_ADMINPUBLISHERS_SUCCESS,
          payload: response.data.publishers,
        })
      }).catch((error) => {
        dispatch({
          type: FETCH_ADMINPUBLISHERS_FAIL,
          payload: error,
        });

        if (error.response) {
          // client received an error response (5xx, 4xx)
          console.log(error.response);
          dispatch({
            type: ENQUEUE_SNACKBAR,
            notification: {
              message: `${error.response.status}: ${error.response.data.error}`,
              key: new Date().getTime() + Math.random(),
              options: {
                variant: 'error',
              },
            },
          });
        } else if (error.request) {
          // client never received a response, or request never left
          dispatch({
            type: ENQUEUE_SNACKBAR,
            notification: {
              message: 'Connection Timeout',
              key: new Date().getTime() + Math.random(),
              options: {
                variant: 'error',
              },
            },
          });
        } else {
          dispatch({
            type: ENQUEUE_SNACKBAR,
            notification: {
              message: 'Unknown Error',
              key: new Date().getTime() + Math.random(),
              options: {
                variant: 'error',
              },
            },
          });
        }
      });
  }
}

/**
 * Fetch admin user Data
 */
export function fetchAdminBannersData() {
  return function (dispatch) {
    dispatch({
      type: FETCH_ADMINBANNERS_BEGIN,
    });
    // axios.get(`${API_URL}/user`, { headers: { authorization: user.token } })
    axios.get(`${process.env.API_URL}/admin/banners/all`)
      .then((response) => {
        dispatch({
          type: FETCH_ADMINBANNERS_SUCCESS,
          payload: response.data.banners,
        })
      }).catch((error) => {
        dispatch({
          type: FETCH_ADMINBANNERS_FAIL,
          payload: error,
        });

        if (error.response) {
          // client received an error response (5xx, 4xx)
          console.log(error.response);
          dispatch({
            type: ENQUEUE_SNACKBAR,
            notification: {
              message: `${error.response.status}: ${error.response.data.error}`,
              key: new Date().getTime() + Math.random(),
              options: {
                variant: 'error',
              },
            },
          });
        } else if (error.request) {
          // client never received a response, or request never left
          dispatch({
            type: ENQUEUE_SNACKBAR,
            notification: {
              message: 'Connection Timeout',
              key: new Date().getTime() + Math.random(),
              options: {
                variant: 'error',
              },
            },
          });
        } else {
          dispatch({
            type: ENQUEUE_SNACKBAR,
            notification: {
              message: 'Unknown Error',
              key: new Date().getTime() + Math.random(),
              options: {
                variant: 'error',
              },
            },
          });
        }
      });
  }
}

/**
 * Fetch admin user Data
 */
export function fetchAdminReviewBannersData() {
  return function (dispatch) {
    dispatch({
      type: FETCH_ADMINREVIEWBANNERS_BEGIN,
    });
    // axios.get(`${API_URL}/user`, { headers: { authorization: user.token } })
    axios.get(`${process.env.API_URL}/admin/banners/review`)
      .then((response) => {
        dispatch({
          type: FETCH_ADMINREVIEWBANNERS_SUCCESS,
          payload: response.data.banners,
        })
      }).catch((error) => {
        dispatch({
          type: FETCH_ADMINREVIEWBANNERS_FAIL,
          payload: error,
        });

        if (error.response) {
          // client received an error response (5xx, 4xx)
          console.log(error.response);
          dispatch({
            type: ENQUEUE_SNACKBAR,
            notification: {
              message: `${error.response.status}: ${error.response.data.error}`,
              key: new Date().getTime() + Math.random(),
              options: {
                variant: 'error',
              },
            },
          });
        } else if (error.request) {
          // client never received a response, or request never left
          dispatch({
            type: ENQUEUE_SNACKBAR,
            notification: {
              message: 'Connection Timeout',
              key: new Date().getTime() + Math.random(),
              options: {
                variant: 'error',
              },
            },
          });
        } else {
          dispatch({
            type: ENQUEUE_SNACKBAR,
            notification: {
              message: 'Unknown Error',
              key: new Date().getTime() + Math.random(),
              options: {
                variant: 'error',
              },
            },
          });
        }
      });
  }
}

/**
 * Fetch admin user Data
 */
export function fetchAdminReviewPublishersData() {
  return function (dispatch) {
    dispatch({
      type: FETCH_ADMINREVIEWPUBLISHERS_BEGIN,
    });
    // axios.get(`${API_URL}/user`, { headers: { authorization: user.token } })
    axios.get(`${process.env.API_URL}/admin/publishers/review`)
      .then((response) => {
        dispatch({
          type: FETCH_ADMINREVIEWPUBLISHERS_SUCCESS,
          payload: response.data.publishers,
        })
      }).catch((error) => {
        dispatch({
          type: FETCH_ADMINREVIEWPUBLISHERS_FAIL,
          payload: error,
        });

        if (error.response) {
          // client received an error response (5xx, 4xx)
          console.log(error.response);
          dispatch({
            type: ENQUEUE_SNACKBAR,
            notification: {
              message: `${error.response.status}: ${error.response.data.error}`,
              key: new Date().getTime() + Math.random(),
              options: {
                variant: 'error',
              },
            },
          });
        } else if (error.request) {
          // client never received a response, or request never left
          dispatch({
            type: ENQUEUE_SNACKBAR,
            notification: {
              message: 'Connection Timeout',
              key: new Date().getTime() + Math.random(),
              options: {
                variant: 'error',
              },
            },
          });
        } else {
          dispatch({
            type: ENQUEUE_SNACKBAR,
            notification: {
              message: 'Unknown Error',
              key: new Date().getTime() + Math.random(),
              options: {
                variant: 'error',
              },
            },
          });
        }
      });
  }
}

export function acceptReviewBanner(id) {
  return function (dispatch) {
    axios.post(`${process.env.API_URL}/admin/banners/review/accept`, { id })
      .then((response) => {
        dispatch({
          type: REMOVE_REVIEW_BANNER,
          payload: response.data.banners,
        })
      }).catch((error) => {
        if (error.response) {
          // client received an error response (5xx, 4xx)
          console.log(error.response);
          dispatch({
            type: ENQUEUE_SNACKBAR,
            notification: {
              message: `${error.response.status}: ${error.response.data.error}`,
              key: new Date().getTime() + Math.random(),
              options: {
                variant: 'error',
              },
            },
          });
        } else if (error.request) {
          // client never received a response, or request never left
          dispatch({
            type: ENQUEUE_SNACKBAR,
            notification: {
              message: 'Connection Timeout',
              key: new Date().getTime() + Math.random(),
              options: {
                variant: 'error',
              },
            },
          });
        } else {
          dispatch({
            type: ENQUEUE_SNACKBAR,
            notification: {
              message: 'Unknown Error',
              key: new Date().getTime() + Math.random(),
              options: {
                variant: 'error',
              },
            },
          });
        }
      });
  }
}

export function rejectReviewBanner(id) {
  return function (dispatch) {
    axios.post(`${process.env.API_URL}/admin/banners/review/reject`, { id })
      .then((response) => {
        dispatch({
          type: REMOVE_REVIEW_BANNER,
          payload: response.data.banners,
        })
      }).catch((error) => {
        if (error.response) {
          // client received an error response (5xx, 4xx)
          console.log(error.response);
          dispatch({
            type: ENQUEUE_SNACKBAR,
            notification: {
              message: `${error.response.status}: ${error.response.data.error}`,
              key: new Date().getTime() + Math.random(),
              options: {
                variant: 'error',
              },
            },
          });
        } else if (error.request) {
          // client never received a response, or request never left
          dispatch({
            type: ENQUEUE_SNACKBAR,
            notification: {
              message: 'Connection Timeout',
              key: new Date().getTime() + Math.random(),
              options: {
                variant: 'error',
              },
            },
          });
        } else {
          dispatch({
            type: ENQUEUE_SNACKBAR,
            notification: {
              message: 'Unknown Error',
              key: new Date().getTime() + Math.random(),
              options: {
                variant: 'error',
              },
            },
          });
        }
      });
  }
}

export function rejectReviewPublisher(id) {
  return function (dispatch) {
    axios.post(`${process.env.API_URL}/admin/publishers/review/reject`, { id })
      .then((response) => {
        dispatch({
          type: REMOVE_REVIEW_PUBLISHER,
          payload: response.data.publishers,
        })
      }).catch((error) => {
        if (error.response) {
          // client received an error response (5xx, 4xx)
          console.log(error.response);
          dispatch({
            type: ENQUEUE_SNACKBAR,
            notification: {
              message: `${error.response.status}: ${error.response.data.error}`,
              key: new Date().getTime() + Math.random(),
              options: {
                variant: 'error',
              },
            },
          });
        } else if (error.request) {
          // client never received a response, or request never left
          dispatch({
            type: ENQUEUE_SNACKBAR,
            notification: {
              message: 'Connection Timeout',
              key: new Date().getTime() + Math.random(),
              options: {
                variant: 'error',
              },
            },
          });
        } else {
          dispatch({
            type: ENQUEUE_SNACKBAR,
            notification: {
              message: 'Unknown Error',
              key: new Date().getTime() + Math.random(),
              options: {
                variant: 'error',
              },
            },
          });
        }
      });
  }
}

export function acceptReviewPublisher(id) {
  return function (dispatch) {
    axios.post(`${process.env.API_URL}/admin/publishers/review/accept`, { id })
      .then((response) => {
        console.log(response);
        dispatch({
          type: REMOVE_REVIEW_PUBLISHER,
          payload: response.data.publishers,
        })
      }).catch((error) => {
        if (error.response) {
          // client received an error response (5xx, 4xx)
          console.log(error.response);
          dispatch({
            type: ENQUEUE_SNACKBAR,
            notification: {
              message: `${error.response.status}: ${error.response.data.error}`,
              key: new Date().getTime() + Math.random(),
              options: {
                variant: 'error',
              },
            },
          });
        } else if (error.request) {
          // client never received a response, or request never left
          dispatch({
            type: ENQUEUE_SNACKBAR,
            notification: {
              message: 'Connection Timeout',
              key: new Date().getTime() + Math.random(),
              options: {
                variant: 'error',
              },
            },
          });
        } else {
          dispatch({
            type: ENQUEUE_SNACKBAR,
            notification: {
              message: 'Unknown Error',
              key: new Date().getTime() + Math.random(),
              options: {
                variant: 'error',
              },
            },
          });
        }
      });
  }
}

export function banAdminBanner(id) {
  return function (dispatch) {
    axios.post(`${process.env.API_URL}/admin/banners/ban`, { id })
      .then((response) => {
        dispatch({
          type: UPDATE_ADMIN_BANNER,
          payload: response.data.banners,
        })
      }).catch((error) => {
        if (error.response) {
          // client received an error response (5xx, 4xx)
          console.log(error.response);
          dispatch({
            type: ENQUEUE_SNACKBAR,
            notification: {
              message: `${error.response.status}: ${error.response.data.error}`,
              key: new Date().getTime() + Math.random(),
              options: {
                variant: 'error',
              },
            },
          });
        } else if (error.request) {
          // client never received a response, or request never left
          dispatch({
            type: ENQUEUE_SNACKBAR,
            notification: {
              message: 'Connection Timeout',
              key: new Date().getTime() + Math.random(),
              options: {
                variant: 'error',
              },
            },
          });
        } else {
          dispatch({
            type: ENQUEUE_SNACKBAR,
            notification: {
              message: 'Unknown Error',
              key: new Date().getTime() + Math.random(),
              options: {
                variant: 'error',
              },
            },
          });
        }
      });
  }
}

export function banAdminPublisher(id) {
  return function (dispatch) {
    axios.post(`${process.env.API_URL}/admin/publishers/ban`, { id })
      .then((response) => {
        dispatch({
          type: UPDATE_ADMIN_PUBLISHER,
          payload: response.data.publishers,
        })
      }).catch((error) => {
        if (error.response) {
          // client received an error response (5xx, 4xx)
          console.log(error.response);
          dispatch({
            type: ENQUEUE_SNACKBAR,
            notification: {
              message: `${error.response.status}: ${error.response.data.error}`,
              key: new Date().getTime() + Math.random(),
              options: {
                variant: 'error',
              },
            },
          });
        } else if (error.request) {
          // client never received a response, or request never left
          dispatch({
            type: ENQUEUE_SNACKBAR,
            notification: {
              message: 'Connection Timeout',
              key: new Date().getTime() + Math.random(),
              options: {
                variant: 'error',
              },
            },
          });
        } else {
          dispatch({
            type: ENQUEUE_SNACKBAR,
            notification: {
              message: 'Unknown Error',
              key: new Date().getTime() + Math.random(),
              options: {
                variant: 'error',
              },
            },
          });
        }
      });
  }
}

export function banAdminUser(id) {
  return function (dispatch) {
    axios.post(`${process.env.API_URL}/admin/users/ban`, { id })
      .then((response) => {
        dispatch({
          type: UPDATE_ADMIN_USER,
          payload: response.data.users,
        })
      }).catch((error) => {
        if (error.response) {
          // client received an error response (5xx, 4xx)
          console.log(error.response);
          dispatch({
            type: ENQUEUE_SNACKBAR,
            notification: {
              message: `${error.response.status}: ${error.response.data.error}`,
              key: new Date().getTime() + Math.random(),
              options: {
                variant: 'error',
              },
            },
          });
        } else if (error.request) {
          // client never received a response, or request never left
          dispatch({
            type: ENQUEUE_SNACKBAR,
            notification: {
              message: 'Connection Timeout',
              key: new Date().getTime() + Math.random(),
              options: {
                variant: 'error',
              },
            },
          });
        } else {
          dispatch({
            type: ENQUEUE_SNACKBAR,
            notification: {
              message: 'Unknown Error',
              key: new Date().getTime() + Math.random(),
              options: {
                variant: 'error',
              },
            },
          });
        }
      });
  }
}

export function banAdminDomain(id) {
  return function (dispatch) {
    axios.post(`${process.env.API_URL}/admin/domains/ban`, { id })
      .then((response) => {
        dispatch({
          type: UPDATE_ADMIN_DOMAIN,
          payload: response.data.domains,
        })
      }).catch((error) => {
        if (error.response) {
          // client received an error response (5xx, 4xx)
          console.log(error.response);
          dispatch({
            type: ENQUEUE_SNACKBAR,
            notification: {
              message: `${error.response.status}: ${error.response.data.error}`,
              key: new Date().getTime() + Math.random(),
              options: {
                variant: 'error',
              },
            },
          });
        } else if (error.request) {
          // client never received a response, or request never left
          dispatch({
            type: ENQUEUE_SNACKBAR,
            notification: {
              message: 'Connection Timeout',
              key: new Date().getTime() + Math.random(),
              options: {
                variant: 'error',
              },
            },
          });
        } else {
          dispatch({
            type: ENQUEUE_SNACKBAR,
            notification: {
              message: 'Unknown Error',
              key: new Date().getTime() + Math.random(),
              options: {
                variant: 'error',
              },
            },
          });
        }
      });
  }
}

/**
 * Fetch Withdrawal Data
 */

export function fetchAdminDomains() {
  return function (dispatch) {
    dispatch({
      type: FETCH_ADMINDOMAINS_BEGIN,
    });
    // axios.get(`${API_URL}/user`, { headers: { authorization: user.token } })
    axios.get(`${process.env.API_URL}/admin/domains/all`)
      .then((response) => {
        dispatch({
          type: FETCH_ADMINDOMAINS_SUCCESS,
          payload: response.data.domains,
        });
      }).catch((error) => {
        dispatch({
          type: FETCH_ADMINDOMAINS_FAIL,
          payload: error,
        });

        if (error.response) {
          // client received an error response (5xx, 4xx)
          console.log(error.response);
          dispatch({
            type: ENQUEUE_SNACKBAR,
            notification: {
              message: `${error.response.status}: ${error.response.data.error}`,
              key: new Date().getTime() + Math.random(),
              options: {
                variant: 'error',
              },
            },
          });
        } else if (error.request) {
          // client never received a response, or request never left
          dispatch({
            type: ENQUEUE_SNACKBAR,
            notification: {
              message: 'Connection Timeout',
              key: new Date().getTime() + Math.random(),
              options: {
                variant: 'error',
              },
            },
          });
        } else {
          dispatch({
            type: ENQUEUE_SNACKBAR,
            notification: {
              message: 'Unknown Error',
              key: new Date().getTime() + Math.random(),
              options: {
                variant: 'error',
              },
            },
          });
        }
      });
  }
}

export function fetchAdminCountryData() {
  return function (dispatch) {
    dispatch({
      type: FETCH_ADMINCOUNTRIES_BEGIN,
    });
    // axios.get(`${API_URL}/user`, { headers: { authorization: user.token } })
    axios.get(`${process.env.API_URL}/admin/countries/all`)
      .then((response) => {
        dispatch({
          type: FETCH_ADMINCOUNTRIES_SUCCESS,
          payload: response.data.countries,
        });
      }).catch((error) => {
        dispatch({
          type: FETCH_ADMINCOUNTRIES_FAIL,
          payload: error,
        });

        if (error.response) {
          // client received an error response (5xx, 4xx)
          console.log(error.response);
          dispatch({
            type: ENQUEUE_SNACKBAR,
            notification: {
              message: `${error.response.status}: ${error.response.data.error}`,
              key: new Date().getTime() + Math.random(),
              options: {
                variant: 'error',
              },
            },
          });
        } else if (error.request) {
          // client never received a response, or request never left
          dispatch({
            type: ENQUEUE_SNACKBAR,
            notification: {
              message: 'Connection Timeout',
              key: new Date().getTime() + Math.random(),
              options: {
                variant: 'error',
              },
            },
          });
        } else {
          dispatch({
            type: ENQUEUE_SNACKBAR,
            notification: {
              message: 'Unknown Error',
              key: new Date().getTime() + Math.random(),
              options: {
                variant: 'error',
              },
            },
          });
        }
      });
  }
}

export function addAdminCountry(obj) {
  return function (dispatch) {
    dispatch({
      type: ADD_ADMINCOUNTRIES_BEGIN,
    });
    // axios.get(`${API_URL}/user`, { headers: { authorization: user.token } })
    axios.post(`${process.env.API_URL}/admin/countries/add`, obj)
      .then((response) => {
        dispatch({
          type: ADD_ADMINCOUNTRIES_SUCCESS,
          payload: response.data.countries,
        });
        dispatch({
          type: ADD_ADMINCOUNTRY,
          payload: response.data.countries,
        });
        dispatch({
          type: ENQUEUE_SNACKBAR,
          notification: {
            message: 'Success: added country',
            key: new Date().getTime() + Math.random(),
            options: {
              variant: 'success',
            },
          },
        });
      }).catch((error) => {
        dispatch({
          type: ADD_ADMINCOUNTRIES_FAIL,
          payload: error,
        });

        if (error.response) {
          // client received an error response (5xx, 4xx)
          console.log(error.response);
          dispatch({
            type: ENQUEUE_SNACKBAR,
            notification: {
              message: `${error.response.status}: ${error.response.data.error}`,
              key: new Date().getTime() + Math.random(),
              options: {
                variant: 'error',
              },
            },
          });
        } else if (error.request) {
          // client never received a response, or request never left
          dispatch({
            type: ENQUEUE_SNACKBAR,
            notification: {
              message: 'Connection Timeout',
              key: new Date().getTime() + Math.random(),
              options: {
                variant: 'error',
              },
            },
          });
        } else {
          dispatch({
            type: ENQUEUE_SNACKBAR,
            notification: {
              message: 'Unknown Error',
              key: new Date().getTime() + Math.random(),
              options: {
                variant: 'error',
              },
            },
          });
        }
      });
  }
}

export function fetchAdminCurrencyData() {
  return function (dispatch) {
    dispatch({
      type: FETCH_ADMINCURRENCIES_BEGIN,
    });
    // axios.get(`${API_URL}/user`, { headers: { authorization: user.token } })
    axios.get(`${process.env.API_URL}/admin/currencies/all`)
      .then((response) => {
        dispatch({
          type: FETCH_ADMINCURRENCIES_SUCCESS,
          payload: response.data.currencies,
        });
      }).catch((error) => {
        dispatch({
          type: FETCH_ADMINCURRENCIES_FAIL,
          payload: error,
        });

        if (error.response) {
          // client received an error response (5xx, 4xx)
          console.log(error.response);
          dispatch({
            type: ENQUEUE_SNACKBAR,
            notification: {
              message: `${error.response.status}: ${error.response.data.error}`,
              key: new Date().getTime() + Math.random(),
              options: {
                variant: 'error',
              },
            },
          });
        } else if (error.request) {
          // client never received a response, or request never left
          dispatch({
            type: ENQUEUE_SNACKBAR,
            notification: {
              message: 'Connection Timeout',
              key: new Date().getTime() + Math.random(),
              options: {
                variant: 'error',
              },
            },
          });
        } else {
          dispatch({
            type: ENQUEUE_SNACKBAR,
            notification: {
              message: 'Unknown Error',
              key: new Date().getTime() + Math.random(),
              options: {
                variant: 'error',
              },
            },
          });
        }
      });
  }
}

export function addAdminCurrency(obj) {
  return function (dispatch) {
    dispatch({
      type: ADD_ADMINCURRENCY_BEGIN,
    });
    // axios.get(`${API_URL}/user`, { headers: { authorization: user.token } })
    axios.post(`${process.env.API_URL}/admin/currencies/add`, obj)
      .then((response) => {
        console.log(response.data.currencies);
        dispatch({
          type: ADD_ADMINCURRENCY,
          payload: response.data.currencies,
        });
        dispatch({
          type: ENQUEUE_SNACKBAR,
          notification: {
            message: 'Success: added currency',
            key: new Date().getTime() + Math.random(),
            options: {
              variant: 'success',
            },
          },
        });
      }).catch((error) => {
        dispatch({
          type: ADD_ADMINCURRENCY_FAIL,
          payload: error,
        });

        if (error.response) {
          // client received an error response (5xx, 4xx)
          console.log(error.response);
          dispatch({
            type: ENQUEUE_SNACKBAR,
            notification: {
              message: `${error.response.status}: ${error.response.data.error}`,
              key: new Date().getTime() + Math.random(),
              options: {
                variant: 'error',
              },
            },
          });
        } else if (error.request) {
          // client never received a response, or request never left
          dispatch({
            type: ENQUEUE_SNACKBAR,
            notification: {
              message: 'Connection Timeout',
              key: new Date().getTime() + Math.random(),
              options: {
                variant: 'error',
              },
            },
          });
        } else {
          dispatch({
            type: ENQUEUE_SNACKBAR,
            notification: {
              message: 'Unknown Error',
              key: new Date().getTime() + Math.random(),
              options: {
                variant: 'error',
              },
            },
          });
        }
      });
  }
}

export function fetchAdminPaymentMethodData() {
  return function (dispatch) {
    dispatch({
      type: FETCH_ADMINPAYMENTMETHOD_BEGIN,
    });
    // axios.get(`${API_URL}/user`, { headers: { authorization: user.token } })
    axios.get(`${process.env.API_URL}/admin/paymentmethod/all`)
      .then((response) => {
        console.log('response.data.paymentMethod');
        console.log('response.data.paymentMethod');
        console.log('response.data.paymentMethod');
        console.log('response.data.paymentMethod');
        console.log('response.data.paymentMethod');
        console.log('response.data.paymentMethod');
        console.log('response.data.paymentMethod');
        console.log('response.data.paymentMethod');
        console.log('response.data.paymentMethod');
        console.log(response.data.paymentMethod);
        dispatch({
          type: FETCH_ADMINPAYMENTMETHOD_SUCCESS,
          payload: response.data.paymentMethod,
        });
      }).catch((error) => {
        dispatch({
          type: FETCH_ADMINPAYMENTMETHOD_FAIL,
          payload: error,
        });

        if (error.response) {
          // client received an error response (5xx, 4xx)
          console.log(error.response);
          dispatch({
            type: ENQUEUE_SNACKBAR,
            notification: {
              message: `${error.response.status}: ${error.response.data.error}`,
              key: new Date().getTime() + Math.random(),
              options: {
                variant: 'error',
              },
            },
          });
        } else if (error.request) {
          // client never received a response, or request never left
          dispatch({
            type: ENQUEUE_SNACKBAR,
            notification: {
              message: 'Connection Timeout',
              key: new Date().getTime() + Math.random(),
              options: {
                variant: 'error',
              },
            },
          });
        } else {
          dispatch({
            type: ENQUEUE_SNACKBAR,
            notification: {
              message: 'Unknown Error',
              key: new Date().getTime() + Math.random(),
              options: {
                variant: 'error',
              },
            },
          });
        }
      });
  }
}

export function updateCurrency(id, name, iso) {
  return function (dispatch) {
    // axios.get(`${API_URL}/user`, { headers: { authorization: user.token } })
    console.log(id);
    console.log(name);
    console.log(iso);
    axios.post(`${process.env.API_URL}/admin/currency/update`, { id, name, iso })
      .then((response) => {
        console.log('response.data.currency');
        console.log(response.data.currency);
        dispatch({
          type: UPDATE_ADMINCURRENCY,
          payload: response.data.currency,
        });
        dispatch({
          type: ENQUEUE_SNACKBAR,
          notification: {
            message: 'Success: update currency',
            key: new Date().getTime() + Math.random(),
            options: {
              variant: 'success',
            },
          },
        });
      }).catch((error) => {
        if (error.response) {
          // client received an error response (5xx, 4xx)
          console.log(error.response);
          dispatch({
            type: ENQUEUE_SNACKBAR,
            notification: {
              message: `${error.response.status}: ${error.response.data.error}`,
              key: new Date().getTime() + Math.random(),
              options: {
                variant: 'error',
              },
            },
          });
        } else if (error.request) {
          // client never received a response, or request never left
          dispatch({
            type: ENQUEUE_SNACKBAR,
            notification: {
              message: 'Connection Timeout',
              key: new Date().getTime() + Math.random(),
              options: {
                variant: 'error',
              },
            },
          });
        } else {
          dispatch({
            type: ENQUEUE_SNACKBAR,
            notification: {
              message: 'Unknown Error',
              key: new Date().getTime() + Math.random(),
              options: {
                variant: 'error',
              },
            },
          });
        }
      });
  }
}

export function addAdminPaymentMethod(obj) {
  return function (dispatch) {
    dispatch({
      type: ADD_ADMINCURRENCY_BEGIN,
    });
    // axios.get(`${API_URL}/user`, { headers: { authorization: user.token } })
    axios.post(`${process.env.API_URL}/admin/paymentmethod/add`, obj)
      .then((response) => {
        console.log('response.data.paymentMethod');
        console.log(response.data.paymentMethod);
        dispatch({
          type: ADD_ADMINPAYMENTMETHOD,
          payload: response.data.paymentMethod,
        });
        dispatch({
          type: ENQUEUE_SNACKBAR,
          notification: {
            message: 'Success: added paymentMethod',
            key: new Date().getTime() + Math.random(),
            options: {
              variant: 'success',
            },
          },
        });
      }).catch((error) => {
        if (error.response) {
          // client received an error response (5xx, 4xx)
          console.log(error.response);
          dispatch({
            type: ENQUEUE_SNACKBAR,
            notification: {
              message: `${error.response.status}: ${error.response.data.error}`,
              key: new Date().getTime() + Math.random(),
              options: {
                variant: 'error',
              },
            },
          });
        } else if (error.request) {
          // client never received a response, or request never left
          dispatch({
            type: ENQUEUE_SNACKBAR,
            notification: {
              message: 'Connection Timeout',
              key: new Date().getTime() + Math.random(),
              options: {
                variant: 'error',
              },
            },
          });
        } else {
          dispatch({
            type: ENQUEUE_SNACKBAR,
            notification: {
              message: 'Unknown Error',
              key: new Date().getTime() + Math.random(),
              options: {
                variant: 'error',
              },
            },
          });
        }
      });
  }
}
