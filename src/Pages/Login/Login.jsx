import "./Login.scss";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logIn } from "../../actions/AuthAction";
import swal from 'sweetalert'

const Login = () => {
    const Navigate = useNavigate()
    const dispatch = useDispatch()
    const { loading, error, authData } = useSelector((state) => state.authReducer)

    const [data, setData] = useState({
        email: "",
        password: "",
    })

    const handleSubmit = (e) => {
        e.preventDefault();
        if (data.email.length < 5 || data.password.length < 8) {
            swal({
                title: "Opss ,there is an Error !",
                text: "Check Your Password Or Email",
                icon: "error",
                button: "Aww nooo!",
            });
        }
        else if (true) {
            dispatch(logIn(data))
        }
    };

    useEffect(() => {
        if (authData && !loading) {
            Navigate('/');
        }
    }, [loading])


    const checkerror = () => {
        if (error === true) {
            dispatch({ type: "AUTH_START_INT" })
            swal({
                title: "Opss ,there is an Error !",
                text: "Your Password Or Email Are Wrong | Please try again",
                icon: "error",
                button: "Aww nooo!",
            });
        }
    }
    checkerror();
    const handelChange = (e) => {
        setData({
            ...data,
            [e.target.name]: e.target.value,
        })
    }

    return (

        <div className="register">
            <img src={""} alt="" />
            <div className="header">
                <h1>Sign In to <span> HASHTAG </span> Platform</h1>
                <h3>Don't have an account ? <Link to="/register"><span>sign Up</span></Link></h3>
            </div>

            <div className="box">
                <div className="content">
                    <form onSubmit={handleSubmit}>

                        <input
                            required
                            type="email"
                            name="email"
                            value={data.email}
                            onChange={handelChange}
                            placeholder="Email" />

                        <input
                            required
                            type="password"
                            name="password"
                            value={data.password}
                            onChange={handelChange}
                            placeholder="Password" />

                        <div className="new">
                            <div className="inside">
                                <input type='checkbox' />
                                <p>Remember me</p>
                            </div>
                            <div className="pass">
                                <a href="#">forget your password?</a>
                            </div>
                        </div>
                        <button display={loading}>{loading ? "loading ..." : "Log in"}</button>
                    </form>

                </div>

                <div className="line-container">
                    <div className="line"></div>
                    <p>Or</p>
                    <div className="line"></div>
                </div>


                {/* <div className="social-option">
                    <div className="groub-1">
                        <img src={google} alt="" />
                        <button className="btn-1"> continue with Google</button>
                    </div>

                    <div className="groub-1">
                        <img src={facebook} alt="" />
                        <button className="btn-2"> continue with FaceBook</button>
                    </div>
                </div> */}
            </div >

            <div className="footor">
                <p>
                    * By signing up, you agree to our Terms of Use and acknowledge you’ve read our Privacy Policy
                </p>
                <hr />
                <p>
                    This site is protected by reCAPTCHA Enterprise. Google's Privacy Policy and Terms of Use apply.
                </p>
            </div>
        </div >
    );
};

export default Login;