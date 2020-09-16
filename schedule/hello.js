const { exitHandler, ctx } = require('../lib/job');
const schedule = require('node-schedule');
const sequelize = require('sequelize');

const Op = sequelize.Op;

const models = require('../models');

const { Batch } = models;
const { READY, BUSY, ERROR } = require('../lib/batchStatus');

exitHandler();

const helloJob = schedule.scheduleJob('*/3 * * * * *', async function(){

  const batch = await Batch.findOne({ 
    subQuery : false,
    include : { all : true }, 
    where : {
      name : 'helloJob'
    }
  });
  const status = batch.Status.name;

  if(status == 'BUSY' || status == 'PAUSED') return;
  if(status == 'READY') await Batch.update({ StatusId : BUSY }, { where : { id : batch.id } });
  
  try{
    ctx.start();

    console.log('hello');

    await Batch.update({ StatusId : READY }, { where : { id : batch.id } });
    ctx.done();
  }
  catch(e){
    await Batch.update({ StatusId : ERROR }, { where : { id : batch.id } });
    console.log(e);
    ctx.done();
  }

});