const path = require('path')  // don't need to install as it is core module
const express = require('express')
const hbs = require('hbs') // for headers and footers
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')


console.log(__dirname)
console.log(path.join(__dirname, '../public'))
const app = express()
const puplicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

app.use(express.static(puplicDirectoryPath))

app.get('',(req, res) => {
    res.render('index', {
      title: 'Weather app'  ,
      name: 'Moskalenko Volodymyr'
    })
})

app.get('/about', (req, res) => {
    res.render('about',{
        title: 'About me'  ,
        name: 'Moskalenko Volodymyr SE'
      })
})

app.get('/help', (req, res) => {
    res.render('help', {
       helpText: 'Basic help instructions',
       title: 'Help',
       name: 'Volodymyr Moskalenko'
    })
})
// match up with handlebar


//don't need this as we use index.html from root
// app.get('', (req,res) => {
//     res.send('<h1>Weather</h1>')
// })

// app.get('/help', (req,res) => {
//     res.send({
//         name: 'Vova',
//         age: 27
//     })
// })

// app.get('/about', (req,res) => {
//     res.send('<h1>About</h1>')
// })

app.get('/weather', (req,res) => {
    if(!req.query.address){
        return res.send({
            error: 'You must provide a valid address' //
        })
    }

    geocode(req.query.address, (error, {latitude, longitude, location} = {}) => { 
        if(error) {
            return res.send({error /* :error */})
        }  
        
        forecast(`${longitude},${latitude}`, (error, forecastData) => {

            if(error) {
                return res.send({ error })
            }  
            res.send({
                forecast: forecastData,
                location,
                address: req.query.address
            })  
        }) 
    })  
})



app.get('/products', (req, res) => {
    if(!req.query.search){
        return res.send({
            error: 'You must provide a search term' //
        })
    }

    console.log(req.query)
    res.send({
        products: []
    })
})

app.get('/help/*', (req,res) => {
    res.render('404', {errorMessage: 'Help article not found',
                       title: '404',
                       name: 'Volodymyr Moskalenko'})
})

app.get('*', (req,res) => {
    res.render('404', {errorMessage: 'Page not found',
    title: '404',
    name: 'Volodymyr Moskalenko'})
})

app.listen(3000, () => {
    console.log('Server is up on port 3000.')
})