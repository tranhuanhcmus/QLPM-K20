import { useEffect, useState } from 'react';
import { BROADCAST_MESSAGE, GOOGLE_CONFIG, GOOGLE_MESSAGE } from '../../constants.js';
import { useAuthBroadcastChannel } from './useAuthBroadcastChannel.js';
import { useAccessToken } from './useAccessToken.js';
import {
    SocialService
} from "@org/services"
import { useUpdateAccountMutation } from '../../fetching/mutation.js';
import { googlePopupPostMessage } from '../helper/windowEventHelper.js';


export const useGoogleLogin = () => {
    const [isLoading, setIsLoading] = useState(false);
    const { postMessage } = useAuthBroadcastChannel();
    const socialService = new SocialService();
    const updateAccountMutation = useUpdateAccountMutation();

    // Configure auth url
    const googleAuthUrl = `${GOOGLE_CONFIG.AUTH_URI}?client_id=${GOOGLE_CONFIG.CLIENT_ID}&redirect_uri=${encodeURIComponent(GOOGLE_CONFIG.REDIRECT_URI)}&response_type=token&scope=${encodeURIComponent(GOOGLE_CONFIG.SCOPE)}`;

    // Get the setToken function from useAccessToken
    const { setToken } = useAccessToken();

    useEffect(() => {
        const handleLoginCallback = () => {
            // Extract and get access token and error (if any) from url
            const hashParams = new URLSearchParams(window.location.hash.slice(1));
            const accessToken = hashParams.get('access_token');
            const error = hashParams.get('error');

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
            } else if (error) {
                console.error('Error during Google login:', error);
                // Send unsuccessful login message to the original tab
                googlePopupPostMessage(GOOGLE_MESSAGE.GOOGLE_LOGIN_FAILED, {});
            }
        };

        handleLoginCallback();
    }, []);

    const onGoogleLogin = () => {
        setIsLoading(true);
        // Open login popup
        const authWindow = window.open(googleAuthUrl, 'Google Sign-In', 'width=500,height=600');

        const handleAuthentication = (event) => {
            const { type, payload } = event.data;
            if (type === GOOGLE_MESSAGE.GOOGLE_LOGIN_SUCCESS) {
                // Reset token in cookie
                setToken(payload.accessToken, true);
                // Send login notification message to other tabs
                postMessage({
                    message: BROADCAST_MESSAGE.SEND_TOKEN,
                    token: payload.accessToken,
                    isRemember: true
                });
                socialService.getAccountInfor(payload.accessToken)
                    .then(res => {
                        if (res.email && res.firstName && res.lastName) {
                            // Update account on server
                            updateAccountMutation
                                .mutateAsync({
                                    email: res.email,
                                    firstName: res.firstName,
                                    lastName: res.lastName
                                })
                                .then(res => {
                                    if (!res) {
                                        console.error("Error response update account infor false")
                                    }
                                })
                                .catch(error => {
                                    console.error("Error update account infor: ", error)
                                })
                        }
                        else {
                            console.error("Cannot get user infor")
                        }
                    })
                    .catch((err) => {
                        if (err.response?.status === 400) {
                            console.error("No Token invalid")
                        }
                    })
            } else if (type === GOOGLE_MESSAGE.GOOGLE_LOGIN_FAILED) {
                console.error('Error during Google login:', payload.error);
            }
            // Remove listener
            window.removeEventListener('message', handleAuthentication);
            setIsLoading(false);
            authWindow?.close();
        };
        // Assign listener to listen to messages from popup
        window.addEventListener('message', handleAuthentication);
        // Update account on server
    };

    return { onGoogleLogin, isLoading };
};


