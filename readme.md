<h1>Auth0 NextJS</h1>

<p>This demo will showcase how to use the Auth0 SDK with a Next JS server rendered application. It will also show how you can authenticate and refresh sessions.</p>

<h2>Table Of Contents</h2>

<ul>
        <li>
            <a href="#getting-started">Getting Started</a>                               
        </li>        
        <li>
            <a href="#set-up-auth0">Setup Auth0</a>            
        </li>
        <li><a href="#white-list">Whitelist Routes</a></li>         
        <li><a href="#quick-start">Quick Start</a></li>
        <li><a href="#provide-credentials">Provide Auth0 Credentials</a></li> 
        <li><a href="#run-app">Run The App</a></li>
        <li><a href="#log-in">Log In/ Sign Up</a></li>
        <li><a href="#logout">Logout</a></li>
        <li><a href="#refresh">Refresh Token</a></li>
</ul>

<h2>Pre Requirement</h2>
<p>You must have access to a computer with at least NODE JS version 6 or higher installed.</p>

<hr/>


<h2><a name="getting-started">Getting Started</a></h2>
<p>Ensure that if you have all this configured, you can go on ahead to the <a name="quick-start">quick start section.</a></p>


<h3><a name="set-up-auth0">Setup Auth0</a></p>
<p>To complete this step, you will need an Auth0 account. If you don't have one, you can create one at the <a href="https://auth0.com/signup">Auth0 Website</a>.</p>

<h4>Create Auth0 Application</h4>
<p>Create a new application via your Auht0 account dashbaord. Since we are working with Next JS, we will select the web application option as the type of our Auth0 Application, just in case we need to use some server-side capabilities of the Auht0 SDK.</p>
<a href="https://ibb.co/gVkJdn"><img src="https://preview.ibb.co/byytB7/Screen_Shot_2018_05_07_at_23_19_08.png" alt="Screen_Shot_2018_05_07_at_23_19_08" border="0"></a>

<h4><a name="white-list">Whitelist Routes</a></h4>
<p>The next step is to tell Auth0 about the routes that an authentication step will redirect to. You need to explicitly whitelist each possible route for security reasons so Auth0 will only redirect to allowed routes. By default, we will be using "http://localhost:8000/callback" for development. When you go into production, make sure you add any production route to this list.</p>
<a href="https://ibb.co/jbmPJn"><img src="https://preview.ibb.co/n46PJn/Screen_Shot_2018_05_09_at_00_03_29.png" alt="Screen_Shot_2018_05_09_at_00_03_29" border="0"></a>

<h3><a name="quick-start">Quick Start</a></h3>

<h4><a name="provide-credentials">Provide Auth0 Credentials</a></h4>
<p>Clone the repository into your machine and open up <b>services/auth.js</b>.</p>

<p>In this file you will need to provide some credentials which can be found on the dashboard for your corresponding Auth0 application. The Auth class inside the auth.js file is a service that wraps around the Auth0 SDK. The configuration part is the WebAuth function which configures the Auth0 SDK.</p>

<pre>
auth0 = new auth0.WebAuth({
        domain: 'YOUR.DOMAIN.AUTH0.COM',
        clientID: 'CLIENT_ID',
        redirectUri: 'http://localhost:8000/callback //DEFAULT FOR THIS APP',
        audience: 'AUDIENCE',
        responseType: 'RESPONSE1 RESPONSE2',
        scope: 'SCOPE1 SCOPE2 ...'
    });
</pre>
<p>In this file, the <b>DOMAIN</b> & <b>CLIENT ID</b> are the 2 mandatory parameters you need to provide to the WebAuth configuration. You can find more information about other conifguration parmeters at the <a href="https://auth0.github.io/auth0.js/WebAuth.html" target="_blank">Auth0 SDK Documentation</a></p>

<h4><a name="run-app">Run The App</a></h4>
<pre>
  npm install
  npm run dev
</pre>

<p>Your application will be launched on <a href="http://localhost:8000" target="_blank">localhost:8000</a>. You can play around with the application and try to log in and log out.</p>

<h4>Functions</h4>
<p>The auth.js is a wrapper for Auth0 SDK and exposes some basic functionality that allows you to log in, logout & refresh your token.</p>

