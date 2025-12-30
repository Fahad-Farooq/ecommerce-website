const API_URL = "http://localhost:5000";

export const testAPI = async () => {
  const res = await fetch(API_URL);
  const data = await res.text();
  console.log(`Response: ${data}`);
};
