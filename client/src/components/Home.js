import React, { useEffect, useContext, useState } from "react";
import { AuthContext, DispatchContext } from "./AuthProvider";
import styled from "styled-components";
import { Add, ArrowUpward, Done, Clear } from "@material-ui/icons";
import { Button, Input } from "@material-ui/core";

const SingleTodo = ({ todo, updateTodo }) => {
  const [item, setItem] = useState(todo);

  return (
    <div className="todo-row">
      <h3>
        <span
          style={{
            textDecoration: item.isCompleted ? "line-through" : "none",
          }}
        >
          {item.name}
        </span>
        <span>
          {item.isCompleted ? (
            <ArrowUpward
              onClick={() => {
                const tmp = item;
                item.isCompleted = false;
                updateTodo(item).then(() => setItem(tmp));
              }}
            />
          ) : (
            <Done
              onClick={() => {
                const tmp = item;
                item.isCompleted = true;
                updateTodo(item).then(() => setItem(tmp));
              }}
            />
          )}
        </span>
        <span>
          <Clear
            onClick={() => {
              const tmp = item;
              item.isDeleted = true;
              updateTodo(item).then(() => setItem(tmp));
            }}
          />
        </span>
      </h3>
    </div>
  );
};

const TodoList = ({ todos, setTodos }) => {
  const currentUser = useContext(AuthContext);
  const [name, setName] = useState("");
  const [state, setState] = useState(true);

  const addTodo = async () => {
    try {
      const response = await fetch("https://karahantodoapp.herokuapp.com/api/todo/add", {
        method: "POST",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify({ userId: currentUser._id, name: name }),
      });
    } catch (err) {}
  };

  const updateTodo = async (newTodo) => {
    try {
      const response = await fetch(
        `https://karahantodoapp.herokuapp.com/api/todo/update/${newTodo._id}`,
        {
          method: "PATCH",
          headers: { "Content-type": "application/json" },
          body: JSON.stringify(newTodo),
        }
      );
      if (response.status === 200) return true;
      else return false;
    } catch {
      return false;
    }
  };

  const setAllDone = async () => {
    const updatedTodos = await Promise.all(todos.map(async (item) => {
      item.isCompleted = true;
      await updateTodo(item);
      return item;
    }))
    setTodos([])
  };

  return (
    <TodosWrapper>
      <div className="todo-row">
        <Input
          value={name}
          placeholder="Name"
          onChange={(e) => setName(e.target.value)}
        ></Input>
        <Add onClick={() => addTodo()} />
      </div>
      {todos.map((todo) => {
        return (
          <SingleTodo key={todo._id} todo={todo} updateTodo={updateTodo} />
        );
      })}
      <Button onClick={() => setAllDone()}>All Done</Button>
    </TodosWrapper>
  );
};

function Home() {
  const currentUser = useContext(AuthContext);
  const dispatch = useContext(DispatchContext);
  const [todos, setTodos] = useState([]);

  useEffect(async () => {
    try {
      const response = await fetch(
        `https://karahantodoapp.herokuapp.com/api/todo/${currentUser._id}`
      );
      response
        .json()
        .then((result) => {
          setTodos(result);
        })
        .catch((err) => {
          console.log(err);
        });
    } catch (err) {
      console.log(err);
    }
  });

  return (
    <React.Fragment>
      <NavbarWrapper>
        <h1>Todo App</h1>
        <div
          className="options"
          onClick={() => dispatch({ type: "LOGIN", payload: null })}
        >
          Log Out
        </div>
      </NavbarWrapper>
      <TodoList todos={todos} setTodos={setTodos}/>
    </React.Fragment>
  );
}

export default Home;

const NavbarWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  background: cornflowerblue;
  padding: 20px;
  align-items: center;
  color: #fff;

  .options {
    font-size: 1.2rem;
  }
  span {
    margin: 20px;
  }
`;

const TodosWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  border: 3px solid #000;
  border-radius: 20px;
  width: 50%;
  margin: 20px auto;

  .todo-row {
    padding: 20px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;

    input {
    }
  }
`;
