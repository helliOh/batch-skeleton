const express = require('express');
const app = express();

(async () =>{
  const envHandler = require('./lib/env-handler');
  await envHandler();

  const path = require('path');
  const cookieParser = require('cookie-parser');
  const bodyParser = require('body-parser');
  const logger = require('morgan');
  const cors = require('cors');
  const helmet = require('helmet');
  
  const router = require('./routes');

  app.use(logger('dev'));
  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));
  app.use(cookieParser());
  app.use(bodyParser.json({limit: '50mb'}));
  app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));
  app.use(express.static(path.join(__dirname, 'public')));
  app.use(cors());
  app.use(helmet());

  setGlobalSchedule();
  router(app);
})();

async function setGlobalSchedule() {
  const models = require('./models');
  const { Batch } = models;
  const { Op } = require('sequelize');
  
  await Batch.update({ StatusId : 1 }, { where : { id : { [Op.gt] : -1 }  } });

  const batches = require('./schedule');
  const { 
    helloJob,
    wolrdJob
  } = batches;
  
  helloJob.run();
  wolrdJob.run();
}


module.exports = app;
