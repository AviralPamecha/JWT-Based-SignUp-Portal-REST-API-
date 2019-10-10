const mongoose=require('mongoose');
mongoose.connect('mongodb://localhost/rest-tutorial');
const Schema= mongoose.Schema;
const jwt = require("jsonwebtoken");
const JWT_SECRET = "dfjh"


const userSchema = new Schema({
    firstName: String,
    lastName: String,
    email: String,
    password: String,
    permissionLevel: Number
 });

 const userModel = mongoose.model('Users', userSchema);

 



 userSchema.virtual('id').get(function () {
    return this._id.toHexString();
});

userSchema.set('toJSON', {
    virtuals: true
});

userSchema.findById = function (cb) {
    return this.model('Users').find({id: this.id}, cb);
};



exports.findByEmail = (email) => {
    return userModel.find({email: email});
};

exports.findById = (id) => {
    return userModel.findById(id)
        .then((result) => {
            result = result.toJSON();
            delete result._id;
            delete result.__v;
            return result;
        });
};


 exports.createUser = (userData) => {
    const user = new userModel(userData);
    return user.save();
};
exports.listuser = (userData) => {
    return new Promise((resolve, reject) => {
         console.log(userData);
         userModel.find({})
         .exec(function (err, users) {
             if (err) {
                 reject(err);
             } else {
                 resolve(users);
             }
         })
    
    })
};



exports.list = (perPage, page) => {
    return new Promise((resolve, reject) => {
        userModel.find()
            .limit(perPage)
            .skip(perPage * page)
            .exec(function (err, users) {
                if (err) {
                    reject(err);
                } else {


                    resolve(users);
                }
            })
    });
};




exports.patchUser = (id, userData) => {
    return new Promise((resolve, reject) => {
        userModel.findById(id, function (err, user) {
            if (err) reject(err);
            for (let i in userData) {
                user[i] = userData[i];
            }
            user.save(function (err, updatedUser) {
                if (err) return reject(err);
                resolve(updatedUser);
            });
        });
    })
};


exports.removeById = (userId) => {
    return new Promise((resolve, reject) => {
        userModel.remove({_id: userId}, (err) => {
            if (err) {
                reject(err);
            } else {
                resolve(err);
            }
        });
    });
};


exports.findOne = (userdata) =>{

    return new Promise((resolve,reject) => {
        userModel.findOne({firstName:userdata.username,password:userdata.password}).exec(function (err, user) {
            
            console.log(user);
            
            if(err)
            {
               console.log(err);
                reject(err);
            }
            else 
            {

                if(user){
                    let token = jwt.sign(user,JWT_SECRET);
                    
                    
                    resolve ({
                       
                        user,
                        token
                    });

                    

                }
                 else
                {
                    resolve ({
                        user: "Invalid Credentials!"
                    
                    });
                }
            }
        });

});
};
       
    








