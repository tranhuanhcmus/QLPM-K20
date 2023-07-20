export function setCookie(name, value, hours) {
  if (typeof document !== "undefined") {
    let expires = "";
    if (hours) {
      const date = new Date();

      // hours * 60 * 60 * 1000: convert to milisecond
      date.setTime(date.getTime() + hours * 60 * 60 * 1000);
      expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + (value || "") + expires;
  }
}

export function getCookie(name) {
  if (typeof document !== "undefined") {
    const nameEQ = name + "=";
    const cookieArr = document.cookie.split(";");
    let result = null;
    cookieArr.forEach((cookie) => {
      const c = cookie.trim();
      if (c.indexOf(nameEQ) === 0) {
        result = c.substring(nameEQ.length, c.length);
      }
    });

    return result;
  }
  return null;
}

export function deleteCookie(name) {
  setCookie(name, "", -1);
}
