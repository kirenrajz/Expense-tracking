import axios from "./axiosConfig";

const ENDPOINT = "/api/expenses";

export async function fetchExpenses() {
  const { data } = await axios.get(ENDPOINT);
  return data; // Expense[]
}

export async function addExpense(expense) {
  const { data } = await axios.post(ENDPOINT, expense);
  return data;
}

export async function updateExpense(id, expense) {
  const { data } = await axios.put(`${ENDPOINT}/${id}`, expense);
  return data;
}

export async function deleteExpense(id) {
  await axios.delete(`${ENDPOINT}/${id}`);
}

export async function fetchExpenseById(id) {
  const { data } = await axios.get(`${ENDPOINT}/${id}`);
  return data;
}
