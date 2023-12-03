import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Button from './component/button';
import './style/style.css';

const Register = () => {

    const [id, idchange] = useState("");
    const [name, namechange] = useState("");
    const [password, passwordchange] = useState("");
    const [email, emailchange] = useState("");

    // Mengarahkan halaman setelah terjadi trigger
    const navigate = useNavigate();

    // Pengkondisian untuk eror message
    const IsValidate = () => {
        let isproceed = true;
        let errormessage = 'Please enter the value in ';
        if (id === null || id === '') {
            isproceed = false;
            errormessage += ' Username';
        }
        if (name === null || name === '') {
            isproceed = false;
            errormessage += ' Fullname';
        }
        if (password === null || password === '') {
            isproceed = false;
            errormessage += ' Password';
        }
        if (email === null || email === '') {
            isproceed = false;
            errormessage += ' Email';
        }

        if (!isproceed) {
            toast.warning(errormessage)
        } else {
            if (/^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/.test(email)) {

            } else {
                isproceed = false;
                toast.warning('Please enter the valid email')
            }
        }
        return isproceed;
    }

    // Logika untuk mengatur saat pengiriman data form, sebelum dan sesudah
    const handlesubmit = (e) => {
        e.preventDefault();
        let regobj = { id, name, password, email };
        if (IsValidate()) {
            //console.log(regobj);
            fetch("http://localhost:3001/user/", {
                method: "POST",
                headers: { 'content-type': 'application/json' },
                body: JSON.stringify(regobj)
            }).then((res) => {
                toast.success('Registered successfully.')
                navigate('/');
            }).catch((err) => {
                toast.error('Failed :' + err.message);
            });
        }
    }

    // Kode tampilan
    return (
        <div className="row align-items-center justify-content-center login-form">
            <div className="col-lg-6 wrapper">
                <form onSubmit={handlesubmit} className="container">
                    <div className="card-header">
                        <h2>Registration</h2>
                    </div>
                    <div className="card-body">
                        <div className="input-field">
                            <input type="text" value={id} onChange={e => idchange(e.target.value)} required />
                            <label>Username</label>
                        </div>
                        <div className="input-field">
                            <input type="text" value={name} onChange={e => namechange(e.target.value)} required />
                            <label>Full Name</label>
                        </div>
                        <div className="input-field">
                            <input type="text" value={email} onChange={e => emailchange(e.target.value)} required />
                            <label>Email</label>
                        </div>
                        <div className="input-field">
                            <input type="password" value={password} onChange={e => passwordchange(e.target.value)} required />
                            <label>Enter your password</label>
                        </div>
                    </div>
                    <div className="mt-4">
                        <Button text="Register" />
                    </div>
                    <div className="register">
                        <p>already have an account? <Link className="span" to={'/'}>Login</Link></p>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Register;