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
      <div>
        <h5 className="text-center mt-5">Add New Todo</h5>
      </div>

      <div>
        <form className="d-flex gap-3" onSubmit={onSubmitForm}>
          <input
            type="text"
            placeholder="Walk Touka"
            className="form-control form-control-sm"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />

          <button className="btn btn-primary btn-sm">Add</button>
        </form>
      </div>
    </Fragment>
  );
};

export default InputTodo;
