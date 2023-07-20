import React, { useEffect } from 'react';
import '../../assets/styles/authen.scss'
import { useForm, Controller } from 'react-hook-form';
import { isValidEmail } from '../../utils/validators/email.validator';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { 
    useLogin,
    useRegister, 
    useGoogleLogin, 
    useFacebookLogin, 
    useIsLogged
} from '../../libs/business-logic/src/lib/auth'
import { isAxiosError } from "../../libs/services/src";
import lineIcon from '../../assets/images/graphics/review-decor.png';
import { URLS } from '../../constants/urls';

const Authentication = () => {

    const loginForm = useForm({
        defaultValues: {
            email: "",
            password: "",
            isRememberMe: false
        }
    });
    const registerForm = useForm({
        defaultValues: {
            email: "",
            password: ""
        }
    });

    const navigator = useNavigate();

    const { onLogin, isLoading: isLoginLoading } = useLogin();
    const { onRegister, isLoading: isRegisterLoading } = useRegister();
    const { onGoogleLogin } = useGoogleLogin(); // Add isLoading if needed
    const { onFacebookLogin } = useFacebookLogin(); // Add isLoading if needed
    const isLoggedIn = useIsLogged();

    useEffect(() => {
        isLoggedIn && 
        setTimeout(() => {
            navigator(URLS.HOME_PAGE);
        })
    }, [isLoggedIn])

    const onLoginFormSubmit = ({email, password, isRememberMe}) => {
        onLogin({
            isRememberMe,
            account: { email, password }
        })
        .then((res) => {
            if (res.statusCode === 200) {
                toast.success(res.message);
            }
            else {
                console.error(res.message)
            }
        })
        .catch((err) => {
            if (isAxiosError(err) && err.response && err.response.status === 401) {
                toast.error("Wrong email or password");
            } else {
                console.error("Login error:", err);
            }
        });
    }
    const onRegisterFormSubmit = ({email, password}) => {
        onRegister({email, password})
        .then((res) => {
            if (res.statusCode === 200) {
                toast.success(res.message)
            }
            else {
                console.error(res.message)
            }
        })
        .catch((err) => {
            if (isAxiosError(err) && err.response && err.response.status === 409) {
                toast.error("Email is exist");
            } else {
                console.error("Register in component:", err);
            }
        });
    }
    const onErrorSubmitLogin = (error) => {
        toast.error(error[Object.keys(error)[0]].message);
    }
    const onErrorSubmitRegister = (error) => {
        toast.error(error[Object.keys(error)[0]].message);
    }


    return (
        <main className='authen'>
            <div className="container">
                <section className="title-template">
                    <h2><span>MY ACCOUNT</span><br/>SUNRISE SUIT</h2>
                    <hr />
                </section>
                <section className='authen__form-wrapper'>
                    <div className="form-wrapper__login-form-wrapper">
                        <h6>Login</h6>
                        <form 
                            className="form-wrapper__login-form" 
                            onSubmit={loginForm.handleSubmit(onLoginFormSubmit, onErrorSubmitLogin)}
                            noValidate
                        >
                            <div className="login-form__social-wrapper">
                                <button type='button' onClick={onFacebookLogin}>
                                    <i className="fi fi-brands-facebook"></i>
                                    Login with Facebook
                                </button>
                                <button type='button' onClick={onGoogleLogin}>
                                    <i className="fi fi-brands-google"></i>
                                    Login with Google
                                </button>
                            </div>
                            <div className="login-form__email">
                                <label htmlFor='login-email'>Email address *</label>
                                <Controller
                                    name="email"
                                    control={loginForm.control}
                                    render={({ field }) => (
                                        <input
                                            {...field}
                                            id='login-email'
                                            type='email'
                                        />
                                    )}
                                    rules={{
                                        required: {
                                            value: true,
                                            message: "This field is required"
                                        },
                                        validate: {
                                            matchPattern: (v) => isValidEmail(v) ||
                                            "Email address must be a valid address"
                                        }
                                    }}
                                />
                            </div>
                            <div className="login-form__password">
                                <label htmlFor='login-password'>Password *</label>
                                <Controller
                                    name="password"
                                    control={loginForm.control}
                                    render={({ field }) => (
                                        <input
                                            {...field}
                                            id='login-password'
                                            type='password'
                                        />
                                    )}
                                    rules={{
                                        required: {
                                            value: true,
                                            message: "This field is required"
                                        },
                                        validate: {
                                            matchPattern: (v) => v.length >= 6 ||
                                            "Password must be at least 6 characters long"
                                        }
                                    }}
                                />
                            </div>
                            <div className="login-form__interact">
                                <button type='submit' disabled={isLoginLoading}>
                                    {isLoginLoading ? 'Wait a second' : 'Login'}
                                </button>
                                <Controller
                                    name="isRememberMe"
                                    control={loginForm.control}
                                    render={({ field }) => (
                                    <label>
                                        <input
                                            {...field}
                                            value={field.value.toString()}
                                            type="checkbox"
                                        />
                                        <span className="ml-2 text-gray-700">Remember me</span>
                                    </label>
                                    )}
                                />
                            </div>
                            <Link to={`#`} className='login-form__lost-password'>
                                Lost your password?
                            </Link>
                        </form>
                    </div>
                    <div className="form-wrapper__register-form-wrapper">
                        <h6>Register</h6>
                        <form 
                            className="form-wrapper__register-form"
                            onSubmit={registerForm.handleSubmit(onRegisterFormSubmit, onErrorSubmitRegister)}
                            noValidate
                        >
                            <div className="register-form__email">
                                <label htmlFor='register-email'>Email address *</label>
                                <Controller
                                    name="email"
                                    control={registerForm.control}
                                    render={({ field }) => (
                                        <input
                                            {...field}
                                            id='register-email'
                                            type='email'
                                        />
                                    )}
                                    rules={{
                                        required: {
                                            value: true,
                                            message: "This field is required"
                                        },
                                        validate: {
                                            matchPattern: (v) => isValidEmail(v) ||
                                            "Email address must be a valid address"
                                        }
                                    }}
                                />
                            </div>
                            <div className="register-form__password">
                                <label htmlFor='register-password'>Password *</label>
                                <Controller
                                    name="password"
                                    control={registerForm.control}
                                    render={({ field }) => (
                                        <input
                                            {...field}
                                            id='register-password'
                                            type='password'
                                        />
                                    )}
                                    rules={{
                                        required: {
                                            value: true,
                                            message: "This field is required"
                                        },
                                        validate: {
                                            matchPattern: (v) => v.length >= 6 ||
                                            "Password must be at least 6 characters long"
                                        }
                                    }}
                                />
                            </div>
                            <div className="register-form__interact">
                                <button type='submit' disabled={isRegisterLoading}>
                                    {isRegisterLoading ? 'Wait a second' : 'Register'}
                                </button>
                            </div>
                        </form>
                    </div>
                </section>
            </div>
            <div className="custom-line-template">
                <img src={lineIcon} alt="lineIcon" />
            </div>
        </main>
    );
}

export default Authentication;
