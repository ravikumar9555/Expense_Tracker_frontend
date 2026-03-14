import api from "../api/axiosConfig";


// LOGIN API
export const loginUser = async (username, password) => {

  const response = await api.post("/login", {
    username,
    password
  });

  return response.data;

};


// SIGNUP API
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


// // GET ALL EXPENSES
// export const getExpensesApi = async () => {

//   const response = await api.get("/expenses");

//   return response.data;

// };


// UPDATE EXPENSE
export const updateExpenseApi = async (id, expense) => {

  const response = await api.put(`/expenses/${id}`, expense);

  return response.data;

};


// DELETE EXPENSE
export const deleteExpenseApi = async (id) => {

  const response = await api.delete(`/expenses/${id}`);

  return response.data;

};