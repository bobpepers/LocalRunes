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
    const data = await axios.get("https://api.coinpaprika.com/v1/tickers/runes-runebase");
    console.log('data');
    console.log('data');
    console.log('data');
    console.log('data');
    console.log('data');
    console.log('data');
    console.log('data');
    console.log('data');
    console.log('data');
    console.log('data');
    console.log('data');
    console.log('data');
    console.log('data');
    console.log('data');
    console.log('data');
    console.log('data');
    console.log('data');
    console.log('data');
    console.log('data');
    console.log('data');
    console.log('data');
    console.log('data');
    console.log('data');
    console.log('data');
    console.log('data');
    console.log('data');
    console.log('data');
    console.log('data');
    console.log('data');
    console.log('data');
    console.log('data');
    console.log('data');
    console.log('data');
    console.log('data');
    console.log('data');
    console.log('data');
    console.log('data');
    console.log('data');
    console.log('data');
    console.log('data');
    console.log('data');
    console.log('data');
    console.log('data');
    console.log('data');
    console.log('data');
    console.log('data');
    console.log('data');
    console.log('data');
    console.log('data');
    console.log('data');
    console.log('data');
    console.log('data');
    console.log('data');
    console.log('data');
    console.log('data');
    console.log('data');
    console.log('data');
    console.log('data');
    console.log('data');
    console.log('data');
    console.log('data');
    console.log('data');
    console.log('data');
    console.log('data');
    console.log('data');
    console.log(data);
    console.log(data.data.quotes);
    console.log(data.data.quotes.USD);
    console.log(data.data.quotes.USD.price);
    if (data.data) {
      const priceInfo = await db.priceInfo.findOne({
        where: {
          id: 1,
        },
      });

      if (!priceInfo) {
        throw new Error('PRICE_INFO_NOT_FOUND');
      }

      const margin = await db.priceMargin.findAll({
        limit: 1,
        order: [['createdAt', 'DESC']],
      });

      const newPrice = Number(data.data.quotes.USD.price) + ((Number(data.data.quotes.USD.price) / 100) * Number(margin[0].value));

      console.log('newPrice');
      console.log('newPrice');
      console.log('newPrice');
      console.log('newPrice');
      console.log('newPrice');
      console.log('newPrice');
      console.log('newPrice');
      console.log('newPrice');
      console.log('newPrice');
      console.log('newPrice');
      console.log('newPrice');
      console.log('newPrice');
      console.log('newPrice');
      console.log('newPrice');
      console.log('newPrice');
      console.log('newPrice');
      console.log('newPrice');
      console.log('newPrice');

      console.log('newPrice');
      console.log(margin);
      console.log(margin[0].value);
      console.log(data.data.quotes.USD.price);

      console.log(newPrice);

      const price = await priceInfo.update({
        price: newPrice.toFixed(8).toString(),
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
        url: 'https://openexchangerates.org/api/latest.json?app_id=7fe614bf9a0f4d8cb7dd72a468a9ef59&show_alternative=1',
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

      setTimeout(() => {
        Promise.all(promises).then(async () => {
          const priceRecords = await db.priceInfo.findAll({});
          console.log(priceRecords);
          io.emit('updatePrice', priceRecords);
        });
      }, 5000);
    }
    console.log('updated price');
    return;
  } catch (error) {
    console.error(error);
  }
};

export default updatePrice;
