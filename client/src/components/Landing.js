import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';

const Landing = () => {
  return (
    <Fragment>
      <div className="container">
        <div className="d-flex mt-3 justify-content-between">
          <div>
            <h1>PERN Auth Todo</h1>
          </div>

          <div>
            <div className="d-flex gap-2">
              <Link to="/login" className="btn btn-primary">
                Login
              </Link>

              <Link to="/register" className="btn btn-primary">
                Register
              </Link>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default Landing;
