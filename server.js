const Hapi = require('hapi');
//const server = new hapi.Server();
const mongoose = require('mongoose');
//const mongoDbUri = 'mongodb://localhost:27017/hapi_db';
//const Company = require('./models/company.model');
const routes = require('./routes/route.js');
//var jwt = require('jsonwebtoken');

mongoose.connect("mongodb://localhost:27017/test",{useNewUrlParser: true}, err => {
    if(!err){
        console.log('mongodb connection success')
    }else{
        console.log('error:'+ err)
    }
})
const server= new Hapi.server({
    host:'localhost',
    port:8000
});
server.route({
    path: '/',
    method: 'GET',
    handler(req, reply) {
        reply('Welcome to HapiJs course!!');
    }
});
// server.route({
//     path:'/api/login',
//     method:'POST',
//     handler(req,h) {
//       const user = {id:id};
//       const token = jwt.sign({user}, 'my_secrete_key');
//      return h.response ({
//           token:token

//       })
//     }
//     });
server.route(routes);

const start =  async function() {

    try {
        await server.start();
    }
    catch (err) {
        console.log(err);
        process.exit(1);
    }

    console.log('Server running at:', server.info.uri);
};

start();
// server.start(err => {
//     console.log(err)
//     if (err) {
//         throw err;
//     }
//     console.log(`Server Running at PORT ${server.info.port}`);
// });