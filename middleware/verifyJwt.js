const jwt = require('jsonwebtoken');
require('dotenv').config();
const verifyJwt = (req, res, next) => new Promise((resolve, reject) => {
        authHeader = req.headers.authorization || req.headers.Authorization;
        if (!authHeader?.startsWith("Bearer ")) return res.status(401);
        console.log(authHeader) // "Bearer token"
        const token = authHeader.split(' ')[1];

        console.log("degug1")
        jwt.verify(token, process.env.ACCESS_TOKEN_SCREAT, (err, data) => {
            console.log("degug2")
            if (err) return res.sendStatus(403); // Invallid Token  
            req.user = data.userInfo.username;
            req.roles = data.userInfo.roles;
            console.log("degug3")
            resolve({'message':'success'});
            next();
            console.log("degug4")
        });
});
module.exports = verifyJwt;