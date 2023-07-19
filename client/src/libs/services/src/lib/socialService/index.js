import { getAxiosNormalInstance, axios } from "../../config/axios";
import { Services } from "../../service";

import { 
    googleApiConfig,
    facebookApiConfig 
} from "../../config/config";


export class SocialService extends Services {
    API_URL = "";
    url = this.API_URL + "/social";
    abortController = null;
    updateAccountUrl = this.url + "updateAccount"

    // GOOGLE LOGIN
    validateToken = async (token) => {
        this.abortController = new AbortController();
        try {
            const response = await getAxiosNormalInstance().get(
                googleApiConfig.validateTokenUrl + `?access_token=${token}`,
                {
                    signal: this.abortController.signal
                }
            );
            if (response.status === 200) {
                // Token is valid
                return {
                    email: response.data.email,
                    email_verified: response.data.email_verified,
                    expires_in: response.data.expires_in,
                }
            } else {
                throw new Error("Error validate token response.status not valid")
            }
        } catch (error) {
            if (!this.isCancel(error)) {
                // Handle other errors
                console.error('Error validateToken:', error);
                throw error;
            }
        }
        return {}
    };
    getAccountInfor = async (token) => {
        this.abortController = new AbortController();
        try {
            const response = await getAxiosNormalInstance().get(
                googleApiConfig.getUserInforUrl, 
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    },
                    signal: this.abortController.signal
                }
            );
            if (response.status === 200) {
                const userProfile = response.data;
                return {
                    email: userProfile.emailAddresses[0].value,
                    firstName: userProfile.names[0].familyName,
                    lastName: userProfile.names[0].givenName
                };
            } else {
                throw new Error('Error fetching user profile');
            }
        } catch (error) {
            if (!this.isCancel(error)) {
                // Handle other errors
                console.error('Error fetching user profile:', error);
                throw error;
            }
        }
        return {
            email: "",
            firstName: "",
            lastName: ""
        };
    };
    updateAccount = async (data) => {
        this.abortController = new AbortController();
        try {
            const response = await axios.post(
                this.updateAccountUrl,
                data,
                {
                    signal: this.abortController.signal
                }
            );
            if (response.status === 200) {
                return true;
            }
        } catch (error) {
            if (!this.isCancel(error)) {
                // Handle other errors
                console.error('Error update account:', error);
                throw error;
            }
        }
        return false;
    };

    // FACEBOOK LOGIN
    getFBAccessToken = async (params) => {
        this.abortController = new AbortController();
        try {
            const response = await getAxiosNormalInstance().get(
                facebookApiConfig.getFBAccessTokenUrl + 
                `?client_id=${params.clientId}` + 
                `&client_secret=${params.clientSecret}` +
                `&redirect_uri=${params.redirectUri}` +
                `&code=${params.code}`, 
                {
                    signal: this.abortController.signal
                }
            );
            if (response.status === 200) {
                return response.data;
            } else {
                throw new Error('Error fetching access token');
            }
        } catch (error) {
            if (!this.isCancel(error)) {
                // Handle other errors
                console.error('Error fetching access token:', error);
                throw error;
            }
        }
        return {
            access_token: "", 
            token_type: "",
            expires_in:  ""
        };
    }
    getFBUserInfor = async (token) => {
        this.abortController = new AbortController();
        try {
            const response = await getAxiosNormalInstance().get(
                facebookApiConfig.getFBUserInforUrl + `&access_token=${token}`,
                {
                    signal: this.abortController.signal
                }
            );
            if (response.status === 200) {
                // Token is valid
                return response.data;
            } else {
                throw new Error("Error get facebook user infor response.status")
            }
        } catch (error) {
            if (!this.isCancel(error)) {
                // Handle other errors
                console.error('Error get facebook user infor: ', error);
                throw error;
            }
        }
        return {
            email: "",
            firstName: "",
            lastName: ""
        }
    };
}



