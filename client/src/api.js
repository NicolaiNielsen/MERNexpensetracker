import axios from "axios";

const BASE_URL = "http://localhost:8000/api/v2"

const api = axios.create({baseURL: BASE_URL, timeout: 8000})

//Expense APIs

export const fetchExpenses = async() => {
    const res = await api.get('/expenses')
    return (res.data && res.data.data) || [];
};

export const createExpenses = async() => {
    const res = await api.post('/expenses')
    return (res.data && res.data.data) || [];
};

export const updateExpenses = async(id, payload) => {
    const res = await api.put(`/expenses/${id}`, payload)
    return (res.data && res.data.data) || [];
};

export const deleteExpenses = async(id) => {
    const res = await api.delete(`/expenses/${id}`)
    return res.data || null;
};
