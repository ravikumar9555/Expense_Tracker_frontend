import api from "../api/axiosConfig";

/* ================= AUTH ================= */

// LOGIN
export const loginUser = async (username, password) => {
  try {

    const { data } = await api.post("/login", {
      username,
      password
    });

    return data;

  } catch (error) {

    console.error("Login error:", error);
    throw error;

  }
};


// SIGNUP
export const signupUser = async (username, password) => {
  try {

    const { data } = await api.post("/signup", {
      username,
      password
    });

    return data;

  } catch (error) {

    console.error("Signup error:", error);
    throw error;

  }
};


/* ================= EXPENSE ================= */

// ADD EXPENSE
export const addExpenseApi = async (expense) => {
  try {

    const { data } = await api.post("/addExpense", expense);

    return data;

  } catch (error) {

    console.error("Add expense error:", error);
    throw error;

  }
};


// UPDATE EXPENSE
export const updateExpenseApi = async (expense) => {
  try {

    const { data } = await api.put("/updateExpense", expense);

    return data;

  } catch (error) {

    console.error("Update expense error:", error);
    throw error;

  }
};


// DELETE EXPENSE
export const deleteExpenseApi = async (expenseId) => {
  try {

    const { data } = await api.delete(`/deleteExpense/${expenseId}`);

    return data;

  } catch (error) {

    console.error("Delete expense error:", error);
    throw error;

  }
};


// GET EXPENSES (PAGINATION)
export const getExpensesApi = async (page, size) => {
  try {

    const { data } = await api.get(`/getExpenses?page=${page}&size=${size}`);

    return data;

  } catch (error) {

    console.error("Get expenses error:", error);
    throw error;

  }
};