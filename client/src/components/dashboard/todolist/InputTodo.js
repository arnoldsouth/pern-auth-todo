import React, { Fragment, useState } from 'react';

const InputTodo = ({ setTodosChange }) => {
  const [description, setDescription] = useState('');

  const onSubmitForm = async (e) => {
    e.preventDefault();
    try {
      const myHeaders = new Headers();

      myHeaders.append('Content-Type', 'application/json');
      myHeaders.append('jwt_token', localStorage.token);

      const body = { description };
      const response = await fetch('http://localhost:5000/dashboard/todos', {
        method: 'POST',
        headers: myHeaders,
        body: JSON.stringify(body),
      });

      const parseResponse = await response.json();

      console.log(parseResponse);

      setTodosChange(true);
      setDescription('');
    } catch (err) {
      console.error(err.message);
    }
  };
  return (
    <Fragment>
      <div className="container">
        <div className="d-grid justify-content-center gap-2">
          <div>
            <h5 className="text-center mt-5">Add New Todo</h5>
          </div>

          <div>
            <form className="d-flex gap-2" onSubmit={onSubmitForm}>
              <input
                type="text"
                placeholder="Walk Touka"
                className="form-control"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />

              <button className="btn btn-primary">Add</button>
            </form>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default InputTodo;
