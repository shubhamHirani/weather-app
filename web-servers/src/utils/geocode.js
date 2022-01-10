const request = require("request")
const weather = require('./weather')

const geocode = (address, callback) =>{
    const geocodingURL = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+encodeURIComponent(address)+'.json?access_token=pk.eyJ1Ijoic2h1YmhhbWhpcmFuaTQ1IiwiYSI6ImNreTN3OHBiaTA2OXoyd3E5YjJ2b2xicWkifQ.hQfD_1Mmlpta37azNXVyvQ'
    request({url: geocodingURL,json: true},(error,response) => {
        if(error){
            callback('Unable to connect with weather api!! \n', undefined)
        } else if(response.body.error){
            callback('please enter valid credentials!!!\n', undefined)
        } else if(response.body.features.length ===0){
            callback('there is no such location!!\nplease try again with another location',undefined)
        }else {
            callback(undefined,{
            latitude: response.body.features[0].center[1],
            longitude: response.body.features[0].center[0]})
                }
            }
    )

}

module.exports = geocode