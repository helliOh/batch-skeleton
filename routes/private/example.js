const express = require('express');
const sequelize = require('sequelize');
const router = express.Router();

const models = require('../../models');
const { Batch } = models;

router.get('/', async (req, res, next) => {
  try {
    const batches = await Batch.findAll({});

    res.send({ success : true, batches : batches });
  } catch(e) {
    console.log(e);
    res.status(300).send({success:false, message:"failed"});
  }
});

module.exports = router;
