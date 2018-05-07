const express = require('express');
const next = require('next');
//const passport = require('passport');
//const Auth0Strategy = require('passport-auth0');
//const dotenv = require('dotenv');
const { parse } = require('url');
const router = express.Router();


//dotenv.load();
const port = 8000;
// const strategy = new Auth0Strategy(
//   {
//     domain: process.env.AUTH0_DOMAIN,
//     clientID: process.env.AUTH0_CLIENT_ID,
//     clientSecret: process.env.AUTH0_CLIENT_SECRET,
//     callbackURL: process.env.AUTH0_CALLBACK_URL || `http://localhost:${port}/callback`
//   },
//   function(accessToken, refreshToken, extraParams, profile, done) {
//     // accessToken is the token to call Auth0 API (not needed in the most cases)
//     // extraParams.id_token has the JSON Web Token
//     // profile has all the information from the user
//     return done(null, profile);
//   }
// );
// passport.use(strategy);

// passport.serializeUser(function(user, done) {
//   done(null, user);
// });

// passport.deserializeUser(function(user, done) {
//   done(null, user);
// });


const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

// const env = {
//     AUTH0_CLIENT_SECRET: process.env.AUTH0_CLIENT_SECRET,
//     AUTH0_CLIENT_ID: process.env.AUTH0_CLIENT_ID,
//     AUTH0_DOMAIN: process.env.AUTH0_DOMAIN,
//     AUTH0_CALLBACK_URL:
//     process.env.AUTH0_CALLBACK_URL || `http://localhost:${port}/callback`
// };

app.prepare()
  .then(()=> {
    const server = express();
    // server.use(passport.initialize());
    // server.use(passport.session());

    // server.get('/auth/sign-in', passport.authenticate('auth0', {
    //   clientID: env.AUTH0_CLIENT_ID,
    //   domain: env.AUTH0_DOMAIN,
    //   redirectUri: env.AUTH0_CALLBACK_URL,
    //   audience: 'https://' + env.AUTH0_DOMAIN + '/userinfo',
    //   responseType: 'code',
    //   scope: 'openid'
    // }), (request, response)=> {
    //   return server.render(request, response, '/');
    // });

    server.get('*', (request, response)=> {
      return handle(request, response);
    });

    server.listen(port, (error)=> {
      if (error){
        throw error;
      }
    });
  })
