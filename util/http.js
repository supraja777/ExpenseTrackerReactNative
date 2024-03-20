import axios from "axios";

const backendURL =
  "https://expense-tracker-reactnat-f35da-default-rtdb.firebaseio.com";

export async function storeExpense(expenseData) {
  const response = await axios.post(backendURL + "/expenses.json", expenseData);
  const id = response.data.name;
  return id;
}

export async function fetchExpenses() {
  const response = await axios.get(backendURL + "/expenses.json");

  const expenses = [];

  for (const key in response.data) {
    const expenseObj = {
      id: key,
      amount: response.data[key].amount,
      date: new Date(response.data[key].date),
      description: response.data[key].description,
    };

    expenses.push(expenseObj);
  }

  return expenses;
}

export function updateExpense(id, expenseData) {
  return axios.put(backendURL + `/expenses/${id}.json`, expenseData);
}

export  function deleteExpense(id) {
    console.log("delet id  == ", id)
    return axios.delete(backendURL + `/expenses/${id}.json`)
}
