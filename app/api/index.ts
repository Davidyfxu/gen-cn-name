// use fetch to create a util POST function
const f = async (url: string, options: RequestInit = {}) => {
  const response = await fetch(url, {
    method: "POST",
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...options.headers,
    },
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(
      `HTTP error! status: ${response.status}, message: ${errorText}`
    );
  }

  return response.json();
};

export const getUserData = () => f("/api/user/data", { method: "GET" });
export const payment = (data: any) =>
  f("/api/payment/create-checkout", {
    body: JSON.stringify(data),
  });
export const generateName = (data: any) =>
  f("/api/generate-name", {
    body: JSON.stringify(data),
  });
