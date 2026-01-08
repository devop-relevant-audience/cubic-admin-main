const isDev = process.env.NEXT_PUBLIC_NODE_ENV === "dev" || false;
// const isDev = true;
const BASE_URL = isDev
  ? "http://localhost:1337/api"
  : "https://o7avsmcibk.execute-api.ap-southeast-1.amazonaws.com/dev/api";

export { BASE_URL };
