const controller = require('../controllers/controller.js');
module.exports = [
//    {
//        path: '/loginUser',
//        method: 'POST',
//        handler: controller.loginUser
//    }, 
    {
        path: '/api/user',
        method: 'POST',
        handler: controller.create
    },
    {
        path:'/api/user',
        method: 'GET',
        handler: controller.find
    }
];