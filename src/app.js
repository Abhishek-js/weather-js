const express = require('express')
const path = require('path')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()

const pathloc = path.join(__dirname,'../public')
const viewsPath = path.join(__dirname,'../views/templates')
const partialName = path.join(__dirname,'../views/partials')

app.set('view engine','hbs')
app.set('views',viewsPath)
hbs.registerPartials(partialName)

app.use(express.static(pathloc)) 

// app.get('',(req,res) => {
//     res.send('<h1>Good Morning</h1>')
// })

app.get('',(req,res) => {
    res.render('index')
})

// app.get('/about',(req,res) => {
//     res.render('about',{
//         title:'about section',
//         name: 'Abhishek'
//     })
// })


// app.get('/about',(req,res) => {
//     res.send({
//         name: 'Abhishek',
//         sport: 'Karate'
//     })
// })

app.get('/address',(req,res) => {
    if(!req.query.address){
       return res.send({
            error: 'You have to provide a address'
        })
    }

    geocode(req.query.address , (error,{latitude,longitude,location} = {}) => {
        if(error){
           return res.send({ error })
        }
        forecast(latitude,longitude, (error,forecastData) => {
            if(error){
               return res.send({error})
            }

            res.send({
                forecast:forecastData,
                location,
                address: req.query.address
            })
        })
    })
   
    })


// app.get('/about/*',(req,res) => {
//     res.render('404',{
//         errormsg: 'There is nothing in about section'
//     })
// })


// app.get('/help',(req,res) => {
//     res.render('help',{
//         title:'This is the help section',
//         shortie: 'Hillview'
//     })
// })

app.get('*',(req,res) => [
    res.send('404 not found')
])


app.listen(3000)