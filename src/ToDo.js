import "./ToDo.css";
import TextField from "@mui/material/TextField";
import {  useState } from "react";
import { Button, CircularProgress } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";

import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import { addToDo, removeToDo ,deleteToDo} from "./States/todoSlice";
import { nanoid } from "@reduxjs/toolkit";

function ToDo() {
  const [toDoList, setToDoList] = useState([]);
  const dispatch = useDispatch();
  const {taskList: task , loading : load} = useSelector(
    (state) => state.todolist
  );

  return (
    <div className="App">
      <div>
        <h1 className="heading">
          {" "}
          <span style={{ color: "orange" }}>To Do</span> List
        </h1>
        <TextField
          id="outlined-basic"
          label="Add To Do"
          variant="outlined"
          onChange={(e) => {
            setToDoList(e.target.value);
          }}
        />
        <Button
          id="btn"
          variant="contained"
          color="success"
          onClick={(e) => {
            e.preventDefault();
            dispatch( addToDo({task :toDoList , id: nanoid()}));
          }}
        >
          {" "}
          <AddIcon></AddIcon>
        </Button>
        <div>
          {load === true ? (
          <CircularProgress color="secondary" />
          ) : (
            <div>
              {task.length === 0 ? (
                ""
              ) : (
                <Button
                  id="btn-2"
                  color="secondary"
                  variant="contained"
                  onClick={() => {
                    dispatch(removeToDo());
                  }}
                >
                  CLear
                </Button>
              )}
              {task.map((val) => {
                return (
                  <div>
                    <div className="task" key={val.id}>
                      <h3>{val.task}</h3>
                      <Button
                        id="btn"
                        onClick={() => {
                          dispatch(deleteToDo(val.id));
                          console.log(val.id);
                        }}
                      >
                        <DeleteIcon></DeleteIcon>
                      </Button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default ToDo;
