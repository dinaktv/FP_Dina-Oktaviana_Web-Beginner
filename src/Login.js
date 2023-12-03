import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import Button from './component/button';
import './style/style.css';

const Login = () => {
    const [username, usernameupdate] = useState('');
    const [password, passwordupdate] = useState('');

    useEffect(() => {
        sessionStorage.clear();
    }, []);

    const ProceedLogin = (e) => {
        e.preventDefault();
        if (validate()) {
            ///implentation
            // console.log('proceed');
            fetch("http://localhost:3001/user/" + username).then((res) => {
                return res.json();
            }).then((resp) => {
                //console.log(resp)
                if (Object.keys(resp).length === 0) {
                    toast.error('Please Enter valid username');
                } else {
                    if (resp.password === password) {
                        toast.success('Success');
                        sessionStorage.setItem('username', username);
                        sessionStorage.setItem('userrole', resp.role);
                    } else {
                        toast.error('Please Enter valid credentials');
                    }
                }
            }).catch((err) => {
                toast.error('Login Failed due to :' + err.message);
            });
        }
    }

    const validate = () => {
        let result = true;
        if (username === '' || username === null) {
            result = false;
            toast.warning('Please Enter Username');
        }
        if (password === '' || password === null) {
            result = false;
            toast.warning('Please Enter Password');
        }
        return result;
    }

    return (
        <div className="row align-items-center justify-content-center login-form">
            <div className="col-lg-6 wrapper">
                <form onSubmit={ProceedLogin} className="container">
                    <div className="card-header">
                        <h2>Login</h2>
                    </div>
                    <div className="card-body">
                        <div className="input-field">
                            <input type="text" value={username} onChange={e => usernameupdate(e.target.value)} required />
                            <label>Username</label>
                        </div>
                        <div className="input-field">
                            <input type="password" value={password} onChange={e => passwordupdate(e.target.value)} required />
                            <label>Enter your password</label>
                        </div>
                        <div className="forget">
                            <label htmlFor="remember">
                                <input type="checkbox" className="form-check-input m-0" id="remember" />
                                <p className="m-0 ms-2">Remember me</p>
                            </label>
                            <Link className="forgot-password" to={'/'}>Forgot password?</Link>
                        </div>
                    </div>
                    <Button text="Log In" />
                    <div className="register">
                        <p>Don't have an account? <Link className="span" to={'/register'}>Register</Link></p>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Login;