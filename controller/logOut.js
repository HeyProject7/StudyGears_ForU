// const User = require('../model/User')
const User = require('../model/Users') // temprary

const handleLogOut = async(req, res) => {
    ///Remove AccessToken at Frontend (Memory)
    const cookies = req.cookies;
    if (!cookies.jwt) return res.sendStatus(204) // Success Req but No Content To Send
        // if (!cookies ?.jwt) return res.sendStatus(204) // Success Req but No Content To Send
    const refreshToken = cookies.jwt;

    // Checking Is RT in DB?
    const foundUser = await User.findOne({ refreshToken }).exec();
    if (!foundUser) {
        res.clearCookies('jwt', { httpsOnly: true, sameSite: "None", secure: true });
        res.sendStatus(204);
    }
    // Delete RefreshToken 
    foundUser.refreshToken = "";
    const result = await foundUser.save();
    console.log(result);
    res.clearCookies('jwt', { httpsOnly: true, sameSite: "None", secure: true }); ///secure = https->{secure:true}
    res.sendStatus(204);
}
module.exports = { handleLogOut }