import React, { Fragment, useState, useEffect } from 'react';
import EditTodo from './EditTodo';

const ListTodos = ({ allTodos, setTodosChange }) => {
  const [todos, setTodos] = useState([]);

  // Delete todo function
  async function deleteTodo(id) {
    try {
      await fetch(`http://localhost:5000/dashboard/todos/${id}`, {
        method: 'DELETE',
        headers: { jwt_token: localStorage.token },
      });

      setTodos(todos.filter((todo) => todo.todo_id !== id));
    } catch (err) {
      console.error(err.message);
    }
  }

  useEffect(() => {
    setTodos(allTodos);
  }, [allTodos]);

  return (
    <Fragment>
      <div className="container">
        <table className="table table-sm mt-5 align-middle">
          <thead>
            <tr>
              {/* <th>Description</th>
              <th>Edit</th>
              <th>Delete</th> */}

              <th scope="col">#</th>
              <th scope="col">Description</th>
              <th scope="col"></th>
              <th scope="col"></th>
            </tr>
          </thead>

          <tbody className="table-group-divider">
            {todos.length !== 0 &&
              todos[0].todo_id !== null &&
              todos.map((todo, count) => (
                <tr key={todo.todo_id}>
                  <td>{count + 1}</td>

                  <td>{todo.description}</td>

                  <td>
                    <EditTodo todo={todo} setTodosChange={setTodosChange} />
                  </td>

                  <td>
                    <button
                      type="button"
                      className="btn"
                      onClick={() => deleteTodo(todo.todo_id)}
                    >
                      ❌
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </Fragment>
  );
};

export default ListTodos;
