import axios from "axios";

const taskAPI = axios.create({
  baseURL: "http://localhost:8000/tasks/api/v1/tasks/",
});

// Es lo mismo ambas funciones en cuanto a sintaxis,
//una más corta que la otra pero mismo tipo de uso
export const getAllTasks = () => taskAPI.get("/");

export const getTask = (id) => taskAPI.get("/" + id);

export const createTask = (task) => {
  //   return axios.post("http://localhost:8000/tasks/api/v1/tasks/");
  return taskAPI.post("/", task);
};

export const deleteTask = (id) => taskAPI.delete("/" + id + "/");

export const updateTask = (id, task) => taskAPI.put("/" + id + "/", task);
