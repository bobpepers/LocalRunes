import axios from 'axios';
import db from '../models';

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

      io.emit('updatePrice', price);
    }
    console.log('updated price');
    return;
  } catch (error) {
    console.error(error);
  }
};

export default updatePrice;
