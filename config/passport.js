const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJWT = require('passport-jwt').ExtractJwt;
const mongoose = require('mongoose');
const User = mongoose.model('users');
const dotenv = require('dotenv').config();

var options = {};

//extract json webtoken from the header
options.jwtFromRequest = ExtractJWT.fromAuthHeaderAsBearerToken();
options.secretOrKey = process.env.secretOrKey;

module.exports = (passport) => {
  passport.use(
    new JwtStrategy(options, (jwt_payload, done) => {
      User.findById(jwt_payload.id)
        .then((user) => {
          if (user) {
            // return the user to the frontend
            console.log('user found in db in passport.js');
            return done(null, user);
          }
          // return false since there is no user
          console.log('user not found in db in passport.js');
          return done(null, false);
        })
        .catch((err) => console.log(err));
    })
  );
};
// passport.use(
//   new JwtStrategy(options, function (jwt_payload, done) {
//     console.log(jwt_payload);
//     done();
// User.findOne({id: jwt_payload.sub}, function(err, user) {
//     if (err) {
//         return done(err, false);
//     }
//     if (user) {
//         return done(null, user);
//     } else {
//         return done(null, false);
//         // or you could create a new account
//     }
// });
//     })
//   );
// };
