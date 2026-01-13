import axios from "axios";

const ENV = process?.env?.NEXT_PUBLIC_NODE_ENV ?? "pro";

const api = axios.create({
  baseURL:
    ENV === "dev"
      ? "http://localhost:1337/api"
      : "https://admin.gymxclub.com/api", // Change to your amplify
});

export default api;
