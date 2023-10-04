import React, { Fragment, useEffect, useState } from 'react';
import { toast } from 'react-toastify';

import InputTodo from './todolist/InputTodo';
import ListTodos from './todolist/ListTodos';

const Dashboard = ({ setAuth }) => {
  const [name, setName] = useState('');
  const [allTodos, setAllTodos] = useState([]);
  const [todosChange, setTodosChange] = useState(false);

  const getProfile = async () => {
    try {
      const res = await fetch('http://localhost:5000/dashboard/', {
        method: 'GET',
        headers: { jwt_token: localStorage.token },
      });

      const parseData = await res.json();

      setAllTodos(parseData);

      setName(parseData[0].user_name);
    } catch (err) {
      console.error(err.message);
    }
  };

  const logout = async (e) => {
    e.preventDefault();

    try {
      localStorage.removeItem('token');
      setAuth(false);
      toast.success('Logged out');
    } catch (err) {
      console.error(err.message);
    }
  };

  useEffect(() => {
    getProfile();
    setTodosChange(false);
  }, [todosChange]);

  return (
    <Fragment>
      <div className="container">
        <div className="d-flex mt-3 mx-3 justify-content-center gap-4">
          <h2>{name}'s Dashboard</h2>

          <div>
            <button onClick={(e) => logout(e)} className="btn btn-secondary">
              Logout
            </button>
          </div>
        </div>

        <InputTodo setTodosChange={setTodosChange} />
        <ListTodos allTodos={allTodos} setTodosChange={setTodosChange} />
      </div>
    </Fragment>
  );
};

export default Dashboard;
