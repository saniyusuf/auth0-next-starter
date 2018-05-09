import auth0 from 'auth0-js';
import Router from 'next/router';

export default class Auth {

    auth0 = new auth0.WebAuth({
        domain: 'YOUR.DOMAIN.AUTH0.COM',
        clientID: 'CLIENT_ID',
        redirectUri: 'http://localhost:8000/callback //DEFAULT FOR THIS APP',
        audience: 'AUDIENCE',
        responseType: 'RESPONSE1 RESPONSE2',
        scope: 'SCOPE1 SCOPE2 ...'
    });

    login() {
        this.auth0.authorize();
    }

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

    logout() {
        // Clear Access Token and ID Token from local storage
        localStorage.removeItem('access_token');
        localStorage.removeItem('id_token');
        localStorage.removeItem('expires_at');
    }


    isAuthenticated() {
        // Check whether the current time is past the
        // Access Token's expiry time
        let expiresAt = JSON.parse(localStorage.getItem('expires_at'));
        return new Date().getTime() < expiresAt;
    }

    refreshToken(){
        this.auth0.checkSession();
    }

}
