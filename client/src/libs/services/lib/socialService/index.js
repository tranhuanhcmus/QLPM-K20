import { getAxiosNormalInstance, axios } from "../../config/axios";
import { Services } from "../../service";

export class SocialService extends Services {
    API_URL = "";
    url = this.API_URL + "/social";
    abortController;
    getUserInforUrl = "https://people.googleapis.com/v1/people/me?personFields=names,emailAddresses";
    validateTokenUrl = "https://www.googleapis.com/oauth2/v3/tokeninfo";
    updateAccountUrl = this.url + "updateAccount"

    validateToken = async (token) => {
        this.abortController = new AbortController();
        try {
            const response = await getAxiosNormalInstance().get(
                this.validateTokenUrl + `?access_token=${token}`,
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
            const response = await getAxiosNormalInstance().get(this.getUserInforUrl, {
                headers: {
                    Authorization: `Bearer ${token}`
                },
                signal: this.abortController.signal
            });
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
        return {};
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
}
