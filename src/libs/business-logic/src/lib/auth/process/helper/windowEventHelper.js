export const googlePopupPostMessage = (type, payload) => {
  if (typeof window !== "undefined") {
    window.opener?.postMessage(
      {
        type,
        payload,
      },
      window.location.origin
    );
  }
};
export const facebookPopupPostMessage = (type, payload) => {
  if (typeof window !== "undefined") {
    window.opener?.postMessage(
      {
        type,
        payload,
      },
      window.location.origin
    );
  }
};
