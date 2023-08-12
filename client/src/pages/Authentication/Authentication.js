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
    useIsLogged,
    useLogout
} from '../../libs/business-logic/src/lib/auth'
import { isAxiosError } from "../../libs/services/src";
import lineIcon from '../../assets/images/graphics/review-decor.png';

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
    const measureForm = useForm({
        defaultValues: {
            name: "",
            height: "",
            weight: "",
            age: "",
            chest: "",
            waist: "",
            hip: "",
            neck: "",
            armhole: "",
            biceps: "",
            shoulder: "",
            sleeve_length: "",
            jaket_length: "",
            paints_waist: "",
            crotch: "",
            thigh: "",
            pants_length: "",
        }
    });

    const { onLogin, isLoading: isLoginLoading } = useLogin();
    const { onRegister, isLoading: isRegisterLoading } = useRegister();
    const { onGoogleLogin } = useGoogleLogin(); // Add isLoading if needed
    const { onFacebookLogin } = useFacebookLogin(); // Add isLoading if needed
    const isLoggedIn = useIsLogged();
    const { onLogout } = useLogout();

    const onLoginFormSubmit = ({ email, password, isRememberMe }) => {
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
    const onRegisterFormSubmit = ({ email, password }) => {
        onRegister({ email, password })
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
    const onMeasureSubmit = (data) => {

    }
    const onErrorMeasure = (err) => {
        
    }


    return (
        <main className='authen'>
            <div className="container">
                {
                    !isLoggedIn ?
                        <>
                            <section className="title-template">
                                <h2><span>MY ACCOUNT</span><br />QUEENSMAN</h2>
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
                                                        <span>Remember me</span>
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
                        </> :
                        <>
                            <section className="title-template">
                                <h2><span>MY ACCOUNT</span><br />QUEENSMAN</h2>
                                <hr />
                            </section>
                            <section className='authen__infor-wrapper'>
                                <ul className="infor-wrapper__nav">
                                    <li><button className='active'>MY MEASURES</button></li>
                                    <li><button>Orders</button></li>
                                    <li><button>Downloads</button></li>
                                    <li><button>Addresses</button></li>
                                    <li><button>Account details</button></li>
                                    <li><button onClick={onLogout}>Logout</button></li>
                                </ul>
                                <form 
                                    className="infor-wrapper__measures"
                                    onSubmit={measureForm.handleSubmit(onMeasureSubmit, onErrorMeasure)}
                                >
                                    <section className="title-template">
                                        <h2><span>MY MEASURES</span></h2>
                                        <hr />
                                    </section>
                                    <div className="measures__row">
                                        <Controller
                                            name="name"
                                            control={measureForm.control}
                                            render={({ field }) => (
                                                <div className='row-input__wrapper'>
                                                    <div className='row__input'>
                                                        <input
                                                            {...field}
                                                            value={field.value.toString()}
                                                            type="text"
                                                        />
                                                        <span>Name</span>
                                                    </div>
                                                </div>
                                            )}
                                        />
                                    </div>
                                    <div className="measures__row">
                                        <Controller
                                            name="height"
                                            control={measureForm.control}
                                            render={({ field }) => (
                                                <div className='row-input__wrapper'>
                                                    <div className='row__input'>
                                                        <input
                                                            {...field}
                                                            value={field.value.toString()}
                                                            type="number"
                                                        />
                                                        <span>height(cm)</span>
                                                    </div>
                                                </div>
                                            )}
                                        />
                                        <Controller
                                            name="weight"
                                            control={measureForm.control}
                                            render={({ field }) => (
                                                <div className='row-input__wrapper'>
                                                    <div className='row__input'>
                                                        <input
                                                            {...field}
                                                            value={field.value.toString()}
                                                            type="number"
                                                        />
                                                        <span>weight(kg)</span>
                                                    </div>
                                                </div>
                                            )}
                                        />
                                        <Controller
                                            name="age"
                                            control={measureForm.control}
                                            render={({ field }) => (
                                                <div className='row-input__wrapper'>
                                                    <div className='row__input'>
                                                        <input
                                                            {...field}
                                                            value={field.value.toString()}
                                                            type="number"
                                                        />
                                                        <span>age</span>
                                                    </div>
                                                </div>
                                            )}
                                        />
                                    </div>
                                    <div className="measures__row">
                                        <Controller
                                            name="chest"
                                            control={measureForm.control}
                                            render={({ field }) => (
                                                <div className='row-input__wrapper'>
                                                    <label htmlFor="chest">chest</label>
                                                    <div className='row__input'>
                                                        <input
                                                            {...field}
                                                            value={field.value.toString()}
                                                            type="number"
                                                            id="chest"
                                                        />
                                                        <span>cm</span>
                                                    </div>
                                                </div>
                                            )}
                                        />
                                        <Controller
                                            name="waist"
                                            control={measureForm.control}
                                            render={({ field }) => (
                                                <div className='row-input__wrapper'>
                                                    <label htmlFor="waist">waist</label>
                                                    <div className='row__input'>
                                                        <input
                                                            {...field}
                                                            value={field.value.toString()}
                                                            type="number"
                                                            id="waist"
                                                        />
                                                        <span>cm</span>
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
                                                <div className='row-input__wrapper'>
                                                    <label htmlFor="hip">hip</label>
                                                    <div className='row__input'>
                                                        <input
                                                            {...field}
                                                            value={field.value.toString()}
                                                            type="number"
                                                            id="hip"
                                                        />
                                                        <span>cm</span>
                                                    </div>
                                                </div>
                                            )}
                                        />
                                        <Controller
                                            name="neck"
                                            control={measureForm.control}
                                            render={({ field }) => (
                                                <div className='row-input__wrapper'>
                                                    <label htmlFor="neck">neck</label>
                                                    <div className='row__input'>
                                                        <input
                                                            {...field}
                                                            value={field.value.toString()}
                                                            type="number"
                                                            id="neck"
                                                        />
                                                        <span>cm</span>
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
                                                <div className='row-input__wrapper'>
                                                    <label htmlFor="armhole">armhole</label>
                                                    <div className='row__input'>
                                                        <input
                                                            {...field}
                                                            value={field.value.toString()}
                                                            type="number"
                                                            id="armhole"
                                                        />
                                                        <span>cm</span>
                                                    </div>
                                                </div>
                                            )}
                                        />
                                        <Controller
                                            name="biceps"
                                            control={measureForm.control}
                                            render={({ field }) => (
                                                <div className='row-input__wrapper'>
                                                    <label htmlFor="biceps">biceps</label>
                                                    <div className='row__input'>
                                                        <input
                                                            {...field}
                                                            value={field.value.toString()}
                                                            type="number"
                                                            id="biceps"
                                                        />
                                                        <span>cm</span>
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
                                                <div className='row-input__wrapper'>
                                                    <label htmlFor="shoulder">shoulder</label>
                                                    <div className='row__input'>
                                                        <input
                                                            {...field}
                                                            value={field.value.toString()}
                                                            type="number"
                                                            id="shoulder"
                                                        />
                                                        <span>cm</span>
                                                    </div>
                                                </div>
                                            )}
                                        />
                                        <Controller
                                            name="sleeve_length"
                                            control={measureForm.control}
                                            render={({ field }) => (
                                                <div className='row-input__wrapper'>
                                                    <label htmlFor="sleeve_length">sleeve_length</label>
                                                    <div className='row__input'>
                                                        <input
                                                            {...field}
                                                            value={field.value.toString()}
                                                            type="number"
                                                            id="sleeve_length"
                                                        />
                                                        <span>cm</span>
                                                    </div>
                                                </div>
                                            )}
                                        />
                                    </div>
                                    <div className="measures__row">
                                        <Controller
                                            name="jaket_length"
                                            control={measureForm.control}
                                            render={({ field }) => (
                                                <div className='row-input__wrapper'>
                                                    <label htmlFor="jaket_length">jaket_length</label>
                                                    <div className='row__input'>
                                                        <input
                                                            {...field}
                                                            value={field.value.toString()}
                                                            type="number"
                                                            id="jaket_length"
                                                        />
                                                        <span>cm</span>
                                                    </div>
                                                </div>
                                            )}
                                        />
                                        <Controller
                                            name="paints_waist"
                                            control={measureForm.control}
                                            render={({ field }) => (
                                                <div className='row-input__wrapper'>
                                                    <label htmlFor="paints_waist">paints_waist</label>
                                                    <div className='row__input'>
                                                        <input
                                                            {...field}
                                                            value={field.value.toString()}
                                                            type="number"
                                                            id="paints_waist"
                                                        />
                                                        <span>cm</span>
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
                                                <div className='row-input__wrapper'>
                                                    <label htmlFor="crotch">crotch</label>
                                                    <div className='row__input'>
                                                        <input
                                                            {...field}
                                                            value={field.value.toString()}
                                                            type="number"
                                                            id="crotch"
                                                        />
                                                        <span>cm</span>
                                                    </div>
                                                </div>
                                            )}
                                        />
                                        <Controller
                                            name="thigh"
                                            control={measureForm.control}
                                            render={({ field }) => (
                                                <div className='row-input__wrapper'>
                                                    <label htmlFor="thigh">thigh</label>
                                                    <div className='row__input'>
                                                        <input
                                                            {...field}
                                                            value={field.value.toString()}
                                                            type="number"
                                                            id="thigh"
                                                        />
                                                        <span>cm</span>
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
                                                <div className='row-input__wrapper'>
                                                    <label htmlFor="pants_length">pants_length</label>
                                                    <div className='row__input'>
                                                        <input
                                                            {...field}
                                                            value={field.value.toString()}
                                                            type="number"
                                                            id="pants_length"
                                                        />
                                                        <span>cm</span>
                                                    </div>
                                                </div>
                                            )}
                                        />
                                    </div>
                                    
                                    <div className="measures__submit">
                                        <button type='submit'>Confirm</button>
                                    </div>

                                </form>
                            </section>
                        </>
                }
            </div>
            <div className="custom-line-template">
                <img src={lineIcon} alt="lineIcon" />
            </div>
        </main>
    );
}

export default Authentication;
