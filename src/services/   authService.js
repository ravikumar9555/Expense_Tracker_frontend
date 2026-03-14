import api from "../api/axiosConfig";


// LOGIN
export const loginUser = async (username, password) => {

  const response = await api.post("/login", {
    username,
    password
  });

  return response.data;
};


// SIGNUP
export const signupUser = async (username, password) => {

  const response = await api.post("/signup", {
    username,
    password
  });

  return response.data;
};


// ADD EXPENSE
export const addExpenseApi = async (expense) => {

  const response = await api.post("/addExpense", expense);

  return response.data;
};



export const updateExpenseApi = async (expense) => {

  const response = await api.post("/updateExpense", {
    expenseId: expense.expenseId,
    description: expense.description,
    amount: Number(expense.amount),
    platform: expense.platform,
    transactionDate: expense.transactionDate
  });

  return response.data;
};


export const deleteExpenseApi = async (expenseId) => {

  const response = await api.delete(`/deleteExpense/${expenseId}`);

  return response.data;

};