export const isTokenValid = () => {

  const token = localStorage.getItem("token");

  if (!token) {
    return false;
  }

  try {

    const payload = JSON.parse(atob(token.split(".")[1]));

    // if token has no expiry → treat as invalid
    if (!payload.exp) {
      return false;
    }

    const expiryTime = payload.exp * 1000; // convert to milliseconds

    // token expired
    if (Date.now() > expiryTime) {

      localStorage.removeItem("token");
      localStorage.removeItem("username");

      return false;

    }

    return true;

  } catch (error) {

    // token format invalid
    localStorage.removeItem("token");
    localStorage.removeItem("username");

    return false;

  }

};