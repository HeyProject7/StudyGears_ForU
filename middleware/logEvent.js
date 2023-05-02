const fs = require('fs')
const { v4: uuid } = require('uuid');
const path = require('path');
const fsPro = require('fs').promises;
const url = require('url');

var myDate = {
    "day": new Date().getDate().toString(),
    "month": new Date().getMonth().toString(),
    "year": new Date().getFullYear().toString(),
}
var date = myDate.day + "/" + (myDate.month + 1) + "/" + myDate.year
console.log(date)
const logEvents = async(msg, filename) => {
    var ext = path.extname(filename);
    filename = (!ext) ? filename.concat('.txt') : filename;
    try {
        const id = uuid();
        const logItem = `\n${date}\t${id} \t ${msg}`;
        console.log(date);
        var folder = path.join(__dirname, '..', 'logs')

        if (!fs.existsSync(folder)) {
            await fsPro.mkdir(path.join(__dirname, '..', 'logs'));
        } else {
            // console.log("Already Exist")
        }
        await fsPro.appendFile(path.join(__dirname, '..', 'logs', filename), logItem.concat(' logged'))
    } catch (err) {
        // console.log(err)
        console.log("ERRRORRR");
    }
}

const logger = (req, res, next) => {
        logEvents(`${req.method}\t ${req.origin}\t${req.url}`, 'LogFile');
        var myurl = function() {
            return url.format({
                protocol: req.protocol,
                host: req.get('host'),
                pathname: req.originalUrl,
                query: req.query
            });
        }

        console.log(`URL   -  ${req.method}\t ${myurl()}`);
        next()
    }
    // logEvents('User1 Logged')
module.exports = { logEvents, logger };