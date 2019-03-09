const user = require('../models/model.js');
//const jwt = require('jsonwebtoken');
// const loginUser = (request, h) => {
    
//     console.log(request.body);
//     if(request.body && request.body.username && request.body.password) {
//         let username = req.body.username;
//         let password = req.body.password;

//         model.loginUser(username)
//         .then((User)=>{
//             if( !User ) {
//                 return h.response({code : 1, message:"no such user found!"});
//             } 

//             if(user.password === request.body.password) {
//                 const user = {id: user.id};
//                 const token = jwt.sign({user}, 'my_secrete_key');
//                 return h.response({message: "ok", token: token});
//             } else {
//                 return h.response({message:"passwords did not match!"});
//             }
//         })
//         .catch((err)=>{
//             console.log(err)
//             return h.response(err).code(500)


//         }) 
//     } else {
//         return h.response({message: "Invalid Request!"});
//     }

// }
module.exports = {
    create: {
        async  handler(request, h) {
          try {
            const user = await new user({
              username: request.payload.username,
              password: request.payload.password,
              role: request.payload.role
            });
            user.save();
            return h.response({ message: " created successfully", user });
          } catch (err) {
              console.log(err)
            return h.response({message: "err",err});
          }
        }
      }
    // create(req, h) {
    //     if (!req.payload.username) {
    //         return h.response('success')//({er: 'name is required field'}).code(400);
    //     }
    //     user.create({
    //         username: req.payload.name,
    //         password: req.payload.password,
    //         role: req.payload.role
    //     }, (err,user) => {
    //         if (err) {
    //             console.log(err)
    //             //return h.response(err).code(500);
    //            return h.response('err');
    //         }
    //         //return h.response(user);
    //         return h.response('user');
    //     });
    // },
    // find(req, h) {

    //     user.find({}, (err, user) => {
    //         if (err) {
    //             return h.response(err).code(404);
    //         }
    //         return h.response(user);
    //     })
    // }
};

//module.exports = loginUser

module.exports
