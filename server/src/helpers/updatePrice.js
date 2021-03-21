import axios from 'axios';
import db from '../models';

const { Sequelize, Transaction, Op } = require('sequelize');

const updatePrice = async (io) => {
  try {
    const createFirstRecord = await db.priceInfo.findOrCreate({
      where: {
        id: 1,
      },
      defaults: {
        id: 1,
        price: "0",
        currency: "USD",
      },
    });

    if (!createFirstRecord) {
      console.log('already exists');
    } else {
      console.log('Created...');
    }

    // Get data from coinpaprika
    const data = await axios.get("https://api.coinpaprika.com/v1/ticker/runes-runebase");
    if (data.data) {
      const priceInfo = await db.priceInfo.findOne({
        where: {
          id: 1,
        },
      });

      if (!priceInfo) {
        throw new Error('PRICE_INFO_NOT_FOUND');
      }

      const price = await priceInfo.update({
        price: data.data.price_usd,
      });

      const currencies = await db.currency.findAll({ });
      console.log(currencies);
      currencies.forEach(async (currency) => {
        console.log('loop1');
        if (currency.iso !== null || currency.iso !== "USD") {
          const createFirstRecord = await db.priceInfo.findOrCreate({
            where: {
              currency: currency.iso,
            },
            defaults: {
              price: "0",
              currency: currency.iso,
            },
          });
          console.log(currency.iso);
          if (!createFirstRecord) {
            console.log('already exists');
          } else {
            console.log('Created...');
          }
        }
      });

      const currentPrice = await db.priceInfo.findOne({
        where: {
          id: 1,
        },
      });

      const promises = [];

      const openExchangeOptions = {
        method: 'GET',
        url: 'https://openexchangerates.org/api/latest.json?app_id=7fe614bf9a0f4d8cb7dd72a468a9ef59',
      };

      axios.request(openExchangeOptions).then(async (response) => {
        console.log('response.data.openExchangeRates');
        console.log(response.data.rates);
        Object.keys(response.data.rates).forEach(async (currency) => {
          console.log('loop 2');
          const currenciesExist = await db.currency.findOne({
            where: {
              iso: currency,
            },
          });
          if (currenciesExist) {
            console.log(currency);
            console.log(currency, response.data.rates[currency]);
            const priceRecord = await db.priceInfo.update({
              price: (Number(currentPrice.price) * Number(response.data.rates[currency])).toFixed(8).toString(),
            }, {
              where: {
                currency,
              },
            });
          }
        });
      }).catch((error) => {
        console.error(error);
      });

      // currencies.forEach(async (currency) => {
      //  console.log('loop 2');
      //  if (currency.iso !== null || currency.iso !== "USD") {
      //    const options = {
      //      method: 'GET',
      //      url: 'https://currency-exchange.p.rapidapi.com/exchange',
      //      params: { from: 'USD', to: currency.iso, q: '1.0' },
      //      headers: {
      //        'x-rapidapi-key': '8528ecd0edmsh41097fa10b02dfep1924ddjsn50d8487ba8c9',
      //        'x-rapidapi-host': 'currency-exchange.p.rapidapi.com',
      //      },
      //    };
      //    promises.push(
      //      axios.request(options).then(async (response) => {
      //        console.log('response.data');
      //        console.log(response.data);
      //       const priceRecord = await db.priceInfo.update({
      //          price: (Number(currentPrice.price) * Number(response.data)).toFixed(8).toString(),
      //        }, {
      //          where: {
      //            currency: currency.iso,
      //          },
      //        });
      //      }).catch((error) => {
      //        console.error(error);
      //      }),
      //    );
      //  }
      // });

      Promise.all(promises).then(async () => {
        const priceRecords = await db.priceInfo.findAll({});
        console.log(priceRecords);
        io.emit('updatePrice', priceRecords);
      });
    }
    console.log('updated price');
    return;
  } catch (error) {
    console.error(error);
  }
};

export default updatePrice;
