import axios from "axios";

export const api = axios.create({
  baseURL: "https://leaderboard-backend-9qfo.onrender.com/api",
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});