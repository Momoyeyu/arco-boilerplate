import axios from 'axios';
import type { InternalAxiosRequestConfig } from 'axios';
import type { ApiResponse } from '@/types/api';
import { BizCode } from '@/types/api';
import { getAccessToken, getRefreshToken, setTokens, clearTokens } from '@/utils/token';

export class BizError extends Error {
  code: number;
  constructor(code: number, message: string) {
    super(message);
    this.code = code;
    this.name = 'BizError';
  }
}

const client = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  timeout: 15000,
  headers: { 'Content-Type': 'application/json' },
});

// Request interceptor: attach Bearer token
client.interceptors.request.use((config) => {
  const token = getAccessToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Token refresh queue
let isRefreshing = false;
let refreshQueue: Array<{
  resolve: (token: string) => void;
  reject: (err: unknown) => void;
}> = [];

function processQueue(error: unknown, token: string | null) {
  refreshQueue.forEach(({ resolve, reject }) => {
    if (token) resolve(token);
    else reject(error);
  });
  refreshQueue = [];
}

// Response interceptor: unwrap envelope + handle 401
client.interceptors.response.use(
  async (response) => {
    const body = response.data as ApiResponse;

    if (body.code === BizCode.OK) {
      return body.data as any; // eslint-disable-line @typescript-eslint/no-explicit-any
    }

    if (body.code === BizCode.Unauthorized) {
      const originalRequest = response.config as InternalAxiosRequestConfig & { _retried?: boolean };

      if (originalRequest._retried) {
        clearTokens();
        window.location.href = '/login';
        return Promise.reject(new BizError(body.code, body.message));
      }

      if (!isRefreshing) {
        isRefreshing = true;
        const refreshToken = getRefreshToken();

        if (!refreshToken) {
          clearTokens();
          window.location.href = '/login';
          return Promise.reject(new BizError(body.code, body.message));
        }

        try {
          // Use raw axios to avoid interceptor loop
          const res = await axios.post<ApiResponse>(
            `${import.meta.env.VITE_API_BASE_URL}/auth/token/refresh`,
            { refresh_token: refreshToken },
          );
          const data = res.data.data as { access_token: string; refresh_token: string };
          setTokens(data.access_token, data.refresh_token);
          processQueue(null, data.access_token);

          originalRequest._retried = true;
          originalRequest.headers.Authorization = `Bearer ${data.access_token}`;
          return client(originalRequest);
        } catch (err) {
          processQueue(err, null);
          clearTokens();
          window.location.href = '/login';
          return Promise.reject(err);
        } finally {
          isRefreshing = false;
        }
      }

      // Queue this request while refresh is in progress
      return new Promise((resolve, reject) => {
        refreshQueue.push({
          resolve: (token: string) => {
            originalRequest._retried = true;
            originalRequest.headers.Authorization = `Bearer ${token}`;
            resolve(client(originalRequest));
          },
          reject,
        });
      });
    }

    return Promise.reject(new BizError(body.code, body.message));
  },
  (error) => {
    if (error.response?.data) {
      const body = error.response.data as ApiResponse;
      if (body.code && body.message) {
        return Promise.reject(new BizError(body.code, body.message));
      }
    }
    return Promise.reject(error);
  },
);

export default client;
