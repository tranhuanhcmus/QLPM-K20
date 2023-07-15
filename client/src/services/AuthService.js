// Service
import { loginApi, checkLoginApi } from './API';
// Encode support
import { SHA256 } from "crypto-js";
// Constants
import { VARIABLES } from '../constants/Variables.constants';


/**
 * Service class for managing user accounts and authentication.
 * This service follows the Singleton design pattern to provide a single instance across the application.
 */
class AuthService {
    static instance = null;
    authorizeToken = null;

    /**
     * Get the singleton instance of UserService.
     * @returns {AuthService} The instance of UserService.
     */
    static getInstance() {
        if (!AuthService.instance) {
            AuthService.instance = new AuthService();
        }
        return AuthService.instance;
    }

    /**
     * Login function.
     * Sends a login request to the server and handles the server response.
     * If the login is successful, stores the user account in `currentUser`.
     * @param {string} email - The user's email.
     * @param {string} password - The user's password.
     * @param {boolean} rememberOption - The remember me option.
     */
    login({login_email, login_password, login_remember}) {
        // Send login request to the server
        // Handle the server response
        // Store the user account in `currentUser` if login is successful

        let hashPsw = SHA256(login_password).toString();
        return new Promise((resolve, reject) => {
            loginApi(login_email, hashPsw)
                .then(res => {
                    this.authorizeToken = res.data.token;

                    // Handle remember me option
                    if(!login_remember) {
                        // Session storage
                        // Set remember me option
                        localStorage.setItem(VARIABLES.REMEMBER_ME_LSKEY, login_remember)

                        // Set token to session storage
                        sessionStorage.setItem(VARIABLES.AUTH_TOKEN_LSKEY, res.data.token);
                    }
                    else {
                        // Cookie
                    }

                    // Return status code to component
                    resolve({ status_code: res.data.status_code });
                })
                .catch(error => {
                    // Check if error message is a number (which would mean it's a status code)
                    const statusCode = parseInt(error.message, 10);
                    if (!isNaN(statusCode)) {
                        resolve({ status_code: statusCode });
                    } else {
                        reject(error);
                    }
                })
        })
    }

    /**
     * Logout function.
     * Clears the exist token.
     */
    logout() {
        // Clear token
        this.authorizeToken = null;
        const rememberMeOption = localStorage.getItem(VARIABLES.REMEMBER_ME_LSKEY) === 'true';
        if(rememberMeOption) {
            // Cookie
        }
        else {
            // Session storage
            sessionStorage.removeItem(VARIABLES.AUTH_TOKEN_LSKEY);
        }
        window.location.reload();
    }

    /**
     * Register function.
     * Sends a registration request to the server and handles the server response.
     * If the registration is successful, stores the user account in `currentUser`.
     * @param {string} email - The user's email.
     * @param {string} password - The user's password.
     */
    register(email, password) {
        // Send registration request to the server
        // Handle the server response
        // Store the user account in `currentUser` if registration is successful

        let hashPsw = SHA256(password).toString();

        return new Promise((resolve, reject) => {
            loginApi(email, hashPsw)
                .then(res => {
                    if (!res.ok) {
                        throw new Error(res.status);
                    }
                    return res.json();
                })
                .then(data => {
                    this.authorizeToken = data.token;
                    sessionStorage.setItem(VARIABLES.AUTH_TOKEN_LSKEY, data.token);
                    resolve({ token: data.token, status_code: data.status_code });
                })
                .catch(error => {
                    // Check if error message is a number (which would mean it's a status code)
                    const statusCode = parseInt(error.message, 10);
                    if (!isNaN(statusCode)) {
                        resolve({ status_code: statusCode });
                    } else {
                        reject(error);
                    }
                })
        })
    }

    /**
     * Check if the user is logged in.
     * @returns {boolean} True if the user is logged in, false otherwise.
     */
    isLoggedIn() {
        return new Promise((resolve, reject) => {
            const authToken = this.getAuthToken();
            if (!authToken) {
                resolve({ status_code: 403 });
            }
            else {
                checkLoginApi(authToken)
                    .then(res => {
                        resolve({ isValid: res.data.isValid, status_code: res.data.status_code });
                    })
                    .catch(error => {
                        // Check if error message is a number (which would mean it's a status code)
                        const statusCode = parseInt(error.message, 10);
                        if (!isNaN(statusCode)) {
                            resolve({ status_code: statusCode, error: error });
                        } else {
                            reject(error);
                        }
                    })
            }
        });
    }

    /**
     * Get authorization token from localstorage
     * @return {string | null} string if token is exist, undefine if not
     */
    getAuthToken() {
        
        const rememberMeOption = localStorage.getItem(VARIABLES.REMEMBER_ME_LSKEY) === 'true';
        if(rememberMeOption) {
            // Cookie
        }
        else {
            // Session storage
            return sessionStorage.getItem(VARIABLES.AUTH_TOKEN_LSKEY);
        }
    }
}

export default AuthService.getInstance();