<h5><a name="log-in">Log In/ Sign Up</a></h5>
<p> The login flow basically routes you to the intermediary page "sign-in.js" which basically processes the request and hands over to Auth0 SDK for login. The reason for this is to keep bookmarking working with ease.</p>

<b>Sign-in.js</b>
<pre>
 componentDidMount(){
        if (auth0.isAuthenticated()){
            Router.push('/');
        } else {
            auth0.login();
        }
    }
</pre>
<p>We also put a route guard to ensure that if you are already logged in you go back to the home page and if not, you are redirected to login.</p>

<b>Login Function</b>
<p>The login function made available in the "Auth" service found in the "auth.js" file basically calls the Auth0 SDK to log you in</p>
<pre>
 login() {
        this.auth0.authorize();
    }
</pre>

<p>After the login is successful, Auth0 will redirect you to the callback route which is whitelisted and in there you will be able to save the user token and any information you need to localstorage or your preferred storage mechanism. </p>

<b>Callback.js</b>
<pre>
componentDidMount(){
        if (auth0.isAuthenticated()){
            Router.push('/');
        } else {
            auth0.handleAuthentication()
        }
    }
</pre>

<b>auth.js</b>
<pre>
  handleAuthentication() {
        this.auth0.parseHash({hash: window.location.hash}, (err, authResult)=> {
            if (authResult && authResult.accessToken && authResult.idToken) {
                console.log(authResult);
             this.setSession(authResult);
             Router.push('/');
         } else if (err) {
             Router.push('/sign-in');
             console.log(err);
             }
        });
    }


setSession(authResult) {
        // Set the time that the Access Token will expire at
        let expiresAt = JSON.stringify((authResult.expiresIn * 1000) + new Date().getTime());
        localStorage.setItem('access_token', authResult.accessToken);
        localStorage.setItem('id_token', authResult.idToken);
        localStorage.setItem('expires_at', expiresAt);
    }
</pre>

<h5><a name="logout">Log Out</a></h5>
<p>The logout functionality simply just removes all saved data from the persistent storage so it cannot be used for future requests.</p>

<b>auth.js</b>
<pre>
logout() {
        // Clear Access Token and ID Token from local storage
        localStorage.removeItem('access_token');
        localStorage.removeItem('id_token');
        localStorage.removeItem('expires_at');
    }
</pre>


<h5><a name="refresh">Token Refresh</a></h5>
<p>You might need to ensure that you want to refresh your token pretty often. This is very useful when you work with security intensive applications. Auth0 handles this very maturely in a silent manner. The "refreshToken" function calls Auth0 SDKs' "checkSession" function. It is also necessary to ensure that if you need this feature, the "responseMode" parameter when configuring Auth0 with the "WebAuth" function is set to "web_message" to allow this technique to work properly.</p>


<b>Configuration</b>
<pre>
auth0 = new auth0.WebAuth({
        domain: 'YOUR.DOMAIN.AUTH0.COM',
        clientID: 'CLIENT_ID',
        redirectUri: 'http://localhost:8000/callback //DEFAULT FOR THIS APP',
responseMode: 'web_message',
        audience: 'AUDIENCE',
        responseType: 'RESPONSE1 RESPONSE2',
        scope: 'SCOPE1 SCOPE2 ...'
    });
</pre>

<b>Token Refresh</b>
<pre>
refreshToken(){
        this.auth0.checkSession();
    }
</pre>

<p>You can find documentation for further configuration of the token refresh with "checkSession" at the <a href="https://auth0.github.io/auth0.js/global.html#checkSession" target="_blank">documentation page for the checkSession function</a>. </p>

<h2>Embed Lock</h2>
<p>Auth0 has another technique for authenticating users. This involes the use of Lock, an embedded Auth0
 client. For more on this, please visit the <a href="https://auth0.com/docs/libraries/lock/v11" target="_blank">Lock documentation</a> and also have a look at a <a href="https://github.com/auth0-blog/next3-auth0" target="_blank">Next JS Auth0 starter project</a> that uses Lock.

<h2>Troubleshoot</h2>
<p>Some common errors include forgetting npm install before running. This is very important and mandatory step. It is also very important to use your own AUTH0 Credentials. If ther are 
any errors, please feel free to post an issue.</p>

