// use fetch to create a util POST function
const f = async (url: string, options: RequestInit = {}) => {
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...options.headers,
    },
    ...options,
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
export const creemCheckout = (data: any) =>
  f(`${process.env.CREEM_API_URL!}/v1/checkouts`, {
    headers: {
      "x-api-key": process.env.CREEM_API_KEY!,
    },
    body: JSON.stringify(data),
  });
