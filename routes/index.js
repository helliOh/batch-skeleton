module.exports = (app) =>{
    //control routes
    app.use('/public/example', require('./public/example'));
    app.use('/private', require('./private'));
  }
  