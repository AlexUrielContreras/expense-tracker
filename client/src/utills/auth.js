import decode from 'jwt-decode';

class AuthService {
   
    // Checks if the user is still logged in 
    loggedIn() {
        // Checks if there is a saved token and its still valid 
        const token = this.getToken();

        // use type coersion to check if token is NOT undefined and the token is not expired 
        return !!token && !this.isTokenExpired(token)
    }

    // Check if the token has expired 
    isTokenExpired(token) {
        try {
            const decoded = decode(token);
            if (decoded.exp < Date.now() / 1000) {
                return true 
            } else {
                return false
            }
        } catch (err) {
            return false
        }
    }

    // retrieve token from localStorage
    getToken() {
        // Retrieve the user token from localStorage
        return localStorage.getItem('id_token')
    }

    // set token to localStorage
    login(idToken) {
        // Save user token to localStorage
        localStorage.setItem('id_token', idToken);

        window.location.assign('/dashboard');
    }

    // clear token from localStorage and force logout with reload
    logout() {
        // Clear user token and profile data from localStorage
        localStorage.removeItem('id_token');

        //this will reload the page and reset the state of the app
        window.location.assign('/')
    }
}

export default new AuthService();