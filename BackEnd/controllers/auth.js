const User = require("../models/user");
const {body, validationResult} = require("express-validator");
const jwt = require("jsonwebtoken");
var {expressjwt : expressjwt} = require("express-jwt");



exports.signup = (req, res) => {

    const errors = validationResult(req)
    
    if (!errors.isEmpty()) {
        return res.status(420).json({
            error : errors.array()[0].msg, 
            param : errors.array()[0].param
        })
    }
    
    const user = new User(req.body);
    user.save((err, user) => {
        if (err){
            return res.status(400).json({
                error: "Not able to save user in DB"
            })
        }
        res.json({
            name : user.name,
            email : user.email,
            id : user._id
        });
    })

    
};

exports.signout = (req, res) => {
    res.clearCookie("token").json({
        message: "User signed out successfully"
    });
};

exports.signin = (req, res) => {
    const {email, password} = req.body;

    const errors = validationResult(req);
    
    if (!errors.isEmpty()) {
        return res.status(422).json({
            error : errors.array()[0].msg
        });
    };

    User.findOne({email}, (err, user) => {
        if (err || !user) {
            return res.status(400).json({
                error : "User email does not exist"
            })
        };
        if (!user.authenticate(password)) {
            return res.status(401).json({
                error : "Email and password do not match"
            })
        };

        // create token
        const token = jwt.sign({_id : user._id}, process.env.SECRET);

        // put token in cookie

        //send response to front end
        const {_id, name, email, role, lastname}= user;
        return res.json({
            token, user: {_id, name, email, lastname, role}
        });
  
    });

};

// Protected Routes
exports.isSignedIn = expressjwt({
    secret : process.env.SECRET,
    algorithms: ['HS256'], 
    userProperty : "auth"
});


// Custom middlewares
exports.isAuthenticated = (req, res, next) => {
    let checker = req.profile && req.auth && req.profile._id == req.auth._id;
    if (!checker) {
        return res.status(403).json({
            error : "ACCESS DENIED"
        });
    }
    next();
}

exports.isAdmin = (req, res, next) => {
    if (req.profile.role ===0 ){
        return res.status(403).json({
            error : "Access is only for Admins"
        });
    };
    next();
}