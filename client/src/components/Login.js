import React, { Fragment, useState } from 'react';
import { Link } from 'react-router-dom';

import { toast } from 'react-toastify';

const Login = ({ setAuth }) => {
  const [inputs, setInputs] = useState({
    email: '',
    password: '',
  });

  const { email, password } = inputs;

  const onChange = (e) =>
    setInputs({ ...inputs, [e.target.name]: e.target.value });

  const onSubmitForm = async (e) => {
    e.preventDefault();
    try {
      const body = { email, password };
      const response = await fetch(
        'http://localhost:5000/authentication/login',
        {
          method: 'POST',
          headers: {
            'Content-type': 'application/json',
          },
          body: JSON.stringify(body),
        }
      );

      const parseRes = await response.json();

      if (parseRes.jwtToken) {
        localStorage.setItem('token', parseRes.jwtToken);
        setAuth(true);
        // toast.success("Logged in Successfully");
      } else {
        setAuth(false);
        // toast.error(parseRes);
      }
    } catch (err) {
      console.error(err.message);
    }
  };

  return (
    <Fragment>
      <div className="container">
        <div>
          <h1 className="mt-5 mb-3 text-center">Login</h1>
        </div>

        <div className="d-grid justify-content-center gap-2">
          <form onSubmit={onSubmitForm}>
            <div className="mb-3">
              <label htmlFor="emailFormControlInput" className="form-label">
                Email address
              </label>
              <input
                type="text"
                name="email"
                className="form-control"
                id="emailFormControlInput"
                placeholder="name@example.com"
                value={email}
                onChange={(e) => onChange(e)}
              />
            </div>

            <div className="mb-3">
              <label htmlFor="inputPassword" className="form-label">
                Password
              </label>
              <input
                type="password"
                name="password"
                className="form-control"
                id="inputPassword"
                placeholder="Password"
                value={password}
                onChange={(e) => onChange(e)}
              />
            </div>

            <button type="submit" className="btn btn-primary">
              Login
            </button>
          </form>

          <div>
            <Link to="/register" className="btn btn-outline-primary">
              Register
            </Link>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default Login;
