const request = require('request')
const geocode = require('./geocode')

const weather = (latitude,longitude,callback) => {
    const url='https://api.openweathermap.org/data/2.5/onecall?lat='+latitude+'&lon='+longitude+'&exclude=hourly,daily&units=metric&appid=d57f8c3baf6bb12c1c6f23e9e1315929'

    request({url : url, json: true}, (error, response) => {
        if(error){
            callback('Unable to connect with weather API!!!',undefined)
        }
        else if(response.body.error){
            callback('please enter valid credentials!!!\n', undefined)
        // } else if(response.body.features.length ===0){
        //     callback('there is no such location!!\nplease try again with another location',undefined)
        }    else{
        callback(undefined,response.body.current)
        // }
        // else{
        //     callback('please try again!!!-')
        }
    })
}

module.exports = weather