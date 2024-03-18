import { createContext, useReducer } from "react";

export const ExpensesContext = createContext({
  expenses: [],
  addExpense: ({ description, amount, date }) => {},
  deleteExpense: (id) => {},
  updateExpense: (id, { description, amount, date }) => {},
});

function expensesReducer(state, action) {
  switch (action.type) {
    case "ADD":
      const id = new Date().toString() + Math.random().toString();
      return [{ ...action.payload, id: id }, ...state];

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
  const DUMMY_EXPENSES = [
    {
      id: "e1",
      description: "Udemy course",
      amount: 872,
      date: new Date("2024-3-19"),
    },
    {
      id: "e2",
      description: "Coursera course",
      amount: 872,
      date: new Date("2021-12-19"),
    },
    {
      id: "e3",
      description: "Shoe",
      amount: 872,
      date: new Date("2021-12-19"),
    },
    {
      id: "e4",
      description: "Book",
      amount: 872,
      date: new Date("2021-12-19"),
    },
    {
      id: "e5",
      description: "Dress",
      amount: 872,
      date: new Date("2021-12-19"),
    },
    {
      id: "e6",
      description: "Udemy course",
      amount: 872,
      date: new Date("2021-12-19"),
    },
    {
      id: "e7",
      description: "Udemy course",
      amount: 872,
      date: new Date("2021-12-19"),
    },
    {
      id: "e8",
      description: "Udemy course",
      amount: 872,
      date: new Date("2021-12-19"),
    },
    {
      id: "e9",
      description: "Coursera course",
      amount: 872,
      date: new Date("2021-12-19"),
    },
    {
      id: "e10",
      description: "Shoe",
      amount: 872,
      date: new Date("2021-12-19"),
    },
    {
      id: "e11",
      description: "Book",
      amount: 872,
      date: new Date("2021-12-19"),
    },
    {
      id: "e12",
      description: "Dress",
      amount: 872,
      date: new Date("2021-12-19"),
    },
    {
      id: "e13",
      description: "Udemy course",
      amount: 872,
      date: new Date("2021-12-19"),
    },
    {
      id: "e14",
      description: "Udemy course",
      amount: 872,
      date: new Date("2021-12-19"),
    },
  ];
  const [expensesState, dispatch] = useReducer(expensesReducer, DUMMY_EXPENSES);

  function addExpense(expenseData) {
    dispatch({ type: "ADD", payload: expenseData });
  }

  function deleteExpense(id) {
    dispatch({ type: "DELETE", payload: {id} });
  }

  function updateExpense(id, expenseData) {
    dispatch({ type: "UPDATE", payload: { id, data: expenseData } });
  }

  const value = {expenses: expensesState, addExpense: addExpense, deleteExpense: deleteExpense, updateExpense: updateExpense }

  return <ExpensesContext.Provider value={value}>{children}</ExpensesContext.Provider>;
}

export default ExpensesContextProvider;
