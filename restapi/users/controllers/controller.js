const crypto = require('crypto');
    
const UserModel = require('../models/users.model'); 
const jwt = require("jsonwebtoken");
const JWT_SECRET = "dfjh"


exports.authenticate = function(req,res) {
    var userdata = req.body;
    
    
   
   
 UserModel.findOne(userdata).then((result) => {
        res.status(200).send(result);
    
    });
   // UserModel.listuser(req.body)
    //.then((result) => {
    //res.status(200).send({data:result});
   
   
    
    
    };

exports.check = function(req,res){
    console.log("verifying");
    let token = req.body.token;
    
    jwt.verify(token, JWT_SECRET, (err, decode)=> {
        if(err){
            console.log("Error Decoding");
            res.send({isValid: "null"});
        } else {
            console.log("Decoding Sucessful");
            res.send({isValid: decode._doc});
            
        }
    });
}




exports.insert = (req, res) => {
    console.log(req.body);
    if(req.body.firstName===undefined || req.body.password===undefined)
    {
      console.log("Please Enter Some data");
    
    }
    
    else if(req.body.password===undefined)
    {
        console.log("Please Enter Some data");
    }
else
    
    { 

      UserModel.createUser(req.body)
            .then((result) => {
            res.status(201).send({id: result._id});
           
           
            
             });
    }
 };

  


 
exports.getById = (req, res) => {
    UserModel.findById(req.params.userId).then((result) => {
        res.status(200).send(result);
    
    });
    
 };
 
 
 exports.patchById = (req, res) => {
    if (req.body.password){
        let salt = crypto.randomBytes(16).toString('base64');
        let hash = crypto.createHmac('sha512', salt).update(req.body.password).digest("base64");
        req.body.password = salt + "$" + hash;
    }
    UserModel.patchUser(req.params.userId, req.body).then((result) => {
            res.status(204).send({});
    });
 };

 exports.list = (req, res) => {
    let limit = req.query.limit && req.query.limit <= 100 ? parseInt(req.query.limit) : 10;
    let page = 0;
    if (req.query) {
        if (req.query.page) {
            req.query.page = parseInt(req.query.page);
            page = Number.isInteger(req.query.page) ? req.query.page : 0;
        }
    }
    UserModel.list(limit, page).then((result) => {
        res.status(200).send(result);
     
        
        
      
    });
 };


 exports.removeById = (req, res) => {
    UserModel.removeById(req.params.userId)
        .then((result)=>{
            res.status(204).send({});                   
        });
 };

