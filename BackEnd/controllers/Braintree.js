var braintree = require("braintree");

var gateway = new braintree.BraintreeGateway({
    environment:  braintree.Environment.Sandbox,
    merchantId:   'd4h5yzhnpkfdgh5m',
    publicKey:    'brjqwf59qwrxsgtn',
    privateKey:   '8d4ed7a9de7caa7526949dd0a2a0e194'
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