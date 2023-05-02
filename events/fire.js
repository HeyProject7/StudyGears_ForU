const emitter = require('events');
class MyEmitter extends emitter{ }
var fire = new MyEmitter()
fire.on('connection', (req) => {
    var table1 = {
        url: req.url,
        method: req.method
    }
    console.table(table1)
})
module.exports=fire