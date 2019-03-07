const Hapi = require('hapi');
const JWT  = require('jsonwebtoken');
const mongoose = require('mongoose');
const Bcrypt = require('bcrypt');
const HapiAuthBasic = require('hapi-auth-basic');
//const UserSchema = require('./database.js');
const people = { // our "users database"
      username:'test',
      password:'keerthi'  
};
// const users = {
//   john: {
//       username: 'john',
//       password: 'priya12345',   // 'secret'
//       name: 'John Doe',
//       id: '2133d32a'
//   }
// };
// const people = { // our "users database"
//     1: {
//       id: 1,
//       name: 'Jen Jones'
//     }
// };

 
// bring your own validation function
// const validate = async function (decoded, request) {
//     console.log(decoded);
 
//     // do your checks to see if the person is valid
//     if (!people[decoded.password]) {
//       return { isValid: false };
//     }
//     else {
//       return { isValid: true };
//     }
// };


const validate = async (request, username, password) => {

  const user = users[username];
  if (!user) {
      return { credentials: null, isValid: false };
  }

  const isValid = await Bcrypt.compare(password, user.password);
  //const credentials = { id: user.id, name: user.name };

  return { isValid, credentials };
};

const init = async () => {
  const server = new Hapi.Server({ port: 3000});
  await server.register(require('hapi-auth-jwt2'));
  //await server.register(plugins);
  server.auth.strategy('jwt', 'jwt',
  { key: 'SECRET_KEY',          
    validate: validate,            
    verifyOptions: { algorithms: [ 'HS256' ] } 
  });
 
  server.auth.default('jwt');
 
  server.route([
    {
      method: "POST", path: "/", config: { auth: false },
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
        console.log(request);
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

mongoose.connect("mongodb://localhost:27017/products",{useNewUrlParser: true}, err => {
    if(!err){
        console.log('mongodb connection success')
    }else{
        console.log('error:'+ err)
    }
})
