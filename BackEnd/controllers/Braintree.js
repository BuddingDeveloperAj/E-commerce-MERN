var braintree = require("braintree");
const router = require("../routes/Braintree");

const gateway = new braintree.BraintreeGateway({
    environment: braintree.Environment.Sandbox,
    // Use your own credentials from the sandbox Control Panel here
    merchantId: '<use_your_merchant_id>',
    publicKey: '<use_your_public_key>',
    privateKey: '<use_your_private_key>'
  });

exports.getToken = (req, res) => {
    gateway.clientToken.generate({}, function(err, response) {
        if (err) {
            res.status(500).json(err)
        }else{
            res.send(response)
        }
    })
}

exports.processPayment = (req, res) => {

    let nonceFromTheClient = req.body.paymentMethodNonce
    let amountFromTheClient = req.body.amount

    gateway.transaction.sale({
        amount: amountFromTheClient,
        paymentMethodNonce: nonceFromTheClient,
        deviceData: deviceDataFromTheClient,
        options: {
            submitForSettlement: true
        }
    }, function(err, result){
        if (err) {
            res.status(500).json(err)
        }else{
            res.json(result)
        }
    })
}