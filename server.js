const Hapi = require('hapi');
const mongoose = require('mongoose');
const routes = require('./routes/route.js');
mongoose.connect("mongodb://localhost:27017/test",{useNewUrlParser: true}, err => {
    if(!err){
        console.log('mongodb connection success')
    }else{
        console.log('error:'+ err)
    }
})
const server= new Hapi.server({ port: 3000, host: 'localhost' });
server.route({
    path: '/',
    method: 'GET',
    handler(req, reply) {
        reply('Welcome to HapiJs course!!');
    }
});
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
