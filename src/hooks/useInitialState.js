import { useState, useEffect } from "react";

const initialState = {
  email: "",
  password: "",
  auth: false,
};
const useInitialState = () => {
  const [state, setState] = useState(initialState);
  const [filter, setFilter] = useState("");
  useEffect(() => {
    const localStorageItem = localStorage.getItem("hola");
    let parsedItem;

    if (!localStorageItem) {
      localStorage.setItem("hola", JSON.stringify(initialState));
      parsedItem = initialState;
    } else {
      parsedItem = JSON.parse(localStorageItem);
    }

    setState(parsedItem);
  }, []);
  const saveState = (newItem) => {
    const stringifiedItem = JSON.stringify(newItem);
    localStorage.setItem("hola", stringifiedItem);
    setState(newItem);
  };

  return {
    state,
    filter,
    setFilter,

    saveState,
  };
};
export default useInitialState;
