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
        const createFirstRecord = await db.priceInfo.findOrCreate({
          where: {
            currency: currency.iso,
          },
          defaults: {
            price: "0",
            currency: currency.iso,
          },
        });
        if (!createFirstRecord) {
          console.log('already exists');
        } else {
          console.log('Created...');
        }
      });

      const currentPrice = await db.priceInfo.findOne({
        where: {
          id: 1,
        },
      });

      currencies.forEach(async (currency) => {
        if (currency.iso !== null || currency.iso !== "USD") {
          await db.sequelize.transaction({
            isolationLevel: Transaction.ISOLATION_LEVELS.SERIALIZABLE,
          }, async (t) => {
            const priceRecord = await db.priceInfo.findOne({
              where: {
                currency: currency.iso,
              },
              transaction: t,
              lock: t.LOCK.UPDATE,
            });
            if (priceRecord) {
              const options = {
                method: 'GET',
                url: 'https://currency-exchange.p.rapidapi.com/exchange',
                params: { from: 'USD', to: currency.iso, q: '1.0' },
                headers: {
                  'x-rapidapi-key': '8528ecd0edmsh41097fa10b02dfep1924ddjsn50d8487ba8c9',
                  'x-rapidapi-host': 'currency-exchange.p.rapidapi.com',
                },
              };
              axios.request(options).then((response) => {
                console.log('response.data');
                console.log(response.data);
                priceRecord.update({
                  price: (Number(currentPrice.price) * Number(response.data)).toFixed(8).toString(),
                });
              }).catch((error) => {
                console.error(error);
              });
            }
            const priceRecords = await db.priceInfo.findAll({});
            io.emit('updatePrice', priceRecords);
            t.afterCommit(() => {
              console.log('commited');
            });
          });
        }
      });
    }
    console.log('updated price');
    return;
  } catch (error) {
    console.error(error);
  }
};

export default updatePrice;
