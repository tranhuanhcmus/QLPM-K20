import { axiosMockAdapterInstance } from "../../config/axios";
import { AuthService } from "../../lib";
import accountsData from "../data/accounts.json";

const accounts = accountsData;

axiosMockAdapterInstance
  .onPost(new AuthService().registerUrl)
  .reply((config) => {
    const data = JSON.parse(config.data);

    const emailExists = accounts.some(
      (account) => account.email === data.email
    );
    if (emailExists) {
      return [
        /**
         * 409 Conflict: Mã lỗi này thường được
         * sử dụng khi có xung đột hoặc xung đột
         * dữ liệu xảy ra. Trong trường hợp này,
         * email đã tồn tại và không thể tạo tài khoản
         * mới với email đó.
         */
        409,
        {
          message: "Email is exist"
        }
      ];
    } else {
      accounts.push({
        id: accounts.length + 1 + "",
        email: data.email,
        password: data.password
      });
      return [
        200,
        {
          message: "Register success",
          token: "This is new access token :>"
        }
      ];
    }
  });
