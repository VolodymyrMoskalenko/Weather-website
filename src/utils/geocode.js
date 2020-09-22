const request = require('request')

const geocode = (address,callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1Ijoidm1vc2thbGVua28iLCJhIjoiY2tlbzc2MzY3MTB5eTMybzhtNXp3dWcwcSJ9.MesAZ2hVXcKPKxFPfiaf3g&limit=1'
   
    request({url /*: url*/, json: true}, (error, { body }/*response*/) => {
    if (error) {
      callback('Unable to connect to location services',undefined)
    } else if (!/*response.*/body.features.length) {
      callback('Unable to find location',undefined)
    } else {
      callback(undefined, {
          latitude: /*response.*/body.features[0].center[0],
          longitude: /*response.*/body.features[0].center[1],
          location: /*response.*/body.features[0].place_name,
      })
    }
  })
  }

module.exports = geocode