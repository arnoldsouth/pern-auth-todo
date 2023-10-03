import React, { Fragment, useState } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';

const Register = ({ setAuth }) => {
  const [inputs, setInputs] = useState({
    email: '',
    password: '',
    name: '',
  });

  const { email, password, name } = inputs;

  const onChange = (e) =>
    setInputs({ ...inputs, [e.target.name]: e.target.value });

  const onSubmitForm = async (e) => {
    e.preventDefault();
    try {
      const body = { email, password, name };
      const response = await fetch(
        'http://localhost:5000/authentication/register',
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
        // toast.success("Register Successfully");
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
        <h1 className="mt-5 mb-3 text-center">Register</h1>

        <div className="d-grid justify-content-center gap-2">
          <form onSubmit={onSubmitForm}>
            <div className="mb-3">
              <label
                htmlFor="emailRegisterFormControlInput"
                className="form-label"
              >
                Email address
              </label>
              <input
                type="text"
                name="email"
                className="form-control form-control-sm"
                id="emailRegisterFormControlInput"
                placeholder="name@example.com"
                value={email}
                onChange={(e) => onChange(e)}
              />
            </div>

            <div className="mb-3">
              <label htmlFor="inputPasswordRegister" className="form-label">
                Password
              </label>
              <input
                type="password"
                name="password"
                className="form-control form-control-sm"
                id="inputPasswordRegister"
                placeholder="Password"
                value={password}
                onChange={(e) => onChange(e)}
              />
            </div>

            <div className="mb-3">
              <label
                htmlFor="nameRegisterFormControlInput"
                className="form-label"
              >
                Name
              </label>
              <input
                type="text"
                name="name"
                className="form-control form-control-sm"
                id="nameRegisterFormControlInput"
                placeholder="Name"
                value={name}
                onChange={(e) => onChange(e)}
              />
            </div>

            <button type="submit" className="btn btn-primary btn-sm">
              Register
            </button>
          </form>

          <div>
            <Link to="/login" className="btn btn-outline-primary btn-sm">
              Login
            </Link>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default Register;
