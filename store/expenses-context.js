import { createContext, useReducer } from "react";

export const ExpensesContext = createContext({
  expenses: [],
  setExpenses: ((expenses) => {}),
  addExpense: ({ description, amount, date }) => {},
  deleteExpense: (id) => {},
  updateExpense: (id, { description, amount, date }) => {},
});

function expensesReducer(state, action) {
  switch (action.type) {
    case "ADD":
      return [ action.payload, ...state];

    case "SET":
      const invertedArray = action.payload.reverse()
      return invertedArray;

    case "UPDATE":
      const updatableIndex = state.findIndex(
        (expense) => expense.id === action.payload.id
      );
      const updatableExpense = state[updatableIndex];
      const updatedItem = { ...updatableExpense, ...action.payload.data };
      const updatedExpenses = [...state];
      updatedExpenses[updatableIndex] = updatedItem;

      return updatedExpenses;
    case "DELETE":
      return state.filter((expense) => expense.id !== action.payload.id);

    default:
      return state;
  }
}

function ExpensesContextProvider({ children }) {
  
  const [expensesState, dispatch] = useReducer(expensesReducer, []);

  function setExpenses(expenses) {
    dispatch({type: 'SET', payload: expenses})
  }

  function addExpense(expenseData) {
    dispatch({ type: "ADD", payload: expenseData });
  }

  function deleteExpense(id) {
    dispatch({ type: "DELETE", payload: {id} });
  }

  function updateExpense(id, expenseData) {
    dispatch({ type: "UPDATE", payload: { id, data: expenseData } });
  }

  const value = {expenses: expensesState, addExpense: addExpense, deleteExpense: deleteExpense, updateExpense: updateExpense, setExpenses: setExpenses }

  return <ExpensesContext.Provider value={value}>{children}</ExpensesContext.Provider>;
}

export default ExpensesContextProvider;
