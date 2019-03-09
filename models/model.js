const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
 // email: { type: String, required: true, index: { unique: true } },
  username: { type: String},
  password: { type: String },
  role: { type: String }
});

// const loginUser = (username) => {
//     return createUser.findOne({'username': username})
//     .then((user) => {
//         return user;
//     })
//     .catch((err) => {
//         console.log(err)
//        return err;
//     })
// }



module.exports = mongoose.model('user', userSchema);
    // loginUser = loginUser;