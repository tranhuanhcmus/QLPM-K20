import "../../assets/styles/_authPage.scss";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { brandName, namePage, regexPatterns } from "./pageData";

const AuthPage = () => {
  const signInValues = {
    username: "",
    password: "",
    saveUser: false,
  };
  const signUpValues = {
    email: "",
    password: "",
    "password-2": "",
  };

  const {
    register: registerSignIn,
    handleSubmit: handleSubmitSignIn,
    formState: { errors: signInErrors },
  } = useForm({
    defaultValues: signInValues,
  });
  const {
    register: registerSignUp,
    handleSubmit: handleSubmitSignUp,
    formState: { errors: signUpErrors },
  } = useForm({
    defaultValues: signUpValues,
  });

  const onSubmitSignUp = (data) => console.log(data);
  const onSubmitSignIn = (data) => console.log(data);

  return (
    <div className="container">
      {/* Component BreadCrumb */}
      <nav className="breadcrumb">
        <Link className="breadcrumb_link" to={`/`}>
          Home
        </Link>
        /<span>{namePage}</span>
      </nav>

      <div className="content">
        <span className="h1">my account</span>
        <span className="h1 brand-name">{brandName}</span>

        <div className="forms  text">
          <div className="w-100 row  ">
            <div className="col-12 col-md-6">
              <div className="form form--login ">
                <span className=" text--bold">Login</span>
                <form
                  className="login"
                  onSubmit={handleSubmitSignIn(onSubmitSignIn)}
                >
                  {/* 3rd-party sign-in */}
                  <div className="form__extend ">
                    <button className="btn">
                      <i className="fi fi-brands-facebook"></i>
                      Đăng nhập bằng Facebook
                    </button>
                    <button className="btn">
                      <i className="fi fi-brands-google"></i>
                      Đăng nhập bằng Google
                    </button>
                  </div>

                  {/* username login */}
                  <label htmlFor="userName">User Name</label>
                  <input
                    {...registerSignIn("username", {
                      required: true,
                      pattern: regexPatterns.usernamePattern,
                    })}
                    id="userName"
                    type="text"
                  />
                  {signInErrors?.username && (
                    <p className="error-msg">{signInErrors.username.message}</p>
                  )}

                  {/* password login */}
                  <label htmlFor="password"> Password</label>
                  <input
                    id="password"
                    type="password"
                    {...registerSignIn("password", {
                      required: true,
                      pattern: regexPatterns.passwordPattern,
                    })}
                  />
                  {signInErrors?.password && (
                    <p className="error-msg">{signInErrors.password.message}</p>
                  )}

                  {/* login actions */}
                  <div className="form__actions">
                    <div className="d-flex align-items-center">
                      <input
                        type="checkbox"
                        id="Save"
                        {...registerSignIn("saveUser")}
                      />
                      <label htmlFor="Save">Remember me</label>
                    </div>

                    <div className="d-flex justify-content-between">
                      <button type="submit" className="btn ">
                        Login
                      </button>
                      <Link>Lost your password?</Link>
                    </div>
                  </div>
                </form>
              </div>
            </div>
            <div className="col-12 col-md-6">
              <div className="form form--register ">
                <span className=" text--bold">Register</span>
                <form
                  className="register"
                  onSubmit={handleSubmitSignUp(onSubmitSignUp)}
                >
                  {/* email register  */}
                  <label htmlFor="email">Email</label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    {...registerSignUp("email", {
                      required: true,
                      pattern: regexPatterns.emailPattern,
                    })}
                  />
                  {signUpErrors?.email && (
                    <p className="error-msg">{signUpErrors.email.message}</p>
                  )}

                  {/* password register  */}
                  <label htmlFor="RegisterPassword"> Password</label>
                  <input
                    id="RegisterPassword"
                    type="password"
                    {...registerSignUp("password", {
                      required: true,
                      pattern: regexPatterns.passwordPattern,
                    })}
                  />
                  {signUpErrors?.password && (
                    <p className="error-msg">{signUpErrors.password.message}</p>
                  )}

                  <label htmlFor="RegisterPassword-2">Re-Enter Password</label>
                  <input
                    id="RegisterPassword-2"
                    type="password"
                    {...registerSignUp("password-2", { required: true })}
                  />

                  {/* register actions */}
                  <div className="form__actions">
                    <div className="d-flex justify-content-between">
                      <button type="submit" className="btn ">
                        Register
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;
