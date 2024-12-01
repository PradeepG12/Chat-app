const moment = require('moment')

function textFormat(username,message){
    return {
        username,
        text: message ,
        time : moment().format('h:mm a')
    }
}

module.exports = textFormat