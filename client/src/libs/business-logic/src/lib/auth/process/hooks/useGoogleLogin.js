import { useEffect, useState } from 'react';
import { BROADCAST_MESSAGE, GOOGLE_MESSAGE } from '../../constants';
import { useAuthBroadcastChannel } from './useAuthBroadcastChannel';
import { useAccessToken } from './useAccessToken';
import {
    SocialService,
    isAxiosError
} from "../../../../../../services/src"
import { useUpdateAccountMutation } from '../../fetching/mutation';
import { googlePopupPostMessage } from '../helper/windowEventHelper';
import { getTokenFromUrl } from '../helper/urlSearchParamsHelper';
import { googleConfig } from '../../../../configs';


const isRememberMeDefault = true;

export const useGoogleLogin = () => {
    // Configure auth url
    const googleAuthUrl =   `${googleConfig.AUTH_URI}` +
                            `?client_id=${googleConfig.CLIENT_ID}` +
                            `&redirect_uri=${encodeURIComponent(googleConfig.REDIRECT_URI)}` +
                            `&response_type=token` +
                            `&scope=${encodeURIComponent(googleConfig.SCOPE)}`;
    const [isLoading, setIsLoading] = useState(false);
    const { postMessage } = useAuthBroadcastChannel();
    const socialService = new SocialService();
    const updateAccountMutation = useUpdateAccountMutation();

    // Get the setToken function from useAccessToken
    const { setToken } = useAccessToken();

    useEffect(() => {
        if(typeof window !== "undefined" && window.opener) {
            // Extract and get access token and error (if any) from url
            const {accessToken, error} = getTokenFromUrl();

            if (accessToken) {
                socialService.validateToken(accessToken)
                    .then(res => {
                        // Send successful login message to the original tab along with the token
                        googlePopupPostMessage(
                            GOOGLE_MESSAGE.GOOGLE_LOGIN_SUCCESS,
                            { accessToken }
                        );
                    })
                    .catch((err) => {
                        console.error(err);
                        googlePopupPostMessage(GOOGLE_MESSAGE.GOOGLE_LOGIN_FAILED, {});
                    })
                    .finally(() => {
                        window.close();
                    })
            } else if (error) {
                // Send unsuccessful login message to the original tab
                googlePopupPostMessage(GOOGLE_MESSAGE.GOOGLE_LOGIN_FAILED, {});
                window.close();
            }
        }
    }, []);

    const onGoogleLogin = () => {
        setIsLoading(true);
        // Open login popup
        if(typeof window !== 'undefined') {
            const authWindow = window.open(googleAuthUrl, 'Google Sign-In', 'width=500,height=600');

            if(authWindow) {
                const handleAuthentication = (event) => {
                    const { type, payload } = event.data;
                    if (type === GOOGLE_MESSAGE.GOOGLE_LOGIN_SUCCESS) {
                        socialService.getAccountInfor(payload.accessToken)
                            .then(data => {
                                // If web cannot get the user information 
                                // => do not set token, do not login, do not broadcast
                                setToken(payload.accessToken, isRememberMeDefault);
                                // Send login notification message to other tabs
                                postMessage({
                                    message: BROADCAST_MESSAGE.SEND_TOKEN,
                                    token: payload.accessToken,
                                    isRemember: isRememberMeDefault
                                });
                                // Update account on server
                                updateAccountMutation
                                    .mutateAsync({
                                        email: data.email
                                    })
                                    .then(res => {
                                        if (!res) {
                                            console.error("Error response update account infor false")
                                        }
                                    })
                                    .catch(error => {
                                        console.error("Error update account infor: ", error)
                                    })
                            })
                            .catch((err) => {
                                if (isAxiosError(err) && err.response?.status === 400) {
                                    console.error("No Token invalid")
                                }
                            })
                            .finally(() => {
                                // Remove listener
                                window.removeEventListener('message', handleAuthentication);
                                setIsLoading(false);
                            })
                    } else if (type === GOOGLE_MESSAGE.GOOGLE_LOGIN_FAILED) {
                        console.error('Error during Google login:', payload.error);
                        // Remove listener
                        window.removeEventListener('message', handleAuthentication);
                        setIsLoading(false);
                    }
                };
                // Assign listener to listen to messages from popup
                window.addEventListener('message', handleAuthentication);
            }
        }
    };

    return { onGoogleLogin, isLoading };
};
