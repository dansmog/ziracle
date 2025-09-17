type Method = "GET" | "POST" | "PUT" | "DELETE";
type Body = Record<string, unknown> | FormData | null;

export const apiRoutes = {
  createWaitlist: "/api/users/waitlist/create",
  getUserByReferralCode: "/api/users/waitlist/getUser",
};

export interface CustomError extends Error {
  status?: number;
}


export interface UserData {
  id: number;
  created_at: string;
  email: string;
  first_name: string | null;
  last_name: string | null;
  referral_code: string;
  referred_by: number | null;
  circle?: {  // Make this optional with ?
    inner_circle: number;
    mid_circle: number;
    outer_circle: number;
  };
  total_network?: number;
  direct_invites?: number;
  direct_referrals?: number;
}

interface ApiResponseData {
  success: boolean;
  data: UserData
}

interface SuccessResponse {
  success: boolean;
  message: string;
  data?: ApiResponseData;
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
  data: { email: string; referral_code?: string }
): Promise<SuccessResponse> => {
  const response = await fetcher<SuccessResponse>(
    url,
    method,
    data
  );
  return response;
};
export const fetchUserByReferralCode = async (
  referral_code: string
): Promise<SuccessResponse> => {
  const params = new URLSearchParams({
    referral_code: referral_code,
  }).toString();

  const urlWithParams = `${apiRoutes.getUserByReferralCode}?${params}`;

  const response = await fetcher<SuccessResponse>(
    urlWithParams,
    "GET",
    null
  );
  return response;
};