const db = require('../models/allModels');

const controllers = {};

controllers.newUser = (req, res, next) => {
    console.log('reqbody: ', req.body)
    const valuesArr = [req.body.userName, req.body.OAuth]
    const newUserRequest = 'INSERT INTO Users' +
    '(username, oauth)' +
    'VALUES ($1, $2)'    
    res.locals.newUser = db.query(newUserRequest, valuesArr);
    console.log('first user test', res.locals.newUser);
    next()
}

controllers.newItem = (req, res, next) => {
    console.log('reqbody: ', req.body)
    const newItemValues = [req.body.userName, req.body.itemName];
    const findUserValues = [req.body.userName];
    const findUser = 'SELECT userid FROM users WHERE username=\'$1\';'
    const userId = db.query(findUser, findUserValues)
    console.log('user Id found: ', userId); 
    next()
}

module.exports = controllers; 