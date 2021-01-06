import db from '../models';

const fs = require('fs').promises;
const sharp = require('sharp');
const { Sequelize, Transaction, Op } = require('sequelize');

export const uploadIdentity = async (req, res, next) => {
  console.log('5555555555555555555');
  console.log(req.files);
  console.log('55555555555555555556');
  console.log(req.files.front[0].filename);
  console.log('55555555555555555557');
  console.log(req.files.back[0].filename);

  try {
    await fs.mkdir(`${process.cwd()}/uploads/identity/${req.user.username}`);
  } catch (error) {
    if (error.code === 'EEXIST') {
      // Something already exists, but is it a file or directory?
      const lstat = await fs.lstat(`${process.cwd()}/uploads/identity/${req.user.username}`);

      if (!lstat.isDirectory()) {
        throw error;
      }
    } else {
      throw error;
    }
  }
  await db.sequelize.transaction({
    isolationLevel: Transaction.ISOLATION_LEVELS.SERIALIZABLE,
  }, async (t) => {
    let dataFront;
    let dataBack;
    try {
      dataFront = await fs.readFile(`${process.cwd()}/uploads/temp/${req.files.front[0].filename}`);
    } catch (err) {
      throw new Error('FRONT_NOT_FOUND');
    }
    try {
      dataBack = await fs.readFile(`${process.cwd()}/uploads/temp/${req.files.back[0].filename}`);
    } catch (err) {
      throw new Error('BACK_NOT_FOUND');
    }
    try {
      await sharp(dataFront).toFile(`${process.cwd()}/uploads/identity/${req.user.username}/${req.files.front[0].filename}`);
    } catch (err) {
      throw new Error('ERROR_RESIZE_IMAGE');
    }
    try {
      await sharp(dataBack).toFile(`${process.cwd()}/uploads/identity/${req.user.username}/${req.files.back[0].filename}`);
    } catch (err) {
      throw new Error('ERROR_RESIZE_IMAGE');
    }
    try {
      await fs.unlink(`${process.cwd()}/uploads/temp/${req.files.front[0].filename}`);
    } catch (err) {
      throw new Error('UNABLE_TO_REMOVE_TEMP');
    }
    try {
      await fs.unlink(`${process.cwd()}/uploads/temp/${req.files.back[0].filename}`);
    } catch (err) {
      throw new Error('UNABLE_TO_REMOVE_TEMP');
    }
    const user = await db.user.findOne({
      where: {
        id: req.user.id,
      },
      transaction: t,
      lock: t.LOCK.UPDATE,
    });
    if (!user) {
      throw new Error('USER_NOT_FOUND');
    }
    if (user.identityVerified === 'pending' || user.identityVerified === 'accepted') {
      throw new Error('ALREADY_PENDING_OR_ACCEPTED');
    }
    if (user.identityVerified === 'rejected') {
      try {
        await fs.unlink(`${process.cwd()}/uploads/identity/${req.user.username}/${req.files.front[0].filename}`);
      } catch (err) {
        // throw new Error('UNABLE_TO_REMOVE_TEMP');
      }
      try {
        await fs.unlink(`${process.cwd()}/uploads/identity/${req.user.username}/${req.files.front[0].filename}`);
      } catch (err) {
        // throw new Error('UNABLE_TO_REMOVE_TEMP');
      }
    }
    const updatedUser = await user.update({
      identityFront: `${req.files.front[0].filename}`,
      identityBack: `${req.files.back[0].filename}`,
      identityVerified: 'pending',
    }, {
      transaction: t,
      lock: t.LOCK.UPDATE,
    });
    res.locals.identityFront = updatedUser.identityFront;
    res.locals.identityBack = updatedUser.identityBack;
    res.locals.identityVerified = updatedUser.identityVerified;
    t.afterCommit(() => {
      next();
    });
  }).catch((err) => {
    res.locals.error = err.message;
    next();
  });
};

export const placeholder = async (req, res, next) => {
  console.log('upload avatar 3 ');
  next();
};
