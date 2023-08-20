import React, { useEffect } from "react";
import "../../assets/styles/authen.scss";
import { useForm, Controller } from "react-hook-form";
import { isValidEmail } from "../../utils/validators/email.validator";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import {
  useLogin,
  useRegister,
  useIsLogged,
  useLogout,
} from "../../libs/business-logic/src/lib/auth/process/hooks";
import lineIcon from "../../assets/images/graphics/review-decor.png";
import {
  deleteRedirectUrl,
  getRedirectUrl,
} from "../../utils/helpers/RedirectUrlSaver";
import { URLS } from "../../constants/urls";
import { useUserContext } from "../../libs/business-logic/src/lib/user/process/context";
import { useUpdateUserDetail } from "../../libs/business-logic/src/lib/user/process/hooks";

function convertStringValuesToNumber(obj) {
  const convertedObj = {};

  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      const value = obj[key];

      if (typeof value === "string") {
        const numberValue = parseFloat(value);
        if (!isNaN(numberValue)) {
          convertedObj[key] = numberValue;
        } else {
          convertedObj[key] = value;
        }
      } else {
        convertedObj[key] = value;
      }
    }
  }

  return convertedObj;
}
const Authentication = () => {
  const { onUpdateUserDetail } = useUpdateUserDetail();
  const { state } = useUserContext();
  const userDetailData = state.userDetail;
  const loginForm = useForm({
    defaultValues: {
      email: "",
      password: "",
      isRememberMe: false,
    },
  });
  const registerForm = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const measureForm = useForm({
    defaultValues: {
      chest: undefined,
      waist: undefined,
      hip: undefined,
      neck: undefined,
      armhole: undefined,
      pants_circum: undefined,
      shoulder: undefined,
      sleeve_length: undefined,
      jacket_length: undefined,
      pants_waist: undefined,
      crotch: undefined,
      thigh: undefined,
      pants_length: undefined,
    },
  });

  const { onLogin, isLoading: isLoginLoading } = useLogin();
  const { onRegister, isLoading: isRegisterLoading } = useRegister();
  const isLoggedIn = useIsLogged();
  const { onLogout } = useLogout();
  const navigate = useNavigate();

  useEffect(() => {
    if (userDetailData) {
      console.log("SET: ", userDetailData);
      Object.keys(userDetailData).forEach((fieldName) => {
        measureForm.setValue(fieldName, userDetailData[fieldName]);
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userDetailData]);

  const handleNavigate = () => {
    const oldRedirectUrl = getRedirectUrl();
    if (oldRedirectUrl) {
      deleteRedirectUrl();
      navigate(oldRedirectUrl);
    } else navigate(URLS.HOME);
  };

  const handleLogin = ({ email, password, isRememberMe }) => {
    onLogin({
      isRememberMe,
      email,
      password,
    })
      .then((message) => {
        toast.success(message);
        handleNavigate();
      })
      .catch((err) => {
        toast.error(err.message);
      });
  };
  const handleLoginError = (errors) => {
    if (errors) {
      if (errors.email) {
        toast.error(errors.email.message);
      } else if (errors.password) {
        toast.error(errors.password.message);
      }
    }
  };
  const handleRegister = ({ email, fullName, password }) => {
    onRegister({ email, fullName, password })
      .then((message) => {
        toast.success(message);
        handleNavigate();
      })
      .catch((err) => {
        toast.error(err.message);
      });
  };
  const handleRegisterError = (errors) => {
    if (errors) {
      if (errors.email) {
        toast.error(errors.email.message);
      } else if (errors.password) {
        toast.error(errors.password.message);
      } else if (errors.password) {
        toast.error(errors.password.message);
      }
    }
  };
  const onMeasureSubmit = (data) => {
    const userDetail = convertStringValuesToNumber(data);
    onUpdateUserDetail({ userDetail })
      .then((message) => toast.success(message))
      .catch((err) => toast.error(err.message));
  };

  return (
    <main className="authen">
      <div className="container">
        {!isLoggedIn ? (
          <>
            <section className="title-template">
              <h2>
                <span>MY ACCOUNT</span>
                <br />
                QUEENSMAN
              </h2>
              <hr />
            </section>
            <section className="authen__form-wrapper">
              <div className="form-wrapper__login-form-wrapper">
                <h6>Login</h6>
                <form
                  className="form-wrapper__login-form"
                  onSubmit={loginForm.handleSubmit(
                    handleLogin,
                    handleLoginError
                  )}
                  noValidate
                >
                  <div className="login-form__email">
                    <label htmlFor="login-email">Email address *</label>
                    <Controller
                      name="email"
                      control={loginForm.control}
                      render={({ field }) => (
                        <input {...field} id="login-email" type="email" />
                      )}
                      rules={{
                        required: {
                          value: true,
                          message: "This field is required",
                        },
                        validate: {
                          matchPattern: (v) =>
                            isValidEmail(v) ||
                            "Email address must be a valid address",
                        },
                      }}
                    />
                  </div>
                  <div className="login-form__password">
                    <label htmlFor="login-password">Password *</label>
                    <Controller
                      name="password"
                      control={loginForm.control}
                      render={({ field }) => (
                        <input {...field} id="login-password" type="password" />
                      )}
                      rules={{
                        required: {
                          value: true,
                          message: "This field is required",
                        },
                        validate: {
                          matchPattern: (v) =>
                            v.length >= 6 ||
                            "Password must be at least 6 characters long",
                        },
                      }}
                    />
                  </div>
                  <div className="login-form__interact">
                    <button type="submit" disabled={isLoginLoading}>
                      {isLoginLoading ? "Wait a second" : "Login"}
                    </button>
                    <Controller
                      name="isRememberMe"
                      control={loginForm.control}
                      render={({ field }) => (
                        <label>
                          <input {...field} type="checkbox" />
                          <span>Remember me</span>
                        </label>
                      )}
                    />
                  </div>
                </form>
              </div>
              <div className="form-wrapper__register-form-wrapper">
                <h6>Register</h6>
                <form
                  className="form-wrapper__register-form"
                  onSubmit={registerForm.handleSubmit(
                    handleRegister,
                    handleRegisterError
                  )}
                  noValidate
                >
                  <div className="register-form__email">
                    <label htmlFor="register-email">Email address *</label>
                    <Controller
                      name="email"
                      control={registerForm.control}
                      render={({ field }) => (
                        <input {...field} id="register-email" type="email" />
                      )}
                      rules={{
                        required: {
                          value: true,
                          message: "This field is required",
                        },
                        validate: {
                          matchPattern: (v) =>
                            isValidEmail(v) ||
                            "Email address must be a valid address",
                        },
                      }}
                    />
                  </div>
                  <div className="register-form__password">
                    <label htmlFor="register-password">Password *</label>
                    <Controller
                      name="password"
                      control={registerForm.control}
                      render={({ field }) => (
                        <input
                          {...field}
                          id="register-password"
                          type="password"
                        />
                      )}
                      rules={{
                        required: {
                          value: true,
                          message: "This field is required",
                        },
                        validate: {
                          matchPattern: (v) =>
                            v.length >= 6 ||
                            "Password must be at least 6 characters long",
                        },
                      }}
                    />
                  </div>
                  <div className="register-form__interact">
                    <button type="submit" disabled={isRegisterLoading}>
                      {isRegisterLoading ? "Wait a second" : "Register"}
                    </button>
                  </div>
                </form>
              </div>
            </section>
          </>
        ) : (
          <>
            <section className="title-template">
              <h2>
                <span>MY ACCOUNT</span>
                <br />
                QUEENSMAN
              </h2>
              <hr />
            </section>
            <section className="authen__infor-wrapper">
              <ul className="infor-wrapper__nav">
                <li>
                  <button className="active">MY MEASURES</button>
                </li>
                <li>
                  <button onClick={onLogout}>Logout</button>
                </li>
              </ul>
              <form
                className="infor-wrapper__measures"
                onSubmit={measureForm.handleSubmit(onMeasureSubmit)}
              >
                <section className="title-template">
                  <h2>
                    <span>MY MEASURES</span>
                  </h2>
                  <hr />
                </section>
                <div className="measures__row">
                  <Controller
                    name="chest"
                    control={measureForm.control}
                    render={({ field }) => (
                      <div className="row-input__wrapper">
                        <label htmlFor="chest">chest</label>
                        <div className="row__input">
                          <input {...field} type="number" id="chest" />
                          <span
                            className={
                              !Number.isNaN(measureForm.getValues("chest"))
                                ? ``
                                : "active"
                            }
                          >
                            cm
                          </span>
                        </div>
                      </div>
                    )}
                  />
                  <Controller
                    name="waist"
                    control={measureForm.control}
                    render={({ field }) => (
                      <div className="row-input__wrapper">
                        <label htmlFor="waist">waist</label>
                        <div className="row__input">
                          <input {...field} type="number" id="waist" />
                          <span
                            className={
                              !Number.isNaN(measureForm.getValues("waist"))
                                ? ``
                                : "active"
                            }
                          >
                            cm
                          </span>
                        </div>
                      </div>
                    )}
                  />
                </div>
                <div className="measures__row">
                  <Controller
                    name="hip"
                    control={measureForm.control}
                    render={({ field }) => (
                      <div className="row-input__wrapper">
                        <label htmlFor="hip">hip</label>
                        <div className="row__input">
                          <input {...field} type="number" id="hip" />
                          <span
                            className={
                              !Number.isNaN(measureForm.getValues("hip"))
                                ? ``
                                : "active"
                            }
                          >
                            cm
                          </span>
                        </div>
                      </div>
                    )}
                  />
                  <Controller
                    name="neck"
                    control={measureForm.control}
                    render={({ field }) => (
                      <div className="row-input__wrapper">
                        <label htmlFor="neck">neck</label>
                        <div className="row__input">
                          <input {...field} type="number" id="neck" />
                          <span
                            className={
                              !Number.isNaN(measureForm.getValues("neck"))
                                ? ``
                                : "active"
                            }
                          >
                            cm
                          </span>
                        </div>
                      </div>
                    )}
                  />
                </div>
                <div className="measures__row">
                  <Controller
                    name="armhole"
                    control={measureForm.control}
                    render={({ field }) => (
                      <div className="row-input__wrapper">
                        <label htmlFor="armhole">armhole</label>
                        <div className="row__input">
                          <input {...field} type="number" id="armhole" />
                          <span
                            className={
                              !Number.isNaN(measureForm.getValues("armhole"))
                                ? ``
                                : "active"
                            }
                          >
                            cm
                          </span>
                        </div>
                      </div>
                    )}
                  />
                  <Controller
                    name="pants_circum"
                    control={measureForm.control}
                    render={({ field }) => (
                      <div className="row-input__wrapper">
                        <label htmlFor="pants_circum">
                          Pants circumference
                        </label>
                        <div className="row__input">
                          <input {...field} type="number" id="biceps" />
                          <span
                            className={
                              !Number.isNaN(measureForm.getValues("biceps"))
                                ? ``
                                : "active"
                            }
                          >
                            cm
                          </span>
                        </div>
                      </div>
                    )}
                  />
                </div>
                <div className="measures__row">
                  <Controller
                    name="shoulder"
                    control={measureForm.control}
                    render={({ field }) => (
                      <div className="row-input__wrapper">
                        <label htmlFor="shoulder">shoulder</label>
                        <div className="row__input">
                          <input {...field} type="number" id="shoulder" />
                          <span
                            className={
                              !Number.isNaN(measureForm.getValues("shoulder"))
                                ? ``
                                : "active"
                            }
                          >
                            cm
                          </span>
                        </div>
                      </div>
                    )}
                  />
                  <Controller
                    name="sleeve_length"
                    control={measureForm.control}
                    render={({ field }) => (
                      <div className="row-input__wrapper">
                        <label htmlFor="sleeve_length">sleeve length</label>
                        <div className="row__input">
                          <input {...field} type="number" id="sleeve_length" />
                          <span
                            className={
                              !Number.isNaN(
                                measureForm.getValues("sleeve_length")
                              )
                                ? ``
                                : "active"
                            }
                          >
                            cm
                          </span>
                        </div>
                      </div>
                    )}
                  />
                </div>
                <div className="measures__row">
                  <Controller
                    name="jacket_length"
                    control={measureForm.control}
                    render={({ field }) => (
                      <div className="row-input__wrapper">
                        <label htmlFor="jacket_length">jacket length</label>
                        <div className="row__input">
                          <input {...field} type="number" id="jacket_length" />
                          <span
                            className={
                              !Number.isNaN(
                                measureForm.getValues("jacket_length")
                              )
                                ? ``
                                : "active"
                            }
                          >
                            cm
                          </span>
                        </div>
                      </div>
                    )}
                  />
                  <Controller
                    name="pants_waist"
                    control={measureForm.control}
                    render={({ field }) => (
                      <div className="row-input__wrapper">
                        <label htmlFor="pants_waist">pants waist</label>
                        <div className="row__input">
                          <input {...field} type="number" id="pants_waist" />
                          <span
                            className={
                              !Number.isNaN(
                                measureForm.getValues("pants_waist")
                              )
                                ? ``
                                : "active"
                            }
                          >
                            cm
                          </span>
                        </div>
                      </div>
                    )}
                  />
                </div>
                <div className="measures__row">
                  <Controller
                    name="crotch"
                    control={measureForm.control}
                    render={({ field }) => (
                      <div className="row-input__wrapper">
                        <label htmlFor="crotch">crotch</label>
                        <div className="row__input">
                          <input {...field} type="number" id="crotch" />
                          <span
                            className={
                              !Number.isNaN(measureForm.getValues("crotch"))
                                ? ``
                                : "active"
                            }
                          >
                            cm
                          </span>
                        </div>
                      </div>
                    )}
                  />
                  <Controller
                    name="thigh"
                    control={measureForm.control}
                    render={({ field }) => (
                      <div className="row-input__wrapper">
                        <label htmlFor="thigh">thigh</label>
                        <div className="row__input">
                          <input {...field} type="number" id="thigh" />
                          <span
                            className={
                              !Number.isNaN(measureForm.getValues("thigh"))
                                ? ``
                                : "active"
                            }
                          >
                            cm
                          </span>
                        </div>
                      </div>
                    )}
                  />
                </div>
                <div className="measures__row">
                  <Controller
                    name="pants_length"
                    control={measureForm.control}
                    render={({ field }) => (
                      <div className="row-input__wrapper">
                        <label htmlFor="pants_length">pants_length</label>
                        <div className="row__input">
                          <input {...field} type="number" id="pants_length" />
                          <span
                            className={
                              !Number.isNaN(
                                measureForm.getValues("pants_length")
                              )
                                ? ``
                                : "active"
                            }
                          >
                            cm
                          </span>
                        </div>
                      </div>
                    )}
                  />
                </div>

                <div className="measures__submit">
                  <button type="submit">Confirm</button>
                </div>
              </form>
            </section>
          </>
        )}
      </div>
      <div className="custom-line-template">
        <img src={lineIcon} alt="lineIcon" />
      </div>
    </main>
  );
};

export default Authentication;
