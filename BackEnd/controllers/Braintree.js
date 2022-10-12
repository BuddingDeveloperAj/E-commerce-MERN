var braintree = require("braintree");

var gateway = new braintree.BraintreeGateway({
    environment:  braintree.Environment.Sandbox,
    merchantId:   'YOUR ID',
    publicKey:    'YOUR KEY',
    privateKey:   'YOUR KEY'
});

exports.getToken = (req, res) => {
    gateway.clientToken.generate({})
    .then(response=>{
        if (response.error) {
            res.status(500).send(response)
        }else{
            res.json(response)
        }
    })
    .catch(error => console.log(error))
}

exports.processPayment = (req, res) => {

    let nonceFromTheClient = req.body.paymentMethodNonce
    let amountFromTheClient = req.body.amount

    gateway.transaction.sale({
        amount: amountFromTheClient,
        paymentMethodNonce: nonceFromTheClient,
        options: {
            submitForSettlement: true
        }
    }, (err, result)=> {
        if (result.success){
            res.json(result)
        }
        else{
            res.json(err)
        }
    })
    
}
