const {logEvents} = require('./logEvent.js')
const errorHandler = (err, req, res, next) => {
    logEvents(`${err.name}\t${err.message}`,'errLog')
    console.log(err.stack)
    // res.status(500).sendFile(err.message);
     res.status(500).send(err.message);
}
module.exports = errorHandler;