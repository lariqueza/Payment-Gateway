import { createRequire } from 'module';
const require = createRequire(import.meta.url);

const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const { Console } = require('console');
const app = express();
const PORT = process.env.PORT || 5500;
const PUBLISHABLE_KEY = "pk_test_51IIbuGH447mJw2MWF6a9n8TCs4Ngvmg3nqjYUkbustMJwGU6GJ0JVJmbdQzLvaVq8eHaG1Nuzyv2FSyGMKNisRO500CXEd3DnE";
const SECRET_KEY = "sk_test_51IIbuGH447mJw2MW4jUE2cGxUxqI0zINaFexiaDutHeMUyRcNBXeXQUYX7gyrPKsD49ZjqIFbSE1QOotxXHgxcWd00uqKpzWpS";
const stripe = require('stripe')(SECRET_KEY);

app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())

app.set("view engine", "ejs");

app.get('/', (req, res) => {
    res.render('Home', {
        key:PUBLISHABLE_KEY
    })
})

app.post('/payment', (req, res) => {
    stripe.customers.create({
        email:req.body.stripeEmail,
        source:req.body.stripeToken,
        name:'Ajibola Oki',
        address:{
            line1:'23 Mountain Valley Newham',
            postal_code:'NW4 1QA',
            city:'London',
            country: 'United Kingdom'
        }
    })
    .then((customer) => {
        return stripe.charges.create({
            amount:25.00,
            description: 'Footwear',
            currency: 'USD',
            customer:customer.id
        })
    })
    .then((charge) => {
        res.send("success")
    })
    .catch((err) => {
        res.send(err)
    })
})


app.listen(PORT,() => {
    Console.log(`App is listening on ${PORT}`)
})