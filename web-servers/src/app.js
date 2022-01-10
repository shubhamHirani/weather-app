const express = require('express')
const path = require('path')
const hbs = require('hbs')
const res = require('express/lib/response')
const geocode = require('./utils/geocode.js')
const forecast = require('./utils/weather.js')
const { query } = require('express')

const app = express()
const publicDirectoryPath = path.join(__dirname,'../public')
const viewPath = path.join(__dirname, "../templates/views")
const partialsPath = path.join(__dirname, "../templates/partials")


app.set('view engine', 'hbs')
app.set('views', viewPath)
// hbs.registerPartial(partialsPath)
app.use(express.static(publicDirectoryPath))

app.get('', (req, res)=> {
     res.render('index', {
         title: 'weaher',
         name : 'shubham hirani'
     })
})

app.get('/help', (req, res) => {
    res.render('help', {
        name: 'shubham',
        helpText: 'This is a helpful text'
    })
})
app.get('/about', (req, res)=> {
    res.render('about', {
        title: 'About me',
        name : 'shubham hirani',
        age: 22
    })
})
app.get('/weather', (req,res) => {
    if(!req.query.address){
          return res.send({
             error: 'you have to provide an address to get weather'
         })
      }
    geocode(req.query.address, (error, { latitude, longitude, location } = {}) => {
         if(error){
                return res.send( { error })
        }
           forecast(latitude, longitude, (error, forecasData) => {
              if (error) {
                  return res.send({ error })
             }
              res.send({
               forecast: forecasData,
               location,
               address: req.query.address})
        })
    })
})
app.get('help/*', (req,res) => {
    res.render('404', {
        title: '404',
        name : 'shubham hirani',
        errorMessage : 'Help article is not found'
    })
})

app.get('*', (req,res) => {
    res.render('404', {
        title: '404',
        name : 'shubham hirani',
        errorMessage : 'Page is not found'
    })
})

app.listen(3000,() =>{ console.log('this is port 3000')
} )