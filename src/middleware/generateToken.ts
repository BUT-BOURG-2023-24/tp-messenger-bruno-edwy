const jwt = require('jsonwebtoken');

const secretKey = 'deft';

const token = jwt.sign({}, secretKey, { expiresIn: '1h' });

console.log(token);