import React, { useState } from 'react';
// import { Navigate } from 'react-router-dom';
import '../styles/LogIn.css';

export const LogIn = ({ user, setUser, userList, setValidate, validate }) => {
    const [error, setError] = useState('');

    const handleChangeInput = (event) => {
        const {
            target: { value, name }
        } = event;
        setUser({ ...user, [name]: value });
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        if (userList === null) {
            setError('There is no registered user...');
            return;
        }
        const exists = userList.find((list) => list.email === user.email);

        if (exists !== undefined) {
            if (exists.password === user.password) {
                console.log('Log in correcto: ', user);
                localStorage.setItem('Logged', JSON.stringify(user));
                setError('');
                setValidate(true);

                // if (validate === true) {
                //     console.log(validate);
                //     return <Navigate to="/" />;
                // }
                return;
            }
            setError('You have entered an invalid e-mail or password.');
            setTimeout(() => {
                setError('');
            }, 5000);
        } else {
            setError('You have entered an invalid e-mail or password.');
            setTimeout(() => {
                setError('');
            }, 5000);
        }
    };

    return (
        <div className="login-container">
            <form className="login-card" onSubmit={handleSubmit}>
                <input
                    className="login-input"
                    type="email"
                    id="email"
                    name="email"
                    placeholder="Email Address"
                    onChange={handleChangeInput}
                    required
                />
                <input
                    className="login-input"
                    type="password"
                    id="password"
                    name="password"
                    placeholder="Password"
                    onChange={handleChangeInput}
                    required
                />
                {error !== '' ? <p className="error-login">{error}</p> : ''}
                <button className="btn-login-form" type="submit">
                    Log in
                </button>
            </form>
        </div>
    );
};