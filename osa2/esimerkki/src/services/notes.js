import axios from "axios";
const baseUrl = "http://localhost:3031/notes";
/*
We no longer return the promise returned by axios directly. Instead, we assign 
the promise to the request variable and call its then method:

The modified getAll function still returns a promise, 
as the then method of a promise also returns a promise.
*/
const getAll = () => {
  const request = axios.get(baseUrl);
  return request.then((response) => response.data);
};

const create = (newObject) => {
  const request = axios.post(baseUrl, newObject);
  return request.then((response) => response.data);
};

const update = (id, newObject) => {
  const request = axios.put(`${baseUrl}/${id}`, newObject);
  return request.then((response) => response.data);
};

export default {
  getAll: getAll,
  create: create,
  update: update,
};
