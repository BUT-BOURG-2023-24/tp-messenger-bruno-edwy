const jwt = require('jsonwebtoken');

const secretKey = 'deft'; // Remplacez par votre clé secrète JWT

const token = jwt.sign({}, secretKey, { expiresIn: '1h' }); // 1h d'expiration, ajustez selon vos besoins

console.log(token);