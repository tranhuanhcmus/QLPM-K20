export const googlePopupPostMessage = (type, payload) => {
    window.opener.postMessage({
        type, payload
    }, window.location.origin);
};