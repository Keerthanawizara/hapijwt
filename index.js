const Hapi = require('hapi');
const JWT  = require('jsonwebtoken');
//const UserSchema = require('./database.js');
const people = { // our "users database"
    1: {
      id: 1,
      permission: 'ADMIN'
    }
};
 
// bring your own validation function
const validate = async function (decoded, request) {
    console.log(decoded);
 
    // do your checks to see if the person is valid
    if (!people[decoded.id]) {
      return { isValid: false };
    }
    else {
      return { isValid: true };
    }
};
 
const init = async () => {
  const server = new Hapi.Server({ port: 8000 });
  await server.register(require('hapi-auth-jwt2'));
 
  server.auth.strategy('jwt', 'jwt',
  { key: 'SECRET_KEY',          
    validate: validate,            
    verifyOptions: { algorithms: [ 'HS256' ] } 
  });
 
  server.auth.default('jwt');
 
  server.route([
    {
      method: "GET", path: "/", config: { auth: false },
      handler: function(request, h) {
          //const session  = request.auth.credentials;
          //ession.permission = 'SUPER_ADMIN';
          const token = JWT.sign(people, 'SECRET_KEY');

        return h.response({text: token });
      }
    },
    {
      method: 'GET', path: '/restricted', config: { auth: 'jwt' },
      handler: function(request, h) {
       return h.response({text: token })
        .header("Authorization", request.headers.authorization);
      }
    }
  ]);
  await server.start();
  return server;
};
 
 
init().then(server => {
  console.log('Server running at:', server.info.uri);
})
.catch(error => {
  console.log(error);
});

const mongoose = require('mongoose');
const mongoDbUri = 'mongodb://localhost:27017/admin';
//connect with mongoDB
mongoose.connect(mongoDbUri, {
    useMongoClient: true
});
mongoose.connection.on('connected', () => {
    console.log(`app is connected to ${mongoDbUri}`);
});
mongoose.connection.on('error', err => {
    console.log('error while connecting to mongodb', err);
});