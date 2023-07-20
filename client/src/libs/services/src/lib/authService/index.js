import { axios } from "../../config/axios";
import { Services } from "../../service";

// Removed TypeScript-specific class extension and interface implementation
export class AuthService extends Services {
  API_URL = "";
  url = this.API_URL + "/auth";
  abortController = null;

  registerUrl = this.url + "/register";
  loginUrl = this.url + "/login";
  refreshTokenUrl = this.url + "/refreshToken";

  // Removed TypeScript-specific type annotations
  register = async (data) => {
    this.abortController = new AbortController();
    try {
      // Removed TypeScript-specific type annotation
      const response = await axios.post(
        this.registerUrl,
        data,
        {
          signal: this.abortController.signal
        }
      );

      if (response.status === 200) {
        return {
          statusCode: response.status,
          message: response.data.message,
          token: response.data.token ?? ""
        };
      } else {
        throw new Error("Error register service on resolve");
      }
    } catch (error) {
      if (!this.isCancel(error)) {
        // Handle other errors
        console.error("Catch error");
        throw error;
      }
    }
    return {
      statusCode: 500,
      message: "Unexpected error occurred"
    };
  };
  // Removed TypeScript-specific type annotations
  login = async (data) => {
    this.abortController = new AbortController();
    try {
      // Removed TypeScript-specific type annotation
      const response = await axios.post(
        this.loginUrl,
        data,
        {
          signal: this.abortController.signal
        },
      );

      if (response.status === 200) {
        return {
          statusCode: response.status,
          message: response.data.message,
          token: response.data.token ?? ""
        };
      } else {
        throw new Error("Error login service on resolve");
      }
    } catch (error) {
      if (!this.isCancel(error)) {
        // Handle other errors
        throw error;
      }
    }
    return {
      statusCode: 500,
      message: "Unexpected error occurred"
    };
  };
  refreshToken = async (data) => {
    this.abortController = new AbortController();
    try {
      const response = await axios.post(
        this.refreshTokenUrl,
        {},
        {
          headers: { Authorization: `Bearer ${data}` },
          signal: this.abortController.signal
        }
      );
      if (response.status === 200) {
        return {
          statusCode: response.status,
          message: response.data.message,
          token: response.data.token ?? ""
        };
      } else {
        throw new Error("Error is-logged-in service on resolve");
      }
    } catch (error) {
      if (!this.isCancel(error)) {
        // Handle other errors
        throw error;
      }
    }
    return {
      statusCode: 500,
      message: "Unexpected error occurred"
    };
  };
}


