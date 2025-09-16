type Method = "GET" | "POST" | "PUT" | "DELETE";
type Body = Record<string, unknown> | FormData | null;

export const apiRoutes = {
  createWaitlist: "/api/users/waitlist/create",
};

interface CustomError extends Error {
  status?: number;
}

interface SuccessResponse {
  success: boolean;
  message: string;
}

export async function fetcher<T>(
  url: string,
  method: Method = "GET",
  body: Body = null
): Promise<T> {
  const options: RequestInit = {
    method,
    headers: {},
  };

  if (body) {
    if (body instanceof FormData) {
      // For file uploads, headers are set automatically by the browser
      options.body = body;
    } else {
      // For JSON data
      options.headers = {
        "Content-Type": "application/json",
      };
      options.body = JSON.stringify(body);
    }
  }

  const response = await fetch(url, options);
  const data = await response.json();

  if (!response.ok) {
    // If the response is not OK (e.g., 4xx or 5xx), throw an error
    const error: CustomError = new Error(
      data.message || "An unknown error occurred."
    );
    error.status = response.status;
    throw error;
  }

  return data as T;
}

export const createWaitlist = async (
  url: string,
  method: Method,
  data: { email: string }
): Promise<SuccessResponse> => {
  const response = await fetcher<SuccessResponse>(url, method, data);
  return response;
};
