const request = require('request')
const forecast = (location, callback) => {
    const url ='http://api.weatherstack.com/current?access_key=6ba0c86b4fdf0e505b2e92121a398de1&query=' + location + '&units=m'

    request({ url, json: true }, (error, {body}/*response*/) => {
    if(error) {
        callback('Unable connect to weather service', undefined)
    } else if(body.error) {
        callback('Unable to find location', undefined)
    } else {
    callback(undefined, {
       weather_descriptions: body.current.weather_descriptions[0],
       temperature: body.current.temperature
    })
    }
    })
}

module.exports = forecast