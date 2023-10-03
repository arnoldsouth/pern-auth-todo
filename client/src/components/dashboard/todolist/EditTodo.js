import React, { Fragment, useState } from 'react';

const EditTodo = ({ todo, setTodosChange }) => {
  const [description, setDescription] = useState(todo.description);

  // Edit todo function
  const editText = async (id) => {
    try {
      const body = { description };

      const myHeaders = new Headers();
      myHeaders.append('Content-Type', 'application/json');
      myHeaders.append('jwt_token', localStorage.token);

      await fetch(`http://localhost:5000/dashboard/todos/${id}`, {
        method: 'PUT',
        headers: myHeaders,
        body: JSON.stringify(body),
      });

      setTodosChange(true);

      // window.location = "/";
    } catch (err) {
      console.error(err.message);
    }
  };

  return (
    <Fragment>
      <button
        type="button"
        className="btn"
        data-bs-toggle="modal"
        data-bs-target={`#id${todo.todo_id}`}
        onClick={() => setDescription(todo.description)}
      >
        ✏️
      </button>

      <div
        className="modal fade"
        id={`id${todo.todo_id}`}
        // tabIndex="-1"
        aria-labelledby={`id${todo.todo_id}Label`}
        aria-hidden="true"
        // onClick={() => setDescription(todo.description)}
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id={`id${todo.todo_id}Label`}>
                Edit
              </h1>

              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
                onClick={() => setDescription(todo.description)}
              ></button>
            </div>

            <div className="modal-body">
              <input
                type="text"
                className="form-control"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>

            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
                onClick={() => setDescription(todo.description)}
              >
                Close
              </button>

              <button
                type="button"
                className="btn btn-primary"
                data-bs-dismiss="modal"
                onClick={() => editText(todo.todo_id)}
              >
                Save
              </button>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default EditTodo;
