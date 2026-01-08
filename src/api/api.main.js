import axios from "axios";

const ENV = process?.env?.NEXT_PUBLIC_NODE_ENV ?? "pro";

const api = axios.create({
  baseURL:
    ENV === "dev"
      ? "http://localhost:1337/api"
      : "https://o7avsmcibk.execute-api.ap-southeast-1.amazonaws.com/dev/api", // Change to your amplify
});

export default api;
