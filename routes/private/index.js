const express = require('express');
const SECRET_KEY = 'example secret'

const useAuth = (config) =>{
    console.log('do something with config');

    return (req, res, next) =>{
        console.log('custom authentication');
        next();
    }
}

const router = express.Router();

router.use(useAuth({ protocol : 'jwt', secret : SECRET_KEY }));
// Routes below will check auth

router.use('/example', require('./example'));

module.exports = router;
