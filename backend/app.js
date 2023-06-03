const cors = require('cors')
const express = require('express')
const { v4: uuidv4} = require('uuid')
// add stripe key 
const stripe = require('stripe')("sk_test_51JnFgQSCvEjGDAqSZ1OvpNEO9yktVx2k6G5p8yMGpQWDtDu8ZbwOwEpmOTnJmlgjOTVeHfMapoMOgakzIyiVm2kh00WIUCHemy")

const app = express()


app.use(cors())
app.use(express.json())


app.get("/", (req,res)=>{
    res.send("IT Works")
})

app.post('/payment', (req,res)=>{
    const {product, token} = req.body
    // console.log("Product", product);
    // console.log("Price", product.price);

    const idempontencyKey = uuidv4()

    stripe.customers.create({
        email:token.email,
        source:token.id
    })
    .then(customer =>{
        stripe.charges.create({
            amount: product.price * 100,
            currency: 'usd',
            customer: customer.id,
            receipt_email: token.email,
            description: product.name
        }, {idempontencyKey})
    })
    .then(result=>{
        res.status(200).json(result)
    })
    .catch(err=> console.log("Error"))
})


app.listen(8282, ()=>{
    console.log('Server is running...');
})

