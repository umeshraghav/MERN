const stripe = require("stripe")("sk_test_EYehVwA8iuoSHqTtmMSGSTKd00LDokV6mw")
const uuid = require("uuid/v4")
exports.makepayment = (req, res)=>{
    const {products,token} = req.body;
    console.log("Products ",products);

    let amount =0;
    products.map(p=>{
        amount+=p.price
    })
    const idempotencyKey= uuid();
    return stripe.customers.create({
        email: token.email,
        source: token.id
    }).then(customer =>{
        stripe.charges.create({
            amount : amount,
            currency : "usd",
            customer : customer.id,
            reciept_email : token.email,
            shipping :{
                name : token.cart.name
            }
        }, {idempotencyKey}).then(result=> res.status(200).json(result)).catch(err=>{console.log(err)})
    })
} 