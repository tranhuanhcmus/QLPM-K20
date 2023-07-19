

export const getTokenFromUrl = () => {
    try {
        const hashParams = new URLSearchParams(window.location.hash.slice(1));
        const accessToken = hashParams.get('access_token');
        const error = hashParams.get('error');
        return {accessToken, error}
    } catch (err) {
        return {accessToken: null, error: err};
    }
}

export const getCodeFromUrl = () => {
    try {
        const urlParams = new URLSearchParams(window.location.search);
        const code = urlParams.get('code');
        return code;
    } catch (err) {
        return null;
    }
}
