import axios from "axios";

export const api = axios.create({
  baseURL: "https://leaderboard-backend-f8gh.onrender.com/api",
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});