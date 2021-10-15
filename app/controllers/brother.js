const DB = require('../../db');

const getBrothers = async ctx => {
  try {
    const brothers = await DB.getMany('brothers');
    ctx.body = brothers;
  } catch (error) {
    throw new Error(error);
  }
};

const createBrother = async ctx => {
  const newBrother = ctx.request.body;
  try {
    const createdBrothers = await DB.createOne('brothers', newBrother);
    if (createdBrothers === 1) {
      const brotherList = await DB.getMany('brothers');
      ctx.body = brotherList;
    }
  } catch (error) {
    throw new Error(error);
  }
};

const getOneBrother = async ctx => {
  const { id } = ctx.params;
  try {
    const brother = await DB.getOne('brothers', id);
    ctx.body = brother;
  } catch (error) {
    throw new Error(error);
  }
};

const deleteOneBrother = async ctx => {
  const { id } = ctx.params;
  try {
    const deletedBrothers = await DB.deleteOne('brothers', id);
    if (deletedBrothers === 1) {
      const brotherList = await DB.getMany('brothers');
      ctx.body = brotherList;
    }
  } catch (error) {
    throw new Error(error);
  }
};

const updateOneBrother = async ctx => {
  const { id } = ctx.params;
  const data = ctx.request.body;
  try {
    const updatedBrothers = await DB.updateOne('brothers', id, data);
    if (updatedBrothers === 1) {
      const brotherList = await DB.getMany('brothers');
      ctx.body = brotherList;
    }
  } catch (error) {
    throw new Error(error);
  }
};

module.exports = {
  getBrothers,
  getOneBrother,
  createBrother,
  deleteOneBrother,
  updateOneBrother
};
