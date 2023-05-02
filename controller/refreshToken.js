// const User = require('../model/User')
const User = require('../model/Users') // temprary

// JWT PKGS
const jwt = require('jsonwebtoken');
require('dotenv').config();
const path = require('path');

const handleRefresh = async(req, res) => {
    // Gettign Jwt Cookie If Exist
    const cookies = req.cookies;
    if (!cookies.jwt) return res.sendStatus(401);
    const refreshToken = cookies.jwt;

    // Finding User
    const foundUser = await User.findOne({ refreshToken }).exec(); // Both key-value Are SAme so (refreshToken)
    // 401 = Unauthrised
    if (!foundUser) return res.status(403); //.forbidden
    // Evaluating JWT

    jwt.verify(
        refreshToken,
        process.env.REFRESH_TOKEN_SCREAT,
        (err, decoded) => {
            // If Invalid TOken
            const roles = foundUser.roles;
            if (err || foundUser.username !== decoded.username) return sendStatus(403);
            accessToken = jwt.sign({
                    "userInfo": {
                        "username": decoded.username,
                        "roles": roles
                    }
                },
                process.env.ACCESS_TOKEN_SECRET, { "expiresIn": "30s" }

            );
            res.json({ accessToken })
        }
    )

};
module.exports = { handleRefresh }